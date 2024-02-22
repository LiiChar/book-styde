import { SearchBook } from '@/components/common/SearchBook';
import { BookNavigation } from '@/components/pages/main/BookNavigation';

export default function Home() {
	return (
		<main className='p-8'>
			<header>
				<h1>Design and Programming Book</h1>
				<p>By Your Name</p>
			</header>
			<SearchBook />
			<section>
				<h2>About the Book</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
					lectus nec justo ultricies dignissim. Integer vehicula, lacus ac
					sagittis consectetur, nisi ligula congue velit, in eleifend elit justo
					et urna.
				</p>
			</section>
			<BookNavigation />
		</main>
	);
}
