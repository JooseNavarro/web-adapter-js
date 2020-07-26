<svelte:options tag="micro-profile" />

<script>
	import { afterUpdate } from 'svelte';
	import './components/Hello.svelte';
	import { Props, Routes, StoreAdapter } from "../../../dist/index.js";

	export let key;
	const router = new Routes();
	const props = new Props();
	const store = StoreAdapter.child;
	let count = 0;
	let user = null;

	const serializer = ( stateApp ) => stateApp.filter( ( { id } ) => id === key );

	afterUpdate(() => user = props.find(`micro-profile-${key}`));

	store.on().subscribe( ( { stateApp } ) => {
		const [ item ] = serializer(stateApp);
		// user = item;
	});

	const handleClick = () => store.dispatch(user);

	const handleRoute = () => {}
</script>

<main>
	<div class="card" on:click={handleClick}>
		{#if !!user }
			<img src={ user.picture.large } alt="">
			<h2>{ user.name.first  } { user.name.last }</h2>
			<p><strong>Cell: </strong> { user.cell  } </p>
		{/if}
	</div>
</main>

<style>
	.card {
		margin: 15px;
		cursor: pointer;
		text-align: center;
		font-family: sans-serif;
		font-weight: 500;
	}
	.card h2 { font-size: 25px; }
	img { border-radius: 50%; }
</style>
