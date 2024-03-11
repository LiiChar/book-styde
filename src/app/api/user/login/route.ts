import { NextRequest, NextResponse } from 'next/server';
import {
	setCookie,
	getCookie,
	getCookies,
	deleteCookie,
	hasCookie,
} from 'cookies-next';
import {
	addReadableBook,
	getReadableBook,
} from '@/api/controller/user.controller';
import { NextWithRepo, RepositoryNext } from '../../middleware';
import { USER } from '../route';

export async function POST(req: NextRequest & RepositoryNext) {
	const { name, keyword } = await req.json();

	const userFind = USER.find(user => user.name == name);

	if (!userFind) {
		return NextResponse.json({ type: 'error', message: 'User not found' });
	}

	if (userFind.is_verify == false) {
		return NextResponse.json({ type: 'action', message: 'register' });
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

	if (!name) {
		return;
	}

	const userFind = USER.find(user => user.name == name);

	if (!userFind) {
		return;
	}

	return NextResponse.json(userFind.question);
}
