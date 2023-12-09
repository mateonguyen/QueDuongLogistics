module.exports = {
	content: [
		"./src/**/*.{html,ts}"
	],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
	colors: {
		transparent: 'transparent',
      	black: '#000',
      	white: '#fff',

		primary: '#198754',
		tertiary: '#e6e9f0',
		textDarkest: '#172b4d',
		textDark: '#42526E',
		textMedium: '#5E6C84',
		textLight: '#8993a4',
		textLink: '#0052cc',
		textLogo: '#DEEBFF',

		backgroundDarkPrimary: '#0747A6',
      	backgroundMedium: '#dfe1e6',
      	backgroundLight: '#ebecf0',
      	backgroundLightest: '#F4F5F7',
      	backgroundLightPrimary: '#D2E5FE',
      	backgroundLightSuccess: '#E4FCEF',

      	borderLightest: '#dfe1e6',
      	borderLight: '#C1C7D0',
      	borderInputFocus: '#4c9aff'
	},
	fontSize: {
		xs: '0.75rem',
		13: '0.8125rem',
		sm: '0.875rem',
		15: '0.9375rem',
		base: '1rem',
		lg: '1.125rem',
		xl: '1.25rem',
		btn: '13px',
		'2xl': '1.5rem',
		'3xl': '1.875rem',
		'4xl': '2.25rem',
		'5xl': '3rem',
		'6xl': '4rem'
	},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
