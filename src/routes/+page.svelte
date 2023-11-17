<script lang="ts">
	import type { CardData } from '@/lib/types';
	import { entries } from 'idb-keyval';
	import { onMount } from 'svelte';

	import Card from '@/components/Card.svelte';

	let cards: Array<CardData>;

	onMount(async () => {
		const db = await entries();
		cards = db.map((card) => card[1]);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if cards}
	<main class="grid grid-cols-4 grid-rows-3 w-full h-screen p-8 pb-14 gap-4">
		<section class="col-span-2 row-span-2">
			<Card cardId="card1" data={cards.find((card) => card.cardId === 'card1')}></Card>
		</section>

		<section class="col-span-2 row-span-2">
			<Card cardId="card2"></Card>
		</section>

		<section class="col-span-1 row-span-1">
			<Card cardId="card3"></Card>
		</section>

		<section class="col-span-1 row-span-1">
			<Card cardId="card4"></Card>
		</section>

		<section class="col-span-1 row-span-1">
			<Card cardId="card5"></Card>
		</section>

		<section class="col-span-1 row-span-1">
			<Card cardId="card6"></Card>
		</section>
	</main>
{/if}
