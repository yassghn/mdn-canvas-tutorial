/**
 * menu.js
 */
import { log } from './util.mjs'

const config = {
	animDuration: { duration: 300 }
}

const elems = {
	slider: undefined,
	menu: undefined,
	menuHeader: undefined,
	menuItems: undefined,
	toggles: undefined
}

const selectors = {
	slider: 'menu-slider',
	menuTemplate: 'menu-template',
	menuParent: 'tutorial-menu-placeholder',
	menuItemTemplate: 'menu-item-template',
	menuItemParent: 'menu-items',
	menu: 'menu-content',
	menuHeader: 'menu-header',
	menuItems: 'menu-item',
	toggles: 'input[type="checkbox"]'
}

function toggleHidden(elems) {
	elems.forEach(element => { element.toggleAttribute('hidden') });
}

function animateMenuFocusOut() {
	const menuAnim = window.animatelo.fadeOutLeft(elems.menu, config.animDuration)
	menuAnim[0].onfinish = () => {
		toggleHidden([elems.slider, elems.menu])
		window.animatelo.fadeInLeft(elems.slider, config.animDuration)
	}
}

function animateSliderClick() {
	const sliderAnim = window.animatelo.fadeOutLeft(elems.slider, config.animDuration)
	sliderAnim[0].onfinish = () => {
		toggleHidden([elems.slider, elems.menu])
		const menuAnim = window.animatelo.fadeInLeft(elems.menu, config.animDuration)
		menuAnim[0].onfinish = () => { elems.menu.focus({ focusVisible: false }) }
	}
}

function animateSliderHover() {
	window.animatelo.pulse(elems.slider, config.animDuration)
}

function addFocusEvents() {
	elems.menu.addEventListener('focusout', (event) => {
		// relatedTarget gets set when checkboxes are ticked
		// do not collapse menu on checkbox focus
		if (!event.relatedTarget) {
			animateMenuFocusOut()
		}
	})
}

function addMenuItemClickHandler(item, callback) {
	const checkbox = item.children[0].querySelectorAll(selectors.toggles)[0]
	item.children[0].addEventListener('click', (event) => {
		// prevent two events from being fired
		event.preventDefault()
		// get checkbox value and send to callback
		checkbox.checked = checkbox.checked == true ? false : true
		callback(checkbox.checked)
	})
}

function addClickHandlers() {
	elems.slider.addEventListener('click', () => { animateSliderClick() })
	elems.menuHeader.addEventListener('click', () => { elems.menu.blur() })
}

function addHoverEvents() {
	elems.slider.addEventListener('mouseenter', () => { animateSliderHover() })
}

function createMenuEvents() {
	addClickHandlers()
	addFocusEvents()
	addHoverEvents()
}

function browserSupportsTemplates() {
	if ("content" in document.createElement('template')) {
		return true
	}
	return false
}

async function insertMenu() {
	if (browserSupportsTemplates()) {
		// fetch template
		const menuTemplate = (await (await fetch('/templates/menu.html')).text())
		// create contextual fragment
		const range = document.createRange()
		const menuFrag = range.createContextualFragment(menuTemplate)
		// append template to shadow dom
		document.body.appendChild(menuFrag)
		// get template and template parent
		const template = document.getElementById(selectors.menuTemplate)
		const parent = document.getElementById(selectors.menuParent)
		// clone template
		const clone = template.content.cloneNode(true)
		parent.appendChild(clone)
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

async function appendMenuItem(itemId, itemText, checkboxId, callback) {
	if (!hasMenuItemTemplate()) {
		await appendMenuItemTemplate()
	}
	// get template and template parent
	const template = document.getElementById(selectors.menuItemTemplate)
	const parent = document.getElementById(selectors.menuItemParent)
	// clone template
	const clone = template.content.cloneNode(true)
	// populate menu item
	populateMenuItem(clone, itemId, itemText, checkboxId)
	// add click event
	addMenuItemClickHandler(clone, callback)
	// append
	parent.appendChild(clone)
}

function initElems() {
	// todo: error checking & return
	elems.slider = document.getElementById(selectors.slider)
	elems.menu = document.getElementById(selectors.menu)
	elems.menuHeader = document.getElementById(selectors.menuHeader)
	//elems.menuItems = document.getElementsByClassName(selectors.menuItems)
	elems.toggles = document.querySelectorAll(selectors.toggles)
}

const menu = {
	adddMenuItem: async function(itemId, itemText, checkboxId, callback) {
		// todo: return error on error
		await appendMenuItem(itemId, itemText, checkboxId, callback)
	},

	init: async function() {
		// todo: return error on error
		await insertMenu()
		initElems()
		createMenuEvents()
	}
}

export default menu