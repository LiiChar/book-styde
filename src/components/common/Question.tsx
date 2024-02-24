import { QuestionWork } from '@/types/Book';
import React, { FC, memo, useState } from 'react';
import { Input } from '../ui/input';

interface Props {
	question: QuestionWork;
}

const Question: FC<Props> = memo(({ question }) => {
	const [answer, setAnswer] = useState('');

	return (
		<div>
			<h3>Question</h3>
			<h4>{question.question}</h4>
			<Input onChange={e => setAnswer(e.target.value)} value={answer} />
		</div>
	);
});

Question.displayName = 'Question';

export { Question };
