<script lang="ts">
	import type { CardData } from '@/lib/types';
	import { cardsLayout } from '@/lib/cards';
	import Card from './Card.svelte';

	export let cards: Array<CardData>;

	function fetchData(id: string) {
		if (!cards) return;
		const cardData = cards.find((item) => item.card === id);
		return cardData;
	}
</script>

<main class="grid grid-cols-8 grid-rows-3 h-full p-8 gap-4">
	{#if cards}
		{#each cardsLayout as { cardId, classes }}
			<section class={classes}>
				<Card card={cardId} data={fetchData(cardId)}></Card>
			</section>
		{/each}
	{/if}
</main>
