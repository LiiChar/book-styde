import { User } from '../entity/user.entity';
import { getQuerier, setQuerierPool } from 'nukak';
import { querierPool } from '@/api/db';
import { UserBook } from '../entity/user_book.entity';
import { Repository } from 'nukak/type';
import { Repos, RepositoryNext } from '@/app/api/middleware';

export const createUser = async (user: User) => {
	const querier = await getQuerier();
	const id = await querier.insertOne(User, user);
	await querier.release();
	return id;
};

export const updateUser = async (user_id: string, user: User) => {
	setQuerierPool(querierPool);

	const querier = await getQuerier();

	const id = await querier.updateOneById(User, user_id as never, user);
	await querier.release();
	return id;
};

export const removeUser = async (user_id: string) => {
	setQuerierPool(querierPool);

	const querier = await getQuerier();
	const id = await querier.deleteOneById(User, user_id as never);
	await querier.release();
	return id;
};

export const addReadableBook = async (
	user_id: string,
	book_id: string,
	repo: Repos
) => {
	const id = await repo.user_book.updateOneById(user_id as never, {
		book_id,
		user_id,
	});
	return id;
};

export const getReadableBook = async (user_id: string, repo: Repos) => {
	const books_chapters = await repo.user_book.findMany({
		$project: {
			user_id,
		},
	});
	return books_chapters;
};
