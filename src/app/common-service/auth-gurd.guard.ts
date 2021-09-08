import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { JwtServiceService } from './jwt-service.service';
import { encryptionService } from '../common-service/cedService';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  accessToken: string;
  constructor(public router: Router, public ced: encryptionService) { }

  // Can Activate for component
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authService();
  }
  // Can Activate for Modules
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.authService();
  }
  // Can Activate for child component
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authService();
  }
  authService(): boolean {
    this.accessToken = this.ced.decryptingProcess('access-token');
    if (this.accessToken !=='') {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
    return false;
  }
  // logout and clear local storage
  clearSession() {
    window.sessionStorage.clear();
  }

  // checkTokenExpiredOrNot() {
  //   const cur_date_time = moment().utc().format('DD-MM-YYYY HH:mm:ss');
  //   const userDetails = JSON.parse(window.sessionStorage.user_details);
  //   const token_expire_time = userDetails.token_expire_time;
  //   const a = moment(cur_date_time, 'DD-MM-YYYY HH:mm:ss'); // must be current time
  //   const b = moment(token_expire_time, 'DD-MM-YYYY HH:mm:ss'); // must me expire time 15-11-2017 07:26:06
  //   const diffInseconds = b.diff(a, 'seconds');
  //   if (diffInseconds > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // policies(url): boolean {
  //   if (this.accessToken) {
  //     const role = JSON.parse(window.sessionStorage.user_details).role.toLowerCase();
  //     if (url.toLowerCase().indexOf(role) !== -1) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

}
