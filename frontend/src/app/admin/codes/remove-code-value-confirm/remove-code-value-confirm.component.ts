import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CodeValue } from 'src/app/__models/code';
import { CodeService } from 'src/app/__services/code.service';

@Component({
	selector: 'app-remove-code-value-confirm',
	templateUrl: './remove-code-value-confirm.component.html',
	styleUrls: ['./remove-code-value-confirm.component.scss']
})
export class RemoveCodeValueConfirmComponent implements OnInit {

	public refreshList = new EventEmitter();

	model: CodeValue;

	constructor(
		public bsModalRef: BsModalRef,
		private _codeService: CodeService,
		@Inject(TuiAlertService) private readonly notificationService: TuiAlertService
	) { }

	ngOnInit(): void {
	}

	confirm(): void {
		this._codeService.deleteValue(this.model.id).subscribe(
			() => {
				this.bsModalRef?.hide();
				this.refreshList.emit();
				this.notificationService.open('Bạn vừa xóa thành công nhóm người dùng.', {
					label: 'Thông báo!',
					status: TuiNotification.Warning,
					autoClose: 5000
				}).subscribe();
			}, (err) => {
				console.log(err);

			}
		);

	}

}
