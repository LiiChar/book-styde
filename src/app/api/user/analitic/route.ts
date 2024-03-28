import { getDaysFromYear } from '@/utils/time';
import {
	Chapter,
	PrismaClient,
	User,
	UserBook,
	UserWork,
	Work,
	Comment,
} from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type UserIncludes =
	| (User & {
			comment: (Comment & { chapter: Chapter | null })[];
			UserBook: (UserBook & { chapter: Chapter | null })[];
			UserWork: (UserWork & {
				work: (Work & { chapter: Chapter | null }) | null;
			})[];
	  })
	| null;

export type AnaliticResolve = {
	resolve: {
		book: string;
		resolve: number;
		all: number;
	}[];
	all: number;
	current: number;
};

export type AnaliticVisit = {
	all: number;
	activeDay: {
		day: number;
		visit: number;
	}[];
};

type Analitic = {
	analitic: {
		work: AnaliticResolve;
		chapter: AnaliticResolve;
		visiting: AnaliticVisit;
	};
};

export type UserAnalitic = UserIncludes & Analitic;

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			data: 'Search params is user_id not request',
		});
	}
	const prisma = new PrismaClient();
	const CHAPTER = prisma.chapter;
	const USER = prisma.user;
	const BOOK = prisma.book;
	const WORK = prisma.work;

	const userFind: UserIncludes = await USER.findFirst({
		where: {
			id: Number(user_id),
		},
		include: {
			comment: {
				include: {
					chapter: true,
				},
			},
			UserBook: {
				include: {
					chapter: true,
				},
			},
			UserWork: {
				include: {
					work: {
						include: {
							chapter: true,
						},
					},
				},
			},
		},
	});
	if (!userFind) {
		return NextResponse.json({ type: 'error', data: 'User not find' });
	}

	const HTML = 1;
	const CSS = 2;
	const JS = 3;

	const HTMLChapter = (
		await CHAPTER.findMany({
			where: {
				book_id: HTML,
			},
		})
	).length;
	const CSSChapter = (
		await CHAPTER.findMany({
			where: {
				book_id: CSS,
			},
		})
	).length;
	const JSChapter = (
		await CHAPTER.findMany({
			where: {
				book_id: JS,
			},
		})
	).length;

	const HTMLWork = (
		await WORK.findMany({
			where: {
				chapter: {
					book_id: HTML,
				},
			},
		})
	).length;
	const CSSWork = (
		await WORK.findMany({
			where: {
				chapter: {
					book_id: CSS,
				},
			},
		})
	).length;
	const JSWork = (
		await WORK.findMany({
			where: {
				chapter: {
					book_id: JS,
				},
			},
		})
	).length;

	const allBook = await BOOK.count();
	const allCWork = await WORK.count();

	const countChapter = await CHAPTER.count();
	const countBook = await BOOK.count();
	const countWork = await WORK.count();

	const UserChapter = userFind.UserBook;
	const UserWork = userFind.UserWork;

	const currentChapter = UserChapter.length;
	const currentWork = UserWork.length;

	const HTMLChapterRead = UserChapter.filter(
		chap => chap.chapter?.book_id == HTML
	).length;
	const CSSChapterRead = UserChapter.filter(
		chap => chap.chapter?.book_id == CSS
	).length;
	const JSChapterRead = UserChapter.filter(
		chap => chap.chapter?.book_id == JS
	).length;

	const HTMLWorkResolve = UserWork.filter(
		chap => chap.work?.chapter?.book_id == HTML
	).length;
	const CSSWorkResolve = UserWork.filter(
		chap => chap.work?.chapter?.book_id == CSS
	).length;
	const JSWorkResolve = UserWork.filter(
		chap => chap.work?.chapter?.book_id == JS
	).length;

	const analitic: Analitic = {
		analitic: {
			chapter: {
				resolve: [
					{
						book: 'HTML',
						resolve: HTMLChapterRead,
						all: HTMLChapter,
					},
					{
						book: 'CSS',
						resolve: CSSChapterRead,
						all: CSSChapter,
					},
					{
						book: 'JS',
						resolve: HTMLChapterRead,
						all: JSChapter,
					},
				],
				all: countChapter,
				current: currentChapter,
			},
			work: {
				resolve: [
					{
						book: 'HTML',
						resolve: HTMLWorkResolve,
						all: HTMLWork,
					},
					{
						book: 'CSS',
						resolve: CSSWorkResolve,
						all: CSSWork,
					},
					{
						book: 'JS',
						resolve: JSWorkResolve,
						all: JSWork,
					},
				],
				all: countWork,
				current: currentWork,
			},
			visiting: {
				activeDay: [
					{ day: 5, visit: 16 },
					{ day: 2, visit: 4 },
					{ day: 10, visit: 40 },
				],
				all: getDaysFromYear(new Date().getFullYear()),
			},
		},
	};

	return NextResponse.json(Object.assign(userFind, analitic));
}
