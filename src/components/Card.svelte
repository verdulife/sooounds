<script lang="ts">
	import type { AudioControl } from '@/lib/types';
	import { getFileURL, inputFileAsync } from '@/lib/utils';
	import { set } from 'idb-keyval';

	import Edit from '@/icons/Edit.svelte';
	import Play from '@/icons/Play.svelte';
	import Pause from '@/icons/Pause.svelte';
	import VolumeMax from '@/icons/VolumeMax.svelte';
	import VolumeMin from '@/icons/VolumeMin.svelte';
	import Muted from '@/icons/Muted.svelte';

	export let card: string;
	export let data: { file: File | null; label: string } = {
		file: null,
		label: 'Empty card'
	};

	let audio: AudioControl = {
		el: null,
		time: 0,
		volume: 0.5,
		duration: 0,
		paused: true
	};

	let lastVolume: number;

	async function defineCard() {
		const label = prompt('Añade un nombre');
		if (!label) return;

		const file = await inputFileAsync();

		data = { file, label };
		await set(card, { file, label });
	}

	function seekIn() {
		audio.volume = 0;
	}

	function seekOut() {
		audio.volume = lastVolume || 0.5;
	}

	function playPause() {
		if (!audio.el) return;

		if (audio.paused) audio.el.play();
		else audio.el.pause();
	}

	function toggleVolume() {
		if (audio.volume > 0) {
			lastVolume = audio.volume;
			audio.volume = 0;
		} else {
			audio.volume = lastVolume || 0.5;
		}
	}

	function resetAudio() {
		audio.time = 0;
	}

	function setVolume(ev: Event) {
		if (!ev.target) return;
		const value = ev.target as HTMLInputElement;
		audio.volume = value.valueAsNumber;
	}

	function keyBinding(ev: KeyboardEvent) {
		if (ev.key !== card.at(-1)) return;
		playPause();
	}
</script>

<svelte:window on:keydown={(ev) => keyBinding(ev)} />

<button
	class="relative flex flex-col justify-center items-center w-full h-full border border-slate-900 bg-gradient-to-tr from-transparent to-slate-900/70 rounded-xl"
	on:click|self={playPause}
>
	<h1
		class="text-4xl text-gray-800 font-bold capitalize pointer-events-none"
		class:text-white={data.file}
	>
		{data.label}
	</h1>

	<button class="absolute top-4 right-4" on:click={defineCard}><Edit></Edit></button>

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
					class="w-full cursor-pointer"
					type="range"
					min="0"
					step="0.01"
					max={audio.duration}
					bind:value={audio.time}
					on:mousedown={seekIn}
					on:mouseup={seekOut}
				/>
			</div>

			<span
				class="flex flex-col items-center gap-2 [&>span]:hover:opacity-100 [&>span]:hover:pointer-events-auto"
			>
				<span class="opacity-0 pointer-events-none transition-opacity">
					<input
						class="vertical w-1 cursor-pointer"
						type="range"
						min={0}
						max={1}
						step="0.01"
						value={audio.volume}
						on:change={(ev) => setVolume(ev)}
					/>
				</span>

				<button on:click={toggleVolume}>
					{#if audio.volume >= 0.5}
						<VolumeMax></VolumeMax>
					{:else if audio.volume > 0}
						<VolumeMin></VolumeMin>
					{:else}
						<Muted></Muted>
					{/if}
				</button>
			</span>
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
</button>
