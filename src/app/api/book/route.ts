import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const BOOK = new PrismaClient().book;
	const books = await BOOK.findMany({
		select: {
			chapter: true,
			id: true,
			title: true,
			chapters: {
				select: {
					book_id: true,
					chapter: true,
					title: true,
					id: true,
				},
			},
		},
	});
	return NextResponse.json(books);
}
