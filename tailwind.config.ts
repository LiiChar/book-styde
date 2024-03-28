import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'show-from-right': {
					from: {
						'margin-left': '100%',
						width: '300%',
					},
					to: {
						'margin-left': '0%',
						width: '100%',
					},
				},
				'show-from-left': {
					from: {
						'margin-right': '0%',
						width: '100%',
					},
					to: {
						'margin-right': '100%',
						width: '300%',
					},
				},
				'hide-to-right': {
					from: {
						'margin-left': '100%',
						width: '300%',
						display: 'block',
						opacity: '100%',
					},
					to: {
						'margin-left': '0%',
						width: '100%',
						display: 'none',
						opacity: '0%',
					},
				},
				'hide-to-left': {
					from: {
						'margin-right': '0%',
						width: '100%',
						visibility: 'visible',
						opacity: '100%',
					},
					to: {
						'margin-right': '100%',
						width: '300%',
						visibility: 'hidden',
						opacity: '0%',
					},
				},
				dropdawn: {
					from: {
						height: '0px',
						'background-color': 'hsl(var(--background))',
					},
					to: {
						height: '100%',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'show-r': '1500ms show-from-right',
				'show-l': '1500ms show-from-left',
				'hide-r': '1500ms hide-to-right',
				'hide-l': '1500ms hide-to-left',
				dropdawn: '300ms dropdawn',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
