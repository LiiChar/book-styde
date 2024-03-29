import { UserAnalitic } from '@/app/api/user/analitic/route';
import { CircleChar } from '@/components/pages/profile/CircleChar';
import { ListStats } from '@/components/pages/profile/ListStats';
import { Resolve } from '@/components/pages/profile/Resolve';
import { TableVisit } from '@/components/pages/profile/TableVisit';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import { getReadableBook, getUser, getUserAnalitic } from '@/request/user';
import { User } from '@/types/User';
import { timer } from '@/utils/timer';
import { redirect } from 'next/navigation';

export default async function Profile({ params }: { params: { id: string } }) {
	const user: UserAnalitic = await getUserAnalitic(params.id);

	if (!user || ('type' in user && user.type == 'error')) {
		redirect('/?verify=true');
	}

	return (
		<article className='flex px-[10%] gap-4 mt-3'>
			<section className='w-1/4'>
				<aside className='bg-accent rounded-md p-4'>
					<div className='flex gap-2'>
						<div className='flex justify-center items-center'>
							<Avatar>
								<AvatarImage
									src={`https://ui-avatars.com/api/?name=${user.name}`}
								/>
								<AvatarFallback>{user.name}</AvatarFallback>
							</Avatar>
						</div>
						<div className='flex flex-col w-full h-full justify-between items-end'>
							<h3>{user.name}</h3>
							<p>1000</p>
						</div>
					</div>
					<Separator orientation='horizontal' className='bg-primary my-2' />
					<div>Достижения</div>
				</aside>
			</section>
			<section className='w-3/4'>
				<div className='flex gap-4'>
					<div className='w-1/2 bg-accent rounded-md p-4 flex gap-2'>
						<div className='w-1/3 flex justify-center shrink-1 relative items-center'>
							<CircleChar
								resolve={
									(360 / 100) *
									(+user.analitic.work.current / +user.analitic.work.all) *
									100
								}
								className='w-full'
							/>
							<div className='absolute left-1/2 group top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default text-center'>
								<div>
									<div className='text-[20px] font-medium text-label-1 dark:text-dark-label-1'>
										<span className='inline group-hover:stroke-white'>
											{user.analitic.work.current}
										</span>
										<span className='hidden group-hover:stroke-white'>
											{(+user.analitic.work.current / +user.analitic.work.all) *
												100}
											%
										</span>
									</div>
									<div className='whitespace-nowrap text-xs text-label-3 dark:text-dark-label-3'>
										решено
									</div>
								</div>
							</div>
						</div>
						<Resolve resolve={user.analitic.work} />
					</div>
					<div className='w-1/2 bg-accent rounded-md p-4 flex gap-2'>
						<div className='w-1/3 flex justify-center shrink-1 relative items-center'>
							<CircleChar
								resolve={
									(360 / 100) *
									(+user.analitic.work.current / +user.analitic.work.all) *
									100
								}
								className='w-full'
							/>
							<div className='absolute left-1/2 group top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default text-center'>
								<div>
									<div className='text-[20px] font-medium text-label-1 dark:text-dark-label-1'>
										<span className='inline group-hover:stroke-white'>
											{user.analitic.chapter.current}
										</span>
										<span className='hidden group-hover:stroke-white'>
											{(+user.analitic.chapter.current /
												+user.analitic.chapter.all) *
												100}
											%
										</span>
									</div>
									<div className='whitespace-nowrap text-xs text-label-3 dark:text-dark-label-3'>
										прочитано
									</div>
								</div>
							</div>
						</div>
						<Resolve resolve={user.analitic.chapter} />
					</div>
				</div>
				<div className='my-4 bg-accent rounded-md p-4'>
					<TableVisit visit={user.analitic.visiting} />
				</div>
				<ListStats user={user} />
			</section>
		</article>
	);
}
