import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StudentAdmissionService } from '../../services/student-admission.service';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  entityid: any;
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any;
  studentlistbyorg: any;
  status: string;
  collegename: any;
  courseList: any;
  specializations: any;
  courseid: any;
  searchForm: FormGroup
  searchobj: { acedamicYear: any; collegeSpecialisation: any; course: any; firstName: any; neetRollNum: any; studentStatus: any; entityMasterId: string; sortDirection: string; };
  entiymasterid: any;
  studentStatusCode: any;
  parsecourseid: number;
  changecourseid: any;
  courseName: any;
  parsespecialisationid: number;
  specialisationName: any;
  obj: any;
  admissionid: any;
  constructor(public tostar: ToastrService, public router: Router, public fb: FormBuilder, public activatedRoute: ActivatedRoute, public studentService: StudentAdmissionService) { }
  ngOnInit(): void {
    //Getting Id from dashboard  through url
    this.activatedRoute.params.subscribe((params: Params) =>
     this.entityid = params.id
     );
    this.activatedRoute.params.subscribe((params: Params) => this.collegename = params.name);
    this.getAllStudentByorg();
    this.getAllCourses();
    this.getAllStudentAdmissionStatusCode();
    // Validations
    this.searchForm = this.fb.group({
      'academicyear': [''],
      'course': [''],
      'Specialisation': [''],
      'name': [''],
      'rollnumber': [''],
      // 'status': ['']
    });
  }
  // back button method
  back() {
    this.router.navigate(['/main/internal/college/admissionMonitorCellExecutive/collegelist']);
  }
  // route to view
  view(data) {
    this.router.navigate(['main/internal/college/admissionMonitorCellExecutive/viewStudentDetails', { id: data.admissionId }]);
  }
  routeto() {
    // this.router.navigate(['main/internal/outbound/secExc/new']);
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
  // getallstudentsbyorganization
  getAllStudentByorg() {
    this.studentService.getAllStudentAdmissionByOrgAndPagination(this.entityid, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res, "collegestudents");
      this.studentlistbyorg = res;
      this.responsePageCount = this.studentlistbyorg[0].pageCount;
      this.status = "studentlist";
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
          this.studentlistbyorg = res
        }, error => {
          console.log(error);
        });

      } else if (this.status === "studentlist") {
        this.getAllStudentByorg();
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
          console.log(res);
          this.studentlistbyorg = res
        }, error => {
          console.log(error);
        });

      } else if (this.status === "studentlist") {
        this.getAllStudentByorg();
      }
    }
  }
  // getAllCourses
  getAllCourses() {
    this.studentService.getAllCoursesByEntityid(this.entityid).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
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
    // pass names instead of ids 
    debugger
    if (this.searchForm.value.academicyear !== "" || this.searchForm.value.course !== ""
      || this.searchForm.value.Specialisation !== "" || this.searchForm.value.name !== ""
      || this.searchForm.value.rollnumber !== "" || this.searchForm.value.status !== undefined) {
      this.searchobj =
      {
        "acedamicYear": this.searchForm.value.academicyear ? this.searchForm.value.academicyear : "",
        "collegeSpecialisation": this.specialisationName ? this.specialisationName : "",
        "course": this.courseName ? this.courseName : "",
        "firstName": this.searchForm.value.name ? this.searchForm.value.name : "",
        "neetRollNum": this.searchForm.value.rollnumber ? this.searchForm.value.rollnumber : "",
        "studentStatus": "",
        "entityMasterId": this.entityid ? this.entityid : 0,
        "sortDirection": "ASC"
      }
      console.log(this.searchobj);
      this.studentService.searchWithMultipleFilters(this.pageId, this.rowId, this.searchobj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.studentlistbyorg = res;
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
  reset() {
    this.searchForm.reset();
    this.searchForm.controls.course.setValue('', { onlySelf: true });
    this.searchForm.controls.Specialisation.setValue('', { onlySelf: true });
    // this.searchForm.controls.status.setValue('', { onlySelf: true });
    this.getAllStudentByorg();
    this.status = "studentlist"
  }
  
  
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
