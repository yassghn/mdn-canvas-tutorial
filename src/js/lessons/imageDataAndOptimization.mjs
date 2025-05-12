/**
 * imageDataAndOptimization.mjs
 */

import api from '../modules/api.mjs'
import ContextProperties from '../modules/ContextProperties.mjs'
import ContextState from '../modules/ContextState.mjs'
import pointer from '../modules/pointer.mjs'

const imageDataAndOptimization = {

	renderColorPicker: function (cvs, vars, previousTimestamp, timestamp) {
		/**
		 * image data object
		 *
		 * ImageData
		 * 	- representation of canvas object pixel data
		 * 	- has width/height/data properties
		 *  - data: Uint8ClampedArray, one dimensional array containing pixel data in rgba order
		 *    and rgb color values (0...255). this is raw pixel data. all pixels are one-byte rgba values.
		 *    each color component, r, g, b, or a, has a consecutive index within the array. top-left pixel
		 *    r value is index position 0 in the data array. pixels move from left->right, then down to the
		 *    next "row" through the whole data array. the array has (height x width x 4) bytes of data.
		 *    the data array has ((height x width x 4) - 1) indices.
		 * - can be created blank: ctx.createImageData(width, height) || ctx.createImageData(imageDataObj)
		 * - get current image data obj: ctx.getImageData(left, top, width, height)
		 *   NOTE: pixels outside the range of the actual canvas are returned as transparent black
		 */

		// create a color picker using the image data obj

		// get pointer state
		const pointerState = pointer()

		// set default selected color to fully transparent black
		const color = {
			hover: vars.hoverColor,
			selected: vars.selectedColor ? vars.selectedColor : 'rgb(0, 0, 0, 0)'
		}

		/**
		 * getImageData is very expensive. slows down animation significantly.
		 * add a delay check. timestamp == previousTimestamp is first render.
		 */
		if (timestamp == previousTimestamp || timestamp - vars.lastRender >= vars.delay) {
			// update last render
			vars.lastRender = timestamp
			// get color directly under cursor
			if (pointerState.inWindow) {
				const pixel = cvs.ctx.getImageData(pointerState.coords.x, pointerState.coords.y, 1, 1)
				const data = pixel.data
				color.hover = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`
				// update vars with new hover color
				vars.hoverColor = color.hover
			} else {
				// do not keep last hover color when mouse is not in window
				vars.hoverColor = color.hover = 'rgba(0, 0, 0, 0)'
			}
		}

		// init props and state
		const props = new ContextProperties()
		props.font = '15px tahoma'
		const state = new ContextState(cvs.ctx, props)

		// render color picker
		state.apply((_ctx, _color) => {
			// init api
			const $ = api
			$.init(_ctx)
			// define grid position
			const x = 1450
			const y = 200
			const size = 100
			// set grid position
			_ctx.translate(x, y)
			// render hover square
			_ctx.fillStyle = _color.hover
			_ctx.moveTo(0, 0)
			_ctx.beginPath()
			_ctx.rect(0, 0, size, size)
			_ctx.fill()
			// render rgba value over hover color
			_ctx.fillStyle = 'white'
			_ctx.beginPath()
			_ctx.fillText(_color.hover, 0, -5)
			// render verticle label
			$.verticalLabel('hover color', -15, 0)
			// render selected color square
			_ctx.fillStyle = _color.selected
			// translate x pos
			_ctx.translate(175, 0)
			_ctx.beginPath()
			_ctx.rect(0, 0, size, size)
			_ctx.fill()
			// render rgba value over selected color
			_ctx.fillStyle = 'white'
			_ctx.beginPath()
			_ctx.fillText(_color.selected, 0, -5)
			// render verticle label
			$.verticalLabel('selected color', -15, 0)

		}, color)
	},

	colorPicker: false

}

export default imageDataAndOptimization