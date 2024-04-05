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
	const USER = new PrismaClient().user;
	const UserBook = new PrismaClient().userBook;

	const userFind = await USER.findFirst({
		where: {
			name: name,
		},
	});

	if (!userFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}

	if (userFind.key_word != keyword) {
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

	return NextResponse.json({
		type: 'succesfully',
		message: 'Верификация прошла успешно',
	});
}

export async function GET(req: NextRequest) {
	const name = req.nextUrl.searchParams.get('name');
	const USER = new PrismaClient().user;
	const UserBook = new PrismaClient().userBook;

	if (!name) {
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
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}

	return NextResponse.json(userFind.question);
}
