'use client'
import { CodeEditor } from '@/components/common/CodeEditor';
import { Link } from '@/components/common/Link';
import { Question } from '@/components/common/Question';
import { Label } from '@/components/ui/label';
import { BookTypeWork } from '@/types/Book';
import { Work } from '@prisma/client';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
	work: Work;
}

const WorkList = ({ work }: Props) => {
	const pathname = usePathname();
	return (
		<section key={work.answer + work.explain} className='w-full'>
			{work.type == 'CODE' && (
				<div className='w-full h-full'>
					<Label className='text-xl'>{work.question}</Label>
					<CodeEditor
						answer={work.answer}
						code={work.code!}
						language={work.language!}
						explain={work.explain}
						question={work.question}
						workId={work.id}
					/>
				</div>
			)}
			{work.type == 'QUESTION' && (
				<div className='w-full'>
					<Question
						question={{
							answer: work.answer,
							question: work.question,
							explain: work.explain,
							type: BookTypeWork.QUESTION,
							variant: work.variant!.split('..'),
						}}
						workId={work.id}
					/>
				</div>
			)}
			<div className='flex justify-between'>
			<Link path={`${pathname}/update/${work.id}`} title='Изменить'/>
			</div>
		</section>
	);
};

WorkList.displayName = 'WorkList'

export {
	WorkList
}