import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  // Web-api url for Makes and Features
  private makesUrl = '/api/makes';
  private featuresUrl = '/api/features';
  
  constructor(private http: Http) { }

  getMakes() {
    return this.http.get(this.makesUrl)
      .map(res => res.json());
  }

  getFeatures() {
    return this.http.get(this.featuresUrl)
      .map(res => res.json());
  }

}
