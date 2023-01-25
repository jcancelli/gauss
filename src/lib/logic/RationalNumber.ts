import { gcd, lcm } from "$lib/util/math"

export default class RationalNumber {

	private num: number = 1
	private denom: number = 1

	constructor(num: number = 0, denom: number = 1) {
		if (denom === 0) {
			throw new Error("Division by 0")
		}
		this.num = num
		this.denom = denom
		this.removeNegative()
	}

	public static parse(input: string): RationalNumber {
		if (!input.match(/^\-?\d+(\/\-?\d+)?$/)) {
			throw new Error(`Invalid input: "${input}"`)
		}
		let [num, denom] = input.split("/").map(e => parseInt(e))
		if (denom === undefined) {
			denom = 1
		}
		return new RationalNumber(num, denom)
	}

	public numerator(): number {
		return this.num
	}

	public denominator(): number {
		return this.denom
	}

	public value(): number {
		return this.num / this.denom
	}

	public equals(b: RationalNumber): boolean {
		return this.reduce().value() === b.reduce().value()
	}

	public isNegative(): boolean {
		return this.num < 0 !== this.denom < 0
	}

	public isInteger(): boolean {
		return this.denom === 1
	}

	public add(b: RationalNumber): RationalNumber {
		const denom = lcm(this.denom, b.denom)
		const num = denom / this.denom * this.num + denom / b.denom * b.num
		return new RationalNumber(num, denom)
	}

	public sub(b: RationalNumber): RationalNumber {
		const denom = lcm(this.denom, b.denom)
		const num = denom / this.denom * this.num - denom / b.denom * b.num
		return new RationalNumber(num, denom)
	}

	public mul(b: RationalNumber): RationalNumber {
		return new RationalNumber(this.num * b.num, this.denom * b.denom)
	}

	public div(b: RationalNumber): RationalNumber {
		if (b.num === 0) {
			throw new Error(`Division by zero: ${this.toString()} divided by ${b.toString()}`)
		}
		return new RationalNumber(this.num * b.denom, this.denom * b.num)
	}

	public reduce(): RationalNumber {
		let num = this.num
		let denom = this.denom
		let gcdVal = gcd(num, denom)
		while (gcdVal !== 1 && gcdVal !== -1) {
			num /= gcdVal
			denom /= gcdVal
			gcdVal = gcd(num, denom)
		}
		if (num === 0) {
			denom = 1
		}
		return new RationalNumber(num, denom)
	}

	/** Sets both the numerator and denominator to their module value if they are both negative */
	private removeNegative(): void {
		if (this.num < 0 && this.denom < 0) {
			this.num = Math.abs(this.num)
			this.denom = Math.abs(this.denom)
		}
	}

	public toString(): string {
		let str = `${this.num}`
		if (!this.isInteger()) {
			str += `/${this.denom}`
		}
		return str
	}
}

export const ZERO: RationalNumber = new RationalNumber
export const MINUS_ONE: RationalNumber = new RationalNumber(-1)
export const ONE: RationalNumber = new RationalNumber(1)