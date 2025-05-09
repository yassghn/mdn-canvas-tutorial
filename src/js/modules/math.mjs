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

function getCircleX(radius, theta, h) {
	return radius * Math.cos(theta) + h
}

function getCircleY(radius, theta, k) {
	return radius * Math.cos(theta) + k
}

function getThetas() {
	const thetas = []
	/*
		thetas.push(Math.PI / 2) // 3 * pi / 6
		thetas.push(Math.PI / 3) // 2 * pi / 6
		thetas.push(Math.PI / 4)
		thetas.push(Math.PI / 6) // 1 * pi / 6
		thetas.push(Math.PI * 2) // 12 * pi / 6
		thetas.push(Math.PI * 11 / 6) // 11 * pi / 6
		thetas.push(Math.PI * 7 / 4)
		thetas.push(Math.PI * 5 / 3) // 10 * pi / 6
		thetas.push(Math.PI * 3 / 2) // 9 * pi / 6
		thetas.push(Math.PI * 4 / 3) // 8 * pi / 6
		thetas.push(Math.PI * 5 / 4)
		thetas.push(Math.PI * 7 / 6) // 7 * pi / 6
		thetas.push(Math.PI) // 6 * pi / 6
		thetas.push(Math.PI * 5 / 6) // 5 * pi / 6
		thetas.push(Math.PI * 3 / 4)
		thetas.push(Math.PI * 2 / 3) // 4 * pi / 6
	*/
	for (let i = 12; i > 0; i--) {
		thetas.push(Math.PI * i / 6)
	}
	return thetas
}

export function getCircleGridPoints(center, radius) {
	/**
	 * t = theta, angle in radians
	 * r = radius
	 * (h, k) = circle center
	 *
	 * x = r * cos(t) + h
	 * y = r * cos(t) + k
	 *
	 * NOTE:
	 * 	can get theta with: degrees * (pi / 180)
	 */
	const points = []
	const thetas = getThetas()

	thetas.forEach((theta) => {
		const x = getCircleX(radius, theta, center.x)
		const y = getCircleY(radius, theta, center.y)
		points.push({ x: x, y: y })
	})
	return points
}

export function isPointerCollision(pointer, obj) {
	if (pointer.inWindow) {
		const ptrW = 5
		const ptrH = 10

		const pointerHitBox = {
			x1: Math.ceil(pointer.coords.x - ptrW),
			y1: Math.ceil(pointer.coords.y - ptrH),
			x2: Math.ceil(pointer.coords.x + ptrW),
			y2: Math.ceil(pointer.coords.y + ptrH)
		}

		for (let i = 0; i < obj.edges.length; i++) {
			const edge = obj.edges[i]
			if ((edge.x >= pointerHitBox.x1 && edge.x <= pointerHitBox.x2) &&
				(edge.y >= pointerHitBox.y1 && edge.y <= pointerHitBox.y2)) {
				return true
			}
		}
	}
	return false
}