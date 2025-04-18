/**
 * clippingAndAnimationsSetup.mjs
 */

import clippingAndAnimations from './clippingAndAnimations.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback, menu) {
	await menu.addMenuItem(itemId, itemText, checkboxId, callback)
}

const clippingAndAnimationsSetup = {

}

export default clippingAndAnimationsSetup