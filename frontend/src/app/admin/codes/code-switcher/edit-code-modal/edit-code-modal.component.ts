import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Code } from 'src/app/__models/code';

@Component({
	selector: 'app-edit-code-modal',
	templateUrl: './edit-code-modal.component.html',
	styleUrls: ['./edit-code-modal.component.scss']
})
export class EditCodeModalComponent implements OnInit {
	public submit = new EventEmitter();
	editForm: FormGroup;
	title?: string;

	model: Code;

	constructor(
		public bsModalRef: BsModalRef,
		private _fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id],
			name: [this.model?.name, Validators.required],
			description: [this.model?.description, Validators.required]
		});
	}

	save() {
		this.bsModalRef.hide();
		this.submit.emit(this.editForm.value);
	}

}
