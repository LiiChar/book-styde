'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Comment, PrismaClient, User } from '@prisma/client';
import { FC, memo, useEffect, useState } from 'react';
import { ThumbsComment } from './ThumbsComment';
import { io, Manager } from 'socket.io-client';

export const ListComment = ({
	comments: cms,
	chapter_id,
}: {
	comments: (Comment & { user: User })[];
	chapter_id: number;
}) => {
	const [comments, setComments] = useState(cms);

	useEffect(() => {
		socketInitializer();
	}, []);

	const socketInitializer = async () => {
		await fetch(`/api/socket/comment?chapter_id=${chapter_id}`);

		const socket = new WebSocket(
			'ws://localhost:' +
				(Number(process.env.NEXT_PUBLIC_WEBSOCKET_PORT) || 2020)
		);

		socket.addEventListener('message', ev => {
			console.log(ev.data);

			// const data = JSON.parse(ev.data);

			// if (data.type == 'new_comment') {
			// 	setComments(data.data);
			// }
		});

		socket.onopen = () => {};

		socket.onmessage = ev => {
			const data = JSON.parse(ev.data);
			console.log('aaa');

			if (data.type == 'new_comment') {
				setComments(data.data);
			}
		};
	};
	return (
		<div className='flex flex-col gap-4'>
			{comments.length > 0 ? (
				comments.map(com => (
					<div className='bg-accent p-2 rounded-sm' key={com.id}>
						<div className='flex md:justify-between mb-3 items-center'>
							<div className='flex w-full justify-between md:justify-normal md:gap-4 items-center'>
								<Avatar>
									<AvatarImage
										src={`https://ui-avatars.com/api/?name=${com.user.name}`}
									/>
									<AvatarFallback>{com.user.name}</AvatarFallback>
								</Avatar>

								{com.user.name}
							</div>
							{/* <div className='hidden md:block'>{com.created_at.getTime()}</div> */}
						</div>
						<div className='text-pretty break-words'>{com.content}</div>
						<Separator className='my-2 bg-background' />
						<ThumbsComment chapter_id={chapter_id} comment={com} />
					</div>
				))
			) : (
				<section>Нет комментариев</section>
			)}
		</div>
	);
};
