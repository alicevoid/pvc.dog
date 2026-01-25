// ==========================================================================================
// ASCII ANIMATOR - State-based ASCII character animation
// ==========================================================================================

// Configuration
export const TICK_INTERVAL_MS = 250;        // 4 frames per second
export const TRANSITION_CHANCE = 0.5;       // 50% chance to attempt state transition
export const DEFAULT_FRAME_WEIGHT = 1;      // default ticks per frame

// Types
export type StateName = 'Close' | 'Peek' | 'Look' | 'Ears';
export type Frame = { t: string; w: number };
export type Transition = { to: StateName; weight: number; frames: Frame[] };
export type State = { frames: Frame[]; transitions: Transition[] };

// Helper for compact frame notation: f("text", weight)
const f = (t: string, w = 1): Frame => ({ t, w });

// ==========================================================================================
// FRAME DATA
// ==========================================================================================

export const states: Record<StateName, State> = {
    Close: {
        frames: [
            f('[>\\.<;;].. zZ', 3),
            f('[>\\.<;;].. .z', 3),
            f('[>\\.<;;].. Z..', 3),
            f('[>\\.<;;].. zZ', 3),
            f('[>\\.<;;].. .z', 3),
            f('[>\\.<;;].. Z..', 3),
        ],
        transitions: [
            { to: 'Peek', weight: 100, frames: [
                f('[>\\.<;;]..', 2),
                f('[>\\.<;;].. z', 2),
                f('[>\\.<;;]..', 2),
                f('[>\\.<;;].', 2),
                f('[>\\.<;;]', 3),
                f('[>\\.o;;]', 2),
            ]}
        ]
    },
    Peek: {
        frames: [
            f("['>\\.<;]", 2),
            f("[''>\\.o]", 3),
            f("['>\\. o;]", 2),
            f('[>\\.<;;]'),
            f('[o\\.<;;]', 3),
        ],
        transitions: [
            { to: 'Look', weight: 100, frames: [
                f('[o\\.o;].', 2),
                f('[o\\.o]..'),
                f('[o\\.o].'),
            ]}
        ]
    },
    Look: {
        frames: [
            f('[o\\.0]', 2),
            f('[O\\.0]', 3),
            f('[O\\.o]', 2),
            f('[O\\.0]', 3),
        ],
        transitions: [
            { to: 'Close', weight: 60, frames: [
                f('[O\\.0].', 2),
                f('[O\\.0]..', 3),
                f('[O\\.0]..  !'),
                f('[>\\.<].  !!'),
                f('[>\\.<;]..!!'),
                f('[>\\.<;;]!!!'),
                f('[>\\.<;;]!!.'),
                f('[>\\.<;;]!..'),
                f('[>\\.<;;]..', 2),
                f('[>\\.<;;].. z', 3),
            ]},
            // Stub for future: Look -> Ears (40%)
            // { to: 'Ears', weight: 40, frames: [...] }
            { to: 'Ears', weight: 40, frames: [
                f('[O\\.0].', 2),
                f('[^O\\.0^]..', 3),
                f('[O\\.0]..  !'),
                f('[>\\.0].. !!', 2),
                f('[Uo\\.0]...!!'),
                f('[Uo\\.<]....!', 2),
                f('[Uo\\.oU].... ', 3),
                f('[U>\\.<U]!.. '),
                f('[U>\\.<U]!!. '),
                f('[U>\\.<U].!!! '),
                f('[U>\\.oU] .!! '),
                f('[Uo\\.oU]  .! '),
                f('[Uo\\.oU]   .'),
            ]}
        ]
    },
    Ears: {
        frames: [
            f('[Uo\\.0U]', 2),
            f('[UO\\.0U]', 3),
            f('[UO\\.oU]', 2),
            f('[UO\\.0U]', 3),
        ],
        transitions: [
            { to: 'Ears', weight: 100, frames: [
                f("['UO\\.oU]..", 2),
                f("['U>\\.<U;]", 2),
                f("[''U>\\.oU]", 3),
                f("['U>\\.<;U]"),
                f('[U>\\.<;;U]'),
                f('[Uo\\.<;;U]', 3),
            ]}
        ]
    },
};

// ==========================================================================================
// ANIMATOR CLASS
// ==========================================================================================

export class AsciiAnimator {
    private state: StateName = 'Close';
    private frameIndex = 0;
    private tickCount = 0;
    private isTransitioning = false;
    private transitionFrames: Frame[] = [];
    private transitionTarget: StateName | null = null;

    /** Current display text */
    get currentFrame(): string {
        const frames = this.isTransitioning ? this.transitionFrames : states[this.state].frames;
        return frames[this.frameIndex]?.t ?? '';
    }

    /** Call every TICK_INTERVAL_MS */
    tick(): void {
        const frames = this.isTransitioning ? this.transitionFrames : states[this.state].frames;
        if (frames.length === 0) return;

        const currentWeight = frames[this.frameIndex]?.w ?? 1;
        this.tickCount++;

        // Stay on frame for its weight duration
        if (this.tickCount < currentWeight) return;
        this.tickCount = 0;

        // Advance frame
        this.frameIndex++;

        if (this.frameIndex >= frames.length) {
            this.frameIndex = 0;

            if (this.isTransitioning) {
                // Transition complete - enter new state
                this.state = this.transitionTarget!;
                this.isTransitioning = false;
                this.transitionTarget = null;
                this.transitionFrames = [];
            } else {
                // Maybe start a new transition
                this.maybeTransition();
            }
        }
    }

    private maybeTransition(): void {
        // Coin flip before attempting transition (keeps it slow)
        if (Math.random() > TRANSITION_CHANCE) return;

        const transitions = states[this.state].transitions;
        if (transitions.length === 0) return;

        // Weighted random selection
        const totalWeight = transitions.reduce((sum, t) => sum + t.weight, 0);
        let roll = Math.random() * totalWeight;

        for (const t of transitions) {
            roll -= t.weight;
            if (roll <= 0) {
                this.isTransitioning = true;
                this.transitionTarget = t.to;
                this.transitionFrames = t.frames;
                this.frameIndex = 0;
                this.tickCount = 0;
                return;
            }
        }
    }
}
