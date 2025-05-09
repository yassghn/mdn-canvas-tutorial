/**
 * neonGlitchTextEffect.mjs
 */

function _incrementalShadowProps(props) {
	if (props.shadowOffset < 10) {
		props.shadowOffset++
	} else {
		props.shadowPropsUp = false
	}
	if (props.shadowBlur < 3) {
		props.shadowBlur++
	} else {
		props.shadowBlur = 1
	}
	if (props.shadowTransparency < 70) {
		props.shadowTransparency += 5
	}
}

function _decrementalShadowProps(props) {
	if (props.shadowOffset > 0) {
		props.shadowOffset--
	} else {
		props.shadowPropsUp = true
	}
	if (props.shadowBlur > 0) {
		props.shadowBlur--
	} else {
		props.shadowBlur = 2
	}
	if (props.shadowTransparency > 20) {
		props.shadowTransparency -= 5
	}
}

function _setShadowProps(props) {
	if (props.shadowPropsUp) {
		_incrementalShadowProps(props)
	} else {
		_decrementalShadowProps(props)
	}
}

function neonGlitchTextEffectProps() {
	const effect = {
		props: {
			shadowOffset: 0,
			shadowBlur: 0,
			shadowTransparency: 20,
			shadowPropsUp: true
		},

		setProps: function() {
			_setShadowProps(this.props)
		}
	}
	return effect
}

export default neonGlitchTextEffectProps
