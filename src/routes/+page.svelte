<script lang="ts">
	import MatrixInput from "$lib/components/matrix/MatrixInput.svelte";
	import MatrixComponent from "$lib/components/matrix/Matrix.svelte";
	import Matrix from "$lib/logic/Matrix";

	let matrix: Matrix = new Matrix([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	]);
	let rowEchelonMatrix: Matrix;
	$: {
		rowEchelonMatrix = matrix.createCopy();
		rowEchelonMatrix.toRowEchelonForm();
	}

	let errorMessage: string | null = null;
</script>

<div class="flex flex-col items-center justify-center">
	<h1 class="mt-6 mb-2 font-semibold text-xl">Input</h1>
	<MatrixInput
		bind:value={matrix}
		on:input={() => (errorMessage = null)}
		on:error={(e) => (errorMessage = e.detail.errorMessage)}
	/>
	<h1 class=" mt-2 ">
		A scala:
		<span
			class={matrix.isRowEchelonForm()
				? "text-green-400"
				: "text-red-400"}
		>
			{matrix.isRowEchelonForm() ? "sì" : "no"}
		</span>
	</h1>
	<p class={errorMessage !== null ? "text-red-700" : "text-transparent"}>
		{errorMessage}
	</p>
</div>

<div class="flex flex-col items-center justify-center">
	<h1 class="mt-6 mb-2 font-semibold text-xl">Matrice a scala</h1>
	<MatrixComponent matrix={rowEchelonMatrix} />
	<h1>
		A scala:
		<span
			class={rowEchelonMatrix.isRowEchelonForm()
				? "text-green-400"
				: "text-red-400"}
		>
			{rowEchelonMatrix.isRowEchelonForm() ? "sì" : "no"}
		</span>
	</h1>
</div>
