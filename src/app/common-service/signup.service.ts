import { Injectable } from '@angular/core';
import { urlServices } from '../griviance/models/url.models';
import { HttpServiceService } from './http-service.service';


@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(public url: urlServices, public http: HttpServiceService) { }
  login(emailid: any, password: any, obj) {
    console.log(this.url.login)
    return this.http.post(this.url.login + '?userName=' + emailid + '&password=' + password, obj);
  }
  getLoginUserId() {
    return this.http.get(this.url.getLoginUserId);
  }
  getAccessTokenByRefreshToken(token) {
    return this.http.post(this.url.getAccessTokenByRefreshToken + '?refreshToken=' + token, '');
  }
  // checkCurrentPwd
  checkCurrentpwd(value){
    return this.http.get(this.url.checkCurPwd +'?value=' + value);
  }
  // changePassword
  changePassword(obj){
    return this.http.update(this.url.changePwd,obj);
  }


}
