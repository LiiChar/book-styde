import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	// const { user_id, chapter_id } = await req.json();

	const user_id = req.nextUrl.searchParams.get('user_id');
	const work_id = req.nextUrl.searchParams.get('work_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр user_id',
		});
	}

	if (!work_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Не пришёл параметр work_id',
		});
	}
	const prisma = new PrismaClient();
	const USER = prisma.user;
	const UserWork = prisma.userWork;

	console.log(
		'Решённая задача - пользователь - ',
		user_id,
		', задача - ',
		work_id
	);

	const findUserBook = await UserWork.findFirst({
		where: {
			work: {
				id: parseInt(work_id),
			},
			user_id: +user_id,
		},
	});

	console.log('Существующая решённая задача пользователя, ', findUserBook);

	if (findUserBook) {
		prisma.$disconnect();

		return NextResponse.json({
			type: 'info',
			message: 'Задача уже добавлена пользователю',
		});
	}

	const newPost = await UserWork.create({
		data: {
			work_id: +work_id,
			user_id: +user_id,
		},
		select: {
			id: true,
		},
	});
	prisma.$disconnect();

	return NextResponse.json(newPost.id);
}
