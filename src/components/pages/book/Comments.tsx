'use server';
import { Skeleton } from '@/components/ui/skeleton';
import { InputComment } from './comment/InputComment';
import { Suspense } from 'react';
import { getCommentsByChapterId } from '@/request/comment';
import { CommentChapter } from '@/app/api/comment/route';
import { ListComment } from './comment/ListComment';

interface Props {
	chapter_id: number;
}

export default async function ({ chapter_id }: Props) {
	const comments: CommentChapter[] = await getCommentsByChapterId(chapter_id);

	return (
		<section className='my-4 w-full'>
			<article>
				<h3 className='text-2xl'>Комментарии</h3>
				<InputComment chapter_id={chapter_id} />
				<Suspense fallback={<Skeleton className='w-full h-12' />}>
					<ListComment chapter_id={chapter_id} comments={comments} />
				</Suspense>
			</article>
		</section>
	);
}

// <Skeleton className='w-full h-28 bg-accent' />
