import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { AccountService } from 'src/app/__states/account/account.service';

@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
	passwordForm: FormGroup;
	globalError: string;

	constructor(
		private accountService: AccountService,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.passwordForm = this.fb.group({
			currentPassword: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', [Validators.required, Validators.minLength(6), this.matchValues('password')]],
		});
	}

	matchValues(matchTo: string): ValidatorFn {
		return (control: AbstractControl) => control?.value === control?.parent?.controls[matchTo].value
			? null
			: { isMatching: true };
	}

	changePassword() {
		this.accountService.changePassword(this.passwordForm.value).subscribe(
			() => {
				this.accountService.alert({
					type: 'primary',
					message:
						'Mật khẩu đã được cập nhật thành công. Vui lòng đăng nhập lại.',
				});
				this.accountService.logout();
			},
			(err) => {
				this.globalError = err.error;
				console.log(err);
			}
		);
	}
}
