import { FetchDataComponent } from './../fetchdata/fetchdata.component';
import { VehicleService } from './../../service/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  vehicle: any = {
    features: []
  };

  features: any[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
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

}
