import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Driver } from 'src/app/__models/driver';
import { DriverService } from 'src/app/__services/driver.service';
import { removeVI } from 'jsrmvi';
import { AddDriverModalComponent } from './add-driver-modal/add-driver-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';


@Component({
	selector: 'app-driver',
	templateUrl: './driver.component.html',
	styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';
	modelDriver: Driver[] = [];
	list$: Observable<Driver[]> | undefined;

	constructor(
		private _driverService: DriverService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
		private datePipe: DatePipe
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
					const dateBirth = XLSX.SSF.parse_date_code(item.DateOfBirth);
					const dateIssue = XLSX.SSF.parse_date_code(item.IssueDate);

					const driver: Driver = {
						id: 0,
						fullName: item.FullName,
						dateOfBirth: `${dateBirth['y']}${dateBirth['m'].toString().padStart(2, '0')}${dateBirth['d'].toString().padStart(2, '0')}`,
						phoneNo: item.PhoneNo,
						identityCardNo: item.IdentityCardNo,
						issueDate: `${dateIssue['y']}${dateIssue['m'].toString().padStart(2, '0')}${dateIssue['d'].toString().padStart(2, '0')}`,
						issuePlace: item.IssuePlace,
						homeTown: item.HomeTown,
					};

					this.modelDriver.push(driver);
				});
				console.log(this.modelDriver);

				this._driverService.import(this.modelDriver as Driver[]).subscribe({
					next: res => {
						this._driverService.list = res as Driver[];
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
		this.refreshList();
	}

	refreshList() {
		this.list$ = this._driverService.toList().pipe(
			map((drivers) =>
				drivers.filter(
					(driver) => removeVI(driver.fullName.toLowerCase() + ' ' + driver.phoneNo.toLowerCase() + ' ' + driver.homeTown.toLowerCase(), { replaceSpecialCharacters: false })
						.includes(removeVI(this.term.toLowerCase(), { replaceSpecialCharacters: false }))
				)
			)
		)
	}

	openEditModal(model?: Driver) {
		let initialState = {
			title: 'Thêm mới Lái xe',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Lái xe';
		} else {
			initialState.title = 'Sửa thông tin Lái xe';
			initialState.model = model;
		}

		const modalRef = this._modalService.create({
			nzContent: AddDriverModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});

		modalRef.getContentComponent().submited.subscribe(() => {
			this.refreshList();
		});
	}

	incrementAndParse(value: string): number {
		// Parse the string to an integer and increment
		return parseInt(value, 10) + 1;
	}

	parseHumanDate(value: string): string {
		var pattern = /(\d{4})(\d{2})(\d{2})/;
		var dateProcess = new Date(value.replace(pattern, '$1-$2-$3'));
		return this.datePipe.transform(dateProcess, 'dd/MM/yyyy');
	}

	onDelete(model: Driver) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Nhóm người dùng <strong>#' + model.fullName + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this._driverService.delete(model.id).subscribe({
					next: (res) => {
						// this.dataService.list = res as Driver[];
						this.refreshList();

						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Lái xe <strong>' + model.fullName + '</strong>',
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
