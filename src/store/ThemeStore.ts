'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStore {
	theme: Theme;
	isLight: boolean;
	setTheme: (theme: Theme) => void;
}

const defaultDark = (): Theme => {
	const theme = { theme: 'dark' };
	// const theme = JSON.parse(localStorage.getItem('theme') ?? '');

	const body = document.querySelector('body')!;

	if (theme.theme == 'dark') {
		body.classList.add('dark');
	} else {
		body.classList.remove('dark');
	}

	return 'dark';
};

export const useThemeStore = create<ThemeStore>()(
	persist(
		set => ({
			theme: defaultDark(),
			isLight: false,
			setTheme: theme =>
				set(() => {
					const body = document.querySelector('body')!;

					if (theme == 'dark') {
						body.classList.add('dark');
					} else {
						body.classList.remove('dark');
					}

					return { theme, isLight: theme === 'light' };
				}),
		}),
		{
			name: 'theme',
		}
	)
);
