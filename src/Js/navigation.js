const $ = document

const navBtn = $.querySelector('#nav')
const navContainer = $.querySelector('#navigation-container')
const navigation = $.querySelector('#navigation')
const navCaretIcon = $.querySelector('#caretIcon')
const wishlistIcon = $.querySelector('#wishlist-icon')

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

	if (screenWidth <= 640) {
		if (!isNavOpen) {
			openNavigationMobile()
		} else {
			closeNavigationMobile()
		}
	}
}

// Open navigation for desktop
const openNavigationDesktop = () => {
	navigation.style.width = '100%'
	navigation.style.padding = '2.5rem 10px 0 0'
	navigation.style.alignItems = 'end'

	navContainer.style.width = '12rem'
	navContainer.style.margin = '0 3rem'

	navCaretIcon.style.transform = 'rotate(180deg)'

	isNavOpen = true
}

// Close navigation for desktop
const closeNavigationDesktop = () => {
	navigation.style.cssText = ''
	navContainer.style.cssText = ''

	navCaretIcon.style.transform = 'rotate(0deg)'
	isNavOpen = false
}

// Open navigation for mobile
const openNavigationMobile = () => {
	navigation.style.alignItems = 'end'

	navContainer.style.height = '10rem'
	navContainer.style.bottom = '0'
	navContainer.style.alignItems = 'end'

	navCaretIcon.style.transform = 'rotate(270deg)'
	wishlistIcon.style.marginBottom = '2rem'

	isNavOpen = true
}

// Close navigation for mobile
const closeNavigationMobile = () => {
	navigation.style.cssText = ''
	navContainer.style.cssText = ''

	wishlistIcon.style.marginBottom = '0'

	navCaretIcon.style.transform = 'rotate(90deg)'
	isNavOpen = false
}

navBtn.addEventListener('click', toggleNavigation)

window.addEventListener('resize', () => {
	isNavOpen = false
	navigation.style.cssText = ''
	navContainer.style.cssText = ''
})
