import { Comment } from '@/app/api/comment/route';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import {
	getCommentsByBookId,
	likeComment,
	storeComment,
} from '@/request/comment';
import { useUserStore } from '@/store/UserStore';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { FC, memo, useEffect, useState } from 'react';

interface Props {
	book_id: number;
}

export const Comments: FC<Props> = memo(({ book_id }) => {
	const { username } = useUserStore();
	const [comments, setComments] = useState<Comment[]>([]);
	const [comment, setComment] = useState('');

	useEffect(() => {
		getCommentsByBookId(book_id).then(data => setComments(data.comments));
	}, []);

	const handleSendComment = async () => {
		await storeComment({
			comment: {
				username,
				content: comment,
			},
			book_id,
		});
		await getCommentsByBookId(book_id).then(data => setComments(data.comments));
	};

	const handleLike = async (com: Comment, like: number) => {
		com.rate = like;
		await likeComment({
			comment: com,
			book_id,
		});
		await getCommentsByBookId(book_id).then(data => setComments(data.comments));
	};

	return (
		<section className='my-4'>
			<div className='grid w-full gap-1.5 mb-4'>
				<Label htmlFor='comment'>Ваш комментарий</Label>
				<Textarea
					id='comment'
					value={comment}
					placeholder='Введите ваш комментарий'
					className='min-h-10 max-h-44 h-auto'
					onChange={e => setComment(e.target.value)}
				/>
				<Button onClick={handleSendComment}>Написать комментарий</Button>
			</div>
			<article>
				<h3 className='text-2xl'>Комментарии</h3>
				<div className='flex flex-col gap-4'>
					{comments.length > 0 ? (
						comments.map(com => (
							<div className='bg-accent p-2  rounded-sm' key={com.id}>
								<div className='flex md:justify-between mb-3 items-center'>
									<div className='flex w-full justify-between md:gap-4 items-center'>
										<Avatar>
											<AvatarImage
												src={`https://ui-avatars.com/api/?name=${com.username}`}
											/>
											<AvatarFallback>{com.username}</AvatarFallback>
										</Avatar>

										{com.username}
									</div>
									<div className='hidden md:block'>{com.created_at}</div>
								</div>
								<div>{com.content}</div>
								<Separator className='my-2 bg-background' />
								<div className='flex gap-2 md:justify-between md:justify-end w-full items-center'>
									<ThumbsUp
										onClick={() => handleLike(com, com.rate + 1)}
										width={18}
										height={18}
									/>
									{com.rate}
									<ThumbsDown
										onClick={() => handleLike(com, com.rate - 1)}
										width={18}
										height={18}
									/>
								</div>
							</div>
						))
					) : (
						<Skeleton className='w-full h-28 bg-accent' />
					)}
				</div>
			</article>
		</section>
	);
});
