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

    .mid_content {
        width: 500px;
        min-height: calc(100vh - 260px);  /* viewport minus header(100) + footer(60) + margin-top(100) */
        background: var(--content);
        margin: 0 auto;  /* centers it horizontally */
        margin-top: 100px;
        z-index: 1;
    }

    .lhs_content {
        position: absolute;
        width: 320px;
        height: 400px;
        background: var(--content-accent);
        left: 150px;
        top: 50px;  /* overlaps above mid_content */
        z-index: 0;
    }

    .rhs_content {
        position: absolute;
        width: 320px;
        height: 400px;
        background: var(--content-accent);
        right: 10%;
        top: 350px;  /* lower than lhs_content */
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
        <!-- left content here -->
    </div>
    
    <div class="mid_content">
        <!-- middle content here -->
    </div>
    
    <div class="rhs_content">
        <!-- right content here -->
    </div>
</main>

