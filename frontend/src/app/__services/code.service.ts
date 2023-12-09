import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Code, CodeValue } from '../__models/code';

@Injectable({
	providedIn: 'root'
})
export class CodeService {
	baseUrl: string;

	selectedCode: Code;

	constructor(private _http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	listCode() {
		return this._http.get<Partial<Code[]>>(this.baseUrl + 'code');
	}

	createCode(model: Code) {
		return this._http.post(this.baseUrl + 'code/create', model);
	}

	updateCode(model: Code) {
		return this._http.put(this.baseUrl + 'code/update', model);
	}

	deleteCode(id: number) {
		return this._http.delete(this.baseUrl + 'code/' + id);
	}

	listValue(codeName: string) {
		return this._http.get<Partial<CodeValue[]>>(this.baseUrl + 'code/list-values-by-code/' + codeName);
	}

	listValueByCode(codeName: string) {
		return this._http.get<Partial<CodeValue[]>>(this.baseUrl + 'code/list-values-by-code/' + codeName);
	}

	createValue(model: CodeValue) {
		return this._http.post(this.baseUrl + 'code/create-value', model);
	}

	updateValue(model: CodeValue) {
		return this._http.put(this.baseUrl + 'code/update-value', model);
	}

	deleteValue(id: number) {
		return this._http.delete(this.baseUrl + 'code/delete-value/' + id)
	}
}
