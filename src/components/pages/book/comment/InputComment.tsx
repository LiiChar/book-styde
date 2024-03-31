'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCookie } from 'cookies-next';
import React, { FC, memo, useState } from 'react';
import { storeComment } from '@/request/comment';
import { io, Manager } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import pusherJs from 'pusher-js';

interface Props {
	chapter_id: number;
}

export const InputComment: FC<Props> = ({ chapter_id }) => {
	const user = getCookie('user') ? JSON.parse(getCookie('user')!) : null;
	const [comment, setComment] = useState('');
	const { refresh } = useRouter();
	const handleSendComment = async () => {
		const commentFetch = await storeComment({
			comment: {
				user_id: user!.id,
				content: comment,
			},
			chapter_id,
		});

		// refresh();

		const pusher = new pusherJs(process.env.NEXT_PUSHER_PUBLIC_KEY!, {
			cluster: 'eu',
		});

		const channel = pusher.subscribe(`chapter-${chapter_id}`);

		channel.emit('new_comment');

		return () => {
			pusher.unsubscribe('chat');
		};
		setComment('');
	};

	const waitForOpenConnection = (socket: WebSocket) => {
		return new Promise((resolve, reject) => {
			const maxNumberOfAttempts = 10;
			const intervalTime = 200;

			let currentAttempt = 0;
			const interval = setInterval(() => {
				if (currentAttempt > maxNumberOfAttempts - 1) {
					clearInterval(interval);
					reject(new Error('Maximum number of attempts exceeded'));
				} else if (socket.readyState === socket.OPEN) {
					clearInterval(interval);
					resolve('');
				}
				currentAttempt++;
			}, intervalTime);
		});
	};

	const sendMessage = async (socket: WebSocket, msg: string) => {
		if (socket.readyState !== socket.OPEN) {
			try {
				await waitForOpenConnection(socket);
				socket.send(msg);
			} catch (err) {
				console.error(err);
			}
		} else {
			socket.send(msg);
		}
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
};
