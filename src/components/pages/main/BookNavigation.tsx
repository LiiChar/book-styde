import { Link } from '@/components/common/Link';
import { getBooks } from '@/request/book';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

type Props = {
	accardion?: boolean;
};

export const BookNavigation = async ({ accardion }: Props) => {
	const books = await getBooks();

	return (
		<>
			<article className='my-4 hidden md:block'>
				{books.map(book => (
					<div className='mb-3' key={book.chapter}>
						<h3 className='mb-4'>
							{book.chapter}: {book.title}
						</h3>
						<ul className='grid grid-cols-2 lg:grid-cols-3 gap-2 my-2'>
							{book.chapters.map(part => (
								<li className='min-w-[175px]' key={part.chapter}>
									<Link
										path={'page/' + part.title}
										title={part.chapter + ': ' + part.title}
									/>
								</li>
							))}
						</ul>
					</div>
				))}
			</article>
			<article>
				<Accordion type='multiple' className='w-full block md:hidden'>
					{books.map(book => (
						<AccordionItem key={book.id} value={book.title}>
							<AccordionTrigger className='p-0'>
								<h3 className=''>
									{book.chapter}: {book.title}
								</h3>
							</AccordionTrigger>
							<AccordionContent>
								<ul className='grid grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 gap-2'>
									{book.chapters.map(part => (
										<li className='min-w-[175px]' key={part.id}>
											<Link
												path={'page/' + part.title}
												title={part.chapter + ': ' + part.title}
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
