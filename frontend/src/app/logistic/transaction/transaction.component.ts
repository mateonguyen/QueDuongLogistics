import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TransactionService } from 'src/app/__services/transaction.service';

@Component({
	selector: 'app-transaction',
	templateUrl: './transaction.component.html',
	styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
	loading = true;
	pageSize = 5;
	pageIndex = 1;
	total = 0;

	startDate: Date | null = null;
	endDate: Date | null = null;

	roles: string[];
	currentUser: string;

	sortField: string;
	sortOrder: string;
	term: string;

	confirmModal?: NzModalRef;

	constructor(
		public transactionService: TransactionService
	) { }

	ngOnInit(): void {
	}

	onQueryParamsChange($event: any) {
		throw new Error('Method not implemented.');
	}

	refreshList() {
		throw new Error('Method not implemented.');
	}
}
