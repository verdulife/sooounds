<script lang="ts">
	import '@/app.postcss';
	import Footer from '@/components/Footer.svelte';
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<main class="grid grid-cols-4 grid-rows-1 h-full">
		<section class="col-span-4 row-span-1">
			<slot />
		</section>
	</main>

	<Footer></Footer>
</div>
