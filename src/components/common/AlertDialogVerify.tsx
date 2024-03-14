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
import { useDialogStore } from '@/store/DialogStore';
import { useRouter } from 'next/navigation';

export function AlertDialogRegister() {
	const router = useRouter();
	const { dialog, toggleDialog, closeDialog, openDialog } = useDialogStore();

	const handleRegister = () => {
		openDialog('register');
		closeDialog('verify');
	};

	const handleClose = () => {
		console.log('close');

		closeDialog('verify');
	};

	return (
		<AlertDialog open={true}>
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
