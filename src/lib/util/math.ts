function lcmHelper(a: number, b: number): number {
	return (a * b) / gcd(a, b)
}

/** Least common multiple */
export function lcm(...nums: number[]): number {
	if (nums.length === 0) {
		throw new Error("0 arguments found")
	} else if (nums.length < 2) {
		return nums[0]
	}
	let lcmValue = nums[0]
	for (let i = 1; i < nums.length; i++) {
		lcmValue = lcmHelper(nums[i], lcmValue)
	}
	return lcmValue
}

function gcdHelper(a: number, b: number): number {
	return a === 0 ? b : gcdHelper(b % a, a)
}

/** Greatest common divisor */
export function gcd(...nums: number[]): number {
	if (nums.length === 0) {
		throw new Error("0 arguments found")
	} else if (nums.length < 2) {
		return nums[0]
	}
	let gcdValue = nums[0]
	for (let i = 1; i < nums.length; i++) {
		gcdValue = gcdHelper(nums[i], gcdValue)
	}
	return gcdValue
}
