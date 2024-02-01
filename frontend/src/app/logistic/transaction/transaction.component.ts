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
import { TransactionParams } from 'src/app/__models/transaction-params';


@Component({
	selector: 'app-transaction',
	templateUrl: './transaction.component.html',
	styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
	list: Transaction[];

	transactionParams: TransactionParams | undefined;

	total = 0;

	roles: string[];
	currentUser: string;

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
		this.customerList$ = this._customerService.toList();
		this.vendroList$ = this._vendorService.toList();

		this.transactionParams = new TransactionParams();
	}

	ngOnInit(): void {
		this.refreshList();
	}

	disabledStartDate = (startValue: Date): boolean => {
		if (!startValue || !this.transactionParams.transDateTo) {
			return false;
		}
		return startValue.getDate() > this.transactionParams.transDateTo.getDate();
	};

	disabledEndDate = (endValue: Date): boolean => {
		if (!endValue || !this.transactionParams.transDateFrom) {
			return false;
		}
		return endValue.getDate() <= this.transactionParams.transDateFrom.getDate();
	};

	onQueryParamsChange(params: NzTableQueryParams) {
		this.transactionParams.pageNumber = params.pageIndex;
		this.transactionParams.pageSize = params.pageSize;
		const sort = params.sort;
		const currentSort = sort.find(item => item.value !== null);
		this.transactionParams.sortField = (currentSort && currentSort.key) || 'Id';
		this.transactionParams.sortOrder = (currentSort && currentSort.value) || 'descend';
		this.refreshList();
	}

	refreshList() {


		this._transactionService.list(this.transactionParams).subscribe(res => {
			this.list = res.result;
			this.total = res.pagination.totalItems;
		});
	}

	exportToExcel(): void {
		this._transactionService.listForExport(this.transactionParams).subscribe(res => {
			const templatePath = 'assets/template_export.xlsx';
			const exportFileName = 'exported_data.xlsx';
			const dataToExport = res;

			this.exportService.exportData(dataToExport, templatePath, exportFileName);
		});
	}

	resetFilter() {
		this.transactionParams = new TransactionParams();
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
		const exportFileName = 'exported_data_' + item.transactionNo + '.xlsx';
		const dataToExport = [];
		dataToExport.push(item);

		this.exportService.exportData(dataToExport, templatePath, exportFileName);
	}
}
