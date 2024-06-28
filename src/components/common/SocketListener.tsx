'use client';

import { useEffect } from 'react';
import { VariantChannel, socket } from '@/app/api/helper/socket';
import Pubnub from 'pubnub';

export type SocketListenerType = {
	channel: string | number;
	variant?: VariantChannel;
	handler: (ev: Pubnub.MessageEvent) => void;
};

export const SocketListener = ({
	channel,
	variant = 'chapter',
	handler,
}: SocketListenerType) => {
	useEffect(() => {
		socket.addListener({
			message: handler,
		});
		socket.subscribe({ channels: [`${variant}-${channel}`] });

		return () => {
			socket.unsubscribe({ channels: [`${variant}-${channel}`] });
		};
	}, [channel, variant, handler]);
	return <></>;
};
