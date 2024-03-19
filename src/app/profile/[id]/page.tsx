import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getReadableBook, getUser } from '@/request/user';
import { User } from '@/types/User';

export default async function Profile({ params }: { params: { id: string } }) {
	const user: User = await getUser(params.id);

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
