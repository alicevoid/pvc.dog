<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<style>

:root {

    /* Greyscale Colors */
    --gs_accent: #8a8a8a;
    --gs_pagebg: #5e5e5e;
    --gs_selection: #858585;
    --gs_sectionbg: #c4c4c4;
    --gs_header-color: #cecece;
    --gs_header2-color: #706f6f;
    --gs_linkbg: #c5c5c5;
    --gs_text-color: #000000;

    /* Original Colors */
    --accent: #12EFDD;
    --pagebg: #1224EF;
    --selection: #f20b99;
    --sectionbg: #e0bcc5;
    --header-color: #6F12EF;
    --header2-color: #440ab1;
    --linkbg: #00fc7e;
    --text-color: #000000;
}

:global(html){
	background: var(--pagebg);
	background-image: url('$lib/assets/1103.png');
	font-family: 'basiic';
	font-size: 15px;
	/* animation: scrollBackground 16s linear infinite; */
}

@font-face {
    font-family: 'basiic';
    src: url('$lib/assets/basiic.ttf') format('truetype');
}

.header {
    /* Thank you Ivy Synth-Thetic <3 */
    position: sticky;
	color: var(--header-color);
    background: var(--accent);
    font-size: 5em;
    line-height: 4rem;
    padding-top: 2rem;
    padding-bottom: 0;
    height: 7rem;
    width: 100%;
    z-index: 9999;
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

        <center>
            Test
        </center>

        <div class="tabs">
            <center>
                <!-- TODO: -->
					<!-- About -->
					<!-- RecycleBin -->
					<!-- Dawn Wheel -->
            </center>
        </div>
    </div>
</div>


{@render children()}
