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

	function onAddColumnButtonPressed(): void {
		try {
			let newVal = value.createCopy();
			newVal.addColumnToRight();
			value = newVal;
			dispatch("input");
		} catch (err) {
			dispatch("error", {
				errorMessage: (err as Error).message,
			});
		}
	}

	function onRemoveColumnButtonPressed(): void {
		try {
			let newVal = value.createCopy();
			newVal.removeColumnFromRight();
			value = newVal;
			dispatch("input");
		} catch (err) {
			dispatch("error", {
				errorMessage: (err as Error).message,
			});
		}
	}

	function onAddRowButtonPressed(): void {
		try {
			let newVal = value.createCopy();
			newVal.addRowToBottom();
			value = newVal;
			dispatch("input");
		} catch (err) {
			dispatch("error", {
				errorMessage: (err as Error).message,
			});
		}
	}

	function onRemoveRowButtonPressed(): void {
		try {
			let newVal = value.createCopy();
			newVal.removeRowFromBottom();
			value = newVal;
			dispatch("input");
		} catch (err) {
			dispatch("error", {
				errorMessage: (err as Error).message,
			});
		}
	}

	function onClearButtonPressed(): void {
		clear();
		dispatch("input");
	}
</script>

<div class="w-52 flex flex-col items-center justify-center">
	<div class="grid gap-x-1 gap-y-0.5 p-1">
		<!-- empty div just to keep the input centered in the grid -->
		<div class="w-6 h-6" style:grid-column="1" style:grid-row="1" />
		<div
			class="flex justify-center items-center"
			style:grid-column="2"
			style:grid-row="1"
		>
			<Bracket side="open" />
			<div
				class="grid gap-2 p-2"
				style:grid-template-rows="repeat({value.height()}, 1fr)"
				style:grid-template-columns="repeat({value.width()}, 1fr)"
			>
				{#each Array(value.height()) as _, row}
					{#each Array(value.width()) as _, col}
						<div
							style:grid-column={col + 1}
							style:grid-row={row + 1}
						>
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
		<!-- Add/remove column buttons -->
		<div
			class="flex flex-col gap-1 items-center justify-center"
			style:grid-column="3"
			style:grid-row="1"
		>
			<Button
				color="red"
				class="w-6 h-6 !p-0"
				on:click={onRemoveColumnButtonPressed}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					width="24"
					fill="white"
				>
					<path
						d="M6 13.15q-.475 0-.812-.338-.338-.337-.338-.812 0-.475.338-.812.337-.338.812-.338h12q.475 0 .812.338.338.337.338.812 0 .475-.338.812-.337.338-.812.338Z"
					/>
				</svg>
			</Button>
			<Button class="w-6 h-6 !p-0" on:click={onAddColumnButtonPressed}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					width="24"
					fill="white"
				>
					<path
						d="M12 19.15q-.475 0-.812-.338-.338-.337-.338-.812v-4.85H6q-.475 0-.812-.338-.338-.337-.338-.812 0-.475.338-.812.337-.338.812-.338h4.85V6q0-.475.338-.813.337-.337.812-.337.475 0 .812.337.338.338.338.813v4.85H18q.475 0 .812.338.338.337.338.812 0 .475-.338.812-.337.338-.812.338h-4.85V18q0 .475-.338.812-.337.338-.812.338Z"
					/>
				</svg>
			</Button>
		</div>
		<!-- Add/remove row buttons -->
		<div
			class="flex gap-1 items-center justify-center"
			style:grid-column="2"
			style:grid-row="2"
		>
			<Button
				color="red"
				class="w-6 h-6 !p-0"
				on:click={onRemoveRowButtonPressed}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					width="24"
					fill="white"
				>
					<path
						d="M6 13.15q-.475 0-.812-.338-.338-.337-.338-.812 0-.475.338-.812.337-.338.812-.338h12q.475 0 .812.338.338.337.338.812 0 .475-.338.812-.337.338-.812.338Z"
					/>
				</svg>
			</Button>
			<Button class="w-6 h-6 !p-0" on:click={onAddRowButtonPressed}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					width="24"
					fill="white"
				>
					<path
						d="M12 19.15q-.475 0-.812-.338-.338-.337-.338-.812v-4.85H6q-.475 0-.812-.338-.338-.337-.338-.812 0-.475.338-.812.337-.338.812-.338h4.85V6q0-.475.338-.813.337-.337.812-.337.475 0 .812.337.338.338.338.813v4.85H18q.475 0 .812.338.338.337.338.812 0 .475-.338.812-.337.338-.812.338h-4.85V18q0 .475-.338.812-.337.338-.812.338Z"
					/>
				</svg>
			</Button>
		</div>
	</div>
	<div>
		<Button color="red" class="!px-2 !py-1" on:click={onClearButtonPressed}>
			Reset
		</Button>
		<slot name="buttons" />
	</div>
</div>

<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type="number"] {
		-moz-appearance: textfield;
	}
</style>
