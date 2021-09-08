import { Injectable } from '@angular/core';
import { urlServices } from './../../models/url.models';
import { HttpServiceService } from './../../../common-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class SecexcuService {

  constructor(public http: HttpServiceService, public url: urlServices) { }
  // All Get Calls
  getAll(pageId: number, rows: number) {
    return this.http.get(this.url.getComplainintsofsecexc + 'userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId +
      '&page=' + pageId + '&rows=' + rows);
  }
  serchGetData(search: any, pageId: number, rows: number) {
    return this.http.get(this.url.searchSEComplList + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&searchWord='
      + search + '&page=' + pageId + '&rows=' + rows);
  }
  getCompliantDetails(id: any) {
    return this.http.get(this.url.getComplaint + '?complaintId=' + id);
  }
  getSDCList() {
    return this.http.get(this.url.getSDClist);
  }
  sectionDashboard() {
    return this.http.get(this.url.seDashboardCount + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId);
  }
  getAgendaNumbers(id: any) {
    return this.http.get(this.url.agendaList + '?sectionId=' + id);
  }
  getAgendaItemNumber() {
    return this.http.get(this.url.getAgendaItemNumber);
  }
  getAgendaDetails(id: any) {
    return this.http.get(this.url.agendaDetails + '?complaintId=' + id);
  }

  // post
  agendaCreate(data: any) {
    return this.http.post(this.url.agendaCreation, data);
  }

  forwardSDC(obj: any, filearray: any) {
    console.log(filearray)
    const formdata = new FormData();
    formdata.append('workflowStr', JSON.stringify(obj));
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < filearray.length; i++) {
      formdata.append('file', filearray[i]);
    }
    return this.http.post(this.url.forwardSDC, formdata);
  }

  forwardColleage(workflowStr: any, files: any) {
    console.log(files[0]);
    const formdata = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formdata.append('file', files[i]);
    }
    formdata.append('workflowStr', JSON.stringify(workflowStr));
    return this.http.post(this.url.forwardCollege, formdata);
  }

  // PUT Calls
  agendaFinalRespinse(data: any) {
    return this.http.update(this.url.finalResponse, data);
  }
  updateAgenda(data: any) {
    return this.http.update(this.url.updateAgenda, data)

  }

  // Delete calls
  deleteAgenda(id: number) {
    return this.http.delete(this.url.agendaDelete + '?complaintId=' + id);
  }

}
