import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';
import { ServerURLService } from 'src/app/common-service/serverURL.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: CommonServiceModule
})
export class urlServices {
  constructor(public serverURL: ServerURLService) { }

  // URLS
  documentUrl = `${this.serverURL.DocumentServerAddress}DCIDMS/services/rest/document/getFile`;
  getStudentCategoryList = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllStudentCategory`;
  getAllStudentAdmissionStatusCode = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllStudentAdmissionStatusCode`;
  getAllStudentAdmissionChangeStatusList = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllStudentAdmissionChangeStatusList`;
  getAllRegisteredCollegesByState = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllRegisteredCollegesByState`;
  getAllStudentAdmissionQuota = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllStudentAdmissionQuota`;
  createStudentAdmission = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/createStudentAdmission`;
  getAllCourses = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getListOfAllCourses`;
  getSpecialisationByCourseId = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getListOfSpecializationByCourse`;
  getAllStudents = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllStudentAdmissionWithPagination`;
  getStudentAdmissionByAdmissionID = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getStudentAdmissionByAdmissionID`;
  updateStudentAdmissionForm = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/updateStudentAdmissionByAdmissionID`;
  getAllClarifications = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllClarificationsWithPagination`;
  getAllActiveStudentsList = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getActiveStudentsListByAdmissionYear`;
  getDischargeListOfStudent = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllDischargedStudentsByStatus`;
  createClarificationData = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/prepareClarification`;
  getAllCounsellingAuthorities = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/findAllCouncellingAuthoritys`;
  getAllColleges = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/findAllColleges`;
  getAllUniversities = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/findAllCollegeUniversitys`;
  getAllSdcs = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/findAllSDCs`;
  getStudentNeetResultBDSDetails = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getStudentNeetResultBDSDetails`;
  searchWithMutipleFilters = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/searchAdmissionWithFilters`;
  searchClarificationsWithFilters = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/searchClarificationsWithFilters`;
  findAllCollegesByPagination = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/findAllCollegesByPagination`;
  getAllStudentAdmissionByOrgAndPagination = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllStudentAdmissionByOrgAndPagination`;
  createAgenda = `${this.serverURL.apiServerAddress}Student-Course/api/v1/agenda/createAgenda`;
  createResponse = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/createResponse`;
  submittedToCA = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/SubmittedToCA`;
  getAllEntityTypes = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllListOfEntityTypes`;
  getAllListOfEntityMastersByTypeId = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllListOfEntityMastersByTypeId`;
  seekClarificationFromaParty = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/seekClarificationFromAParty`;
  searchCollegesWithFilters =`${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/searchCollegesWithFilters`;
  updateStatus =`${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/updateAdmissionStatus`;
  getWorkFlowsByAdmissionId =`${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getWorkFlowsByAdmissionId`;
  getWorkFlowsById =`${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getWorkFlowsById`;
  getStudentStateDMEMstrById =`${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getStudentStateDMEMstrById`;
  generatedReferenceNo = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/genarateDispatchNum`;
  createDispatch = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/createDispatch`;
  getAgendaItemNumber = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/get_ec_agenda_item_no`;
  agendaCreation = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/record_section_executive_comment`;
}

export const urlServiceProvider = [
  urlServices
];
