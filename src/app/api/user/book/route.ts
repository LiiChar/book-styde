import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(req: NextRequest) {
	const { user_id, chapter_id } = await req.json();
	const USER = new PrismaClient().user;
	const UserBook = new PrismaClient().userBook;

	// const user_idx = await addReadableBook(user_id, book_id, repo);
	const userFind = await USER.findFirst({
		where: {
			id: user_id,
		},
	});

	if (!userFind) {
		return NextResponse.json({ type: 'error', message: 'User not found' });
	}

	const partFind = await UserBook.findFirst({
		where: {
			chapter_id: chapter_id,
		},
	});

	if (partFind) {
		return NextResponse.json({ type: 'message', message: 'Chapter readed' });
	}

	const newPost = await UserBook.create({
		data: {
			chapter_id: chapter_id,
			user_id,
		},
		select: {
			id: true,
		},
	});

	return NextResponse.json(newPost.id);
}

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');
	const USER = new PrismaClient().user;
	const UserBook = new PrismaClient().userBook;

	if (!user_id) {
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

	return NextResponse.json(readable_page);
}
