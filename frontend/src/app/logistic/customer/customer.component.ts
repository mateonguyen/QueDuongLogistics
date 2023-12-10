import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/__services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  globalError: string;
  data: any; 

  constructor(private dataService: CustomerService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.list().subscribe(
      (response) => {
        this.data = response;
        console.log(response);
        // Handle the data as needed
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  incrementAndParse(value: string): number {
    // Parse the string to an integer and increment
    return parseInt(value, 10) + 1;
  }

  deleteCustomer(id): boolean {
    if(id){
      const userConfirmed = confirm('Bạn có chắc chắn muốn xóa ?');

      if (userConfirmed) {
        this.dataService.delete(id).subscribe(
          () => {
            alert('Bạn vừa xóa thành công khách hàng.')
            this.loadData();
          }, (err) => {
            console.log(err);
    
          }
        );
      }
    }
		return true;
	}

}
