'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className='flex justify-center items-center w-screen h-[calc(100vh-48px)]'>
			<div className='border-[1px] rounded-md p-4'>
				<h3>Что-то пошло не так.</h3>
				<p>
					Произошла ошибка сервера. В будущем это будет исправлено.
					<br /> Пожалуйства, нажмите на ссылку чтобы вернуться назад или
					повторить попытку
				</p>
				<div className='flex justify-between'>
					<Button onClick={() => router.back()}>Вернуться назад</Button>
					<Button onClick={() => router.refresh()}>Повторить попытку</Button>
				</div>
			</div>
		</div>
	);
}
