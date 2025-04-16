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

	},

	drawingImages: false,
	scaling: false

}

export default imagesAndTransformations