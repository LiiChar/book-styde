import {
	createUser,
	removeUser,
	updateUser,
} from '@/api/controller/user.controller';
import { setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { v4 } from 'uuid';

export interface User {
	id: string;
	name: string;
	question: string;
	key_word: string;
	is_verify: boolean;
	created_at: string;
	readable_page: number[];
}
export let USER: User[] = [];

export async function POST(req: NextRequest) {
	const user = await req.json();

	const userFind = USER.find(use => use.name == user.name);

	if (userFind) {
		return NextResponse.json({ type: 'error', message: 'User will created' });
	}

	// const user_id = await createUser(user);
	const newUser: User = {
		...user,
		id: v4(),
		is_verify: true,
		readable_page: user.hasOwnProperty('readable_page')
			? user.readable_page
			: [],
	};

	USER.push(newUser);

	setCookie('user', JSON.stringify(newUser), {
		httpOnly: true,
		maxAge: 60 * 60 * 160,
	});
	cookies().set({
		name: 'user',
		value: JSON.stringify(newUser),
		// httpOnly: true,
		maxAge: 60 * 60 * 160,
	});

	return NextResponse.json({ type: 'successfully', data: newUser });
}

export async function PUT(req: NextRequest) {
	const { user_id, user } = await req.json();

	// const user_idx = await updateUser(user_id, user);

	const userFind = USER.find(user => user.id == user_id);
	if (!userFind) {
		return;
	}
	const newUser: User = Object.entries(userFind).reduce((acc, ent) => {
		if (user[ent[0]]) {
			acc[ent[0]] = user[0];
		} else {
			acc[ent[0]] = ent[0];
		}
	}, {} as any);
	return NextResponse.json(newUser);
}

export async function DELETE(req: NextRequest) {
	const { user_id } = await req.json();

	// const user_idx = await removeUser(user_id);

	const userFind = USER.findIndex(user => user.id == user_id);

	USER = USER.slice(userFind, 1);

	return NextResponse.json(user_id);
}

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');

	const userFind = USER.find(user => user.id == user_id);
	if (!userFind) {
		return NextResponse.json({ type: 'error', data: 'User not find' });
	}
	return NextResponse.json(userFind);
}
