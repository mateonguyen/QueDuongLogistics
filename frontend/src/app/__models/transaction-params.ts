export class TransactionParams {
	pageSize = 20;
	pageNumber = 1;

	term = '';
	customerFilter = 0;
	vendorFilter = 0;
	sortField = 'Id';
	sortOrder = 'descend';

	transDateFrom: Date | null = null;
	transDateTo: Date | null = null;

	constructor() {
	}
}
