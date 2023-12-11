import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/__models/customer';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
	selector: 'app-add-customer-modal',
	templateUrl: 'add-customer-modal.component.html',
	styleUrls: ['add-customer-modal.component.scss']
})
export class AddCustomerModalComponent implements OnInit {
	title?: string;
	editForm: FormGroup;
	model: Customer;

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			customerCode: [this.model?.customerCode, Validators.required],
			customerName: [this.model?.customerName, Validators.required],
			id: [(this.model && this.model.id) ? this.model.id : 0],
		});
	}

	// save() {
	// 	const formData = this.customerForm.value;
	// 	this.dataService.create(formData).subscribe(
	// 		(response) => {
	// 			alert('Lưu dữ liệu thành công');
	// 		},
	// 		(error) => {
	// 			console.error(error);
	// 			// Handle errors
	// 		}
	// 	);
	// }

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
