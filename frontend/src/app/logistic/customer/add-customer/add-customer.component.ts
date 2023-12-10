import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanComponentDeactivate } from '../../../__guards/prevent-unsaved-changes.guard';
import { CustomerService } from 'src/app/__services/customer.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-customer',
	templateUrl: './add-customer.component.html',
	styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit, CanComponentDeactivate {
	customerForm: FormGroup;
	globalError: string;

	constructor(
		private _fb: FormBuilder,
		private dataService: CustomerService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.customerForm = this._fb.group({
			CustomerCode: ['', Validators.required],
			CustomerName: ['', Validators.required],
		});
	}

	save() {
		const formData = this.customerForm.value;
		this.dataService.create(formData).subscribe(
			(response) => {
				alert('Lưu dữ liệu thành công');
			  },
			  (error) => {
				console.error('API Error:', error);
				// Handle errors
			  }
		  );
	 }

	canDeactivate(): boolean {
		if (this.customerForm.dirty) {
			return confirm('Bạn có chắc chắn muốn tiếp tục? Dữ liệu có thể sẽ bị mất nếu không lưu.')
		}
		return true;
	}
}
