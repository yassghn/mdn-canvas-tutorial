/**
 * clipping and animations
 */

import { generateStars } from '../modules/render.mjs'

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
			cvs.ctx.clip()

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
			cvs.ctx.clip()
	
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
		cvs.ctx.save()
		cvs.ctx.translate(x, y)

		// get images
		const sunImage = document.getElementById('canvas-sun-image')
		const earthImage = document.getElementById('canvas-earth-image')
		const moonImage = document.getElementById('canvas-moon-image')

		// set properties
		cvs.ctx.globalCompositeOperation = 'destination-over'
		cvs.ctx.fillStyle = 'rgb(0 0 0 / 40%)'
		cvs.ctx.strokeStyle = 'rgb(0 153 255 / 40%)'
		cvs.ctx.save()
		cvs.ctx.translate(150, 150)

		// draw earth
		const time = new Date()
		const earthRotA = ((2 * Math.PI) / 60) * time.getSeconds()
		const earthRotB = ((2 * Math.PI) / 60000) * time.getMilliseconds()
		cvs.ctx.rotate(earthRotA + earthRotB)
		cvs.ctx.translate(105, 0)
		// earth shadow
		cvs.ctx.fillRect(0, -12, 40, 24)
		cvs.ctx.drawImage(earthImage, -12, -12)

		// draw moon
		cvs.ctx.save()
		const moonRotA = ((2 * Math.PI) / 6) * time.getSeconds()
		const moonRotB = ((2 * Math.PI) / 6000) * time.getMilliseconds()
		cvs.ctx.rotate(moonRotA + moonRotB)
		cvs.ctx.translate(0, 28.5)
		cvs.ctx.drawImage(moonImage, -3.5, -3.5)

		cvs.ctx.restore()
		cvs.ctx.restore()

		// draw sun
		cvs.ctx.beginPath()
		// earth orbit
		cvs.ctx.arc(150, 150, 105, 0, Math.PI * 2, false)
		cvs.ctx.stroke()
		cvs.ctx.drawImage(sunImage, 0, 0, 300, 300)

		cvs.ctx.restore()
	},

	drawClock: function (cvs) {

	},

	clippingPaths: false,
	inverseClippingPaths: false,
	solarSystem: false,
	clock: false

}

export default clippingAndAnimations