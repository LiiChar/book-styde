import { BookChapterSearh, ChapterSearch } from '@/app/api/book/search/route';
import { Chapter, Work } from '@prisma/client';

export const getChapters = async (): Promise<Chapter[]> => {
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

export const getChapterByTitle = async (
	title: string
): Promise<ChapterSearch> => {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/book/search`,
		{
			method: 'POST',
			body: JSON.stringify({
				title: title,
			}),
			cache: 'no-cache',
		}
	);
	return request.json();
};

export const getPrevNextBookByChapter = async (chapter: number) => {
	const request = await fetch(
		`${process.env.NEXT_PUBLIC_URL_SITE}/api/book/search?chapter=${chapter}`
	);
	return request.json();
};
