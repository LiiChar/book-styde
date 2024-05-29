'use client';

import { CodeEditor } from '@/components/common/CodeEditor';
import { Question } from '@/components/common/Question';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { BookTypeWork } from '@/types/Book';
import { Work } from '@prisma/client';
import { WorkCodeEditor } from './editor/WorkCodeEditor';
import { WorkQuestionEditor } from './editor/WorkQuestionEditor';

interface Props {
	work: Work;
}

const WorkUpdateEditor = ({ work }: Props) => {
	return (
		<section key={work.answer + work.explain} className='w-full'>
			<div>
				{work.type == 'CODE' && (
					<div>
						<WorkCodeEditor work={work} />
					</div>
				)}
				{work.type == 'QUESTION' && (
					<div>
						<WorkQuestionEditor work={work}/>
					</div>
				)}
			</div>
		</section>
	);
};

WorkUpdateEditor.displayName = 'WorkList';

export default WorkUpdateEditor;
