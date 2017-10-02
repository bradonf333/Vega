import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class MakeService {

  // Web-api url for Makes
  private makesUrl = '/api/makes';

  constructor(private http: Http) { }

  getMakes() {
    return this.http.get(this.makesUrl)
      .map(res => res.json());
  }

}
