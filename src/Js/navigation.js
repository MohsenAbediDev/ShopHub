const navBtn = document.querySelector('#nav')
const navContainer = document.querySelector('#navigation-container')
const navigation = document.querySelector('#navigation')
const navCaretIcon = document.querySelector('#caretIcon')
const wishlistIcon = document.querySelector('#wishlist-icon')
const iconLabels = document.querySelectorAll('#navigation span[id$="-label"]')

let isNavOpen = false

const toggleNavigation = () => {
	const screenWidth = window.innerWidth

	if (screenWidth >= 640) {
		if (!isNavOpen) {
			openNavigationDesktop()
			showLabels()
		} else {
			closeNavigationDesktop()
			hideLabels()
		}
	}

	if (screenWidth <= 640) {
		if (!isNavOpen) {
			openNavigationMobile()
			showLabels()
		} else {
			closeNavigationMobile()
			hideLabels()
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

// Show menu labels
const showLabels = () => {
	iconLabels.forEach((label) => {
		label.style.opacity = '1'
		label.style.transition = 'opacity 0.3s'
		label.classList.remove('hidden')
	})
}

// Hide menu labels
const hideLabels = () => {
	iconLabels.forEach((label) => {
		label.style.opacity = '0'
		label.style.transition = 'opacity 0.3s'
		label.classList.add('hidden')
	})
}

navBtn.addEventListener('click', toggleNavigation)

window.addEventListener('resize', () => {
	isNavOpen = false
	navigation.style.cssText = ''
	navContainer.style.cssText = ''
})
