<script lang="ts">
	import RationalNumber from "$lib/logic/RationalNumber";
	import { ZERO } from "$lib/logic/RationalNumber";
	import { createEventDispatcher } from "svelte";

	export let value: RationalNumber = ZERO;
	let stringValue = value.toString();

	const dispatch = createEventDispatcher();

	function onInput(): void {
		try {
			if (stringValue === "") {
				return;
			}
			value = RationalNumber.parse(stringValue);
			dispatch("input", {
				value,
			});
		} catch (err) {
			dispatch("parsing-error", {
				error: (err as Error).message,
			});
		}
	}

	function onClick(
		event: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }
	): void {
		event.currentTarget.select();
		dispatch("click");
	}

	function onBlur(): void {
		dispatch("blur");
	}
</script>

<input
	bind:value={stringValue}
	on:input={onInput}
	on:click={onClick}
	on:blur={onBlur}
	class="w-[3ch] p-0 box-content text-center text-2xl leading-none font-semibold border rounded-md"
/>
