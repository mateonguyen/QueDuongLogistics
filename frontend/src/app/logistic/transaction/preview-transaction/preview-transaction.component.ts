import { Component, EventEmitter, OnInit, Output, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/__models/vehicle';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { VehicleService } from 'src/app/__services/vehicle.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Transaction } from 'src/app/__models/transaction';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-preview-transaction',
  templateUrl: './preview-transaction.component.html',
  styleUrls: ['./preview-transaction.component.scss']
})
export class PreviewTransactionComponent implements OnInit {

	title?: string;
	editForm: FormGroup;
	transaction: Transaction;
	selectedDate: Date | null = null;
  printing = false;

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder,
		private _notificationService: NzNotificationService,
    private datePipe: DatePipe,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.transaction?.id ?? 0],
		});
	}

  cancel() {
		this.closeModal();
	}

	closeModal() {
		this._modalRef.close();
	}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Check if Ctrl + P is pressed
    if (event.ctrlKey && event.key === 'p') {
      this.print();
    }
  }

  print(): void {
    console.log('Printing...');
    this.printing = true;
    setTimeout(() => {
      window.print();
      this.printing = false;
    }, 500);
    
  }

  parseHumanDate(value: Date): string {
		return this.datePipe.transform(value, 'dd/MM/yyyy');
	}
}
