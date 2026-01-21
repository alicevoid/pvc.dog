
<!-- !!!!! Script Stuff !!!!! -->

<script lang="ts">

	import favicon from '$lib/assets/favicon.svg';
    import { onMount } from 'svelte';

	let { children } = $props();

    // ==========================================================================================
    // THEME STUFF 
    // ==========================================================================================

    // Theme Stuff
    let currentTheme = $state('silica');

    // Set the Theme
    function setTheme(themeName: string) {
        currentTheme = themeName;
        if (themeName && typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', themeName);

            // localstorage
            localStorage.setItem('theme', themeName);
        }
    }

    // Initialize theme on mount
    onMount(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            currentTheme = savedTheme;
        }
        document.documentElement.setAttribute('data-theme', currentTheme);
    });

</script>

<!-- !!!!! Style Stuff !!!!! -->

<style>

/* CHANGE COLORS HERE !!! */
:root {

    /* Silica Colors */
    --sil_accent: #D1D5BA;
    --sil_background: #87958F;
    --sil_content-accent: #D1D5BA;
    --sil_content: #e1e4d0;
    --sil_header-color: #7B7574;
    --sil_text-color: #7B7574;
    --sil_linkbg: #A2A497;

    /* Construction Zone Colors */
    --cz_accent: #642915;
    --cz_background: #008585;
    --cz_content-accent: #74a892;
    --cz_content: #74a892;
    --cz_header-color: #c7522a;
    --cz_text-color: #fbf2c4;
    --cz_linkbg: #e5c185;

    /* Sandbox */
    --sb_accent: #f9f7cd;
    --sb_background: #f5ee9e;
    --sb_content-accent: #246eb9;
    --sb_content: #f06543;
    --sb_header-color: #4cb944;
    --sb_text-color: #f9f7cd;
    --sb_linkbg: #f06543;

    /* Original Colors */
    --ori_accent: #12EFDD;
    --ori_background: #1224EF;
    --ori_content-accent: #12EFDD;
    --ori_content: #e0bcc5;
    --ori_header-color: #f20b99;
    --ori_text-color: #440ab1;
    --ori_linkbg: #00fc7e;
}

/* CONSTRUCTION ZONE THEMEING */
:global(html[data-theme='constructionzone']) {
    --accent: var(--cz_accent);
    --background: var(--cz_background);
    --content-accent: var(--cz_content-accent);
    --content: var(--cz_content);
    --header-color: var(--cz_header-color);
    --text-color: var(--cz_text-color);
    --linkbg: var(--cz_linkbg);
}

/* SANDBOX THEMEING */
:global(html[data-theme='sandbox']) {
    --accent: var(--sb_accent);
    --background: var(--sb_background);
    --content-accent: var(--sb_content-accent);
    --content: var(--sb_content);
    --header-color: var(--sb_header-color);
    --text-color: var(--sb_text-color);
    --linkbg: var(--sb_linkbg);
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
    --accent: var(--sil_accent);
    --background: var(--sil_background);
    --content-accent: var(--sil_content-accent);
    --content: var(--sil_content);
    --header-color: var(--sil_header-color);
    --text-color: var(--sil_text-color);
    --linkbg: var(--sil_linkbg);
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

:global(html[data-theme='sandbox']) .theme_button {
    border-color: var(--linkbg);
    background-clip: padding-box;
}

:global(.theme-sandbox) {
    background: linear-gradient(135deg, var(--sb_accent) 50%, var(--sb_header-color) 50%);
    background-size: contain;
}

:global(.theme-constructionzone) {
    background: linear-gradient(135deg, var(--cz_accent) 50%, var(--cz_header-color) 50%);
    background-size: contain;
}

:global(.theme-silica) {
    background: linear-gradient(135deg, var(--sil_accent) 50%, var(--sil_header-color) 50%);
    background-size: contain;
}

:global(.theme-original) {
    background: linear-gradient(135deg, var(--ori_accent) 50%, var(--ori_header-color) 50%);
    background-size: contain;
}

.footer {
    background: var(--accent);
    color: var(--header-color);
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
            <div class="theme_button theme-silica {currentTheme === 'silica' ? 'active' : ''}"
                onclick={() => setTheme('silica')} onkeydown={() => setTheme('silica')} role="button" tabindex="0"></div>
            <div class="theme_button theme-constructionzone {currentTheme === 'constructionzone' ? 'active' : ''}"
                onclick={() => setTheme('constructionzone')} onkeydown={() => setTheme('constructionzone')} role="button" tabindex="0"></div>
            <div class="theme_button theme-sandbox {currentTheme === 'sandbox' ? 'active' : ''}"
                onclick={() => setTheme('sandbox')} onkeydown={() => setTheme('sandbox')} role="button" tabindex="0"></div>
            <div class="theme_button theme-original {currentTheme === 'original' ? 'active' : ''}"
                onclick={() => setTheme('original')} onkeydown={() => setTheme('original')} role="button" tabindex="0"></div>
        </div>
    </div>

    <!-- My Awesome Footer ^^! -->
    <div class="footer">
        <!-- The Memo -->
        <p>
            operated by alicevoid - make sure to be nice to yourself &lt;3
        </p>
    </div>
</div>


{@render children()}
