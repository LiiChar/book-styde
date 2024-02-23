'use client';
import { book, book as bookJSON, data } from '@/assets/book';
import { Book, BookPart, Books } from '@/types/Book';
import { create } from 'zustand';

interface BookStore {
	book: Book[];
	reads: number[];
	setReadingChapter: (chapter: number) => void;
	getResultBySearch: (search: string) => any;
	getBookByChapter: (chapter: number) => Book | BookPart | null;
	getNavigatePartByChapter: (
		chapter: number
	) => [Book | BookPart | null, Book | BookPart | null];
}

// const { book } = JSON.parse(bookJSON) as Books;

export const useBookStore = create<BookStore>(set => ({
	book: data.book,
	reads: [],
	setReadingChapter: chapter =>
		set(state => ({ reads: [...state.reads, chapter] })),
	getResultBySearch: search => {
		if (search.length == 0) {
			return [];
		}
		let books: Book[] = [];
		let result: any[] = [];

		set(state => {
			books = state.book;

			return state;
		});

		books.forEach(b => {
			if (b.title.toLowerCase().trim().includes(search.toLowerCase().trim())) {
				result.push(b);
			}
		});

		if (result.length > 2) {
			return result;
		}

		books.forEach(b => {
			b.parts.forEach(part => {
				if (
					part.title.toLowerCase().trim().includes(search.toLowerCase().trim())
				) {
					result.push(part);
				}
			});
		});

		if (result.length > 0) {
			return result;
		}

		books.forEach(b => {
			if (
				b.content.toLowerCase().trim().includes(search.toLowerCase().trim())
			) {
				result.push(b);
			}
		});

		if (result.length > 2) {
			return result;
		}

		books.forEach(b => {
			b.parts.forEach(part => {
				if (
					part.content
						.toLowerCase()
						.trim()
						.includes(search.toLowerCase().trim())
				) {
					result.push(part);
				}
			});
		});
		return result;
	},
	getBookByChapter: chapter => {
		let result: Book | BookPart | null = null;

		set(state => {
			state.book.forEach(el => {
				if (el.chapter == chapter) {
					result = el;
					return state;
				}
				el.parts.forEach(part => {
					if (part.chapter == chapter) {
						result = el;
						return state;
					}
				});
			});
			return state;
		});

		return result;
	},
	getNavigatePartByChapter: (chapter: number) => {
		let chap = `${chapter}`;
		let result: [Book | BookPart | null, Book | BookPart | null] = [null, null];
		const nums = chap.split('.').map(el => Number(el));
		set(state => {
			let books = state.book;

			if (nums.length == 1) {
				let prev = books[nums[0] - 2] && books[nums[0] - 2].parts.at(-1);
				if (prev) {
					result[0] = prev;
				}
				let next = books[nums[0] - 1] && books[nums[0] - 1].parts[0];
				if (next) {
					result[1] = next;
				}
			} else {
				let prev = books[nums[0]] && books[nums[0]].parts[nums[1] - 2];
				if (prev) {
					result[0] = prev;
				} else {
					let prev_book = books[nums[0] - 1];
					if (prev_book) {
						result[0] = prev_book;
					}
				}
				let next = books[nums[0] - 1].parts[nums[1]];
				if (next) {
					result[1] = next;
				} else {
					let next_book = books[nums[0]];
					if (next_book) {
						result[1] = next_book;
					}
				}
			}

			return state;
		});

		return result;
	},
}));
