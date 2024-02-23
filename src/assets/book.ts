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
					title: 'Введение',
					chapter: 1.1,
					content: `<h3>Изучение HTML: руководства и уроки</h3>

<p>Чтобы создавать веб-сайты, вы должны знать о HTML — фундаментальной технологии, которая используется для определения структуры веб-страницы. HTML применяется для того, чтобы определить как должен отображаться ваш контент: в виде абзаца, списка, заголовка, ссылки, изображения, мультимедийного проигрывателя, формы или же в виде одного из множества других доступных элементов, а также возможного нового элемента, который вы сами создадите.</p>

<h3>Путь обучения (образовательная траектория)</h3>

<p>В идеале вы должны начать своё учебное путешествие с изучения HTML. Начните с прочтения раздела "Введение в HTML". Затем вы можете перейти к изучению более продвинутых тем, таких как:</p>

<ul>
  <li><strong>CSS (Каскадные таблицы стилей)</strong>, и как их использовать для оформления (стилизации) HTML-документа (например, изменение шрифта и его размера, добавление границы и теней для элементов, разбиение страницы на несколько столбцов, добавление анимации и других визуальных эффектов).</li>
  <li><strong>JavaScript</strong>, и как его использовать для придания динамической функциональности веб-страницам (например, определение вашего местоположения и отображение его на карте, создание элементов, которые будут появляться/исчезать при нажатии на кнопку, сохранение данных пользователей локально на их компьютерах и многое другое).</li>
</ul>

<p>Прежде чем приступить к этой теме, вы должны иметь хотя бы базовое представление об использовании компьютеров вообще и уметь "пассивно" использовать Интернет (т.е. уметь просматривать веб-страницы, быть потребителем контента). У вас должна быть базовая рабочая среда, описанная в разделе "Установка базового программного обеспечения", а также вы должны понимать, как создавать файлы и управлять ими, что подробно описано в разделе "Работа с файлами" — обе статьи являются частью нашего модуля для новичков - "Начало работы с вебом".</p>

<p>Перед тем, как начать эту тему, рекомендуется пройтись по разделу "Начало работы с вебом", однако это необязательно; многое из того, что описано в статье "Основы HTML", также рассматривается и во "Введении в HTML", причём даже более подробно.</p>
`,
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
