import { CodeEditor } from '@/components/common/CodeEditor';
import { Question } from '@/components/common/Question';
import { Label } from '@/components/ui/label';
import { BookTypeWork } from '@/types/Book';
import { Work } from '@prisma/client';
import React from 'react';

interface Props {
	work: Work;
}

export const WorkEditor = ({ work }: Props) => {
	return (
		<div key={work.answer + work.explain} className='w-full'>
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
		</div>
	);
};
