import { Work as WorkType } from '@prisma/client';
import React from 'react';
import { CodeEditor } from '@/components/common/CodeEditor';
import { Question } from '@/components/common/Question';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Book, BookPart, BookTypeWork } from '@/types/Book';

export const Work = ({ works }: { works: WorkType[] }) => {
	return (
		<>
			{works.length > 0 && (
				<div>
					<h3 className='text-2xl'>Задачи</h3>
					{works.map((work, i) => (
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
									/>
								</div>
							)}
							{works.length > 1 && works.length - 1 != i && (
								<Separator className='mt-4' />
							)}
						</div>
					))}
				</div>
			)}
		</>
	);
};
