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
