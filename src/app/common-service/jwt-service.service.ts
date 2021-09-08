

import * as moment from 'moment/moment';
import { Injectable } from '@angular/core';
// import { Token } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {
  // token: Token;
    // getToken(): string {
    //     let userdetails;
    //     if (window.sessionStorage['user_details']) {
    //         userdetails = JSON.parse(window.sessionStorage['user_details']);
    //         return userdetails['api_key'];
    //     }
    // }
    
    // saveToken(sessionObj: UserDetails) {
    //     this.token = sessionObj.api_key;
    //     let expireDateTime = moment().utc().add(1, 'days').format('DD-MM-YYYY HH:mm:ss');
    //     let user_details = new UserDetails();
    //     user_details = sessionObj;
    //     console.log(user_details);
    //     window.sessionStorage['user_details'] = JSON.stringify(user_details);
    //     window.sessionStorage['selected_role'] = sessionObj.role;
    //     console.log(window.sessionStorage);
    // }
    destroyToken() {
       // console.log('called');
        window.sessionStorage.removeItem('user_details');
    }
  constructor() { }
}
