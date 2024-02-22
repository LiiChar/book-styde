import { Comments } from '@/app/api/comment/route';

export const getCommentsByBookId = async (
	book_id: number
): Promise<Comments> => {
	const data = await fetch(`/api/comment?book_id=${book_id}`);
	return data.json();
};

export const storeComment = async (comment: Comments) => {
	await fetch(`/comment`, {
		body: JSON.stringify(comment),
		method: 'POST',
	});
};

export const deleteComment = async (id: number) => {
	await fetch(`/comment?id=${id}`, {
		method: 'DELETE',
	});
};
