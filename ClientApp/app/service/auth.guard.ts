import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(protected auth: AuthService, protected router: Router) { }

  canActivate() {

    if (this.auth.isAuthenticated()) {
      return true;
    }
    else {
      this.auth.login();
      return false;
    }

  }
}
