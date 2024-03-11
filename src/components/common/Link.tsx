import React, { HTMLProps, ReactNode } from 'react';
import LinkHref from 'next/link';

interface Props {
	path: string;
	title?: string | ReactNode;
	className?: HTMLProps<HTMLElement>['className'];
}

const Link: React.FC<Props> = ({ path, className, title }) => {
	return (
		<LinkHref
			className={className}
			href={'http://localhost:3000/' + path.replaceAll(' ', '_')}
		>
			{title ?? path}
		</LinkHref>
	);
};

Link.displayName = 'Link';

export { Link };
