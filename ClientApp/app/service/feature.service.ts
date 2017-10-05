import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class FeatureService {

  // Web-api url for Makes
  private featuresUrl = '/api/features';

  constructor(private http: Http) { }

  getFeatures() {
    return this.http.get(this.featuresUrl)
      .map(res => res.json());
  }

}
