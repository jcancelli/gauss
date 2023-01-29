<script lang="ts">
	import { Button } from "flowbite-svelte";
	import Matrix from "$lib/logic/Matrix";
	import type RationalNumber from "$lib/logic/RationalNumber";
	import RationalNumberInput from "../RationalNumberInput.svelte";
	import Bracket from "./Bracket.svelte";
	import { createEventDispatcher } from "svelte";

	export let value: Matrix = new Matrix([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	]);

	export function clear() {
		value = new Matrix([
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		]);
	}

	const dispatch = createEventDispatcher();

	function onElementInput(
		row: number,
		col: number,
		val: RationalNumber
	): void {
		const newVal = value.createCopy();
		newVal.setElement(row, col, val);
		value = newVal;
		dispatch("input");
	}

	function onParsingError(error: CustomEvent<any>): void {
		dispatch("error", {
			errorMessage: error.detail.error,
		});
	}

	function onElementBlur(row: number, col: number): void {
		const val = value.element(row, col);
		const reduced = val.reduce();
		if (!val.equals(reduced)) {
			console.log("blur");
			const newVal = value.createCopy();
			newVal.setElement(row, col, reduced);
			value = newVal;
			dispatch("input");
		}
	}

	function onResetButtonPressed(): void {
		clear();
		dispatch("reset");
	}
</script>

<div class="w-52 flex flex-col items-center justify-center">
	<div class="flex justify-center items-center">
		<Bracket side="open" />
		<div
			class="grid gap-2 p-2"
			style:grid-template-rows="repeat({value.height()}, 1fr)"
			style:grid-template-columns="repeat({value.width()}, 1fr)"
		>
			{#each Array(value.height()) as _, row}
				{#each Array(value.width()) as _, col}
					<div style:grid-column={col + 1} style:grid-row={row + 1}>
						<RationalNumberInput
							value={value.element(row + 1, col + 1)}
							on:input={(e) => {
								onElementInput(
									row + 1,
									col + 1,
									e.detail.value
								);
							}}
							on:parsing-error={onParsingError}
							on:blur={() => onElementBlur(row + 1, col + 1)}
						/>
					</div>
				{/each}
			{/each}
		</div>
		<Bracket side="closed" />
	</div>
	<div>
		<Button color="red" class="!px-2 !py-1" on:click={onResetButtonPressed}>
			Reset
		</Button>
		<slot name="buttons" />
	</div>
</div>
