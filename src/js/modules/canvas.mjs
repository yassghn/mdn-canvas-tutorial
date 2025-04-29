/**
 * canvas.mjs
 */

/**
 * NOTES:
 * CanvasRenderingContext2D
 *  - object properties are getter/setter pairs not actual variables with values.
 *  - implement get/set propname function bindings
 *    	const obj = { get propname() { ... }, set propname() { ... } }
 *      console.log(obj.propname) // calls getter function for propname
 *      obj.propname = 'value' // calls setter function for propname
 *  - to get property names (without functions)
 *    getProps = (object) => {
 *       let props = [];
 *       for (const prop in object) {
 *         if (JSON.stringify(object[prop])) {
 *           props.push(prop)
 *         }
 *       }
 *       return props
 *    }
 */

// canvas object
const cvs = {
	// canvas width/height
	width: undefined,
	height: undefined,
	// canvas rendering context
	ctx: undefined
}

function setCanvasDimensions() {
	// set widths to window
	cvs.width = (cvs.ctx.canvas.width = window.innerWidth)
	cvs.height = (cvs.ctx.canvas.height = window.innerHeight)
}

function clearCanvas() {
	cvs.ctx.fillStyle = 'rgb(0 0 0)'
	cvs.ctx.fillRect(0, 0, cvs.width, cvs.height)
}

const canvas = {
	// adjust canvas after window resize
	adjustCanvas: function () {
		// set new dimensions
		setCanvasDimensions()
	},

	// check browser for canvas support
	isCanvasSupported: function () {
		if (cvs.ctx.canvas.getContext) {
			return true
		}
		return false
	},

	// configure canvas object
	configCanvas: function () {
		// get canvas
		const canvas = document.querySelector('#tutorial-canvas')
		// get canvas context
		cvs.ctx = canvas.getContext('2d')
		// set canvas dimentions
		setCanvasDimensions()
	},

	clear: function() {
		clearCanvas()
	},

	get: function() {
		return cvs
	},

	canvasPallete: function (timestamp) {
		// clear canvas
		clearCanvas()
	}
}

export default canvas