'use client';

import { Link } from '@/components/common/Link';
import { useBookStore } from '@/store/BookStore';

export const BookNavigation = () => {
	const { book } = useBookStore();

	return (
		<article className='my-4'>
			{book.map(book => (
				<div className='mb-3' key={book.chapter}>
					<h3>
						{book.chapter}: {book.title}
					</h3>
					<ul className='grid grid-cols-3 gap-4 my-2'>
						{book.parts.map(part => (
							<li key={part.chapter}>
								<Link
									path={part.title}
									title={part.chapter + ': ' + part.title}
								/>
							</li>
						))}
					</ul>
				</div>
			))}
		</article>
	);
};
