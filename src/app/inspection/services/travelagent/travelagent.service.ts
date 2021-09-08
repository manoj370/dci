import { Injectable } from '@angular/core';
import { HttpServiceService } from './../../../common-service/http-service.service';
import { travelagenturlServices } from '../../models/travelagent/travelagent.model';

@Injectable({
  providedIn: 'root'
})
export class TravelagentService {

  constructor(public url: travelagenturlServices, public http: HttpServiceService) { }

  // Get Calls
  getAllInspections() {
    return this.http.get(this.url.travelAgentAllInspection);
  }
  getBookingInspections() {
    return this.http.get(this.url.travelAgentupcomingbooking + '?travelAgentId=' + sessionStorage.getItem('userId-usec'));
  }
  getBookingCompleted() {
    return this.http.get(this.url.travelAgentcompleted + '?travelAgentId=' + sessionStorage.getItem('userId-usec'));
  }
  getInspectordetails(id: any) {
    return this.http.get(this.url.inspectorDetails + '?inspectionId=' + id);
  }
  getTravelTypeList() {
    return this.http.get(this.url.travelType);
  }

  getTaxList() {
    return this.http.get(this.url.taxList);
  }

  // Put Calls
  booking(inspectionId: any) {
    return this.http.update(this.url.travelAgentbooking + '?inspectionId=' + inspectionId + '&travelAgentId=' + sessionStorage.getItem('userId-usec'), '');
  }

  // Post calls 
  uploadTktDetails(files: any, bookingObj: any) {
    console.log(files);
    console.log(bookingObj);

    const formdata = new FormData();
    // tslint:disable-next-line: prefer-for-of insecptionTravelDetailsDTO
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      if (files[i].fileId === '1') {
        formdata.append('flightTicket', files[i].value);
      } else if (files[i].fileId === '2') {
        formdata.append('trainTicket', files[i].value);
      } else if (files[i].fileId === '3') {
        formdata.append('busTicket', files[i].value);
      } else if (files[i].fileId === '4') {
        formdata.append('cabTicket', files[i].value);
      } else {
        formdata.append('hotelTicket', files[i].value);
      }

    }
    // formdata.append('files', filearray);
    console.log(bookingObj);
    formdata.append('insecptionTravelDetailsDTO', JSON.stringify(bookingObj));
    return this.http.post(this.url.uploadTktDetails, formdata);

  }

}
