import { Component, ViewChild } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';

@Component({
	selector: 'app-navbar-left',
	templateUrl: './navbar-left.component.html',
	styleUrls: ['./navbar-left.component.scss'],
})
export class NavbarLeftComponent {
	@ViewChild('dropdown') dropdown: BsDropdownDirective;

	constructor() { }

	focus() {
		this.dropdown.autoClose = false;
	}

	blur() {
		this.dropdown.autoClose = true;
	}
}
