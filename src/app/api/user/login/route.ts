import { NextRequest, NextResponse } from 'next/server';
import {
	setCookie,
	getCookie,
	getCookies,
	deleteCookie,
	hasCookie,
} from 'cookies-next';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
	const { name, keyword } = await req.json();
	const prisma = new PrismaClient();
	const USER = prisma.user;
	const UserBook = prisma.userBook;

	const userFind = await USER.findFirst({
		where: {
			name: name,
		},
	});

	if (!userFind) {
		prisma.$disconnect();
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}

	if (userFind.key_word != keyword) {
		prisma.$disconnect();
		return NextResponse.json({
			type: 'error',
			message: 'Слово не подходит. Попробуйте ещё раз!',
		});
	}

	setCookie('user_private', JSON.stringify(userFind), {
		httpOnly: true,
		maxAge: 86400,
	});
	cookies().set({
		name: 'user',
		value: JSON.stringify(userFind),
		// httpOnly: true,
		maxAge: 86400,
	});
	prisma.$disconnect();
	return NextResponse.json({
		type: 'succesfully',
		message: 'Верификация прошла успешно',
	});
}

export async function GET(req: NextRequest) {
	const name = req.nextUrl.searchParams.get('name');
	const prisma = new PrismaClient();
	const USER = prisma.user;
	const UserBook = prisma.userBook;

	if (!name) {
		prisma.$disconnect();
		return NextResponse.json({
			type: 'error',
			message: 'Параметр не пришёл',
		});
	}

	const userFind = await USER.findFirst({
		where: {
			name: name,
		},
	});

	if (!userFind) {
		prisma.$disconnect();
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}
	prisma.$disconnect();
	return NextResponse.json(userFind.question);
}
