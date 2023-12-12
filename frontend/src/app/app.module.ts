import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { ControlModule } from './__controls/control.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './__interceptors/jwt.interceptor';
import { LoadingInterceptor } from './__interceptors/loading.interceptor';
import { DefaultLayoutComponent } from './__layouts/default-layout/default-layout.component';
import { AdminLayoutComponent } from './__layouts/admin-layout/admin-layout.component';
import { HEADER_COMPONENTS } from './__components/header';
import { ShowIfLoggedInDirective } from './__directives/show-if-logged-in.directive';
import { ErrorInterceptor } from './__interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TuiNotificationModule, TuiRootModule, TUI_SANITIZER, TuiScrollbarModule } from '@taiga-ui/core';

import { LoginComponent } from './login/login.component';
import { HasRoleDirective } from './__directives/has-role.directive';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './__modules/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpinModule } from "ng-zorro-antd/spin";
import { HomeComponent } from './home/home.component';
import { VisitorCounterComponent } from './home/visitor-counter/visitor-counter.component';
import { AuditHomeComponent } from './home/audit-home/audit-home.component';
import { TimeagoModule } from 'ngx-timeago';

registerLocaleData(vi);

@NgModule({
	declarations: [
		AppComponent,
		...HEADER_COMPONENTS,
		ShowIfLoggedInDirective,
		DefaultLayoutComponent,
		AdminLayoutComponent,
		NotFoundComponent,
		ServerErrorComponent,
		LoginComponent,
		HasRoleDirective,
		DashboardComponent,
		HomeComponent,
		VisitorCounterComponent,
		AuditHomeComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		AkitaNgRouterStoreModule,
		BsDropdownModule.forRoot(),
		NgbModule,
		ControlModule,
		TuiRootModule,
		TuiScrollbarModule,
		TuiNotificationModule,
		AdminModule,
		SharedModule,
		NzSpinModule,
		NzAlertModule,
		NzDatePickerModule,
		TimeagoModule.forRoot(),
		// TimeagoModule.forRoot({
		// 	formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
		// }),
	],
	providers: [
		// {
		//   provide: NG_ENTITY_SERVICE_CONFIG,
		//   useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' },
		// },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
		{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
		{ provide: NZ_I18N, useValue: vi_VN },

	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent],
})
export class AppModule { }
