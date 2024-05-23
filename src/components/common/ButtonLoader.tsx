'use client';

import { ReactNode } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { Loader } from 'lucide-react';

type ButtonLoaderProps = ButtonProps & {
	loading?: boolean;
	children?: ReactNode;
};

export const ButtonLoader = ({
	loading,
	children,
	...attr
}: ButtonLoaderProps) => {
	return (
		<Button {...attr}>
			{loading ? (
				<Loader className='scale-90 stroke-primary animate-spin-slow spin-in spin-out-180 z-[110]' />
			) : (
				children
			)}
		</Button>
	);
};
