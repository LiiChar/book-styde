import { Comment } from '@/types/Comment';

export const getCommentsByBookId = async (
	book_id: number
): Promise<{ type: string; comments: any }> => {
	const data = await fetch(`/api/comment?book_id=${book_id}`);
	return data.json();
};

export const storeComment = async (comment: any) => {
	await fetch(`/api/comment`, {
		body: JSON.stringify(comment),
		method: 'POST',
	});
};

export const likeComment = async (comment: any) => {
	await fetch(`/api/comment`, {
		body: JSON.stringify(comment),
		method: 'PUT',
	});
};

export const deleteComment = async (id: number) => {
	await fetch(`/comment?id=${id}`, {
		method: 'DELETE',
	});
};
