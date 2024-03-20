import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getReadableBook, getUser } from '@/request/user';
import { User } from '@/types/User';
import { PrismaClient } from '@prisma/client';

export default async function Profile({ params }: { params: { id: string } }) {
	// const user: User = await getUser(params.id);
	const USER = new PrismaClient().users;
	const user = await USER.findFirst({
		where: {
			id: Number(params.id!),
		},
		select: {
			name: true,
			key_word: true,
			question: true,
			created_at: true,
			Comments: true,
			UserBooks: true,
			UserWork: true,
		},
	});

	if (!user) {
		return Error('Пользователь не найден');
	}

	return (
		<article>
			<section>
				<div>
					<div>
						<Avatar>
							<AvatarImage
								src={`https://ui-avatars.com/api/?name=${user.name}`}
							/>
							<AvatarFallback>{user.name}</AvatarFallback>
						</Avatar>
					</div>
					<div>
						<h3>{user.name}</h3>
					</div>
				</div>
			</section>
			<section>
				<div></div>
				<div></div>
				<div></div>
			</section>
		</article>
	);
}
