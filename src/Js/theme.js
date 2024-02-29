const $ = document

const html = $.querySelector('.html')
const themeIcon = $.querySelector('#theme')
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
}

// Event listener for theme toggle
themeIcon.addEventListener('click', toggleTheme)

// Event listener for window load to initially set the theme
window.addEventListener('load', changeTheme)
