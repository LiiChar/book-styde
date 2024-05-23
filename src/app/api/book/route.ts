import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const prisma = new PrismaClient();
	const CHAPTER = prisma.chapter;
	const books = await CHAPTER.findMany({
		select: {
			book: true,
			id: true,
			title: true,
			created_at: true,
			content: true,
			updated_at: true,
			chapter: true,
		},
		orderBy: {
			chapter: 'asc',
		},
	});
	prisma.$disconnect();
	return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
	const prisma = new PrismaClient();
	const CHAPTER = prisma.chapter;

	const { id, content }: { id: number; content: string } = await req.json();

	try {
		await CHAPTER.update({
			where: {
				id,
			},
			data: {
				content,
			},
		});
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: 'Произошла ошибка',
		});
	}
	return NextResponse.json({
		type: 'succesfully',
		message: 'Содержание успешно изменено',
	});
}
