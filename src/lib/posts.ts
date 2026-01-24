
// ==========================================================================================
// POST STUFF
// ==========================================================================================

// what a post looks like
export type Post = {
    title: string;
    date: string;       // "MM/DD/YYYY" format to match your style
    image?: string;     // optional thumbnail
    content: string;    // the post body
};

// all the posts go here!
// newest first, or sort however you like
export const posts: Post[] = [
    {
        title: "Current Site Plans",
        date: "01/21/2026",
        image: "/think_different.gif",
        content: "Currently, I think it's coming together really well. Now that the layout is set up, I need to start adding the little beauty marks! Once I finish that layer I'll feel very primed to tackle the right-most container, where all the nerd stuff goes. Lastly, I'll wrap up with a full list of posts that showcase my recent projects!"
    },
    {
        title: "Sample Post",
        date: "01/20/2026",
        image: "/images/badass-flan.jpg",
        content: "This is a sample blog post content. if this was a post, i would probably have something quite exquisitely erudite and professional to say. you'll notice i'm intentionally typing for a while, to see how the container reacts to long texts."
    }
];
