import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const hasRoleOrRedirectMain = (role: 'user' | 'admin') => {
	const user: User = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;
	console.log(user);

	if (!user) {
		return redirect('/');
	}

	if (user.role != role) {
		return redirect('/');
	}
};

export const getUser = (): User | null => {
	return cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;
};

export const isAuth = () => {
	const user: User = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (user) {
		return true;
	}

	return false;
};

export const isAdmin = () => {
	const user: User = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (user && user.role == 'admin') {
		return true;
	}

	return false;
};

export const isUser = () => {
	const user: User = cookies().has('user')
		? JSON.parse(cookies().get('user')?.value!)
		: null;

	if (user && user.role == 'user') {
		return true;
	}

	return false;
};
