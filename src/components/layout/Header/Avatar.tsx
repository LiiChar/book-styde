'use client';
import {
	Avatar as Ava,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar';
import useHidration from '@/hooks/useHidration';
import { UserStore, useUserStore } from '@/store/UserStore';
import { useEffect, useState } from 'react';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { getUserQuestion } from '@/request/user';
import { Button } from '@/components/ui/button';
import { register } from 'module';
import { openDialog } from '@/lib/dialogs';
import { useSearchParams } from 'next/navigation';
import { cookies } from 'next/headers';
import { User } from '@/api/entity/user.entity';
import { Link } from '@/components/common/Link';
import { DialogRegister } from '@/components/common/modal/DialogRegister';
import { AlertDialogVerify } from '@/components/common/modal/AlertDialogVerify';
// import Link from 'next/link';

export const Avatar = () => {
	// const { has } = useSearchParams();
	// const user = cookies().get('user') as User | undefined;
	const [openVerify, setOpenVerify] = useState(false);
	const [openKeyword, setOpenKeyword] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const user = null;

	// useEffect(() => {
	// 	const userStorage = localStorage.getItem('user_name');
	// 	const userCook = getCookie('user');

	// 	if (userCook) {
	// 		const user = JSON.parse(userCook) as UserStore;
	// 		localStorage.setItem('user_name', user.username);
	// 		setUser(user);
	// 		return;
	// 	}

	// 	if (userStorage) {
	// 		const user = JSON.parse(userStorage);
	// 		getUserQuestion(user).then(data => {
	// 			setQuestion(data);
	// 			openDialog('keyword');
	// 		});
	// 		return;
	// 	}

	// 	if (has('verify')) openDialog('verify');
	// }, []);

	const handleRegisterButton = () => {
		console.log('reg');

		openDialog('register');
	};

	return (
		<>
			{user != undefined ? (
				// <a href={`/profile/${user.id}`}>
				// 	<Ava>
				// 		<AvatarImage
				// 			src={`https://ui-avatars.com/api/?name=${user.name}`}
				// 		/>
				// 		<AvatarFallback>{user.name}</AvatarFallback>
				// 	</Ava>
				// </a>
				'ehj'
			) : (
				// <Link href={'?register=yes'}>зарегестрироваться</Link>
				<>
					<Button
						type='button'
						variant='ghost'
						onClick={() => setOpenRegister(true)}
					>
						Зарегестрироваться
					</Button>
					{/* <Link path='?register=yes' title='зарегестрироваться' /> */}
				</>
			)}
			{openRegister && (
				<DialogRegister onClose={() => setOpenRegister(false)} />
			)}
			{openVerify && <AlertDialogVerify onClose={() => setOpenVerify(false)} />}

			{openKeyword && <DialogRegister onClose={() => setOpenKeyword(false)} />}
		</>
	);
};
