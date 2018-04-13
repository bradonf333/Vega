// import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'f0TYWWgPC192fqjiY4NT6TywFBKWLOza',
    domain: 'bradonf123.auth0.com',
    responseType: 'token id_token',
    audience: 'https://bradonf123.auth0.com/userinfo',
    redirectUri: 'http://localhost:5000/callback',
    scope: 'openid profile'
  });

  userProfile: any;
  private roles: any = [];


  constructor(public router: Router) {

    // Re-assign the roles property when user refreshes the browser
    this.readRolesFromLocalStorage();

  }

  public isInRole(roleName: string) {
    return this.roles.indexOf(roleName) > -1;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.readRolesFromLocalStorage();
        this.router.navigate(['/vehicles']);
        console.log("authResult", authResult);
        console.log("Roles ", this.roles);
      } else if (err) {
        this.router.navigate(['/vehicles']);
        console.log(err);
      }
    });
  }

  private setSession(authResult: any): void {

    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('id_token_payload', authResult.idTokenPayload['https://vega.com/roles']);
    localStorage.setItem('expires_at', expiresAt);

  }

  public logout(): void {

    var logout = confirm("Are you sure you want to log out?");

    if (logout == true) {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('token');
      localStorage.removeItem('id_token_payload');
      localStorage.removeItem('expires_at');

      //Reset the roles property
      this.roles = '';

      alert("You have successfully logged out!");

      // Go back to the home route
      this.router.navigate(['/']);
    }
  }

  public isAuthenticated(): boolean {

    // Check whether the current time is past the
    // Access Token's expiry time
    // const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const expiresAt = localStorage.getItem('expires_at');
    if (expiresAt) {
      return new Date().getTime().toString() < expiresAt;
    }
    else {
      return false;
    }

  }

  public getProfile(cb: any): void {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;

    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        console.log("profile", self.userProfile);
        console.log("accessToken", accessToken);
        console.log("Roles: ", self.userProfile['https://vega.com/roles']);
      }
      cb(err, profile);
    });
  }

  private readRolesFromLocalStorage() {

    // Re-assign the roles property when user refreshes the browser
    var id_token_payload: any = localStorage.getItem('id_token_payload');
    if (id_token_payload) {
      this.roles = id_token_payload;
    }

  }

}