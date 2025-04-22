/**
 * mdn-canvas-tutorial
 *
 * render.mjs
 */

import { calculateColumnWidth, calculateRowHeight } from './math.mjs'

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

function renderStar(ctx, offset, a, b, c, d, time, size) {
	ctx.save()
	const r = Math.floor(Math.random() * size) + 2
	const miliMult = ((2 * Math.PI) / 60000) * time
	const secMult = ((2 * Math.PI / 60) * time)
	const xpos = offset - Math.floor((secMult * (time/1000)) * ((Math.PI * 2) / a) * b)
	const ypos = offset - Math.floor((secMult * (time/1000)) * ((Math.PI * 2) / c) * d)
	ctx.translate(-xpos, ypos)
	// draw star
	ctx.save()
	ctx.fillStyle = '#fff'
	ctx.beginPath()
	ctx.moveTo(r, 0)
	for (let j = 0; j < 9; j++) {
		ctx.rotate(Math.PI / 5)
		if (j % 2 == 0) {
			ctx.lineTo((r / 0.525731) * 0.200811, 0)
		} else {
			ctx.lineTo(r, 0)
		}
	}
	ctx.closePath()
	ctx.fill()
	ctx.restore()
	ctx.restore()

	return {x: xpos, y: ypos}
}

function renderStarTrail(ctx, xpos, ypos) {
	ctx.save()

	const linearGradient = ctx.createLinearGradient(-75, 75, -xpos, ypos)
	linearGradient.addColorStop(0, 'rgb(255 255 255 / 25%)')
	linearGradient.addColorStop(0.5, 'rgb(255 255 255 / 50%)')
	linearGradient.addColorStop(0.75, 'rgb(255 255 255 / 75%)')
	linearGradient.addColorStop(1, 'rgb(255 255 255)')
	ctx.strokeStyle = linearGradient
	ctx.moveTo(-75, 75)
	ctx.lineTo(-xpos, ypos)
	ctx.stroke()

	ctx.restore()
}

// utlity function to draw randomly positioned stars within a clipped path
export function generateStars(cvs) {
	cvs.ctx.save()

	// generate stars
	const date = new Date()
	// draw one shooting star
	const coords = renderStar(cvs.ctx, 75, 55, 15, 55, 15, date.getMilliseconds(), 15)
	// draw shooting star trail
	renderStarTrail(cvs.ctx, coords.x, coords.y)
	// draw shooting star wake of stars
	for (let i = 1; i < 50; i++) {
		const amax = 60
		const amin = 50
		const bmax = 14
		const bmin = 1
		const cmax = 60
		const cmin = 50
		const dmax = 14
		const dmin = 1
		const a = Math.floor(Math.random() * (amax - amin) + amin)
		const b = Math.floor(Math.random() * (bmax - bmin) + bmin)
		const c = Math.floor(Math.random() * (cmax - cmin) + cmin)
		const d = Math.floor(Math.random() * (dmax - dmin) + dmin)
		const size = Math.floor(Math.random() * (7 - 2) + 2)
		// gets really close, dmax = 15, dmin = 10
		// renderStar(cvs.ctx, 75, 55, d, 55, d, ...)
		renderStar(cvs.ctx, 75, a, b, c, d, date.getMilliseconds(), size)
	}

	cvs.ctx.restore()
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

		// clear masked shape background
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

		// clear masked shape background
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

// utility function clear shadows lesson
export function clearShadows(xpos, ypos, cvs) {
	clearPath(xpos, ypos, cvs, (cvs) => {
		cvs.ctx.fillStyle = 'rgb(0, 0, 0)'
		cvs.ctx.fillRect(0, 0, 195, 40)
	})
}

// utility function to clear clock lesson
export function clearClock(xpos, ypos, cvs) {
	clearPath(xpos, ypos, cvs, (cvs) => {

	})
}