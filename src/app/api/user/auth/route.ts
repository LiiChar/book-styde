import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT() {
	cookies().delete('user');
	return NextResponse.json({ type: 'message', data: 'Вы вышли' });
}
