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

export function AlertDialogVerify() {
	const {} = useRouter();
	const pathname = usePathname();
	const { has, get } = useSearchParams();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (has('verify')) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [pathname]);

	function handleClose(): void {
		closeDialog('verify');
	}

	function handleRegister(): void {
		openDialog('register');
		closeDialog('verify');
	}

	return (
		<AlertDialog defaultOpen={false} open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Хотите зарегестрироваться?</AlertDialogTitle>
					<AlertDialogDescription>
						Если вы зарегестрируйтесь, то сможете сохранять ваш прогресс,
						участвовать в совместных уроках и т.д.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleRegister}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
