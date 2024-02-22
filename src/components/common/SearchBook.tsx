'use client';
import React, {
	ChangeEvent,
	HTMLProps,
	memo,
	useEffect,
	useState,
} from 'react';
import { Input } from '../ui/input';
import { useBookStore } from '@/store/BookStore';
import { Book, BookPart } from '@/types/Book';
import { Search } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Link } from './Link';

interface Props {
	className?: HTMLProps<HTMLElement>['className'];
}

export const SearchBook = memo(({ className }: Props) => {
	const [search, setSearch] = useState('');
	const [books, setBooks] = useState<Book[] | BookPart[]>([]);
	const { getResultBySearch } = useBookStore();

	const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		setBooks(getResultBySearch(search));
	}, [search]);

	return (
		<article
			className={`${className} relative px-2 h-9 w-full border-[1px] bg-background rounded-sm`}
		>
			<div className='flex items-center p-[1px] gap-2'>
				<Search width={18} height={18} />
				<Input
					className='search-book outline-none border-none z-30 py-1 px-2 h-8'
					value={search}
					placeholder='Enter your chapter'
					onChange={handleInputSearch}
				/>
			</div>
			<ul
				className={`${
					books.length == 0 ? 'hidden' : 'border-t-0 animate-dropdawn'
				} absolute  top-8  z-50 left-0 h-auto bg-background border-[1px] -translate-x-[1px] overflow-hidden box-content w-full`}
			>
				<Separator className='' />
				{books.map(book => (
					<li key={book.chapter + book.content} className='h-6 p-1 '>
						<Link path={book.title} />
					</li>
				))}
			</ul>
		</article>
	);
});
