/**
 * clipping and animations
 */

import { generateStars } from '../modules/render.mjs'

const clippingAndAnimations = {
	drawClippingPaths: function (cvs) {
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

		// create background square
		cvs.ctx.fillRect(0, 0, 150, 150)
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

	drawInverseClippingPaths: function (cvs) {
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

		// punching a whole in the sky
		let x = 1250
		let y = 650
		cvs.ctx.save()

		cvs.ctx.translate(x, y)
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

	clippingPaths: false,
	inverseClippingPaths: false

}

export default clippingAndAnimations