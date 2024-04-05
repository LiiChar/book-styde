import { Link } from '@/components/common/Link';
import { getChapters } from '@/request/book';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { chaptersGroupByBook } from '@/lib/bookUtils';

type Props = {
	accardion?: boolean;
};

export const BookNavigation = async ({ accardion }: Props) => {
	const books = await getChapters();
	const group = chaptersGroupByBook(books);

	console.log(books);

	return (
		<>
			<article className='my-4 hidden md:block'>
				{group.map((book, i) => (
					<div className='mb-3' key={book.title}>
						<h3 className='mb-4'>{book.title}</h3>
						<ul className='grid grid-cols-2 lg:grid-cols-3 gap-2 my-2'>
							{book.chapters.map((part, j) => (
								<li className='min-w-[175px]' key={part.chapter}>
									<Link
										path={'page/' + part.title}
										title={i + 1 + '.' + (j + 1) + ': ' + part.title}
									/>
								</li>
							))}
						</ul>
					</div>
				))}
			</article>
			<article>
				<Accordion type='multiple' className='w-full block md:hidden'>
					{group.map((book, i) => (
						<AccordionItem key={book.title} value={book.title}>
							<AccordionTrigger className='p-0'>
								<h3 className=''>{book.title}</h3>
							</AccordionTrigger>
							<AccordionContent>
								<ul className='grid grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 gap-2'>
									{book.chapters.map((part, j) => (
										<li className='min-w-[175px]' key={part.id}>
											<Link
												path={'page/' + part.title}
												title={i + 1 + '.' + (j + 1) + ': ' + part.title}
											/>
										</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</article>
		</>
	);
};
