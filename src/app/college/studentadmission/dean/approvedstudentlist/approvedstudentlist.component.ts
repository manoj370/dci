import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
import { StudentAdmissionService } from '../../services/student-admission.service';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-approvedstudentlist',
  templateUrl: './approvedstudentlist.component.html',
  styleUrls: ['./approvedstudentlist.component.css']
})
export class ApprovedstudentlistComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any;
  activelist: any;
  currentyear: number;
  nextyearr: number;
  searchForm: FormGroup;
  courseList: any;
  courseid: any;
  parsecourseid: number;
  changecourseid: number;
  courseName: any;
  parsespecialisationid: number;
  specialisationName: any;
  specializations: any;
  entiymasterid: string;
  searchobj: { acedamicYear: any; collegeSpecialisation: any; course: any; firstName: any; neetRollNum: any; studentStatus: string; entityMasterId: string | number; sortDirection: string; };
  status: string;
  constructor(public router : Router,public studentService: StudentAdmissionService,public tostar: ToastrService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getActiveStudentsList();
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
  // getActiveStudentsList
  getActiveStudentsList() {
    this.studentService.getActiveStudentsList(this.currentyear,this.nextyearr,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
      console.log(res);
      this.activelist = res;
      this.responsePageCount =this.activelist[0].pageCount;
      this.status = "students"
    },error=>{
      console.log(error);
    })
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
          "studentStatus": "",
          "entityMasterId": this.entiymasterid ? this.entiymasterid : 0,
          "sortDirection": "ASC"
        }
        console.log(this.searchobj);
        this.studentService.searchWithMultipleFilters(this.pageId, this.rowId, this.searchobj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.activelist = res;
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
      // this.searchForm.controls.status.setValue('', { onlySelf: true });
      this.getActiveStudentsList();
      this.status = "students"
    }
  
//Previous Button
previ() {
  if (this.pageId >= 1) {
    --this.pageId;
    console.log(this.pageId);
    if (this.status === "filter") {
      this.studentService.searchWithMultipleFilters(this.pageId, this.rowId, this.searchobj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        this.activelist = res;
      }, error => {
        console.log(error);
      });
    } else if (this.status === "students") {
      this.getActiveStudentsList();

    }
  }
}
//Next Button 
next() {
  if (this.pageId + 1 <= this.responsePageCount - 1) {
    ++this.pageId;
    console.log(this.rowId);
    if (this.status === "filter") {
      this.studentService.searchWithMultipleFilters(this.pageId, this.rowId, this.searchobj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.activelist = res;
      }, error => {
        console.log(error);
      });
    } else if (this.status === "students") {
      this.getActiveStudentsList();

    }
  }

}
// route to view
view(data) {
  this.router.navigate(['main/internal/college/dean/view',{ id: data.admissionId }]);
}
 // Destroy The Subscribe Dta
 ngOnDestroy() {
  this.subscribe.next();
  this.subscribe.complete();
}
}
