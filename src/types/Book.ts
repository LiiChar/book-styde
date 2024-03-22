export enum BookTypeWork {
	CODE,
	QUESTION,
}

type language = 'javascript' | 'css' | 'html';
type part = 'javascript' | 'css' | 'html' | 'дизайн';

export type Books = {
	book: Book[];
};

export type Book = {
	title: string;
	part: part;
	chapter: number;
	content: string;
	parts: BookPart[];
};

export type BookPart = {
	[x: string]: any;
	title: string;
	chapter: number;
	content: string;
	works: (CodeWork | QuestionWork)[];
};

export type CodeWork = {
	type: BookTypeWork.CODE;
	question: string;
	code: string;
	answer: string;
	explain: string;
	language: language;
};

export type QuestionWork = {
	type: BookTypeWork.QUESTION;
	question: string;
	answer: string;
	explain: string;
	variant: string[];
};
