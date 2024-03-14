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
import { DialogKeyword } from '@/components/common/DialogKeyword';
import { getUserQuestion } from '@/request/user';
import { AlertDialogRegister } from '@/components/common/AlertDialogVerify';
import { DialogProvider, useDialogStore } from '@/store/DialogStore';
import { Button } from '@/components/ui/button';
import { register } from 'module';

export const Avatar = () => {
	const { image, username, id, setUser, setQuestion } = useUserStore();
	const { dialog, toggleDialog, openDialog } = useDialogStore();

	useEffect(() => {
		const userStorage = localStorage.getItem('user_name');
		const userCook = getCookie('user');

		if (userCook) {
			const user = JSON.parse(userCook) as UserStore;
			localStorage.setItem('user_name', user.username);
			setUser(user);
			return;
		}

		if (userStorage) {
			const user = JSON.parse(userStorage);
			getUserQuestion(user).then(data => {
				setQuestion(data);
				openDialog('keyword');
			});
			return;
		}

		openDialog('verify');
	}, []);

	const handleRegisterButton = () => {
		console.log('register');

		openDialog('register');
	};

	const component = useHidration(
		<>
			<DialogProvider>
				{username ? (
					<a href={`/profile/${id}`}>
						<Ava>
							<AvatarImage src={image} />
							<AvatarFallback>{username}</AvatarFallback>
						</Ava>
					</a>
				) : (
					<Button onClick={handleRegisterButton}>зарегестрироваться</Button>
				)}
			</DialogProvider>
		</>,
		null
	);

	return component;
};
