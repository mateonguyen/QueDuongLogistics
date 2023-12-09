import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from '../__pipes/sort.pipe';
import { FilterPipe } from '../__pipes/filter.pipe';

@NgModule({
	declarations: [
		FilterPipe,
		SortPipe,
	],
	imports: [
		CommonModule,
	],
	exports: [
		FilterPipe,
		SortPipe,
	]
})
export class SharedModule { }
