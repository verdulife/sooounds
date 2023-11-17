<script lang="ts">
	import type { CardData } from '@/lib/types';
	import { getAudioURL, promptFile } from '@/lib/utils';

	export let cardId: string;
	export let data: CardData = {
		fileRef: null,
		label: 'Empty',
		cardId
	};

	$: if (data.fileRef) data.fileRef.requestPermission();

	async function defineCard() {
		const label = prompt('Añade un nombre');
		if (!label) return;

		const { fileRef } = await promptFile({ label, cardId });

		data = { fileRef, label, cardId };
	}
</script>

<button id={cardId} class="grid place-content-center w-full h-full border" on:click={defineCard}>
	<h1>{data.label}</h1>

	{#if data.fileRef}
		{#await getAudioURL(data.fileRef) then src}
			<audio {src} controls></audio>
		{/await}
	{/if}
</button>
