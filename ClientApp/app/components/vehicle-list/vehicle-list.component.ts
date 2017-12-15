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
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
    // .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles); used for Client-Side filtering
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  onFilterChange() {

    this.populateVehicles();

    // Client-Side Filtering
    // var vehicles = this.allVehicles;

    // if (this.filter.makeId) {
    //   vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
    // }

    // this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }

}
