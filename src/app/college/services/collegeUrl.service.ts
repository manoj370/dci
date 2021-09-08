import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';
import { ServerURLService } from 'src/app/common-service/serverURL.service';

@Injectable({
  providedIn: CommonServiceModule
})
export class CollegeUrlService {
  constructor(public serverURL: ServerURLService) { }

  documentUrl = `${this.serverURL.DocumentServerAddress}DCIDMS/services/rest/document/getFile`;

  //  College Module apis
  getAllStates = `${this.serverURL.apiServerAddress}user-management/api/v1/master-data/auth/getAllStates`;
  collegeList = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllRegisteredCollegesByState`;
  courseList = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getListOfAllCourses`;
  specializationList = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getListOfSpecializationByCourse`;

  // Monitor Cell  
  allColleges = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/findAllCollegesByPagination`;
  allCollegesByFilter = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/searchCollegesWithFilters`;
  filterTable = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/searchMonitoringCellCollegeList`;
  studentsTable = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/searchMonitoringCellStudentList`;
  downloadStudentExcel = `${this.serverURL.apiServerAddress}Student-Course/api/v1/courseCompletion/collegeStudentsDocumentGenExcel`;
  downloadStudentPDF = `${this.serverURL.apiServerAddress}Student-Course/api/v1/courseCompletion/collegeStudentsDocumentGenPdf`;


    // Principal 
    // studentsList = `${this.serverURL.apiServerAddress}Student-Course/api/v1/studentAdmission/getAllStudentAdmissionByOrgAndPagination`;

    studentsList = `${this.serverURL.apiServerAddress}Student-Course/api/v1/courseCompletion/getAllStudentAdmissionByOrgAndPagination`;
  admissionDetails = `${this.serverURL.apiServerAddress}Student-Course/api/v1/courseCompletion/getStudentProgressByAdmissionID`;
  promoteStudent = `${this.serverURL.apiServerAddress}Student-Course/api/v1/courseCompletion/promoteStudent`;
  terminatedStudent = `${this.serverURL.apiServerAddress}Student-Course/api/v1/courseCompletion/updateStudentStatus`;
  completedStudent = `${this.serverURL.apiServerAddress}Student-Course/api/v1/courseCompletion/courseCompletedStudentsList`;
  searchCompleted = `${this.serverURL.apiServerAddress}Student-Course/api/v1/courseCompletion/searchCourseCompletionWithFilters`;
  passOut = `${this.serverURL.apiServerAddress}Student-Course/api/v1/courseCompletion/completeStudentList`;

}

export const urlServiceProvider = [
  CollegeUrlService
];
//