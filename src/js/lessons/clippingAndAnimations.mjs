/**
 * clipping and animations
 */

import ContextProperties from '../modules/ContextProperties.mjs'
import ContextState from '../modules/ContextState.mjs'
import effects from '../modules/effects.mjs'
import { generateColor } from '../modules/math.mjs'
import pointer from '../modules/pointer.mjs'
import { generateStars, getBall, getShield, getSword } from '../modules/render.mjs'
import settings from '../modules/settings.mjs'

let loopingPanoramaTimestamp = 0
let loopingPanoramaImageX = 0

const clippingAndAnimations = {
	drawClippingPaths: function (cvs, previousTimestamp, timestamp) {
		/**
		 * clipping paths
		 *
		 * clip()
		 * 	- used as a mask to hide unwanted parts of a shape
		 *  - everything that falls outside of the set path won't get drawn
		 *  - similair function to stroke(), fill(), closePath() methods
		 *  - turns a path into a clipping path
		 *  - canvas has a default clipping path of the exact same size as the canvas (no clipping occurs)
		 *
		 * NOTE:
		 * 	the effect of clipping paths can also be achieved via the globalCompositeOperation property.
		 *  using 'source-in' and 'source-atop' values to achieve masking effects.
		 *  the difference is that clipping paths are never drawn to the canvas, and clipping path
		 *  is never affected by adding new shapes. more suited to drawing multiple shapes in 'restricted area'
		 *
		 * globalCompositeOperation = type
		 * 	- can be used to hide unwanted parts of a shape
		 * 	- can be used in place of clearRect (not limited to rectangles)
		 *  - allows for various (12 in total) types of masking (compositing) effects
		 */

		// clipping example
		// use circular clipping path to restrict drawing of a set of random stars to a particular canvas region
		const x = 1250
		const y = 650
		cvs.ctx.save()
		cvs.ctx.translate(x, y)

		//cvs.ctx.fillRect(0, 0, 150, 150)
		// create background square
		cvs.ctx.translate(75, 75)

		// create a circular clipping path
		cvs.ctx.beginPath()
		cvs.ctx.arc(0, 0, 60, 0, Math.PI * 2, true)
		if (settings.noClipDebug == false.toString()) {
			cvs.ctx.clip()
		}

		// draw stars background
		const linearGradient = cvs.ctx.createLinearGradient(0, -75, 0, 75)
		linearGradient.addColorStop(0, '#232256')
		linearGradient.addColorStop(1, '#143778')
		cvs.ctx.fillStyle = linearGradient
		cvs.ctx.fillRect(-75, -75, 150, 150)

		generateStars(cvs)

		cvs.ctx.restore()
	},

	drawInverseClippingPaths: function (cvs, previousTimestamp, timestamp) {
		/**
		 * inverse clipping paths
		 *
		 * no such thing as inverse clipping mask, but can define a mask that fills
		 * the canvas (or a given portion), with a rectangle, and has a hole in it for the parts
		 * which you want to skip.
		 *
		 * shapes with holes: draw holes in the opposite direction as outter shape.
		 *
		 * rectangles have no drawing direction, but behaves as if it is drawn clockwise.
		 * by default, arc command also goes clockwise (but direction can be changed via final argument)
		 */
		let x = 1250
		let y = 650
		cvs.ctx.save()
		cvs.ctx.translate(x, y)

		//cvs.ctx.fillRect(0, 0, 150, 150)
		//cvs.ctx.clearRect(0, 0, 150, 150)
		// punching a whole in the sky
		cvs.ctx.translate(75, 75)

		// clipping path
		cvs.ctx.beginPath()
		cvs.ctx.rect(-75, -75, 150, 150)
		cvs.ctx.arc(0, 0, 60, 0, Math.PI * 2, true)
		if (settings.noClipDebug == false.toString()) {
			cvs.ctx.clip()
		}

		// draw stars background
		const linearGradient = cvs.ctx.createLinearGradient(0, -75, 0, 75)
		linearGradient.addColorStop(0, '#232256')
		linearGradient.addColorStop(1, '#143778')
		cvs.ctx.fillStyle = linearGradient
		cvs.ctx.fillRect(-75, -75, 150, 150)

		generateStars(cvs)

		cvs.ctx.restore()
	},

	drawSolarSystem: function (cvs) {
		/**
		 * basic animations
		 *
		 * simplistic outline:
		 * 	1. clear canvas. clearRect or masking.
		 *  2. save canvas state
		 *  3. draw animated shapes
		 *  4. restore canvas state
		 *
		 * controlling an animation:
		 * 	- animation speed is affected by computer hardware
		 *  - setInterval/setTimeout can be used to delay functions
		 *  - requestAnimationFrame tells browser to update animation before next repaint
		 */

		// animated solar system
		const x = 1450
		const y = 650
		const time = new Date()
		cvs.ctx.save()
		cvs.ctx.translate(x, y)

		// get images
		const sunImage = document.getElementById('canvas-sun-image')
		const earthImage = document.getElementById('canvas-earth-image')
		const moonImage = document.getElementById('canvas-moon-image')

		// set properties
		//cvs.ctx.globalCompositeOperation = 'destination-over'
		cvs.ctx.fillStyle = 'rgb(0 0 0 / 40%)'
		cvs.ctx.strokeStyle = 'rgb(0 153 255 / 40%)'
		// draw sun
		cvs.ctx.beginPath()
		cvs.ctx.drawImage(sunImage, 0, 0, 300, 300)
		// earth orbit
		cvs.ctx.arc(150, 150, 105, 0, Math.PI * 2, false)
		cvs.ctx.stroke()

		// setup earth drawing properties
		const earthRotA = ((2 * Math.PI) / 60) * time.getSeconds()
		const earthRotB = ((2 * Math.PI) / 60000) * time.getMilliseconds()
		cvs.ctx.translate(150, 150)
		cvs.ctx.rotate(earthRotA + earthRotB)

		// draw moon
		cvs.ctx.save()
		const moonRotA = ((2 * Math.PI) / 6) * time.getSeconds()
		const moonRotB = ((2 * Math.PI) / 6000) * time.getMilliseconds()
		cvs.ctx.translate(105, 0)
		cvs.ctx.rotate(moonRotA + moonRotB)
		cvs.ctx.translate(0, 28.5)
		cvs.ctx.drawImage(moonImage, -3.5, -3.5)
		cvs.ctx.restore()

		// draw earth
		cvs.ctx.translate(105, 0)
		cvs.ctx.drawImage(earthImage, -12, -12)
		// earth shadow
		cvs.ctx.fillRect(0, -12, 40, 24)

		cvs.ctx.restore()
	},

	drawClock: function (cvs) {
		// draw an animated clock which displays the current time
		const x = 1325
		const y = 875
		const date = new Date()
		cvs.ctx.save()
		cvs.ctx.translate(x, y)

		cvs.ctx.scale(0.4, 0.4)
		cvs.ctx.rotate(-Math.PI / 2)
		cvs.ctx.strokeStyle = 'black'
		cvs.ctx.fillStyle = 'white'
		cvs.ctx.lineWidth = 8
		cvs.ctx.lineCap = 'round'
		cvs.ctx.save()

		// draw clock background
		cvs.ctx.save()
		cvs.ctx.fillStyle = 'moccasin'
		cvs.ctx.beginPath()
		cvs.ctx.arc(0, 0, 132, 0, Math.PI * 2, true)
		cvs.ctx.fill()
		cvs.ctx.restore()

		// draw hour marks
		for (let i = 0; i < 12; i++) {
			cvs.ctx.beginPath()
			cvs.ctx.rotate(Math.PI / 6)
			cvs.ctx.moveTo(100, 0)
			cvs.ctx.lineTo(120, 0)
			cvs.ctx.stroke()
		}

		cvs.ctx.restore()
		cvs.ctx.save()

		// draw minute marks
		cvs.ctx.lineWidth = 5
		for (let i = 0; i < 60; i++) {
			if (i % 5 !== 0) {
				cvs.ctx.beginPath()
				cvs.ctx.moveTo(117, 0)
				cvs.ctx.lineTo(120, 0)
				cvs.ctx.stroke()
			}
			cvs.ctx.rotate(Math.PI / 30)
		}

		cvs.ctx.restore()

		const sec = date.getSeconds()
		const min = date.getMinutes()
		const hr = date.getHours() % 12

		cvs.ctx.fillStyle = 'black'

		// draw hour hand
		cvs.ctx.save()
		cvs.ctx.lineWidth = 14
		cvs.ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(-20, 0)
		cvs.ctx.lineTo(80, 0)
		cvs.ctx.stroke()
		cvs.ctx.restore()

		// draw minute hand
		cvs.ctx.save()
		cvs.ctx.lineWidth = 10
		cvs.ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(-28, 0)
		cvs.ctx.lineTo(112, 0)
		cvs.ctx.stroke()
		cvs.ctx.restore()

		// draw seconds hand
		cvs.ctx.save()
		cvs.ctx.lineWidth = 6
		cvs.ctx.strokeStyle = 'red'
		cvs.ctx.fillStyle = 'red'
		cvs.ctx.rotate((sec * Math.PI) / 30)
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(-30, 0)
		cvs.ctx.lineTo(83, 0)
		cvs.ctx.stroke()
		cvs.ctx.beginPath()
		cvs.ctx.arc(0, 0, 10, 0, Math.PI * 2, true)
		cvs.ctx.fill()
		cvs.ctx.beginPath()
		cvs.ctx.arc(95, 0, 10, 0, Math.PI * 2, true)
		cvs.ctx.stroke()
		cvs.ctx.fillStyle = 'rgb(0 0 0 / 0%)'
		cvs.ctx.arc(0, 0, 3, 0, Math.PI * 2, true)
		cvs.ctx.fill()
		cvs.ctx.restore()

		// draw clock body
		cvs.ctx.beginPath()
		cvs.ctx.lineWidth = 14
		cvs.ctx.strokeStyle = 'darkgreen'
		cvs.ctx.arc(0, 0, 142, 0, Math.PI * 2, true)
		cvs.ctx.stroke()

		cvs.ctx.restore()
	},

	drawLoopingPanorama: function (cvs, previousTimestamp, timestamp) {
		// create a looping panorama
		const x = 1060
		const y = 15
		const scale = .73
		const delay = 3
		const rectW = 775
		const rectH = 145
		const dx = 0.75
		const panoramaImage = document.getElementById('looping-panorama-image')
		const imgW = panoramaImage.width * scale
		const imgH = panoramaImage.height * scale

		cvs.ctx.save()
		cvs.ctx.translate(x, y)

		// create a masked rect to fit the panoram image into
		cvs.ctx.lineWidth = 5
		cvs.ctx.strokeStyle = 'rgb(206, 97, 240)'
		cvs.ctx.beginPath()
		cvs.ctx.rect(0, 0, rectW, rectH)
		cvs.ctx.stroke()
		cvs.ctx.clip()

		if (imgW <= rectW) {
			// x is out of bounds, reset x
			if (loopingPanoramaImageX > rectW) {
				loopingPanoramaImageX = -imgW + loopingPanoramaImageX
			}

			// draw additional image, filling main left gap when previous draw ends
			if (loopingPanoramaImageX > 0) {
				cvs.ctx.drawImage(panoramaImage, -imgW + loopingPanoramaImageX, 0, imgW, imgH)
			}

			// stitch remainder of panorama loop
			if (loopingPanoramaImageX - imgW > 0) {
				// fill small gap to the left between original draw and first stich
				cvs.ctx.drawImage(panoramaImage, -imgW * 2 + loopingPanoramaImageX, 0, imgW, imgH)
			}
		} else {
			// check for x out of bounds
			if (loopingPanoramaImageX > rectW) {
				loopingPanoramaImageX = rectW - imgW
			}
			// stitch panorama
			if (loopingPanoramaImageX > rectW - imgW) {
				cvs.ctx.drawImage(panoramaImage, loopingPanoramaImageX - imgW + 1, 0, imgW, imgH)
			}
		}

		// draw image panning to the right
		cvs.ctx.drawImage(panoramaImage, loopingPanoramaImageX, 0, imgW, imgH)

		// use timestamps to time panorama view shifts
		if (timestamp == previousTimestamp || timestamp - loopingPanoramaTimestamp >= delay) {
			// update timestamp
			loopingPanoramaTimestamp = timestamp
			// update x coord
			loopingPanoramaImageX += dx
		}

		cvs.ctx.restore()
	},

	drawMouseFollowing: function (cvs, mouseFollowParticles) {
		// set default coords to empty canvas position
		let coords = {
			x: 1600,
			y: 450
		}
		// set effect properties
		mouseFollowParticles.ctx = cvs.ctx
		mouseFollowParticles.amount = 25
		mouseFollowParticles.coords = { ...coords }
		mouseFollowParticles.rotationSpeed = 0.02
		// render effect
		mouseFollowParticles.render()
	},

	sword: getSword(),
	drawBoundaries: function (cvs) {
		/**
		 * boudnaries
		 *
		 * collision detection
		 * 	- measure x/y edges of object to edges of another object on canvas (or the canvas edges themselves)
		 *  - reverse velocity vectors when edges meet
		 */

		// shield is tightly coupled to sword coords and velocity
		const shield = getShield(this.sword)

		// draw sword & shield
		this.sword.render(cvs.ctx)
		shield.render(cvs.ctx)

		// update on screen position, adding velicty to coordinates
		const newCoords = { x: this.sword.coords.x + this.sword.velocity.x, y: this.sword.coords.y + this.sword.velocity.y }
		this.sword.setCoords(newCoords)

		// collision detection with response
		if (this.sword.isBoundingHeightCollision(cvs.height)) {
			// invert y velcoity
			const dvy = { x: this.sword.velocity.x, y: -this.sword.velocity.y }
			this.sword.setVelocity(dvy)
		}
		if (shield.isBoundingWidthCollision(cvs.width)) {
			// invert x velcoity
			const dvx = { x: -this.sword.velocity.x, y: this.sword.velocity.y }
			this.sword.setVelocity(dvx)
		}
	},

	ball: getBall(),
	ballTrail: effects().shapes.ballTrail(),
	drawAcceleration: function (cvs) {
		/**
		 * use velocity vectors to change acceleration of moving objects
		 * can implement a quasi gravity
		 */

		// create a linear gradient for the ball
		const x0 = this.ball.coords.x - this.ball.radius
		const y0 = this.ball.coords.y - this.ball.radius
		const x1 = this.ball.coords.x + this.ball.radius
		const y1 = this.ball.coords.y + this.ball.radius
		const linearGradient = cvs.ctx.createLinearGradient(x0, y0, x1, y1)
		linearGradient.addColorStop(0, generateColor())
		linearGradient.addColorStop(.8, generateColor())

		// set ball trail effect properties
		this.ballTrail.ctx = cvs.ctx
		this.ballTrail.ball = this.ball
		this.ballTrail.fillStyle = linearGradient
		// draw ball trail
		this.ballTrail.render()
		// draw the ball
		this.ball.render(cvs.ctx, linearGradient)

		// update ball coordinates using a velocity vector
		this.ball.coords.x += this.ball.velocity.x
		this.ball.coords.y += this.ball.velocity.y

		// update velocity vector y axis
		//this.ball.velocity.y *= 0.99
		this.ball.velocity.y += 0.25

		// collision detection
		if (this.ball.coords.y + this.ball.velocity.y > cvs.height - this.ball.radius ||
			this.ball.coords.y + this.ball.velocity.y < this.ball.radius) {
			// keep ball bounce in control
			this.ball.velocity.y *= 0.99
			// invert y velocity at top/bottom edges of canvas
			this.ball.velocity.y = -this.ball.velocity.y
		}
		if (this.ball.coords.x + this.ball.velocity.x > cvs.width - this.ball.radius ||
			this.ball.coords.x + this.ball.velocity.x < this.ball.radius) {
			// invert x velocity at left/right edges of canvas
			this.ball.velocity.x = -this.ball.velocity.x
		}
	},

	clippingPaths: false,
	inverseClippingPaths: false,
	solarSystem: false,
	clock: false,
	loopingPanorama: false,
	mouseFollowing: false,
	boundaries: false,
	acceleration: false

}

export default clippingAndAnimations