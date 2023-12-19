import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from 'src/app/__models/customer';
import { CustomerService } from 'src/app/__services/customer.service';
import { AddCustomerModalComponent } from 'src/app/logistic/customer/add-customer-modal/add-customer-modal.component';

@Component({
	selector: 'app-transaction-customer-select',
	templateUrl: './transaction-customer-select.component.html',
	styleUrls: ['./transaction-customer-select.component.scss']
})
export class TransactionCustomerSelectComponent implements OnInit {
	@Input() control: FormControl;
	@Output() change = new EventEmitter();
	customers: Customer[];

	constructor(
		public customerService: CustomerService,
		private _modalService: NzModalService,
	) {
		if (!customerService.list)
			customerService.refreshList();
	}

	ngOnInit(): void {

	}

	compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

	onChange() {

	}

	openEditModal() {
		this._modalService.create({
			nzContent: AddCustomerModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: 'Thêm mới Khách hàng',
				model: null
			}
		});
	}
}
