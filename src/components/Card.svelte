<script lang="ts">
	import type { AudioControl } from '@/lib/types';
	import { getFileURL, inputFileAsync } from '@/lib/utils';
	import { set } from 'idb-keyval';

	import Edit from '@/icons/Edit.svelte';
	import Play from '@/icons/Play.svelte';
	import Pause from '@/icons/Pause.svelte';
	import VolumeMax from '@/icons/VolumeMax.svelte';
	import Muted from '@/icons/Muted.svelte';
	import FadeIn from '@/icons/FadeIn.svelte';
	import FadeOut from '@/icons/FadeOut.svelte';

	export let card: string;
	export let data: { file: File | null; label: string } = {
		file: null,
		label: 'Empty card'
	};

	let audio: AudioControl = {
		el: null,
		time: 0,
		volume: 1,
		duration: 0,
		paused: true
	};

	let fadeIn: Function;
	let fadeOut: Function;

	async function defineCard() {
		const label = prompt('Añade un nombre');
		if (!label) return;

		const file = await inputFileAsync();

		data = { file, label };
		await set(card, { file, label });
	}

	function mute() {
		audio.volume = 0;
	}

	function unmute() {
		audio.volume = 1;
	}

	function playPause() {
		if (!audio.el) return;

		if (audio.paused) audio.el.play();
		else audio.el.pause();
	}

	function toggleVolume() {
		if (audio.volume > 0) mute();
		else unmute();
	}

	function resetAudio() {
		audio.time = 0;
	}

	function keyBinding(ev: KeyboardEvent) {
		if (ev.key !== card.at(-1)) return;
		playPause();
	}
</script>

<svelte:window on:keydown={(ev) => keyBinding(ev)} />

<article
	class="relative flex flex-col justify-center items-center w-full h-full border border-slate-900 bg-gradient-to-tr from-transparent to-slate-900/70 rounded-xl"
>
	<h1
		class="text-2xl text-gray-800 font-bold capitalize pointer-events-none"
		class:text-white={data.file}
	>
		{data.label}
	</h1>

	<aside class="absolute top-4 right-4 flex flex-col items-center gap-2">
		<button on:click={defineCard}><Edit></Edit></button>
		<button on:click={() => fadeIn()}><FadeIn></FadeIn></button>
		<button on:click={() => fadeOut()}><FadeOut></FadeOut></button>
	</aside>

	{#if data.file}
		<nav class="absolute inset-0 top-auto flex items-end gap-4 p-4">
			<div class="flex items-center w-full gap-4">
				<button on:click={playPause}>
					{#if audio.paused}
						<Play></Play>
					{:else}
						<Pause></Pause>
					{/if}
				</button>

				<input
					type="range"
					min="0"
					step="0.01"
					max={audio.duration}
					bind:value={audio.time}
					on:mousedown={mute}
					on:mouseup={unmute}
				/>
			</div>

			<button on:click={toggleVolume}>
				{#if audio.volume > 0}
					<VolumeMax></VolumeMax>
				{:else}
					<Muted></Muted>
				{/if}
			</button>
		</nav>

		{#await getFileURL(data.file) then src}
			<audio
				{src}
				bind:this={audio.el}
				bind:currentTime={audio.time}
				bind:volume={audio.volume}
				bind:duration={audio.duration}
				bind:paused={audio.paused}
				on:ended={resetAudio}
			></audio>
		{/await}
	{/if}
</article>

<style>
	input[type='range'] {
		--thumb-height: 5px;
		--track-height: 5px;
		--track-color: navy;
		--brightness-hover: 180%;
		--brightness-down: 80%;
		--clip-edges: 0.125em;

		cursor: pointer;
		position: relative;
		width: 100%;
		background: #fff0;
		color: teal;
		border-radius: 5px;
		overflow: hidden;
	}

	input[type='range']:active {
		cursor: grabbing;
	}

	input[type='range'],
	input[type='range']::-webkit-slider-runnable-track,
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: var(--thumb-height);
		transition: all ease 100ms;
	}

	input[type='range']::-webkit-slider-runnable-track,
	input[type='range']::-webkit-slider-thumb {
		position: relative;
	}

	input[type='range']::-webkit-slider-thumb {
		--box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0 100vmax currentColor;

		width: var(--thumb-width, var(--thumb-height));
		background-color: currentColor;
		box-shadow: var(--box-fill);
		border-radius: 0 5px 5px 0;

		filter: brightness(100%);
	}

	input[type='range']:hover::-webkit-slider-thumb {
		filter: brightness(var(--brightness-hover));
		cursor: grab;
	}

	input[type='range']:active::-webkit-slider-thumb {
		filter: brightness(var(--brightness-down));
		cursor: grabbing;
	}

	input[type='range']::-webkit-slider-runnable-track {
		background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center / 100%
			calc(var(--track-height) + 1px);
	}

	input[type='range']:disabled::-webkit-slider-thumb {
		cursor: not-allowed;
	}

	/* === Firefox specific styles === */
	input[type='range'],
	input[type='range']::-moz-range-track,
	input[type='range']::-moz-range-thumb {
		appearance: none;
		transition: all ease 100ms;
		height: var(--thumb-height);
	}

	input[type='range']::-moz-range-track,
	input[type='range']::-moz-range-thumb,
	input[type='range']::-moz-range-progress {
		background: #fff0;
	}

	input[type='range']::-moz-range-thumb {
		background: currentColor;
		border: 0;
		width: var(--thumb-width, var(--thumb-height));
		border-radius: var(--thumb-width, var(--thumb-height));
		cursor: grab;
	}

	input[type='range']:active::-moz-range-thumb {
		cursor: grabbing;
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		background: var(--track-color);
	}

	input[type='range']::-moz-range-progress {
		appearance: none;
		background: currentColor;
		transition-delay: 30ms;
	}

	input[type='range']::-moz-range-track,
	input[type='range']::-moz-range-progress {
		height: calc(var(--track-height));
		border-radius: var(--track-height);
	}

	input[type='range']::-moz-range-thumb,
	input[type='range']::-moz-range-progress {
		filter: brightness(100%);
	}

	input[type='range']:hover::-moz-range-thumb,
	input[type='range']:hover::-moz-range-progress {
		filter: brightness(var(--brightness-hover));
	}

	input[type='range']:active::-moz-range-thumb,
	input[type='range']:active::-moz-range-progress {
		filter: brightness(var(--brightness-down));
	}

	input[type='range']:disabled::-moz-range-thumb {
		cursor: not-allowed;
	}
</style>
