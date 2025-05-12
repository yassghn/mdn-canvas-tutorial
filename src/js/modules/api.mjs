/**
 * api.mjs
 */

import textApi from './api/text.mjs'

const api = {

	init: function(ctx) {
		this.ctx = ctx
	},

	get verticalLabel() {
		return (text, x, y) => { return textApi.label.vertical(this.ctx, text, x, y) }
	}
}

export default api