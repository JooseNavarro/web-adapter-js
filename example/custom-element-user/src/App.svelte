<svelte:options tag="element-user"/>

<script>

	import { EventHandler } from "../../../dist/";
	let user = { count: 0 };
	const event =  EventHandler.custom('[HEADER]');
	event.onChanges(({ count })=> user = { count: user.count + count }, '[USER]')
</script>

<main>
	<h1>Hello {user.count}!</h1>
</main>

<style>

</style>