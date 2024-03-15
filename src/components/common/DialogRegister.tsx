'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login, register } from '@/request/user';
import { useUserStore } from '@/store/UserStore';
import { useEffect, useMemo, useState } from 'react';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { closeDialog } from '@/lib/dialogs';
import { getRandomQuestion } from '@/lib/utils';

export function DialogRegister() {
	const { question, username, setUser } = useUserStore();
	const [keyword, setKeyword] = useState('');
	const [name, setName] = useState('');
	const {} = useRouter();
	const { has, get } = useSearchParams();
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const questionNew = useMemo(() => {
		return getRandomQuestion()
	}, []) 

	useEffect(() => {
		if (has('register') && get('register') == 'yes') {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [pathname]);

	const handleRegister = async () => {
		const response: { type: string; data: string } = await register({});
		if (response.type == 'succefully') {
			const user = JSON.parse(getCookie('user')!);
			localStorage.setItem('user_name', user.username);
			setUser(user);
			closeDialog('register');
			return;
		}
	};

	return (
		<Dialog defaultOpen={true}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Зарегестрируйте аккаунт</DialogTitle>
				</DialogHeader>
				<div className=''>
						<Label htmlFor='link1'>
							Ваше имя
						</Label>
						<Input
							id='link1'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
				</div>
				<div className=''>
						<Label htmlFor='link2'>
							Ответьте на вопрос: <br/>
							{questionNew}
						</Label>
						<Input
							id='link2'
							value={keyword}
							onChange={e => setKeyword(e.target.value)}
						/>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose onClick={() => closeDialog('register')} asChild>
						<Button onClick={handleRegister} type='button' variant='secondary'>
							Close
						</Button>
					</DialogClose>
					
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
