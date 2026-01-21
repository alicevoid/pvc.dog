
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
        title: "Some Thing I Did",
        date: "01/20/2026",
        image: "/images/badass-flan.jpg",
        content: "This is a sample blog post content. if this was a post, i would probably have something quite exquisitely erudite and professional to say. you'll notice i'm intentionally typing for a while, to see how the container reacts to long texts."
    }
];
