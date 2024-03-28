import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { questions } from '../assets/book';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRandomQuestion() {
	const randomIndex = Math.floor(Math.random() * questions.length);
	return questions[randomIndex];
}
