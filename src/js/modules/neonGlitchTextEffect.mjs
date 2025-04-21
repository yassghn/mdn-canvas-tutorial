/**
 * neonGlitchTextEffect.mjs
 */

function incrementalShadowProps(props) {
	if (props.shadowOffset <= 10) {
		props.shadowOffset++
	} else {
		props.shadowPropsUp = false
	}
	if (props.shadowBlur <= 2) {
		props.shadowBlur++
	} else {
		props.shadowBlur = 1
	}
	if (props.shadowTransparency <= 50) {
		props.shadowTransparency += 5
	}
}

function decrementalShadowProps(props) {
	if (props.shadowOffset > 0) {
		props.shadowOffset--
	} else {
		props.shadowPropsUp = true
	}
	if (props.shadowBlur <= 1) {
		props.shadowBlur--
	} else {
		props.shadowBlur = 2
	}
	if (props.shadowTransparency <= 50) {
		props.shadowTransparency -= 5
	}
}

function setShadowProps(props) {
	if (props.shadowPropsUp) {
		incrementalShadowProps(props)
	} else {
		decrementalShadowProps(props)
	}
}

function neonGlitchTextEffectProps() {
	const effect = {
		props: {
			shadowOffset: 0,
			shadowBlur: 0,
			shadowTransparency: 0,
			shadowPropsUp: true
		},

		setProps: function() {
			setShadowProps(this.props)
		}
	}
	return effect
}

export default neonGlitchTextEffectProps
