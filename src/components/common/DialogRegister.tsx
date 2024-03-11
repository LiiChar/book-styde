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
import { useDialogStore } from '@/store/DialogStore';
import { useUserStore } from '@/store/UserStore';
import { useState } from 'react';
import { getCookie } from 'cookies-next';

export function DialogRegister() {
	const { question, username, setUser } = useUserStore();
	const [keyword, setKeyword] = useState('');
	const [name, setName] = useState('');
	const { toggleDialog, closeDialog } = useDialogStore();

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
					<DialogTitle>Подтвердите аккаунт</DialogTitle>
					<DialogDescription>{question}</DialogDescription>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<Label htmlFor='link' className='sr-only'>
							Ваше имя
						</Label>
						<Input
							id='link'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</div>
				</div>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<Label htmlFor='link' className='sr-only'>
							Ключевое слово
						</Label>
						<Input
							id='link'
							value={keyword}
							onChange={e => setKeyword(e.target.value)}
						/>
					</div>
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
