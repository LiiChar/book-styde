import React, { Suspense } from 'react';
import { Search } from './Header/Search';
import { Link } from '../common/Link';
import { ThemeChange } from './Header/ThemeChange';
import { Separator } from '../ui/separator';
import { Avatar } from './Header/Avatar';
import { AlertDialogVerify } from '../common/modal/AlertDialogVerify';
import { DialogKeyword } from '../common/modal/DialogKeyword';
import { DialogRegister } from '../common/modal/DialogRegister';
import Image from 'next/image';
import OwlSvg from '@/assets/icon/owl.svg';
import { Owl } from '../common/svg/Owl';

export const Header = () => {
	return (
		<header className='header	 h-12 z-50 sticky top-0 flex justify-between items-center px-2 overflow-y-visible'>
			<h2 className='text-2xl w-1/3 flex justify-start items-center space-x-4 '>
				<ThemeChange />
				<Separator className='w-2 h-full' orientation='vertical' />
				<Link
					className='w-[30px] h-[30px]'
					path='/'
					title={
						<Owl
							height={30}
							wight={30}
							className='fill-foreground hover:fill-primary hover:stroke-primary stroke-foreground'
						/>
					}
				/>
			</h2>
			<div className='w-1/3 flex justify-center items-center '>
				<Suspense>
					<Avatar />
				</Suspense>
			</div>
			<div className='w-1/3 flex h-full justify-end items-center'>
				<Search />
			</div>
		</header>
	);
};
