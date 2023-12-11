import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from 'src/app/__models/customer';
import { CustomerService } from 'src/app/__services/customer.service';
import { removeVI } from 'jsrmvi';
import { AddCustomerModalComponent } from './add-customer-modal/add-customer-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-customer',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';

	constructor(
		public dataService: CustomerService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.dataService.refreshList();
	}

	refreshList() {
		// this._dataService.list().subscribe((response) => {
		// 	const result: Customer[] = [];
		// 	if (this.term !== '') {
		// 		for (const item of response) {
		// 			if (removeVI(item['customerName'] + ' ' + item['customerCode'], { replaceSpecialCharacters: false }).includes(removeVI(this.term, { replaceSpecialCharacters: false }))) {
		// 				result.push(item);
		// 			}
		// 		}
		// 		this.data = result;
		// 	} else {
		// 		this.data = response;
		// 	}
		// });
	}

	openEditModal(model?: Customer) {
		let initialState = {
			title: 'Thêm mới Khách hàng',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Khách hàng';
		} else {
			initialState.title = 'Sửa thông tin Khách hàng';
			initialState.model = model;
		}

		const modal = this._modalService.create({
			nzContent: AddCustomerModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});
	}

	incrementAndParse(value: string): number {
		// Parse the string to an integer and increment
		return parseInt(value, 10) + 1;
	}

	onDelete(model: Customer) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Nhóm người dùng <strong>#' + model.customerName + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.dataService.delete(model.id).subscribe({
					next: (res) => {
						this.dataService.list = res as Customer[];
						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Khách hàng <strong>' + model.customerName + '</strong>',
							{ nzDuration: 5000, nzAnimate: true }
						)
					},
					error: (err) => {
						if (err.status == 400) {
							this._notificationService.error(
								'Lỗi!',
								err.error,
								{ nzDuration: 5000, nzAnimate: true }
							);
						}
					}
				});
			}
		})
	}

}
