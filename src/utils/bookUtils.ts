import { Book, Chapter, PrismaClient } from '@prisma/client';

export const getNavigatePartByChapter = (
	books: any,
	chapter: number
): [Book | Chapter | null, Book | Chapter | null] => {
	let chap = `${chapter}`;
	let result: [Book | Chapter | null, Book | Chapter | null] = [null, null];
	const nums = chap.split('.').map(el => Number(el));

	if (nums.length == 1) {
		let prev = books[nums[0] - 2] && books[nums[0] - 2].chapters.at(-1);
		if (prev) {
			result[0] = prev;
		}
		let next = books[nums[0] - 1] && books[nums[0] - 1].chapters[0];
		if (next) {
			result[1] = next;
		}
	} else {
		let prev = books[nums[0] - 1] && books[nums[0] - 1].chapters[nums[1] - 2];
		if (prev) {
			result[0] = prev;
		} else {
			let prev_book = books[nums[0] - 1];
			if (prev_book) {
				result[0] = prev_book;
			}
		}
		let next = books[nums[0] - 1].chapters[nums[1]];
		if (next) {
			result[1] = next;
		} else {
			let next_book = books[nums[0]];
			if (next_book) {
				result[1] = next_book;
			}
		}
	}

	return result;
};

export const getBookByChapter = (
	books: any,
	chapter: number
): Book | Chapter | null => {
	let result: Book | Chapter | null = null;

	books.forEach((el: any) => {
		if (el.chapter == chapter) {
			result = el;
			return result;
		}
		el.chapters.forEach((part: any) => {
			if (part.chapter == chapter) {
				result = el;
				return result;
			}
		});
	});

	return result;
};
