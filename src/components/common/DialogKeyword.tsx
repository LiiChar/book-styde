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
import { login } from '@/request/user';
import { useDialogStore } from '@/store/DialogStore';
import { useUserStore } from '@/store/UserStore';
import { useState } from 'react';

export function DialogKeyword() {
	const { question, username } = useUserStore();
	const [keyword, setKeyword] = useState('');
	const [visible, setVisible] = useState(true);
	const { closeDialog } = useDialogStore();

	const handleKeywork = async () => {
		const response: { type: string; data: string } = await login(
			username,
			keyword
		);
		if (response.type == 'succesfully') {
			closeDialog('keyword');
		}
	};

	return (
		<Dialog open={true}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Подтвердите аккаунт</DialogTitle>
					<DialogDescription>{question}</DialogDescription>
				</DialogHeader>
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
					<Button onClick={handleKeywork} size='sm' className='px-3'>
						<span className='sr-only'>Copy</span>
					</Button>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='secondary'>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
