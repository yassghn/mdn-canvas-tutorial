/**
 * math.mjs
 */

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