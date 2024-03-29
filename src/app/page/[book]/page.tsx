'use server';
import { Aside } from '@/components/pages/book/Aside';
import { Comments } from '@/components/pages/book/Comments';
import { Content } from '@/components/pages/book/Content';
import { NavigationWrapper } from '@/components/pages/book/NavigationWrapper';
import { Work } from '@/components/pages/book/Work';
import { Button } from '@/components/ui/button';
import { getBookOrChapterByTitle, getBooks } from '@/request/book';
import { ArrowLeft } from 'lucide-react';

interface Props {
	params: {
		book: string;
	};
}

export default async function Book({ params }: Props) {
	const title = decodeURIComponent(params.book.replaceAll('_', ' '));

	console.log(title);

	const book = await getBookOrChapterByTitle(title);

	return (
		<div className=''>
			<div className='flex relative'>
				<Aside chapter={book.title} className='overflow-y-auto' />
				<NavigationWrapper
					chapter={book.chapter}
					className='md:w-[82vw] md:max-w-[82vw] w-full md:border-l-[1px] flex flex-col items-center'
				>
					<div className='flex justify-between items-center mb-4 '>
						<Button className='w-8 h-8 bg-background'>
							<ArrowLeft className='fill-foreground' width={14} height={14} />
						</Button>
						<h1 className='text-4xl text-center'>{book.title}</h1>
						<div className='w-8'></div>
					</div>
					<Content book={book} />
					{'works' in book && <Work works={book.works} />}
					<Comments chapter_id={book.id} />
				</NavigationWrapper>
			</div>
		</div>
	);
}
