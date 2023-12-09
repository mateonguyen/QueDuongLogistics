import { Component, Input } from '@angular/core';
import { SideBarLink } from 'src/app/__models/ui-models/nav-link';

@Component({
	selector: 'app-nav-item',
	templateUrl: './nav-item.component.html',
	styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent {
	@Input() navItems: SideBarLink[];

	constructor() { }
}
