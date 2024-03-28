import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { data } from '@/assets/book';
import { BookTypeWork } from '@/types/Book';
const WORKS = prisma.work;
const BOOK = prisma.book;
const CHAPTER = prisma.chapter;

async function main() {
	await WORKS.deleteMany();
	await BOOK.deleteMany();
	await CHAPTER.deleteMany();

	data.book.forEach(async book => {
		await BOOK.create({
			data: {
				chapter: book.chapter,
				content: book.content,
				title: book.title,
			},
		}).then(async data => {
			const queries: Promise<any>[] = [];
			const books = data;
			book.parts.forEach(async el => {
				const chapters = CHAPTER.create({
					data: {
						chapter: el.chapter,
						content: el.content,
						title: el.title,
						book_id: books.id,
					},
				}).then(data => {
					const chapters = data;
					el.works.forEach(async work => {
						if (work.type == BookTypeWork.CODE) {
							await WORKS.create({
								data: {
									answer: work.answer,
									explain: work.explain,
									question: work.question,
									type: 'CODE',
									code: work.code,
									language: work.language,
									chapter_id: chapters.id,
								},
							});
						} else {
							await WORKS.create({
								data: {
									answer: work.answer,
									explain: work.explain,
									question: work.question,
									type: 'QUESTION',
									variant: work.variant.join('..'),
									chapter_id: chapters.id,
								},
							});
						}
					});
				});
				queries.push(chapters);
			});
			await Promise.all(queries);
		});
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
