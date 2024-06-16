'use server';
import { Skeleton } from '@/components/ui/skeleton';
import { InputComment } from './comment/InputComment';
import { FC, Suspense } from 'react';
import { getCommentsByChapterId } from '@/request/comment';
import { CommentChapter } from '@/app/api/comment/route';
import { ListComment } from './comment/ListComment';

interface Props {
	chapter_id: number;
	comments?: CommentChapter[];
}

const Comments: FC<Props> = async ({ chapter_id, comments: com }) => {
	const comments =
		com || ((await getCommentsByChapterId(chapter_id)) as CommentChapter[]);

	return (
		<section className='my-4 w-full'>
			<article className=''>
				<h2 className='text-xl font-bold mb-3'>
					{comments.length} комментариев
				</h2>
				<InputComment chapter_id={chapter_id} />
				<Suspense fallback={<Skeleton className='w-full h-12' />}>
					<ListComment chapter_id={chapter_id} comments={comments} />
				</Suspense>
			</article>
		</section>
	);
};

Comments.displayName = 'Comments';

export { Comments };
