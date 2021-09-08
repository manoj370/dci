import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ConstantModel } from 'src/app/college/models/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { CollegeServiceService } from 'src/app/college/services/collegeService.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coursecompletionstudentlist',
  templateUrl: './coursecompletionstudentlist.component.html',
  styleUrls: ['./coursecompletionstudentlist.component.css']
})
export class CoursecompletionstudentlistComponent implements OnInit, OnDestroy {
  rowId = 0;
  page = 10;
  pageCount: any;
  courseList: any = [];
  specializationData: any = [];
  listOfStudents: any = [];
  course = '';
  specializationName = '';
  pursuingYear = '';
  searchForm: FormGroup;

  subscribe: Subject<any> = new Subject<any>();
  collegeNameValue = '';
  academicPursingYear: string;
  constructor(public router: Router, public monConst: ConstantModel, public fb: FormBuilder,
    public monitorService: CollegeServiceService, public helper: HelperService) { }

  ngOnInit(): void {
    this.getAll();
    this.courses();
    this.searchForm = this.fb.group({
      academicYear: [''],
      academicCourse: [''],
      academicSpe: [''],
      academicPursingYear: [''],
      studentRollNumber: [''],
      studentName: ['']
    });
  }
  getAll() {
    this.monitorService.getStudentsList(this.rowId, this.page)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.listOfStudents = data;
          this.collegeNameValue = this.listOfStudents[0].college.collegeName;
          this.pageCount = Math.ceil(this.listOfStudents[0].totalCount / this.page);
        } else {
          this.listOfStudents = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // getAll() {
  //   const obj = {
  //     acedamicYear:'',
  //     collegeSpecialisation: '',
  //     course: '',
  //     entityMasterId: sessionStorage.getItem('entityId-usec'),
  //     firstName: '',
  //     neetRollNum: '',
  //     sortDirection: 'DESC',
  //     studentStatus: ''
  //   };
  //   this.monitorService.getSearchResult(obj,this.rowId,this.page).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
  //     console.log(res);
  //     if (res.length !== 0) {
  //       this.listOfStudents = res;
  //       this.collegeNameValue = this.listOfStudents[0].collegeCourseOfferedSepcialisation.college.collegeName;
  //       this.pageCount = Math.ceil(this.listOfStudents[0].totalCount / this.page);
  //     } else {
  //       this.listOfStudents = [];
  //       this.pageCount = 0;
  //     }
  //   },error=>{
  //     console.log(error);
  //       this.helper.errorMessage(error);
  //   });
  // }
  searchData() {
    console.log(this.searchForm.value);

    this.courseList.forEach(element => {
      if (element.courseId === parseInt(this.searchForm.value.academicCourse)) {
        this.searchForm.value.academicCourse = element.courseName;
      }
    });
    const obj = {
      acedamicYear: this.searchForm.value.academicYear,
      collegeSpecialisation: this.searchForm.value.academicSpe,
      course: this.searchForm.value.academicCourse,
      entityMasterId: sessionStorage.getItem('entityId-usec'),
      firstName: this.searchForm.value.studentName,
      neetRollNum: this.searchForm.value.studentRollNumber,
      sortDirection: 'DESC',
      studentStatus: this.searchForm.value.academicPursingYear
    };
    this.monitorService.getSearchResult(obj, this.rowId, this.page)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.listOfStudents = data;
          this.pageCount = Math.ceil(this.listOfStudents[0].totalCount / this.page);
          this.collegeNameValue = this.listOfStudents[0].collegeCourseOfferedSepcialisation.college.collegeName;
        } else {
          this.listOfStudents = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  courses() {
    this.monitorService.courseList().subscribe((data: any) => {
      console.log(data);
      this.courseList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  specializations(course: any) {
    this.course = course;
    this.monitorService.specializationList(course).subscribe((data: any) => {
      console.log(data);
      this.specializationData = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  reset() {
    this.searchForm.reset();
    this.searchForm.controls.academicCourse.setValue('', { onlySelf: true });
    this.searchForm.controls.academicSpe.setValue('', { onlySelf: true });
    this.searchForm.controls.academicPursingYear.setValue('', { onlySelf: true });


    this.specializationName = '';
    this.course = '';
    this.pursuingYear='';
    this.getAll();
  }
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      if (this.course === '' || this.specializationName === '') {
        this.getAll();
      } else {
        console.log(this.rowId);
        this.searchData();

      }
    }
  }
  // Prvious bUtton
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      if (this.course === '' || this.specializationName === '') {
        this.getAll();
      } else {
        console.log(this.rowId);
        this.searchData();
      }
    }
  }


  view() {

    this.router.navigate(['main/internal/college/collegeRep/view', { id: "1" }]);
  }
  view2() {

    this.router.navigate(['main/internal/college/collegeRep/view', { id: "2" }]);
  }
  view3() {

    this.router.navigate(['main/internal/college/collegeRep/view', { id: "3" }]);
  }
  view4() {

    this.router.navigate(['main/internal/college/collegeRep/view', { id: "4" }]);
  }
  view5() {
    this.router.navigate(['main/internal/college/collegeRep/view', { id: "5" }]);
  }
  view6() {
    this.router.navigate(['main/internal/college/collegeRep/view', { id: "6" }]);
  }
}
