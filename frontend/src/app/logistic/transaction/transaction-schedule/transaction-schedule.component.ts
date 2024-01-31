import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-transaction-schedule',
	templateUrl: './transaction-schedule.component.html',
	styleUrls: ['./transaction-schedule.component.scss']
})
export class TransactionScheduleComponent implements OnInit {
	term: string;

	constructor() { }

	ngOnInit(): void {
	}

	refreshList() {
		// let _transDateFrom = this.transDateFrom == null ? null : formatDate(this.transDateFrom, 'yyyyMMdd', this.locale);
		// let _transDateTo = this.transDateTo == null ? null : formatDate(this.transDateTo, 'yyyyMMdd', this.locale);

		// this._transactionService.list(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, _transDateFrom, _transDateTo, this.term, this.customerFilter ?? 0, this.vendorFilter ?? 0).subscribe(res => {
		// 	this.list = res.result;
		// 	this.total = res.pagination.totalItems;
		// });
	}

	resetFilter() {
		// this.pageIndex = 1;
		// this.term = '';
		// this.customerFilter = 0;
		// this.vendorFilter = 0;
		// this.transDateFrom = null;
		// this.transDateTo = null;

		this.refreshList();
	}

	exportToExcel(): void {
		// let _transDateFrom = this.transDateFrom == null ? null : formatDate(this.transDateFrom, 'yyyyMMdd', this.locale);
		// let _transDateTo = this.transDateTo == null ? null : formatDate(this.transDateTo, 'yyyyMMdd', this.locale);

		// this._transactionService.listForExport(this.sortField, this.sortOrder, _transDateFrom, _transDateTo, this.term, this.customerFilter, this.vendorFilter).subscribe(res => {
		// 	const templatePath = 'assets/template_export.xlsx';
		// 	const exportFileName = 'exported_data.xlsx';
		// 	const dataToExport = res;
		// 	//console.log(res);

		// 	this.exportService.exportData(dataToExport, templatePath, exportFileName);
		// });
	}
}
