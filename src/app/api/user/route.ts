import { getCookie, setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
	Chapter,
	Comment,
	PrismaClient,
	User,
	UserBook,
	UserWork,
	Work,
} from '@prisma/client';
import { v4 } from 'uuid';

export async function POST(req: NextRequest) {
	const user = await req.json();
	const prisma = new PrismaClient();
	const USER = prisma.user;

	const userFind = await USER.findFirst({
		where: {
			name: user.name,
		},
	});

	if (userFind) {
		prisma.$disconnect();
		return NextResponse.json({ type: 'error', message: 'User will created' });
	}

	const newUser = await USER.create({
		data: {
			...user,
		},
	});

	setCookie('user_private', JSON.stringify(newUser), {
		httpOnly: true,
		maxAge: 86400,
	});
	cookies().set({
		name: 'user',
		value: JSON.stringify(newUser),
		// httpOnly: true,
		maxAge: 86400,
	});
	prisma.$disconnect();
	return NextResponse.json({ type: 'successfully', data: newUser });
}

export async function PUT(req: NextRequest) {
	const { user_id, user } = await req.json();
	const prisma = new PrismaClient();
	const USER = prisma.user;
	// const user_idx = await updateUser(user_id, user);

	const userFind = await USER.findFirst({
		where: {
			id: user_id,
		},
	});

	if (!userFind) {
		prisma.$disconnect();
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
	prisma.$disconnect();
	return NextResponse.json(userUpdated);
}

export async function DELETE(req: NextRequest) {
	const { user_id } = await req.json();
	const prisma = new PrismaClient();
	const USER = prisma.user;

	// const user_idx = await removeUser(user_id);

	const userFind = await USER.findFirst({
		where: {
			id: user_id,
		},
	});

	if (!userFind) {
		prisma.$disconnect();
		return NextResponse.json({ type: 'error', message: 'User not found' });
	}
	USER.delete({
		where: {
			id: userFind.id,
		},
	});
	prisma.$disconnect();
	return NextResponse.json({ type: 'successfully', message: 'User deleted' });
}

export type UserAll =
	| (User & {
			comment: (Comment & { chapter: Chapter | null })[];
			UserBook: (UserBook & { chapter: Chapter | null })[];
			UserWork: (UserWork & { work: Work | null })[];
	  })
	| null;

export async function GET(req: NextRequest) {
	const user_id = req.nextUrl.searchParams.get('user_id');

	if (!user_id) {
		return NextResponse.json({
			type: 'error',
			data: 'Search params is user_id not request',
		});
	}
	const prisma = new PrismaClient();
	const USER = prisma.user;
	const userFind: UserAll = await USER.findFirst({
		where: {
			id: Number(user_id),
		},
		include: {
			comment: {
				include: {
					chapter: true,
				},
			},
			UserBook: {
				include: {
					chapter: true,
				},
			},
			UserWork: {
				include: {
					work: true,
				},
			},
		},
	});
	if (!userFind) {
		prisma.$disconnect();
		return NextResponse.json({ type: 'error', data: 'User not find' });
	}
	prisma.$disconnect();
	return NextResponse.json(userFind);
}
