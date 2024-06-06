import { hasRoleOrRedirectMain } from '@/lib/authGuardServer';
import { NextSeo } from 'next-seo';
import React from 'react';

export default async function work() {
	hasRoleOrRedirectMain('admin');
	return (
		<div>
			<NextSeo noindex={true} />
			work
		</div>
	);
}
