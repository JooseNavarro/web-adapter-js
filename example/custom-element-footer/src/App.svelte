<svelte:options tag="element-footer"/>

<script>
	import { EventHandler } from "../../../dist/";
	const event = EventHandler.custom('[HEADER]');

	const cli = ()=> event.dispatch({ count: 1 }, '[USER]')
</script>

<footer>
    <button on:click={cli}>Add</button> <br>
</footer>

<style>
	footer {
		position: fixed;
		width: 100vw;
		bottom: 0;
	}
</style>