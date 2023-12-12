import { Component, Input } from '@angular/core';

@Component({
	selector: 'svg-icon',
	templateUrl: './svg-icon.component.html',
	styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent {
	@Input() name: string;
	@Input() size = 16;
	@Input() width = 0;
	@Input() height = 0;
	@Input() fill = 'currentColor';
	@Input() className = '';

	constructor() { }

	get iconUrl() {
		return `${window.location.href}#${this.name}`;
	}
}
