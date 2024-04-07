import { PrismaClient, Chapter, Work } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export type ChapterSearch = Chapter & {
	works: Work[];
};

export type NextPrevChapter = Chapter | null;

export async function GET(req: NextRequest) {
	const chapter = req.nextUrl.searchParams.get('chapter');
	const prisma = new PrismaClient();
	const CHAPTER = prisma.chapter;

	if (!chapter) {
		prisma.$disconnect();

		return NextResponse.json({ type: 'error', message: 'Параметр не пришёл' });
	}

	console.log(`ch-${chapter}; p-${+chapter - 1}; n-${+chapter + 1}`);

	const prevBook = await CHAPTER.findFirst({
		where: {
			chapter: +chapter - 1,
		},
	});

	const nextBook = await CHAPTER.findFirst({
		where: {
			chapter: +chapter + 1,
		},
	});
	prisma.$disconnect();

	return NextResponse.json([prevBook, nextBook]);
}

export async function POST(req: NextRequest) {
	const prisma = new PrismaClient();
	const CHAPTER = prisma.chapter;

	const { title } = await req.json();

	console.log(`Поиск части по именя - ${title}`);

	const chapterFind = await CHAPTER.findFirst({
		where: {
			title: {
				equals: title,
			},
		},
		select: {
			book: true,
			chapter: true,
			content: true,
			id: true,
			created_at: true,
			works: true,
			title: true,
			updated_at: true,
		},
	});

	if (chapterFind != null) {
		prisma.$disconnect();

		return NextResponse.json(chapterFind);
	}
	prisma.$disconnect();

	return NextResponse.json(null);
}

export type BookChapterSearh = {
	id: number;
	title: string;
}[];

export async function PUT(req: NextRequest) {
	const { search } = await req.json();
	const prisma = new PrismaClient();
	const CHAPTER = prisma.chapter;

	const chapters = await CHAPTER.findMany({
		where: {
			title: {
				contains: search,
				mode: 'insensitive',
			},
		},
		select: {
			id: true,
			title: true,
		},
	});
	prisma.$disconnect();
	return NextResponse.json(chapters);
}
