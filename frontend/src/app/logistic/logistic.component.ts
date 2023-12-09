import { Component, OnInit } from '@angular/core';
import { SIDEBAR_LINKS } from './__configs/sidebar';
import { LayoutQuery } from '../__states/layout/layout.query';
import { LayoutService } from '../__states/layout/layout.service';

@Component({
	selector: 'app-logistic',
	templateUrl: './logistic.component.html',
	styleUrls: ['./logistic.component.scss']
})
export class LogisticComponent implements OnInit {
	sideBarLinks = SIDEBAR_LINKS;

	constructor(
		public layoutQuery: LayoutQuery,
		private layoutService: LayoutService
	) { }

	ngOnInit(): void {
		this.layoutService.setSideBarLinks(SIDEBAR_LINKS);
	}

}
