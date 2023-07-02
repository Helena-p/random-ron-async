(function () {
	const displayQuote = <HTMLQuoteElement>(
		document.querySelector('[data-quote]')
	);
	const button = <HTMLButtonElement>document.querySelector('[type="button"]');
	const endpoint = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
	const quotes: string[] = [];

	const responseHandler = (response: Response): Promise<string> => {
		if (!response.ok) throw Error(response.statusText);
		return response.json();
	};

	const renderQuote = (data: string): void => {
		quotes.includes(data[0])
			? getQuote()
			: (displayQuote.textContent = `‟ ${data[0]}`);
		if (quotes.length >= 50) quotes.shift();
		quotes.push(data[0]);
	};

	const errorHandler = (error: Error): void => {
		displayQuote.innerHTML = `Error: ${error}, No quotes available at this time`;
	};

	const getQuote = async (): Promise<void> => {
		try {
			const response = await fetch(endpoint);
			const data = await responseHandler(response);
			const renderData = await renderQuote(data);
			return renderData;
		} catch (error: unknown) {
			errorHandler(error as Error);
			console.error(error);
		}
	};

	getQuote();
	button.addEventListener('click', getQuote);
})();
