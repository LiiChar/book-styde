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

export const data: Books = {
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

                    <p>Перед тем, как начать эту тему, рекомендуется пройтись по разделу "Начало работы с вебом", однако это необязательно; многое из того, что описано в статье "Основы HTML", также рассматривается и во "Введении в HTML", причём даже более подробно.</p>`,
					works: [],
				},
				{
					title: 'Что внутри "head"? Метаданные в HTML',
					chapter: 1.2,
					content: `<p>Элемент head HTML-документа не отображается на странице в веб-браузере. Он     с         одержит такую информацию, как:</p>
                    <ul>
                      <li>заголовок (title) страницы</li>
                      <li>ссылки на файлы CSS (если вы хотите применить к вашему HTML стили CSS)</li>
                      <li>ссылки на иконки</li>
                      <li>другие метаданные (данные о HTML: автор и важные ключевые слова, описывающие документ.)</li>
                    </ul>
                    <p>В этой статье мы рассмотрим всё вышеперечисленное и многое другое, чтобы дать вам хорошую основу для работы с разметкой.</p>
                    <h3>Предварительные требования:</h3>
                    <p>Базовое знакомство с HTML, описанное в <a href="#">Начало работы с HTML</a>.</p>
                    <h3>Задача:</h3>
                    <p>Узнать о заголовке HTML, его значении, важнейших элементах, которые содержатся в нём, и о том, как он может повлиять на HTML-документ.</p>
                    <h3>Что такое ?</h3>
                    <p>Давайте снова посмотрим на HTML-документ из прошлой статьи:</p>
                    <Code language="markup" compile={false} disable={true}>
                    <head>
                      <meta charset="utf-8" />
                      <title>Моя тестовая страница</title>
                    </head>
                    </Code>
                    <p>Содержимое , в отличие от содержимого элемента body, не отображается на странице. Задача  — хранить метаданные документа. В приведённом выше примере  совсем небольшой:</p>
                    <Code language="markup" compile={false} disable={true}>
                    <head >
                      <meta charset=utf-8></meta>
                      <title >Моя тестовая страница</title>
                    </head>
                    <body >
                      <p>Это — моя страница</p>
                    </body>
                    </Code>
                    <p>Однако на больших страницах блок  может быть довольно объёмным. Попробуйте зайти на какие-нибудь из ваших любимых сайтов и посмотреть содержимое  с помощью инструментов разработчика. Наша цель сейчас — не в том, чтобы показать вам, как использовать всё, что только можно добавить в head, а дать представление и научить вас, как использовать основные элементы. Давайте начнём.</p>
                    <h3>Название страницы (title)</h3>
                    <p>Мы уже видели, как работает элемент title: его используют для добавления заголовка (названия страницы) в документ. Элемент h1 (en-US) тоже иногда называют заголовком страницы. Но это разные вещи!</p>
                    <ul>
                      <li>Элемент h1 (en-US) виден на странице, открытой в браузере, — его используют один раз на странице, чтобы выделить название содержимого. Это может быть название истории, заголовок новости или что-то в этом роде.</li>
                      <li>Элемент title — метаданные, название всего HTML-документа, а не заголовок внутри его содержимого.</li>
                    </ul>
                    <h3>Активное изучение: разбор простого примера</h3>
                    <p>Чтобы приступить к активному изучению, скачайте страницу title-example.html из нашего GitHub-репозитория. Это можно сделать двумя способами:</p>
                    <ol>
                      <li>Скопируйте и вставьте код страницы в новый текстовый файл в своём редакторе кода, затем сохраните его в любом удобном месте.</li>
                      <li>Нажмите на странице кнопку "Raw", нажмите Файл > Сохранить Как... в меню браузера и выберите папку для сохранения.</li>
                    </ol>
                    <p>Откройте файл в браузере. Вы увидите что-то вроде этого:<em>A simple web page with the title set to 'title' element, and the 'h1' set to 'h1' element.</em></p>
                    <p>Теперь должно стать совершенно ясно, в чём разница между h1 и title!</p>
                    <p>Откройте код страницы в редакторе, измените содержимое элементов и обновите страницу в браузере. Развлекайтесь!</p>
                    <p>Содержимое элемента title используется и в других местах. Например, при добавлении страницы в избранное (Bookmarks > Bookmark This Page в Firefox), текст из title предлагается в качестве названия закладки.</p>

                    <p>Текст из title также появляется в результатах поиска, как мы скоро увидим.</p>
                    <h3>Метаданные: Элемент meta</h3>
                    <p>Метаданные — данные, которые описывают данные. У HTML есть «официальное» место для метаданных документа — элемент meta. Конечно, другие вещи, о которых мы говорим в этой статье, тоже можно назвать метаданными. Существует множество разновидностей meta. Не станем пытаться охватить их все сразу — так недолго и запутаться, а рассмотрим несколько самых популярных, чтобы разобраться, что к чему.</p>
                    <h3>Указываем кодировку текста документа</h3>
                    <p>В заголовке примера выше есть следующая строка:</p>
                    <Code language="markup" compile={false} disable={true}>
                      <meta charset="utf-8"/>
                    </Code>
                    <p>В этом элементе указана кодировка документа — набор символов, которые в нём можно использовать. utf-8 — универсальный набор символов, который включает почти все символы со всех языков человечества. Такая веб-страница сможет работать с любым языком. Установить эту кодировку на всех веб-страницах, которые вы создаёте — отличная идея! Страница в такой кодировке прекрасно отображает как английские, так и японские символы:</p>

                    <p>Если использовать, скажем, кодировку ISO-8859-1 (набор символов для латиницы), текст страницы испортится:</p>

                    <p>Примечание: Некоторые браузеры (например, Chrome) автоматически исправляют неправильную кодировку, поэтому, в зависимости от используемого вами браузера, вы можете не увидеть эту проблему. Несмотря на это вам всё равно необходимо указывать кодировку UTF-8 для вашей страницы, чтобы избежать возможных проблем в других браузерах.</p>
                    <h3>Активное изучение: экспериментируем с символьными кодировками</h3>
                    <p>Чтобы проверить это, вернитесь к HTML из примера title (странице title-example.html), поменяйте meta charset на ISO-8859-1 и попробуйте написать что-нибудь на японском или русском. Вот текст из нашего примера (кстати, там написано «рис горячий»):</p>`,
					works: [
						{
							type: BookTypeWork.CODE,
							code: `
              const x = 5;
              console.log(x);
              `,
							answer: '5',
							explain:
								'В переменную x положили значение 5, после вызова метода log из объекта console, в консоль выводиться значение 5',
							language: 'javascript',
							question: 'Что выведет данный код?',
						},
						{
							type: BookTypeWork.QUESTION,
							question: 'Для чего нужент мета тег title?',
							answer: 'Указание названия страницы',
							explain:
								'Мы уже видели, как работает элемент title: его используют для добавления заголовка (названия страницы) в документ.',
							variant: [
								'Указание названия страницы',
								'Указание описания страницы',
								'Для указания ключевого слова',
							],
						},
					],
				},
				{
					title: 'Основы редактирования текста в HTML',
					chapter: 1.3,
					content: `
          Одна из основных задач HTML — придавать тексту структуру и смысл, семантику, так, чтобы браузер смог отобразить текст корректно. Эта статья покажет, как можно использовать HTML, чтобы упорядочить текст на странице путём добавления заголовков и абзацев, выделения слов, создания списков и многое другое.

В HTML каждый абзац заключён в элемент p, подобно:

<code language="markup" disable={true}>
<p>Я параграф, да, это я.</p>
</code>
Каждый заголовок заключён в элемент заголовка h1 (en-US):
<code language="markup" disable={true}>
<h1>Я заголовок истории.</h1>
</code>
Имеется шесть элементов заголовка: h1 (en-US), h2 (en-US), h3 (en-US), h4 (en-US), h5 (en-US) и h6 (en-US). Каждый элемент представляет разный уровень контента в документе; <h1> представляет главный заголовок, h2> представляет подзаголовки, h3 представляет под-подзаголовки и так далее.

<h3>Создание иерархической структуры</h3>
Например, в рассказе h1> будет представлять заглавие рассказа, h2 обозначит название каждой главы, h3 будет обозначать подзаголовки в каждой главе и так далее.

<code language="markup" disable={true}>
<h1>Сокрушительная скука</h1>
<p>Крис Миллс</p>
<h2>Глава 1: Тёмная ночь</h2>
<p>Это была тёмная ночь. Где-то кричала сова. Дождь обрушился на ...</p>
<h2>Глава 2: Вечное молчание</h2>
<p>Наш главный герой ничего не мог, когда шёпот из тёмной фигуры ...</p>
<h3>Призрак говорит</h3>
<p>Прошло ещё несколько часов, когда внезапно призрак выпрямился и воскликнул:«Пожалуйста, помилуй мою душу!»</p>
</code>
Всё это действительно зависит от вас — что именно будут представлять собой элементы, пока существует иерархия. Вам просто нужно иметь в виду несколько хороших правил при создании таких структур.
<ul>
<li>Предпочтительнее использовать h1 только один раз на странице — это заголовок самого верхнего уровня, и все остальные заголовки располагаются ниже его в иерархии.</li>
<li>Убедитесь, что вы используете заголовки в правильном порядке в иерархии. Не используйте h3 для создания подзаголовков при одновременном использовании h2 для представления под-подзаголовков — это не имеет смысла и приведёт к странным результатам.</li>
<li>Из шести доступных уровней заголовка вы должны стремиться использовать не более трёх на странице, если только вы не чувствуете, что это необходимо. Документы с большим количеством уровней (то есть с глубокой иерархией) становятся громоздкими и трудными для навигации. В таких случаях рекомендуется распределять контент по нескольким страницам, если это возможно.</li>
</ul>
<h3>Зачем нам необходима структура?</h3>
Чтобы ответить на этот вопрос, давайте посмотрим на text-start.html — отправную точку нашего примера для этой статьи (хороший рецепт хумуса). Вы должны сохранить копию этого файла на своём локальном компьютере, так как вам понадобится это для упражнений позже. Сейчас тело этого документа содержит несколько фрагментов контента — они не отмечены каким-либо образом, но они разделены разрывами строк (был нажат Enter / Return для перехода на следующую строку).

Однако, когда вы откроете документ в своём браузере, вы увидите, что текст выглядит как один большой кусок!

Это связано с тем, что нет элементов для создания структуры контента, поэтому браузер не знает, где здесь заголовок и где абзац. Более того:

<ul>
<li>Пользователи, просматривающие веб-страницу, быстро сканируют её в поиске подходящего контента, часто просто просматривая только заголовки (мы обычно тратим очень мало времени на веб-странице). Если они не смогут увидеть ничего полезного в течение нескольких секунд, они, скорее всего, расстроятся и отправятся куда-нибудь ещё.</li>
<li>Поисковые системы, индексирующие вашу страницу, считают содержание заголовков важными ключевыми словами для влияния на ранжирование поиска страницы. Без заголовков ваша страница будет плохо работать с точки зрения SEO (Search Engine Optimization — поисковая оптимизация).</li>
<li>Сильно слабовидящие люди часто не читают веб-страницы — они слушают их вместо этого. Это делается с помощью программного обеспечения, называемого программой чтения с экрана. Это программное обеспечение предоставляет способы быстрого доступа к данному текстовому контенту. Среди различных используемых методов они предоставляют схему документа, считывая заголовки, позволяя своим пользователям быстро находить нужную им информацию. Если заголовки недоступны, они будут вынуждены слушать весь документ вслух.</li>
<li>Чтобы стилизовать контент с помощью CSS или сделать его интересным с помощью JavaScript, вам нужно, чтобы элементы обёртывали соответствующий контент, чтобы CSS и JavaScript смогли эффективно работать.</li>
<li>Поэтому нужно дать структурную разметку нашему контенту.</li>
</ul>

<h3>Активное изучение: создание структуры для нашего контента</h3>
Давайте рассмотрим это на живом примере. В приведённом ниже примере добавьте элементы в исходный текст в поле «Редактируемый код», чтобы он отображался как заголовок и два абзаца в поле «Результат».

Если вы допустили ошибку, вы всегда можете сбросить её с помощью кнопки Сбросить. Если вы застряли, нажмите кнопку Показать решение, чтобы увидеть ответ.

Почему мы нуждаемся в семантике?
Семантика проявляется всюду вокруг нас — мы полагаемся на опыт, который рассказывает нам, какова функция бытовых предметов; когда мы что-то видим, мы знаем, какова его функция. Так, например, мы ожидаем, что красный свет на светофоре означает «стоп», а зелёный свет означает «идти». Жизнь станет очень сложной, если применяется неправильная семантика (какие-либо страны используют красный цвет для обозначения «идти»? Надеюсь, что нет.)

В подобном ключе нам нужно убедиться, что мы используем правильные элементы, придавая нашему контенту правильное значение, функцию или внешний вид. В этом контексте элемент <h1> (en-US) также является семантическим элементом, который даёт тексту, который он обёртывает, роль (или значение) «заголовка верхнего уровня на вашей странице».

<code language="markup" disable={true}>
<h1>Это заголовок верхнего уровня</h1>
</code>
По умолчанию браузер придаст ему большой размер шрифта, чтобы он выглядел как заголовок (хотя вы можете стилизовать его как угодно, используя CSS). Что ещё более важно, его семантическое значение будет использоваться несколькими способами, например, поисковыми системами и программами чтения с экрана (как упоминалось выше).

С другой стороны, вы можете сделать любой элемент похожим на заголовок верхнего уровня. Рассмотрим следующее:

<code language="markup" disable={true}>
<span style="font-size: 32px; margin: 21px 0;"
  >Это заголовок верхнего уровня?</span
>
</code>
Это элемент <span>. У него нет семантики. Вы используете его, когда хотите применить к контенту CSS (или сделать что-то с ним с помощью JavaScript), не придавая ему никакого дополнительного значения (об этом вы узнаете позже). Мы применили CSS, чтобы он выглядел как заголовок верхнего уровня, но поскольку он не имеет семантического значения, он не получит никаких дополнительных преимуществ, описанных выше. Рекомендуется использовать соответствующий элемент HTML на практике.

Списки
Теперь обратим наше внимание на списки. Списки есть везде вокруг нас — от вашего списка покупок до списка направлений, которым вы подсознательно следуете, чтобы каждый день добраться домой, и списка инструкций, которые вы выполняете в этом руководстве! Списки используются всюду в Интернете, и мы рассмотрим три разных типа списков.

Неупорядоченные
Неупорядоченные списки используются для элементов, для которых порядок не имеет значения, — возьмём, к примеру, список покупок:
<code language="markup" disable={true}>
молоко
яйца
хлеб
хумус
</code>
Каждый неупорядоченный список начинается с элемента ul (unordered list) — он обёртывает все элементы списка: молоко, яйца, хлеб, хумус.

Последний шаг состоит в том, чтобы обернуть каждый элемент списка в элемент li (элемент списка):

<code language="markup" disable={true}>
<ul>
  <li>молоко</li>
  <li>яйца</li>
  <li>хлеб</li>
  <li>хумус</li>
</ul>
</code>
Активное изучение: разметка неупорядоченного списка
Попробуйте отредактировать образец ниже, чтобы создать свой собственный неупорядоченный список HTML.

Упорядоченные
Упорядоченные списки — это списки, в которых порядок элементов имеет значение, — возьмём в качестве примера маршрут следования:

<code language="markup" disable={true}>
Двигайтесь до конца дороги
Поверните направо
Езжайте прямо через первые два перекрёстка с круговым движением
Поверните налево на третьем перекрёстке
Школа справа от вас, 300 метров вверх по дороге
</code>
Структура разметки такая же, как для неупорядоченных списков, за исключением того, что вы должны обернуть элементы списка в элемент ol (ordered list), а не ul:

<code language="markup" disable={true}>
<ol>
  <li>Двигайтесь до конца дороги</li>
  <li>Поверните направо</li>
  <li>Езжайте прямо через первые два перекрёстка с круговым движением</li>
  <li>Поверните налево на третьем перекрёстке</li>
  <li>Школа справа от вас, в 300 метрах вверх по дороге</li>
</ol>
</code>
Активное изучение: разметка упорядоченного списка
Попробуйте отредактировать образец ниже, чтобы создать свой собственный упорядоченный список HTML.

Play

Активное изучение: разметка собственной страницы рецептов
Итак, в этот момент в статье у вас есть вся необходимая информация, чтобы разметить наш пример страницы рецепта. Вы можете либо сохранить локальную копию исходного файла text-start.html и выполнить в нём работу, либо сделать это в приведённом ниже примере. Делать это локально, вероятно, будет лучше, так как тогда вы сможете сохранить работу, которую вы делаете, тогда как если вы её добавите в редактируемый пример, она будет потеряна при следующем открытии страницы. У обоих способов есть плюсы и минусы.

Play

Если вы застряли, вы всегда можете нажать кнопку Показать решение или проверить наш пример text-complete.html в нашем реестре github.

Вложенные списки
Вполне нормально вложить один список в другой. Возможно, вы захотите, чтобы один список располагался внутри другого. Давайте возьмём второй список из нашего примера рецепта:

<code language="markup" disable={true}>
<ol>
  <li>Очистите чеснок от кожуры и крупно нарежьте.</li>
  <li>Удалите стебель и семена у перца; крупно нарежьте перец.</li>
  <li>Добавьте все ингредиенты в пищевой комбайн.</li>
  <li>Измельчите все ингредиенты до состояния пасты.</li>
  <li>Если вы хотите "грубый" хумус, измельчайте пару минут.</li>
  <li>Если вам нужен гладкий хумус, измельчайте дольше.</li>
</ol>
</code>
Поскольку последние две строки очень тесно связаны с тем, что было до них (они читаются как вспомогательные инструкции или варианты, которые подходят под этой маркой), может иметь смысл вложить их в свой собственный неупорядоченный список и поместить этот список внутри текущего. Это будет выглядеть так:

<code language="markup" disable={true}>
<ol>
  <li>Очистите чеснок от кожуры и крупно нарежьте.</li>
  <li>Удалите стебель и семена у перца; крупно нарежьте перец.</li>
  <li>Добавьте все ингредиенты в пищевой комбайн.</li>
  <li>
    Измельчите все ингредиенты до состояния пасты.
    <ul>
      <li>Если вы хотите "грубый" хумус, измельчайте пару минут.</li>
      <li>Если вам нужен гладкий хумус, измельчайте дольше.</li>
    </ul>
  </li>
</ol>
</code>
Попробуйте вернуться к предыдущему примеру активного обучения и обновить второй список.

Акцент и важность
В обиходе мы часто подчёркиваем определённые слова, чтобы изменить смысл предложения и мы часто хотим отметить некоторые слова как важные или разные в некотором роде. HTML предоставляет различные семантические элементы, позволяющие нам добавлять текстовые материалы с такими эффектами, и в этом разделе мы рассмотрим несколько наиболее распространённых.

Акцент
Когда мы хотим добавить акцент в разговорный язык, мы подчёркиваем определённые слова, тонко изменяя смысл того, что мы говорим. Точно так же на письменном языке мы склонны подчёркивать слова, выделяя их курсивом. Например, следующие два предложения имеют разные значения.

Я рад, что ты не опоздал.

Я рад, что ты не опоздал.

В первом предложении звучит искреннее облегчение, что человек не опоздал. Во втором, напротив, звучит сарказм или пассивная агрессия: так выражена досада от того, что человек немного опоздал.

В таких случаях в HTML используется элемент em (выделение). Кроме того, чтобы сделать документ более интересным для чтения, они распознаются программами, считывающими с экрана, и произносятся другим тоном. Браузеры стилизуют это по умолчанию курсивом, но вы можете не использовать этот тег, чтобы получить курсив. Для выделения курсивом вы можете использовать элемент span и CSS или элемент em:

<code language="markup" disable={true}>
<p>Я <em>рад</em>, что ты не <em>опоздал</em>.</p>
</code>
Важное значение
<attention>Чтобы подчеркнуть важные слова, мы склонны подчёркивать их в устной речи и выделять жирным в письменном языке. Например:

Эта жидкость очень токсична.

Я рассчитываю на тебя. Не опаздывай!
</attention>

В таких случаях в HTML используется элемент strong (важное значение). Помимо того, что документ становится более полезным, они распознаются программами, считывающими с экрана, и говорят другим тоном. Браузеры стилизуют это как полужирный текст по умолчанию, но вы можете не использовать этот тег, чтобы получить жирный шрифт. Для получения жирного шрифта вы можете использовать элемент span и CSS или элемент strong:

<code language="markup" disable={true}>
<p>Эта жидкость <strong>очень токсична</strong>.</p>
</code>

<p>Я рассчитываю на тебя. <strong>Не опаздывай</strong>!</p>
При желании вы можете вложить важные и акцентированные слова друг в друга:

<code language="markup" disable={true}>
<p>
  Эта жидкость <strong>очень токсична</strong> — если ты выпьешь её, <strong>то можешь <em>умереть</em></strong>.
</p>
</code>
Активное изучение: Давайте будем важны!
В этом разделе активного обучения мы предоставили редактируемый пример. Внутри него мы хотели бы, чтобы вы попытались добавить акцент и большую важность для слов, которые, по вашему мнению, им нужны, просто для того, чтобы попрактиковаться.

<h3>Курсив, жирный шрифт, подчеркивание</h3>
Элементы, которые мы обсуждали до сих пор, имеют чёткую привязку к семантике. Ситуация с b, i
(en-US) и u (en-US) несколько сложнее. Они появились в эпоху, когда CSS поддерживался плохо или вообще не поддерживался, чтобы люди могли писать жирный текст, курсив или подчёркнутый текст. Такие элементы, которые влияют только на внешний вид, а не на семантику, известны как элементы представления и больше не должны использоваться, поскольку, как мы видели ранее, семантика очень важна для доступности людям с ограниченными возможностями, SEO и так далее.

HTML5 переопределил b, i и u с новыми, несколько запутанными, семантическими ролями.

Вот хорошее правило: предпочтительней использовать b, i или u для передачи значения, традиционно передаваемого жирным шрифтом, курсивом или подчёркиванием, при условии, что нет более подходящего элемента. Тем не менее, всегда важно сохранить менталитет доступности. Концепция курсива не очень помогает людям, использующим устройства для чтения с экрана, или людям, использующим систему письма, отличную от латинского алфавита.

<ul>
<li>i (en-US) используется для передачи значения, традиционно передаваемого курсивом: иностранные слова, таксономические обозначения, технические термины, мысли ...</li>
<li>b используется для передачи значения, традиционно передаваемого жирным шрифтом: ключевые слова, названия продуктов, предложения ...</li>  
<li>u (en-US) используется для передачи значения, традиционно передаваемого подчёркиванием: имя собственное, орфографическая ошибка ...</li>
</ul>
Примечание: Предупреждение о подчёркивании: люди сильно ассоциируют подчёркивание с гиперссылками. Поэтому в Интернете лучше всего подчеркнуть только ссылки. Используйте элемент u, когда он семантически подходит, но подумайте о том, чтобы использовать CSS для изменения подчёркивания по умолчанию для чего-то более подходящего в Интернете. Пример ниже иллюстрирует, как это можно сделать.

<code language="markup" disable={true}>
<!-- Научные наименования -->
<p>
  Колибри обыкновенный (<i>архилоус обыкновенный</i>) — наиболее часто
  встречающийся вид колибри в северо-восточной Америке.
</p>
<!-- Иностранные слова -->
<p>
  Случился прилив иностранных слов, таких как <i lang="uk-latn">vatrushka</i>,
  <i lang="id">nasi goreng</i> и <i lang="fr">soupe à l'oignon</i>.
</p>
<!-- Явно неправильное произношение или написание -->
<p>Когда-нибудь я узнаю, как <u>гаварить</u> без ошибок.</p>
<!-- Выделение ключевых слов в инструкциях -->
<ol>
  <li><b>Отрежьте</b> два ломтика хлеба.</li>
  <li><b>Добавьте</b> кусочек помидора и лист латука между ломтями хлеба.</li>
</ol>
</code>
<h3>Заключение</h3>
Вот и всё! Эта статья должна была дать вам хорошее представление о том, как начать разметку текста в HTML, и познакомить вас с некоторыми из наиболее важных элементов в этой области. В этой области есть намного больше семантических элементов, и мы рассмотрим их в нашей статье «Больше семантических элементов» позже в курсе. В следующей статье мы подробно рассмотрим, как создавать гиперссылки, возможно, самый важный элемент в Интернете.
          `,
					works: [],
				},
			],
		},
	],
};
