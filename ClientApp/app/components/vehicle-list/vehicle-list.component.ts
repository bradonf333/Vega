import { AuthService } from './../../service/auth.service';
import { PaginationComponent } from './../../shared/pagination.component';
import { Component, OnInit } from '@angular/core';
import { Vehicle, KeyValuePair } from '../app/models/vehicle';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  private readonly PAGE_SIZE = 3;
  queryResult: any = {};
  // allVehicles: Vehicle[];
  makes: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'View Vehicle' },
  ];

  constructor(private vehicleService: VehicleService, private auth: AuthService) {
    this.makes = [];
   }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
    // .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles); used for Client-Side filtering
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => this.queryResult = result);
  }

  sortBy(columnName: any) {
    console.log('');
    console.log('Loading...')
    console.log('sortBy =', this.query.sortBy);
    console.log('columnName =', columnName);
    console.log('isSortAscending =', this.query.isSortAscending);

    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
      console.log('Second Click of Column', columnName);
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
      console.log('First Click of Column', columnName);
    }

    console.log('');
    console.log('Done....')
    console.log('sortBy =', this.query.sortBy);
    console.log('columnName =', columnName);
    console.log('isSortAscending =', this.query.isSortAscending);
    this.populateVehicles();
  }

  onFilterChange() {
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  onPageChange(page: any) {
    this.query.page = page;
    this.populateVehicles();
  }

}
