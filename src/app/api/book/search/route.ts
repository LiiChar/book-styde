import { PrismaClient, Book, Chapter, Work } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export type BookReletion = Book & {
	chapters: Chapter[];
};

export type ChapterReletion = Chapter & {
	works: Work[];
};

export type BookSearch = BookReletion | ChapterReletion;

export type NextPrevChapter = Book | Chapter | null;

export async function GET(req: NextRequest) {
	const book_id = req.nextUrl.searchParams.get('book_id');
	const prisma = new PrismaClient();
	const CHAPTER = prisma.chapter;
	const BOOK = prisma.book;

	if (!book_id) {
		return NextResponse.json({ type: 'error', message: 'Параметр не пришёл' });
	}

	let prev: NextPrevChapter = null;
	let next: NextPrevChapter = null;

	const currentBook = await CHAPTER.findFirst({
		where: {
			id: Number(book_id),
		},
	});

	if (!currentBook) {
		return NextResponse.json({
			type: 'error',
			message: 'Данной книги не существует по id - ' + book_id,
		});
	}

	let nextChapter = increaseChapter(currentBook.chapter);
	let [int, part] = `${currentBook.chapter}`.split('.');

	if (!part) {
		prev = await prisma.$queryRaw`SELECT MAX(id) FROM Book WHERE chapter = ${
			+int - 1
		}`;
	} else {
		let increasePart = +part + 1;

		if (increasePart == 10) {
			prev = await BOOK.findFirst({
				where: {
					chapter: +int + 1,
				},
			});
		} else {
			prev = await BOOK.findFirst({
				where: {
					chapter: +(int + '.' + increasePart),
				},
			});
		}
	}

	if (nextChapter.toString().length == 1) {
		const nextBook = await BOOK.findFirst({
			where: {
				chapter: nextChapter,
			},
		});
		next = nextBook;
	}

	if (next == null) {
		const chapterNext = await CHAPTER.findFirst({
			where: {
				chapter: nextChapter,
			},
		});
		next = chapterNext;
	}

	return NextResponse.json([prev, next]);
}

export async function POST(req: NextRequest) {
	const prisma = new PrismaClient();
	const BOOK = prisma.book;
	const CHAPTER = prisma.chapter;

	const { title } = await req.json();

	const bookFind = await BOOK.findFirst({
		where: {
			title: {
				equals: title,
			},
		},
		include: {
			chapters: true,
		},
	});

	if (bookFind != null) {
		return NextResponse.json(bookFind);
	}

	const chapterFind = await CHAPTER.findFirst({
		where: {
			title: {
				equals: title,
			},
		},
		include: {
			works: true,
		},
	});

	if (chapterFind != null) {
		return NextResponse.json(chapterFind);
	}

	return NextResponse.json(null);
}

const increaseChapter = (chapter: number) => {
	let [int, part] = `${chapter}`.split('.');

	if (!part) {
		return +(int + '.' + 1);
	}

	let increasePart = +part + 1;

	if (increasePart == 10) {
		return +int + 1;
	}

	return +(int + '.' + increasePart);
};

const decreaseChapter = (chapter: number) => {};
