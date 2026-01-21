<script>

</script>

<style>

    .content-body {
    min-height: calc(100vh - 160px);
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    
    /* Default: use background color for all themes */
    background-color: var(--background);
    }

    /* if theme = original, content-body background is transparent */
    :global(html[data-theme='original']) .content-body {
        background-color: transparent;
    }    

    p, li, span, a, div {
        color: var(--text-color);
    }

    .h1, h2, h3, h4, h5, h6 {
        color: var(--header-color);
    }

    .lhs_content {
        position: absolute;
        width: 300px;
        height: 380px;
        background: var(--content-accent);
        left: calc(50vw - 560px);  /* 50% of viewport minus offset */
        top: 50px;  /* overlaps above mid_content */
        z-index: 0;
        padding: 0 20px 20px 20px;
    }

    .aboutme {
        background: var(--linkbg);
    }

    .sites {
        background: var(--linkbg);
    }

    .links {
        background: var(--linkbg);
    }

    .blinkies_scroll {
        position: absolute;
        bottom: 20px;
        left: 0px;
        right: 0px;
        height: 35px;
        background: var(--linkbg);
    }  

    .mid_content {
        width: 440px;
        min-height: calc(100vh - 100px - 60px - 100px - 100px);  /* viewport.vh - header.px - footer.px - margin-top.px - padding.px */
        background: var(--content);
        margin: 0 auto;  /* centers it horizontally */
        margin-top: 100px;
        z-index: 1;
        padding-top: 20px;
        padding-left: 60px;
        padding-right: 20px;
        padding-bottom: 20px;
    }

    .intro {
        width: 100%;
        height: 150px;
        background: var(--linkbg);
        margin-bottom: 20px;
    }

    .mid_content h2 {
        padding: 20px;
    }

    .mid_content p {
        padding: 0 20px 20px 20px;
    }
    
    .mid_feed {
        padding: 20px;
        background: var(--linkbg);
    }

    .post_header {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: flex-start;
        border-bottom: 1px solid var(--text-color);
    } 

    .img_placeholder {
        width: 200px;
        height: 110px;
        background: var(--background);
        float: right;
        margin: 0 10px 0;
    }

    .rhs_content {
        position: absolute;
        width: 300px;
        height: 380px;
        background: var(--content-accent);
        right: calc(50vw - 620px);  /* 50% of viewport plus offset */
        top: 350px;  /* lower than lhs_content */
        padding: 20px 20px 20px 20px;
    }

    .fact {
        width: 280px;
        height: 140px;
        background: var(--linkbg);
        margin-bottom: 20px;
        padding: 10px;
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
        background: var(--linkbg);
    }

    .mathfun_controller {
        width: 30px;
        height: 210px;
        background: var(--linkbg);
    }

    /* the humble, Mobile Phone */
    @media (max-width: 600px) {
        .mid_content {
            width: 100%;
        }
    }

</style>

<!-- Main Container -->
<main class="content-body">
    <div class="lhs_content">

        <!-- hi im alicevoid -->
         <div class="aboutme">
            <h2>hi im alicevoid</h2>
            <p style="text-indent: 30px">Im a girl on the internet who does a bunch of random stuff for fun!</p>
            <p style="text-indent: 30px">This website is my personal little shrine where I can share the cool things I learn and make. Feel free to look through, or just yap at me if u have any questions.</p>
         </div>

         <!-- where u can find me -->
         <div class="links"> find me on...
            <ul>
                <li><a href="https://github.com/alicevoid" target="_blank">github</a></li>
                <li><a href="https://bsky.app/profile/alicevo.id" target="_blank">bluesky</a></li>
                <li><a href="https://soundcloud.com/alicevoid" target="_blank">soundcloud</a></li>
            </ul>
         </div>

         <!-- random blinkie people finder -->
         <div class="blinkies_scroll"> scroll scroll blinkies here...
         </div>
    </div>
    
    <div class="mid_content">
        <!-- this is like a blog! -->

        <!-- what i'm doing here -->
        <div class="intro">
            <h2>Hi</h2>
            <p>check out some stuff i've been up to:</p>
        </div>

        <div class="mid_feed">

            <!-- ideally, i want to find a way to not write my posts directly in-code haha -->
            <div class="post">
                <div class="post_header">
                    <h3>Some Thing I Did</h3>
                    <p>06/15/2024</p>
                </div>

                <div class="post_body">
                    <div class="img_placeholder"> image here... </div>
                    <p>This is a sample blog post content. if this was a post, i would probably have something quite exquisitely erudite and professional to say. you'll notice i'm intentionally typing for a while, to see how the container reacts to long texts.</p>
                </div>
            </div>

        </div>

    </div>
    
    <div class="rhs_content">
        <!-- fun random facts that i like -->
        <div class="fact">
            fact thingy here...
        </div>

        <div class="math">
            <!-- cool little thingy showcase -->
            <div class="mathfun">
                cool little thingy here...
            </div>

            <!-- cool little thingy controller -->
            <div class="mathfun_controller">
                <p style="word-wrap: break-word;">controller thingy here...</p>
            </div>
        </div>
    </div>
</main>

