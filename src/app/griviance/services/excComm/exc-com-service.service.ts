import { Injectable } from '@angular/core';
import { urlServices } from './../../models/url.models';
import { HttpServiceService } from 'src/app/common-service/http-service.service';
@Injectable({
  providedIn: 'root'
})
export class ExcComServiceService {

  constructor(public http: HttpServiceService, public url: urlServices) { }
  // All Get Calls
  getAll(pageId: number, rows: number) {
    return this.http.get(this.url.getAllagendabyExc + 'userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&page=' + pageId + '&rows=' + rows);
  }
  getCompliantDetails(id: any) {
    return this.http.get(this.url.getComplaintofExc + 'complaintId=' + id);
  }
  getOtherSections() {
    return this.http.get(this.url.getAllOtherSec);
  }
  getDashboardCounts() {
    return this.http.get(this.url.excCommDahboard + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId);
  }
  getSerachValue(search: any, pageId: number, rows: number) {
    return this.http.get(this.url.serachAgenda + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&searchWord=' + search + '&page='
      + pageId + '&rows=' + rows);
  }

  // post Calls 
  excutiveDecision(data: any) {
    return this.http.post(this.url.excutiveDecision, data);
  }
  forwardSection(data: any) {
    return this.http.post(this.url.forwardAgenda, data);
  }
  differAgenda(data: any) {
    return this.http.post(this.url.differDecision, data);
  }

  // put Calls
  saveDecision(data: any) {
    return this.http.update(this.url.saveAgenda, data);
  }

}
