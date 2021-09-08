import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/common-service/http-service.service';
import { urlServices } from './studentAdmissionUrls';
import { AnyRecordWithTtl } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class StudentAdmissionService {
  currentyear: number;
  nextyearr: number;

  constructor(public http: HttpServiceService, public url: urlServices) {

  }
  // dean apicalls
  // get calls
  // getCategory List
  getStudentCategoryList() {
    return this.http.get(this.url.getStudentCategoryList);
  }
  // getAllStudentAdmissionStatusCode
  getAllStudentAdmissionStatusCode() {
    return this.http.get(this.url.getAllStudentAdmissionStatusCode);
  }

  // getAllStudentAdmissionQuota
  getAllStudentAdmissionQuota() {
    return this.http.get(this.url.getAllStudentAdmissionQuota);
  }
  // getAllCourses
  getAllCourses() {
    return this.http.get(this.url.getAllCourses + '?entityMasterId=' + sessionStorage.getItem('entityId-usec'));
  }
  // getSpecializationsByCourseId
  getSpecializations(courseId: any) {
    return this.http.get(this.url.getSpecialisationByCourseId + '?courseId=' + courseId);
  }
  // getAllStudentsList
  getAllStudetsList(pageid: any, rowid: any) {
    return this.http.get(this.url.getAllStudents + '?page=' + pageid + '&rows=' + rowid);
  }
  // getStudentAdmissionById
  getStudentAdmissionByAdmissionID(admissionid: any) {
    return this.http.get(this.url.getStudentAdmissionByAdmissionID + '?admissionId=' + admissionid);
  }
  // getAllClarificationsList
  getAllClarificationsList(pageid: any, rowid: any, entityid: any) {
    return this.http.get(this.url.getAllClarifications + '?page=' + pageid + '&rows=' + rowid + '&entityMasterId=' + entityid);
  }
  // getActiveStudentsList
  getActiveStudentsList(currentyear: any, currentyearplusoone: any, pageid: any, rowid: any) {
    var d = new Date();
    var year = d.getFullYear();
    this.currentyear = year;
    console.log(this.currentyear-1);
    this.currentyear =this.currentyear - 1;
    var nextyear = d.getFullYear() + 1;
    this.nextyearr = nextyear;
    console.log(this.nextyearr);
    console.log(new Date().getFullYear().toString().substr(-2));
    return this.http.get(this.url.getAllActiveStudentsList + '?staus=' + 'Verified'
      + '&acedamicYear=' + this.currentyear+ '-' + new Date().getFullYear().toString().substr(-2) + '&page=' + pageid + '&rows=' + rowid);
  }
  //getDischargeList
  getDischargeList(status, pageId: number, rowId: number) {
    return this.http.get(this.url.getDischargeListOfStudent + "?staus=" + status + '&page=' + pageId + '&rows=' + rowId);
  }
  // findAllCounsellingAuthorities
  findAllCouncellingAuthorities() {
    return this.http.get(this.url.getAllCounsellingAuthorities);
  }
  // findAllColleges
  findAllColleges() {
    return this.http.get(this.url.getAllColleges);
  }
  // findAllUniversities
  findAllUniversities() {
    return this.http.get(this.url.getAllUniversities);
  }
  // findAllSdcs
  findAllSdcs() {
    return this.http.get(this.url.getAllSdcs);
  }
  // getAllNeetDetails
  getAllNeetDetails(neetRollNo: any, academicYear: any) {
    return this.http.get(this.url.getStudentNeetResultBDSDetails + '?neetRollNo=' + neetRollNo + '&academicYear=' + academicYear);
  }
  // StudentAdmissionExecutive Apicalls
  // getAllRegisteredCollegesByState
  getAllRegisteredCollegesByState(stateName: any) {
    return this.http.get(this.url.getAllRegisteredCollegesByState + '?stateName=' + stateName);
  }
  //  CollegesWithFilters
  searchCollegesWithFilters(statename: any, collegename: any, pageid: any, rowid: any) {
    return this.http.get(this.url.searchCollegesWithFilters + '?stateName=' + statename
      + '&collegeName=' + collegename + '&page=' + pageid + '&rows=' + rowid);
  }
  // findAllCollegesWithPagiantion
  findAllCollegesWithPagiantion(pageid: any, rowid: any) {
    return this.http.get(this.url.findAllCollegesByPagination + '?page=' + pageid + '&rows=' + rowid);
  }
  // getAllStudentAdmissionByOrgAndPagination
  getAllStudentAdmissionByOrgAndPagination(entitymasterid: any, pageid: any, rowid: any) {
    return this.http.get(this.url.getAllStudentAdmissionByOrgAndPagination + '?entityMasterId=' + entitymasterid + '&page=' + pageid + '&rows=' + rowid);
  }
  // getAllCourses
  getAllCoursesByEntityid(entityid: any) {
    return this.http.get(this.url.getAllCourses + '?entityMasterId=' + entityid);
  }
  // getAllEntityTypes
  getAllEntityTypes() {
    return this.http.get(this.url.getAllEntityTypes);
  }
  // getAllListOfEntityMastersByTypeId
  getAllListOfEntityMastersByTypeId(entitytypeid) {
    return this.http.get(this.url.getAllListOfEntityMastersByTypeId + '?entityTypeId=' + entitytypeid);
  }
  // processhistory
  getWorkFlowsByAdmissionId(admissionid) {
    return this.http.get(this.url.getWorkFlowsByAdmissionId + '?admissionId=' + admissionid);
  }
   //gethistorybyid
  getWorkFlowById(id) {
    return this.http.get(this.url.getWorkFlowsById + '?id=' + id);
  }
  // generateDispatchReferenceNumber
  generateDispatchRefNo(patternNumber: any) {
    return this.http.get(this.url.generatedReferenceNo + '?pattern=' + patternNumber);
  }
  // getStudentStateDMEMstrById
  getStudentStateDMEMstrById(id:any){
    return this.http.get(this.url.getStudentStateDMEMstrById + '?id=' + id);
  }
  // getAllStudentAdmissionChangeStatusList
  getAllStudentAdmissionChangeStatusList() {
    return this.http.get(this.url.getAllStudentAdmissionChangeStatusList);
  }
  // createdispatch
  createdispatch(filearray: any, obj: any) {
    var formdata: FormData = new FormData();
    for (let i = 0; i < filearray.length; i++) {
      formdata.append('file', filearray[i]);
    }
    formdata.append('dispatchJson', JSON.stringify(obj));
    debugger
    return this.http.post(this.url.createDispatch, formdata);
  }
  // dean apicalls
  // post calls
  // createStudentAdmission
  createStudentAdmission(filearray: any, obj: any) {
    var formdata: FormData = new FormData();
    for (let i = 0; i < filearray.length; i++) {
      formdata.append('file', filearray[i]);
    }
    formdata.append('studentAdmissionJson', JSON.stringify(obj));
    debugger
    return this.http.post(this.url.createStudentAdmission, formdata);
  }

  //createClarification
  createClarification(loginUserId: string, admissionId: any, subject: any, matter: any, fileClarification: any) {
    var formdatas: FormData = new FormData();
    console.log(fileClarification);
    for (let i = 0; i < fileClarification.length; i++) {
      formdatas.append('file', fileClarification[i]);
    }
    console.log(formdatas);
    return this.http.post(this.url.createClarificationData + '?loggedInUserId=' + loginUserId + '&admissionId=' + admissionId + '&subject='
      + subject + '&assigneeComments=' + matter, formdatas);
  }

  //updateStudentAddmissionForm
  updateStudentAddmissionForm(filearray: any, obj: any) {
    var formdata: FormData = new FormData();
    for (let i = 0; i < filearray.length; i++) {
      formdata.append('file', filearray[i]);
    }
    formdata.append('studentAdmissionJson', JSON.stringify(obj));
    debugger
    return this.http.post(this.url.updateStudentAdmissionForm, formdata);
  }
  // Create Clarification Response
  createResponse(workflowid: any, loginUserId: any, admissionid: any, response: any, fileClarification) {
    var formdatas: FormData = new FormData();
    for (let i = 0; i < fileClarification.length; i++) {
      formdatas.append('file', fileClarification[i]);
    }
    console.log(formdatas);
    return this.http.updateData(this.url.createResponse + '?studentWorkflowID=' + workflowid + '&loggedInUserId=' + loginUserId +
      '&admissionId=' + admissionid + '&subject=' + response, formdatas);
  }
  //  searchwithMultiplefilters
  searchWithMultipleFilters(pageid: any, rowid: any, searchobj: any) {
    return this.http.post(this.url.searchWithMutipleFilters + '?page=' + pageid + '&rows=' + rowid, searchobj);
  }
  //  searchwithMultiplefilters
  searchWithClarificationList(pageid: any, rowid: any, searchobj: any) {
    return this.http.post(this.url.searchClarificationsWithFilters + '?page=' + pageid + '&rows=' + rowid, searchobj);
  }
  // Student admission postcalls
  // create agenda
  createAgenda(agendaobj: any) {
    return this.http.post(this.url.createAgenda, agendaobj);
  }
  // seek clarifiation fromparty
  seekClarificationFromaParty(loginUserId: string, admissionId: any, subject: any, matter: any, entitymasterid: any, fileClarification: any) {
    var formdatas: FormData = new FormData();
    console.log(fileClarification);
    for (let i = 0; i < fileClarification.length; i++) {
      formdatas.append('file', fileClarification[i]);
    }
    console.log(formdatas);
    return this.http.post(this.url.seekClarificationFromaParty + '?loggedInUserId=' + loginUserId + '&admissionId=' + admissionId + '&subject='
      + subject + '&assigneeComments=' + matter + '&entityMasterId=' + entitymasterid, formdatas);
  }
  // put calls
  // send To CounsellingAuthority
  sendToCounellingAuthorithy(admissionid: any, obj: any) {
    debugger
    return this.http.update(this.url.submittedToCA + '?admissionId=' + admissionid, obj);
  }
  // update Status
  updateStatus(admissionid: any, statusname: any, matter: any, obj: any) {
    debugger
    return this.http.update(this.url.updateStatus + '?admissionId=' + admissionid + '&statusName=' + statusname + '&assigneeComments=' + matter, obj);
  }
  fileUpdateWithStatus(admissionid: any, statusname: any, matter: any, filearray: any) {
    debugger
    var formdata: FormData = new FormData();
    for (let i = 0; i < filearray.length; i++) {
      formdata.append('file', filearray[i]);
    }
    console.log(formdata);
   return this.http.updateData(this.url.updateStatus + '?admissionId=' + admissionid + '&statusName=' + statusname + '&assigneeComments=' + matter, formdata);
  }
  // Get Agenda Item Number
  getAgendaItemNumber() {
    return this.http.get(this.url.getAgendaItemNumber);
  }
   // post
   agendaCreate(data: any) {
    return this.http.post(this.url.agendaCreation, data);
  }
}