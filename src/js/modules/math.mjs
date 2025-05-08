/**
 * math.mjs
 */

export function calculateColumnWidth(xpos, col, maxCols, buffer, width) {
	// get width multiplier
	const widthMult = (col - 1) % maxCols
	// return xpos via column width calculation
	return xpos + (buffer * col) + (width * widthMult)
}

export function calculateRowHeight(ypos, row, maxRows, buffer, height) {
	// get height multiplier
	const heightMult = ((row - 1) % maxRows)
	// return ypos via row length calculation
	return ypos + (buffer * row) + (height * heightMult)
}

export function calculateRectCenter(xpos, ypos, width, height) {
	// init coords
	const coords = {
		x: 0,
		y: 0
	}

	// calculate center xpos/ypos
	coords.x = (xpos + (width / 2))
	coords.y = (ypos + (height / 2))

	return coords
}

export function generateColor() {
	const hexSet = '0123456789ABCDEF'
	const hexPrefix = '#'
	let color = [hexPrefix]
	// generate random hex color string
	for (let i = 1; i <= 6; i++) {
		color.push(hexSet[Math.ceil(Math.random() * 15)])
	}
	// return color as string
	return color.join('')
}

export function invertVelocity(velocity) {
	const v = { ...velocity }
	v.x = -v.x
	v.y = -v.y
	return v
}