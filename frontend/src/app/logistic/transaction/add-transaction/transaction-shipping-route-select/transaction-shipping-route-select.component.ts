import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ShippingRoute } from 'src/app/__models/shipping-route';
import { ShippingRouteService } from 'src/app/__services/shipping-route.service';
import { AddShippingRouteModalComponent } from 'src/app/logistic/shipping-route/add-shipping-route-modal/add-shipping-route-modal.component';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-transaction-shipping-route-select',
	templateUrl: './transaction-shipping-route-select.component.html',
	styleUrls: ['./transaction-shipping-route-select.component.scss']
})
export class TransactionShippingRouteSelectComponent implements OnInit {
	@Input() control = new FormControl();
	@Output() change = new EventEmitter();
	shippingRoutes: ShippingRoute[];
	shippingRouteSelected: ShippingRoute;

	constructor(
		public shippingRouteService: ShippingRouteService,
		private _modalService: NzModalService,
    private datePipe: DatePipe
	) {
		if (!shippingRouteService.list)
    shippingRouteService.refreshList();
	}

	ngOnInit(): void {
		this.control.valueChanges.subscribe(selectedId  => {
			const selectedShippingRoute = this.shippingRouteService.list.find(shippingRoute => shippingRoute.id === selectedId);
			this.onSelectChange(selectedShippingRoute);
		});
	}

  	initForm() {

	}

	compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

	onSelectChange(selectedShippingRoute): void {
		this.shippingRouteSelected = selectedShippingRoute;
		console.log(this.shippingRouteSelected);
	}

	formatHumanDate(dateString) : string {
		var pattern = /(\d{4})(\d{2})(\d{2})/;
		return this.datePipe.transform(new Date(dateString.replace(pattern, '$1-$2-$3')), 'dd/MM/yyyy');
	}

	openEditModal() {
		this._modalService.create({
			nzContent: AddShippingRouteModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: 'Thêm mới Thông tin vận chuyển',
				model: null
			}
		});
	}
}
