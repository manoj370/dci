import { Injectable } from '@angular/core';
import { HttpServiceService } from './../../../common-service/http-service.service';
import { urlServices } from '../../models/url.models';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(public http: HttpServiceService, public url: urlServices) {
  }
  getComplintsList(pageId: number, rows: number) {
    return this.http.get(this.url.collegeComplList + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId +
      '&page=' + pageId + '&rows=' + rows);
  }
  searchComplintsList(search: any, pageId: number, rows: number) {
    return this.http.get(this.url.searchCollege + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId +
      '&searchWord=' + search + '&page=' + pageId + '&rows=' + rows);
  }
  getComplDetails(id: any) {
    return this.http.get(this.url.getComplintDetails + '?complaintId=' + id);
  }
  feedbackOnComplint(obj: any, filearray: any) {
    console.log(filearray);
    const formdata = new FormData();
    formdata.append('workflowStr', JSON.stringify(obj));
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < filearray.length; i++) {
      formdata.append('file', filearray[i]);
    }
    return this.http.post(this.url.feedbackOncolleage, formdata);
  }

//  //POst Call
//  feedbackOnComplint(data: any) {
//   return this.http.post(this.url.feedbackOncolleage, data);

// }

}
