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

export const Avatar = memo(() => {
	const { has } = useSearchParams();
	const [user, setUser] = useState<User | undefined | null>(
		getCookie('user') ? JSON.parse(getCookie('user')!) : null
	);

	const [openVerify, setOpenVerify] = useState(false);
	const [openKeyword, setOpenKeyword] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

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
				<DialogRegister onClose={() => setOpenRegister(false)} />
			)}
			{((getCookie('verify') && user) || openVerify) && (
				<AlertDialogVerify onClose={() => setOpenVerify(false)} />
			)}

			{openKeyword && <DialogRegister onClose={() => setOpenKeyword(false)} />}
		</>
	);
});
