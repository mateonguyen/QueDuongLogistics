import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogisticComponent } from "./logistic.component";
import { AuthGuard } from "../__guards/auth.guard";
import { TransactionComponent } from "./transaction/transaction.component";
import { DriverComponent } from "./driver/driver.component";
import { CustomerComponent } from "./customer/customer.component";
import { VehicleComponent } from "./vehicle/vehicle.component";
import { AddTransactionComponent } from "./transaction/add-transaction/add-transaction.component";
import { PreventUnsavedChangesGuard } from "../__guards/prevent-unsaved-changes.guard";

const routes: Routes = [
	{
		path: '',
		component: LogisticComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
			{ path: 'transaction/list', component: TransactionComponent, canActivate: [AuthGuard] },
			{ path: 'transaction/new', component: AddTransactionComponent, canActivate: [AuthGuard], canDeactivate: [PreventUnsavedChangesGuard] },
			{ path: 'transaction/edit/:id', component: AddTransactionComponent, canActivate: [AuthGuard], canDeactivate: [PreventUnsavedChangesGuard] },
			{ path: 'driver', component: DriverComponent, canActivate: [AuthGuard] },
			{ path: 'vehicle', component: VehicleComponent, canActivate: [AuthGuard] },

			{ path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
			{ path: 'customer/list', component: CustomerComponent, canActivate: [AuthGuard] },
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LogisticRoutingModule { }
