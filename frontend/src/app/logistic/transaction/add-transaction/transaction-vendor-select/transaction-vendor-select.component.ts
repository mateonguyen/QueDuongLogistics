import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Vendor } from 'src/app/__models/vendor';
import { VendorService } from 'src/app/__services/vendor.service';
import { AddVendorModalComponent } from 'src/app/logistic/vendor/add-vendor-modal/add-vendor-modal.component';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-transaction-vendor-select',
	templateUrl: './transaction-vendor-select.component.html',
	styleUrls: ['./transaction-vendor-select.component.scss']
})
export class TransactionVendorSelectComponent implements OnInit {
	@Input() model: Vendor;
	@Output() change = new EventEmitter();
  
	constructor(
		public vendorService: VendorService,
		private _modalService: NzModalService,
		private datePipe: DatePipe
	) {
		if (!vendorService.list)
			vendorService.refreshList();
	}

	ngOnInit(): void {
	}

	
	onVendorChange() {
		this.change.emit(this.model);
	}

	formatHumanDate(dateString): string {
		var pattern = /(\d{4})(\d{2})(\d{2})/;
		return this.datePipe.transform(new Date(dateString.replace(pattern, '$1-$2-$3')), 'dd/MM/yyyy');
	}

	compareFn = (o1: Vendor, o2: Vendor): boolean => (o1 && o2 ? o1.id === o2.id : o1 === o2);

	openEditModal() {
		this._modalService.create({
			nzContent: AddVendorModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: 'Thêm mới Nhà cung cấp',
				model: null
			}
		});
	}
}
