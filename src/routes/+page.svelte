<script lang="ts">
    import { posts } from '$lib/posts';
    import { buttons } from '$lib/buttons';
    import { marked } from 'marked';

    // lightbox state - which image is open (null = closed)
    let lightbox_src: string | null = $state(null);
</script>

<!-- escape key closes the lightbox -->
<svelte:window onkeydown={(e) => {
    if (e.key === 'Escape') lightbox_src = null;
}} />

<style>

    .content-body {
    min-height: calc(100vh - 160px);
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;  /* no page scroll until clamp limit reached */

    /* Default: use background color for all themes */
    background-color: var(--background);
    }

    /* allow page scroll only when rhs_content clamp minimum is reached */
    @media (max-height: 70px) {
        .content-body {
            /* overflow: visible; */
        }
    }

    /* if theme = original, content-body background is transparent */
    :global(html[data-theme='original']) .content-body {
        background-color: transparent;
    }    

    :global(html[data-theme='original']){
        animation: scrollBackground 41.14s linear infinite;
    }

    p, li, span, a, div {
        color: var(--text-color);
    }

    .h1, h2, h3, h4, h5, h6 {
        color: var(--header-color);
    }

    /* Left-Hand Side */

    .lhs_content {
        position: absolute;
        width: 300px;
        height: 380px;
        background: var(--content-accent);
        left: calc(50vw - 560px);  /* 50% of viewport minus offset */
        top: 50px;  /* overlaps above mid_content */
        z-index: 0;
        padding: 0 20px 20px 20px;
        border-right: 1px solid var(--text-color);
        border-bottom: 1px solid var(--text-color);
    }

    .aboutme {
        /* background: var(--linkbg); */
    }

    .sites {
        /* background: var(--linkbg); */
    }

    .links {
        /* background: var(--linkbg); */
        padding-top: 10px;
        padding-left: 10px;
        border-top: 1px solid var(--text-color);
        border-left: 1px solid var(--text-color);
    }

    .blinkies_scroll {
        position: absolute;
        bottom: 20px;
        left: 0px;
        right: 0px;
        height: 35px;
        background: var(--linkbg);
        border-top: 1px solid var(--text-color);
        border-bottom: 1px solid var(--text-color);
    }  

    .think_diff {
        position: absolute;
        bottom: 32px;
        left: 20px;
        z-index: -1;
        /* margin-top: 30px; */
        /* background-color: var(--linkbg); */
    }

    .think_diff:hover {
        z-index: 10001;
        position: absolute;
        box-shadow: 0 0 20px 4px rgba(0,0,0,0.15);
        transition: box-shadow 0.3s, transform 0.3s;
        transform: scale(1.04);
    }

    /* Middle Content Area */

    .mid_content {
        width: 440px;
        background: var(--content);
        margin: 0 auto;  /* centers it horizontally */
        margin-top: 100px;
        z-index: 1;
        padding-top: 20px;
        padding-left: 60px;
        padding-right: 20px;
        padding-bottom: 20px;
        border-right: 1px solid var(--text-color);
        height: calc(clamp(200px, calc(100vh - 100px), calc(100vh - 300px)));  /* min height to allow scrolling */
    }

    .intro {
        /* background: var(--linkbg); */
        width: 100%;
        height: 150px;
        margin-bottom: 20px;
        border-bottom: 1px solid var(--text-color);
        border-left: 1px solid var(--text-color);
    }

    .mid_content h2 {
        padding: 20px;
    }

    .mid_content p {
        padding: 0 20px 0 20px;
    }

    .mid_feed {
        /* background: var(--linkbg); */
        padding: 20px;
        max-height: calc(100vh - 350px);  /* leave room for intro/header/footer */
        overflow-y: auto;
        scrollbar-gutter: stable;  /* reserve space for scrollbar */
        scrollbar-width: thin;
        scrollbar-color: var(--text-color) var(--content-accent);
        /* padding-bottom: 300px; */
    }

    .mid_feed::-webkit-scrollbar {
        width: 8px;
    }

    .mid_feed::-webkit-scrollbar-track {
        background: var(--content-accent);
    }

    .mid_feed::-webkit-scrollbar-thumb {
        background-color: var(--text-color);
        border-radius: 4px;
    }

    .mid_feed::-webkit-scrollbar-button:vertical {
        display: none;
    }

    .post {
        width: calc(100% - 1px); /* account for border */
        border-right: 1px solid var(--text-color);
        padding-bottom: 10px;
    }

    .post:last-child {
        margin-bottom: 160px;
    }

    .post_header {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: flex-start;
        border-bottom: 1px solid var(--text-color);
    }

    .post_header :global(a) {
        color: var(--header-color);
    }

    .post_image_btn {
        float: right;
        margin: 0 0 0 10px;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
    }

    .post_image {
        width: 200px;
        height: auto;
        display: block;
        margin-right: 15px;
        margin-bottom: 1px; /* forcefully moving text */
    }

    /* markdown content styling */
    .post_content :global(p) {
        margin-bottom: 1em;
        padding-right: 10px;
    }
    .post_content :global(p:last-child) {
        margin-bottom: 0;
    }
    .post_content :global(blockquote) {
        margin-left: 1.5em;
        padding-left: 1em;
        border-left: 2px solid var(--text-color);
        opacity: 0.8;
    }
    .post_content :global(ul), .post_content :global(ol) {
        margin-left: 1.5em;
    }
    .post_content :global(a) {
        color: var(--header-color);
    }

    /* fullscreen image viewer */
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    }

    .lightbox img {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
    }

    /* Right-Hand Side */

    .rhs_content {
        position: absolute;
        width: 300px;
        height: 380px;
        background: var(--content-accent);
        right: calc(50vw - 620px);  /* 50% of viewport plus offset */
        top: calc(clamp(470px, calc(100vh - 300px), 770px) - 420px);  /* follows buttons (420px above them) */
        padding: 20px 20px 20px 20px;
        /* border: 1px solid var(--text-color); */
    }

    .fact {
        width: 280px;
        height: 140px;
        /* background: var(--linkbg); */
        margin-bottom: 20px;
        padding: 0 10px 10px 10px;
        border-bottom: 1px solid var(--text-color);
        border-left: 1px solid var(--text-color);
    }

    .vsbw {
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
        align-items: flex-start;
        height: 110px;
    }

    .math {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 210px;
    }

    .mathfun {
        width: 250px;
        height: 210px;
        margin-right: 20px;
        /* background: var(--linkbg); */
        border-top: 1px solid var(--text-color);
        border-left: 1px solid var(--text-color);
    }

    .mathfun_controller {
        width: 30px;
        height: 210px;
        /* background: var(--linkbg); */
        border-left: 1px solid var(--text-color);
        border-top: 1px solid var(--text-color);
    }

    /* floating buttons below rhs_content */
    .rhs_buttons {
        position: absolute;
        width: 300px;  /*88*3 + gaps */
        right: calc(50vw - 620px);  /* same as rhs_content */
        top: clamp(470px, calc(100vh - 300px), 770px);  /* buttons lead, rhs_content follows */
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        gap: 5px;
        /* no background = floats over page bg */
    }

    .rhs_button {
        /* standard 88x31 button size */
        width: 88px;
        height: 31px;
    }

    /* Mobile: Stack columns vertically */
    @media (max-width: 1024px) {
        .content-body {
            min-height: auto;
            overflow: visible;
            padding-bottom: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .lhs_content {
            position: relative;
            width: 100%;
            max-width: 100%;
            height: auto;
            left: auto;
            top: auto;
            order: 1;
            margin-bottom: 20px;
            padding-bottom: 80px;
            border-right: none;
            box-sizing: border-box;
        }

        .blinkies_scroll {
            z-index: 2;
        }

        .think_diff {
            position: absolute;
            bottom: 30px;
            left: 20px;
            z-index: 1;
            /* margin-top: 30px; */
            /* background-color: var(--linkbg); */
        }

        .think_diff:hover {
        position: absolute;
        }


        .mid_content {
            width: 100%;
            max-width: 100%;
            margin-top: 0;
            height: auto;
            order: 2;
            padding-left: 20px;
            box-sizing: border-box;
        }

        .intro {
            height: auto;
        }

        .mid_feed {
            max-height: none;
            overflow-y: visible;
        }

        .post {
            padding-top: 100px;
        }

        .post:first-child {
            padding-top: 20px;
        }

        .post:last-child {
            padding-top: 140px;
            margin-bottom: 20px;
        }

        .post_image {
            margin-bottom: 15px;
        }

        .rhs_content {
            position: static;
            width: 100%;
            max-width: 100%;
            height: auto;
            right: auto;
            top: auto;
            order: 3;
            margin-top: 20px;
            margin-bottom: 20px;
            box-sizing: border-box;
        }

        .fact {
            width: 100%;
            box-sizing: border-box;
        }

        .vsbw {
            width: 100%;
        }

        .math {
            flex-direction: column;
            height: auto;
        }

        .mathfun {
            width: 100%;
            height: auto;
            min-height: 150px;
            margin-right: 0;
            margin-bottom: 10px;
        }

        .mathfun_controller {
            width: 100%;
            height: auto;
        }

        .rhs_buttons {
            position: static;
            width: 100%;
            max-width: 100%;
            right: auto;
            top: auto;
            order: 4;
        }
    }

    /* background scrolling infinitely thingy */
    @keyframes scrollBackground {
        from {
            background-position: 0 0;
        }

        to {
            background-position: 450px 516px;
        }

    }

    @keyframes colorCycle {
        0% {
            color: var(--content);
        }
        50% {
            color: var(--content-accent);
        }
    }

</style>

<!-- Main Container -->
<main class="content-body">
    <div class="lhs_content">

        <!-- hi im alicevoid -->
         <div class="aboutme">
            <h2>Hi! I'm Alice Void ^^!</h2>
            <p style="text-indent: 30px">Im a girl on the internet who does a bunch of random stuff for fun!</p>
            <p>This website is my personal little shrine where I can share the cool things I learn and make. Feel free to look through, or just yap at me if u have any questions.</p>
         </div>

         <!-- where u can find me -->
         <div class="links"> find me on...
            <ul>
                <li><a href="https://github.com/alicevoid" target="_blank">github</a></li>
                <!-- <li><a href="https://bsky.app/profile/alicevo.id" target="_blank">bluesky</a></li> -->
                <li><a href="https://soundcloud.com/alicevoid" target="_blank">soundcloud</a></li>
            </ul>
         </div>

         <!-- random blinkie people finder -->
         <div class="blinkies_scroll">
         </div>

         <img class="think_diff" src="/think_different.gif" alt="think different" />
    </div>
    
    <div class="mid_content">
        <!-- this is like a blog! -->

        <!-- what i'm doing here -->
        <div class="intro">
            <h2>Hi</h2>
            <p>check out some stuff i've been up to:</p>
        </div>

        <div class="mid_feed">

            <!-- posts come from src/lib/posts.ts now! -->
            {#each posts as post}
                <div class="post">
                    <div class="post_header">
                        <h3>{@html marked.parseInline(post.title)}</h3>
                        <p>{post.date}</p>
                    </div>

                    <div class="post_body">
                        {#if post.image}
                            <button class="post_image_btn" onclick={() => lightbox_src = post.image ?? null}>
                                <img class="post_image" src={post.image} alt={post.title} />
                            </button>
                        {/if}
                        <div class="post_content">{@html marked.parse(post.content)}</div>
                    </div>
                </div>
            {/each}

        </div>

    </div>
    
    <div class="rhs_content">
        <!-- fun random facts that i like -->
        <div class="fact">
            <h3>who would win in a fight</h3>
            <div class="vsbw">
                <div class="vsbw_lhs">
                    <img class="vsbw_lhs_img" src="debug_ant.jpg" alt="ant" width="60px" height="60px" />
                    <p>ants</p>
                </div>
                <div class="vsbw_rhs">
                    <img class="vsbw_rhs_img" src="debug_beetle.jpg" alt="beetle" width="60px" height="60px" />
                    <p>beetles</p>
                </div>
            </div>
        </div>

        <div class="math">
            <!-- cool little thingy showcase -->
            <div class="mathfun">
                cool little thingy here...
            </div>

            <!-- cool little thingy controller -->
            <div class="mathfun_controller">
                <p style="word-wrap: break-word;">placeholder text</p>
            </div>
        </div>
    </div>

    <!-- floating buttons below rhs -->
    <div class="rhs_buttons">
        {#each buttons as btn}
            {#if btn.link}
                <a href={btn.link} target="_blank">
                    <img class="rhs_button" src={btn.src} alt="button" />
                </a>
            {:else}
                <img class="rhs_button" src={btn.src} alt="button" />
            {/if}
        {/each}
    </div>
</main>

<!-- lightbox overlay -->
{#if lightbox_src}
    <button class="lightbox" onclick={() => lightbox_src = null}>
        <img src={lightbox_src} alt="fullscreen view" />
    </button>
{/if}
