import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogisticComponent } from "./logistic.component";
import { AuthGuard } from "../__guards/auth.guard";
import { TransactionComponent } from "./transaction/transaction.component";
import { DriverComponent } from "./driver/driver.component";
import { CustomerComponent } from "./customer/customer.component";
import { VendorComponent } from "./vendor/vendor.component";
import { VehicleComponent } from "./vehicle/vehicle.component";
import { LocationComponent } from "./location/location.component";
import { AddTransactionComponent } from "./transaction/add-transaction/add-transaction.component";
import { PreventUnsavedChangesGuard } from "../__guards/prevent-unsaved-changes.guard";
import { ScheduleComponent } from "./transaction/schedule/schedule.component";
import { OrderComponent } from "./order/order.component";
import { FinanceComponent } from "./finance/finance.component";
import { OrderEditComponent } from "./order/order-edit/order-edit.component";
import { FinanceEditComponent } from "./finance/finance-edit/finance-edit.component";
import { FinanceTypeComponent } from "./finance/finance-type/finance-type.component";

const routes: Routes = [
	{
		path: '',
		component: LogisticComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
			{ path: 'transaction/list', component: TransactionComponent, canActivate: [AuthGuard] },
			{ path: 'transaction/schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
			{ path: 'transaction/new', component: AddTransactionComponent, canActivate: [AuthGuard], canDeactivate: [PreventUnsavedChangesGuard] },
			{ path: 'transaction/edit/:id', component: AddTransactionComponent, canActivate: [AuthGuard], canDeactivate: [PreventUnsavedChangesGuard] },
			{ path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
			{ path: 'order/list', component: OrderComponent, canActivate: [AuthGuard] },
			{ path: 'order/new', component: OrderEditComponent, canActivate: [AuthGuard] },
			{ path: 'order/edit:id', component: OrderEditComponent, canActivate: [AuthGuard] },
			{ path: 'finance', component: FinanceComponent, canActivate: [AuthGuard] },
			{ path: 'finance/list', component: FinanceComponent, canActivate: [AuthGuard] },
			{ path: 'finance/new', component: FinanceEditComponent, canActivate: [AuthGuard] },
			{ path: 'finance/edit:id', component: FinanceEditComponent, canActivate: [AuthGuard] },
			{ path: 'finance/type', component: FinanceTypeComponent, canActivate: [AuthGuard] },
			{ path: 'driver', component: DriverComponent, canActivate: [AuthGuard] },
			{ path: 'vehicle', component: VehicleComponent, canActivate: [AuthGuard] },
			{ path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
			{ path: 'vendor', component: VendorComponent, canActivate: [AuthGuard] },
			{ path: 'location', component: LocationComponent, canActivate: [AuthGuard] },
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LogisticRoutingModule { }
