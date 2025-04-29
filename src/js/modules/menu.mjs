/**
 * menu.js
 */

import { log } from './util.mjs'

const _config = {
	animDuration: { duration: 300 }
}

const _selectors = {
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

function _toggleHidden(elems) {
	elems.forEach(element => { element.toggleAttribute('hidden') });
}

function _animateMenuFocusOut(elems, status) {
	status.isHidden = true
	const menuAnim = window.animatelo.fadeOutLeft(elems.menu, _config.animDuration)
	menuAnim[0].onfinish = () => {
		_toggleHidden([elems.slider, elems.menu])
		window.animatelo.fadeInLeft(elems.slider, _config.animDuration)
	}
}

function _animateSliderClick(elems, status) {
	status.isHidden = false
	const sliderAnim = window.animatelo.fadeOutLeft(elems.slider, _config.animDuration)
	sliderAnim[0].onfinish = () => {
		_toggleHidden([elems.slider, elems.menu])
		const menuAnim = window.animatelo.fadeInLeft(elems.menu, _config.animDuration)
		menuAnim[0].onfinish = () => { elems.menu.focus({ focusVisible: false }) }
	}
}

function _animateSliderHover(elems) {
	window.animatelo.pulse(elems.slider, _config.animDuration)
}

function _addFocusEvents(elems, status) {
	elems.menu.addEventListener('focusout', (event) => {
		// prevent spamming clicks from triggering too many animations
		// which causes unexpected behavior
		// events rangeParent and rangeOffset are not set when menu is being animated
		if (event.rangeParent && !status.isHidden) {
			_animateMenuFocusOut(elems, status)
		}
	})
	// still want menu to collapse when window loses focus
	window.addEventListener('blur', (event) => {
		if (!elems.menu.hasAttribute('hidden')) {
			_animateMenuFocusOut(elems, status)
		}
	})
}

function _addMenuItemClickHandler(item, callback, cvs) {
	const checkbox = item.children[0].querySelectorAll(_selectors.toggles)[0]
	item.children[0].addEventListener('click', (event) => {
		// prevent two events from being fired
		// when clicking on checkbox (toggle switch)
		event.preventDefault()
		// get checkbox value and send to callback
		checkbox.checked = checkbox.checked == true ? false : true
		// clear canvas
		cvs.clear()
		// set menu enabled drawing state
		callback(checkbox.checked)
	})
}

function _addClickHandlers(elems, status) {
	elems.slider.addEventListener('click', () => {
		if (status.isHidden) {
			_animateSliderClick(elems, status)
		}
	})
	elems.menuHeader.addEventListener('click', () => { elems.menu.blur() })
}

function _addHoverEvents(elems) {
	elems.slider.addEventListener('mouseenter', () => { _animateSliderHover(elems) })
}

function _createMenuEvents(elems, status) {
	_addClickHandlers(elems, status)
	_addFocusEvents(elems, status)
	_addHoverEvents(elems)
}

function _browserSupportsTemplates() {
	if ("content" in document.createElement('template')) {
		return true
	}
	return false
}

function _hasMenuTemplate() {
	if (document.getElementById(_selectors.menuTemplate)) {
		return true
	}
	return false
}

function _appendId(id, menuId) {
	return id + '-' + menuId
}

function _setId(elem, id) {
	const elemId = elem.getAttribute('class')
	elem.setAttribute('id', _appendId(elemId, id))
}

function _setIds(elems, menuId) {
	for (const elem of elems) {
		_setId(elem, menuId)
	}
}

function setMenuIds(menuId, docFrag) {
	const menu = docFrag.firstElementChild
	const divs = menu.getElementsByTagName('div')
	const svgs = menu.getElementsByTagName('svg')
	_setId(menu, menuId)
	_setIds(divs, menuId)
	_setIds(svgs, menuId)
}

async function _appendMenuTemplate() {
	// fetch template
	const menuTemplate = (await(await fetch('/templates/menu.html')).text())
	// create contextual fragment
	const range = document.createRange()
	const menuFrag = range.createContextualFragment(menuTemplate)
	// append template to shadow dom
	document.body.appendChild(menuFrag)
}

function _getNumMenus() {
	const menuParent = document.getElementById(_selectors.menuParent)
	return menuParent.children.length
}

function calculateNewHeight(heightStr) {
	const numMenus = _getNumMenus()
	const height = parseFloat(heightStr.split('px')[0])
	return (height * (numMenus-1))
}

function _adjustMenuStyle(menuId) {
	const menu = document.getElementById(_appendId(_selectors.tutorialMenu, menuId))
	const slider = document.getElementById(_appendId(_selectors.sliderMenu, menuId))
	const style = getComputedStyle(slider)
	const heightStr = style.getPropertyValue('height')
	const height = calculateNewHeight(heightStr)
	menu.setAttribute('style', `margin-bottom: ${height}px;`)
}

async function _insertMenu(menuId) {
	if (_browserSupportsTemplates()) {
		let adjustHeight = false
		if (!_hasMenuTemplate()) {
			await _appendMenuTemplate()
		} else {
			adjustHeight = true
		}
		// get template and template parent
		const template = document.getElementById(_selectors.menuTemplate)
		const parent = document.getElementById(_selectors.menuParent)
		// clone template
		const clone = template.content.cloneNode(true)
		// set menu ids
		setMenuIds(menuId, clone)
		// append
		parent.appendChild(clone)
		// adjust menu style if necessary
		if (adjustHeight) {
			_adjustMenuStyle(menuId)
		}
	} else {
		return false
	}
}

function _hasMenuItemTemplate() {
	if (document.getElementById(_selectors.menuItemTemplate)) {
		return true
	}
	return false
}

async function _appendMenuItemTemplate() {
	// fetch template
	const menuItemTemplate = (await (await fetch('/templates/menu-item.html')).text())
	// create contextual fragment
	const range = document.createRange()
	const menuItemFrag = range.createContextualFragment(menuItemTemplate)
	// append template to shadow dom
	document.body.appendChild(menuItemFrag)
}

function _populateMenuItem(item, itemId, itemText, checkboxId) {
	// set menu item id
	item.children[0].setAttribute('id', itemId)
	// set menu item span text
	item.children[0].children[0].textContent = itemText
	// set checkbox attributes
	const checkbox = item.children[0].querySelectorAll(_selectors.toggles)[0]
	checkbox.setAttribute('id', checkboxId)
	checkbox.setAttribute('name', checkboxId)
}

async function _appendMenuItem(itemId, itemText, checkboxId, callback, menuId, cvs) {
	if (!_hasMenuItemTemplate()) {
		await _appendMenuItemTemplate()
	}
	// get template and menu items parent
	const template = document.getElementById(_selectors.menuItemTemplate)
	const parent = document.getElementById(_appendId(_selectors.menuItemParent, menuId))
	// clone template
	const clone = template.content.cloneNode(true)
	// populate menu item
	_populateMenuItem(clone, itemId, itemText, checkboxId)
	// add click event
	_addMenuItemClickHandler(clone, callback, cvs)
	// append
	parent.appendChild(clone)
}

function _initElems(menuId, elems) {
	elems.slider = document.getElementById(_appendId(_selectors.slider, menuId))
	elems.menu = document.getElementById(_appendId(_selectors.menuContent, menuId))
	elems.menuHeader = document.getElementById(_appendId(_selectors.menuHeader, menuId))
}

function _enableAll(enabled, menuId) {
	// get all toggle elements
	const parent = document.getElementById(`${_selectors.menuItemParent}-${menuId}`)
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
		cvs: undefined,

		status: {
			isHidden: true
		},

		elems: {
			slider: undefined,
			menu: undefined,
			menuHeader: undefined
		},

		enableAll: function (enabled) {
			_enableAll(enabled, this.id)
		},

		addMenuItem: async function (itemId, itemText, checkboxId, callback) {
			await _appendMenuItem(itemId, itemText, checkboxId, callback, this.id, this.cvs)
		},

		init: async function (cvs) {
			this.cvs = cvs
			await _insertMenu(this.id)
			_initElems(this.id, this.elems)
			_createMenuEvents(this.elems, this.status)
		}
	}
	return menuObj
}

export default menu