import { Component, Inject, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Group } from 'src/app/__models/group';
import { GroupService } from '../../__services/group.service';
import { EditGroupModalComponent } from './edit-group-modal/edit-group-modal.component';
import { removeVI } from 'jsrmvi';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { PaginationInstance } from 'ngx-pagination';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { RoleService } from 'src/app/__services/role.service';
import { Role } from 'src/app/__models/role';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
	selector: 'app-groups',
	templateUrl: './groups.component.html',
	styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
	groups: Partial<Group[]>;
	allRoles: Role[];
	confirmModal?: NzModalRef;
	term = '';

	bsModalRef?: BsModalRef;

	columns: any = [
		{ value: 'groupName', name: 'Tên nhóm', },
		{ value: 'description', name: 'Mô tả', },
		{ value: 'created', name: 'Ngày tạo', },
	];

	sortedField: string = 'groupName';
	sortedText: string = 'Tên nhóm';
	sortedDirection: string = 'asc';

	get sortIcon() {
		return this.sortedDirection === 'asc' ? 'sort-lowest' : 'sort-highest';
	}

	public config: PaginationInstance = {
		id: 'custom',
		itemsPerPage: 10,
		currentPage: 1
	};

	constructor(
		private _groupService: GroupService,
		private _modalService: NzModalService,
		private _roleService: RoleService,
		@Inject(TuiAlertService) private readonly _notificationService: TuiAlertService
	) { }

	ngOnInit(): void {
		this.refreshList();
		this.getAvailableRoles();
	}

	refreshList() {
		this._groupService.list().subscribe((response) => {
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

			const result: Group[] = [];
			if (this.term !== '') {
				for (const item of response) {
					if (removeVI(item['groupName'], { replaceSpecialCharacters: false }).includes(removeVI(this.term, { replaceSpecialCharacters: false }))) {
						result.push(item);
					}
				}
				this.groups = result;
			} else {
				this.groups = response;
			}
		});
	}

	openEditModal(model?: Group) {
		let initialState = {
			title: 'Thêm mới Nhóm người dùng',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Nhóm người dùng';
		} else {
			initialState.title = 'Sửa thông tin Nhóm người dùng';
			initialState.model = model;
		}

		const modal = this._modalService.create({
			nzContent: EditGroupModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});

		modal.afterClose.subscribe((result: Group) => {
			if (result) {
				if (!model) {
					this._groupService.create(result).subscribe(
						{
							next: (group: Group) => {
								this.groups.push(group);
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
					this._groupService.update(result).subscribe(
						{
							next: (group: Group) => {
								// const index = this.groups.findIndex(x => x.id === model.id);
								const index = this.groups.indexOf(model);
								this.groups[index] = group;
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
	}

	confirmDelete(model: Group) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Nhóm người dùng <strong>#' + model.groupName + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				const index = this.groups.indexOf(model);
				this.groups.splice(index, 1);

				this._groupService.delete(model.id).subscribe(
					{
						next: () => {
							this._notificationService.open('Bạn vừa xóa thành công Nhóm người dùng.', {
								label: 'Thông báo!',
								status: TuiNotification.Info,
								autoClose: 5000
							}).subscribe();
							this.refreshList();

						},
						error: (error) => {
							debugger;
							if (error.error.includes('ORA-02292')) {
								console.log("ORA-02292");
								this._notificationService.open('Bạn không thể xóa nhóm người dùng nếu có người dùng thuộc nhóm đó.', {
									label: 'Chú ý!',
									status: TuiNotification.Error,
									autoClose: 5000
								}).subscribe();
							} else {
								this._notificationService.open('Có lỗi trong quá trình xóa Nhóm người dùng.', {
									label: 'Lỗi!',
									status: TuiNotification.Error,
									autoClose: 5000
								}).subscribe();
							}
						}
					}
				);
			}
		})
	}

	openRolesModal(group: Group) {
		const modal = this._modalService.create({
			nzContent: RolesModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: 'Phân quyền nhóm người dùng',
				group: group,
				roles: this.getRolesArray(group)
			}
		});

		modal.afterClose.subscribe((values) => {
			if (values) {
				const rolesToUpdate = {
					roles: [...values.filter(x => x.checked === true).map(x => x.value)]
				};
				if (rolesToUpdate) {
					this._groupService.updateGroupRoles(group.id, rolesToUpdate.roles).subscribe(() => {
						group.roles = [...rolesToUpdate.roles]
					})
				}
			}
		});

		// this.bsModalRef.content.submit.subscribe(
		// 	{
		// 		next: (values) => {
		// 			const rolesToUpdate = {
		// 				roles: [...values.filter(x => x.checked === true).map(x => x.value)]
		// 			};
		// 			if (rolesToUpdate) {
		// 				this._groupService.updateGroupRoles(group.id, rolesToUpdate.roles).subscribe(() => {
		// 					group.roles = [...rolesToUpdate.roles]
		// 				})
		// 			}
		// 			this._notificationService.open('Bạn vừa phân quyền thành công.', {
		// 				label: 'Chúc mừng!',
		// 				status: TuiNotification.Success,
		// 				autoClose: 5000
		// 			}).subscribe();
		// 		},
		// 		error: (err) => {
		// 			this._notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình phân quyền.', {
		// 				label: 'Lỗi!',
		// 				status: TuiNotification.Error,
		// 				autoClose: 5000
		// 			}).subscribe();
		// 			console.log(err);
		// 		}
		// 	});
	}

	private getRolesArray(group) {
		const roles = [];
		const groupRoles = group.roles;
		const availableRoles: any[] = this.allRoles.map((role) => {
			return { name: role.description, value: role.name }
		});

		availableRoles.forEach(role => {
			let isMatch = false;
			for (const groupRole of groupRoles) {
				if (role.value === groupRole) {
					isMatch = true;
					role.checked = true;
					roles.push(role);
					break;
				}
			}
			if (!isMatch) {
				role.checked = false;
				roles.push(role);
			}
		})
		return roles;
	}

	private getAvailableRoles() {
		this._roleService.list().subscribe((res) => {
			this.allRoles = res;
		});
	}

	sort(col: any) {
		this.sortedField = col.value;
		this.sortedText = col.name;
		this.refreshList();
	}

	changeDirectionSort() {
		if (this.sortedDirection === 'asc') {
			this.sortedDirection = 'desc';
		} else {
			this.sortedDirection = 'asc';
		}
		this.refreshList();
	}

}
