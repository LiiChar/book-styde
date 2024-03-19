import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { User } from '@/types/User';

export async function GET(req: NextRequest) {
	const COMMENTS = new PrismaClient().comments;
	const book_id = req.nextUrl.searchParams.get('book_id');

	if (!book_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Параметр book_id не пришёл',
		});
	}
	const comments = COMMENTS.findMany({
		where: {
			book_id: Number(book_id),
		},
		orderBy: {
			rate: 'asc',
		},
		include: {
			user: {
				select: {
					name: true,
					id: true,
				},
			},
		},
	});

	if (!comments) {
		return NextResponse.json({
			book_id: req.nextUrl.searchParams.get('book_id'),
			comments: [],
		});
	}

	return NextResponse.json({
		book_id: req.nextUrl.searchParams.get('book_id'),
		comments: comments,
	});
}

export async function POST(req: NextRequest) {
	const { comment, book_id } = await req.json();
	const COMMENTS = new PrismaClient().comments;

	const commentNew = await COMMENTS.create({
		data: {
			book_id: book_id,
			content: comment.content,
			user_id: comment.user_id,
		},
		// select: {
		// 	content: true,
		// 	created_at: true,
		// 	updated_at: true,
		// 	id: true,
		// 	user: {
		// 		select: {
		// 			id: true,
		// 			name: true,
		// 		},
		// 	},
		// },
	});

	return NextResponse.json(commentNew);
}

export async function PUT(req: NextRequest) {
	const { comment, comment_id } = await req.json();
	const COMMENTS = new PrismaClient().comments;

	const commentFind = await COMMENTS.findFirst({
		where: {
			id: comment_id,
		},
	});

	if (!commentFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Комментарий не найден',
		});
	}

	const commentPut = await COMMENTS.update({
		where: {
			id: comment_id,
		},
		data: {
			...comment,
		},
		select: {
			content: true,
			rate: true,
			created_at: true,
			updated_at: true,
			id: true,
			user: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	return NextResponse.json(commentPut);
}

export async function DELETE(req: NextRequest) {
	const COMMENTS = new PrismaClient().comments;
	const comment_id = req.nextUrl.searchParams.get('id');

	if (!comment_id) {
		return NextResponse.json({
			type: 'error',
			message: 'Параметр book_id не пришёл',
		});
	}

	await COMMENTS.delete({
		where: {
			id: Number(comment_id),
		},
	});

	return NextResponse.json({
		type: 'message',
		message: 'Параметр book_id не пришёл',
	});
}
