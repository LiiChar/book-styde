import { NextRequest, NextResponse } from 'next/server';

const comments: Comments[] = [
	{
		book_id: 1.1,
		comments: [
			{
				content: '1.1',
				created_at: 'now',
				id: 1,
				username: 'user1',
				rate: 0,
			},
		],
	},
	{
		book_id: 1.2,
		comments: [
			{
				content: '1.2',
				created_at: 'now',
				id: 2,
				username: 'user1',
				rate: 0,
			},
		],
	},
	{
		book_id: 2,
		comments: [
			{
				content: '2',
				created_at: 'now',
				id: 3,
				username: 'user1',
				rate: 0,
			},
		],
	},
	{
		book_id: 2.1,
		comments: [
			{
				content: '2.1',
				created_at: 'now',
				id: 4,
				username: 'user1',
				rate: 0,
			},
		],
	},
	{
		book_id: 2.2,
		comments: [
			{
				content: '2.2',
				created_at: 'now',
				id: 5,
				username: 'user1',
				rate: 0,
			},
		],
	},
];

export async function GET(req: NextRequest) {
	const comment = comments.find(
		com => String(com.book_id) == req.nextUrl.searchParams.get('book_id')
	);

	comment?.comments.sort((a, b) => b.rate - a.rate);

	return NextResponse.json(
		comments.find(
			com => String(com.book_id) == req.nextUrl.searchParams.get('book_id')
		)
	);
}

export async function POST(req: NextRequest) {
	const { comment, book_id } = await req.json();

	const commentNew = {
		content: comment.content,
		created_at: String(new Date().getTime()),
		id: new Date().getTime() + comment.content + comment.username,
		rate: 0,
		username: comment.username,
	};
	comments.find(com => com.book_id == book_id)?.comments.push(commentNew);
	console.log(JSON.stringify(commentNew));

	return NextResponse.json(commentNew);
}

export async function PUT(req: NextRequest) {
	const { comment, book_id } = await req.json();
	const book = comments.find(com => com.book_id == book_id);

	const indexComment = book?.comments.findIndex(com => com.id == comment.id)!;

	if (book) {
		book.comments[indexComment] = comment;
	}

	return NextResponse.json(comment);
}

export function DELETE(req: NextRequest) {
	comments.forEach(({ comments }) => {
		comments.splice(
			comments.findIndex(
				com => Number(req.nextUrl.searchParams.get('id')) == com.id
			),
			1
		);
	});
}

export type Comment = {
	username: string;
	id: number;
	content: string;
	created_at: string;
	rate: number;
};

export type Comments = {
	book_id: number;
	comments: Comment[];
};
