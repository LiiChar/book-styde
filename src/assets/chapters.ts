import fs from 'fs';

import { data } from './book';

const objectToStringRecursive = (obj: any) => {
	let result = '{\n';
	Object.entries(obj).forEach(([key, val]) => {
		if (typeof val == 'object') {
			result += `\t${key}: ${objectToStringRecursive(val)},\n`;
		} else {
			result += `\t${key}: \`${val}\`,\n`;
		}
	});
	result += '}\n';
	return result;
};

const partToString = (part: any) => {
	let string = `export default `;
	string += objectToStringRecursive(part);
	string += string += `}`;
	return string;
};

data.book.forEach(book => {
	let dir = book.part == 'javascript' ? 'js' : book.part;
	let parts: any[] = [];
	book.parts.forEach(part => {
		parts.push(part.title);
		const data: string = partToString(part);
		fs.writeFileSync(
			`/home/kypator/xoy/code/pet-project/book-styde/src/assets/${dir}/chapters/${part.title}.ts`,
			data
		);
	});
	let index = ``;
	parts.forEach((partI, i) => {
		index += `import ${'chapter' + i} from './chapters/${partI}';\n`;
	});
	fs.writeFileSync(
		`/home/kypator/xoy/code/pet-project/book-styde/src/assets/${dir}/index.ts`,
		index
	);
});
