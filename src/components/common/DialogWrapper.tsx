'use client';
import { useDialogStore } from '@/store/DialogStore';

export default function DialogWrapper() {
	const { dialog } = useDialogStore();
	return (
		<>
			{dialog.map(Comp => (
				<Comp key={Comp.name} />
			))}
		</>
	);
}
