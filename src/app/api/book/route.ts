import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const BOOK = new PrismaClient().book;
	const books = await BOOK.findMany({
		select: {
			chapter: true,
			content: true,
			id: true,
			title: true,
			created_at: true,
			updated_at: true,
			chapters: {
				select: {
					book_id: true,
					chapter: true,
					comment: true,
					content: true,
					title: true,
					works: true,
					id: true,
				},
			},
		},
	});
	return NextResponse.json(books);
}
