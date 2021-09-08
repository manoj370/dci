import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerURLService {

  apiServerAddress: any;
  DocumentServerAddress: any;

  constructor() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '103.210.72.123') {
      // this.apiServerAddress = 'http://36.255.253.200:8080/';
      this.apiServerAddress = 'http://103.210.72.123:8080/';
      this.DocumentServerAddress = 'http://okmAdmin:admin@103.210.72.67/';
    } else if (window.location.hostname === '36.255.253.200') {
      this.apiServerAddress = 'http://36.255.253.200:8080/';
      this.DocumentServerAddress = 'http://okmAdmin:admin@103.210.74.169/';
    }
  }
}
export const VARIABLE_SERVICE_PROVIDER = [
  ServerURLService
];
