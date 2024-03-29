import { Link } from '@/components/common/Link';
import { cn } from '@/lib/utils';
import { addReadableBook } from '@/request/user';
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
import { User, PrismaClient, Book, Chapter } from '@prisma/client';
import { getNavigatePartByChapter } from '@/utils/bookUtils';
import { getBooks, getPrevNextBookById } from '@/request/book';

interface Props {
	children?: ReactNode | undefined;
	className?: HTMLProps<HTMLElement>['className'];
	chapter: number;
}

const NavigationWrapper: FC<Props> = async ({
	children,
	className,
	chapter,
}) => {
	const books = await getBooks();

	const user: User | null = getCookie('user')
		? JSON.parse(getCookie('user')!)
		: null;
	if (user) {
		addReadableBook(String(user.id), String(chapter));
	}
	const [prev, next] = getNavigatePartByChapter(books, chapter);
	// const [prev, next]: [Chapter | null, Chapter | null] =
	// 	await getPrevNextBookById(chapter);

	return (
		<div className='relative w-full flex'>
			{prev && (
				<Link
					path={'page/' + prev.title}
					title={
						<ArrowLeft
							className='hover:stroke-primary'
							width={48}
							height={48}
						/>
					}
					className='hidden  h-18 w-18 md:block fixed translate-y-[calc(50% + 32px)] top-1/2 '
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
							/>
						</Button>
					)}
				</div>
			</div>
			{next && (
				<Link
					path={'page/' + next.title}
					title={
						<ArrowRight
							className='hover:stroke-primary'
							width={48}
							height={48}
						/>
					}
					className='hidden   h-18 w-18 md:block fixed translate-y-[calc(50% + 32px)] right-0 top-1/2'
				/>
			)}
		</div>
	);
};
NavigationWrapper.displayName = 'NavigationWrapper';

export { NavigationWrapper };
