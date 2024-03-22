import { NextRequest, NextResponse } from 'next/server';
import {
	setCookie,
	getCookie,
	getCookies,
	deleteCookie,
	hasCookie,
} from 'cookies-next';
import { PrismaClient } from '@prisma/client';

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
		return NextResponse.json({ type: 'error', message: 'User not found' });
	}

	if (userFind.key_word != keyword) {
		return NextResponse.json({ type: 'error', message: 'Password not equel' });
	}

	setCookie('user', userFind, { httpOnly: true, maxAge: 60 * 60 * 160 });

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
			message: 'Name params not request',
		});
	}

	const userFind = await USER.findFirst({
		where: {
			name: name,
		},
	});

	if (!userFind) {
		return;
	}

	return NextResponse.json(userFind.question);
}
