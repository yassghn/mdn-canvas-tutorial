/**
 * mdn-canvas-tutorial
 *
 * render.mjs
 */

import ContextState from './ContextState.mjs'
import ContextProperties from './ContextProperties.mjs'
import { calculateColumnWidth, calculateRowHeight, getCircleGridPoints } from './math.mjs'

// utility function to draw a rectangle with rounded corners
export function roundedRect(ctx, x, y, width, height, radius) {
	ctx.beginPath()
	ctx.moveTo(x, y + radius)
	ctx.arcTo(x, y + height, x + radius, y + height, radius)
	ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius)
	ctx.arcTo(x + width, y, x + width - radius, y, radius)
	ctx.arcTo(x, y, x, y + radius, radius)
}

function _getXpos(xpos, col, maxCols, buffer, width) {
	return calculateColumnWidth(xpos, col, maxCols, buffer, width)
}

function _getYPos(ypos, row, maxRows, buffer, height) {
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
		const x = _getXpos(xpos, col, cols, buffer, img.width)
		const y = _getYPos(ypos, row, rows, buffer, img.height)
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

function _drawGridLine(ctx, x, y, max, every, other) {
	let restore = false
	if (every && other) {
		if (x % every != 0 || y % every != 0) {
			restore = true
			ctx.save()
			ctx.strokeStyle = other.strokeStyle
			ctx.lineWidth = other.lineWidth
		}
	}
	ctx.beginPath()
	ctx.moveTo(x, y)
	if (y == 0) {
		ctx.lineTo(x, max)
	} else {
		ctx.lineTo(max, y)
	}
	ctx.stroke()
	if (restore) {
		ctx.restore()
	}
}

function _drawGridText(ctx, text, x, y) {
	ctx.beginPath()
	ctx.fillText(text, x, y)
}

export function trackGridLines(cvs, mousePos) {
	const props = new ContextProperties()
	props.lineWidth = 2
	props.strokeStyle = `rgb(243, 130, 192)`
	const state = new ContextState(cvs.ctx, props)
	state.apply((ctx, mousePos, maxX, maxY) => {
		// draw vertical grid line
		_drawGridLine(ctx, mousePos.x, 0, maxY)
		// draw horizontal grid line
		_drawGridLine(ctx, 0, mousePos.y, maxX)
	}, mousePos, cvs.width, cvs.height)
}

export function drawGridLines(cvs) {
	const dx = 10
	const dy = dx
	const labelEvery = 50
	const other = {
		strokeStyle: `rgb(240, 76, 89)`,
		lineWidth: .5
	}
	const maxX = cvs.width
	const maxY = cvs.height
	const props = new ContextProperties()
	props.lineWidth = 1
	props.strokeStyle = `rgb(24, 193, 245)`
	props.fillStyle = `rgb(24, 193, 245)`
	props.font = `12px tahoma`
	props.textBaseline = 'bottom'
	props.textAlign = 'right'
	const state = new ContextState(cvs.ctx, props)
	state.apply((ctx, maxX, maxY, dx, dy, every, other) => {
		const labelOffset = 3
		const textHeight = parseInt(ctx.font.split('px')[0])
		let lastx = 0
		let lastxlabel = 0
		let lasty = 0
		let lastylabel = 0
		ctx.save()
		// draw gridlines
		for (let xtrack = 0; xtrack < maxX; xtrack++) {
			// draw xpos text every set amount
			if (xtrack == 0 || (xtrack - lastx) % dx == 0) {
				// draw vertical grid line
				_drawGridLine(ctx, xtrack, 0, maxY, every, other)
				lastx = xtrack
			}
			// draw grid text every set amount
			if (xtrack == 0 || (xtrack - lastxlabel) % every == 0) {
				// get offset based on text height calculation
				const offset = textHeight + labelOffset + 1
				// draw x coord text
				_drawGridText(ctx, `${xtrack}`, xtrack - labelOffset, offset)
				lastxlabel = xtrack
			}
		}
		ctx.restore()
		for (let ytrack = 0; ytrack < maxY; ytrack++) {
			// draw ypos text every set amount
			if (ytrack == 0 || (ytrack - lasty) % dy == 0) {
				// draw horizontal grid line
				_drawGridLine(ctx, 0, ytrack, maxX, every, other)
				lasty = ytrack
			}
			// draw grid text every set amount
			if (ytrack == 0 || (ytrack - lastylabel) % every == 0) {
				// get offset based on text width calculation
				const offset = ctx.measureText(`${ytrack}`).width + labelOffset + 1
				// draw ycoord text
				_drawGridText(ctx, `${ytrack}`, offset, ytrack - labelOffset)
				lastylabel = ytrack
			}
		}
	}, maxX, maxY, dx, dy, labelEvery, other)
}

function _renderStar(ctx, offset, a, b, c, d, time, size) {
	ctx.save()
	const r = Math.floor(Math.random() * size) + 2
	const miliMult = ((2 * Math.PI) / 60000) * time
	const secMult = ((2 * Math.PI / 60) * time)
	const xpos = offset - Math.floor((secMult * (time / 1000)) * ((Math.PI * 2) / a) * b)
	const ypos = offset - Math.floor((secMult * (time / 1000)) * ((Math.PI * 2) / c) * d)
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

	return { x: xpos, y: ypos }
}

function _renderStarTrail(ctx, xpos, ypos) {
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
	const coords = _renderStar(cvs.ctx, 75, 55, 15, 55, 15, date.getMilliseconds(), 15)
	// draw shooting star trail
	_renderStarTrail(cvs.ctx, coords.x, coords.y)
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
		// _renderStar(cvs.ctx, 75, 55, d, 55, d, ...)
		_renderStar(cvs.ctx, 75, a, b, c, d, date.getMilliseconds(), size)
	}

	cvs.ctx.restore()
}

// utlity function for rendering boilerplate lesson space canvas clear
function _clearPath(xpos, ypos, cvs, lambda) {
	cvs.ctx.save()
	cvs.ctx.translate(xpos, ypos)
	lambda(cvs)
	cvs.ctx.restore()
}

// utlity function to clear clipping paths lesson canvas mask
export function clearClippingPaths(xpos, ypos, cvs) {
	_clearPath(xpos, ypos, cvs, (cvs) => {
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
	_clearPath(xpos, ypos, cvs, (cvs) => {
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
	_clearPath(xpos, ypos, cvs, (cvs) => {
		cvs.ctx.fillStyle = `rgb(0, 0, 0)`
		cvs.ctx.fillRect(0, 0, 700, 401)
	})
}

// utility function clear shadows lesson
export function clearShadows(xpos, ypos, cvs) {
	_clearPath(xpos, ypos, cvs, (cvs) => {
		cvs.ctx.fillStyle = 'rgb(0, 0, 0)'
		cvs.ctx.fillRect(0, 0, 195, 40)
	})
}

// utility function to clear clock lesson
export function clearClock(xpos, ypos, cvs) {
	_clearPath(xpos, ypos, cvs, (cvs) => {

	})
}

export function getShield(swordProps) {
	const _shieldProps = {
		defaultCoords: {
			x: swordProps.defaultCoords.x,
			y: swordProps.defaultCoords.y
		},

		dimensions: {
			w: 150,
			h: 125
		},

		velocity: {
			x: swordProps.velocity.x,
			y: swordProps.velocity.y
		}
	}

	const shield = {
		..._shieldProps,

		coords: { ...swordProps.coords },

		render: function (ctx) {
			const props = new ContextProperties()
			props.strokeStyle = `rgb(237, 237, 237)`
			props.fillStyle = `rgb(237, 237, 237)`
			props.lineWidth = 2
			const state = new ContextState(ctx, props)
			state.apply((_ctx, _coords, _dimensions) => {
				/**
				 * note: the start of this is just figuring out how to get that nice aesthetic center
				 * for the shield position.
				 */

				// get x/y pos for translate
				const x = _coords.x - Math.ceil(this.dimensions.w / 2) + Math.ceil(swordProps.dimensions.w / 2)
				const y = _coords.y - Math.ceil(swordProps.dimensions.h / 2)
				_ctx.translate(x, y)

				// outline of shield shape and position
				/* _ctx.rect(0, 0, _dimensions.w, _dimensions.h)
				_ctx.stroke() */

				// outline of center of 0, 0 translate path
				/* _ctx.arc(0, 0, 20, 0, Math.PI * 2)
				_ctx.stroke() */

				// adjust translate to required center
				// lol, 5, what 5? where 5?
				const newX = Math.ceil(swordProps.dimensions.crossGuardWidth / 2 + swordProps.dimensions.w - 5)
				const newY = Math.ceil(swordProps.dimensions.crossGuardHeight / 2 + swordProps.dimensions.h / 2)
				_ctx.translate(newX, newY)
				// draw square wrapped in arc to point out new center
				/* _ctx.moveTo(0, 0)
				_ctx.beginPath()
				_ctx.rect(0, 0, 10, 10)
				_ctx.stroke()
				_ctx.beginPath()
				_ctx.arc(0, 0, 10, 0, Math.PI * 2)
				_ctx.stroke() */

				// draw shield
				ctx.beginPath()
				ctx.moveTo(0, 0)
				ctx.quadraticCurveTo(0, 25, 100, 0)
				ctx.quadraticCurveTo(50, 25, 0, 150)
				ctx.quadraticCurveTo(-50, 25, -100, 0)
				//ctx.quadraticCurveTo(0, -25, 0, 0)
				ctx.quadraticCurveTo(0, 25, 0, 0)
				ctx.stroke()
			}, this.coords, this.dimensions)
		},

		setCoords: function (newCoords) {
			this.coords = { ...newCoords }
		},

		isBoundingWidthCollision: function (width) {
			// check right then left
			if (this.coords.x + this.velocity.x > width - 150 ||
				this.coords.x + this.velocity.x < this.dimensions.w - 150 / 2) {
				return true
			}
			return false
		}
	}

	return shield
}

function _getRandomVelocity(maxx, minx, maxy, miny) {
	const mult = Math.floor(Math.random() * (10 - 1) + 1)
	const tx = Math.floor(Math.random() * (maxx - minx) + minx)
	const ty = Math.floor(Math.random() * (maxy - miny) + miny)
	const vx = mult % 2 == 0 ? tx : -tx
	const vy = mult % 3 == 0 ? ty : -ty
	return { x: vx, y: vy }
}

export function getSword() {
	const _swordProps = {
		defaultCoords: {
			x: 800,
			y: 450
		},

		dimensions: {
			w: 30,
			h: 200,
			crossGuardWidth: 100,
			crossGuardHeight: 20
		},

		velocity: {
			..._getRandomVelocity(7, 5, 5, 3)
		}
	}

	const sword = {
		..._swordProps,

		coords: { ..._swordProps.defaultCoords },

		render: function (ctx) {
			const props = new ContextProperties()
			props.strokeStyle = `rgb(237, 237, 237)`
			props.fillStyle = `rgb(237, 237, 237)`
			props.lineWidth = 2
			const state = new ContextState(ctx, props)
			state.apply((_ctx, _coords, _dimensions) => {

				// draw sword stem (blade without point)
				_ctx.beginPath()
				_ctx.rect(_coords.x, _coords.y, _dimensions.w, _dimensions.h)
				_ctx.stroke()

				// draw sword point
				_ctx.save()
				_ctx.translate(_coords.x, _coords.y + _dimensions.h)
				_ctx.beginPath()
				_ctx.moveTo(0, 0)
				_ctx.lineTo(_dimensions.w, 0)
				_ctx.lineTo(_dimensions.w / 2, 30)
				_ctx.closePath()
				_ctx.stroke()
				_ctx.restore()

				// draw cross guard
				_ctx.beginPath()
				_ctx.rect(_coords.x - (_dimensions.crossGuardWidth / 2) + (_dimensions.w / 2), _coords.y, _dimensions.crossGuardWidth, _dimensions.crossGuardHeight)
				_ctx.stroke()

				// draw crossguard ornaments
				const cgOrnaRadius = 10
				_ctx.beginPath()
				// left ornament
				_ctx.arc(_coords.x - _dimensions.crossGuardWidth / 2 + Math.ceil(cgOrnaRadius / 4) + 1, _coords.y + _dimensions.crossGuardHeight / 2, cgOrnaRadius, 0, Math.PI * 2)
				_ctx.stroke()
				_ctx.beginPath()
				// right ornament
				_ctx.arc(_coords.x + _dimensions.crossGuardWidth / 2 + cgOrnaRadius * 2 + cgOrnaRadius / 2, _coords.y + _dimensions.crossGuardHeight / 2, cgOrnaRadius, 0, Math.PI * 2)
				_ctx.stroke()

				// draw hilt
				const handleWidth = 20
				const handleHeight = 50
				_ctx.beginPath()
				_ctx.rect(_coords.x + handleWidth / 4, _coords.y - handleHeight, handleWidth, handleHeight)
				_ctx.stroke()

				// draw pommel
				const pommelRadius = 15
				_ctx.beginPath()
				_ctx.arc(_coords.x + handleWidth / 2 + Math.ceil(pommelRadius / 4) + 1, _coords.y - handleHeight - pommelRadius, pommelRadius, 0, Math.PI * 2)
				_ctx.stroke()
			}, this.coords, this.dimensions)
		},

		setCoords: function (newCoords) {
			this.coords = { ...newCoords }
		},

		setVelocity: function (newVelocity) {
			this.velocity = { ...newVelocity }
		},

		isBoundingHeightCollision: function (height) {
			// check bottom then top
			if (this.coords.y + this.velocity.y > height - this.dimensions.h - 25 ||
				this.coords.y + this.velocity.y < this.dimensions.h - 125) {
				return true
			}
			return false
		}
	}

	// correct ypos from center
	sword.coords.y -= Math.ceil(sword.dimensions.h / 2)

	return sword
}

export function getBall() {
	const _ballProps = {
		coords: {
			x: 800,
			y: 400
		},
		velocity: { ..._getRandomVelocity(10, 5, 10, 5) },
		radius: 45,
		edges: []
	}

	function updateEdges(self) {
		const edges = getCircleGridPoints(self.coords, self.radius)
		// ceil edges
		self.edges = edges.map((edge) => {
			return { x: Math.ceil(edge.x), y: Math.ceil(edge.y) }
		})
	}

	const ball = {
		..._ballProps,

		render: function (ctx, linearGradient) {
			// update edges
			const self = this
			updateEdges(self)
			// draw
			const props = new ContextProperties()
			props.fillStyle = linearGradient
			const state = new ContextState(ctx, props)
			state.apply((_ctx, _coords, _radius) => {
				_ctx.beginPath()
				_ctx.arc(_coords.x, _coords.y, _radius, 0, Math.PI * 2)
				_ctx.closePath()
				_ctx.fill()
			}, this.coords, this.radius)
		}
	}

	return ball
}