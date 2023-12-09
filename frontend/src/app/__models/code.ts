export interface Code {
	id: number;
	name: string;
	description: string;
}

export class CodeValue {
	id: number;
	codeId: number;
	value: string;
	description: string;
	created: Date;
	creator: string;
	modified: Date;
	modifier: string;

	constructor(codeId: number) {
		this.codeId = codeId;
	}
}
