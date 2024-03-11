import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import DialogWrapper from '@/components/common/DialogWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Учебник по веб-разработке',
	description:
		'Руководство для изучения современных технологий по разработке сайтов на html, css, javascript.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`dark ${inter.className}`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
