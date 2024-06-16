import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { User } from '@/drizzle/schema';
import { compare } from 'bcrypt';

export async function POST(req: NextRequest) {
	const { name, keyword } = await req.json();

	const userFind = await db.query.User.findFirst({
		where: eq(User.name, name),
	});

	if (!userFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}

	const isCompare = await compare(userFind.key_word, keyword);

	if (!isCompare) {
		return NextResponse.json({
			type: 'error',
			message: 'Пароль не подходит. Попробуйте ещё раз!',
		});
	}

	cookies().set({
		name: 'user',
		value: JSON.stringify({
			id: userFind.id,
			name: userFind.name,
			role: userFind.role,
			group: userFind.group,
		}),
		sameSite: 'strict',
		maxAge: 86400,
	});
	cookies().set({
		name: 'user_private',
		value: JSON.stringify({
			id: userFind.id,
			name: userFind.name,
			role: userFind.role,
			group: userFind.group,
		}),
		sameSite: 'strict',
		maxAge: 86400,
		httpOnly: true,
	});
	return NextResponse.json({
		type: 'succesfully',
		message: 'Верификация прошла успешно',
	});
}

export async function GET(req: NextRequest) {
	const name = req.nextUrl.searchParams.get('name');

	if (!name) {
		return NextResponse.json({
			type: 'error',
			message: 'Параметр не пришёл',
		});
	}

	const userFind = await db.query.User.findFirst({
		where: eq(User.name, name),
	});

	if (!userFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Пользователь не найден',
		});
	}

	return NextResponse.json(userFind.question);
}
