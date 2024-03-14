'use client'
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
	const host = typeof window !== "undefined" && window.location.host
	const protocol = typeof window !== "undefined" && window.location.protocol


	return (
		<LinkHref
			className={className}
			href={protocol + '//' + host + '/' + path.replaceAll(' ', '_')}
			{...attributes}
		>
			{title ?? path}
		</LinkHref>
	);
};

Link.displayName = 'Link';

export { Link };
