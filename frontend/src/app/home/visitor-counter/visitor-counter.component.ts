import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/__core/states/app/app.service';
import { VisitorCounter } from 'src/app/__models/visitor-counter';
import { HomeService } from 'src/app/__services/home.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-visitor-counter',
	templateUrl: './visitor-counter.component.html',
	styleUrls: ['./visitor-counter.component.scss']
})
export class VisitorCounterComponent implements OnInit {
	pageviewsCount: number = 0;
	visitCount: number = 0;

	constructor(
		private _http: HttpClient,
		private _appService: AppService,
		private _homeService: HomeService
	) {

	}

	ngOnInit(): void {
		// // this.getCounter();
		this.updateCounter();

		// if (sessionStorage.getItem('visit') === null) {
		// 	//New visit and pageview
		// 	this._appService.updateCounter('visit-pageview');
		// } else {
		// 	// Pageview
		// 	this._appService.updateCounter('pageview');
		// }

		// sessionStorage.setItem('visit', 'x');
	}

	getCounter() {
		this._appService.getCounter().subscribe(
			(data: VisitorCounter) => {
				this.pageviewsCount = data.pageViews;
				this.visitCount = data.visits;
			}
		)
	}

	updateCounter() {
		// Pageview
		let type = 'pageview';

		if (sessionStorage.getItem('visit') === null) {
			//New visit and pageview
			type = 'visit-pageview';
		}

		this._homeService.updateCounter(type).subscribe((res: VisitorCounter) => {
			this.pageviewsCount = res.pageViews;
			this.visitCount = res.visits;
		});

		sessionStorage.setItem('visit', 'x');
	}
}
