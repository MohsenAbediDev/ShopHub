const $ = document

const html = $.querySelector('.html')
const themeIcon = $.querySelector('#theme')
const cartIcon = $.querySelector('#cartIcon')
const caretIcon = $.querySelector('#caretIcon')
const homeIcon = $.querySelector('#homeIcon')

let isDarkTheme = false

// Function to toggle the theme
function toggleTheme() {
	isDarkTheme = !isDarkTheme
	localStorage.setItem('isDarkTheme', isDarkTheme)
	changeTheme()
}

// Function to apply the theme based on the local storage value
function changeTheme() {
	const isHomePage =
		location.pathname.includes('ShopHub') ||
		location.pathname.includes('index') ||
		location.pathname === '/'

	// Use JSON.parse to convert the stored value to a boolean
	isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme'))
	// Check the actual value and update classList
	isDarkTheme ? html.classList.add('dark') : html.classList.remove('dark')

	// Change Icon Color
	isDarkTheme
		? themeIcon.setAttribute('src', './public/icons/Soild/moon.svg')
		: themeIcon.setAttribute('src', './public/icons/Soild/sun.svg')

	if (isHomePage) {
		isDarkTheme
			? cartIcon.setAttribute(
					'src',
					'./public/icons/Soild/shopping-cart-light.svg'
			  )
			: cartIcon.setAttribute(
					'src',
					'./public/icons/Soild/shopping-cart-dark.svg'
			  )
	}

	if (!isHomePage) {
		isDarkTheme
			? homeIcon.setAttribute('src', './public/icons/Soild/home-light.svg')
			: homeIcon.setAttribute('src', './public/icons/Soild/home-dark.svg')
	}

	isDarkTheme
		? caretIcon.setAttribute('src', './public/icons/Soild/Caret-left-light.svg')
		: caretIcon.setAttribute('src', './public/icons/Soild/Caret-left.svg')
}

function changeAngleIcon() {
	const browserWidth = window.innerWidth

	browserWidth <= 500
		? (caretIcon.style.transform = 'rotate(90deg)')
		: (caretIcon.style.transform = 'rotate(0deg)')
}

// Event listener for theme toggle
themeIcon.addEventListener('click', toggleTheme)

// Event listener for window load to initially set the theme
window.addEventListener('load', changeTheme)

// Event listener for browser size to change caret angle
window.addEventListener('resize', changeAngleIcon)
changeAngleIcon()
