import { Component, OnInit } from '@angular/core';
import { Audit } from 'src/app/__models/audit';
import { HomeService } from 'src/app/__services/home.service';
import { AUDIT_TYPE, ENTITY_NAME } from './const';
import { strings as viStrings } from "ngx-timeago/language-strings/vi"
import { TimeagoIntl } from 'ngx-timeago';

@Component({
	selector: 'app-audit-home',
	templateUrl: './audit-home.component.html',
	styleUrls: ['./audit-home.component.scss']
})

export class AuditHomeComponent implements OnInit {
	list: Audit[];
	readonly auditType = AUDIT_TYPE;
	readonly entityName = ENTITY_NAME;

	constructor(
		private _homeService: HomeService,
		intl: TimeagoIntl
	) {
		intl.strings = viStrings;
		intl.changes.next();
	}

	ngOnInit(): void {
		this._homeService.listAudit().subscribe((res) => {
			this.list = res;
			// console.log(this.list);
		})
	}

}
