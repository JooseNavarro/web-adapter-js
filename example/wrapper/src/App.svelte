<script>

	import { LoadScripts } from "../../../dist/";

	const load = new LoadScripts();
	load.import([
		{ name: 'element-nav', src: 'http://127.0.0.1:8085/custom-element-nav/public/build/bundle.js' },
		{ name: 'element-user', src: 'http://127.0.0.1:8085/custom-element-user/public/build/bundle.js' },
		{ name: 'element-footer', src: 'http://127.0.0.1:8085/custom-element-footer/public/build/bundle.js' },
	]);

</script>

<main>
	<element-nav></element-nav>
	<element-user></element-user>
	<element-footer></element-footer>
</main>

<style>

</style>