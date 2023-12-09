import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../__guards/auth.guard';

export const AUTH_ROUTES: Routes = [
	{
		path: 'admin',
		loadChildren: () =>
			import('../admin/admin.module').then((m) => m.AdminModule),
	},
	{
		path: 'profile',
		loadChildren: () =>
			import('../profile/profile.module').then((m) => m.ProfileModule),
	},
	{
		path: 'logistic',
		loadChildren: () =>
			import('../logistic/logistic.module').then((m) => m.LogisticModule),
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuard],
	},
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard]
	}
];
