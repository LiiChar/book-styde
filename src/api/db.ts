import { Sqlite3QuerierPool } from 'nukak-sqlite';

export const querierPool = new Sqlite3QuerierPool({
	filename: './db.sqlite',
});
