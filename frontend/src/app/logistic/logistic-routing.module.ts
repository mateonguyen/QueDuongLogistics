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
import { ShippingRouteComponent } from "./shipping-route/shipping-route.component";
import { ScheduleComponent } from "./transaction/schedule/schedule.component";

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
			{ path: 'driver', component: DriverComponent, canActivate: [AuthGuard] },
			{ path: 'vehicle', component: VehicleComponent, canActivate: [AuthGuard] },

			{ path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
			{ path: 'vendor', component: VendorComponent, canActivate: [AuthGuard] },
			{ path: 'location', component: LocationComponent, canActivate: [AuthGuard] },
			{ path: 'shipping-route', component: ShippingRouteComponent, canActivate: [AuthGuard] },
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LogisticRoutingModule { }
