import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SideBarLink } from 'src/app/__models/ui-models/nav-link';
import { AccountQuery } from 'src/app/__states/account/account.query';
import { LayoutQuery } from 'src/app/__states/layout/layout.query';
import { LayoutService } from 'src/app/__states/layout/layout.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
	@Input() navItems: SideBarLink[];

	timeout: any;
	transform = '';

	get icon(): string {
		return this.layoutQuery.expanded ? 'chevron-double-lg-left' : 'chevron-double-lg-right';
	}

	get sidebarWidth(): number {
		return this.layoutQuery.expanded ? 245 : 48;
	}

	constructor(
		private layoutService: LayoutService,
		public layoutQuery: LayoutQuery,
		public accountQuery: AccountQuery
	) { }

	ngOnInit(): void {
		this.layoutService.handleResize();
	}

	toggle(): void {
		this.layoutService.manualToggle();
	}

	onClick(item: SideBarLink): void {
		item.isOver = false;
		clearTimeout(this.timeout);
	}

	onTopMouseEnter(item: SideBarLink, e: any): void {
		clearTimeout(this.timeout);

		this.navItems.map((x) => {
			x.isOver = false;
		});

		const rect = e.target.getBoundingClientRect();

		if (this.layoutQuery.expanded === false) {
			item.isOver = true;
			this.transform = 'translate3d(' + rect.width + 'px, ' + (rect.top - 5).toString() + 'px, 0)';
		} else {
			if (!e.target.classList.contains('active') && item.children.length > 0) {
				item.isOver = true;
				this.transform = 'translate3d(' + rect.width + 'px, ' + (rect.top - 5).toString() + 'px, 0)';
			}
		}

		// if (!e.target.classList.contains('active') || this.layoutQuery.expanded === false) {
		// 	item.isOver = true;
		// 	this.transform = 'translate3d(' + rect.width + 'px, ' + (rect.top - 40).toString() + 'px, 0)';
		// }

		// if ((!e.target.classList.contains('active') || this.layoutQuery.expanded === false) && item.children.length > 0) {
		// 	this.transform = 'translate3d(' + rect.width + 'px, ' + (rect.top - 40).toString() + 'px, 0)';
		// }
	}

	onTopMouseLeave(item: SideBarLink): void {
		this.timeout = setTimeout(() => {
			item.isOver = false;
		}, 200);
	}

	onSubMouseLeave(item: SideBarLink): void {
		item.isOver = false;
	}
}
