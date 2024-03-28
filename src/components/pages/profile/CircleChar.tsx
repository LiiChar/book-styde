import { HTMLProps } from 'react';

type Props = {
	resolve: number;
	className?: HTMLProps<HTMLOrSVGElement>['className'];
};

export const CircleChar = ({ resolve, className }: Props) => {
	return (
		<svg
			version='1.1'
			baseProfile='full'
			viewBox='0 0 100 100'
			stroke-linecap='round'
			className={`${className} origin-center -rotate-90 transform`}
		>
			<circle
				fill='none'
				cx='50px'
				cy='50px'
				r='46'
				stroke-width='2'
				stroke-linecap='round'
				stroke='currentColor'
				className='text-gray-4 text-background dark:text-dark-gray-4 w-[100px]'
			></circle>
			<circle
				fill='none'
				cx='50px'
				cy='50px'
				r='46'
				stroke-width='5'
				stroke-linecap='round'
				stroke='currentColor'
				className='cursor-pointer text-primary  dark:text-dark-brand-orange drop-shadow-[0_2px_4px_rgba(255,161,22,0.2)]'
				stroke-dasharray={`${resolve} 285.5701629819676`}
				stroke-dashoffset='0'
				data-difficulty='ALL'
			></circle>
		</svg>
	);
};
