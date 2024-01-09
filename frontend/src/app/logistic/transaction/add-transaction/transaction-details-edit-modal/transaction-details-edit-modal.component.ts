import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionDetails } from 'src/app/__models/transactionDetails';
import { DatePipe } from '@angular/common';
import { LocationService } from 'src/app/__services/location.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AccountQuery } from 'src/app/__states/account/account.query';
import { NzModalRef } from 'ng-zorro-antd/modal';


@Component({
	selector: 'app-transaction-details-edit-modal',
	templateUrl: './transaction-details-edit-modal.component.html',
	styleUrls: ['./transaction-details-edit-modal.component.scss']
})
export class TransactionDetailsEditModalComponent implements OnInit {

	public submit = new EventEmitter();

	title?: string;

	editForm: FormGroup;

	model: TransactionDetails;

	optionContType: string[] = ['Cont12', 'Cont15', 'Cont20'];
	optionPackageUnit: string[] = ['Cuộn', 'Carton', 'Pallet'];
	optionUnit: string[] = ['Tấn', 'Tạ', 'Cân'];


	constructor(
		public bsModalRef: BsModalRef,
		private _fb: FormBuilder,
		private _accountQuery: AccountQuery,
		private _modalRef: NzModalRef,
		public locationService: LocationService
	) {
		// if (!this.locationService.list)
		// 	this.locationService.refreshList();

	}

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id],
			contType: [this.model?.contType, Validators.required],
			contCount: [this.model?.contCount, Validators.required],
			packageCount: [this.model?.packageCount, Validators.required],
			packageUnit: [this.model?.packageUnit, Validators.required],
			quantity: [this.model?.quantity, Validators.required],
			unit: [this.model?.unit, Validators.required],
			goodsDescription: [this.model?.goodsDescription],
			deliveredPlace: [this.model?.deliveredPlace, Validators.required],
			deliveredTime: [this.model?.deliveredTime ? new Date(this.model?.deliveredTime) : null, Validators.required],
		});
	}

	compareFn = (o1: any, o2: any): boolean => (o1 === o2);


	save() {
		this._modalRef.close(this.editForm.value);
	}

	cancel() {
		this.closeModal();
	}

	closeModal() {
		this._modalRef.close();
	}

}
