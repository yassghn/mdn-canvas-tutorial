/**
 * contextProperties.mjs
 */

import uiCanvas from './uiCanvas.mjs'

function isValidCanvasContextProperty(propname) {
	const ctx = uiCanvas.get().ctx
	return Reflect.has(ctx, propname)
}

function ContextProperties(properties = undefined) {
	this.props = {
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

	const isValid = (propname) => {
		return isValidCanvasContextProperty(propname)
	}

	const init = (properties) => {
		try {
			if (properties) {
				// iterate this keys
				Object.keys(properties).forEach((prop) => {
					// make sure property is valid
					if (isValid(prop)) {
						// set propertyy value
						this.props[prop] = properties[prop]
					} else {
						// catch reference error
						throw new ReferenceError(`invalid context property: ${prop}`)
					}
				})
			}
		} catch (e) {
			// throw error
			throw e
		}
	}

	const setProps = (ctx) => {
		// iterate properties
		Object.keys(this.props).forEach((prop) => {
			// check if prop is undefined,
			if (prop) {
				// set prop on context
				Reflect.set(ctx, prop, this.props[prop])
			}
		})
	}

	this.set = (ctx) => {
		setProps(ctx)
	}

	init(properties)
}

export default ContextProperties