import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
	// const { user_id, chapter_id } = await req.json();

	const user_id = req.nextUrl.searchParams.get('user_id');
	const chapter_id = req.nextUrl.searchParams.get('chapter_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр user_id',
		});
	}

	if (!chapter_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр chapter_id',
		});
	}
	const prisma = new PrismaClient();
	const USER = prisma.user;
	const UserBook = prisma.userBook;

	console.log(
		'Прочитаная глава - пользователь - ',
		user_id,
		', глава - ',
		chapter_id
	);

	const findUserBook = await UserBook.findFirst({
		where: {
			chapter: {
				id: parseInt(chapter_id),
			},
			user_id: +user_id,
		},
	});

	console.log('Существующая глава, ', findUserBook);

	if (findUserBook) {
		prisma.$disconnect();

		return NextResponse.json({ type: 'info', message: 'Глава уже добавлена' });
	}

	const newPost = await UserBook.create({
		data: {
			chapter_id: +chapter_id,
			user_id: +user_id,
		},
		select: {
			id: true,
		},
	});
	prisma.$disconnect();

	return NextResponse.json(newPost.id);
}

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');
	const prisma = new PrismaClient();
	const USER = prisma.user;
	const UserBook = prisma.userBook;

	if (!user_id) {
		prisma.$disconnect();
		return NextResponse.json({
			type: 'error',
			data: 'Не пришел идентификатор пользователя',
		});
	}

	// const pages = await getReadableBook(user_id, repo);

	const userFind = await USER.findFirst({
		where: {
			id: Number(user_id),
		},
	});

	if (!userFind) {
		prisma.$disconnect();
		return NextResponse.json({
			type: 'error',
			data: 'Пользователь не найдет',
		});
	}

	const readable_page = UserBook.findMany({
		where: {
			user_id: userFind.id,
		},
	});
	prisma.$disconnect();
	return NextResponse.json(readable_page);
}
