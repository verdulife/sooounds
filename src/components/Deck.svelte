<script lang="ts">
	import type { CardData } from '@/lib/types';

	import Card from './Card.svelte';
	import { cardsLayout } from '@/lib/cards';

	export let cards: Array<CardData>;

	function fetchData(id: string) {
		if (!cards) return;
		const cardData = cards.find((item) => item.card === id);
		return cardData;
	}
</script>

<main class="grid grid-cols-4 grid-rows-2 h-full p-8 gap-4">
	{#if cards}
		{#each cardsLayout as card}
			<section class="col-span-1 row-span-1">
				<Card {card} data={fetchData(card)}></Card>
			</section>
		{/each}
	{/if}
</main>
