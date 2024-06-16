import { TeacherResponse } from '@/app/api/teacher/route';

const baseUrl = `${process.env.NEXT_PUBLIC_URL_SITE}/api`;

export const getTeacherGroup = async (): Promise<TeacherResponse> => {
	const responce = await fetch(baseUrl + '/teacher');
	return responce.json();
};
