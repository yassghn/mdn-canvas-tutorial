/**
 * imagesAndTransformations.mjs
 */

import { gallerize } from "../modules/render.mjs"

const imagesAndTransformations = {

	drawDrawingImages: function (cvs) {
		/**
		 * using images:
		 *
		 * can use any image format that the browser supports, even images on another canvas within the same page source.
		 *
		 * importing images
		 * 	1. get reference to htmlimagelement object or another canvas element (or provide url)
		 *  2. draw image using canvas' drawImage function
		 *
		 * image source: HTMLImageElement, SVGImageElement, HTMLVideoElement, HTMLCanvasElement, ImageBitmap,
		 * 	OffscreenCanvas, VideoFrame
		 *
		 * using images from the same page
		 * 	- document.images collection, other document html element query selectors
		 *
		 * using images from other domains
		 * 	- using crossorigin attribute of HTMLImageElement.crossOrigin (request permission to load from another domain)
		 * 	- if image is not allowed it will 'tain the canvas' (canvas will start throwing exceptions due to security concerns)
		 *
		 * using other canvas elements
		 * 	- access canvas on the same page source via document query selectors
		 * 	- make sure image is drawn before retrieving
		 *
		 * images must be loaded before drawing to canvas
		 * 	- add event listeners for 'load' event, or await HTMLImageElement.decode()
		 *
		 * can use embedded images vai data url: img.src = "data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==";
		 *
		 * canvas allows to use frames from a video retrievable via document query selectors
		 *
		 * drawing images:
		 *	- drawImage(image, x, y)
		 *      draw specified image at coordinates (x, y)
		 */

		// use image as a backdrop for a small line graph
		let x = 875
		let y = 15
		cvs.ctx.strokeStyle = 'rgb(0, 0, 0)'
		// get image and draw it
		const img = document.getElementById('drawing-images-backdrop-image')
		cvs.ctx.drawImage(img, x, y)
		// draw line graph over the image
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(x + 30, y + 96)
		cvs.ctx.lineTo(x + 70, y + 66)
		cvs.ctx.lineTo(x + 103, y + 76)
		cvs.ctx.lineTo(x + 170, y + 15)
		cvs.ctx.stroke()
	},

	drawScaling: function (cvs) {
		/**
		 * scaling
		 *
		 * drawImage(image, x, y, width, height)
		 * 	- second variant of drawImage function
		 * 	- adds ability to scale image using width/height attributes
		 *
		 * NOTE:
		 * 	imageSmoothingEnabled
		 *	 - canvas context property to control the use of image smoothing algorithms.
		 *     enabled by default. can affect fuzzy/blocky artifacts due to scaling process.
		 */

		// tile a scaled image
		let x = 850
		let y = 350
		// get image
		const img = document.getElementById('scaling-images-rhino-image')
		// tile image in a 4x3 grid
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 3; j++) {
				cvs.ctx.drawImage(img, x + j * 50, y + i * 38, 50, 38)
			}
		}
	},

	drawSlicing: function (cvs) {
		/**
		 * slicing
		 *
		 * drawImage(image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight)
		 * 	- third variant of drawImage function
		 * 	- takes a given area of an image, scales, and draws it
		 *  - source (x, y) coords and width/height -> destination (x, y) coords and width/height
		 */

		// framing an image (literally into a picture frame)
		let x = 1000
		let y = 350
		// get images
		const img = document.getElementById('scaling-images-rhino-image')
		const imgFrame = document.getElementById('slicing-images-frame-image')
		// frame picture of the rhino
		cvs.ctx.drawImage(img, 33, 71, 104, 124, x + 21, y + 20, 87, 104)
		// draw frame
		cvs.ctx.drawImage(imgFrame, x, y)
	},

	drawArtGallery: function (cvs) {
		/**
		 * art gallery
		 *
		 * combining images lessons
		 */

		// draw art gallery
		let x = 580
		let y = 639

		// get gallery background image
		const bgImg = document.getElementById('gallery-bg-image')

		// get gallery art frame image
		const frameImg = document.getElementById('slicing-images-frame-image')

		// get gallery art images
		let galleryImgs = []
		for (let i = 1; i < 9; i++) {
			const imgId = `gallery-${i}-image`
			const img = document.getElementById(imgId)
			galleryImgs.push(img)
		}

		// draw art gallery background
		const pattern = cvs.ctx.createPattern(bgImg, 'repeat-x')
		cvs.ctx.fillStyle = pattern
		cvs.ctx.fillRect(x, y, 660, 380)

		// space between edges of rect and gallery art images
		const buffer = 45
		// pixel offset for frame size
		const offset = 20
		// add gallery art images and frames
		gallerize(cvs, galleryImgs, frameImg, x, y, 2, 4, buffer, offset)
	},

	drawSaveRestoreState: function (cvs) {
		/**
		 * save and restore state
		 *
		 * save()
		 * 	- saves entire state of canvas onto a stack.
		 *  - pushes current drawing state onto the stack
		 * restore()
		 * 	- restores entire state of canvas from state stack.
		 *  - pops last pushed state off the stack
		 *
		 * drawing state:
		 * 	- translations (translate, rotate, scale)
		 *  - canvas properties/attributes
		 *  - clipping path
		 */

		// save restore state example
		let x = 50
		let y = 860

		// save default state
		cvs.ctx.save()
		// draw green rectangle
		cvs.ctx.fillStyle = 'rgb(69, 240, 46)'
		cvs.ctx.fillRect(x, y, 150, 150)
		// save state (saves fillStyle)
		cvs.ctx.save()
		// draw black rectangle
		cvs.ctx.fillStyle = 'rgb(0, 0, 0)'
		cvs.ctx.fillRect(x + 15, y + 15, 120, 120)
		cvs.ctx.save()
		// draw grayish-blue rectangle
		cvs.ctx.fillStyle = 'rgb(171, 196, 219)'
		// set globalALpha
		cvs.ctx.globalAlpha = 0.5
		cvs.ctx.fillRect(x + 30, y + 30, 89, 89)
		// restore state (resets globalAlpha to default, goes back to black fillStyle)
		cvs.ctx.restore()
		cvs.ctx.fillRect(x + 45, y + 45, 60, 60)
		// restore state (back to green rectangle)
		cvs.ctx.restore()
		cvs.ctx.fillRect(x + 60, y + 60, 30, 30)
		// restore back to default state
		cvs.ctx.restore()
	},

	drawSaveRestoreState: function (cvs) {

	},

	drawingImages: false,
	scaling: false,
	slicing: false,
	artGallery: false,
	saveRestoreState: false

}

export default imagesAndTransformations