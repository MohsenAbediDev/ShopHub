/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./**/*.{html,js}'],
	darkMode: 'class',
	theme: {
		screens: {
			sm: { max: '640px' },
			md: { max: '768px' },
			lg: { max: '1024px' },
			xl: { max: '1280px' },
			'2xl': { min: '1480px' },
		},
		extend: {
			fontFamily: {
				almarai: 'almarai',
			},
			boxShadow: {
				md: '5px 5px 20px rgba(181,181,181,0.2)',
				xl: '5px 5px 20px rgba(133,133,133,0.2)',
			},
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				sm: '480px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xls': '1480px',
			},
		},
		colors: {
			secondary: '#393939',
			white: '#ffffff',
			gray: 'rgba(164,164,164,0.3)',
			green: '#7FD287',
			red: '#E86F6F',
			dark: '#212121',
			darkGray: '#424242',
			darkBrown: '#AA7646',
			black: '#000',
			lightBrown: '#D98B53',
			blue: '#4DAAFF',
			stroke: 'rgba(190,190,190,0.5)',
			icon: '#585858'
		},
	},
	plugins: [],
}
