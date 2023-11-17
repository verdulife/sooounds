<script lang="ts">
	import { filePickerOptions, getFileURL } from '@/lib/utils';
	import { set } from 'idb-keyval';

	export let card: string;
	export let data: { file: File | null; label: string } = {
		file: null,
		label: 'Empty card'
	};

	async function defineCard() {
		const label = prompt('Añade un nombre');
		if (!label) return;

		const [fileRef] = await showOpenFilePicker(filePickerOptions);
		const file = await fileRef.getFile();

		data = { file, label };
		await set(card, { file, label });
	}
</script>

<button class="grid place-content-center w-full h-full border" on:click={defineCard}>
	<h1>{data.label}</h1>

	{#if data.file}
		{#await getFileURL(data.file) then src}
			<audio {src} controls></audio>
		{/await}
	{/if}
</button>
