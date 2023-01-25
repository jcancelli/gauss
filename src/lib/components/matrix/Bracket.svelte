<script lang="ts">
	export let side: "open" | "closed" = "open";
</script>

<div
	class="bg-black w-1 self-stretch {side === 'open'
		? 'rounded-l-3xl'
		: 'rounded-r-3xl'}"
/>
