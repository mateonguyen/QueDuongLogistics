import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sort'
})
export class SortPipe implements PipeTransform {

	transform(value: any, sortfield: string, sortDir: number): any {
		value = value || [];

		value.sort((a: any, b: any) => {
			if (a[sortfield] < b[sortfield]) {
				return -1 * sortDir;
			} else if (a[sortfield] > b[sortfield]) {
				return 1 * sortDir;
			} else {
				return 0;
			}
		});

		return value;
	}
}
