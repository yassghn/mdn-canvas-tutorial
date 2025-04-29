/**
 * contextState.mjs
 */

import ContextProperties from './ContextProperties.mjs'

function ContextState(ctx, properties) {
	this.self = undefined
	this.ctx = undefined
	this.props = undefined

	const init = (ctx, properties) => {
		if (!this.self) {
			this.self = this
			this.ctx = ctx
			this.props = new ContextProperties(properties)
		}
	}

	const setProps = (self) => {
		self.props.set(self.ctx)
	}

	this.apply = (lambda, ...args) => {
		// save state
		this.ctx.save()
		// set canvas state properties
		setProps(this.self)
		// get return value of lambda (if any)
		const ret = lambda(this.ctx, ...args)
		// restore state
		this.ctx.restore()
		// return value
		return ret
	}

	init(ctx, properties)
}

export default ContextState