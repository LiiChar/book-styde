'use client';
import { Link } from '@/components/common/Link';
import { cn } from '@/lib/utils';
import { addReadableBook } from '@/request/user';
import { useBookStore } from '@/store/BookStore';
import { useUserStore } from '@/store/UserStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, {
	FC,
	HTMLProps,
	PropsWithChildren,
	ReactNode,
	memo,
} from 'react';
import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';
import { User, PrismaClient, Book } from '@prisma/client';
import { getNavigatePartByChapter } from '@/utils/bookUtils';
import { getBooks } from '@/request/book';

interface Props {
	children?: ReactNode | undefined;
	className?: HTMLProps<HTMLElement>['className'];
	chapter: number;
	books: Book[];
}

const NavigationWrapper: FC<Props> = ({
	children,
	className,
	chapter,
	books,
}) => {
	const user: User = getCookie('user') ? JSON.parse(getCookie('user')!) : null;
	const [prev, next] = getNavigatePartByChapter(books, chapter);

	const handleNextChapter = () => {
		if (user.id) {
			addReadableBook(String(user.id), String(next?.chapter!));
		}
	};

	const handlePrevChapter = () => {
		if (user.id) {
			addReadableBook(String(user.id), String(prev?.chapter!));
		}
	};

	return (
		<div className='relative w-full flex'>
			{prev && (
				<Link
					path={'page/' + prev.title}
					title={<ArrowLeft width={48} height={48} />}
					className='hidden h-18 w-18 md:block fixed translate-y-[calc(50% + 32px)] top-1/2 '
					attributes={{
						onClick: handlePrevChapter,
					}}
				/>
			)}
			<div
				className={cn('py-4 px-[22px] md:px-[48px] w-full h-full', className)}
			>
				{children}
				<div className='w-full flex gap-4 justify-between'>
					{prev && (
						<Button className='block  md:hidden'>
							<Link
								path={'page/' + prev.title}
								title={
									<div className='flex'>
										<ArrowLeft className='fill-black' width={15} height={15} />
										{prev.title}
									</div>
								}
								attributes={{
									onClick: handlePrevChapter,
								}}
							/>
						</Button>
					)}
					{next && (
						<Button className='block md:hidden '>
							<Link
								path={'page/' + next.title}
								title={
									<div className='flex'>
										{next.title}
										<ArrowRight className='fill-black' width={15} height={15} />
									</div>
								}
								attributes={{
									onClick: handleNextChapter,
								}}
							/>
						</Button>
					)}
				</div>
			</div>
			{next && (
				<Link
					path={'page/' + next.title}
					title={<ArrowRight width={48} height={48} />}
					attributes={{
						onClick: handleNextChapter,
					}}
					className='hidden h-18 w-18 md:block fixed translate-y-[calc(50% + 32px)] right-0 top-1/2'
				/>
			)}
		</div>
	);
};
NavigationWrapper.displayName = 'NavigationWrapper';

export { NavigationWrapper };
