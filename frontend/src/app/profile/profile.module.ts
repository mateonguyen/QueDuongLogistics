import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ControlModule } from 'src/app/__controls/control.module';
import { AccountComponent } from './account/account.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAlertModule, TuiScrollbarModule } from '@taiga-ui/core';
import { AvatarCropperComponent } from './account/avatar-cropper/avatar-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
	declarations: [
		ProfileComponent,
		AccountComponent,
		PreferencesComponent,
		PasswordComponent,
		ProfileComponent,
		AvatarCropperComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ProfileRoutingModule,
		ControlModule,
		TuiScrollbarModule,
		ModalModule.forRoot(),
		ImageCropperModule,
		TuiAlertModule
	],
})
export class ProfileModule { }
