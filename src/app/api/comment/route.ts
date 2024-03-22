import { NextRequest, NextResponse } from 'next/server';
import { Comment, PrismaClient, User } from '@prisma/client';

export type CommentChapter = Comment & { user: User };

export async function GET(req: NextRequest) {
	const COMMENTS = new PrismaClient().comment;
	const chapter_id = req.nextUrl.searchParams.get('chapter_id');

	if (!chapter_id) {
		return NextResponse.json([]);
	}
	const comments = await COMMENTS.findMany({
		where: {
			chapter_id: Number(chapter_id),
		},
		orderBy: {
			rate: 'asc',
		},
		include: {
			user: true,
		},
	});

	return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
	const { comment, chapter_id } = await req.json();
	const COMMENTS = new PrismaClient().comment;

	const commentNew = await COMMENTS.create({
		data: {
			chapter_id: chapter_id,
			content: comment.content,
			user_id: comment.user_id,
		},
		include: {
			user: true,
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
	const COMMENTS = new PrismaClient().comment;

	const commentFind = await COMMENTS.findFirst({
		where: {
			id: +comment_id,
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
			id: +comment_id,
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
	const COMMENTS = new PrismaClient().comment;
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
