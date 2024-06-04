import { NextRequest, NextResponse } from 'next/server';
import { Comment, LikesComment, User } from '@prisma/client';
import { prisma } from '..';
import Pusher from 'pusher';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export type CommentChapter = Comment & { user: User } & {
	LikesComment?: LikesComment[];
};

export async function GET(req: NextRequest) {
	const COMMENTS = prisma.comment;
	const chapter_id = req.nextUrl.searchParams.get('chapter_id');

	if (!chapter_id) {
		prisma.$disconnect();

		return NextResponse.json([]);
	}
	const comments = await COMMENTS.findMany({
		where: {
			chapter_id: Number(chapter_id),
		},
		orderBy: {
			created_at: 'desc',
		},
		include: {
			user: true,
			LikesComment: true,
		},
	});
	prisma.$disconnect();

	return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
	const { comment, chapter_id } = await req.json();

	const COMMENTS = prisma.comment;
	const pusher = new Pusher({
		appId: process.env.PUSHER_APP_ID!,
		key: process.env.PUSHER_KEY!,
		secret: process.env.PUSHER_SECRET!,
		cluster: process.env.PUSHER_CLUSTER!,
		useTLS: true,
	});

	await COMMENTS.create({
		data: {
			content: comment.content,
			user_id: comment.user_id,
			chapter_id: chapter_id,
		},
		include: {
			user: true,
		},
	});

	const commentNew = await COMMENTS.findMany({
		where: {
			chapter_id: Number(chapter_id),
		},
		orderBy: {
			created_at: 'desc',
		},
		include: {
			user: true,
		},
	});

	try {
		await pusher.trigger(
			`chapter-${chapter_id}`,
			'new_comment',
			JSON.stringify({
				comment: commentNew,
			})
		);
	} catch (error) {}
	prisma.$disconnect();
	revalidateTag('analitic');
	revalidateTag('comment');
	return NextResponse.json(commentNew);
}

export async function PUT(req: NextRequest) {
	const { comment } = await req.json();
	const user: User =
		cookies().has('user') && JSON.parse(cookies().get('user')!.value);

	if (!user) {
		return NextResponse.json({
			type: 'error',
			message: 'Вы не вошли',
		});
	}

	const COMMENTS = prisma.comment;
	const LIKES = prisma.likesComment;

	const commentFind = await COMMENTS.findFirst({
		where: {
			id: comment.id,
		},
		include: {
			LikesComment: true,
		},
	});

	if (!commentFind) {
		return NextResponse.json({
			type: 'error',
			message: 'Комментарий не найден',
		});
	}

	const likes = commentFind.LikesComment;
	if (likes.length == 0) {
		await LIKES.create({
			data: {
				comment_id: commentFind.id,
				user_id: user.id,
			},
		});
		revalidateTag('chapter');
		revalidateTag('comment');
		return NextResponse.json({
			type: 'message',
			message: 'Лайк добавлен с комментария',
		});
	}

	if (likes.length > 0) {
		LIKES.delete({
			where: {
				id: likes[0].id,
				user_id: user.id,
			},
		});
		revalidateTag('chapter');
		revalidateTag('comment');

		return NextResponse.json({
			type: 'message',
			message: 'Лайк убран с комментария',
		});
	}

	return NextResponse.json({
		type: 'error',
		message: 'Случилось что-то крайне неожиданное',
	});
}

export async function DELETE(req: NextRequest) {
	const COMMENTS = prisma.comment;
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
