'use client';

import { User } from '@prisma/client';
import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { EVENTS_CONFERENSE } from '@/types/User';

export default function Page() {
	const user: User | null = getCookie('user')
		? JSON.parse(getCookie('user')!)
		: null;
	const [rooms, setRooms] = useState<string[]>([]);

	useEffect(() => {
		socketInitializer();
	}, []);

	const socketInitializer = async () => {
		await fetch(`/api/socket/conference`);

		const socket = new WebSocket(
			process.env.NEXT_PUBLIC_WEBSOCKET_PORT_CONFERENCE || 'ws://localhost:2021'
		);

		socket.onopen = () => {
			socket.send(JSON.stringify({ type: EVENTS_CONFERENSE.SHARE_ROOMS }));
		};

		socket.onmessage = ev => {
			const data = JSON.parse(ev.data);

			if (data.type == EVENTS_CONFERENSE.SHARE_ROOMS) {
				setRooms(data.data);
			}
		};
	};

	return (
		<div>
			<div>
				{rooms.map(room => (
					<Link key={room} href={`conference/${room}`}>
						Комната норме {room}
					</Link>
				))}
			</div>
		</div>
	);
}
