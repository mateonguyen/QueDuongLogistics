import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Vehicle } from 'src/app/__models/vehicle';
import { VehicleService } from 'src/app/__services/vehicle.service';
import { removeVI } from 'jsrmvi';
import { AddVehicleModalComponent } from './add-vehicle-modal/add-vehicle-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
@Component({
	selector: 'app-vehicle',
	templateUrl: './vehicle.component.html',
	styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';
	modelVehicle: Vehicle[] = [];

	constructor(
		public dataService: VehicleService,
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
					const vehicle: Vehicle = {
						id: 0,
						typeOfVehicle: item.TypeOfVehicle,
						vehicleNumber: item.VehicleNumber,
						payloadCapacity: item.PayloadCapacity,
						payloadCapacityUnit: item.PayloadCapacityUnit
					};

					this.modelVehicle.push(vehicle);
				});
				console.log(this.modelVehicle);

				this.dataService.import(this.modelVehicle as Vehicle[]).subscribe({
					next: res => {
						this.dataService.list = res as Vehicle[];
						this._notificationService.success(
							'Chúc mừng!',
							'Bạn vừa thêm mới thành công thông tin Phương tiện.',
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

	openEditModal(model?: Vehicle) {
		let initialState = {
			title: 'Thêm mới Phương tiện',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Phương tiện';
		} else {
			initialState.title = 'Sửa thông tin Phương tiện';
			initialState.model = model;
		}

		this._modalService.create({
			nzContent: AddVehicleModalComponent,
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

	onDelete(model: Vehicle) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Phương tiện <strong>#' + model.typeOfVehicle + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.dataService.delete(model.id).subscribe({
					next: (res) => {
						this.dataService.list = res as Vehicle[];
						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Phương tiện <strong>' + model.typeOfVehicle + '</strong>',
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
