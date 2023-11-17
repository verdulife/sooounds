<script lang="ts">
	import '@/app.postcss';

	import Footer from '@/components/Footer.svelte';
	import Deck from '@/components/Deck.svelte';
	import { onMount } from 'svelte';
	import { entries } from 'idb-keyval';
	import type { CardData } from '@/lib/types';

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

<div class="h-screen flex flex-col overflow-hidden">
	<main class="grid grid-cols-4 grid-rows-1 h-full">
		<!-- <section class="col-span-1 row-span-1">
			<slot />
		</section> -->

		<section class="col-span-4 row-span-1">
			<Deck {cards}></Deck>
		</section>
	</main>

	<Footer></Footer>
</div>
