import { Component, HostListener, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
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
import { DatePipe } from '@angular/common';
import { Vendor } from 'src/app/__models/vendor';
import { ShippingRoute } from 'src/app/__models/shipping-route';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/__services/location.service';
import { AddLocationModalComponent } from '../../location/add-location-modal/add-location-modal.component';
import { Observable, map } from 'rxjs';
import { Location } from 'src/app/__models/location';
import { removeVI } from 'jsrmvi';
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
	transactionId: any;
	transactionDetails: TransactionDetails[] = [];
	showNoResult: boolean = false;
	confirmModal?: NzModalRef;
	optionRadioBox: { value: boolean; label: string }[] = [
		{ value: true, label: 'Có' },
		{ value: false, label: 'Không' },
	];
	public total_fee: string = '0';
	public demurrageFeeText: string = '0';
	public transshipmentFeeText: string = '0';
	public returnShippingFeeText: string = '0';
	public customsFeeText: string = '0';
	public handlingFeeText: string = '0';
	public ticketFeeText: string = '0';
	public otherFeeText: string = '0';

	currentDate: Date = new Date();
	list$: Observable<Location[]> | undefined;
	term = '';

	constructor(
		private _dataService: TransactionService,
		private _notificationService: NzNotificationService,
		private _modalService: NzModalService,
		private _viewContainerRef: ViewContainerRef,
		private datePipe: DatePipe,
		private _router: Router,
		private _route: ActivatedRoute,
		private _locationService: LocationService,
		private cdr: ChangeDetectorRef
	) {
		this.list$ = this._locationService.toList();
	}

	ngOnInit(): void {
		this.transactionId = this._route.snapshot.paramMap.get('id');

		this.initForm();
		this.refreshList();
	}

	refreshList() {
		this.list$ = this._locationService.toList().pipe(
			map((locations) =>
				locations.filter(
					(location) => removeVI(location.locationName.toLowerCase() + ' ' + location.locationCode.toLowerCase(), { replaceSpecialCharacters: false })
						.includes(removeVI(this.term.toLowerCase(), { replaceSpecialCharacters: false }))
				)
			)
		)
	}

	initForm() {
		if (!this.transactionId) {
			this.transaction.demurrageFee = 0;
			this.transaction.transshipmentFee = 0;
			this.transaction.returnShippingFee = 0;
			this.transaction.customsFee = 0;
			this.transaction.handlingFee = 0;
			this.transaction.ticketFee = 0;
			this.transaction.otherFee = 0;
			this.transaction.transactionNo = '';
			this.transaction.transactionDate = new Date();
		} else {
			this._dataService.single(Number(this.transactionId)).subscribe((res: Transaction) => {
				this.transaction = res;
				this.demurrageFeeText = new Intl.NumberFormat('en-US').format(res.demurrageFee);
				this.transshipmentFeeText = new Intl.NumberFormat('en-US').format(res.transshipmentFee);
				this.returnShippingFeeText = new Intl.NumberFormat('en-US').format(res.returnShippingFee);
				this.customsFeeText = new Intl.NumberFormat('en-US').format(res.customsFee);
				this.handlingFeeText = new Intl.NumberFormat('en-US').format(res.handlingFee);
				this.ticketFeeText = new Intl.NumberFormat('en-US').format(res.ticketFee);
				this.otherFeeText = new Intl.NumberFormat('en-US').format(res.otherFee);
				this.total_fee = new Intl.NumberFormat('en-US').format(
					parseFloat(this.transaction.demurrageFee.toString()) +
					parseFloat(this.transaction.transshipmentFee.toString()) +
					parseFloat(this.transaction.returnShippingFee.toString()) +
					parseFloat(this.transaction.customsFee.toString()) +
					parseFloat(this.transaction.handlingFee.toString()) +
					parseFloat(this.transaction.ticketFee.toString()) +
					parseFloat(this.transaction.otherFee.toString()));
			})
		}
	}

	onCustomerChange(customer: Customer) {
		this.transaction.customerCode = customer.customerCode;
		this.transaction.customerId = customer ? customer.id : null;
	}

	onDriverChange(driver: Driver) {
		this.transaction.driver = driver;
		this.transaction.driverId = driver ? driver.id : null;
	}

	onVehicleChange(vehicle: Vehicle) {
		this.transaction.vehicle = vehicle;
		this.transaction.vehicleId = vehicle ? vehicle.id : null;
	}

	onOriginChange(locationName: string) {
		this.transaction.origin = locationName;
	}

	onDestinationChange(locationName: string) {
		this.transaction.destination = locationName;
	}

	openEditLocationModal() {
		const modalRef = this._modalService.create({
			nzContent: AddLocationModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: 'Thêm mới Địa điểm',
				model: null
			}
		});

		modalRef.getContentComponent().submited.subscribe(() => {
			this.refreshList();
		});
	}

	onVendorChange(vendor: Vendor) {
		this.transaction.vendor = vendor;
		this.transaction.vendorId = vendor ? vendor.id : null;
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
			nzContent: 'Sau khi chọn Xóa, Thông tin hàng hóa này sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.transactionDetails = this.transactionDetails.filter(x => x !== model);
				this.transaction.transactionDetails = this.transactionDetails;
				this.cdr.detectChanges();
			}
		});
	}

	trackByFunction(index: number, item: TransactionDetails): any {
		return item.id; // replace 'id' with your actual identifier property
	}

	onSubmit() {
		if (this.transactionId) {
			this._dataService.update(this.transaction).subscribe(
				{
					next: () => this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa chỉnh sửa thành công Lệnh điều vận.',
						{ nzDuration: 5000, nzAnimate: true }
					),
					error: (err) => {
						this._notificationService.error(
							'Lỗi!',
							'Không thành công. Có lỗi xảy ra trong quá trình chỉnh sửa thông tin.',
							{ nzDuration: 5000, nzAnimate: true }
						);
						console.log(err);
					},
					complete: () => {
						this.editForm.reset(this.transaction);
						this._router.navigate(['/logistic/transaction/list']);
					}
				}
			)
		} else {
			this._dataService.create(this.transaction).subscribe(
				{
					next: () => this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa thêm mới thành công Lệnh điều vận.',
						{ nzDuration: 5000, nzAnimate: true }
					),
					error: (err) => {
						this._notificationService.error(
							'Lỗi!',
							'Không thành công. Có lỗi xảy ra trong quá trình thêm mới thông tin.',
							{ nzDuration: 5000, nzAnimate: true }
						);
						console.log(err);
					},
					complete: () => {
						this.editForm.reset(this.transaction);
						this._router.navigate(['/logistic/transaction/list']);
					}
				}
			)
		}
	}

	canDeactivate(): boolean {
		if (this.editForm.dirty) {
			return confirm('Bạn có chắc chắn muốn tiếp tục? Dữ liệu có thể sẽ bị mất nếu không lưu.')
		}
		return true;
	}

	parseHumanDate(value: Date): string {
		return this.datePipe.transform(value, 'dd/MM/yyyy');
	}

	formatCurrencyValue(event: any, targetParam: string, textParam: string) {
		let inputValue = parseFloat(event.target.value);
		inputValue = isNaN(inputValue) ? 0 : inputValue;

		this.transaction[targetParam] = inputValue;
		var uy = isNaN(event.target.value) ? 0 : new Intl.NumberFormat('en-US').format(event.target.value);
		this[textParam] = uy;

		this.total_fee = new Intl.NumberFormat('en-US').format(
			parseFloat(this.transaction.demurrageFee.toString()) +
			parseFloat(this.transaction.transshipmentFee.toString()) +
			parseFloat(this.transaction.returnShippingFee.toString()) +
			parseFloat(this.transaction.customsFee.toString()) +
			parseFloat(this.transaction.handlingFee.toString()) +
			parseFloat(this.transaction.ticketFee.toString()) +
			parseFloat(this.transaction.otherFee.toString()));
	}

	compareLocation = (o1: any, o2: any): boolean => (o1 && o2 ? o1 === o2 : o1 === o2);

}
