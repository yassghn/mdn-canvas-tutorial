/**
 * clippingAndAnimationsSetup.mjs
 */

import clippingAndAnimations from './clippingAndAnimations.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback, menu) {
	await menu.addMenuItem(itemId, itemText, checkboxId, callback)
}

function clippingPathsCallback(enabled) {
	clippingAndAnimations.clippingPaths = enabled
}

const clippingAndAnimationsSetup = {
	// clipping paths
	clippingPathsInit: async function (menu) {
		await addMenuItem('clipping-paths', 'clipping paths', 'clipping-paths-check', clippingPathsCallback, menu)
	}
}

export default clippingAndAnimationsSetup