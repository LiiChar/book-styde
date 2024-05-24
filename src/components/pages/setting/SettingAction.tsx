import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getOrCreateSettingCookies } from '@/lib/settings';
import { setConfig } from 'next/config';
import { useRouter } from 'next/navigation';
import React from 'react';

export const SettingAction = () => {
	const toast = useToast();
	const config = getOrCreateSettingCookies();
	const router = useRouter();

	const handleReject = () => {
		setConfig(config);
		toast.toast({
			title: 'Изменения отменены',
		});
		router.refresh();
	};

	const handleSave = () => {
		toast.toast({
			title: 'Изменения сохранены',
		});
		router.refresh();
	};

	return (
		<div className='flex h-full justify-between'>
			<Button variant={'outline'} className='h-full' onClick={handleReject}>
				Отменить
			</Button>
			<Button variant={'outline'} className='h-full' onClick={handleSave}>
				Сохранить
			</Button>
		</div>
	);
};
