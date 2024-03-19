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
import { Comment } from '@/types/Comment';
import { User } from '@/types/User';
import { getCookie } from 'cookies-next';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { FC, memo, useEffect, useState } from 'react';

interface Props {
	book_id: number;
}

const Comments: FC<Props> = memo(({ book_id }) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [comment, setComment] = useState('');
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | undefined | null>(
		getCookie('user') ? JSON.parse(getCookie('user')!) : null
	);

	useEffect(() => {
		setLoading(true);
		getCommentsByBookId(book_id)
			.then(data => {
				setComments(data.comments);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleSendComment = async () => {
		await storeComment({
			comment: {
				user_id: user!.id,
				content: comment,
			},
			book_id,
		});
		setComment('');
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
		<section className='my-4 w-full'>
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
			<article>
				<h3 className='text-2xl'>Комментарии</h3>
				<div className='flex flex-col gap-4'>
					{comments.length > 0 ? (
						comments.map(com => (
							<div className='bg-accent p-2  rounded-sm' key={com.id}>
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
									<div className='hidden md:block'>{com.created_at}</div>
								</div>
								<div>{com.content}</div>
								<Separator className='my-2 bg-background' />
								<div className='flex gap-2 justify-between md:justify-end w-full items-center'>
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
					) : loading ? (
						<Skeleton className='w-full h-28 bg-accent' />
					) : (
						<section>Нет комментариев</section>
					)}
				</div>
			</article>
		</section>
	);
});

Comments.displayName = 'Comments';

export { Comments };
