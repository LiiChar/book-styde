import { v4 as uuidv4 } from 'uuid';
import { Entity, Id, Field } from 'nukak/entity';

@Entity()
export class User {
	@Id({ onInsert: uuidv4 })
	id?: string;

	@Field()
	name?: string;

	@Field()
	question?: string;

	@Field()
	key_word?: string;

	@Field({ onInsert: Date.now })
	created_at?: string;
}
