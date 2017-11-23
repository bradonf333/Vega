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
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  onFilterChange() {

  }

}
