import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CodeValue } from 'src/app/__models/code';

@Component({
	selector: 'app-edit-code-value-modal',
	templateUrl: './edit-code-value-modal.component.html',
	styleUrls: ['./edit-code-value-modal.component.scss']
})
export class EditCodeValueModalComponent implements OnInit {
	editForm: FormGroup;
	title?: string;

	model: CodeValue;

	constructor(
		private _modalRef: NzModalRef,
		private _fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id],
			codeId: [this.model?.codeId],
			value: [this.model?.value, Validators.required],
			description: [this.model?.description],
		});
	}

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
