'use client';

import {
	EventDataInfo,
	EventDataJoin,
	EventRequest,
	Room,
} from '@/app/api/socket/conference/route';
import { LOCAL_VIDEO, useWebRTC } from '@/hooks/useWebRTC';
import { EVENTS_CONFERENSE } from '@/types/User';
import { User } from '@prisma/client';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

type Props = {
	params: {
		room: number;
	};
};

export default function Page({ params }: Props) {
	const room_id = params.room;
	const user: User | null = getCookie('user')
		? JSON.parse(getCookie('user')!)
		: null;
	const [room, setRoom] = useState<Room>();
	const { clients, provideMediaRef } = useWebRTC(room_id);

	useEffect(() => {
		socketInitializer();
	}, []);

	const socketInitializer = async () => {
		await fetch(`/api/socket/conference`);

		const socket = new WebSocket(
			process.env.NEXT_PUBLIC_WEBSOCKET_PORT_CONFERENCE || 'ws://localhost:2021'
		);

		socket.onopen = () => {
			socket.send(
				JSON.stringify({
					type: EVENTS_CONFERENSE.JOIN,
					data: { room: room_id, user },
				})
			);
		};

		socket.onmessage = ev => {
			const req: EventRequest = JSON.parse(ev.data);

			if (req.type == EVENTS_CONFERENSE.INFO_ROOM) {
				const data: EventDataInfo = req.data;

				setRoom(data.room);
			}
		};
	};

	return (
		<div>
			<div>its room is {room_id} </div>
			<div>
				{room && room?.users.map(u => <div key={u.user.id}>{u.user.name}</div>)}
			</div>
			<div>
				{clients.map(clientId => (
					<div key={clientId}>
						<video
							width='100%'
							height='100%'
							ref={instance => {
								provideMediaRef(clientId, instance);
							}}
							autoPlay
							playsInline
							muted={clientId === LOCAL_VIDEO}
						></video>
					</div>
				))}
			</div>
		</div>
	);
}
