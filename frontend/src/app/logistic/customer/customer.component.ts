import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from 'src/app/__models/customer';
import { CustomerService } from 'src/app/__services/customer.service';
import { removeVI } from 'jsrmvi';
import { AddCustomerModalComponent } from './add-customer-modal/add-customer-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-customer',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';
	modelCustomer: Customer[] = [];

	constructor(
		public dataService: CustomerService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
	) { }

	@ViewChild('fileInput') fileInput: any;

	handleFileInput(files: FileList) {
		const file = files.item(0);
		if (file) {
			this.readExcel(file);
		}
	}

	readExcel(file: File) {
		// Xử lý đọc Excel
		const reader: FileReader = new FileReader();

		reader.onload = (e: any) => {
			const binaryString: string = e.target.result;
			const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });

			// Đọc dữ liệu từ sheet đầu tiên
			const sheetName: string = workbook.SheetNames[0];
			const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

			// Chuyển đổi dữ liệu sang mảng JSON
			const data: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true, dateNF: 'yyyy-MM-dd' });

			// Bạn có thể xử lý dữ liệu ở đây, ví dụ: lưu vào cơ sở dữ liệu hoặc hiển thị trên giao diện
			if (data) {

				data.forEach(item => {

					const customer: Customer = {
						id: 0,
						customerCode: item.CustomerCode,
						customerName: item.CustomerName,
						photo: '',
					};

					this.modelCustomer.push(customer);
				});
				console.log(this.modelCustomer);

				this.dataService.import(this.modelCustomer as Customer[]).subscribe({
					next: res => {
						this.dataService.list = res as Customer[];
						this._notificationService.success(
							'Chúc mừng!',
							'Bạn vừa thêm mới thành công thông tin Khách hàng.',
							{ nzDuration: 5000, nzAnimate: true }
						)
					},
					error: err => {
						if (err.status == 400) {
							this._notificationService.error(
								'Lỗi!',
								err.error,
								{ nzDuration: 5000, nzAnimate: true }
							);
						}
					}
				});
			}
		};

		reader.readAsBinaryString(file);
	}

	ngOnInit(): void {
		this.dataService.refreshList();
	}

	refreshList() {

	}

	openEditModal(model?: Customer) {
		let initialState = {
			title: 'Thêm mới Khách hàng',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Khách hàng';
		} else {
			initialState.title = 'Sửa thông tin Khách hàng';
			initialState.model = model;
		}

		this._modalService.create({
			nzContent: AddCustomerModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});
	}

	incrementAndParse(value: string): number {
		// Parse the string to an integer and increment
		return parseInt(value, 10) + 1;
	}

	onDelete(model: Customer) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Nhóm người dùng <strong>#' + model.customerName + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.dataService.delete(model.id).subscribe({
					next: (res) => {
						this.dataService.list = res as Customer[];
						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Khách hàng <strong>' + model.customerName + '</strong>',
							{ nzDuration: 5000, nzAnimate: true }
						)
					},
					error: (err) => {
						if (err.status == 400) {
							this._notificationService.error(
								'Lỗi!',
								err.error,
								{ nzDuration: 5000, nzAnimate: true }
							);
						}
					}
				});
			}
		})
	}

}
