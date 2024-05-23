import { WorkEditor } from '@/components/pages/admin/work/WorkEditor';
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
			{book.works.map(work => (
				<div key={work.id}>
					<WorkEditor work={work} />
				</div>
			))}
		</div>
	);
}
