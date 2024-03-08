'use client';
import { useThemeStore } from '@/store/ThemeStore';
import Editor from 'react-simple-code-editor';
import { PropsWithChildren, useState } from 'react';
// @ts-ignore
import { Play } from 'lucide-react';
import parse from 'react-html-parser';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';

// @ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	transfoncCodeToValidCss,
	transfoncCodeToValidHTML,
	transformCodeToParse,
} from '@/utils/parser';
import dedent from 'dedent';

const Code = ({
	children,
	language,
	compile = true,
	disable = false,
}: PropsWithChildren & {
	language: string;
	compile?: boolean;
	disable?: boolean;
}) => {
	const { isLight } = useThemeStore();
	const [code, setCode] = useState(dedent`${children as string}`);
	const [html, setHtml] = useState(`<body>

</body>`);

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

	return (
		<div className='relative flex min-h-10 max-h-64 overflow-auto my-4 w-full h-full'>
			<ResizablePanelGroup direction='horizontal'>
				<ResizablePanel minSize={15} defaultSize={50}>
					<Tabs defaultValue='language'>
						{(language == 'css' || language == 'js') && (
							<TabsList>
								<TabsTrigger value='language'>index.{language}</TabsTrigger>
								<TabsTrigger value='html'>index.html</TabsTrigger>
							</TabsList>
						)}
						<TabsContent value='language'>
							<Editor
								value={code}
								onValueChange={e => handleInputCode(e ?? '')}
								highlight={code => highlight(code, languages[language])}
								padding={10}
								disabled={disable}
								placeholder={String(children)}
								className='w-full h-full min-h-10 bg-accent rounded-md'
							/>
						</TabsContent>
						<TabsContent value='html'>
							<Editor
								value={html}
								onValueChange={e => setHtml(e ?? '')}
								highlight={code => highlight(code, languages.markup)}
								padding={10}
								disabled={disable}
								placeholder={'Enter your html code'}
								className='w-full min-h-10 bg-accent rounded-md'
							/>
						</TabsContent>
						{language == 'js' && (
							<Play
								onClick={runCode}
								className='w-8 h-8 stroke-green-700 absolute top-1 hover:fill-green-900 hover:stroke-green-900 right-6 fill-green-700 '
							/>
						)}
					</Tabs>
				</ResizablePanel>
				{(language == 'css' || language == 'markup') && compile && (
					<ResizableHandle className='mx-1 w-[1px] h-full bg-green-700' />
				)}
				{language == 'css' && (
					<>
						<ResizableHandle className='mx-1 w-[1px] h-full bg-green-700' />
						<ResizablePanel
							className='bg-accent rounded-md'
							minSize={15}
							maxSize={85}
							defaultSize={50}
						>
							{parse(transfoncCodeToValidCss(code, html))}
						</ResizablePanel>
					</>
				)}
				{language == 'markup' && (
					<>
						<ResizableHandle className='mx-1 w-[1px] h-full bg-green-700' />
						<ResizablePanel
							className='bg-accent result_hmtl rounded-md mt-[7px] p-[10px]'
							minSize={15}
							maxSize={85}
							defaultSize={50}
						>
							{parse(transfoncCodeToValidHTML(code))}
						</ResizablePanel>
					</>
				)}
			</ResizablePanelGroup>
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

Code.displayName = 'Code';

export { Code };
