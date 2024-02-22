'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateUsername } from 'unique-username-generator';

interface UserStore {
	username: string;
	image: string;
	keyword: string;
	setUsername: (username: string, keyword: string) => void;
}

const username = generateUsername();

export const useUserStore = create<UserStore>()(
	persist(
		set => ({
			username: username,
			image: `https://ui-avatars.com/api/?name=${username}`,
			keyword: username,

			setUsername: (username, keyword) =>
				set(() => {
					return {
						username: username,
						image: `https://ui-avatars.com/api/?name=${username}`,
						keyword: keyword,
					};
				}),
		}),
		{
			name: 'user',
		}
	)
);
