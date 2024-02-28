'use client';
import { Code } from '@/components/common/Code';
import { CodeEditor } from '@/components/common/CodeEditor';
import { Question } from '@/components/common/Question';
import { Aside } from '@/components/pages/book/Aside';
import { Comments } from '@/components/pages/book/Comments';
import { NavigationWrapper } from '@/components/pages/book/NavigationWrapper';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
		return 'works' in book;
	}

	function NextToStringHTML(nodes: any[] | any): string {
		let result = '';
		if (
			nodes &&
			!Array.isArray(nodes) &&
			(nodes.type == 'text' || nodes.type == 'comment')
		) {
			if (nodes.data.includes('/n')) {
				return '';
			}
			if (nodes.type == 'comment') {
				return `<-- ${nodes.data} -->`;
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
		if (
			nodes &&
			!Array.isArray(nodes) &&
			(nodes.type == 'text' || nodes.type == 'comment')
		) {
			if (nodes.data.includes('\n ')) {
				return '';
			}
			if (nodes.type == 'comment') {
				return `<-- ${nodes.data} -->`;
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
					<h1 className='text-4xl text-center'>{book.title}</h1>
					<div className='w-8'></div>
				</div>
				<section className='content'>
					{parse(book.content, {
						transform(node, index) {
							if (node.type == 'tag' && node.name == 'code') {
								const chilren = node.children && node.children;
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
				{'works' in book && (
					<div>
						<h3 className='text-2xl'>Задачи</h3>
						{book.works.map((work, i) => (
							<div key={work.answer + work.explain} className='w-full'>
								{work.type == BookTypeWork.CODE && (
									<div className='w-full h-full'>
										<Label className='text-xl'>{work.question}</Label>
										<CodeEditor {...work} />
									</div>
								)}
								{work.type == BookTypeWork.QUESTION && (
									<div className='w-full'>
										<Question question={work} />
									</div>
								)}
								{'works' in book &&
									book.works.length > 1 &&
									book.works.length - 1 != i && <Separator className='mt-4' />}
							</div>
						))}
					</div>
				)}
				<Comments book_id={book.chapter} />
			</NavigationWrapper>
		</div>
	);
};

export default Book;
