import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ControlModule } from '../__controls/control.module';
import { CodesComponent } from './codes/codes.component';
import { GroupsComponent } from './groups/groups.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditGroupModalComponent } from './groups/edit-group-modal/edit-group-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteGroupConfirmComponent } from './groups/delete-group-confirm/delete-group-confirm.component';
import { TuiAlertModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { EditUserModalComponent } from './users/edit-user-modal/edit-user-modal.component';
import { SharedModule } from '../__modules/shared.module';
import { EditRoleModalComponent } from './roles/edit-role-modal/edit-role-modal.component';
import { RolesModalComponent } from './groups/roles-modal/roles-modal.component';
import { CodeSwitcherComponent } from './codes/code-switcher/code-switcher.component';
import { EditCodeModalComponent } from './codes/code-switcher/edit-code-modal/edit-code-modal.component';
import { RemoveCodeConfirmComponent } from './codes/code-switcher/remove-code-confirm/remove-code-confirm.component';
import { RemoveCodeValueConfirmComponent } from './codes/remove-code-value-confirm/remove-code-value-confirm.component';
import { EditCodeValueModalComponent } from './codes/edit-code-value-modal/edit-code-value-modal.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzBadgeModule } from 'ng-zorro-antd/badge';


@NgModule({
	declarations: [
		AdminComponent,
		CodesComponent,
		GroupsComponent,
		RolesComponent,
		UsersComponent,
		EditGroupModalComponent,
		DeleteGroupConfirmComponent,
		EditUserModalComponent,
		EditRoleModalComponent,
		RolesModalComponent,
		CodeSwitcherComponent,
		EditCodeModalComponent,
		RemoveCodeConfirmComponent,
		RemoveCodeValueConfirmComponent,
		EditCodeValueModalComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AdminRoutingModule,
		ControlModule,
		ModalModule.forRoot(),
		TuiScrollbarModule,
		TimeagoModule.forRoot({
			formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
		}),
		// TimeagoModule.forRoot(),
		SharedModule,
		TuiAlertModule,
		NzTableModule,
		NzModalModule,
		NzInputModule,
		NzIconModule,
		NzSelectModule,
		NzDropDownModule,
		NzNotificationModule,
		NzBadgeModule
	],
	providers: [
		TimeagoIntl
	]
})
export class AdminModule { }
