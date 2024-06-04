'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCookie } from 'cookies-next';
import React, { FC, memo, useRef, useState } from 'react';
import { storeComment } from '@/request/comment';
import { io, Manager } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import pusherJs from 'pusher-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFetch } from '@/hooks/useFetch';
import { ButtonLoader } from '@/components/common/ButtonLoader';

interface Props {
	chapter_id: number;
}

export const InputComment: FC<Props> = ({ chapter_id }) => {
	const user = getCookie('user') ? JSON.parse(getCookie('user')!) : null;
	const [isFocus, setFocus] = useState(false);
	const { loading, action } = useFetch<void>({
		promise: () => handleSendComment(),
	});
	const editableDiv = useRef<HTMLDivElement>(null);
	const { refresh } = useRouter();
	const handleSendComment = async () => {
		await storeComment({
			comment: {
				user_id: user!.id,
				content: editableDiv.current!.innerText,
			},
			chapter_id,
		});

		const pusher = new pusherJs(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
			cluster: 'eu',
		});

		const channel = pusher.subscribe(`chapter-${chapter_id}`);

		channel.emit('new_comment');

		pusher.unsubscribe('chat');
		handleReject();
	};

	const handleReject = () => {
		setFocus(false);
		editableDiv.current!.innerText = 'Введите комментарий';
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
				<div className='flex w-full gap-2 mb-4'>
					<Avatar>
						<AvatarImage
							src={`https://ui-avatars.com/api/?name=${user.name}`}
						/>
						<AvatarFallback>{user.name}</AvatarFallback>
					</Avatar>
					<div
						className='w-full'
						onFocus={() => {
							if (!isFocus) editableDiv.current!.innerText = '';
							setFocus(true);
						}}
					>
						<div
							id='comment'
							contentEditable={true}
							className={`w-full text-sm h-min resize border-0 border-b-2  p-0 min-h-6  outline-none focus-visible:ring-0  rounded-none ${
								!isFocus
									? 'border-foreground text-muted-foreground resize-none h-[25px]'
									: 'border-primary'
							}`}
							ref={editableDiv}
						></div>

						{isFocus && (
							<div className='flex mt-2 justify-end items-center gap-1'>
								<Button variant={'destructive'} onClick={handleReject}>
									Отмена
								</Button>
								<ButtonLoader
									loading={loading}
									variant={'secondary'}
									onClick={action}
								>
									Оставить комментарий
								</ButtonLoader>
								{/* TODO - Добавить возможность пикать стткеры, библиотека  */}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};
