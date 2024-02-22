'use client';
import {
	Avatar as Ava,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar';
import { useUserStore } from '@/store/UserStore';

export const Avatar = () => {
	const { image, username } = useUserStore();
	return (
		<Ava>
			<AvatarImage src={image} />
			<AvatarFallback>{username}</AvatarFallback>
		</Ava>
	);
};
