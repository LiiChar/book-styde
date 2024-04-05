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

export const Header = () => {
	return (
		<header className='header	bg-background/50 h-12 z-50 sticky top-0 flex justify-between items-center px-2 overflow-y-visible'>
			<h2 className='text-2xl w-1/3 flex justify-start items-center space-x-4 '>
				<ThemeChange />
				<Separator className='w-2' orientation='vertical' />
				<Link
					className='w-min h-min'
					path='/'
					title={
						<Image
							priority
							src={'../../assets/icon/owl.svg'}
							width={48}
							height={48}
							alt='Учебник'
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
