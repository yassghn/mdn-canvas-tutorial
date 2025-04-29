/**
 * scrollingTextEffect.mjs
 */

function _measureText(ctxState, text) {
	const width = ctxState.apply((ctx, text) => {
		return ctx.measureText(text).width
	}, text)
	return width
}

function _setProps(effect, ctxState, text, maxWidth, startXpos, ypos, scrollWidth) {
	// set properties
	effect.props.text = text
	effect.props.textWidth = _measureText(ctxState, text)
	effect.props.maxWidth = maxWidth
	effect.props.startX = startXpos
	effect.props.x = startXpos
	effect.props.y = ypos
	effect.props.scrollWidth = scrollWidth
}

function _updateProps(props) {
	// scroll to the left
	props.x -= props.scrollWidth
	// check for reset x
	if (Math.abs(props.x - props.startX) > props.textWidth + Math.abs(props.startX) + (props.scrollWidth * 30)) {
		props.x = Math.abs(props.startX) + (props.scrollWidth * 30)
	}
}

function scrollingTextEffect(...props) {
	// create effect
	const effect = {
		props: {
			text: '',
			textWidth: 0,
			maxWidth: 0,
			startX: 0,
			x: 0,
			y: 0,
			scrollWidth: 0
		},

		update: function () {
			_updateProps(this.props)
		}
	}
	// set effects initial properties
	_setProps(effect, ...props)
	// return effect
	return effect
}

export default scrollingTextEffect