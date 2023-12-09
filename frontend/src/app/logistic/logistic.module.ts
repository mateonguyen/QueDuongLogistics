import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogisticComponent } from './logistic.component';
import { LogisticRoutingModule } from './logistic-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from '../__controls/control.module';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TransactionComponent } from './transaction/transaction.component';
import { DriverComponent } from './driver/driver.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddTransactionComponent } from './transaction/add-transaction/add-transaction.component';
import { TransactionCustomerSelectComponent } from './transaction/add-transaction/transaction-customer-select/transaction-customer-select.component';
import { TransactionDriverSelectComponent } from './transaction/add-transaction/transaction-driver-select/transaction-driver-select.component';
import { TransactionVehicleSelectComponent } from './transaction/add-transaction/transaction-vehicle-select/transaction-vehicle-select.component';



@NgModule({
	declarations: [
		LogisticComponent,
		TransactionComponent,
		DriverComponent,
		CustomerComponent,
		AddCustomerComponent,
		VehicleComponent,
		AddTransactionComponent,
	TransactionCustomerSelectComponent,
	TransactionDriverSelectComponent,
	TransactionVehicleSelectComponent
	],
	imports: [
		CommonModule,
		LogisticRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		ControlModule,
		TuiScrollbarModule,
		NzTableModule,
		NzModalModule,
		NzInputModule,
		NzIconModule,
		NzSelectModule,
		NzDropDownModule,
		NzNotificationModule,
	]
})
export class LogisticModule { }
