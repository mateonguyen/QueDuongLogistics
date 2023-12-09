import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/__guards/auth.guard';
import { AccountComponent } from './account/account.component';
import { PasswordComponent } from './password/password.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'account', component: AccountComponent },
      { path: 'preferences', component: PreferencesComponent },
      { path: 'password', component: PasswordComponent },
      { path: '', redirectTo: 'account', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
