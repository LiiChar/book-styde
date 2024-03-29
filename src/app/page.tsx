import { Focus } from '@/components/common/Focus';
import { SearchBook } from '@/components/common/SearchBook';
import { BookNavigation } from '@/components/pages/main/BookNavigation';

export default function Home() {
	return (
		<main className='p-8'>
			<header className='flex justify-center items-center mb-4'>
				<h1 className='text-3xl'>Книга дизайна и программирования.</h1>
				<Focus x={50} y={50} />
			</header>
			<SearchBook className='mb-2' />
			<section>
				<h2 className='text-2xl '>Цель создания сайта:</h2>
				<article>
					<p>
						Хотите углубиться в мир веб-разработки и освоить создание
						качественных веб-сайтов? Наш сайт предлагает обширный материал по
						HTML, CSS и JavaScript, который подходит как для начинающих, так и
						для опытных разработчиков. Мы предлагаем обширный каталог уроков,
						практических заданий и проектов, чтобы вы могли освоить основы и
						продвинутые техники веб-программирования.
					</p>
					<p>
						На нашем сайте вы найдете не только теоретические материалы, но и
						множество практических примеров и руководств, которые помогут вам
						лучше понять принципы веб-разработки и применить их на практике. Мы
						также предлагаем поддержку со стороны сообщества и возможность
						обмена опытом с другими участниками. Благодаря нашему интерактивному
						подходу к обучению вы сможете не только усвоить основы HTML, CSS и
						JavaScript, но и научиться создавать стильные, адаптивные и
						интерактивные веб-сайты. Начните свой путь в веб-разработке прямо
						сейчас и раскройте свой потенциал в создании уникальных
						онлайн-проектов!
					</p>
				</article>
			</section>
			<BookNavigation accardion={true} />
		</main>
	);
}
