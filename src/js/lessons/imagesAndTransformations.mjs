/**
 * imagesAndTransformations.mjs
 */

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
		cvs.ctx.fillRect(x, y, 600, 380)

		// add gallery art images and frames
		const width = galleryImgs[0].width
		const height = galleryImgs[0].height
		const buffer = 35
		const offset = 20
		const buffOff = buffer + offset
		cvs.ctx.drawImage(galleryImgs[0], x + buffOff, y + buffOff)
		cvs.ctx.drawImage(frameImg, x + buffer, y + buffer)

		cvs.ctx.drawImage(galleryImgs[1], x + offset + (buffer * 2) + width, y + buffOff)
		cvs.ctx.drawImage(frameImg, x + (buffer * 2) + width, y + buffer)

		cvs.ctx.drawImage(galleryImgs[2], x + offset + (buffer * 3) + (width * 2), y + buffOff)
		cvs.ctx.drawImage(frameImg, x + (buffer * 3) + (width * 2), y + buffer)

		cvs.ctx.drawImage(galleryImgs[3], x + offset + (buffer * 4) + (width * 3), y + buffOff)
		cvs.ctx.drawImage(frameImg, x + (buffer * 4) + (width * 3), y + buffer)

		cvs.ctx.drawImage(galleryImgs[4], x + buffOff, y + offset + (buffer * 2) + height)
		cvs.ctx.drawImage(frameImg, x + buffer, y + (buffer * 2) + height)

		cvs.ctx.drawImage(galleryImgs[5], x + offset + (buffer * 2) + width, y + offset + (buffer * 2) + height)
		cvs.ctx.drawImage(frameImg, x + (buffer * 2) + width, y + (buffer * 2) + height)

		cvs.ctx.drawImage(galleryImgs[6], x + offset + (buffer * 3) + (width * 2), y + offset + (buffer * 2) + height)
		cvs.ctx.drawImage(frameImg, x + (buffer * 3) + (width * 2), y + (buffer * 2) + height)

		cvs.ctx.drawImage(galleryImgs[7], x + offset + (buffer * 4) + (width * 3), y + offset + (buffer * 2) + height)
		cvs.ctx.drawImage(frameImg, x + (buffer * 4) + (width * 3), y + (buffer * 2) + height)
	},

	drawingImages: false,
	scaling: false,
	slicing: false,
	artGallery: false

}

export default imagesAndTransformations