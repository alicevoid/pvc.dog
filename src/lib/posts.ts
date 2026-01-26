
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
        title: `[slippy.pvc.dog](https://slippy.pvc.dog)`,
        date: "01/25/2026",
        image: "/images/slippymudwheel.webp",
        content: `Random Movie Picker Wheel for my girlfriend Dawn as a christmas gift in 2025. 
        
Pulls from Google Docs, Links to Letterboxd. 

Comes with ~2500 obscure movies preloaded that are sure to have you asking 'where do you even find this?'`
    },
    {
        title: `[recyclebin.pvc.dog](https://recyclebin.pvc.dog)`,
        date: "01/25/2026",
        image: "/images/recyclebin.webp",
        content: `Tool for finding forgotten Youtube videos with very few views. 

It has a bunch of unnecessary feature-bloat such as filering by statistical distribution, a detailed term-index, and more!`
    },
    {
        title: "My First Post",
        date: "01/24/2026",
        content: `This is a feed meant for tracking projects I work on. Since it was a project to make this, here's a post to commemorate its creation!

In the next coming posts, I'll be catching up with a bunch of other weird stuff I've been making lately.`
    }
    
];
