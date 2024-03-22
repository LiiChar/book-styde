import { NextRequest, NextResponse } from 'next/server';
import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';

let wss: null | WebSocketServer = null;

export async function GET(req: NextRequest) {
	const chapter_id = req.nextUrl.searchParams.get('chapter_id');
	const COMMENTS = new PrismaClient().comment;

	if (!wss) {
		wss = new WebSocketServer({
			port: Number(process.env.NEXT_PUBLIC_WEBSOCKET_PORT) || 2020,
		});
	}

	wss.on('connection', async (ws, req) => {
		ws.on('message', async req => {
			const data: { type: string; data: any } = JSON.parse(req.toString());
			if (data.type == 'send_comment') {
				const comments = await COMMENTS.findMany({
					where: {
						chapter_id: Number(data.data.chapter_id),
					},
					orderBy: {
						rate: 'asc',
					},
					include: {
						user: true,
					},
				});

				wss?.clients.forEach(client => {
					client.send(JSON.stringify({ type: 'new_comment', data: comments }));
				});
			}
		});
	});

	return NextResponse.json(null);
}
