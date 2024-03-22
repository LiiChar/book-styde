import { NextRequest, NextResponse } from 'next/server';
import { Server } from 'socket.io';

export async function GET(req: NextRequest) {
	const chapter_id = req.nextUrl.searchParams.get('chapter_id');
	const io = new Server();

	io.on('connection', socket => {
		console.log(chapter_id);
	});

	return NextResponse.json(null);
}
