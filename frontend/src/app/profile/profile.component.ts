import { Component } from '@angular/core';
import { SIDEBAR_LINKS } from './__configs/sidebar';
import { LayoutQuery } from '../__states/layout/layout.query';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
	sideBarLinks = SIDEBAR_LINKS;

	constructor(public layoutQuery: LayoutQuery) { }
}
