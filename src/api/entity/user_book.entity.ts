import { v4 as uuidv4 } from 'uuid';
import { Entity, Id, Field, getMeta } from 'nukak/entity';

@Entity()
export class UserBook {
	@Id({ onInsert: uuidv4 })
	id?: string;

	@Field()
	user_id?: string;

	@Field()
	book_id?: string;

	@Field({ onInsert: Date.now })
	created_at?: string;
}
