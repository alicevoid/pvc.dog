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

    
    .lhs_content {
        position: absolute;
        width: 300px;
        height: 380px;
        background: var(--content-accent);
        left: calc(50vw - 540px);  /* 50% of viewport minus offset */
        top: 50px;  /* overlaps above mid_content */
        z-index: 0;
        padding: 20px;
    }

    .rhs_content {
        position: absolute;
        width: 300px;
        height: 380px;
        background: var(--content-accent);
        right: calc(50vw - 620px);  /* 50% of viewport plus offset */
        top: 350px;  /* lower than lhs_content */
        padding: 20px;
    }

    .intro {
        width: 100%;
        height: 150px;
        background: var(--linkbg);
        margin-bottom: 20px;
    }

    .mid_content {
        width: 480px;
        min-height: calc(100vh - 260px);  /* viewport minus header(100) + footer(60) + margin-top(100) */
        background: var(--content);
        margin: 0 auto;  /* centers it horizontally */
        margin-top: 100px;
        z-index: 1;
        padding: 20px;
    }
    
    .mid_feed {
        padding: 20px;
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
            <h2>Welcome to the PVC Pipe Database</h2>
            <p>Your one-stop solution for all PVC pipe specifications and information.</p>
         </div>

         <!-- websites i made -->
         <div class="sites"></div>

         <!-- where u can find me -->
         <div class="links"></div>

         <!-- random blinkie people finder -->
         <div class="blinkies_scroll"></div>
    </div>
    
    <div class="mid_content">
        <!-- this is like a blog! -->

        <!-- what i'm doing here -->
        <div class="intro"></div>

        <div class="mid_feed">

            <!-- ideally, i want to find a way to not write my posts directly in-code haha -->
            <article>
                <h3>Post Title</h3>
                <p>This is a sample blog post content.</p>
            </article>

        </div>
    </div>
    
    <div class="rhs_content">
        <!-- fun random facts that i like -->
        <div class="fact"></div>

        <!-- cool little thingy showcase -->
        <div class="mathfun"></div>

        <!-- cool little thingy controller -->
        <div class="mathfun_controller"></div>
    </div>
</main>

