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
import { UserStore, useUserStore } from '@/store/UserStore';
import { useEffect, useMemo, useState } from 'react';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { closeDialog } from '@/lib/dialogs';
import { getRandomQuestion } from '@/lib/utils';

export function DialogRegister({ onClose }: { onClose: () => void }) {
	const { question, username, setUser } = useUserStore();
	const [keyword, setKeyword] = useState('');
	const [name, setName] = useState('');
	const { back } = useRouter();
	const { has, get } = useSearchParams();
	const [open, setOpen] = useState(false);
	const questionNew = useMemo(() => {
		return getRandomQuestion();
	}, []);

	const handleRegister = async () => {
		const response: { type: string; data: string } = await register({
			name,
			question: questionNew,
			key_word: keyword,
			is_verify: true,
			readable_page: [],
		});
		if (response.type == 'successfully') {
			const user = JSON.parse(getCookie('user')!);

			const userer: UserStore = {
				...user,
				username: user.name,
				image: '',
			};

			localStorage.setItem('user_name', user.name);
			setUser(userer);
			onClose();
			return;
		}
	};

	return (
		<Dialog defaultOpen={true} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Зарегестрируйте аккаунт</DialogTitle>
				</DialogHeader>
				<div className=''>
					<Label htmlFor='link1'>Ваше имя</Label>
					<Input
						id='link1'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className=''>
					<Label htmlFor='link2'>
						Ответьте на вопрос: <br />
						{questionNew}
					</Label>
					<Input
						id='link2'
						value={keyword}
						onChange={e => setKeyword(e.target.value)}
					/>
				</div>
				<DialogFooter className='sm:justify-between justify-start flex  gap-2'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Отмена
						</Button>
					</DialogClose>
					<Button onClick={handleRegister}>зарегестрироваться</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
