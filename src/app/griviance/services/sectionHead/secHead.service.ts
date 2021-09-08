import { Injectable } from '@angular/core';
import { urlServices } from './../../models/url.models';
import { HttpServiceService } from 'src/app/common-service/http-service.service';


@Injectable({
  providedIn: 'root'
})
export class SecHeadService {


  constructor(public http: HttpServiceService, public url: urlServices) { }
  // All Get Calls
  getAll(pageId: number, rows: number) {
    return this.http.get(this.url.getComplainints + 'sectionHeadUserId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&page=' + pageId + '&rows=' + rows);
  }
  getCompliantDetails(id: any) {
    return this.http.get(this.url.getComplainintDetails + 'complaintId=' + id);
  }
  getChronicalHist(id: any) {
    return this.http.get(this.url.getChronical + '?complaintId=' + id);
  }
  getDashbaordCount() {
    return this.http.get(this.url.dashboardCount + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId);
  }
  getUsersList(id: any) {
    return this.http.get(this.url.userBasedOnRoleList + '?designationId=' + id);
  }
  getRoles() {
    return this.http.get(this.url.rolesList);
  }
  getsearchResult(search: any, pageId: number, rows: number) {
    return this.http.get(this.url.serchHeadCompl + '?sectionHeadUserId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&searchWord=' + search + '&page=' + pageId + '&rows=' + rows);

  }

  // post Calls
  assignCompl(data: any) {
    return this.http.post(this.url.assignComp, data);
  }

  // Put Call
  reappeal(data: any) {
    return this.http.update(this.url.reAppealAccept + '?workflowId=' + 
    data.workflowId + '&justification=' + data.justification+'&justifyComments='+ data.justifyComments, '');
  }
}
