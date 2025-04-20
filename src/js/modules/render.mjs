/**
 * mdn-canvas-tutorial
 *
 * render.mjs
 */

import { calculateColumnWidth, calculateRowHeight } from "./math.mjs"

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
	return calculateColumnWidth(xpos, col, maxCols, buffer, width)
}

function getYPos(ypos, row, maxRows, buffer, height) {
	return calculateRowHeight(ypos, row, maxRows, buffer, height)
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
		if (((i + 1) * rows) % imgs.length == 0) {
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

// utlity function to draw randomly positioned stars within a clipped path
export function generateStars(cvs) {
	// generate stars
	for (let i = 1; i < 50; i++) {
		cvs.ctx.save()
		cvs.ctx.fillStyle = '#fff'
		const xpos = 75 - Math.floor(Math.random() * 150)
		const ypos = 75 - Math.floor(Math.random() * 150)
		cvs.ctx.translate(xpos, ypos)
		// draw star
		const r = Math.floor(Math.random() * 4) + 2
		cvs.ctx.save()
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(r, 0)
		for (let j = 0; j < 9; j++) {
			cvs.ctx.rotate(Math.PI / 5)
			if (j % 2 == 0) {
				cvs.ctx.lineTo((r / 0.525731) * 0.200811, 0)
			} else {
				cvs.ctx.lineTo(r, 0)
			}
		}
		cvs.ctx.closePath()
		cvs.ctx.fill()
		cvs.ctx.restore()
		cvs.ctx.restore()
	}
}

// utlity function for rendering boilerplate lesson space canvas clear
function clearPath(xpos, ypos, cvs, lambda) {
	cvs.ctx.save()
	cvs.ctx.translate(xpos, ypos)
	lambda(cvs)
	cvs.ctx.restore()
}

// utlity function to clear clipping paths lesson canvas mask
export function clearClippingPaths(xpos, ypos, cvs) {
	clearPath(xpos, ypos, cvs, (cvs) => {
		cvs.ctx.translate(75, 75)

		cvs.ctx.beginPath()
		cvs.ctx.arc(0, 0, 60, 0, Math.PI * 2, true)
		cvs.ctx.clip()

		// draw stars background
		cvs.ctx.fillStyle = 'rgb(0, 0, 0)'
		cvs.ctx.fillRect(-75, -75, 150, 150)
	})
}

// utlity function to clear inverse clipping paths lesson canvas mask
export function clearInverseClippingPaths(xpos, ypos, cvs) {
	clearPath(xpos, ypos, cvs, (cvs) => {
		cvs.ctx.translate(75, 75)

		cvs.ctx.beginPath()
		cvs.ctx.rect(-75, -75, 150, 150)
		cvs.ctx.arc(0, 0, 60, 0, Math.PI * 2, true)
		cvs.ctx.clip()

		// draw stars background
		cvs.ctx.fillStyle = 'rgb(0, 0, 0)'
		cvs.ctx.fillRect(-75, -75, 150, 150)
	})
}

// utility function to clear linestyles lesson
export function clearLineStyles(xpos, ypos, cvs) {
	clearPath(xpos, ypos, cvs, (cvs) => {
		cvs.ctx.fillStyle = `rgb(0, 0, 0)`
		cvs.ctx.fillRect(0, 0, 700, 401)
	})
}