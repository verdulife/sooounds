<script lang="ts">
	import type { CardData } from '@/lib/types';
	import { entries } from 'idb-keyval';
	import { onMount } from 'svelte';
	import Card from '@/components/Card.svelte';

	let cards: Array<CardData>;

	function fetchData(id: string) {
		if (!cards) return;
		const cardData = cards.find((item) => item.card === id);
		return cardData;
	}

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

{#if cards}
	<main class="grid grid-cols-3 grid-rows-2 w-full h-screen p-8 pb-14 gap-4">
		<section class="col-span-2 row-span-1">
			<Card card="card1" data={fetchData('card1')}></Card>
		</section>

		<section class="col-span-1 row-span-1">
			<Card card="card2" data={fetchData('card2')}></Card>
		</section>

		<section class="col-span-1 row-span-1">
			<Card card="card3" data={fetchData('card3')}></Card>
		</section>

		<section class="col-span-1 row-span-1">
			<Card card="card4" data={fetchData('card4')}></Card>
		</section>

		<section class="col-span-1 row-span-1">
			<Card card="card5" data={fetchData('card5')}></Card>
		</section>
	</main>
{/if}
