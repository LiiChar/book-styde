'use client';
import { Link } from '@/components/common/Link';
import { cn } from '@/lib/utils';
import { HTMLProps, useEffect, useState } from 'react';

interface Props {
	className?: HTMLProps<HTMLElement>['className'];
	chapter: string | number;
}

type headings = {
	id: string;
	text: string;
};

const Aside = ({ className, chapter }: Props) => {
	const [headings, setHeadings] = useState<headings[]>([]);
	const [activeHead, setActiveHead] = useState('');
	const observers: [IntersectionObserver, HTMLHeadingElement][] = [];

	useEffect(() => {
		const h3Element = document.querySelectorAll('h3');
		const headingsArray = Array.from(h3Element).map(heading => {
			heading.id = heading.innerText;
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					setActiveHead(heading.id);
				}
			});
			let a = 5;
			a = 1;
			observer.observe(heading);
			heading.style.backgroundClip = 'content-box';
			heading.style.paddingTop = '42px';
			heading.style.marginTop = '-42px';
			observers.push([observer, heading]);
			return {
				id: heading.id,
				text: heading.innerText,
			};
		});
		setHeadings(headingsArray);
		return () => {
			observers.forEach(obs => {
				obs[0].unobserve(obs[1]);
			});
		};
	}, []);

	const handleNavigation = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};
	return (
		<aside
			className={cn(
				!chapter && headings.length == 0 && 'hidden',
				'h-full top-[48px] w-full sticky py-4 p flex-col items-end hidden md:flex',
				className
			)}
		>
			<div className='w-[95%]'>
				<div className='mb-4'>
					{chapter && (
						<div>
							<h4>Каталог</h4>
							<Link path={String(chapter)} />
						</div>
					)}
				</div>
				<div>
					<h4>Навигация урока</h4>
					{headings.length == 0 ? (
						<div>Нет</div>
					) : (
						<ul className=' text-sm'>
							{headings.map(heading => (
								<li
									className={`w-full flex flex-col gap-1  ${
										activeHead == heading.text &&
										'bg-foreground text-background'
									}`}
									key={heading.id}
								>
									<button
										className={`pl-4 text-left w-full h-full
							`}
										onClick={() => handleNavigation(heading.id)}
									>
										{heading.text}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</aside>
	);
};

Aside.displayName = 'Aside';

export { Aside };
