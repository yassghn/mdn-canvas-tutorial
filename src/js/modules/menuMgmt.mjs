/**
 * menuMgmnt.mjs
 */

import menu from './menu.mjs'

const menuMgmt = {
	createMenu: async function (menuId) {
		const newMenu = menu(menuId)
		await newMenu.init()
		return newMenu
	}
}

export default menuMgmt