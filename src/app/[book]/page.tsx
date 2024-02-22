'use client';
import { Code } from '@/components/common/Code';
import { CodeEditor } from '@/components/common/CodeEditor';
import { Question } from '@/components/common/Question';
import { Aside } from '@/components/pages/book/Aside';
import { Comments } from '@/components/pages/book/Comments';
import { NavigationWrapper } from '@/components/pages/book/NavigationWrapper';
import { Button } from '@/components/ui/button';
import { useBookStore } from '@/store/BookStore';
import { Book, BookPart, BookTypeWork } from '@/types/Book';
import { ArrowLeft } from 'lucide-react';
import parse from 'react-html-parser';

interface Props {
	params: {
		book: string;
	};
}

const page = ({ params }: Props) => {
	const { getResultBySearch, getBookByChapter } = useBookStore();

	const book: Book | BookPart = getResultBySearch(
		decodeURI(params.book.replaceAll('_', ' '))
	)[0];

	function isBook(obj: any): obj is Book {
		return 'parts' in book;
	}

	function isPart(obj: any): obj is BookPart {
		return 'code' in book;
	}

	return (
		<div className='flex relative'>
			<Aside
				chapter={
					getBookByChapter(
						Number(book && isBook(book) && String(book.chapter).split('.')[0])
					)?.title ?? ''
				}
				className='overflow-y-auto'
			/>
			<NavigationWrapper chapter={book.chapter} className=''>
				<div className='flex justify-between items-center mb-4'>
					<Button className='w-8 h-8 bg-background'>
						<ArrowLeft className='fill-foreground' width={14} height={14} />
					</Button>
					<h1 className='text-4xl'>{book.title}</h1>
					<div className='w-8'></div>
				</div>
				<div>
					{' '}
					{parse(book.content, {
						transform(node) {
							if (node.type == 'tag' && node.name == 'code') {
								return (
									<Code
										key={node.children && node.children[0].data + node.type}
										language={'javascript'}
									>
										{node.children && node.children[0].data}
									</Code>
								);
							}
						},
					})}
				</div>

				<div>
					{isPart(book) &&
						book.works.map(work => (
							<div key={work.answer + work.explain} className='w-full h-72'>
								{work.type == BookTypeWork.CODE && (
									<div className='w-full h-full'>
										<CodeEditor work={work} />
									</div>
								)}
								{work.type == BookTypeWork.QUESTION && (
									<div className='w-full h-72'>
										<Question question={work} />
									</div>
								)}
							</div>
						))}
				</div>
				<Comments book_id={book.chapter} />
			</NavigationWrapper>
		</div>
	);
};

export default page;
