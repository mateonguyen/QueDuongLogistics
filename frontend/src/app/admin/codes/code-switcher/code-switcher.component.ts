import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Code } from 'src/app/__models/code';
import { CodeService } from 'src/app/__services/code.service';
import { EditCodeModalComponent } from './edit-code-modal/edit-code-modal.component';
import { RemoveCodeConfirmComponent } from './remove-code-confirm/remove-code-confirm.component';

@Component({
	selector: 'app-code-switcher',
	templateUrl: './code-switcher.component.html',
	styleUrls: ['./code-switcher.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CodeSwitcherComponent implements OnInit {
	@Input() list: Code[];
	@Input() selectedCode: Code;
	@Output() valueChanged = new EventEmitter<Code>()

	bsModalRef?: BsModalRef;

	constructor(
		public _codeService: CodeService,
		private _modalService: BsModalService,
		@Inject(TuiAlertService) private readonly notificationService: TuiAlertService
	) { }

	ngOnInit(): void {
	}

	onValueChanged(item: Code) {
		this.selectedCode = item;
		this.valueChanged.emit(item);
	}

	createCode() {
		this.openModal();
	}

	editCode(model: Code) {
		this.openModal(model);
	}

	openModal(model?: Code) {
		let initialState = {};

		if (!model) {
			initialState = {
				title: 'Thêm mới Danh mục'
			};
		} else {
			initialState = {
				title: 'Sửa thông tin Danh mục',
				model,
			};
		}

		this.bsModalRef = this._modalService.show(EditCodeModalComponent, { initialState });
		this.bsModalRef.content.submit.subscribe((value) => {
			if (!model) {
				this._codeService.createCode(value).subscribe(
					(code: Code) => {
						this.list.push(code);
						this.notificationService.open('Bạn vừa tạo thành công Bảng mã ' + code.description + '.', {
							label: 'Chúc mừng!',
							status: TuiNotification.Success,
							autoClose: 5000
						}).subscribe();
					},
					(err) => {
						this.notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình thêm mới Bảng mã.', {
							label: 'Lỗi!',
							status: TuiNotification.Error,
							autoClose: 5000
						}).subscribe();
						console.log(err);
					}
				);
			} else {
				this._codeService.updateCode(value).subscribe(
					(code: Code) => {
						// const index = this.groups.findIndex(x => x.id === model.id);
						const index = this.list.indexOf(model);
						this.list[index] = code;
						this.selectedCode = code;
						this.notificationService.open('Bạn vừa cập nhật thành công Bảng mã ' + code.description + '.', {
							label: 'Chúc mừng!',
							status: TuiNotification.Success,
							autoClose: 5000
						}).subscribe();
					},
					(err) => {
						this.notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình cập nhật người dùng.', {
							label: 'Lỗi!',
							status: TuiNotification.Error,
							autoClose: 5000
						}).subscribe();
						console.log(err);
					}
				);
			}
		});
	}

	removeCode(model: Code) {
		const initialState = {
			model
		};

		this.bsModalRef = this._modalService.show(RemoveCodeConfirmComponent, { initialState });
		this.bsModalRef.content.refreshList.subscribe(() => {
			const index = this.list.indexOf(model);
			this.list.splice(index, 1);
		});
	}
}
