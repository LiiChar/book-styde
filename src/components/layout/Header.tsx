import React from 'react';
import { Search } from './Header/Search';
import { Link } from '../common/Link';
import { ThemeChange } from './Header/ThemeChange';
import { Separator } from '../ui/separator';
import { Avatar } from './Header/Avatar';
import { AlertDialogVerify } from '../common/modal/AlertDialogVerify';
import { DialogKeyword } from '../common/modal/DialogKeyword';
import { DialogRegister } from '../common/modal/DialogRegister';

export const Header = () => {
	return (
		<header className='header	 h-12 z-50 sticky top-0 flex justify-between items-center px-2 overflow-y-visible'>
			<h2 className='text-2xl flex justify-center items-center space-x-4 '>
				<ThemeChange />
				<Separator className='w-2' orientation='vertical' />
				<Link className='w-min h-min' path='/' title='Учебник' />
			</h2>
			<Avatar />
			<Search />
		</header>
	);
};
