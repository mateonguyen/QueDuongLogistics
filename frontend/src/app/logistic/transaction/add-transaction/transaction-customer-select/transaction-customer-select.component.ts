import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
	@Input() customer: Customer;
	@Input() transactionCode: string;
	@Output() change = new EventEmitter();

	constructor(
		public customerService: CustomerService,
		private _modalService: NzModalService,
	) {
		if (!customerService.list)
			customerService.refreshList();
	}

	ngOnInit(): void {
		console.log(this.transactionCode);
	}

	compareFn = (o1: Customer, o2: Customer): boolean => (o1 && o2 ? o1.id === o2.id : o1 === o2);

	onChange() {
		this.change.emit(this.customer);
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
