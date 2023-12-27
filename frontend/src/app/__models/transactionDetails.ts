export interface TransactionDetails {
	id?: number;
	contType: string;
	contCount: number;
	packageCount: number;
	packageUnit: string;
	quantity: number;
	unit: string;
	goodsDescription: string;
	deliveredPlaceId: number;
	deliveredTime: Date;
}
