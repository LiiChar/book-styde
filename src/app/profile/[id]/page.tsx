'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useHidration from '@/hooks/useHidration';
import { getReadableBook } from '@/request/user';
import { useUserStore } from '@/store/UserStore';
import { Book } from '@/types/Book';
import { useEffect, useState } from 'react';

export default function Profile() {
	const { image, id, keyword, username } = useUserStore();
	const [readablePage, setReadablePage] = useState<Book[]>([]);
	const component = useHidration(
		<article>
			<section>
				<div>
					<div>
						<Avatar>
							<AvatarImage src={image} />
							<AvatarFallback>{username}</AvatarFallback>
						</Avatar>
					</div>
					<div>
						<h3>{username}</h3>
					</div>
				</div>
			</section>
			<section>
				{readablePage.map(page => (
					<div>{page.title}</div>
				))}
			</section>
		</article>,
		''
	);

	useEffect(() => {
		getReadableBook(id).then(data => {
			setReadablePage([]);
		});
	}, []);

	return component;
}
