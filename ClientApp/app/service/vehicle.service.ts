import { Vehicle, SaveVehicle } from './../components/app/models/vehicle';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class VehicleService {

  // Web-api url for Makes and Features
  private makesUrl = '/api/makes';
  private featuresUrl = '/api/features';
  private vehiclesUrl = '/api/vehicles';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getMakes() {
    return this.http.get(this.makesUrl)
      .map(res => res.json());
  }

  getFeatures() {
    return this.http.get(this.featuresUrl)
      .map(res => res.json());
  }

  createVehicle(vehicle: any) {
    return this.authHttp.post(this.vehiclesUrl, vehicle)
      .map(res => res.json());
  }

  updateVehicle(vehicle: SaveVehicle) {
    return this.authHttp.put(this.vehiclesUrl + '/' + vehicle.id, vehicle)
      .map(res => res.json);
  }

  deleteVehicle(id: number) {
    return this.authHttp.delete(this.vehiclesUrl + '/' + id)
      .map(res => res.json);
  }

  getVehicle(id: number) {
    return this.http.get(this.vehiclesUrl + '/' + id)
      .map(res => res.json());
  }

  getVehicles(filter: any) {
    return this.http.get(this.vehiclesUrl + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj: any[]) {

    var parts: any[];
    parts = [];

    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join('&');
  }

}
