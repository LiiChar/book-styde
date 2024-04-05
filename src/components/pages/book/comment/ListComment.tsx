'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Comment, PrismaClient, User } from '@prisma/client';
import { FC, memo, useEffect, useState } from 'react';
import { ThumbsComment } from './ThumbsComment';
import { io, Manager } from 'socket.io-client';
import Pusher from 'pusher-js';
import { getTimeAgo } from '@/utils/time';

export const ListComment = ({
	comments: cms,
	chapter_id,
}: {
	comments: (Comment & { user: User })[];
	chapter_id: number;
}) => {
	const [comments, setComments] = useState(cms);

	useEffect(() => {
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
			cluster: 'eu',
		});

		const channel = pusher.subscribe(`chapter-${chapter_id}`);

		channel.bind('new_comment', (data: any) => {
			setComments(data.comment);
		});

		return () => {
			pusher.unsubscribe('chat');
		};
	}, []);
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
							<div className='hidden md:block text-sm'>
								{getTimeAgo(com.created_at)}
							</div>
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
