'use client';
import { data } from '@/assets/book';
import { Book, BookPart, Books, CodeWork, QuestionWork } from '@/types/Book';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookStore {
	book: Book[];
	getResultBySearch: (search: string) => any;
}

// const { book } = JSON.parse(bookJSON) as Books;

export const useBookStore = create<BookStore>(set => ({
	book: data.book,
	getResultBySearch: srh => {
		if (srh.length == 0) {
			return [];
		}
		const search = decodeURI(srh);
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
}));

// export const useBookStore = create<BookStore>()(
// 	persist(
// 		set => ({
// 			book: data.book,
// 			reads: [],
// 			workResolve: [],
// 			setWork: work =>
// 				set(state => ({ workResolve: [...state.workResolve, work] })),
// 			checkWork: work => {
// 				let result = false;

// 				set(state => {
// 					state.workResolve.forEach(workResolve => {
// 						if (
// 							workResolve.answer + workResolve.explain + workResolve.question ==
// 							work.answer + work.explain + work.question
// 						) {
// 							result = true;
// 						}
// 					});
// 					return state;
// 				});
// 				return result;
// 			},
// 			setReadingChapter: chapter =>
// 				set(state => ({ reads: [...state.reads, chapter] })),
// 			getResultBySearch: search => {
// 				if (search.length == 0) {
// 					return [];
// 				}
// 				let books: Book[] = [];
// 				let result: any[] = [];

// 				set(state => {
// 					books = state.book;

// 					return state;
// 				});

// 				books.forEach(b => {
// 					if (
// 						b.title.toLowerCase().trim().includes(search.toLowerCase().trim())
// 					) {
// 						result.push(b);
// 					}
// 				});

// 				if (result.length > 2) {
// 					return result;
// 				}

// 				books.forEach(b => {
// 					b.parts.forEach(part => {
// 						if (
// 							part.title
// 								.toLowerCase()
// 								.trim()
// 								.includes(search.toLowerCase().trim())
// 						) {
// 							result.push(part);
// 						}
// 					});
// 				});

// 				if (result.length > 0) {
// 					return result;
// 				}

// 				books.forEach(b => {
// 					if (
// 						b.content.toLowerCase().trim().includes(search.toLowerCase().trim())
// 					) {
// 						result.push(b);
// 					}
// 				});

// 				if (result.length > 2) {
// 					return result;
// 				}

// 				books.forEach(b => {
// 					b.parts.forEach(part => {
// 						if (
// 							part.content
// 								.toLowerCase()
// 								.trim()
// 								.includes(search.toLowerCase().trim())
// 						) {
// 							result.push(part);
// 						}
// 					});
// 				});
// 				return result;
// 			},
// 			getBookByChapter: chapter => {
// 				let result: Book | BookPart | null = null;

// 				set(state => {
// 					state.book.forEach(el => {
// 						if (el.chapter == chapter) {
// 							result = el;
// 							return state;
// 						}
// 						el.parts.forEach(part => {
// 							if (part.chapter == chapter) {
// 								result = el;
// 								return state;
// 							}
// 						});
// 					});
// 					return state;
// 				});

// 				return result;
// 			},
// 			getNavigatePartByChapter: (chapter: number) => {
// 				let chap = `${chapter}`;
// 				let result: [Book | BookPart | null, Book | BookPart | null] = [
// 					null,
// 					null,
// 				];
// 				const nums = chap.split('.').map(el => Number(el));
// 				set(state => {
// 					let books = state.book;

// 					if (nums.length == 1) {
// 						let prev = books[nums[0] - 2] && books[nums[0] - 2].parts.at(-1);
// 						if (prev) {
// 							result[0] = prev;
// 						}
// 						let next = books[nums[0] - 1] && books[nums[0] - 1].parts[0];
// 						if (next) {
// 							result[1] = next;
// 						}
// 					} else {
// 						let prev = books[nums[0] - 1] && books[nums[0] - 1].parts[nums[1] - 2];
// 						if (prev) {
// 							result[0] = prev;
// 						} else {
// 							let prev_book = books[nums[0] - 1];
// 							if (prev_book) {
// 								result[0] = prev_book;
// 							}
// 						}
// 						let next = books[nums[0] - 1].parts[nums[1]];
// 						if (next) {
// 							result[1] = next;
// 						} else {
// 							let next_book = books[nums[0]];
// 							if (next_book) {
// 								result[1] = next_book;
// 							}
// 						}
// 					}

// 					return state;
// 				});

// 				return result;
// 			},
// 		}),
// 		{
// 			name: 'book',
// 		}
// 	)
// );
