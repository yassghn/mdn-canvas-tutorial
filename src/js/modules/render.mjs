/**
 * mdn-canvas-tutorial
 *
 * render.mjs
 */

// utility function to draw a rectangle with rounded corners
export function roundedRect(ctx, x, y, width, height, radius) {
	ctx.beginPath()
	ctx.moveTo(x, y + radius)
	ctx.arcTo(x, y + height, x + radius, y + height, radius)
	ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius)
	ctx.arcTo(x + width, y, x + width - radius, y, radius)
	ctx.arcTo(x, y, x, y + radius, radius)
}

function getXpos(xpos, col, maxCols, buffer, width) {
	// get width multiplier
	const widthMult = (col - 1) % maxCols
	// return xpos via column width calculation
	return xpos + (buffer * col) + (width * widthMult)
}

function getYPos(ypos, row, maxRows, buffer, height) {
	// get height multiplier
	const heightMult = ((row - 1) % maxRows)
	// return ypos via row length calculation
	return ypos + (buffer * row) + (height * heightMult)
}

// utility function to create rows/columns of framed gallery art images
export function gallerize(cvs, imgs, frameImg, xpos, ypos, rows, cols, buffer, offset) {
	// init row/col counters
	let row = 1
	let col = 1
	// iterate images
	for (let i = 0; i < imgs.length; i++) {
		// get img
		const img = imgs[i]
		// get frame (x, y)
		const x = getXpos(xpos, col, cols, buffer, img.width)
		const y = getYPos(ypos, row, rows, buffer, img.height)
		// draw gallery art image
		cvs.ctx.drawImage(img, x + offset, y + offset)
		// draw gallery art image frame
		cvs.ctx.drawImage(frameImg, x, y)
		// check for next row
		if (((i+1) * rows) % imgs.length == 0) {
			// increment row
			row++
		}
		// increment col
		col++
		// check for column wrap
		if (col > cols) {
			col = 1
		}
	}
}