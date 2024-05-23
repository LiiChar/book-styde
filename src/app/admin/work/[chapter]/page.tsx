import { WorkList } from '@/components/pages/admin/work/WorkList';
import { Button } from '@/components/ui/button';
import { hasRoleOrRedirectMain } from '@/lib/authGuard';
import { getChapterByTitle } from '@/request/book';
import React from 'react';

interface Props {
	params: {
		chapter: string;
	};
}

export default async function Work({ params }: Props) {
	hasRoleOrRedirectMain('admin');
	const title = decodeURIComponent(params.chapter.replaceAll('_', ' '));

	const book = await getChapterByTitle(title);

	return (
		<div>
		<Button>

		</Button>
		<ul>
		{book.works.map(work => (
			<li key={work.id}>
			<WorkList work={work} />
			</li>
		))}
		</ul>
		</div>
	);
}
