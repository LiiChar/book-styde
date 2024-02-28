import { BookTypeWork, QuestionWork } from '@/types/Book';
import React, { FC, memo, useState } from 'react';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useBookStore } from '@/store/BookStore';

interface Props {
	question: QuestionWork;
}

const Question = memo(({ question }: Props) => {
	const { answer: answ, explain, question: quest, variant } = question;
	const [answer, setAnswer] = useState('');
	const [help, setHelp] = useState('');
	const { setWork, checkWork } = useBookStore();
	const resolve = checkWork({
		answer: answ,
		explain,
		question: quest,
		variant,
		type: BookTypeWork.QUESTION,
	});

	const showResolve = () => {
		setHelp(explain + '\n' + `Ответ: ${answer}`);
	};

	const verifyResolve = () => {
		if (answer == answ) {
			setHelp('Задача решена');
			setWork({
				answer: answ,
				explain,
				question: quest,
				variant,
				type: BookTypeWork.QUESTION,
			});
		} else {
			setHelp('Ответ неверный, попробуйте снова');
		}
	};

	return (
		<div className='my-4'>
			<h4 className='text-2xl mb-2'>{quest}</h4>
			<div className='flex gap-1 flex-col'>
				{variant.length > 0 ? (
					variant.map(varia => (
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
			<div className='mt-2 flex justify-between items-center'>
				<Button onClick={showResolve}>Решение</Button>
				{(help.length > 0 || resolve) && (
					<div className='text-xs overflow-auto text-wrap flex bg-accent justify-center h-[35px] rounded-sm items-center w-1/2'>
						{(resolve && 'Задача решена') || help}
					</div>
				)}
				<Button onClick={verifyResolve}>Проверить</Button>
			</div>
		</div>
	);
});

Question.displayName = 'Question';

export { Question };