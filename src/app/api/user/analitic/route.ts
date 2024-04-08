import { getDayOfYear, getDaysFromYear } from '@/lib/time';
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

export type ActiveDay = {
	day: number;
	visit: number;
};

export type AnaliticVisit = {
	all: number;
	activeDay: ActiveDay[];
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
		prisma.$disconnect();

		return NextResponse.json({ type: 'error', data: 'User not find' });
	}

	const visit: {
		[key: string]: { day: number; visit: number };
	} = {};

	userFind.comment.forEach(com => {
		const day = getDayOfYear(com.updated_at);
		if (visit[day]) {
			visit[day].visit = visit[day].visit + 1;
		} else {
			visit[day] = { day: day, visit: 1 };
		}
	});

	userFind.UserBook.forEach(com => {
		const day = getDayOfYear(com.updated_at);
		if (visit[day]) {
			visit[day].visit = visit[day].visit + 1;
		} else {
			visit[day] = { day: day, visit: 1 };
		}
	});

	userFind.UserWork.forEach(com => {
		const day = getDayOfYear(com.updated_at);
		if (visit[day]) {
			visit[day].visit = visit[day].visit + 1;
		} else {
			visit[day] = { day: day, visit: 1 };
		}
	});

	const HTML = 'HTML';
	const CSS = 'CSS';
	const JS = 'JS';

	const HTMLChapter = (
		await CHAPTER.findMany({
			where: {
				book: HTML,
			},
		})
	).length;
	const CSSChapter = (
		await CHAPTER.findMany({
			where: {
				book: CSS,
			},
		})
	).length;
	const JSChapter = (
		await CHAPTER.findMany({
			where: {
				book: JS,
			},
		})
	).length;

	const HTMLWork = (
		await WORK.findMany({
			where: {
				chapter: {
					book: HTML,
				},
			},
		})
	).length;
	const CSSWork = (
		await WORK.findMany({
			where: {
				chapter: {
					book: CSS,
				},
			},
		})
	).length;
	const JSWork = (
		await WORK.findMany({
			where: {
				chapter: {
					book: JS,
				},
			},
		})
	).length;

	const allBook = 3;
	const allCWork = await WORK.count();

	const countChapter = await CHAPTER.count();
	const countBook = 3;
	const countWork = await WORK.count();

	const UserChapter = userFind.UserBook;
	const UserWork = userFind.UserWork;

	const currentChapter = UserChapter.length;
	const currentWork = UserWork.length;

	const HTMLChapterRead = UserChapter.filter(
		chap => chap.chapter?.book == HTML
	).length;
	const CSSChapterRead = UserChapter.filter(
		chap => chap.chapter?.book == CSS
	).length;
	const JSChapterRead = UserChapter.filter(
		chap => chap.chapter?.book == JS
	).length;

	const HTMLWorkResolve = UserWork.filter(
		chap => chap.work?.chapter?.book == HTML
	).length;
	const CSSWorkResolve = UserWork.filter(
		chap => chap.work?.chapter?.book == CSS
	).length;
	const JSWorkResolve = UserWork.filter(
		chap => chap.work?.chapter?.book == JS
	).length;

	console.log('a', Object.values(visit));

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
						resolve: JSChapterRead,
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
				activeDay: Object.values(visit),
				all: getDaysFromYear(new Date().getFullYear()),
			},
		},
	};
	prisma.$disconnect();

	return NextResponse.json(Object.assign(userFind, analitic));
}
