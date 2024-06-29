'use client';

import { VariantChannel } from '@/lib/socket';
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
			handler={(arg: any) => {
				console.log('listen ', arg);
			}}
		/>
	);
};
