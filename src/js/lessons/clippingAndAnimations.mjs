/**
 * clipping and animations
 */

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

		cvs.ctx.restore()
	},

	clippingPaths: false

}

export default clippingAndAnimations