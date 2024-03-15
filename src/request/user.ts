import { User } from '@/api/entity/user.entity';
import { Book } from '@/types/Book';

export const register = async (user: any): Promise<any> => {
	const res = await fetch(`/api/user`, {
		body: JSON.stringify(user),
		method: 'POST',
	});
	return res.json();
};

export const removeUser = async (user_id: string) => {
	await fetch(`/api/user`, {
		body: JSON.stringify(user_id),
		method: 'DELETE',
	});
};

export const getUser = async (user_id: string) => {
	const res = await fetch(`http://localhost:3000/api/user?user_id=${user_id}`, {
		method: 'GET',
	});
	return res.json();
};

export const updateUser = async (user_id: string, user: User) => {
	await fetch(`/api/user`, {
		body: JSON.stringify({ user_id, user }),
		method: 'PUT',
	});
};

export const addReadableBook = async (user_id: string, book_id: string) => {
	await fetch(`/api/user/book`, {
		method: 'POST',
		body: JSON.stringify({ user_id, book_id }),
	});
};

export const getReadableBook = async (user_id: string): Promise<number[]> => {
	const books = await fetch(`/api/user/book?user_id=${user_id}`, {
		method: 'GET',
	});

	return books.json();
};

export const getUserQuestion = async (user_id: string): Promise<string> => {
	const books = await fetch(`/api/user/login?name=${user_id}`, {
		method: 'GET',
	});

	return books.json();
};

export const login = async (name: string, keyword: string) => {
	const res = await fetch(`/api/user/login`, {
		method: 'POST',
		body: JSON.stringify({ name, keyword }),
	});
	return res.json();
};
