import RationalNumber, { MINUS_ONE, ZERO } from "./RationalNumber"

export default class Matrix {
	private elements: RationalNumber[][] = []

	constructor(mat: RationalNumber[][] | number[][]) {
		this.setValues(mat)
	}

	/** Returns the number of columns */
	public width(): number {
		return this.elements[0].length
	}

	/** Returns the number of rows */
	public height(): number {
		return this.elements.length
	}

	/** Returns the element of position (row, col). Rows and columns indexes start from 1 */
	public element(row: number, col: number): RationalNumber {
		this.checkOutOfBounds(row, col)
		return this.elements[row - 1][col - 1]
	}

	/** Sets the element of position (row, col). Rows and columns indexes start from 1 */
	public setElement(row: number, col: number, value: RationalNumber) {
		this.checkOutOfBounds(row, col)
		this.elements[row - 1][col - 1] = value
	}

	/** Sets the matrix to the passed values */
	public setValues(values: RationalNumber[][] | number[][]): void {
		if (values.length < 2) {
			throw new Error("Height < 2")
		}
		let elements = []
		let maxWidth = 0
		for (let i = 0; i < values.length; i++) {
			if (values[i].length > maxWidth) {
				maxWidth = values[i].length
			}
		}
		if (maxWidth < 2) {
			throw new Error("Width < 2")
		}
		if (typeof values[0][0] === "number") {
			for (let i = 0; i < values.length; i++) {
				if ((values[i] as number[]).find(e => !Number.isInteger(e)) !== undefined) {
					throw new Error("Input cannot be a floating point value")
				}
				elements[i] = [...values[i].map(e => new RationalNumber(e as number)).concat(new Array(maxWidth - values[i].length).fill(ZERO))]
			}
		} else {
			for (let i = 0; i < values.length; i++) {
				elements[i] = [...(values[i] as RationalNumber[]).concat(new Array(maxWidth - values[i].length).fill(ZERO))]
			}
		}
		this.elements = elements
	}

	/** Swap two rows */
	public swapRows(row1: number, row2: number): void {
		this.checkOutOfBounds(row1, 1)
		this.checkOutOfBounds(row2, 1)
		let tmp = this.elements[row1 - 1]
		this.elements[row1 - 1] = this.elements[row2 - 1]
		this.elements[row2 - 1] = tmp
	}

	/** Add a row to the bottom of this matrix. If a value is not specified it is assumed to be 0 */
	public addRowToBottom(row: RationalNumber[] = []): void {
		if (row.length > this.width()) {
			throw new Error(`This row is too long: matrix width: ${this.width()}, row length: ${row.length}`)
		}
		this.elements[this.height()] = row.concat(new Array(this.width() - row.length).fill(ZERO))
	}

	/** Remove a row from the bottom of this matrix.*/
	public removeRowFromBottom(): void {
		if (this.height() === 2) {
			throw new Error(`Cannot remove row. Minimum matrix height: 2`)
		}
		this.elements.pop()
	}

	/** Add a column to the right of this matrix. If a value is not specified it is assumed to be 0 */
	public addColumnToRight(col: RationalNumber[] = []): void {
		if (col.length > this.height()) {
			throw new Error(`This column is too long: matrix height: ${this.height()}, column length: ${col.length}`)
		}
		const newCol = col.concat(new Array(this.height() - col.length).fill(ZERO))
		for (let i = 0; i < this.height(); i++) {
			this.elements[i].push(newCol[i])
		}
	}

	/** Remove a row from the bottom of this matrix.*/
	public removeColumnFromRight(): void {
		if (this.width() === 2) {
			throw new Error(`Cannot remove column. Minimum matrix width: 2`)
		}
		for (let i = 0; i < this.height(); i++) {
			this.elements[i].pop()
		}
	}

	/** Transform this matrix to its row echelon form (Gauss algorithm) */
	public toRowEchelonForm(): void {
		let aCol = 1
		let aRow = 1
		let a = () => this.elements[aRow - 1][aCol - 1]
		while (aRow <= this.height() && aCol <= this.width()) {
			while (this.isColumnNull(aCol)) {
				aCol++
				if (aCol > this.width()) {
					return
				}
			}
			if (a().equals(ZERO)) {
				for (let i = aRow + 1; i <= this.height(); i++) {
					let pivotColumnIndex = this.pivotColumn(i)
					if (pivotColumnIndex === aCol) {
						this.swapRows(aRow, i)
						break
					}
				}
			}
			let bRow = aRow + 1
			let b = () => this.elements[bRow - 1][aCol - 1]
			while (bRow <= this.height()) {
				if (b().equals(ZERO)) {
					bRow++
					continue
				}
				let coef = b().mul(MINUS_ONE).div(a())
				for (let col = aCol; col <= this.width(); col++) {
					this.elements[bRow - 1][col - 1] = this.elements[bRow - 1][col - 1].add(this.elements[aRow - 1][col - 1].mul(coef)).reduce()
				}
			}
			aRow++
			aCol++
		}
	}

	/** Returns true if this matrix is in row echelon form, otherwise returns false */
	public isRowEchelonForm(): boolean {
		let lastPivotColumn = this.pivotColumn(1)
		let pivotColumn = 0
		for (let row = 2; row <= this.height(); row++) {
			pivotColumn = this.pivotColumn(row)
			if (pivotColumn === -1) {
				continue
			} else if (lastPivotColumn === -1) {
				return false
			} else if (lastPivotColumn >= pivotColumn) {
				return false
			}
			lastPivotColumn = pivotColumn
		}
		return true
	}

	/** Returns the column index (starting from 1) of the pivot element in
	 * the specified row (row values start from 1).
	 * Returns -1 if the specified row is null */
	public pivotColumn(row: number): number {
		this.checkOutOfBounds(row, 1)
		for (let col = 1; col <= this.width(); col++) {
			if (!this.element(row, col).equals(ZERO)) {
				return col
			}
		}
		return -1
	}

	/** Returns true if all elements in the specified column are equal to 0, otherwise returns false */
	public isColumnNull(col: number): boolean {
		this.checkOutOfBounds(1, col)
		for (let i = 0; i < this.height(); i++) {
			if (!this.elements[i][col - 1].equals(ZERO)) {
				return false
			}
		}
		return true
	}

	/** Returns true if the specified row or column indexes are outside this matrix, otherwise returns false */
	public isOutOfBounds(row: number, col: number): boolean {
		return col < 1 || col > this.width() || row < 1 || row > this.height()
	}

	/** Throws an error if the specified row or column indexes are outside this matrix */
	private checkOutOfBounds(row: number, col: number): void {
		if (this.isOutOfBounds(row, col)) {
			throw new Error(`Out of bounds: \nInput -> col: ${col}, row: ${row}\nActual size -> width: ${this.width()}, height: ${this.height()}`)
		}
	}

	/** Takes a function and execute it for each element of this matrix.
	 * The element value, its column index and its row indexes are passed to this function */
	public forEachElemet(func: (element: RationalNumber, col: number, row: number) => void): void {
		for (let i = 0; i < this.height(); i++) {
			for (let j = 0; j < this.width(); j++) {
				func(this.elements[i][j], j + 1, i + 1)
			}
		}
	}

	public *[Symbol.iterator]() {
		for (let i = 0; i < this.height(); i++) {
			yield [...this.elements[i]]
		}
	}

	/** Create a new matrix identical to this matrix */
	public createCopy(): Matrix {
		const copyElements = []
		for (let i = 0; i < this.height(); i++) {
			copyElements[i] = [...this.elements[i]]
		}
		return new Matrix(copyElements)
	}

	/** Sets all values of this matrix to be identical to the passed matrix. If the passed matrix
	 * is of different size of this matrix, this matrix is resized */
	public copyFrom(matrix: Matrix): void {
		this.setValues(matrix.elements)
	}

	/** Returns a string representation of this matrix */
	public toString(): string {
		let str = ""
		this.forEachElemet((element, col) => {
			str += `${element.toString()} `
			if (col === this.width() - 1) {
				str += "\n"
			}
		})
		return str
	}
}