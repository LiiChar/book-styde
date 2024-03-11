import { NextRequest, NextResponse } from 'next/server';
import {
	addReadableBook,
	getReadableBook,
} from '@/api/controller/user.controller';
import { NextWithRepo, RepositoryNext } from '../../middleware';
import { USER } from '../route';

export async function POST(req: NextRequest & RepositoryNext) {
	const { user_id, book_id } = await req.json();
	const repo = req.repo;

	// const user_idx = await addReadableBook(user_id, book_id, repo);
	const userFind = USER.find(user => user.id == user_id);

	if (!userFind) {
		return NextResponse.json({ type: 'error', message: 'User not found' });
	}

	console.log(userFind);

	userFind.readable_page.push(book_id);

	return NextResponse.json(userFind.id);
}

export async function GET(req: NextRequest & RepositoryNext) {
	const user_id = req.nextUrl.searchParams.get('user_id');
	const repo = req.repo;

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			data: 'Не пришел идентификатор пользователя',
		});
	}

	// const pages = await getReadableBook(user_id, repo);

	const userFind = USER.find(user => user.id == user_id);

	if (!userFind) {
		return NextResponse.json({
			type: 'error',
			data: 'Пользователь не найдет',
		});
	}

	return NextResponse.json(userFind.readable_page);
}
