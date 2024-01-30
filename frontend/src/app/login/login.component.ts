import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountQuery } from 'src/app/__states/account/account.query';
import { AccountService } from 'src/app/__states/account/account.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(
		private accountService: AccountService,
		public accountQuery: AccountQuery,
		private router: Router,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	login() {
		this.accountService.login(this.loginForm.value).subscribe(
			{
				next: () => {
					this.router.navigateByUrl('');
				},
				error: (error) => {
					this.accountService.alert({ type: 'error', message: error.error });
				}
			}
		);
	}

}
