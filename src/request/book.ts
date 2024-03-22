import { BookSearch } from '@/app/api/book/search/route';
import { Chapter, Book } from '@prisma/client';

export const getBooks = async (): Promise<Book[]> => {
	const request = await fetch('http://localhost:3000' + '/api/book', {
		cache: 'no-cache',
	});
	return request.json();
};

export const getBookOrChapterByTitle = async (
	title: string
): Promise<BookSearch> => {
	const request = await fetch(`http://localhost:3000/api/book/search`, {
		method: 'POST',
		body: JSON.stringify({
			title: title,
		}),
	});
	return request.json();
};
