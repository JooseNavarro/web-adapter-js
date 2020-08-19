<svelte:options tag="element-nav"/>

<script>
	import { EventHandler } from "../../../dist/";
	const event = EventHandler.custom('[HEADER]');

	const cli = ()=> event.dispatch({ count: 1 }, '[USER]')
</script>

<main>
	<nav>
		<button on:click={cli}>Add</button> <br>
	</nav>
</main>

<style>
	nav {
		position: fixed;
		width: 100vw;
		background: red;
		top: 0;
	}
</style>