/**
 * contextProperties.mjs
 */

const _defaults = {
	canvas: undefined,
	globalAlpha: undefined,
	globalCompositeOperation: undefined,
	strokeStyle: undefined,
	fillStyle: undefined,
	filter: undefined,
	imageSmoothingEnabled: undefined,
	lineWidth: undefined,
	lineCap: undefined,
	lineJoin: undefined,
	miterLimit: undefined,
	lineDashOffset: undefined,
	shadowOffsetX: undefined,
	shadowOffsetY: undefined,
	shadowBlur: undefined,
	shadowColor: undefined,
	font: undefined,
	textAlign: undefined,
	textBaseline: undefined,
	direction: undefined,
	letterSpacing: undefined,
	fontKerning: undefined,
	fontStretch: undefined,
	fontVariantCaps: undefined,
	textRendering: undefined,
	wordSpacing: undefined,
}

function ContextProperties(properties = undefined) {
	Object.assign(this, _defaults)

	const init = (properties) => {
		if (properties) {
			// iterate this keys
			Object.keys(_defaults).forEach((prop) => {
				// set propertyy value
				this[prop] = properties[prop]
			})
		}
	}

	const setProps = (ctx) => {
		// iterate properties
		Object.keys(_defaults).forEach((prop) => {
			// check if prop is undefined,
			if (this[prop]) {
				// set prop on context
				ctx[prop] = this[prop]
			}
		})
	}

	this.set = (ctx) => {
		setProps(ctx)
	}

	init(properties)
}

export default ContextProperties