<svelte:options tag="micro-profile" />

<script>
	import { RoutesAdapter, StoreAdapter } from '../../../dist/index.js';
	const router = new RoutesAdapter();
	const store = StoreAdapter.child;
	store.on().subscribe( a => console.log('1 svelte: ', a) );

	const handleClick = () => {
		// router.emit('profile', { });
		store.dispatch({ name: '2, svelte' });
	};
</script>

<main>

	<div class="card" style="width: 18rem;">
		<div class="card-body">
			<h5 class="card-title">Special title treatment</h5>
			<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
			<button on:click={handleClick} class="btn btn-primary">Go somewhere</button>
		</div>
	</div>
</main>

<style>
	@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css';

</style>
