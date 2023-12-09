import { Component, Inject, OnInit } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { PaginationInstance } from 'ngx-pagination';
import { Code, CodeValue } from 'src/app/__models/code';
import { CodeService } from 'src/app/__services/code.service';
import { EditCodeValueModalComponent } from './edit-code-value-modal/edit-code-value-modal.component';
import { removeVI } from 'jsrmvi';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
	selector: 'app-codes',
	templateUrl: './codes.component.html',
	styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnInit {
	list: CodeValue[];
	codeList: Code[];
	selectedCode: Code;

	confirmModal?: NzModalRef;

	term: string = '';

	sortedField: string = 'userName';
	sortedText: string = 'Tên đăng nhập';
	sortedDirection: string = 'asc';

	codeName: string = 'Danh mục abc'

	columns: any = [
		{ value: 'userName', name: 'Tên đăng nhập', },
		{ value: 'groupName', name: 'Nhóm người dùng', },
		{ value: 'isActived', name: 'Trạng thái', },
	];

	get sortIcon() {
		return this.sortedDirection === 'asc' ? 'sort-lowest' : 'sort-highest';
	}

	public config: PaginationInstance = {
		id: 'custom',
		itemsPerPage: 15,
		currentPage: 1
	};

	constructor(
		public codeService: CodeService,
		private _modalService: NzModalService,
		@Inject(TuiAlertService) private readonly _notificationService: TuiAlertService
	) { }

	ngOnInit(): void {
		this.init();
	}

	init() {
		this.codeService.listCode().subscribe((response) => {
			this.codeList = response;
			//this.codeService.selectedCode = this.codeList[0];
			//console.log(this.codeService.selectedCode);
			this.selectedCode = this.codeList[0];
			this.refreshList();
		});
	}

	codeChanged(item: Code) {
		//this.codeService.selectedCode = item;
		this.selectedCode = item;
		this.refreshList();
	}

	refreshList() {
		this.codeService.listValueByCode(this.selectedCode.name).subscribe((response) => {
			let multiplier = 1;

			if (this.sortedDirection === 'desc') {
				multiplier = -1;
			}

			response.sort((a: any, b: any) => {
				if (a[this.sortedField] < b[this.sortedField]) {
					return -1 * multiplier;
				} else if (a[this.sortedField] > b[this.sortedField]) {
					return 1 * multiplier;
				} else {
					return 0;
				}
			});

			const result = [];
			if (this.term !== '') {
				for (const item of response) {
					if (removeVI(item['userName'], { replaceSpecialCharacters: false }).includes(removeVI(this.term, { replaceSpecialCharacters: false }))) {
						result.push(item);
					}
					else if (removeVI(item['fullName'], { replaceSpecialCharacters: false }).includes(removeVI(this.term, { replaceSpecialCharacters: false }))) {
						result.push(item);
					}
				}
				this.list = result;
			} else {
				this.list = response;
			}
		});
	}

	openEditModal(model?: CodeValue) {
		let initialState = {
			// title: 'Thêm mới ' + this.codeService.selectedCode.description,
			title: 'Thêm mới ' + this.selectedCode.description,
			model: null
		};

		if (!model) {
			// initialState.title = 'Thêm mới ' + this.codeService.selectedCode.description;
			initialState.title = 'Thêm mới ' + this.selectedCode.description;

			let codeValue = new CodeValue(this.selectedCode.id);
			initialState.model = codeValue;
			//console.log('service: ' + this.codeService.selectedCode.id);
		} else {
			// initialState.title = 'Sửa thông tin ' + this.codeService.selectedCode.description;
			initialState.title = 'Sửa thông tin ' + this.selectedCode.description;
			initialState.model = model;

		}

		const modal = this._modalService.create({
			nzContent: EditCodeValueModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});

		modal.afterClose.subscribe((result: CodeValue) => {
			if (result) {
				if (!model) {
					this.codeService.createValue(result).subscribe(
						{
							next: (codeValue: CodeValue) => {
								this.list.push(codeValue);
								this._notificationService.open('Bạn vừa tạo thành công nhóm quyền mới.', {
									label: 'Chúc mừng!',
									status: TuiNotification.Success,
									autoClose: 5000
								}).subscribe();
								this.refreshList();
							},
							error: (err) => {
								this._notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình thêm mới quyền.', {
									label: 'Lỗi!',
									status: TuiNotification.Error,
									autoClose: 5000
								}).subscribe();
								console.log(err);
							}
						}
					);
				} else {
					this.codeService.updateValue(result).subscribe(
						{
							next: (codeValue: CodeValue) => {
								// const index = this.groups.findIndex(x => x.id === model.id);
								const index = this.list.indexOf(model);
								this.list[index] = codeValue;
								this._notificationService.open('Bạn vừa cập nhật thành công quyền.', {
									label: 'Chúc mừng!',
									status: TuiNotification.Success,
									autoClose: 5000
								}).subscribe();
								this.refreshList();
							},
							error: (err) => {
								this._notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình cập nhật bản ghi Danh mục.', {
									label: 'Lỗi!',
									status: TuiNotification.Error,
									autoClose: 5000
								}).subscribe();
								console.log(err);
							}
						}
					);
				}
			}
		});
	}

	confirmDelete(model: CodeValue) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Bản ghi <strong>#' + model.description + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.codeService.deleteValue(model.id).subscribe(
					{
						next: () => {
							this._notificationService.open('Bạn vừa xóa thành công lý lịch khoa học.', {
								label: 'Thông báo!',
								status: TuiNotification.Info,
								autoClose: 5000
							}).subscribe();
							this.refreshList();
						},
						error: (error) => {
							console.log(error);
							this._notificationService.open('Có lỗi trong quá trình xóa lý lịch.', {
								label: 'Lỗi!',
								status: TuiNotification.Error,
								autoClose: 5000
							}).subscribe();
						}
					}
				);
			}
		})
	}

	// sort(col: any) {
	// 	this.sortedField = col.value;
	// 	this.sortedText = col.name;
	// 	this.refreshList();
	// }

	// inverted() {
	// 	if (this.sortedDirection === 'asc') {
	// 		this.sortedDirection = 'desc';
	// 	} else {
	// 		this.sortedDirection = 'asc';
	// 	}
	// 	this.refreshList();
	// }
}
