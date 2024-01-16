import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(private http: HttpClient) {}

  exportData(data: any[], templatePath: string, exportFileName: string): void {
    // Read the template file
    this.readBinary(templatePath).subscribe(
      (templateBuffer: Uint8Array) => {
        // Parse the template
        const templateWorkbook = XLSX.read(templateBuffer, { type: 'array' });

        // Modify the workbook with your data
        // Example: Assuming the data goes into the first sheet
        const sheetName = templateWorkbook.SheetNames[0];
        const worksheet = templateWorkbook.Sheets[sheetName];

        // Check if worksheet is defined before trying to access its properties
        if (worksheet) {
          // Start write data to work sheet
          data.forEach((item, index) => {
            const newIndex = index+3;

            worksheet[`A${newIndex}`] = { t: 's', v: item.transactionDate }; 
            worksheet[`B${newIndex}`] = { t: 's', v: item.vehicle.vehicleNumber }; 
            worksheet[`C${newIndex}`] = { t: 's', v: item.driver.fullName }; 
            worksheet[`D${newIndex}`] = { t: 's', v: item.origin }; 

            worksheet[`H${newIndex}`] = { t: 's', v: item.destination }; 
            worksheet[`L${newIndex}`] = { t: 's', v: item.transactionNo }; 

            worksheet[`P${newIndex}`] = { t: 's', v: item.vehicle.typeOfVehicle }; 
            worksheet[`Q${newIndex}`] = { t: 's', v: item.vendor.vendorName }; 
            worksheet[`R${newIndex}`] = { t: 's', v: item.customer.customerName }; 
            worksheet[`S${newIndex}`] = { t: 'n', v: item.demurrageFee }; 
            worksheet[`T${newIndex}`] = { t: 'n', v: item.transshipmentFee }; 
            worksheet[`U${newIndex}`] = { t: 'n', v: item.returnShippingFee }; 
            worksheet[`V${newIndex}`] = { t: 'n', v: item.customsFee }; 
            worksheet[`W${newIndex}`] = { t: 'n', v: item.handlingFee }; 
            worksheet[`X${newIndex}`] = { t: 'n', v: item.ticketFee }; 
            worksheet[`Y${newIndex}`] = { t: 'n', v: item.otherFee }; 
            
            worksheet[`Z${newIndex}`] = { t: 'n', v: item.docManager }; 
            worksheet[`AA${newIndex}`] = { t: 'b', v: item.isCustomerReturn }; 
            worksheet[`AB${newIndex}`] = { t: 'b', v: item.isSummitedDoc }; 

            worksheet[`AD${newIndex}`] = { t: 'z', v: item.notes }; 
          });
        } else {
          console.error('Worksheet is undefined.');
        }

        // Convert the modified workbook back to a binary file
        const exportBuffer = XLSX.write(templateWorkbook, { bookType: 'xlsx', type: 'array' });

        // Save the file
        this.saveFile(exportBuffer, exportFileName);
      },
      (error) => {
        console.error('Error reading template file:', error);
      }
    );
  }

  private readBinary(path: string) {
    return this.http.get(path, { responseType: 'arraybuffer' });
  }

  private saveFile(buffer: Uint8Array, fileName: string): void {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}