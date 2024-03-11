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

interface Props {
	children?: ReactNode | undefined;
	className?: HTMLProps<HTMLElement>['className'];
	chapter: number;
}

const NavigationWrapper: FC<Props> = memo(
	({ children, className, chapter }) => {
		const { getNavigatePartByChapter } = useBookStore();
		const { id } = useUserStore();
		const [prev, next] = getNavigatePartByChapter(chapter);

		const handleNextChapter = () => {
			addReadableBook(id, String(next?.chapter!));
		};

		return (
			<div className='relative w-full '>
				{prev && (
					<Link
						path={'page/' + prev.title}
						title={<ArrowLeft width={48} height={48} />}
						className='hidden h-18 w-18 md:block fixed translate-y-[calc(50% + 32px)] top-1/2 '
					/>
				)}
				<div
					className={cn('py-4 px-[6px] md:px-[48px] w-full h-full', className)}
				>
					{children}
				</div>
				{next && (
					<div className='h-full w-18' onClick={handleNextChapter}>
						<Link
							path={'page/' + next.title}
							title={<ArrowRight width={48} height={48} />}
							className='hidden h-18 w-18 md:block fixed translate-y-[calc(50% + 32px)] right-0 top-1/2'
						/>
					</div>
				)}
			</div>
		);
	}
);

NavigationWrapper.displayName = 'NavigationWrapper';

export { NavigationWrapper };
