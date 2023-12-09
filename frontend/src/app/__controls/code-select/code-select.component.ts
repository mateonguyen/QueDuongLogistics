import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CodeValue } from 'src/app/__models/code';
import { CodeService } from 'src/app/__services/code.service';

@Component({
	selector: 'app-code-select',
	templateUrl: './code-select.component.html',
	styleUrls: ['./code-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CodeSelectComponent),
			multi: true
		}
	]
})
export class CodeSelectComponent implements OnInit, ControlValueAccessor {
	@Input() label: string;
	@Input() codeName: string;
	@Input() required: boolean;

	values: CodeValue[];

	private _value: string;

	get value() {
		return this._value;
	}

	set value(value: string) {
		if (value !== this._value) {
			this._value = value;
			this.onChange(value);
		}
	}

	constructor(private _codeService: CodeService) {

	}
	ngOnInit(): void {
		this._codeService.listValueByCode(this.codeName).subscribe((res) => {
			this.values = res;
		});
	}

	onChange(_) {

	}

	onTouch() {

	}

	writeValue(obj: any): void {
		this._value = obj;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}
}
