import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/__services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  data: any;
  apiUrl = 'http://localhost:5000/api/customer'; // Set your default API URL here

  constructor(private dataService: CustomerService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData(this.apiUrl).subscribe(
      (response) => {
        this.data = response;
        // Handle the data as needed
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
