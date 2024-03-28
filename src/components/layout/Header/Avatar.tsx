'use client';
import {
	Avatar as Ava,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar';
import { memo, useEffect, useMemo, useState } from 'react';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { DialogRegister } from '@/components/common/modal/DialogRegister';
import { AlertDialogVerify } from '@/components/common/modal/AlertDialogVerify';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from '@/types/User';
import { useRouter } from 'next/navigation';

const Avatar = memo(() => {
	const param = useSearchParams();
	const [user, setUser] = useState<User | undefined | null>(
		getCookie('user') ? JSON.parse(getCookie('user')!) : null
	);
	const router = useRouter();

	const [openVerify, setOpenVerify] = useState(false);
	const [openKeyword, setOpenKeyword] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	useEffect(() => {
		if (param.has('verify') && param.get('verify') == 'true') {
			setOpenVerify(true);
		}
		if (param.has('register') && param.get('register') == 'true') {
			setOpenRegister(true);
		}
	}, []);

	const handleSetUser = (user: User) => {
		// setUser(user);
		router.refresh();
	};

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
				<Button
					type='button'
					variant='ghost'
					onClick={() => setOpenRegister(true)}
				>
					Зарегестрироваться
				</Button>
			) : (
				<Skeleton className='rounded-[50%] w-[35px] h-[35px]' />
			)}

			{openRegister && (
				<DialogRegister
					onClose={() => setOpenRegister(false)}
					setUser={handleSetUser}
				/>
			)}
			{(!getCookie('user') || openVerify) && (
				<AlertDialogVerify
					onOk={() => setOpenRegister(true)}
					onClose={() => setOpenVerify(false)}
				/>
			)}
		</>
	);
});

Avatar.displayName = 'HeaderAvatar';

export { Avatar };
