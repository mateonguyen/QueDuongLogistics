import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from 'src/app/__models/customer';
import { CustomerService } from 'src/app/__services/customer.service';
import { removeVI } from 'jsrmvi';
import { AddCustomerModalComponent } from './add-customer-modal/add-customer-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-customer',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
	data: Customer[];
	confirmModal?: NzModalRef;
	term = '';

	constructor(
		private _dataService: CustomerService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.refreshList();
	}

	refreshList() {
		this._dataService.list().subscribe((response) => {
			const result: Customer[] = [];
			if (this.term !== '') {
				for (const item of response) {
					if (removeVI(item['customerName'] + ' ' + item['customerCode'], { replaceSpecialCharacters: false }).includes(removeVI(this.term, { replaceSpecialCharacters: false }))) {
						result.push(item);
					}
				}
				this.data = result;
			} else {
				this.data = response;
			}
		});
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

		modal.afterClose.subscribe((result: Customer) => {
			if (result) {
				if (!model) {
					this._dataService.create(result).subscribe({
						next: (res: Customer) => {
							//this.data.push(res);
							this._notificationService.success(
								'Chúc mừng!',
								'Bạn vừa thêm mới thành công thông tin Khách hàng.',
								{ nzDuration: 5000, nzAnimate: true }
							)
							this.refreshList();
						},
						error: (err) => {
							this._notificationService.error(
								'Lỗi!',
								err.error,
								{ nzDuration: 5000, nzAnimate: true }
							);
						}
					});
				} else {
					this._dataService.update(result).subscribe({
						next: (res: Customer) => {
							// const index = this.groups.findIndex(x => x.id === model.id);
							const index = this.data.indexOf(model);
							this.data[index] = res;
							this.refreshList();
						},
						error: (err) => {

							console.log(err);
						}
					});
				}
			}
		});
	}

	incrementAndParse(value: string): number {
		// Parse the string to an integer and increment
		return parseInt(value, 10) + 1;
	}

	confirmDelete(customer): boolean {
		if (customer.id > 0) {
			const userConfirmed = confirm('Bạn có chắc chắn muốn xóa ?');

			if (userConfirmed) {
				this._dataService.delete(customer.id).subscribe(
					() => {
						this._notificationService.success(
							'Xóa Thành Công!',
							'Bạn vừa xóa thành công thông tin Khách hàng: ' + customer.customerName,
							{ nzDuration: 5000, nzAnimate: true }
						)
						this.refreshList();
					}, (err) => {
						this._notificationService.error(
							'Lỗi!',
							err.error,
							{ nzDuration: 5000, nzAnimate: true }
						);
					}
				);
			}
		}
		return true;
	}

}
