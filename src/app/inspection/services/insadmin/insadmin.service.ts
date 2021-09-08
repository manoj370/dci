import { Injectable } from '@angular/core';
import { HttpServiceService } from './../../../common-service/http-service.service';
import { insadminUrl } from '../../models/insadmin/insadmin.model';

@Injectable({
  providedIn: 'root'
})
export class InsadminService {

  constructor(public url: insadminUrl, public http: HttpServiceService) { }
  // All Inspectors
  getallInsp(searchWord: any, page: number, rows: number) {
    return this.http.get(this.url.getAllInspectors + '?searchWord=' + searchWord + '&page=' + page + '&rows=' + rows);
  }
  getInsByStatus(status: any, page: number, rows: number) {
    return this.http.get(this.url.getInsByStatus + '?status=' + status + '&page=' + page + '&rows=' + rows);
  }
  getstates() {
    return this.http.get(this.url.states);
  }
  getcollbystate(name: any) {
    return this.http.get(this.url.getcollBystate + '?stateName=' + name);
  }
  getcollspecilization(id: any) {
    return this.http.get(this.url.collegeSpecilization + '?collegeId=' + id);
  }
  getColegeStaff(collegeId: any, specialisationId: any) {
    return this.http.get(this.url.collegeStaff + '?collegeId=' + collegeId + '&specialisationId=' + specialisationId);
  }
  getInspectorDetails(id: any) {
    return this.http.get(this.url.getInspectorDetails + '?inspectorId=' + id)
  }



  // Inspection Shedulers
  shedulingStates() {
    return this.http.get(this.url.shedulingStates);
  }
  getCitybyState(id: any) {
    return this.http.get(this.url.cityByStates + '?stateName=' + id)
  }
  getcollegeList(stateId: any, cityId: any) {
    return this.http.get(this.url.colegeList + '?stateId=' + stateId + '&cityId=' + cityId)
  }
  allInspetypes() {
    return this.http.get(this.url.allInspetypes);
  }
  inspeCourseSubtype(inspectionTypeId: any) {
    return this.http.get(this.url.inspeCourseSubtype + '?inspectionTypeId=' + inspectionTypeId);
  }
  inspeCoursetype(insTypeId: any, insSubTypeId: any) {
    return this.http.get(this.url.inspeCoursetype + '?inspectionTypeId=' + insTypeId + '&inspectionSubTypeId=' + insSubTypeId);
  }
  inspeCoursePurpo(instypeid: any, insSubtypeid: any, inspectionPurposeId: any) {
    return this.http.get(this.url.inspeCoursePurpo + '?inspectionTypeId=' + instypeid +
      '&inspectionSubTypeId=' + insSubtypeid + '&inspectionPurposeId=' + inspectionPurposeId);
  }
  inspePurpoCourse(instypeid: any, insSubtypeid: any, inspectionPurposeId: any, courseId: any) {
    return this.http.get(this.url.inspePurpoCourse + '?inspectionTypeId=' + instypeid +
      '&inspectionSubTypeId=' + insSubtypeid + '&inspectionPurposeId=' + inspectionPurposeId + '&courseId=' + courseId);
  }
  getPermittedSeats(collegeId: any, specilizationId: any) {
    return this.http.get(this.url.permittedSeats + '?collegeId=' + collegeId + '&specialisationId=' + specilizationId);
  }

  // Shedules
  getallShedules(page: number, rows: number) {
    return this.http.get(this.url.getallShedule + '?page=' + page + '&rows=' + rows);
  }
  getSheduleDetails(id: any) {
    return this.http.get(this.url.getSheduleDetails + '?inspectionId=' + id);
  }

  // Post Calls
  addingInspector(data: any) {
    return this.http.post(this.url.addingInspector, data);
  }
  saveInspection(data: any) {
    return this.http.post(this.url.saveSheduleInspe, data);
  }
  resheduleInspection(data: any) {
    return this.http.update(this.url.resheduleInspection + '?inspectionId=' + data.inspectionId
      + '&fromDate=' + data.fromdate + '&toDate=' + data.toDate, '');
  }
  searchShedule(stateId: any, collegeId: any, page: number, rows: number) {
    return this.http
      .get(this.url.searchgetallShedule + '?stateName=' + stateId + '&collegeId=' + collegeId + '&page=' + page + '&rows=' + rows);
  }

  getReportsList(fromDate: any, toDate: any, collegeId: any, page: number, rows: number) {
    return this.http
      .get(this.url.reportList + '?fromScheduleDate=' + fromDate + '&toScheduleDate=' + toDate + '&collegeId=' + collegeId
        + '&page=' + page + '&rows=' + rows);
  }

  // put Call 
  deletedIsnpector(id: any) {
    return this.http.update(this.url.removeInspector + '?inspectorId=' + id, '');
  }
  cancelShedule(id: any, comments: any) {
    return this.http.update(this.url.cancelInspection + '?inspectionId=' + id + '&cancelComments=' + comments, '');

  }

  reassign(inspectionId: any, inspectorId: any) {
    return this.http.update(this.url.reassign + '?inspectionId=' + inspectionId + '&inspectorId=' + inspectorId, 'data');
  }

}
