import { BookTypeWork, Books } from '@/types/Book';

export const book = `{
  "book": [
    {
      "title": "Sample Book 1",
      "chapter": 1,
      "content": "This is the content of Sample Book 1.",
      "parts": [
        {
          "title": "Introduction",
          "chapter": 1,
          "content": "Introduction to Sample Book 1.",
          "works": [
            {
              "type": "CODE",
              "code": "const x = 5;",
              "answer": "5",
              "explain": "This is a simple code example.",
              "language": "javascript"
            },
            {
              "type": "QUESTION",
              "question": "What is the capital of France?",
              "answer": "Paris",
              "explain": "Paris is the capital of France."
            }
          ]
        },
        {
          "title": "Chapter 1",
          "chapter": 2,
          "content": "Content of Chapter 1.",
          "works": [
            {
              "type": "CODE",
              "code": "const y = 10;",
              "answer": "10",
              "explain": "Another code example.",
              "language": "javascript"
            },
            {
              "type": "QUESTION",
              "question": "What is the largest mammal?",
              "answer": "Blue whale",
              "explain": "Blue whale is the largest mammal."
            }
          ]
        }
      ]
    },
    {
      "title": "Sample Book 2",
      "chapter": 1,
      "content": "This is the content of Sample Book 2.",
      "parts": [
        {
          "title": "Prologue",
          "chapter": 1,
          "content": "Prologue of Sample Book 2.",
          "works": [
            {
              "type": "CODE",
              "code": "console.log('Hello, World!');",
              "answer": "Hello, World!",
              "explain": "A simple JavaScript console log.",
              "language": "javascript"
            },
            {
              "type": "QUESTION",
              "question": "What is the capital of Japan?",
              "answer": "Tokyo",
              "explain": "Tokyo is the capital of Japan."
            }
          ]
        },
        {
          "title": "Chapter 1",
          "chapter": 2,
          "content": "Content of Chapter 1 in Sample Book 2.",
          "works": [
            {
              "type": "CODE",
              "code": "const z = 15;",
              "answer": "15",
              "explain": "Yet another code example.",
              "language": "javascript"
            },
            {
              "type": "QUESTION",
              "question": "Who wrote 'Romeo and Juliet'?",
              "answer": "William Shakespeare",
              "explain": "William Shakespeare wrote 'Romeo and Juliet'."
            }
          ]
        }
      ]
    }
  ]
}
`;

export const data: any = {
	book: [
		{
			title: 'Язык HTML',
			chapter: 1,
			part: 'html',
			content: `Язык HTML - это основа web сайтов`,
			parts: [
				{
					title: 'Introduction',
					chapter: 1.1,
					content: `Язык HTML - это основа web сайтов, с его помощью создается каркас страницы, которую вы видите в браузере. Если сравнивать страницу сайта и обычную бумажную книгу, то на сайте, как и в книге, есть абзацы и заголовки.
      <h3><Code>alert("abbb")</Code></h3>
В книге есть название всей книги (по сути самый главный заголовок), есть названия глав, параграфов в этих главах и так далее. Заголовки, абзацы и другие блоки можно выделить и на странице сайта. Это делается с помощью HTML тегов.`,
					works: [
						{
							type: BookTypeWork.CODE,
							code: 'const x = 5;',
							answer: '5',
							explain: 'This is a simple code example.',
							language: 'js',
						},
						{
							type: BookTypeWork.QUESTION,
							question: 'What is the capital of France?',
							answer: 'Paris',
							explain: 'Paris is the capital of France.',
						},
					],
				},
			],
		},
	],
};
