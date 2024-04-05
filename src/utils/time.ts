export function daysInMonth(month: number, year: number) {
	return new Date(year, month, 0).getDate();
}

export const getDaysFromYear = (year: number) => {
	return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
};

export const getMonthDayFromDayOfYear = (year: number, dayOfYear: number) => {
	// Создаем новый объект Date, передавая в конструктор год, 0-й месяц и день (также можно передать 1-е января года)
	var date = new Date(year, 0, 3); // 0-й день отсчитывается от 1970 года, так что это день перед 1 января year года
	date.setDate(dayOfYear + 1); // Устанавливаем нужный день от начала года

	// Получаем месяц и день из объекта Date
	var month = date.getMonth(); // Месяцы отсчитываются от 0, поэтому добавляем 1
	var day = date.getDate();

	return [month, day];
};

export const getTimeAgo = (date: Date) => {
	const now = new Date();
	const messageTime = new Date(date);

	const timeDifference = now.getTime() - messageTime.getTime();
	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (years > 0) {
		return `${years} ${years === 1 ? 'год' : 'года'} назад`;
	} else if (months > 0) {
		return `${months} ${months === 1 ? 'месяц' : 'месяца'} назад`;
	} else if (days > 7) {
		return messageTime.toLocaleDateString(); // Если прошло больше недели, показываем полную дату
	} else if (days > 0) {
		return `${days} ${days === 1 ? 'день' : 'дня'} назад`;
	} else if (hours > 0) {
		return `${hours} ${hours === 1 ? 'час' : 'часа'} назад`;
	} else if (minutes > 0) {
		return `${minutes} ${minutes === 1 ? 'минуту' : 'минут'} назад`;
	} else {
		return 'меньше минуты назад';
	}
};
