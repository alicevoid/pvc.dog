// ==========================================================================================
// ASCII ANIMATOR - State-based ASCII character animation
// ==========================================================================================

// Configuration
export const FRAMES_PER_SECOND = 8;
export const TICK_INTERVAL_MS = 1000 / FRAMES_PER_SECOND;   
export const TRANSITION_CHANCE = 0.5;       // 50% chance to attempt state transition

// Frame speed constants (in ticks)
export const ONE = 1;                       // single tick (fastest)
export const FAST = 2;                      // quick
export const MEDIUM = 4;                    // standard
export const SLOW = 6;                      // lingering

// TRANSITION WEIGHTS CONSTANTS ( % )
export const CLOSE_TO_PEEK = 100;
export const PEEK_TO_LOOK = 100;
export const LOOK_TO_CLOSE = 40;
export const LOOK_TO_EARS = 60;
export const EARS_TO_EARS = 25;
export const EARS_TO_STARS = 75;
export const STARS_TO_CHILL = 70;
export const CHILL_TO_NOTICE = 100;
export const CHILL_TO_EARS = 0;
export const NOTICE_TO_STARS = 100;
export const STARS_TO_FREAK = 30;
export const FREAK_TO_CLOSE = 100;

// ==========================================================================================

// Types
export type StateName = 'Close' | 'Peek' | 'Look' | 'Ears' | 'Stars' | 'Chill' | 'Notice' | 'Freak';
export type Frame = { t: string; w: number };
export type Transition = { to: StateName; weight: number; frames: Frame[] };
export type State = { frames: Frame[]; transitions: Transition[] };

// Helper for compact frame notation: f("text", weight)
const f = (t: string, w = FAST): Frame => ({ t, w });

// ==========================================================================================
// FRAME DATA
// ==========================================================================================

export const states: Record<StateName, State> = {
    Close: {
        frames: [
            f('[>\\.<;;].. zZ', SLOW),
            f('[>\\.<;;].. .z', SLOW),
            f('[>\\.<;;].. Z..', SLOW),
            f('[>\\.<;;].. zZ', SLOW),
            f('[>\\.<;;].. .z', SLOW),
            f('[>\\.<;;].. Z..', SLOW),
        ],
        transitions: [
                // to Peek -> 100%
            { to: 'Peek', weight: CLOSE_TO_PEEK, frames: [
                f('[>\\.<;;]..', MEDIUM),
                f('[>\\.<;;].. z', MEDIUM),
                f('[>\\.<;;]..', MEDIUM),
                f('[>\\.<;;].', MEDIUM),
                f('[>\\.<;;]', SLOW),
                f('[>\\.o;;]', MEDIUM),
            ]}
        ]
    },
    Peek: {
        frames: [
            f("['>\\.<;]", SLOW),
            f("[''>\\.o]", MEDIUM),
            f("['>\\. o;]", SLOW),
            f('[>\\.<;;]', FAST),
            f('[o\\.<;;]', SLOW),
        ],
        transitions: [
            { to: 'Look', weight: PEEK_TO_LOOK, frames: [
                f('[o\\.o;;].', MEDIUM),
                f('[o\\.o;].', MEDIUM),
                f('[o\\.o]..', FAST),
                f('[o\\.o].', FAST),
            ]}
        ]
    },
    Look: {
        frames: [
            f('[o\\.0]', MEDIUM),
            f('[O\\.0]', SLOW),
            f('[O\\.o]', MEDIUM),
            f('[O\\.0]', SLOW),
        ],
        transitions: [
                // to Close -> 40%
                // to Ears -> 60%
            { to: 'Close', weight: LOOK_TO_CLOSE, frames: [
                f('[O\\.0].', MEDIUM),
                f('[O\\.0]..', SLOW),
                f('[O\\.0]..  !', FAST),
                f('[>\\.<].  !!', FAST),
                f('[>\\.<;]..!!', FAST),
                f('[>\\.<;;]!!!', FAST),
                f('[>\\.<;;]!!.', FAST),
                f('[>\\.<;;]!..', FAST),
                f('[>\\.<;;]..', MEDIUM),
                f('[>\\.<;;].. z', SLOW),
            ]},
            { to: 'Ears', weight: LOOK_TO_EARS, frames: [
                f('[O\\.0].', MEDIUM),
                f('[O\\.0]..', SLOW),
                f('[O\\.0]..  !', FAST),
                f('[>\\.0].. !!', MEDIUM),
                f('[Uo\\.0]...!!', FAST),
                f('[Uo\\.<]....!', MEDIUM),
                f('[Uo\\.oU].... ', SLOW),
                f('[U>\\.<U]!.. ', FAST),
                f('[U>\\.<U]!!. ', FAST),
                f('[U>\\.<U].!!! ', FAST),
                f('[U>\\.oU] .!! ', FAST),
                f('[Uo\\.oU]  .! ', FAST),
                f('[Uo\\.oU]   .', FAST),
            ]}
        ]
    },
    Ears: {
        frames: [
            f('[Uo\\.0U]', MEDIUM),
            f('[UO\\.0U]', SLOW),
            f('[UO\\.oU]', MEDIUM),
            f('[UO\\.0U]', SLOW),
        ],
        transitions: [
                // to Ears -> 25%
                // to Stars -> 75%
            { 
                to: 'Ears', weight: EARS_TO_EARS, frames: [
                f("['UO\\.oU]..", SLOW),
                f("['U>\\.<U;]", SLOW),
                f("[''U>\\.oU]", MEDIUM),
                f("['U>\\.<;U]", FAST),
                f('[U>\\.<;;U]', FAST),
                f('[Uo\\.<;;U]', SLOW),
                f('[Uo\\.o;U]', FAST),
                f('[Uo\\.oU]', FAST),
            ]},
            {
                to: 'Stars', weight: EARS_TO_STARS, frames: [
                    f("['UO\\.oU]..", SLOW),
                    f("['UO\\.+U]..>", FAST),
                    f("['UO\\.oU]..", FAST),
                    f("..['UO\\.oU]", SLOW),
                    f("<..['U+\\.oU]", FAST),
                    f("..['UO\\.oU]", FAST),
                ]
            }
        ]
    },
    Stars: {
        frames: [
            f('[Uo\\.+U]', MEDIUM),
            f('[U+\\.+U]', FAST),
            f('[UO\\.+U]', SLOW),
            f('[U+\\.+U]', FAST),
            f('[U+\\.0U]', MEDIUM),
            f('![U+\\.+U]!', MEDIUM),
        ],
        transitions: [
                // to Chill -> 70%
                // to Close -> 30%
            {
                to: 'Chill', weight: STARS_TO_CHILL, frames: [
                    f('[Uo\\.+U]', MEDIUM),
                    f('[U+\\.+U]>', FAST),
                    f('[UO\\.+U]', SLOW),
                    f('<[U+\\.+U]', FAST),
                    f('[U+\\.0U]', MEDIUM),
                    f('![U+\\.+U]!', FAST),
                ]},
            { 
                to: 'Freak', weight: STARS_TO_FREAK, frames: [
                    f("[U?\\.oU].", FAST),
                    f("[UO\\.?U].", MEDIUM),
                    f("[UO\\.oU]?.", SLOW),
                    f("[Uo\\.oU]??.", MEDIUM),
                    f("[Uo\\.oU]???", MEDIUM),
                    f("[U#\\.#U].??", ONE),
                    f("[U@\\.@U]?.?", ONE),
                    f("[UQ\\.QU]..?.", FAST),
                    f("[UQ\\.QU] ..?", MEDIUM),
                    f("[UQ\\.QU]  ..", SLOW),
                    f(";[U>\\.<U];", ONE),
                    f(";;[U>\\.<U];;", ONE),
                    f(";;U[>\\.<]U;;", ONE),
                    f(";U;[>\\.<];U;", ONE),
                    f("U;;[>\\.<];;U", ONE),
                    f(";;,[>\\.<],;;", ONE),
                    f(";,[>\\.<] ,;", ONE),
                    f(",[>\\.<]  ,", ONE)
                ]}
        ]
    },
    Freak: {
        frames: [
            f("[>\\.<]  ", FAST),
            f("[>\\.<] ~ ", MEDIUM),
            f("[>\\.<]  ~", MEDIUM),
            f("[>\\.<]", MEDIUM),
            
        ],
        transitions: [
            // to Close -> 100%
            {
                to: 'Close', weight: FREAK_TO_CLOSE, frames: [
                    f('[>\\.<].', MEDIUM),
                    f('[>\\.<]..', MEDIUM),
                    f('[>\\.<;].. z', MEDIUM),
                    f('[>\\.<;;].. Zz', MEDIUM)
                ]
            }
        ]
    },
    Chill: {
        frames: [
            f('[U>\\.+U],', FAST),
            f('[U>\\.+U],,', FAST),
            f('[U\\.+U]..,,  ', MEDIUM),
            f('[Uo\\.+U] ..,,', MEDIUM),
            f('[Uo\\.0U]  ..,', MEDIUM),
            f('[Uo\\.0U]   ..', SLOW),
            f('[UO\\.0U]    .', SLOW),
            f("[UO\\.0U]'", FAST),
            f("[UO\\.0U]''", SLOW),
            f("[U+\\.0U]''", MEDIUM),
            f("[U?\\.0U]''", FAST),
            f("[Uo\\.0U]''", SLOW),
            f("[UO\\.0U]'", FAST),
            f("[UO\\.0U]", FAST),
            f("[Uo\\.0U]", SLOW),
            f("[U>\\.0U].", MEDIUM),
            f("[U>\\.oU].", MEDIUM),
        ],
        transitions: [
            // to Notice -> 100%
            {
                to: 'Notice', weight: CHILL_TO_NOTICE, frames: [
                    f("[U?\\.oU].", SLOW),
                    f("[UO\\.?U].", SLOW),
                    f("[UO\\.oU]?.", MEDIUM),
                    f("[U+\\.0U]!?.", FAST),
                    f("[U+\\.0U]!!?", FAST),
                    f("[U+\\.0U]!!!", FAST),
                    f("[U+\\.0U]..!!", FAST),
                    f("[U+\\.0U] ..!", FAST),
                    f("[U+\\.0U]  ..", SLOW),
                    f("[UO\\.0U]", MEDIUM),
                ]
            },
            {
                to: 'Ears', weight: CHILL_TO_EARS, frames: [
                    f("[U?\\.oU].", SLOW)
                ]
            },
        ]
    },
    Notice: {
        frames: [
            f("[UO\\.0U]", MEDIUM),
            f("[U>\\.<U]", FAST),
            f("[UO\\.0U]", MEDIUM),
            f("[UO\\.oU]", SLOW),
            f("[UO\\.OU]", SLOW),
            f("[UO\\.OU] .. ", SLOW),
            f("[UO\\.OU]  ...", SLOW),
            f("[U^\\.^U] h! ..", ONE),
            f("[U^\\.^U] hi!..", ONE),
            f("[U^\\.^U] hih!.", FAST),
            f("[U^\\.^U] hihi!", MEDIUM),
            f("[U^\\.^U] ihihi", FAST),
            f("[U^\\.^U] hihih", ONE),
            f("[U^\\.^U] .hihi", ONE),
            f("[U^\\.^U] ..hih", ONE),
            f("[U^\\.^U]  ..hi", FAST),
            f("[U^\\.+U]   ..h", MEDIUM),
            f("[U^\\.^U]    ..", SLOW),
            f("[U+\\.^U]      ", MEDIUM),
            f("[U+\\.<U] ..   ", FAST),
            f("[U>\\.<U] ...  ", ONE),
            f("[U>\\.<U] a... ", ONE),
            f("[U>\\.<U] aw...", ONE),
            f("[U>\\.<U] aww..", FAST),
            f("[U>\\.<U] awwo.", FAST),
            f("[U>\\.<U] awwoo", MEDIUM),
            f("[U>\\.<U] wwooo", FAST),
            f("[U>\\.<U] woooo", ONE),
            f("[U>\\.<U] ooooo", ONE),
            f("[U>\\.<U] Ooooo", ONE),
            f("[U>\\.<U] oOooo", ONE),
            f("[U>\\.<U] OoOoo", ONE),
            f("[U>\\.<U] oOoOo", ONE),
            f("[U>\\.<U] ooOoO", ONE),
            f("[U>\\.<U] oooOo", ONE),
            f("[U>\\.<U] !oooo", ONE),
            f("[U>\\.<U] .!ooo", ONE),
            f("[U>\\.<U] !.!oo", ONE),
            f("[U>\\.<U] .!.!o", ONE),
            f("[U>\\.<U]  .!.!", ONE),
            f("[U>\\.<U]   .!.", ONE),
            f("[U>\\.<U]    .!", FAST),
            f("[U>\\.oU]     .", MEDIUM),
            f("[UO\\.oU]      ", SLOW),
        ],
        transitions: [
            // to Stars -> 100%
            {
                to: 'Stars', weight: NOTICE_TO_STARS, frames: [
                    f('[UO\\.+U]', MEDIUM),
                    f('[U>\\.+U]', FAST),
                    f('[U+\\.0U]', MEDIUM),
                    f('[U+\\.<U]', FAST),
                    f('[UO\\.+U]', SLOW),
                    f('![U+\\.+U]!', ONE),
                    f('[U+\\.+U]', ONE),
                    f('![U+\\.+U]!', ONE),
                    f('[U+\\.+U]', ONE),
                    f('![U+\\.+U]!', MEDIUM)
                ]
            }
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

        const currentWeight = frames[this.frameIndex]?.w ?? FAST;
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
        // Coin flip before attempting transition 
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
