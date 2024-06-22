import PubNub from 'pubnub';
import { v4 } from 'uuid';

export const socket = ((userId: string = v4()) =>
	new PubNub({
		publishKey: process.env.NEXT_PUBLIC_PUBLISH_KEY!,
		subscribeKey: process.env.NEXT_PUBLIC_SUBSCRIBE_KEY!,
		uuid: userId,
	}))(v4());
