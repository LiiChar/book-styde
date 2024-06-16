import { UserType } from '@/drizzle/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const hasRoleOrRedirectMain = (role: 'user' | 'admin') => {
	const user = getUser('user_private');
	if (!user) {
		return redirect('/');
	}

	if (user.role != role) {
		return redirect('/');
	}
};

type UserVariant = 'user' | 'user_private';

export const getUser = (user: UserVariant = 'user'): UserType | null => {
	return cookies().has(user) ? JSON.parse(cookies().get('user')?.value!) : null;
};

export const isAuth = () => {
	const user: UserType = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (user) {
		return true;
	}

	return false;
};

export const isAdmin = () => {
	const user: UserType = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (user && user.role == 'admin') {
		return true;
	}

	return false;
};

export const isUser = () => {
	const user: UserType = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (user && user.role == 'user') {
		return true;
	}

	return false;
};
