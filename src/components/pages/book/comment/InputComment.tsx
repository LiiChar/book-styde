'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCookie } from 'cookies-next';
import React, { FC, memo, useState } from 'react';
import { storeComment } from '@/request/comment';
import { revalidatePath } from 'next/cache';

interface Props {
	chapter_id: number;
}

export const InputComment: FC<Props> = memo(({ chapter_id }) => {
	const user = getCookie('user') ? JSON.parse(getCookie('user')!) : null;
	const [comment, setComment] = useState('');

	const handleSendComment = async () => {
		const commentFetch = await storeComment({
			comment: {
				user_id: user!.id,
				content: comment,
			},
			chapter_id,
		});
		// revalidatePath(
		// 	`http://localhost/api/comment?chapter_id=${commentFetch.chapter_id}`
		// );
		setComment('');
	};

	return (
		<>
			{user && (
				<div className='grid w-full gap-1.5 mb-4'>
					<Label className='text-xl' htmlFor='comment'>
						Ваш комментарий
					</Label>
					<Textarea
						id='comment'
						value={comment}
						placeholder='Введите ваш комментарий'
						className='min-h-10 max-h-44 h-auto'
						onChange={e => setComment(e.target.value)}
					/>
					<Button onClick={handleSendComment}>Написать комментарий</Button>
				</div>
			)}
		</>
	);
});
