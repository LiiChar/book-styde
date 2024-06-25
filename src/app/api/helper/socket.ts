import PubNub from 'pubnub';
import { v4 } from 'uuid';
import { SOCKET_ACTION_REFRESH } from '@/types/const/const';

export const socket = ((userId: string = v4()) =>
	new PubNub({
		publishKey: process.env.NEXT_PUBLIC_PUBLISH_KEY!,
		subscribeKey: process.env.NEXT_PUBLIC_SUBSCRIBE_KEY!,
		uuid: userId,
	}))(v4());

const variant = ['chapter'] as const;
export type VariantChannel = (typeof variant)[number];
export type ActionSocket = typeof SOCKET_ACTION_REFRESH;
export type ActionSocketMessage = ActionSocket | string;

export const sendMessage = async (
	channel: string,
	variant: VariantChannel = 'chapter',
	message: ActionSocketMessage
) => {
	await socket.publish({
		channel: `${variant}-${channel}`,
		message: message,
	});
};
