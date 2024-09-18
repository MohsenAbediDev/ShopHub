const $ = document

const navBtn = $.querySelector('#nav')
const navContainer = $.querySelector('#navigation-container')
const navigation = $.querySelector('#navigation')
const navCaretIcon = $.querySelector('#caretIcon')

let isNavOpen = false

const toggleNavigation = () => {
	const screenWidth = window.innerWidth

	if (screenWidth >= 640) {
		if (!isNavOpen) {
			openNavigationDesktop()
		} else {
			closeNavigationDesktop()
		}
	}
}

const openNavigationDesktop = () => {
	navigation.style.width = '100%'
	navigation.style.padding = '2.5rem 10px 0 0'
	navigation.style.alignItems = 'end'

	navContainer.style.width = '12rem'
	navContainer.style.margin = '0 3rem'

	navCaretIcon.style.transform = 'rotate(180deg)'

	isNavOpen = true
}

const closeNavigationDesktop = () => {
	navigation.style.cssText = ''
	navContainer.style.cssText = ''

	navCaretIcon.style.transform = 'rotate(0deg)'
	isNavOpen = false
}

navBtn.addEventListener('click', toggleNavigation)
