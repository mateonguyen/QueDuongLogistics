import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TransactionDetails } from 'src/app/__models/transactionDetails';
import { DatePipe } from '@angular/common';
import { LocationService } from 'src/app/__services/location.service';
@Component({
	selector: 'app-transaction-details',
	templateUrl: './transaction-details.component.html',
	styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
	@Input() model: TransactionDetails[] = [];
	@Output() modelChange = new EventEmitter<TransactionDetails[]>();
	optionUnit: string[] = ['Tấn', 'Tạ', 'Cân'];
	optionPackageUnit: string[] = ['Cuộn', 'Carton', 'Pallet'];

	constructor(
		private _modalService: NzModalService,
		private datePipe: DatePipe,
		public locationService: LocationService
	) {
		if (!this.locationService.list)
			this.locationService.refreshList();
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
			deliveredPlaceId: null,
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
