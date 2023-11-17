<script lang="ts">
	import type { SearchResults } from '@/lib/types';
	import { searchByTerm } from '@/lib/services';

	let input: string;
	let results: Array<SearchResults>;

	async function handleSubmit() {
		const res = await searchByTerm(input);
		const { data } = res;

		results = data;
	}
</script>

<main class="p-8 pr-0 h-full">
	<section
		class="flex flex-col justify-center items-center w-full h-full border border-slate-900 bg-gradient-to-tr from-transparent to-slate-900/70 rounded-xl overflow-y-auto"
	>
		<h1>search</h1>
		<form on:submit|preventDefault={handleSubmit}>
			<input class="text-gray-950" type="search" bind:value={input} />
		</form>

		{#if results}
			<ul>
				{#each results as { title, url }}
					<li>
						<h2>{title}</h2>
						<audio src={url} controls></audio>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</main>
