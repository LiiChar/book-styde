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
	return NextResponse.json(
		comments.find(
			com => String(com.book_id) == req.nextUrl.searchParams.get('book_id')
		)
	);
}

export async function POST(req: NextRequest) {
	return NextResponse.json(comments.push((await req.json()).comment));
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
