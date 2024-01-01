import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Vendor } from 'src/app/__models/vendor';
import { VendorService } from 'src/app/__services/vendor.service';
import { removeVI } from 'jsrmvi';
import { AddVendorModalComponent } from './add-vendor-modal/add-vendor-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-vendor',
	templateUrl: './vendor.component.html',
	styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';
	modelVendor: Vendor[] = [];

	constructor(
		public dataService: VendorService,
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

					const vendor: Vendor = {
						id: 0,
						vendorCode: item.VendorCode,
						vendorName: item.VendorName,
						photo: '',
					};

					this.modelVendor.push(vendor);
				});
				console.log(this.modelVendor);

				this.dataService.import(this.modelVendor as Vendor[]).subscribe({
					next: res => {
						this.dataService.list = res as Vendor[];
						this._notificationService.success(
							'Chúc mừng!',
							'Bạn vừa thêm mới thành công thông tin Lái xe.',
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

	openEditModal(model?: Vendor) {
		let initialState = {
			title: 'Thêm mới Nhà cung cấp',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Nhà cung cấp';
		} else {
			initialState.title = 'Sửa thông tin Nhà cung cấp';
			initialState.model = model;
		}

		this._modalService.create({
			nzContent: AddVendorModalComponent,
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

	onDelete(model: Vendor) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Nhà cung cấp <strong>#' + model.vendorName + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.dataService.delete(model.id).subscribe({
					next: (res) => {
						this.dataService.list = res as Vendor[];
						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Nhà cung cấp <strong>' + model.vendorName + '</strong>',
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
