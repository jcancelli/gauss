<script lang="ts">
	import MatrixInput from "$lib/components/matrix/MatrixInput.svelte";
	import MatrixComponent from "$lib/components/matrix/Matrix.svelte";
	import Matrix from "$lib/logic/Matrix";
	import MatrixSizeInput from "$lib/components/matrix/MatrixSizeInput.svelte";

	let matrix: Matrix = new Matrix([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	]);
	let rowEchelonMatrix: Matrix;

	let matrixHeight = matrix.height();
	let matrixWidth = matrix.width();

	let matrixInputErrorMessage: string | null = null;
	let matrixSizeInputErrorMessage: string | null = null;

	$: {
		rowEchelonMatrix = matrix.createCopy();
		rowEchelonMatrix.toRowEchelonForm();
	}

	function onMatrixResized() {
		matrix = matrix.resize(matrixWidth, matrixHeight);
		matrixSizeInputErrorMessage = null;
	}
</script>

<div class="flex flex-col items-center justify-center">
	<div class="flex flex-col items-center justify-center">
		<MatrixSizeInput
			bind:height={matrixHeight}
			bind:width={matrixWidth}
			on:height-input={onMatrixResized}
			on:width-input={onMatrixResized}
			on:error={(e) =>
				(matrixSizeInputErrorMessage = e.detail.errorMessage)}
		/>
		<p
			class={matrixSizeInputErrorMessage !== null
				? "text-red-700"
				: "text-transparent"}
		>
			{matrixSizeInputErrorMessage}
		</p>
	</div>
	<MatrixInput
		bind:value={matrix}
		on:input={() => (matrixInputErrorMessage = null)}
		on:reset={() => {
			matrixInputErrorMessage = null;
			matrixHeight = matrix.height();
			matrixWidth = matrix.width();
		}}
		on:error={(e) => (matrixInputErrorMessage = e.detail.errorMessage)}
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
	<p
		class={matrixInputErrorMessage !== null
			? "text-red-700"
			: "text-transparent"}
	>
		{matrixInputErrorMessage}
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
