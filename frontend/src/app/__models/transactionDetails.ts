export interface TransactionDetails {
	id?: number;
	contType : number;
	contCount : number;
	packageCount : number;
	packageUnit : string;
	quantity : number;
	unit : string;
	goodsDescription : string;
	deliveredPlace : string;
	deliveredTime : string;
}
