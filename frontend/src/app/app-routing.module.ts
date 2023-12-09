import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './__layouts/admin-layout/admin-layout.component';
import { AUTH_ROUTES } from './__routes/AUTH_ROUTES';

const routes: Routes = [

	{
		path: '',
		component: AdminLayoutComponent,
		children: AUTH_ROUTES,
	},
	{ path: 'login', component: LoginComponent, },
	{ path: 'not-found', component: NotFoundComponent },
	{ path: 'server-error', component: ServerErrorComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
