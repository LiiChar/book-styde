import { Book } from '@/types/Book';

export const register = async (user: any): Promise<any> => {
	const res = await fetch(process.env.NEXT_PUBLIC_URL_SITE + `/api/user`, {
		body: JSON.stringify(user),
		method: 'POST',
	});
	return res.json();
};

export const removeUser = async (user_id: string) => {
	await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/api/user`, {
		body: JSON.stringify(user_id),
		method: 'DELETE',
	});
};

export const getUser = async (user_id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/user?user_id=${user_id}`
	);
	return res.json();
};

export const getUserAnalitic = async (user_id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/user/analitic?user_id=${user_id}`,
		{
			next: {
				revalidate: 30,
			},
		}
	);
	return res.json();
};

export const updateUser = async (user_id: string, user: any) => {
	await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/api/user`, {
		body: JSON.stringify({ user_id, user }),
		method: 'PUT',
	});
};

export const addReadableBook = async (user_id: string, book_id: string) => {
	await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/api/user/book`, {
		method: 'POST',
		body: JSON.stringify({ user_id, chapter_id: book_id }),
	});
};

export const getReadableBook = async (user_id: string): Promise<number[]> => {
	const books = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/user/book?name=${user_id}`,
		{
			method: 'GET',
		}
	);

	return books.json();
};

export const getUserQuestion = async (name: string): Promise<string | any> => {
	const books = await fetch(`/api/user/login?name=${name}`, {
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
