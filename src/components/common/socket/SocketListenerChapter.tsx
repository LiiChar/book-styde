'use client';

import { VariantChannel } from '@/app/api/helper/socket';
import { SocketListener } from '../SocketListener';

export type SocketListenerChapterType = {
	channel: string | number;
	variant?: VariantChannel;
};

export const SocketListenerChapter = ({
	channel,
	variant,
}: SocketListenerChapterType) => {
	return (
		<SocketListener
			channel={channel}
			variant={variant}
			handler={event => {
				console.log('socket ', event.message);
			}}
		/>
	);
};
