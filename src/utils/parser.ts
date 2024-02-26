export const transformCodeToParse = (code: string): string => {
	let result =
		`const result = []; 
		function push(...el) {
			let rets = el.join(', ');
			result.push(JSON.stringify(rets))
		};` +
		code +
		`${code.trim().at(-1) == ';' ? '' : ';'}return result;`;
	result = result.replaceAll('alert(', 'push(');
	result = result.replaceAll('console.log(', 'push(');
	return result;
};

export const transfoncCodeToValidCss = (code: string, html: string): string => {
	let ht = html;
	code = code.replaceAll('body', '.main_start');
	code = code.replaceAll('*', '.main_start');
	code = code.replaceAll('html', '.main_start');

	ht = ht.replaceAll('<body', '<div class="main_start"');
	ht = ht.replaceAll('</body', '</div');
	ht = ht.replaceAll('<html', '<div class="main_start"');
	ht = ht.replaceAll('</html', '</div');

	ht = ht.replaceAll('<head', '<div');
	ht = ht.replaceAll('</head', '</div');

	let result = `
	<style>${code}</style>
	${ht}`;
	return result;
};

export const transfoncCodeToValidHTML = (code: string): string => {
	let ht = code;

	ht = ht.replaceAll('<body', '<div class="main_start"');
	ht = ht.replaceAll('</body', '</div');
	ht = ht.replaceAll('<html', '<div class="main_start"');
	ht = ht.replaceAll('</html', '</div');

	ht = ht.replaceAll('<head', '<div');
	ht = ht.replaceAll('</head', '</div');

	let result = `
	${code}`;
	return result;
};
