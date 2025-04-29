/**
 * menuMgmnt.mjs
 */

import menu from './menu.mjs'

async function _addDefaultEnabledAll(menu) {
	// create id for menu item
	const id = `enable-all-${menu.id}`
	// pass callback as lambda to not lose the context on 'this'
	await menu.addMenuItem(id, 'enable all'.toUpperCase(), `${id}-check`, (args) => menu.enableAll(args))
}

const menuMgmt = {
	createMenu: async function (menuId, cvs) {
		// create menu
		const newMenu = menu(menuId)
		await newMenu.init(cvs)
		// add default enable all menu item
		await _addDefaultEnabledAll(newMenu)
		// return new menu
		return newMenu
	}
}

export default menuMgmt