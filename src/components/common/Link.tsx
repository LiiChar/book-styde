'use client';
import React, { HTMLProps, ReactNode } from 'react';
import LinkHref from 'next/link';
import { addReadableBook } from '@/request/user';
import { useUserStore } from '@/store/UserStore';

interface Props {
	path: string;
	title?: string | ReactNode;
	className?: HTMLProps<HTMLElement>['className'];
	attributes?: React.HTMLAttributes<HTMLAnchorElement>;
}

const Link: React.FC<Props> = ({ path, className, title, attributes }) => {
	const host =
		typeof window !== 'undefined' && window.location.host
			? window.location.host
			: 'localhost:3000';
	const protocol =
		typeof window !== 'undefined' && window.location.protocol
			? window.location.protocol
			: 'http:';

	return (
		<LinkHref
			className={className}
			href={'/' + path.replaceAll(' ', '_')}
			{...attributes}
		>
			{title ?? path}
		</LinkHref>
	);
};

Link.displayName = 'Link';

export { Link };
