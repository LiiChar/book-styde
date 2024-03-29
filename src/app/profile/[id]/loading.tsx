import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

const LoadingProfile: FC = () => {
	return (
		<article className='flex px-[10%] gap-4 mt-3'>
			<section className='w-1/4'>
				<aside className='bg-accent rounded-md p-4'>
					<div className='flex gap-2'>
						<Skeleton className='rounded-[50%] bg-primary w-[40px] h-[40px]' />
						<div className='flex flex-col justify-between items-end w-2/3 h-[40px]'>
							<Skeleton className='bg-primary w-full h-5' />
							<Skeleton className='bg-primary w-1/3 h-4' />
						</div>
					</div>
					<Separator orientation='horizontal' className='bg-primary my-4' />
					<Skeleton className='bg-primary w-full h-5' />
				</aside>
			</section>
			<section className='w-3/4'>
				<div className='flex gap-4 h-[105px]'>
					<div className='w-1/2 bg-accent rounded-md h-full items-center p-4 flex gap-2'>
						<Skeleton className='rounded-[50%] flex justify-center items-center bg-transparent border-primary border-[5px] h-[60px] w-[60px]'>
							<Skeleton className='w-[28px] rounded-sm bg-primary h-[16px]' />
						</Skeleton>
						<div className='w-2/3 h-full flex flex-col justify-between'>
							<Skeleton className='w-full h-[21px] bg-primary' />
							<Skeleton className='w-full h-[21px] bg-primary' />
							<Skeleton className='w-full h-[21px] bg-primary' />
						</div>
					</div>
					<div className='w-1/2 bg-accent rounded-md h-full items-center p-4 flex gap-2'>
						<Skeleton className='rounded-[50%] flex justify-center items-center bg-transparent border-primary border-[5px] h-[60px] w-[60px]'>
							<Skeleton className='w-[28px] rounded-sm bg-primary h-[16px]' />
						</Skeleton>
						<div className='w-2/3 h-full flex flex-col justify-between'>
							<Skeleton className='w-full h-[21px] bg-primary' />
							<Skeleton className='w-full h-[21px] bg-primary' />
							<Skeleton className='w-full h-[21px] bg-primary' />
						</div>
					</div>
				</div>
				<div className='my-4 bg-accent rounded-md h-[161px]'>
					<section className='p-4'>
						<div className='flex overflow-auto scrollbar-sm gap-2 '>
							<div className='flex flex-col gap-[10px] pb-[10px] pt-[24px]'>
								<Skeleton className='w-[24px] h-[14px] bg-primary rounded-sm' />

								<Skeleton className='w-[24px] h-[14px] bg-primary rounded-sm' />

								<Skeleton className='w-[24px] h-[14px] bg-primary rounded-sm' />
							</div>
							<div>
								<div className='flex justify-around mb-2'>
									{Array.from(Array(12).keys()).map(m => (
										<Skeleton
											key={m}
											className='w-[24px] h-[14px] rounded-sm bg-primary'
										/>
									))}
								</div>
								<div className='flex gap-[1px] '>
									{Array.from(Array(Math.floor(365 / 7)).keys()).map(
										(week, i) => (
											<div className='flex flex-col gap-[1px] mb-1' key={i}>
												{Array.from(Array(7).keys()).map((day, i) => (
													<Skeleton
														key={i}
														className='w-[10px] rounded-[2px] h-[10px] bg-primary'
													/>
												))}
											</div>
										)
									)}
								</div>
							</div>
						</div>
						<div className='flex justify-end mt-2'>
							<Skeleton className='w-[161px] rounded-[2px] h-[16px] bg-primary' />
						</div>
					</section>
				</div>
				<div className='my-4 bg-accent rounded-md p-4'>
					<Skeleton className='bg-primary h-[30px] w-[190px]' />
					<Skeleton className='bg-primary mt-2 mb-2 h-[55px] w-full' />
					<Skeleton className='bg-primary mb-2 h-[55px] w-full' />
					<Skeleton className='bg-primary h-[55px] w-full' />
				</div>
			</section>
		</article>
	);
};

LoadingProfile.defaultProps = 'LoadingProfile';

export default LoadingProfile;
