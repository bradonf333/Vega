import { FetchDataComponent } from './../fetchdata/fetchdata.component';
import { VehicleService } from './../../service/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  vehicle: any = {
    features: [],
    contact: {}
  };

  features: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) { 

      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });
    }

  ngOnInit() {

    this.vehicleService.getVehicle(this.vehicle.id)
      .subscribe(v => {
        this.vehicle = v;
      });

    this.vehicleService.getMakes()
      .subscribe(makes => {
        this.makes = makes;
        console.log("MAKES", this.makes);
      });

      this.vehicleService.getFeatures()
        .subscribe(features => {
          this.features = features;
          console.log("FEATURES", this.features);
        });
  }

  onMakeChange() {
    console.log("VEHICLE", this.vehicle);

    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;

    console.log("MODELS", this.models);
  }

  onFeatureToggle(featureId: number, $event: any) {
    if($event.target.checked) {
      this.vehicle.features.push(featureId);
    } 
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.createVehicle(this.vehicle)
      .subscribe(x => console.log(x));
  }

}
