import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TransactionDetails } from 'src/app/__models/transactionDetails';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-transaction-details',
	templateUrl: './transaction-details.component.html',
	styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
	@Input() model: TransactionDetails[] = [];
	@Output() modelChange = new EventEmitter<TransactionDetails[]>();

	constructor(
		private _modalService: NzModalService,
		private datePipe: DatePipe
	) {
	}

	ngOnInit(): void {
		if (!this.model) {
			this.model = [];
		}
	}

	formatHumanDate(dateString): string {
		var pattern = /(\d{4})(\d{2})(\d{2})/;
		return this.datePipe.transform(new Date(dateString.replace(pattern, '$1-$2-$3')), 'dd/MM/yyyy');
	}

	addNewRow() {
		const newRow: TransactionDetails = {
			id: null,
			contType: null,
			contCount: null,
			packageCount: null,
			packageUnit: '',
			quantity: null,
			unit: '',
			goodsDescription: '',
			deliveredPlace: '',
			deliveredTime: ''
		};
		this.model.push(newRow);
		this.modelChange.emit([...this.model]);
	}

	deleteRow(row: TransactionDetails) {
		this.model = this.model.filter(item => item !== row);
		this.modelChange.emit([...this.model]);
	}

}
