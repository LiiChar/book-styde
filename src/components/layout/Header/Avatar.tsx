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

export const Avatar = () => {
	const { image, username, id, setUser, setQuestion } = useUserStore();
	const { has } = useSearchParams();

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

		if (!has('verify')) openDialog('verify');
	}, []);

	const handleRegisterButton = () => {
		console.log('reg');

		openDialog('register');
	};

	const component = useHidration(
		<>
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
		</>,
		null
	);

	return component;
};
