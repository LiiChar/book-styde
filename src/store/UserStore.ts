'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateUsername } from 'unique-username-generator';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '@/types/Book';

export interface UserStore {
	id: string;
	username: string;
	image: string;
	keyword: string;
	question: string;
	setQuestion: (question: string) => void;
	setUser: (user: UserStore) => void;
	setKeyword: (keyword: string) => void;
	setUsername: (username: string, keyword: string) => void;
}

export const useUserStore = create<UserStore>(set => ({
	id: '',
	username: '',
	image: `https://ui-avatars.com/api/?name=${''}`,
	question: '',
	keyword: '',
	setKeyword: keyword =>
		set(state => {
			state.keyword = keyword;
			return state;
		}),
	setQuestion: question =>
		set(state => {
			state.question = question;
			return state;
		}),
	setUser: user => set(() => {
		const newUser: UserStore = {
			...user,
image: `https://ui-avatars.com/api/?name=${user.username}`
		}
		return newUser
	}),
	setUsername: (username, keyword) =>
		set(() => {
			return {
				username: username,
				image: `https://ui-avatars.com/api/?name=${username}`,
				keyword: keyword,
			};
		}),
}));
