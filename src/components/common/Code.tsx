'use client';
import { useThemeStore } from '@/store/ThemeStore';
import Editor from 'react-simple-code-editor';
import { PropsWithChildren, useState } from 'react';
// @ts-ignore
import saveEval from 'safe-eval';
import { Play } from 'lucide-react';
import parse from 'react-html-parser';

// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-cshtml';
import 'prismjs/themes/prism.css'; //Example style, you can use another

export const Code = ({
	children,
	language,
}: PropsWithChildren & {
	language: string;
}) => {
	const { isLight } = useThemeStore();
	const [code, setCode] = useState(children as string);
	const [result, setResult] = useState<{
		type: 'error' | 'successefuly';
		result: string[];
	}>();

	const handleInputCode = (e: string) => {
		setCode(e);
	};

	const runCode = () => {
		try {
			const evalq = new Function(transformCodeToParse(code))();
			setResult({ result: evalq, type: 'successefuly' });
		} catch (err) {
			if (err instanceof SyntaxError)
				setResult({ result: [err.message], type: 'error' });
			/*In html make a div and put id "screen" in it for this to work
		you can also replace this line with document.write or alert as per your wish*/
		}
	};

	const transformCodeToParse = (code: string): string => {
		let result =
			'const result = []; function push(el) {result.push(JSON.stringify(el))};' +
			code +
			`${code.trim().at(-1) == ';' ? '' : ';'}return result;`;
		result = result.replaceAll('alert(', 'push(');
		result = result.replaceAll('console.log(', 'push(');
		return result;
	};

	return (
		<div className='relative flex min-h-10 max-h-64 overflow-auto my-4 w-full h-full'>
			<Editor
				value={code}
				onValueChange={e => handleInputCode(e ?? '')}
				highlight={code => highlight(code, languages[language])}
				padding={10}
				placeholder={String(children)}
				className='w-full min-h-10 bg-accent rounded-md'
			/>
			{languages != 'css' && languages != 'html' && (
				<Play
					onClick={runCode}
					className='w-8 h-8 stroke-green-700 absolute top-1 hover:fill-green-900 hover:stroke-green-900 right-6 fill-green-700 '
				/>
			)}
			{(languages == 'css' || languages == 'html') && <div>{parse(code)}</div>}
			{result?.result.map(res => (
				<div
					className={`${result && result.type == 'error' && 'text-red-600'}`}
					key={res}
				>
					{res}
				</div>
			))}
		</div>
	);
};
