/**
 * menuMgmnt.mjs
 */

import menu from './menu.mjs'

async function addDefaultEnabledAll(menu) {
	// create id for menu item
	const id = `enable-all-${menu.id}`
	// pass callback as lambda to not lose the context on 'this'
	await menu.addMenuItem(id, 'enable all'.toUpperCase(), `${id}-check`, (args) => menu.enableAllCallback(args))
}

const menuMgmt = {
	createMenu: async function (menuId) {
		// create menu
		const newMenu = menu(menuId)
		await newMenu.init()
		// add default enable all menu item
		await addDefaultEnabledAll(newMenu)
		// return new menu
		return newMenu
	}
}

export default menuMgmt