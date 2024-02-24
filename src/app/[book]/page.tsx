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
import { DOMElement } from 'react';
import parse, { convertNodeToElement } from 'react-html-parser';

interface Props {
	params: {
		book: string;
	};
}

const Book = ({ params }: Props) => {
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

	function NextToStringHTML(nodes: any[] | any): string {
		let result = '';
		if (nodes && !Array.isArray(nodes) && nodes.type == 'text') {
			if (nodes.data.includes('/n')) {
				return '';
			}
			return nodes.data;
		}
		if (nodes && !Array.isArray(nodes) && nodes.type == 'tag' && nodes.next) {
			const tagOpen = `<${nodes.name} ${
				nodes.attribs
					? Object.entries(nodes.attribs).map(
							([key, value]) => `${key}=${value}`
					  )
					: ''
			}>`;
			const tagClose = `</${nodes.name}>`;

			result += `${tagOpen}${NextToStringHTML(nodes.next)}${tagClose}`;
		}
		return result;
	}

	function NodeToStringHTML(nodes: any[] | any): string {
		let result = '';
		if (nodes && !Array.isArray(nodes) && nodes.type == 'text') {
			if (nodes.data.includes('\n ')) {
				return '';
			}
			return nodes.data;
		}
		if (
			nodes &&
			!Array.isArray(nodes) &&
			nodes.type == 'tag' &&
			nodes.children
		) {
			const tagOpen = `<${nodes.name} ${
				nodes.attribs
					? Object.entries(nodes.attribs).map(
							([key, value]) => `${key}=${value}`
					  )
					: ''
			}>`;
			const tagClose = `</${nodes.name}>`;

			return `${tagOpen}${NodeToStringHTML(nodes.children)}${tagClose}${
				nodes.next ? NextToStringHTML(nodes.next) : ''
			}`;
		} else if (nodes) {
			nodes.forEach((node: any) => {
				result += NodeToStringHTML(node);
			});
		}
		return result;
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
				<section className='content'>
					{parse(book.content, {
						transform(node, index) {
							if (node.type == 'tag' && node.name == 'code') {
								const chilren = node.children && node.children;
								console.log(chilren);
								let child = chilren ? NodeToStringHTML(chilren) : '';

								return (
									<Code
										key={node.children && node.children[0].data + node.type}
										language={(node.attribs && node.attribs.language) ?? 'js'}
										disable={
											(node.attribs && node.attribs.disable == 'true'
												? true
												: false) ?? false
										}
										compile={
											(node.attribs && node.attribs.compile === 'true'
												? true
												: false) ?? true
										}
									>
										{child}
									</Code>
								);
							}
						},
					})}
				</section>

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

export default Book;
