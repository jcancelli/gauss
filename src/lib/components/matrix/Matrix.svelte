<script lang="ts">
	import type Matrix from "$lib/logic/Matrix";
	import RationalNumber from "../RationalNumber.svelte";
	import Bracket from "./Bracket.svelte";

	export let matrix: Matrix;
</script>

<div class="flex justify-center items-center">
	<Bracket side="open" />
	<div
		class="grid gap-2 p-2"
		style:grid-template-rows="repeat({matrix.height()}, 1fr)"
		style:grid-template-columns="repeat({matrix.width()}, 1fr)"
	>
		{#each Array(matrix.height()) as _, row}
			{#each Array(matrix.width()) as _, col}
				<div
					class="flex items-center justify-center"
					style:grid-column={col + 1}
					style:grid-row={row + 1}
				>
					<RationalNumber value={matrix.element(row + 1, col + 1)} />
				</div>
			{/each}
		{/each}
	</div>
	<Bracket side="closed" />
</div>
