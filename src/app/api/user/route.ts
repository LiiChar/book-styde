import { setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

export async function POST(req: NextRequest) {
	const user = await req.json();
	const USER = new PrismaClient().users;

	const userFind = await USER.findFirst({
		where: {
			name: user.name,
		},
	});

	if (userFind) {
		return NextResponse.json({ type: 'error', message: 'User will created' });
	}

	const newUser = await USER.create({
		data: {
			...user,
		},
	});

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
	const USER = new PrismaClient().users;
	// const user_idx = await updateUser(user_id, user);

	const userFind = await USER.findFirst({
		where: {
			id: user_id,
		},
	});

	if (!userFind) {
		return NextResponse.json({ type: 'error', message: 'User not found' });
	}

	const userUpdated = await USER.update({
		where: {
			id: userFind.id,
		},
		data: {
			...user,
		},
	});

	return NextResponse.json(userUpdated);
}

export async function DELETE(req: NextRequest) {
	const { user_id } = await req.json();
	const USER = new PrismaClient().users;

	// const user_idx = await removeUser(user_id);

	const userFind = await USER.findFirst({
		where: {
			id: user_id,
		},
	});

	if (!userFind) {
		return NextResponse.json({ type: 'error', message: 'User not found' });
	}
	USER.delete({
		where: {
			id: userFind.id,
		},
	});

	return NextResponse.json({ type: 'successfully', message: 'User deleted' });
}

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');
	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			data: 'Search params is user_id not request',
		});
	}
	const USER = new PrismaClient().users;
	const userFind = await USER.findFirst({
		where: {
			id: Number(user_id),
		},
	});
	if (!userFind) {
		return NextResponse.json({ type: 'error', data: 'User not find' });
	}
	return NextResponse.json(userFind);
}
