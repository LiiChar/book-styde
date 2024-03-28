'use client';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import React, { memo } from 'react';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { setTheme, getTheme } from '@/lib/theme';

const ThemeChange = memo(() => {
	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<Button
					onClick={() => setTheme(getTheme() == 'light' ? 'dark' : 'light')}
					className='w-[37px] bg-background rounded-[50%]'
				>
					<Sun className='scale-[2.5]' />
				</Button>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>
					<Button
						onClick={() => setTheme('blue')}
						className='text-foreground hover:text-background bg-background w-full h-full '
					>
						Синий
					</Button>
				</ContextMenuItem>
				<ContextMenuItem>
					<Button
						onClick={() => setTheme('green')}
						className='text-foreground hover:text-background bg-background w-full h-full '
					>
						Зелёный
					</Button>
				</ContextMenuItem>
				<ContextMenuItem>
					<Button
						onClick={() => setTheme('orange')}
						className='text-foreground hover:text-background bg-background w-full h-full '
					>
						Оранжевый
					</Button>
				</ContextMenuItem>
				<ContextMenuItem>
					<Button
						onClick={() => setTheme('rose')}
						className='text-foreground hover:text-background bg-background w-full h-full '
					>
						Розовый
					</Button>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
});

ThemeChange.displayName = 'ThemeChange';

export { ThemeChange };
