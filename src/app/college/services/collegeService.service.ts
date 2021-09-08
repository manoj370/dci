import { Injectable } from '@angular/core';
import { CollegeUrlService } from './collegeUrl.service';
import { HttpServiceService } from 'src/app/common-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CollegeServiceService {

  constructor(public http: HttpServiceService, public url: CollegeUrlService) { }

  // Get Calls
  states() {
    return this.http.get(this.url.getAllStates + '?countryId=' + 1);
  }
  collegeList(state: string) {
    return this.http.get(this.url.collegeList + '?stateName=' + state);
  }
  courseList() {
    return this.http.get(this.url.courseList + '?entityMasterId=' + sessionStorage.getItem('entityId-usec'));
  }
  specializationList(courseId: number) {
    return this.http.get(this.url.specializationList + '?courseId=' + courseId);
  }
  allColleges(page: number, rows: number) {
    return this.http.get(this.url.allColleges + '?page=' + page + '&rows=' + rows);
  }
  filterCollegeList(stateName: any, collegeName: any, page: number, rows: number) {
    return this.http.get(this.url.allCollegesByFilter + '?stateName=' + stateName + '&collegeName=' + collegeName
      + '&page=' + page + '&rows=' + rows);
  }
  getStudentsList(page: number, rows: number) {
    return this.http.get(this.url.studentsList + '?entityMasterId=' + sessionStorage.getItem('entityId-usec') + '&page=' + page + '&rows=' + rows)
  }
  monitorStudentsList(entityId: any, page: number, rows: number) {
    return this.http.get(this.url.studentsList + '?entityMasterId=' + entityId + '&page=' + page + '&rows=' + rows)
  }
  admissionDetails(admissionId: number) {
    return this.http.get(this.url.admissionDetails + '?admissionId=' + admissionId);
  }
  completedStudents(page: number, rows: number) {
    return this.http.get(this.url.completedStudent + '?entityMasterId=' + sessionStorage.getItem('entityId-usec') + '&page=' + page + '&rows=' + rows)
  }
  getSearchResult(data: any, page: number, rows: number) {
    return this.http.post(this.url.searchCompleted + '?page=' + page + '&rows=' + rows, data);
  }
  filterTable(data: any, page: number, rows: number) {
    return this.http.post(this.url.filterTable + '?page=' + page + '&rows=' + rows, data);
  }
  studentTable(page: number, rows: number) {
    return this.http.get(this.url.admissionDetails + '?page=' + page + '&rows=' + rows);
  }
  studentsTable(data: any, page: number, rows: number) {
    return this.http.post(this.url.studentsTable + '?page=' + page + '&rows=' + rows, data);
  }
  downloadStudentExcel(entityMasterId: any, courseName: any, specialization: any, academicYear: any, statusName: any) {
    return this.http.get(this.url.downloadStudentExcel + '?entityMasterId=' + entityMasterId + ' &cName='
      + courseName + '&sName=' + specialization + '&aYear=' + academicYear + '&status=' + statusName);
  }
  downloadStudentPDF(entityMasterId: any, courseName: any, specialization: any, academicYear: any, statusName: any) {
    return this.http.get(this.url.downloadStudentPDF + '?entityMasterId=' + entityMasterId + ' &cName='
      + courseName + '&sName=' + specialization + '&aYear=' + academicYear + '&status=' + statusName);
  }
  


  // Post calls
  promotedStudent(data: any, fileArray: any) {
    const formData = new FormData();
    console.log(fileArray);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < fileArray.length; i++) {
      formData.append('files', fileArray[i]);
    }
    formData.append('studentCourseProgressJson', JSON.stringify(data));
    return this.http.post(this.url.promoteStudent, formData);
  }


  // Put Calls
  terminatedStudent(admissionId: any, statusName: any, comments: any) {
    return this.http.post(this.url.terminatedStudent + '?admissionId=' + admissionId + '&statusName=' + statusName + '&assigneeComments=' + comments, '');
  }
  passOut(data: any) {
    return this.http.update(this.url.passOut, data);
  }

}
