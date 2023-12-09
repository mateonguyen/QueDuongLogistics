import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-add-transaction',
	templateUrl: './add-transaction.component.html',
	styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
	transactionForm: FormGroup;
	globalError: string;

	constructor(
		private _fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.transactionForm = this._fb.group({

		});
	}

	save() { }
}
