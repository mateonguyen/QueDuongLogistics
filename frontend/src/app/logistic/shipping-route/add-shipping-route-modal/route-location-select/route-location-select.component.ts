import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocationService } from 'src/app/__services/location.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddLocationModalComponent } from 'src/app/logistic/location/add-location-modal/add-location-modal.component';
import { Observable } from 'rxjs';
import { Location } from 'src/app/__models/location';

@Component({
	selector: 'app-route-location-select',
	templateUrl: './route-location-select.component.html',
	styleUrls: ['./route-location-select.component.scss']
})
export class RouteLocationSelectComponent implements OnInit {
	@Input() control: FormControl;
	@Output() change = new EventEmitter();

	list$: Observable<Location[]> | undefined;

	constructor(
		private _locationService: LocationService,
		private _modalService: NzModalService,
	) {
		// if (!this.locationService.list)
		// 	this.locationService.refreshList();
		this.list$ = this._locationService.toList();
	}

	compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

	ngOnInit(): void {
		console.log(this.control.value);
	}

	onChange(event) {
		this.change.emit(event);
	}

	openEditModal() {
		this._modalService.create({
			nzContent: AddLocationModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: 'Thêm mới Địa điểm',
				model: null
			}
		});
	}

}
