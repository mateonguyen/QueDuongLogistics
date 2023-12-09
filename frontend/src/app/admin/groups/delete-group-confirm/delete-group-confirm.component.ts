import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Group } from 'src/app/__models/group';
import { GroupService } from '../../../__services/group.service';

@Component({
	selector: 'app-delete-group-confirm',
	templateUrl: './delete-group-confirm.component.html',
	styleUrls: ['./delete-group-confirm.component.scss']
})
export class DeleteGroupConfirmComponent implements OnInit {

	public refreshList = new EventEmitter();

	model: Group;

	constructor(
		public bsModalRef: BsModalRef,
		private groupService: GroupService,
		@Inject(TuiAlertService) private readonly notificationService: TuiAlertService
	) { }

	ngOnInit(): void {
	}

	confirm(): void {
		this.groupService.delete(this.model.id).subscribe(
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
