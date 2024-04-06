import { Chapter, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
	log: ['query', 'error'],
});

import { data } from '@/assets/book';
import { BookTypeWork } from '@/types/Book';
import { timer } from '@/lib/timer';
const WORKS = prisma.work;
const CHAPTER = prisma.chapter;

async function main() {
	await WORKS.deleteMany();
	await CHAPTER.deleteMany();

	const chapters: Chapter[] = [];
	data.book.forEach(async (book, i) => {
		await timer(500);

		await CHAPTER.create({
			data: {
				content: book.content,
				title: book.title,
				book: book.book,
				chapter: i + 1,
			},
		}).then(data => {
			book.works.forEach(async work => {
				await timer(500);

				if (work.type == BookTypeWork.CODE) {
					await WORKS.create({
						data: {
							answer: work.answer,
							explain: work.explain,
							question: work.question,
							type: 'CODE',
							code: work.code,
							language: work.language,
							chapter_id: data.id,
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
							chapter_id: data.id,
						},
					});
				}
			});
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
