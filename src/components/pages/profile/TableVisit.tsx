import { AnaliticVisit } from '@/app/api/user/analitic/route';
import React, { FC, HTMLProps } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { getMonthDayFromDayOfYear } from '@/utils/time';

type Props = {
	visit: AnaliticVisit;
	className?: HTMLProps<HTMLDivElement>['className'];
};

const TableVisit: FC<Props> = ({ visit, className }) => {
	const month = [
		'Янв',
		'Февр',
		'Март',
		'Апр',
		'Май',
		'Июнь',
		'Июль',
		'Авг',
		'Сент',
		'Окт',
		'Нояб',
		'Дек',
	];

	const normilizeVisit = (val: number) => {
		return (val - 0) / (20 - 0);
	};

	return (
		<section>
			<div className='flex overflow-auto scrollbar-sm gap-2 '>
				<div className='flex flex-col gap-[10px] pb-[10px] pt-[24px]'>
					<div>Вт</div>
					<div>Чт</div>
					<div>Сб</div>
				</div>
				<div>
					<div className='flex justify-around mb-1'>
						{month.map(m => (
							<div key={m}>{m}</div>
						))}
					</div>
					<div className='flex gap-[1px] '>
						{Array.from(Array(Math.floor(visit.all / 7)).keys()).map(
							(week, i) => (
								<div className='flex flex-col gap-[1px] mb-1' key={i}>
									{Array.from(Array(7).keys()).map((day, i) => (
										<TooltipProvider key={i}>
											<Tooltip>
												<TooltipTrigger>
													<div
														key={i}
														className='w-[10px] h-[10px] bg-background rounded-[2px]'
													>
														{visit.activeDay.find(
															act => act.day === week * 7 + day
														) && (
															<div
																style={{
																	opacity: normilizeVisit(
																		(
																			visit.activeDay.find(
																				act => act.day === week * 7 + day
																			) ?? { visit: 0 }
																		).visit
																	),
																}}
																className='w-full h-full bg-primary rounded-[2px]'
															></div>
														)}
													</div>
												</TooltipTrigger>
												<TooltipContent className='h-[20px] p-[1px] px-[2px]'>
													{/* <p className='h-[18px]'> */}
													{(
														visit.activeDay.find(
															act => act.day === week * 7 + day
														) ?? { visit: 0 }
													).visit == 0
														? 'Нет'
														: (
																visit.activeDay.find(
																	act => act.day === week * 7 + day
																) ?? { visit: 0 }
														  ).visit}{' '}
													посещений в{' '}
													{
														month[
															getMonthDayFromDayOfYear(
																new Date().getFullYear(),
																week * 7 + day
															)[0]
														]
													}{' '}
													{
														getMonthDayFromDayOfYear(
															new Date().getFullYear(),
															week * 7 + day
														)[1]
													}
													, {new Date().getFullYear()}
													{/* </p> */}
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									))}
								</div>
							)
						)}
					</div>
				</div>
			</div>
			<div className='flex justify-end mt-2'>
				<div className='flex gap-1 justify-center items-center'>
					Менее
					<div className='w-[10px] rounded-[2px] bg-background h-[10px]'></div>
					<div className='w-[10px] rounded-[2px] bg-primary opacity-25 h-[10px]'></div>
					<div className='w-[10px] rounded-[2px] bg-primary opacity-50 h-[10px]'></div>
					<div className='w-[10px] rounded-[2px] bg-primary opacity-75 h-[10px]'></div>
					<div className='w-[10px] rounded-[2px] bg-primary opacity-100 h-[10px]'></div>
					Больше
				</div>
			</div>
		</section>
	);
};

TableVisit.displayName = 'TableVisit';

export { TableVisit };
