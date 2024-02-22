import { Comment } from '@/app/api/comment/route';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCommentsByBookId } from '@/request/comment';
import { FC, memo, useEffect, useState } from 'react';

interface Props {
	book_id: number;
}

export const Comments: FC<Props> = memo(({ book_id }) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [comment, setComment] = useState('');

	useEffect(() => {
		getCommentsByBookId(book_id).then(data => setComments(data.comments));
	}, []);

	return (
		<section className='my-4'>
			<div className='grid w-full gap-1.5 mb-4'>
				<Label htmlFor='comment'>Ваш комментарий</Label>
				<Textarea
					id='comment'
					value={comment}
					placeholder='Введите ваш комментарий'
					className='min-h-28 max-h-44 h-auto'
					onChange={e => setComment(e.target.value)}
				/>
			</div>
			<article>
				<h3 className='text-2xl'>Комментарии</h3>
				{comments.map(com => (
					<div key={com.id}>
						{com.username}
						<div>{com.content}</div>
					</div>
				))}
			</article>
		</section>
	);
});
