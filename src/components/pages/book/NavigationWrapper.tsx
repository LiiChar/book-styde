'use client';
import { Link } from '@/components/common/Link';
import { cn } from '@/lib/utils';
import { useBookStore } from '@/store/BookStore';
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
		const [prev, next] = getNavigatePartByChapter(chapter);

		return (
			<div className='relative w-full'>
				{prev && (
					<Link
						path={prev.title}
						title={<ArrowLeft width={48} height={48} />}
						className='hidden h-18 w-18 md:block fixed translate-y-[calc(50% + 32px)] top-1/2 '
					/>
				)}
				<div className={cn('py-4 px-6 md:px-24 w-full h-full', className)}>
					{children}
				</div>
				{next && (
					<Link
						path={next.title}
						title={<ArrowRight width={48} height={48} />}
						className='hidden h-18 w-18 md:block fixed translate-y-[calc(50% + 32px)] right-0 top-1/2'
					/>
				)}
			</div>
		);
	}
);

NavigationWrapper.displayName = 'NavigationWrapper';

export { NavigationWrapper };
