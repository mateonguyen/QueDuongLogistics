import { Component, EventEmitter, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Group } from 'src/app/__models/group';

@Component({
	selector: 'app-roles-modal',
	templateUrl: './roles-modal.component.html',
	styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {
	public submit = new EventEmitter();
	title?: string;
	group: Group;
	roles: any[]

	constructor(
		public _modalRef: NzModalRef
	) { }

	ngOnInit(): void {
	}

	save() {
		this._modalRef.close(this.roles);
	}

	cancel() {
		this.closeModal();
	}

	closeModal() {
		this._modalRef.close();
	}

}
