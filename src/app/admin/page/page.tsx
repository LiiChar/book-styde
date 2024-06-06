import { SearchBook } from '@/components/common/SearchBook';
import { hasRoleOrRedirectMain } from '@/lib/authGuardServer';
import { NextSeo } from 'next-seo';

export default async function BookInput() {
	hasRoleOrRedirectMain('admin');

	return (
		<section className='absolute left-0 top-0 w-full h-full flex justify-center items-center'>
			<NextSeo noindex={true} />
			<div className='w-1/3 h-1/3'>
				<SearchBook baseUrl='admin/page/' />
			</div>
		</section>
	);
}
