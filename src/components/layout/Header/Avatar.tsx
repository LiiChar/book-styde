'use client';
import {
	Avatar as Ava,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar';
import { useEffect, useMemo, useState } from 'react';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { Button } from '@/components/ui/button';
import { openDialog } from '@/lib/dialogs';
import { useSearchParams } from 'next/navigation';
import { DialogRegister } from '@/components/common/modal/DialogRegister';
import { AlertDialogVerify } from '@/components/common/modal/AlertDialogVerify';
import { getUser } from '@/request/user';
import useHidration from '@/hooks/useHidration';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from '@/types/User';

export const Avatar = () => {
	const { has } = useSearchParams();
	const [user, setUser] = useState<User | undefined | null>(
		getCookie('user') ? JSON.parse(getCookie('user')!) : null
	);

	const [openVerify, setOpenVerify] = useState(false);
	const [openKeyword, setOpenKeyword] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	useEffect(() => {
		if (user == undefined) {
			if (!getCookie('verify')) {
				setCookie('verify', false, {
					maxAge: 60 * 60 * 10,
				});

				setOpenVerify(true);
			}
		}
	}, []);

	console.log(user);

	return (
		<>
			{user ? (
				<a href={`/profile/${user.id}`}>
					<Ava>
						<AvatarImage
							src={`https://ui-avatars.com/api/?name=${user.name}`}
						/>
						<AvatarFallback>{user.name}</AvatarFallback>
					</Ava>
				</a>
			) : user == null ? (
				<Skeleton className='rounded-[50%] w-[35px] h-[35px]' />
			) : (
				<Button
					type='button'
					variant='ghost'
					onClick={() => setOpenRegister(true)}
				>
					Зарегестрироваться
				</Button>
			)}

			{openRegister && (
				<DialogRegister onClose={() => setOpenRegister(false)} />
			)}
			{openVerify && <AlertDialogVerify onClose={() => setOpenVerify(false)} />}

			{openKeyword && <DialogRegister onClose={() => setOpenKeyword(false)} />}
		</>
	);
};
