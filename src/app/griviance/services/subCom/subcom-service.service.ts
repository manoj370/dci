import { Injectable } from '@angular/core';
import { urlServices } from './../../models/url.models';
import { HttpServiceService } from 'src/app/common-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class SubcomServiceService {

  constructor(public http: HttpServiceService, public url: urlServices) { }

  // All Get Calls
  getAll(pageId: number, rows: number) {
    return this.http.get(this.url.getAllagenda + 'userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&page=' + pageId + '&rows=' + rows);
  }
  getCompliantDetails(id: any) {
    return this.http.get(this.url.getComplaintofSC + 'complaintId=' + id);
  }
  getDashboardCount() {
    return this.http.get(this.url.scDashboard + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId);
  }
  getSerachValue(search: any, pageId: number, rows: number) {
    return this.http.get(this.url.searchCompl + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&searchWord=' + search + '&page='
      + pageId + '&rows=' + rows);
  }


  // post calls
  subCommitDecision(data: any) {
    return this.http.post(this.url.SubComDecision, data);
  }

}

