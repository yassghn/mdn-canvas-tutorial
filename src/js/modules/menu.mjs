/**
 * menu.js
 */

import { log } from './util.mjs'

const config = {
	animDuration: { duration: 300 }
}

const selectors = {
	slider: 'sliding-menu',
	sliderMenu: 'slider-menu',
	menuTemplate: 'menu-template',
	menuParent: 'tutorial-menu-placeholder',
	tutorialMenu: 'tutorial-menu',
	menuItemTemplate: 'menu-item-template',
	menuItemParent: 'menu-items',
	menuContent: 'menu-content',
	menuTemplate: 'menu-template',
	menuHeader: 'menu-header',
	menu: 'menu',
	menuItems: 'menu-item',
	toggles: 'input[type="checkbox"]'
}

function toggleHidden(elems) {
	elems.forEach(element => { element.toggleAttribute('hidden') });
}

function animateMenuFocusOut(elems, status) {
	status.isHidden = true
	const menuAnim = window.animatelo.fadeOutLeft(elems.menu, config.animDuration)
	menuAnim[0].onfinish = () => {
		toggleHidden([elems.slider, elems.menu])
		window.animatelo.fadeInLeft(elems.slider, config.animDuration)
	}
}

function animateSliderClick(elems, status) {
	status.isHidden = false
	const sliderAnim = window.animatelo.fadeOutLeft(elems.slider, config.animDuration)
	sliderAnim[0].onfinish = () => {
		toggleHidden([elems.slider, elems.menu])
		const menuAnim = window.animatelo.fadeInLeft(elems.menu, config.animDuration)
		menuAnim[0].onfinish = () => { elems.menu.focus({ focusVisible: false }) }
	}
}

function animateSliderHover(elems) {
	window.animatelo.pulse(elems.slider, config.animDuration)
}

function addFocusEvents(elems, status) {
	elems.menu.addEventListener('focusout', (event) => {
		// prevent spamming clicks from triggering too many animations
		// which causes unexpected behavior
		// events rangeParent and rangeOffset are not set when menu is being animated
		if (event.rangeParent && !status.isHidden) {
			animateMenuFocusOut(elems, status)
		}
	})
	// still want menu to collapse when window loses focus
	window.addEventListener('blur', (event) => {
		if (!elems.menu.hasAttribute('hidden')) {
			animateMenuFocusOut(elems, status)
		}
	})
}

function addMenuItemClickHandler(item, callback) {
	const checkbox = item.children[0].querySelectorAll(selectors.toggles)[0]
	item.children[0].addEventListener('click', (event) => {
		// prevent two events from being fired
		// when clicking on checkbox (toggle switch)
		event.preventDefault()
		// get checkbox value and send to callback
		checkbox.checked = checkbox.checked == true ? false : true
		callback(checkbox.checked)
	})
}

function addClickHandlers(elems, status) {
	elems.slider.addEventListener('click', () => {
		if (status.isHidden) {
			animateSliderClick(elems, status)
		}
	})
	elems.menuHeader.addEventListener('click', () => { elems.menu.blur() })
}

function addHoverEvents(elems) {
	elems.slider.addEventListener('mouseenter', () => { animateSliderHover(elems) })
}

function createMenuEvents(elems, status) {
	addClickHandlers(elems, status)
	addFocusEvents(elems, status)
	addHoverEvents(elems)
}

function browserSupportsTemplates() {
	if ("content" in document.createElement('template')) {
		return true
	}
	return false
}

function hasMenuTemplate() {
	if (document.getElementById(selectors.menuTemplate)) {
		return true
	}
	return false
}

function appendId(id, menuId) {
	return id + '-' + menuId
}

function setId(elem, id) {
	const elemId = elem.getAttribute('class')
	elem.setAttribute('id', appendId(elemId, id))
}

function setIds(elems, menuId) {
	for (const elem of elems) {
		setId(elem, menuId)
	}
}

function setMenuIds(menuId, docFrag) {
	const menu = docFrag.firstElementChild
	const divs = menu.getElementsByTagName('div')
	const svgs = menu.getElementsByTagName('svg')
	setId(menu, menuId)
	setIds(divs, menuId)
	setIds(svgs, menuId)
}

async function appendMenuTemplate() {
	// fetch template
	const menuTemplate = (await(await fetch('/templates/menu.html')).text())
	// create contextual fragment
	const range = document.createRange()
	const menuFrag = range.createContextualFragment(menuTemplate)
	// append template to shadow dom
	document.body.appendChild(menuFrag)
}

function getNumMenus() {
	const menuParent = document.getElementById(selectors.menuParent)
	return menuParent.children.length
}

function calculateNewHeight(heightStr) {
	const numMenus = getNumMenus()
	const height = parseFloat(heightStr.split('px')[0])
	return (height * (numMenus-1))
}

function adjustMenuStyle(menuId) {
	const menu = document.getElementById(appendId(selectors.tutorialMenu, menuId))
	const slider = document.getElementById(appendId(selectors.sliderMenu, menuId))
	const style = getComputedStyle(slider)
	const heightStr = style.getPropertyValue('height')
	const height = calculateNewHeight(heightStr)
	menu.setAttribute('style', `margin-bottom: ${height}px;`)
}

async function insertMenu(menuId) {
	if (browserSupportsTemplates()) {
		let adjustHeight = false
		if (!hasMenuTemplate()) {
			await appendMenuTemplate()
		} else {
			adjustHeight = true
		}
		// get template and template parent
		const template = document.getElementById(selectors.menuTemplate)
		const parent = document.getElementById(selectors.menuParent)
		// clone template
		const clone = template.content.cloneNode(true)
		// set menu ids
		setMenuIds(menuId, clone)
		// append
		parent.appendChild(clone)
		// adjust menu style if necessary
		if (adjustHeight) {
			adjustMenuStyle(menuId)
		}
	} else {
		return false
	}
}

function hasMenuItemTemplate() {
	if (document.getElementById(selectors.menuItemTemplate)) {
		return true
	}
	return false
}

async function appendMenuItemTemplate() {
	// fetch template
	const menuItemTemplate = (await (await fetch('/templates/menu-item.html')).text())
	// create contextual fragment
	const range = document.createRange()
	const menuItemFrag = range.createContextualFragment(menuItemTemplate)
	// append template to shadow dom
	document.body.appendChild(menuItemFrag)
}

function populateMenuItem(item, itemId, itemText, checkboxId) {
	// set menu item id
	item.children[0].setAttribute('id', itemId)
	// set menu item span text
	item.children[0].children[0].textContent = itemText
	// set checkbox attributes
	const checkbox = item.children[0].querySelectorAll(selectors.toggles)[0]
	checkbox.setAttribute('id', checkboxId)
	checkbox.setAttribute('name', checkboxId)
}

async function appendMenuItem(itemId, itemText, checkboxId, callback, menuId) {
	if (!hasMenuItemTemplate()) {
		await appendMenuItemTemplate()
	}
	// get template and template parent
	const template = document.getElementById(selectors.menuItemTemplate)
	const parent = document.getElementById(appendId(selectors.menuItemParent, menuId))
	// clone template
	const clone = template.content.cloneNode(true)
	// populate menu item
	populateMenuItem(clone, itemId, itemText, checkboxId)
	// add click event
	addMenuItemClickHandler(clone, callback)
	// append
	parent.appendChild(clone)
}

function initElems(menuId, elems) {
	// todo: error checking & return
	elems.slider = document.getElementById(appendId(selectors.slider, menuId))
	elems.menu = document.getElementById(appendId(selectors.menuContent, menuId))
	elems.menuHeader = document.getElementById(appendId(selectors.menuHeader, menuId))
}

function enableAll(enabled, menuId) {
	// get all toggle elements
	const parent = document.getElementById(`${selectors.menuItemParent}-${menuId}`)
	const toggles = parent.getElementsByTagName('input')
	// iterate toggles
	if (toggles.length > 1) {
		// skip first toggle (enable all)
		for (let i = 1; i < toggles.length; i++) {
			// get toggle element
			const toggle = toggles[i]
			// set toggle state
			toggle.checked = enabled ? false : true
			// create a click event
			const event = new Event('click', { bubbles: true, cancelable: false, composed: true })
			// fire toggle click event
			toggle.dispatchEvent(event)
		}
	}
}

function menu(menuId) {
	const menuObj = {
		id: menuId,

		status: {
			isHidden: true
		},

		elems: {
			slider: undefined,
			menu: undefined,
			menuHeader: undefined
		},

		enableAllCallback: function (enabled) {
			enableAll(enabled, this.id)
		},

		addMenuItem: async function (itemId, itemText, checkboxId, callback) {
			// todo: return error on error
			await appendMenuItem(itemId, itemText, checkboxId, callback, this.id)
		},

		init: async function () {
			// todo: return error on error
			await insertMenu(this.id)
			initElems(this.id, this.elems)
			createMenuEvents(this.elems, this.status)
		}
	}
	return menuObj
}

export default menu