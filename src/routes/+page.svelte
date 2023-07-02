<script lang="ts">
	import { initAuth, logout } from '$lib/auth';
    import { onMount } from 'svelte';

    onMount(() => initAuth());
</script>

<section class="container mx-auto p-8">
    <h1 class="h1">Welcome to Wardrobe</h1>
    <p>Coming soon ... ish</p>
    <button class="btn" on:click={logout}>Sign out</button>
</section>
