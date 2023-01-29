<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const MIN_HEIGHT = 2;
	const MIN_WIDTH = 2;

	export let height = MIN_HEIGHT;
	export let width = MIN_WIDTH;

	$: stringHeight = height.toString();
	$: stringWidth = width.toString();

	const dispatch = createEventDispatcher();

	function onHeightInput(): void {
		const val = parseInt(stringHeight);
		if (isNaN(val)) {
			dispatch("error", {
				errorMessage: "Height value is not a valid number",
			});
			return;
		}
		if (val < MIN_HEIGHT) {
			dispatch("error", {
				errorMessage: `Minimum height value is ${MIN_HEIGHT}`,
			});
			return;
		}
		height = val;
		dispatch("height-input");
	}

	function onWidthInput(): void {
		const val = parseInt(stringWidth);
		if (isNaN(val)) {
			dispatch("error", {
				errorMessage: "Width value is not a valid number",
			});
			return;
		}
		if (val < MIN_WIDTH) {
			dispatch("error", {
				errorMessage: `Minimum width value is ${MIN_WIDTH}`,
			});
			return;
		}
		width = val;
		dispatch("width-input");
	}

	function onClick(
		e: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }
	): void {
		e.currentTarget.select();
	}

	function onBlur() {}
</script>

<div class="flex items-center justify-center gap-1">
	<input
		bind:value={stringHeight}
		on:input={onHeightInput}
		on:click={onClick}
		on:blur={onBlur}
		class="w-[3ch] p-0 box-content text-center text-2xl leading-none font-semibold border rounded-md"
	/>
	&times;
	<input
		bind:value={stringWidth}
		on:input={onWidthInput}
		on:click={onClick}
		on:blur={onBlur}
		class="w-[3ch] p-0 box-content text-center text-2xl leading-none font-semibold border rounded-md"
	/>
</div>
