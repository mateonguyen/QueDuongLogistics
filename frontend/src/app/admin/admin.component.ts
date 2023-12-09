import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutQuery } from '../__states/layout/layout.query';
import { LayoutService } from '../__states/layout/layout.service';
import { SIDEBAR_LINKS } from './__configs/sidebar';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
	sideBarLinks = SIDEBAR_LINKS;

	constructor(
		public layoutQuery: LayoutQuery,
		private layoutService: LayoutService
	) { }

	ngOnInit(): void {
		this.layoutService.setSideBarLinks(SIDEBAR_LINKS);
	}
}
