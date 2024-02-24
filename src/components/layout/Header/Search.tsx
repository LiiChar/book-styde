'use client';
import React, { memo, useRef, useState } from 'react';
import { Search as SVGSearch } from 'lucide-react';
import { Button } from '../../ui/button';
import { SearchBook } from '@/components/common/SearchBook';
import { useOnClickOutside } from 'usehooks-ts';

const Search = memo(() => {
	const [visible, setVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleToggleVisible = () => {
		setVisible(prev => !prev);
	};

	useOnClickOutside(ref, () => setVisible(false));

	return (
		<search
			ref={ref}
			className=' flex overflow-x-hidden z-40 bg-background overflow-y-visible'
		>
			{visible ? (
				<div className=' animate-show-r overflow-y-visible'>
					<SearchBook />
				</div>
			) : (
				<Button onClick={handleToggleVisible} className='bg-background'>
					<SVGSearch className='stroke-1' width={24} height={24} />
				</Button>
			)}
		</search>
	);
});

Search.displayName = 'Search';

export { Search };
