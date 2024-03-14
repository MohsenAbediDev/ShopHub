const $ = document

const html = $.querySelector('.html')
const themeIcon = $.querySelector('#theme')
const cartIcon = $.querySelector('#cartIcon')
const caretIcon = $.querySelector('#caretIcon')

let isDarkTheme = false

// Function to toggle the theme
function toggleTheme() {
	isDarkTheme = !isDarkTheme
	localStorage.setItem('theme', isDarkTheme)
	changeTheme()
}

// Function to apply the theme based on the local storage value
function changeTheme() {
	// Use JSON.parse to convert the stored value to a boolean
	isDarkTheme = JSON.parse(localStorage.getItem('theme'))
	// Check the actual value and update classList
	isDarkTheme ? html.classList.add('dark') : html.classList.remove('dark')
	
	// Change Icon Color
	isDarkTheme
		? themeIcon.setAttribute('src', './public/icons/Soild/moon.svg')
		: themeIcon.setAttribute('src', './public/icons/Soild/sun.svg')
	
		isDarkTheme
		? cartIcon.setAttribute('src', './public/icons/Soild/shopping-cart-light.svg')
		: cartIcon.setAttribute('src', './public/icons/Soild/shopping-cart-dark.svg')
		
		isDarkTheme
		? caretIcon.setAttribute('src', './public/icons/Soild/Caret-left-light.svg')
		: caretIcon.setAttribute('src', './public/icons/Soild/Caret-left.svg')
}

function changeAngleIcon () {
	const browserWidth = window.innerWidth

	browserWidth <= 500 ? caretIcon.style.transform = 'rotate(90deg)' : caretIcon.style.transform = 'rotate(0deg)' 
}

// Event listener for theme toggle
themeIcon.addEventListener('click', toggleTheme)

// Event listener for window load to initially set the theme
window.addEventListener('load', changeTheme)

// Event listener for browser size to change caret angle
window.addEventListener('resize', changeAngleIcon)
changeAngleIcon()
