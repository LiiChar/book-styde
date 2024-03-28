import { CommentChapter } from '@/app/api/comment/route';
import { Comment } from '@/types/Comment';

export const getCommentsByChapterId = async (
	chapter_id: number
): Promise<CommentChapter[]> => {
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/comment?chapter_id=${chapter_id}`,
		{
			cache: 'no-cache',
		}
	);
	return data.json();
};

export const storeComment = async (comment: any): Promise<CommentChapter> => {
	const responce = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/comment`,
		{
			body: JSON.stringify(comment),
			method: 'POST',
		}
	);
	return responce.json();
};

export const likeComment = async (comment: any) => {
	await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/api/comment`, {
		body: JSON.stringify(comment),
		method: 'PUT',
	});
};

export const deleteComment = async (id: number) => {
	await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/comment?id=${id}`, {
		method: 'DELETE',
	});
};
