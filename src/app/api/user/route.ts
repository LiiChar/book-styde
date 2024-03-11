import {
	createUser,
	removeUser,
	updateUser,
} from '@/api/controller/user.controller';
import { NextRequest, NextResponse } from 'next/server';

interface User {
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
	const { user } = await req.json();

	// const user_id = await createUser(user);
	const newUser: User = {
		...user,
		is_verify: true,
		readable_page: user.readable_page ? user.readable_page : [],
	};

	USER.push(newUser);

	return NextResponse.json(newUser);
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
