'use client';
import { create } from 'zustand';
import { AlertDialogVerify } from '@/components/common/AlertDialogVerify';
import { DialogKeyword } from '@/components/common/DialogKeyword';
import { DialogRegister } from '@/components/common/DialogRegister';
import { useStoreSync } from '@/utils/useStoreSync';
import { createContext, useContext, useState } from 'react';

const dialogs = {
	verify: AlertDialogVerify,
	keyword: DialogKeyword,
	register: DialogRegister,
};

export interface DialogStore {
	dialog: (() => React.JSX.Element)[];
	openDialog: (dialog: keyof typeof dialogs) => void;
	closeDialog: (dialog: keyof typeof dialogs) => void;

	toggleDialog: (dialog: keyof typeof dialogs) => void;
}

// export const useDialogStores = create<DialogStore>(set => ({
// 	dialog: [],
// 	openDialog: (dialog: keyof typeof dialogs) =>
// 		set(state => {
// 			const indexDialog = state.dialog.lastIndexOf(dialogs[dialog]);
// 			if (indexDialog != -1) {
// 				return state;
// 			} else {
// 				state.dialog = [...state.dialog, dialogs[dialog]];
// 			}
// 			return state;
// 		}),
// 	closeDialog: (dialog: keyof typeof dialogs) =>
// 		set(state => {
// 			const indexDialog = state.dialog.lastIndexOf(dialogs[dialog]);
// 			if (indexDialog != -1) {
// 				state.dialog.splice(indexDialog, 1);
// 			} else {
// 				return state;
// 			}
// 			return state;
// 		}),
// 	toggleDialog: (dialog: keyof typeof dialogs) =>
// 		set(state => {
// 			const indexDialog = state.dialog.lastIndexOf(dialogs[dialog]);
// 			if (indexDialog != -1) {
// 				state.dialog.splice(indexDialog, 1);
// 			} else {
// 				state.dialog = [...state.dialog, dialogs[dialog]];
// 			}
// 			return state;
// 		}),
// }));

// const DialogContext = createContext<DialogStore>({
// 	dialog: [],
// 	openDialog: function (dialog: keyof typeof dialogs): void {
// 		throw new Error('Function not implemented.');
// 	},
// 	closeDialog: function (dialog: keyof typeof dialogs): void {
// 		throw new Error('Function not implemented.');
// 	},
// 	toggleDialog: function (dialog: keyof typeof dialogs): void {
// 		throw new Error('Function not implemented.');
// 	},
// });

// export const useDialogStore = () => {
// 	return useContext(DialogContext);
// };

// export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
// 	children,
// }) => {
// 	const [dialog, setDialogs] = useState<(() => React.JSX.Element)[]>([]);

// 	const openDialog = (dialog_req: keyof typeof dialogs) => {
// 		const indexDialog = dialog.find(dialogs[dialog_req]);
// 		if (!indexDialog) {
// 			setDialogs([...dialog, dialogs[dialog_req]]);
// 		}
// 	};
// 	const closeDialog = (dialog_req: keyof typeof dialogs) => {
// 		const indexDialog = dialog.find(dialogs[dialog_req]);
// 		if (indexDialog) {
// 			setDialogs(dialog.filter(el => el.name != indexDialog.name));
// 		}
// 	};

// 	const toggleDialog = (dialog_req: keyof typeof dialogs) => {
// 		const indexDialog = dialog.find(dialogs[dialog_req]);
// 		if (indexDialog) {
// 			setDialogs(dialog.filter(el => el.name != indexDialog.name));
// 		} else {
// 			setDialogs([...dialog, dialogs[dialog_req]]);
// 		}
// 	};

// 	const value = { openDialog, dialog, closeDialog, toggleDialog };

// 	return (
// 		<DialogContext.Provider value={value}>
// 			{children}
// 			{dialog.map((Comp, i) => (
// 				<Comp key={i} />
// 			))}
// 		</DialogContext.Provider>
// 	);
// };

// export const useDialogStores = create<DialogStore>(set => ({
// 	dialog: [],
// 	openDialog: (dialog: keyof typeof dialogs) =>
// 		set(state => {
// 			const indexDialog = state.dialog.lastIndexOf(dialogs[dialog]);
// 			if (indexDialog != -1) {
// 				return state;
// 			} else {
// 				state.dialog = [...state.dialog, dialogs[dialog]];
// 			}
// 			return state;
// 		}),
// 	closeDialog: (dialog: keyof typeof dialogs) =>
// 		set(state => {
// 			const indexDialog = state.dialog.lastIndexOf(dialogs[dialog]);
// 			if (indexDialog != -1) {
// 				state.dialog.splice(indexDialog, 1);
// 			} else {
// 				return state;
// 			}
// 			return state;
// 		}),
// 	toggleDialog: (dialog: keyof typeof dialogs) =>
// 		set(state => {
// 			const indexDialog = state.dialog.lastIndexOf(dialogs[dialog]);
// 			if (indexDialog != -1) {
// 				state.dialog.splice(indexDialog, 1);
// 			} else {
// 				state.dialog = [...state.dialog, dialogs[dialog]];
// 			}
// 			return state;
// 		}),
// }));

// export const useDialogStore = useStoreSync(useDialogStores, {
// 	dialog: [],
// 	openDialog: function (dialog: 'verify' | 'keyword' | 'register'): void {
// 		throw new Error('Function not implemented.');
// 	},
// 	closeDialog: function (dialog: 'verify' | 'keyword' | 'register'): void {
// 		throw new Error('Function not implemented.');
// 	},
// 	toggleDialog: function (dialog: 'verify' | 'keyword' | 'register'): void {
// 		throw new Error('Function not implemented.');
// 	},
// });
