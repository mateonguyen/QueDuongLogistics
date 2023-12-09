import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Group } from 'src/app/__models/group';
import { User } from 'src/app/__models/user';
import { GroupService } from 'src/app/__services/group.service';


@Component({
	selector: 'app-edit-add-user-modal',
	templateUrl: './edit-user-modal.component.html',
	styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
	public submit = new EventEmitter();

	title?: string;

	editForm: FormGroup;

	model: User;

	groups: Group[];

	constructor(
		private groupService: GroupService,
		private fb: FormBuilder,
		private _modalRef: NzModalRef,) { }

	ngOnInit(): void {
		this.loadGroups();
		this.initForm();
	}

	initForm() {
		this.editForm = this.fb.group({
			id: [this.model?.id],
			userName: [this.model?.userName, Validators.required],
			fullName: [this.model?.fullName],
			groupId: [this.model?.groupId, Validators.required],
			isActived: [this.model?.isActived ?? true]
		});
	}

	loadGroups() {
		this.groupService.list().subscribe((res) => { this.groups = res });
	}

	save() {
		let user: User = this.editForm.value;

		user.isActived = this.editForm.value['isActived'].toString() === 'true' ? true : false;
		user.groupName = this.groups.find(x => x.id === Number(user.groupId)).groupName;

		this._modalRef.close(user);
	}

	cancel() {
		this.closeModal();
	}

	closeModal() {
		this._modalRef.close();
	}

}
