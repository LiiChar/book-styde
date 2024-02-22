'use client';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/store/ThemeStore';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

export const ThemeChange = () => {
	const { isLight, setTheme } = useThemeStore();

	return (
		<Button
			onClick={() => setTheme(isLight ? 'dark' : 'light')}
			className=' bg-background'
		>
			{isLight ? <Sun /> : <Moon />}
		</Button>
	);
};
