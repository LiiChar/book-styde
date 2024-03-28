import { UserAnalitic } from '@/app/api/user/analitic/route';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HTMLProps } from 'react';

type Props = {
	user: UserAnalitic;
	className?: HTMLProps<HTMLOrSVGElement>['className'];
};

export const ListStats = ({ user, className }: Props) => {
	return (
		<div className={`${className} bg-accent rounded-md p-4`}>
			<Tabs defaultValue='chapters' className='w-full'>
				<TabsList className='bg-background'>
					<TabsTrigger
						className='hover:bg-accent [state=active]:bg-accent data-[state=active]:bg-accent'
						value='chapters'
					>
						Страница
					</TabsTrigger>
					<TabsTrigger
						className='hover:bg-accent [state=active]:bg-accent data-[state=active]:bg-accent'
						value='work'
					>
						Задания
					</TabsTrigger>
					<TabsTrigger
						className='hover:bg-accent [state=active]:bg-accent data-[state=active]:bg-accent'
						value='comment'
					>
						Комментарии
					</TabsTrigger>
				</TabsList>
				<TabsContent value='chapters'>
					{user.UserBook.map(ub => (
						<div key={ub.id}></div>
					))}
				</TabsContent>
				<TabsContent value='work'>
					{user.UserWork.map(uw => (
						<div key={uw.id}></div>
					))}
				</TabsContent>
				<TabsContent value='comment'>
					{user.comment.map(com => (
						<div key={com.id}>{com.content}</div>
					))}
				</TabsContent>
			</Tabs>
		</div>
	);
};
