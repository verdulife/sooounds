<script lang="ts">
	import type { CardData } from '@/lib/types';
	import { onMount } from 'svelte';
	import { entries } from 'idb-keyval';
	import Deck from '@/components/Deck.svelte';

	let cards: Array<CardData>;

	onMount(async () => {
		const idb = await entries();
		cards = idb.map((item) => {
			const [id, data] = item;
			const file: File = data.file;
			const label: string = data.label;
			const card = id.toString();
			const cardData: CardData = { file, label, card };
			return cardData;
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Deck {cards}></Deck>
