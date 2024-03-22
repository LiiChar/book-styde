import type { Metadata } from 'next';
import { Gelasio } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Gelasio({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
});

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
				<SpeedInsights />
			</body>
		</html>
	);
}
