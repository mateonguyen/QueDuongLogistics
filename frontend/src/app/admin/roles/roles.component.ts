import { Component, Inject, OnInit } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { PaginationInstance } from 'ngx-pagination';
import { Role } from 'src/app/__models/role';
import { RoleService } from 'src/app/__services/role.service';
import { EditRoleModalComponent } from './edit-role-modal/edit-role-modal.component';
import { NzTableFilterFn, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

interface ColumnItem {
	name: string;
	sortOrder: NzTableSortOrder | null;
	sortFn: NzTableSortFn<Role> | null;
	//listOfFilter: NzTableFilterList;
	filterFn: NzTableFilterFn<Role> | null;
	sortDirections: NzTableSortOrder[];
}

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
	list: Role[];

	term = '';

	confirmModal?: NzModalRef;

	columns: ColumnItem[] = [
		{
			name: 'Mã quyền',
			sortOrder: 'ascend',
			sortFn: (a: Role, b: Role) => a.name.localeCompare(b.name),
			sortDirections: ['ascend', 'descend', null],
			filterFn: null
		},
		{
			name: 'Tên quyền',
			sortOrder: 'ascend',
			sortFn: (a: Role, b: Role) => a.description.localeCompare(b.description),
			sortDirections: ['ascend', 'descend', null],
			filterFn: null
		}
	];

	sortField: string = 'name';
	sortText: string = 'Mã quyền';
	sortDir = 1;

	get sortIcon() {
		return this.sortDir === 1 ? 'sort-lowest' : 'sort-highest';
	}

	public config: PaginationInstance = {
		id: 'custom',
		itemsPerPage: 15,
		currentPage: 1
	};

	constructor(
		private _roleService: RoleService,
		private _modalService: NzModalService,
		@Inject(TuiAlertService) private readonly _notificationService: TuiAlertService
	) { }

	ngOnInit(): void {
		this.refreshList();
	}

	refreshList() {
		this._roleService.list().subscribe((response) => {
			this.list = response;
		});
	}
	sort(col: any) {
		this.sortField = col.value;
		this.sortText = col.name;
		this.refreshList();
	}

	inverted() {
		this.sortDir *= -1;
	}

	openEditModal(model?: Role) {
		let initialState = {
			title: 'Thêm mới Lịch trình công tác',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Quyền';
		} else {
			initialState.title = 'Sửa thông tin Quyền';
			initialState.model = model;
		}

		const modal = this._modalService.create({
			nzContent: EditRoleModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});

		modal.afterClose.subscribe((result: Role) => {
			if (result) {
				if (!model) {
					this._roleService.create(result).subscribe(
						{
							next: (role: Role) => {
								this.list.push(role);
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
					this._roleService.update(result).subscribe(
						{
							next: (role: Role) => {
								// const index = this.groups.findIndex(x => x.id === model.id);
								const index = this.list.indexOf(model);
								this.list[index] = role;
								this._notificationService.open('Bạn vừa cập nhật thành công quyền.', {
									label: 'Chúc mừng!',
									status: TuiNotification.Success,
									autoClose: 5000
								}).subscribe();
								this.refreshList();
							},
							error: (err) => {
								this._notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình cập nhật quyền.', {
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

		// this.bsModalRef.content.submit.subscribe((value) => {
		// 	if (!model) {
		// 		this._roleService.create(value).subscribe(
		// 			{
		// 				next: (role: Role) => {
		// 					this.list.push(role);
		// 					this._notificationService.open('Bạn vừa tạo thành công nhóm quyền mới.', {
		// 						label: 'Chúc mừng!',
		// 						status: TuiNotification.Success,
		// 						autoClose: 5000
		// 					}).subscribe();
		// 				},
		// 				error: (err) => {
		// 					this._notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình thêm mới quyền.', {
		// 						label: 'Lỗi!',
		// 						status: TuiNotification.Error,
		// 						autoClose: 5000
		// 					}).subscribe();
		// 					console.log(err);
		// 				}
		// 			}
		// 		);
		// 	} else {
		// 		this._roleService.update(value).subscribe(
		// 			{
		// 				next: (role: Role) => {
		// 					// const index = this.groups.findIndex(x => x.id === model.id);
		// 					const index = this.list.indexOf(model);
		// 					this.list[index] = role;
		// 					this._notificationService.open('Bạn vừa cập nhật thành công quyền.', {
		// 						label: 'Chúc mừng!',
		// 						status: TuiNotification.Success,
		// 						autoClose: 5000
		// 					}).subscribe();
		// 				},
		// 				error: (err) => {
		// 					this._notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình cập nhật quyền.', {
		// 						label: 'Lỗi!',
		// 						status: TuiNotification.Error,
		// 						autoClose: 5000
		// 					}).subscribe();
		// 					console.log(err);
		// 				}
		// 			}
		// 		);
		// 	}
		// });
	}

	confirmDelete(model: Role) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Quyền <strong>#' + model.description + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this._roleService.delete(model.id).subscribe(
					{
						next: () => {
							this._notificationService.open('Bạn vừa xóa thành công Quyền.', {
								label: 'Thông báo!',
								status: TuiNotification.Info,
								autoClose: 5000
							}).subscribe();
							this.refreshList();
						},
						error: (error) => {
							console.log(error);
							this._notificationService.open('Có lỗi trong quá trình xóa Quyền.', {
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
}
