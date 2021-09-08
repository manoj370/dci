import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentAdmissionService } from '../../services/student-admission.service';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  studentStatusCode: any = [];
  studentsList: any = [];
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any;
  courseList: any;
  specializations: any;
  courseid: any;
  searchForm: FormGroup
  status: any;
  searchobj: { acedamicYear: any; collegeSpecialisation: any; course: any; firstName: any; neetRollNum: any; studentStatus: any; entityMasterId: string; sortDirection: string; };
  entiymasterid: any;
  changecourseid: number;
  parsecourseid: number;
  courseName: any;
  parsespecialisationid: number;
  specialisationName: any;
  constructor(public router: Router, public tostar: ToastrService, public studentService: StudentAdmissionService, public fb: FormBuilder) { }
  ngOnInit(): void {
    // Get Calls
    this.getAllStudentAdmissionStatusCode();
    this.getAllStudents();
    this.getAllCourses();
    // Validations
    this.searchForm = this.fb.group({
      'academicyear': [''],
      'course': [''],
      'Specialisation': [''],
      'name': [''],
      'rollnumber': [''],
      'status': ['']
    });
  }
  // route to view
  view(data) {
    this.router.navigate(['main/internal/college/dean/view', { id: data.admissionId }]);
  }
  // edit method
  edit(data) {
    this.router.navigate(['main/internal/college/dean/addStudentForm', { id: data.admissionId }])
  }
  // getAllStudentAdmissionStatusCode
  getAllStudentAdmissionStatusCode() {
    this.studentService.getAllStudentAdmissionStatusCode().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.studentStatusCode = res;
    }, error => {
      console.log(error);
    });
  }
  // getAllStudents
  getAllStudents() {
    this.studentService.getAllStudetsList(this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.studentsList = res;
      this.responsePageCount = this.studentsList[0].pageCount;
      this.status = "students";
    }, error => {
      console.log(error);
    });
  }
  //Previous Button
  previ() {
    if (this.pageId >= 1) {
      --this.pageId;
      console.log(this.pageId);
      if (this.status === "filter") {
        this.studentService.searchWithMultipleFilters(this.pageId, this.rowId, this.searchobj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.studentsList = res
        }, error => {
          console.log(error);
        });
      } else if (this.status === "students") {
        this.getAllStudents();
      }
    }
  }
  //Next Button 
  next() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      console.log(this.rowId);
      debugger
      if (this.status === "filter") {
        this.studentService.searchWithMultipleFilters(this.pageId, this.rowId, this.searchobj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          this.studentsList = res;
          this.status = "filter";
        }, error => {
          console.log(error);
        });
      } else if (this.status === "students") {
        this.getAllStudents();
      }
    }

  }
  // getAllCourses
  getAllCourses() {
    this.studentService.getAllCourses().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res, "course");
      this.courseList = res;
    }, error => {
      console.log(error)
    });
  }
  // course change event
  courseId(value) {
    this.courseid = value;
    // Converting string to integer
    this.parsecourseid = parseInt(this.courseid);
    this.courseList.map(element => {
      this.changecourseid = element.courseId;
      debugger
      if (this.parsecourseid === this.changecourseid) {
        console.log(element.courseName);
        this.courseName = element.courseName;
      }
    });
    this.getSpecializations();
  }
  // specialization
  specialization(value) {
    debugger
    this.parsespecialisationid = parseInt(value);
    this.specializations.map(element => {
      console.log(element.specialisationId);
      if (this.parsespecialisationid === element.specialisationId) {
        this.specialisationName = element.name;
        console.log(this.specialisationName);

      }
    });
  }
  // getSpecializationByCourseId
  getSpecializations() {
    this.studentService.getSpecializations(this.courseid).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res, "specilozation");
      this.specializations = res;
    }, error => {
      console.log(error);
    });
  }

  // search
  search() {
    debugger
    this.entiymasterid = sessionStorage.getItem('entityId-usec');
    if (this.searchForm.value.academicyear !== "" || this.searchForm.value.course !== ""
      || this.searchForm.value.Specialisation !== "" || this.searchForm.value.name !== ""
      || this.searchForm.value.rollnumber !== "" || this.searchForm.value.status !== "") {
      this.searchobj =
      {
        "acedamicYear": this.searchForm.value.academicyear ? this.searchForm.value.academicyear : "",
        "collegeSpecialisation": this.specialisationName ? this.specialisationName : "",
        "course": this.courseName ? this.courseName : "",
        "firstName": this.searchForm.value.name ? this.searchForm.value.name : "",
        "neetRollNum": this.searchForm.value.rollnumber ? this.searchForm.value.rollnumber : "",
        "studentStatus": this.searchForm.value.status ? this.searchForm.value.status : "",
        "entityMasterId": this.entiymasterid ? this.entiymasterid : 0,
        "sortDirection": "ASC"
      }
      console.log(this.searchobj);
      this.studentService.searchWithMultipleFilters(this.pageId, this.rowId, this.searchobj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.studentsList = res;
        this.status = "filter";
      }, error => {
        console.log(error);
      });
    } else {
      console.log('enter any field value');
      this.tostar.warning('Please Enter Atleast One Field To Search', 'Warning', {
        timeOut: 2000
      });
    }
  }
  // reset fields
  reset() {
    this.searchForm.reset();
    this.searchForm.controls.course.setValue('', { onlySelf: true });
    this.searchForm.controls.Specialisation.setValue('', { onlySelf: true });
    this.searchForm.controls.status.setValue('', { onlySelf: true });
    this.getAllStudents();
    this.status = "students"
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}
