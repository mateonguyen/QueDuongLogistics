import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Location } from 'src/app/__models/location';
import { LocationService } from 'src/app/__services/location.service';

@Component({
	selector: 'app-route-location-select',
	templateUrl: './route-location-select.component.html',
	styleUrls: ['./route-location-select.component.scss']
})
export class RouteLocationSelectComponent implements OnInit {
	@Input() control: FormControl;
	@Output() change = new EventEmitter();

	constructor(
		public locationService: LocationService
	) {
		if (!locationService.list)
			locationService.refreshList();
	}

	ngOnInit(): void {

	}

	onChange(event) {
		this.change.emit(event);
	}

}
