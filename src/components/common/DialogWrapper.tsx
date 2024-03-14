'use client';
import { useDialogStore } from '@/store/DialogStore';

export default function DialogWrapper() {
	const { dialog } = useDialogStore();

	console.log(dialog);

	return (
		<>
			{dialog.map(Comp => (
				<Comp key={Comp.name} />
			))}
		</>
	);
}
