'use client';

import { useEffect } from 'react';
import { VariantChannel, listenMessage, socket } from '@/lib/socket';

export type SocketListenerType = {
	channel: string | number;
	variant?: VariantChannel;
	handler: (arg: any[]) => void;
};

export const SocketListener = ({
	channel,
	variant = 'chapter',
	handler,
}: SocketListenerType) => {
	useEffect(() => {
		const socket = listenMessage(channel, variant, handler);
		return () => {
			socket.disconnect();
		};
	}, [channel, variant, handler]);
	return <></>;
};
