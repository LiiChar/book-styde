import { QuestionWork } from '@/types/Book';
import React, { FC, memo, useState } from 'react';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface Props {
	question: QuestionWork;
}

const Question: FC<Props> = memo(({ question }) => {
	const [answer, setAnswer] = useState('');

	console.log(answer);

	return (
		<div className='my-4'>
			<h4 className='text-2xl mb-2'>{question.question}</h4>
			<div className='flex gap-1 flex-col'>
				{question.variant.length > 0 ? (
					question.variant.map(varia => (
						<div
							className='flex gap-2 items-center disable_hover_button'
							key={varia}
						>
							<Checkbox
								onClick={() => setAnswer(varia)}
								checked={answer == varia}
								id={varia}
							/>
							<Label
								className=' text-center align-middle h-min'
								htmlFor={varia}
							>
								{varia}
							</Label>
						</div>
					))
				) : (
					<Input value={answer} onChange={e => setAnswer(e.target.value)} />
				)}
			</div>
			<div className='flex mt-2 justify-between'>
				<Button>Решение</Button>
				<Button>Проверить</Button>
			</div>
		</div>
	);
});

Question.displayName = 'Question';

export { Question };
