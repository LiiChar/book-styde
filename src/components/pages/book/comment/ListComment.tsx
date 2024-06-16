'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { ThumbsComment } from './ThumbsComment';
import { io, Manager } from 'socket.io-client';
import Pusher from 'pusher-js';
import { getTimeAgo } from '@/lib/time';
import { hasCookie } from 'cookies-next';
import { CommentChapter } from '@/app/api/comment/route';
import { FeedbackComment } from './FeedbackComment';

export const ListComment = ({
	comments: cms,
	chapter_id,
}: {
	comments: CommentChapter[];
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
		<section className='flex flex-col gap-2 text-[14px]'>
			{comments.length > 0 ? (
				comments.map(com => (
					<div className='gap-2 flex rounded-sm w-full' key={com.id}>
						<Avatar>
							<AvatarImage
								src={`https://ui-avatars.com/api/?name=${com.user.name}`}
							/>
							<AvatarFallback>{com.user.name}</AvatarFallback>
						</Avatar>
						<div className='w-full'>
							<div className='flex md:justify-start gap-1 items-center'>
								<div className='flex justify-between text-sm md:justify-normal md:gap-4 items-center'>
									{com.user.name}
								</div>
								<div className='hidden md:block text-muted-foreground text-xs'>
									{getTimeAgo(com.created_at)}
								</div>
							</div>
							<div className='text-pretty break-words text-sm'>
								{com.content}
							</div>
							<div>
								<ThumbsComment chapter_id={chapter_id} comment={com} />
								{/* TODO - добавить кнопку и input для ответа на комментарии */}
							</div>
							<FeedbackComment commentId={com.id} />
						</div>
					</div>
				))
			) : (
				<div>Нет комментариев</div>
			)}
		</section>
	);
};
