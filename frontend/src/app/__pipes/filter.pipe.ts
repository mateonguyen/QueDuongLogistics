import { Pipe, PipeTransform } from '@angular/core';
import { removeVI } from 'jsrmvi';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {

	transform(items: any[], term: string) {
		if (!items || !term) {
			return items;
		}

		const keys = Object.keys(items[0]);

		const result: any[] = [];

		for (const item of items) {

			for (let i = 0; i < keys.length; i++) {
				if (result.indexOf(item) !== -1) {
					break;
				}

				const value = Object.values(item)[i];

				if (value && removeVI(value.toString(), { replaceSpecialCharacters: false }).includes(removeVI(term, { replaceSpecialCharacters: false }))) {
					result.push(item);

				}
			}
		}

		return result;
	}

}
