const formatDate = (date: string) => {
	const dateObj = new Date(date);
	const monthAndYear = dateObj.toLocaleDateString('en-GB', {
		month: 'long',
		year: 'numeric',
	});

	const day = dateObj.toLocaleDateString('en-GB', {
		day: 'numeric',
	});

	return `${day} ${monthAndYear.replace(' ', ', ')}`;
};

export default formatDate;