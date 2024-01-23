import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/__models/customer';
import { Transaction } from 'src/app/__models/transaction';
import { Vendor } from 'src/app/__models/vendor';
import { CustomerService } from 'src/app/__services/customer.service';
import { TransactionService } from 'src/app/__services/transaction.service';
import { VendorService } from 'src/app/__services/vendor.service';
import { ExportService } from 'src/app/__services/export.service';
import { PreviewTransactionComponent } from './preview-transaction/preview-transaction.component';


@Component({
	selector: 'app-transaction',
	templateUrl: './transaction.component.html',
	styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
	list: Transaction[];
	loading = true;
	pageSize = 5;
	pageIndex = 1;
	total = 0;

	transDateFrom: Date | null = null;
	transDateTo: Date | null = null;

	roles: string[];
	currentUser: string;

	sortField: string;
	sortOrder: string;
	term: string;
	customerFilter: number | 0;
	vendorFilter: number | 0;

	confirmModal?: NzModalRef;

	customerList$: Observable<Customer[]> | undefined;
	vendroList$: Observable<Vendor[]> | undefined;

	constructor(
		private _transactionService: TransactionService,
		private _customerService: CustomerService,
		private _vendorService: VendorService,
		@Inject(LOCALE_ID) public locale: string,
		private exportService: ExportService,
		private _modalService: NzModalService,
	) {
		this.term = '';
		this.sortField = 'Id';
		this.sortOrder = 'ascend';
		this.customerFilter = 0;
		this.vendorFilter = 0;

		this.customerList$ = this._customerService.toList();
		this.vendroList$ = this._vendorService.toList();
	}

	ngOnInit(): void {
		this.refreshList();
	}

	disabledStartDate = (startValue: Date): boolean => {
		if (!startValue || !this.transDateTo) {
			return false;
		}
		return startValue.getDate() > this.transDateTo.getDate();
	};

	disabledEndDate = (endValue: Date): boolean => {
		if (!endValue || !this.transDateFrom) {
			return false;
		}
		return endValue.getDate() <= this.transDateFrom.getDate();
	};

	onQueryParamsChange(params: NzTableQueryParams) {
		this.pageIndex = params.pageIndex;
		this.pageSize = params.pageSize;
		const sort = params.sort;
		const currentSort = sort.find(item => item.value !== null);
		this.sortField = (currentSort && currentSort.key) || 'Id';
		this.sortOrder = (currentSort && currentSort.value) || 'descend';
		this.refreshList();
	}

	refreshList() {
		let _transDateFrom = this.transDateFrom == null ? null : formatDate(this.transDateFrom, 'yyyyMMdd', this.locale);
		let _transDateTo = this.transDateTo == null ? null : formatDate(this.transDateTo, 'yyyyMMdd', this.locale);

		this._transactionService.list(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, _transDateFrom, _transDateTo, this.term, this.customerFilter ?? 0, this.vendorFilter ?? 0).subscribe(res => {
			this.list = res.result;
			this.total = res.pagination.totalItems;
		});
	}

	exportToExcel(): void {
		let _transDateFrom = this.transDateFrom == null ? null : formatDate(this.transDateFrom, 'yyyyMMdd', this.locale);
		let _transDateTo = this.transDateTo == null ? null : formatDate(this.transDateTo, 'yyyyMMdd', this.locale);

		this._transactionService.listForExport(this.sortField, this.sortOrder, _transDateFrom, _transDateTo, this.term, this.customerFilter, this.vendorFilter).subscribe(res => {
			const templatePath = 'assets/template_export.xlsx';
			const exportFileName = 'exported_data.xlsx';
			const dataToExport = res;
			//console.log(res);

			this.exportService.exportData(dataToExport, templatePath, exportFileName);
		});
	}

	resetFilter() {
		this.pageIndex = 1;
		this.term = '';
		this.customerFilter = 0;
		this.vendorFilter = 0;
		this.transDateFrom = null;
		this.transDateTo = null;

		this.refreshList();
	}

	previewTransaction(item: Transaction) {
		this._modalService.create({
			nzContent: PreviewTransactionComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 595,
			nzComponentParams: {
				title: 'Xem chi tiết Vận đơn',
				transaction: item
			}
		});
	}

	exportTransaction(item: Transaction) {
		const templatePath = 'assets/template_export.xlsx';
		const exportFileName = 'exported_data_'+item.transactionNo+'.xlsx';
		const dataToExport = [];
		dataToExport.push(item);

		this.exportService.exportData(dataToExport, templatePath, exportFileName);
	}
}
