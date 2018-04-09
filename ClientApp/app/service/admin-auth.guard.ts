import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

  constructor(auth: AuthService, router: Router) {
    super(auth, router);
  }

  canActivate() {
    var isAuthenticated = super.canActivate();

    if (isAuthenticated && this.auth.isInRole('admin')) {
      return true;
    }
    else if (isAuthenticated) {
      alert("Sorry, you do not have access to this page!");
      this.router.navigate(['vehicles']);
      return false;
    }
    else {
      this.auth.login();
      return false;
    }
  }
}
