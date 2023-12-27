import { Component, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CanComponentDeactivate } from '../../../__guards/prevent-unsaved-changes.guard';
import { Transaction } from 'src/app/__models/transaction';
import { TransactionDetails } from 'src/app/__models/transactionDetails';
import { Customer } from 'src/app/__models/customer';
import { Driver } from 'src/app/__models/driver';
import { Vehicle } from 'src/app/__models/vehicle';
import { TransactionService } from 'src/app/__services/transaction.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TransactionDetailsEditModalComponent } from '../add-transaction/transaction-details-edit-modal/transaction-details-edit-modal.component';

@Component({
	selector: 'app-add-transaction',
	templateUrl: './add-transaction.component.html',
	styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit, CanComponentDeactivate {
	@ViewChild("editForm") editForm: NgForm;
	@HostListener('window:beforeunload', ['event']) unloadNotification($event: any) {
		if (this.editForm.dirty) {
			$event.returnValue = true;
		}
	}
	globalError: string;
	transaction: Transaction = new Transaction();
	transactionDetails: TransactionDetails[] = [];
	showNoResult: boolean = false;
	confirmModal?: NzModalRef;

	constructor(
		private _dataService: TransactionService,
		private _notificationService: NzNotificationService,
		private _modalService: NzModalService,
		private _viewContainerRef: ViewContainerRef
	) { }

	ngOnInit(): void {
		// this.initForm();
	}

	initForm() {
		// this.editForm = this._fb.group({
		// 	id: [this.transaction?.id ?? 0],
		// 	demurrageFee : [this.transaction?.demurrageFee ?? 0],
		// });
	}

	onCustomerChange(customer: Customer) {
		this.transaction.customer = customer;
		this.transaction.customerId = customer.id;
	}

	onDriverChange(driver: Driver) {
		this.transaction.driver = driver;
		this.transaction.driverId = driver.id;
	}

	onVehicleChange(vehicle: Vehicle) {
		this.transaction.vehicle = vehicle;
		this.transaction.vehicleId = vehicle.id;
	}

	onShippingRouteChange(selectedData) {
		this.transaction.shippingRoute = selectedData;
	}

	handleModelChange(updatedModel: TransactionDetails[]) {
		this.transaction.transactionDetails = updatedModel;
	}

	openEditModal(model?: TransactionDetails) {
		let initialState = {
			title: 'Thêm mới Lịch trình vận đơn',
			model: null
		};

		if (!model) {
			initialState.title = 'Thêm mới Lịch trình vận đơn';
		} else {
			initialState.title = 'Sửa Lịch trình vận đơn';
			initialState.model = model;
		}

		const modal = this._modalService.create({
			nzContent: TransactionDetailsEditModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzViewContainerRef: this._viewContainerRef,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});

		modal.afterClose.subscribe((result: TransactionDetails) => {
			if (result) {
				if (!model) {
					this.transactionDetails = [
						...this.transactionDetails,
						result
					]
				} else {
					const index = this.transactionDetails.findIndex(x => x.id === model.id);
					Object.assign(this.transactionDetails[index], result);
				}
				this.transaction.transactionDetails = this.transactionDetails;
			}
		});
	}

	confirmDelete(model: TransactionDetails) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, lịch trình sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.transactionDetails = this.transactionDetails.filter(x => x !== model);
			}
		});
	}


	save() {
		console.log(this.transaction);

		if (!this.transaction.id) {
			this._dataService.create(this.transaction as Transaction).subscribe({
				next: res => {
					this._dataService.list = res as Transaction[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa thêm mới thành công thông tin Lệnh điều vận.',
						{ nzDuration: 5000, nzAnimate: true }
					)
				},
				error: err => {
					if (err.status == 400) {
						this._notificationService.error(
							'Lỗi!',
							err.error,
							{ nzDuration: 5000, nzAnimate: true }
						);
					}
				}
			});
		} else {
			this._dataService.update(this.transaction as Transaction).subscribe({
				next: res => {
					this._dataService.list = res as Transaction[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa chỉnh sửa thành công thông tin Lệnh điều vận.',
						{ nzDuration: 5000, nzAnimate: true }
					)
				},
				error: err => {
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
	}

	canDeactivate(): boolean {
		if (this.editForm.dirty) {
			return confirm('Bạn có chắc chắn muốn tiếp tục? Dữ liệu có thể sẽ bị mất nếu không lưu.')
		}
		return true;
	}
}
