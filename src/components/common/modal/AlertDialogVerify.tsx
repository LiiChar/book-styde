'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { closeDialog, openDialog } from '@/lib/dialogs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function AlertDialogVerify({ onClose }: { onClose: () => void }) {
	function handleClose(): void {
		onClose();
	}

	function handleRegister(): void {
		openDialog('register');
		onClose();
	}

	return (
		<AlertDialog defaultOpen={true} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Хотите зарегестрироваться?</AlertDialogTitle>
					<AlertDialogDescription>
						Если вы зарегестрируйтесь, то сможете сохранять ваш прогресс,
						участвовать в совместных уроках и т.д.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Отмена</AlertDialogCancel>
					<AlertDialogAction onClick={handleRegister}>
						Продолжить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
