<script lang="ts">
	import type RationalNumber from "$lib/logic/RationalNumber";

	export let value: RationalNumber;
	$: isInteger = value.denominator() === 1;
</script>

<div class="flex items-center justify-center gap-[.1rem]">
	{#if value.isNegative()}
		<div class="bg-black w-[.7ch] h-[.1rem]" />
	{/if}
	<div class="flex flex-col items-center justify-center">
		<p
			class="
				{isInteger ? 'text-2xl' : 'text-base'}
				font-semibold leading-none
			"
		>
			{Math.abs(value.numerator())}
		</p>
		{#if !isInteger}
			<div class="bg-black h-[.1rem] self-stretch rounded-lg" />
			<p class="text-base font-semibold leading-none">
				{Math.abs(value.denominator())}
			</p>
		{/if}
	</div>
</div>
