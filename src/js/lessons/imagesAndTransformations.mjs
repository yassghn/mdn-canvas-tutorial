/**
 * imagesAndTransformations.mjs
 */

import { calculateRectCenter } from '../modules/math.mjs'
import { gallerize } from '../modules/render.mjs'

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

	drawScalingImages: function (cvs) {
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

	drawTranslating: function (cvs) {
		/**
		 * translating
		 *
		 * translate(x, y)
		 * 	- transformation method
		 * 	- moves the canvas and its origin to a different point in the grid
		 *  - x = horizontal distance, y = vertical distance
		 *
		 * note:
		 * 	easier to save/restore state before/after translation than reversing translations
		 */

		// translate example
		let x = 200
		let y = 860
		// draw 3x3 grid of squares, moving their position via transalte
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				cvs.ctx.save()
				cvs.ctx.fillStyle = `rgb(${51 * i} ${255 - 51 * i} ${255 - 51 * (i+j)})`
				cvs.ctx.translate(x + 10 + j * 50, y + 10 + i * 50)
				cvs.ctx.fillRect(0, 0, 25, 25)
				cvs.ctx.restore()
			}
		}
	},

	drawRotating: function (cvs) {
		/**
		 * rotating
		 *
		 * rotate(angle)
		 * 	- transformation method
		 * 	- rotate canvas around the current origin
		 *  - rotates the canvas clockwise around the current angle number of radians
		 *  - rotation center is always canvas origin, use translate to change center
		 *
		 * note:
		 * 	angles are in radians, not degrees.
		 *  - radians = (Math.PI/180) * degrees
		 */

		// rotate example
		let x = 369
		let y = 869
		cvs.ctx.save()

		cvs.ctx.translate(x, y)
		cvs.ctx.fillStyle = 'rgb(252, 133, 163)'
		cvs.ctx.fillRect(30, 30, 50, 50)
		// rotate around new canvas origin
		cvs.ctx.rotate((Math.PI / 180) * 25)
		cvs.ctx.fillStyle = 'rgb(225, 109, 248)'
		cvs.ctx.fillRect(30, 30, 50, 50)

		cvs.ctx.restore()
		cvs.ctx.save()

		cvs.ctx.translate(x, y)
		cvs.ctx.fillStyle = 'rgb(252, 133, 163)'
		cvs.ctx.fillRect(100, 30, 50, 50)
		// translate to rect center, rotate around center, translate back
		const center = calculateRectCenter(100, 30, 50, 50)
		cvs.ctx.translate(center.x, center.y)
		cvs.ctx.rotate((Math.PI / 180) * 25)
		cvs.ctx.translate(-(center.x), -(center.y))
		// draw rectangle rotated around center of previous rectangle
		cvs.ctx.fillStyle = 'rgb(225, 109, 248)'
		cvs.ctx.fillRect(100, 30, 50, 50)

		cvs.ctx.restore()
	},

	drawScaling: function (cvs) {
		/**
		 * scaling
		 *
		 * scale(x, y)
		 * 	- transformation method
		 *  - increase or decrease units in canvas grid
		 *  - used to scale down or enlarge shapes & bitmaps
		 *  - scales canvas x units horizontally, y units vertically
		 *  - values below 1.0 reduce unit size, values about 1.0 increase unit size
		 *  - using negative numbers allows for axis mirroring
		 *
		 * i.e. scale(0.5, 0.5) 1 unit = .5 pixels
		 *      scale(2.0, 2.0) 1 unit = 2 pixels
		 *
		 * NOTES:
		 *  cartesian coordinate system: origin at bottom left corner
		 *  	translate(0, canvas.height)
		 *      scale(1, -1)
		 */

		// scale example
		let x = 700
		let y = 320
		cvs.ctx.save()

		// scale a simple rectangle
		cvs.ctx.translate(x, y)
		cvs.ctx.scale(10, 3)
		cvs.ctx.fillStyle = 'rgb(235, 70, 106)'
		cvs.ctx.fillRect(1, 10, 10, 10)

		cvs.ctx.restore()
		cvs.ctx.save()

		// mirror text horizontally
		cvs.ctx.translate(x, y)
		cvs.ctx.scale(-1, 1)
		cvs.ctx.font = '48px tahoma'
		cvs.ctx.fillStyle = 'rgb(235, 70, 106)'
		cvs.ctx.fillText('MDN', -110, 95)

		cvs.ctx.restore()
	},

	drawTransform: function (cvs) {
		/**
		 * transforms
		 *
		 * transform(a, b, c, d, e, f)
		 * 	- transformation method
		 * 	- directly modify transformation matrix
		 *  - multiplies current transformation matrix by arguments
		 * 	- [ a c e ]
		 *    [ b d f ]
		 *    [ 0 0 1 ]
		 * - if infinity is used for transformation matrix must be marked infinite
		 *
		 * a (m11) - horizontal scaling
		 * b (m12) - horizontal skewing
		 * c (m21) - vertical skewing
		 * d (m22) - vertical scaling
		 * e (dx)  - horizontal moving
		 * f (dy)  - vertical moving
		 *
		 * setTransform(a, b, c, d, e, f)
		 * 	- resets current transform to identity matrix, calls transform with same args
		 *  - undoes current transformation, sets new specified transform
		 *
		 * resetTransform()
		 * 	- resets current transform to identity matrix
		 *  - setTransform(1, 0, 0, 1, 0, 0)
		 */

		// transform example
		const x = 1250
		const y = 450
		cvs.ctx.save()

		const sin = Math.sin(Math.PI / 6)
		const cos = Math.cos(Math.PI / 6)

		cvs.ctx.translate(x, y)

		let c = 0
		for (let i = 0; i <= 12; i++) {
			c = Math.floor((255 / 12) * i)
			cvs.ctx.fillStyle = `rgb(155 ${c} ${c})`
			cvs.ctx.fillRect(0, 0, 100, 10)
			cvs.ctx.transform(cos, sin, -sin, cos, 0, 0)
		}

		cvs.ctx.setTransform(-1, 0, 0, 1, x, y)
		cvs.ctx.fillStyle = 'rgb(255 128 255 / 50%)'
		cvs.ctx.fillRect(0, 50, 100, 100)

		cvs.ctx.restore()
	},

	drawingImages: false,
	scalingImages: false,
	slicing: false,
	artGallery: false,
	saveRestoreState: false,
	translating: false,
	rotating: false,
	scaling: false,
	transform: false

}

export default imagesAndTransformations