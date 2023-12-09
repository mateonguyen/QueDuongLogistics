import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/__guards/auth.guard';
import { AdminComponent } from './admin.component';
import { CodesComponent } from './codes/codes.component';
import { GroupsComponent } from './groups/groups.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		canActivate: [AuthGuard],
		children: [
			// { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
			// { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
			// { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
			{ path: 'users', component: UsersComponent, data: { roles: ['ADM_USER'] }, canActivate: [AuthGuard] },
			{ path: 'roles', component: RolesComponent, data: { roles: ['ADM_ROLE'] }, canActivate: [AuthGuard] },
			{ path: 'groups', component: GroupsComponent, data: { roles: ['ADM_GROUP'] }, canActivate: [AuthGuard] },
			{ path: 'codes', component: CodesComponent, data: { roles: ['ADM_CODE'] }, canActivate: [AuthGuard] },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule { }
