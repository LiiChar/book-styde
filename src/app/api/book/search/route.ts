import { PrismaClient, Book, Chapter, Work } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export type BookReletion = Book & {
	chapters: Chapter[];
};

export type ChapterReletion = Chapter & {
	works: Work[];
};

export type BookSearch = BookReletion | ChapterReletion;

export async function POST(req: NextRequest) {
	const prisma = new PrismaClient({
		log: ['query'],
	});
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

	// const bookId = await prisma.$queryRaw<
	// 	{ id: number }[]
	// >`SELECT id FROM Book WHERE title LIKE '%${title}%';`;

	// if (bookId.length != 0) {
	// 	const bookFind = await BOOK.findFirst({
	// 		where: {
	// 			id: bookId[0].id,
	// 		},
	// 		include: {
	// 			chapters: true,
	// 		},
	// 	});

	// 	if (bookFind != null) {
	// 		return NextResponse.json(bookFind);
	// 	}
	// }

	// const chapterId = await prisma.$queryRaw<
	// 	{ id: number }[]
	// >`SELECT id FROM Chapter WHERE title LIKE '%${title}%';`;

	// console.log(chapterId);

	// if (chapterId.length != 0) {
	// 	const chapterFind = await CHAPTER.findFirst({
	// 		where: {
	// 			id: chapterId[0].id,
	// 		},
	// 		include: {
	// 			works: true,
	// 		},
	// 	});

	// 	if (chapterFind != null) {
	// 		return NextResponse.json(chapterFind);
	// 	}
	// }

	return NextResponse.json(null);
}
