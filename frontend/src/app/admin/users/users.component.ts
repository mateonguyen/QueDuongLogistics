import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/__models/user';
import { UserService } from 'src/app/__services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { removeVI } from 'jsrmvi';
import { TimeagoIntl } from 'ngx-timeago';
import { strings } from 'ngx-timeago/language-strings/vi';
import { PaginationInstance } from 'ngx-pagination';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
	list: User[];

	bsModalRef?: BsModalRef;

	term: string = '';

	sortedField: string = 'userName';
	sortedText: string = 'Tên đăng nhập';
	sortedDirection: string = 'asc';

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
		itemsPerPage: 5,
		currentPage: 1
	};

	constructor(
		private userService: UserService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
		intl: TimeagoIntl
	) {
		intl.strings = strings;
		intl.changes.next();
	}

	ngOnInit(): void {
		this.refreshList();
	}

	refreshList() {
		this.userService.list().subscribe((response) => {
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

	// openModal(model?: User) {
	// 	let initialState = {};

	// 	if (!model) {
	// 		initialState = {
	// 			title: 'Thêm mới người dùng'
	// 		};
	// 	} else {
	// 		initialState = {
	// 			title: 'Sửa thông tin người dùng',
	// 			model,
	// 		};
	// 	}

	// 	this.bsModalRef = this.modalService.show(EditUserModalComponent, { initialState });

	// 	this.bsModalRef.content.submit.subscribe((value: User) => {
	// 		if (!model) {
	// 			this.userService.create(value).subscribe(
	// 				{
	// 					next: (user: User) => {
	// 						user.groupName = value.groupName;
	// 						this.list.push(user);

	// 						this._notificationService.open('Bạn vừa tạo thành công người dùng mới.', {
	// 							label: 'Chúc mừng!',
	// 							status: TuiNotification.Success,
	// 							autoClose: 5000
	// 						}).subscribe();
	// 					},
	// 					error: (err) => {
	// 						this._notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình thêm mới người dùng.', {
	// 							label: 'Lỗi!',
	// 							status: TuiNotification.Error,
	// 							autoClose: 5000
	// 						}).subscribe();
	// 						console.log(err);
	// 					}
	// 				}
	// 			);
	// 		} else {
	// 			this.userService.update(value).subscribe(
	// 				{
	// 					next: (user: User) => {
	// 						user.groupName = value.groupName;
	// 						const index = this.list.indexOf(model);
	// 						this.list[index] = user;

	// 						this._notificationService.open('Bạn vừa cập nhật thành công người dùng.', {
	// 							label: 'Chúc mừng!',
	// 							status: TuiNotification.Success,
	// 							autoClose: 5000
	// 						}).subscribe();
	// 					},
	// 					error: (err) => {
	// 						console.log(err);
	// 					}
	// 				}
	// 			);
	// 		}
	// 	});
	// }

	openEditModal(model?: User) {
		let initialState = {
			title: 'Thêm mới Người dùng',
			model: null
		};

		if (!model) {
			initialState.title = 'Thêm mới Người dùng';
		} else {
			initialState.title = 'Sửa thông tin người dùng';
			initialState.model = model;
		}

		const modal = this._modalService.create({
			nzContent: EditUserModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});

		modal.afterClose.subscribe((result: User) => {
			if (result) {
				if (!model) {
					this.userService.create(result).subscribe(
						{
							next: (user: User) => {
								this.list.push(user);
								this._notificationService.success(
									'Chúc mừng!',
									'Bạn vừa tạo thành công nhóm quyền mới.',
									{ nzDuration: 5000 }
								);
								this.refreshList();
							},
							error: (err) => {
								this._notificationService.error(
									'Lỗi!',
									'Không thành công. Có lỗi xảy ra trong quá trình thêm mới quyền.',
									{ nzDuration: 5000 }
								);
								console.log(err);
							}
						}
					);
				} else {
					this.userService.update(result).subscribe(
						{
							next: (user: User) => {
								// const index = this.groups.findIndex(x => x.id === model.id);
								const index = this.list.indexOf(model);
								this.list[index] = user;
								this._notificationService.success(
									'Chúc mừng!',
									'Bạn vừa cập nhật thành công quyền.',
									{ nzDuration: 5000, nzAnimate: true }
								);
								this.refreshList();
							},
							error: (err) => {
								this._notificationService.error(
									'Lỗi!',
									'Không thành công. Có lỗi xảy ra trong quá trình cập nhật quyền.',
									{ nzDuration: 5000, nzAnimate: true }
								);
								console.log(err);
							}
						}
					);
				}
			}
		});
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
