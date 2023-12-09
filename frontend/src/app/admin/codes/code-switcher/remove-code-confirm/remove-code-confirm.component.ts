import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Code } from 'src/app/__models/code';
import { CodeService } from 'src/app/__services/code.service';

@Component({
	selector: 'app-remove-code-confirm',
	templateUrl: './remove-code-confirm.component.html',
	styleUrls: ['./remove-code-confirm.component.scss']
})
export class RemoveCodeConfirmComponent implements OnInit {

	public refreshList = new EventEmitter();

	model: Code;

	constructor(
		public bsModalRef: BsModalRef,
		private _codeService: CodeService,
		@Inject(TuiAlertService) private readonly notificationService: TuiAlertService
	) { }

	ngOnInit(): void {
	}

	confirm(): void {
		this._codeService.deleteCode(this.model.id).subscribe(
			() => {
				this.bsModalRef?.hide();
				this.refreshList.emit();
				this.notificationService.open('Bạn vừa xóa thành công Bảng mã.', {
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
