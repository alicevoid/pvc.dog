
<!-- !!!!! Script Stuff !!!!! -->

<script lang="ts">

	import favicon from '$lib/assets/favicon.svg';
    import { onMount } from 'svelte';

	let { children } = $props();

    // ==========================================================================================
    // THEME STUFF 
    // ==========================================================================================

    // Theme Stuff
    let currentTheme = $state('original');

    // Set the Theme
    function setTheme(themeName: string) {
        currentTheme = themeName;
        if (themeName && typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', themeName);
        }
    }

    // Initialize theme on mount
    onMount(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
    });

</script>

<!-- !!!!! Style Stuff !!!!! -->

<style>

/* CHANGE COLORS HERE !!! */
:root {

    /* Acid Bath */
    --ab_accent: #f1ffe7;
    --ab_background: #6c464e;
    --ab_content-accent: #a9fdac;
    --ab_content: #44cf6c;
    --ab_header-color: #32a287;
    --ab_text-color: #6C464E;
    --ab_linkbg: #00ccff;
    --ab_text-color: #f1ffe7;

    /* Silica Colors */
    --sil_accent: #D1D5BA;
    --sil_background: #87958F;
    --sil_content-accent: #EAECDF;
    --sil_content: #D1D5BA;
    --sil_header-color: #7B7574;
    --sil_text-color: #A2A497;
    --sil_linkbg: #87958F;
    --sil_text-color: #282828;

    /* Professional Colors */
    --pro_accent: #004080;
    --pro_background: #e6f0ff;
    --pro_content-accent: #cce0ff;
    --pro_content: #b3c7ff;
    --pro_header-color: #003366;
    --pro_text-color: #002244;
    --pro_linkbg: #00509e;
    --pro_text-color: #000000;

    /* Greyscale Colors */
    --gs_accent: #8a8a8a;
    --gs_background: #5e5e5e;
    --gs_content-accent: #858585;
    --gs_content: #c4c4c4;
    --gs_header-color: #cecece;
    --gs_text-color: #706f6f;
    --gs_linkbg: #c5c5c5;
    --gs_text-color: #000000;

    /* Original Colors */
    --ori_accent: #12EFDD;
    --ori_background: #1224EF;
    --ori_content-accent: #f20b99;
    --ori_content: #e0bcc5;
    --ori_header-color: #6F12EF;
    --ori_text-color: #440ab1;
    --ori_linkbg: #00fc7e;
    --ori_text-color: #000000;
}

/* SILICA THEMEING */
:global(html[data-theme='silica']) {
    --accent: var(--sil_accent);
    --background: var(--sil_background);
    --content-accent: var(--sil_content-accent);
    --content: var(--sil_content);
    --header-color: var(--sil_header-color);
    --text-color: var(--sil_text-color);
    --linkbg: var(--sil_linkbg);
}

/* ACID BATH THEMEING */
:global(html[data-theme='acidbath']) {
    --accent: var(--ab_accent);
    --background: var(--ab_background);
    --content-accent: var(--ab_content-accent);
    --content: var(--ab_content);
    --header-color: var(--ab_header-color);
    --text-color: var(--ab_text-color);
    --linkbg: var(--ab_linkbg);
}

/* GREYSCALE THEMEING */
:global(html[data-theme='greyscale']) {
    --accent: var(--gs_accent);
    --background: var(--gs_background);
    --content-accent: var(--gs_content-accent);
    --content: var(--gs_content);
    --header-color: var(--gs_header-color);
    --text-color: var(--gs_text-color);
    --linkbg: var(--gs_linkbg);
}

/* ORIGINAL THEMEING */
:global(html[data-theme='original']) {
    --accent: var(--ori_accent);
    --background: var(--ori_background);
    --content-accent: var(--ori_content-accent);
    --content: var(--ori_content);
    --header-color: var(--ori_header-color);
    --text-color: var(--ori_text-color);
    --linkbg: var(--ori_linkbg);
}

/* DEFAULT THEME (applies immediately on load before JS runs) */
:global(html) {
    --accent: var(--ori_accent);
    --background: var(--ori_background);
    --content-accent: var(--ori_content-accent);
    --content: var(--ori_content);
    --header-color: var(--ori_header-color);
    --text-color: var(--ori_text-color);
    --linkbg: var(--ori_linkbg);
}

:global(html){
	background: var(--background);
	background-image: url('$lib/assets/1103.png');
	font-family: 'basiic';
	font-size: 15px;
    margin: 0;
    padding: 0;
	/* animation: scrollBackground 16s linear infinite; */
}

:global(body) {
    margin: 0;
    padding: 0;
}

@font-face {
    font-family: 'basiic';
    src: url('$lib/assets/basiic.ttf') format('truetype');
}

.page-container {
    margin: 0;
    padding: 0;
}

.header {
    color: var(--header-color);
    background: var(--accent);
    height: 100px;
    width: 100%;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    position: sticky;
    box-sizing: border-box;
    align-content: center;
}

.ascii_art {
    font-family: 'basiic';
    font-size: 22px;
    line-height: 22px;
    text-align: center;
}

.ascii_art h1 {
    margin: 0;      
    padding: 0;      
}

.theme_div {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    margin-top: 40px;
    gap: 8px;
    z-index: 10;
}

.theme_button {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border: 2px solid var(--background);
    transition: transform 0.1s ease;
}

:global(.theme-acidbath) {
    background: linear-gradient(135deg, var(--ab_accent) 50%, var(--ab_header-color) 50%);
    background-size: contain;
}

:global(.theme-silica) {
    background: linear-gradient(135deg, var(--sil_accent) 50%, var(--sil_header-color) 50%);
    background-size: contain;
}

:global(.theme-greyscale) {
    background: linear-gradient(135deg, var(--gs_accent) 50%, var(--gs_header-color) 50%);
    background-size: contain;
}

:global(.theme-original) {
    background: linear-gradient(135deg, var(--ori_accent) 50%, var(--ori_header-color) 50%);
    background-size: contain;
}

.footer {
    background: var(--accent);
    color: var(--text-color);
    height: 60px;
    width: 100%;
    z-index: 9999;
    bottom: 0;
    left: 0;
    position: fixed;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
}
</style>


<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- Standard Header Stuff -->
    <title> 01.25" PVC Pipe Database</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#12efdd">

</svelte:head>

<div class="page-container">
	<!-- My Awesome Header ^^! -->
    <div class="header">

        <!-- Ascii Art Animation -->
        <div class="ascii_art">
            <h1>[&gt;\.&lt;;;].. zZ</h1>
        </div>

        <!-- Theme Switcher Buttons -->
        <div class="theme_div">
            <div class="theme_button theme-greyscale {currentTheme === 'greyscale' ? 'active' : ''}"
                onclick={() => setTheme('greyscale')} onkeydown={() => setTheme('greyscale')} role="button" tabindex="0"></div>
            <div class="theme_button theme-silica {currentTheme === 'silica' ? 'active' : ''}"
                onclick={() => setTheme('silica')} onkeydown={() => setTheme('silica')} role="button" tabindex="0"></div>
            <div class="theme_button theme-acidbath {currentTheme === 'acidbath' ? 'active' : ''}"
                onclick={() => setTheme('acidbath')} onkeydown={() => setTheme('acidbath')} role="button" tabindex="0"></div>
            <div class="theme_button theme-original {currentTheme === 'original' ? 'active' : ''}"
                onclick={() => setTheme('original')} onkeydown={() => setTheme('original')} role="button" tabindex="0"></div>
        </div>
    </div>

    <!-- My Awesome Footer ^^! -->
    <div class="footer">
        <p>
            operated by alicevoid - make sure to be nice to yourself &lt;3
        </p>
    </div>
</div>


{@render children()}
