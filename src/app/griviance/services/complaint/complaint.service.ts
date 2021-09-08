import { Injectable } from '@angular/core';
import { urlServices } from './../../models/url.models';
import { HttpServiceService, } from 'src/app/common-service/http-service.service';
@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(public http: HttpServiceService, public url: urlServices) { }
  downloaddoc(id: any) {
    return this.http.get<any>(this.url.documentUrl + '?uuid=' + id);
  }
  // Get Calls
  getAllCompalints(pageId: number, rows: number) {
    return this.http.get(this.url.allComplaints + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&page=' + pageId + '&rows=' + rows);
  }
  getComplaintTypes() {
    return this.http.get(this.url.complaintTypes);
  }
  getComplaintAgainst() {
    return this.http.get(this.url.complaintAgainst);
  }
  viewComplaint(complaintId: any) {
    return this.http.get(this.url.viewComp + 'complaintId=' + complaintId);
  }
  colleageByState(collegeName: any) {
    return this.http.get(this.url.colleageByState + '?stateName=' + collegeName);
  }
  coleeageState() {
    return this.http.get(this.url.colleageState);
  }
  dentistData() {
    return this.http.get(this.url.dentistlist);
  }
  secById(sectionId: any) {
    return this.http.get(this.url.sectionById + '?sectionId=' + sectionId);
  }
  allSections() {
    return this.http.get(this.url.allSections);
  }
  serachValue(serach: any, page: any, rows: any) {
    return this.http.get(this.url.searchComplintsList + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&searchWord=' + serach + '&page=' + page + '&rows=' + rows);
  }


  searchDentistList(stateId: any, dentistName: any, page: any, rows: any) {
    return this.http.get(this.url.searchDentistList + '?stateId=' + stateId
      + '&dentistName=' + dentistName + '&page=' + page + '&rows=' + rows);
  }

  // post Call
  raiseCompl(filearray: any, obj: any) {
    console.log(filearray);

    const formdata = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < filearray.length; i++) {
      formdata.append('files', filearray[i]);
    }
    // formdata.append('files', filearray);
    formdata.append('complaintStr', JSON.stringify(obj));
    return this.http.post(this.url.raiseComp, formdata);
  }

  // reappeal Complaint 
  reappeal(obj: any) {
    return this.http.update(this.url.reappeal + '?complaintId=' + obj.complaintid + '&reappealComments=' + obj.comments, '');

  }
}
