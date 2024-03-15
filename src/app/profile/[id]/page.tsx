import { USER, User } from '@/app/api/user/route';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useHidration from '@/hooks/useHidration';
import { getReadableBook, getUser } from '@/request/user';
import { useUserStore } from '@/store/UserStore';
import { Book } from '@/types/Book';

export default async function Profile({ params }: { params: { id: string } }) {
	console.log(params.id, USER);

	const user: User = await getUser(params.id);

	console.log(user);

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
				{/* {readable_page.map(page => (
					<div>{page}</div>
				))} */}
			</section>
		</article>
	);
}
