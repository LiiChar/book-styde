import { BookChapterSearh, BookSearch } from '@/app/api/book/search/route';
import { Chapter, Book } from '@prisma/client';

export const getBooks = async (): Promise<
	(Book & { chapters: Chapter[] })[]
> => {
	const request = await fetch(process.env.NEXT_PUBLIC_URL_SITE + '/api/book');
	return request.json();
};

// const controller = new AbortController();
// const signal = controller.signal;

let fetching = false;

export const getBookSearch = async (
	search: string,
	controller: AbortController
): Promise<BookChapterSearh> => {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/book/search`,
		{
			method: 'PUT',
			body: JSON.stringify({
				search: search,
			}),
			signal: controller.signal,
		}
	);
	return request.json();
};

export const getBookOrChapterByTitle = async (
	title: string
): Promise<BookSearch> => {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/book/search`,
		{
			method: 'POST',
			body: JSON.stringify({
				title: title,
			}),
		}
	);
	return request.json();
};

export const getPrevNextBookById = async (book_id: number) => {
	const request = await fetch(
		`${process.env.BASE_RU}/api/book/search?book_id=${book_id}`
	);
	return request.json();
};
