'use client';
import { useThemeStore } from '@/store/ThemeStore';
import { CodeWork } from '@/types/Book';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
// @ts-ignore
import saveEval from 'safe-eval';

const CodeEditor = ({ work }: { work: CodeWork }) => {
	const { isLight } = useThemeStore();
	const { answer, code: defaultCode, explain, language } = work;
	const [code, setCode] = useState(defaultCode);
	const [result, setResult] = useState<any>();

	const handleInputCode = (e: string) => {
		setCode(e);
	};

	return (
		<div className='w-full h-full'>
			<Editor
				language={language}
				defaultValue={code}
				onChange={e => handleInputCode(e ?? '')}
				width='100%'
				height='50%'
				theme={isLight ? '' : 'vs-dark'}
			/>
			{/* <div
				dangerouslySetInnerHTML={{ __html: html }}
				className='w-68 h-full bg-foreground text-background'
			></div> */}
		</div>
	);
};

CodeEditor.displayName = 'CodeEditor';

export { CodeEditor };
