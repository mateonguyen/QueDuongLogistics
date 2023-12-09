export interface Audit {
	id: number;
	userName: string;
	entityName: string;
	auditType: string;
	auditTime: Date;
}
