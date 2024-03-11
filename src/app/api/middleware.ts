import { NextRequest, NextResponse } from 'next/server';
import { getQuerier, setQuerierPool } from 'nukak';
import { querierPool } from '@/api/db';
import { User } from '@/api/entity/user.entity';
import { Querier, Repository } from 'nukak/type';
import { UserBook } from '@/api/entity/user_book.entity';

export type Repos = {
	user: Repository<User>;
	user_book: Repository<UserBook>;
	query: Querier;
};

export type RepositoryNext = {
	repo: Repos;
};

export type NextWithRepo = NextResponse<unknown> & RepositoryNext;

export async function middleware(request: NextRequest) {
	setQuerierPool(querierPool);
	const query = await getQuerier();
	const userRep = query.getRepository(User);
	const userBookRep = query.getRepository(UserBook);

	const response: NextWithRepo = Object.assign(NextResponse.next(), {
		repo: {
			user: userRep,
			user_book: userBookRep,
			query: query,
		},
	});
	return response;
}
