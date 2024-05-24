import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cookies } from 'next/headers';
import { ParicleConnectionBackground } from '@/components/common/background/ParicleConnectionBackground';
import { Toaster } from '@/components/ui/toaster';
import { Background } from '@/components/common/background/Background';

const inter = Open_Sans({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic'],
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
			<body className={`${cookies().get('theme')?.value} ${inter.className}`}>
				<Header />
				{children}
				<SpeedInsights />
				<Background />
				<Toaster />
			</body>
		</html>
	);
}
