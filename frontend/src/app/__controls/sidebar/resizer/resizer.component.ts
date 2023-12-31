import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-resizer',
	templateUrl: './resizer.component.html',
	styleUrls: ['./resizer.component.scss']
})
export class ResizerComponent implements OnInit {
	@Input() expanded: boolean;

	get icon() {
		return this.expanded ? 'chevron-left' : 'chevron-right';
	}
	constructor() { }

	ngOnInit(): void { }
}
