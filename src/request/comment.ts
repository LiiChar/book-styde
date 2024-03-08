import { Comments } from '@/app/api/comment/route';

export const getCommentsByBookId = async (
	book_id: number
): Promise<Comments> => {
	const data = await fetch(`/api/comment?book_id=${book_id}`);
	return data.json();
};

export const storeComment = async (comment: any): Promise<Comment> => {
	const data = await fetch(`/api/comment`, {
		body: JSON.stringify(comment),
		method: 'POST',
	});
	console.log(data);

	return data.json();
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
