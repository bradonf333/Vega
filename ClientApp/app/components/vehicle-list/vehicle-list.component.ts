import { Component, OnInit } from '@angular/core';
import { Vehicle, KeyValuePair } from '../app/models/vehicle';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  // allVehicles: Vehicle[];
  makes: KeyValuePair[];
  query: any = {};
  columns = [
    { title: 'Id'},
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'View Vehicle' },
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
    // .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles); used for Client-Side filtering
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  onFilterChange() {
    this.populateVehicles();
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

  resetFilter() {
    this.query = {};
    this.onFilterChange();
  }

}
