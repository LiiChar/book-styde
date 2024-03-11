'use client';
import { create } from 'zustand';
import { AlertDialogRegister } from '@/components/common/AlertDialogVerify';
import { DialogKeyword } from '@/components/common/DialogKeyword';
import { DialogRegister } from '@/components/common/DialogRegister';

const dialogs = {
	verify: AlertDialogRegister,
	keyword: DialogKeyword,
	register: DialogRegister,
};

export interface DialogStore {
	dialog: (() => React.JSX.Element)[];
	openDialog: (dialog: keyof typeof dialogs) => void;
	closeDialog: (dialog: keyof typeof dialogs) => void;

	toggleDialog: (dialog: keyof typeof dialogs) => void;
}

export const useDialogStore = create<DialogStore>(set => ({
	dialog: [],
	openDialog: (dialog: keyof typeof dialogs) =>
		set(state => {
			const indexDialog = state.dialog.lastIndexOf(dialogs[dialog]);
			if (indexDialog != -1) {
				return state;
			} else {
				state.dialog.push(dialogs[dialog]);
			}
			return state;
		}),
	closeDialog: (dialog: keyof typeof dialogs) =>
		set(state => {
			const indexDialog = state.dialog.lastIndexOf(dialogs[dialog]);
			if (indexDialog != -1) {
				state.dialog.splice(indexDialog, 1);
			} else {
				return state;
			}
			return state;
		}),
	toggleDialog: (dialog: keyof typeof dialogs) =>
		set(state => {
			const indexDialog = state.dialog.lastIndexOf(dialogs[dialog]);
			if (indexDialog != -1) {
				state.dialog.splice(indexDialog, 1);
			} else {
				state.dialog.push(dialogs[dialog]);
			}
			return state;
		}),
}));
