'use client';
import React, { FC, memo } from 'react';
import { likeComment } from '@/request/comment';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Comment } from '@prisma/client';

interface Props {
	chapter_id: number;
	comment: Comment;
}

const ThumbsComment: FC<Props> = memo(({ chapter_id, comment }) => {
	const handleLike = async (com: Comment, like: number) => {
		com.rate = like;
		await likeComment({
			comment: com,
			chapter_id,
		});
	};

	return (
		<div className='flex gap-2 justify-between md:justify-end w-full items-center'>
			<ThumbsUp
				onClick={() => handleLike(comment, comment.rate + 1)}
				width={18}
				height={18}
			/>
			{comment.rate}
			<ThumbsDown
				onClick={() => handleLike(comment, comment.rate - 1)}
				width={18}
				height={18}
			/>
		</div>
	);
});

ThumbsComment.displayName = 'ThumbsComment';

export { ThumbsComment };
