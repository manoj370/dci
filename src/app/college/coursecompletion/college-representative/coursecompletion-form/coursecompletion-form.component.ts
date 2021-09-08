import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConstantModel } from 'src/app/college/models/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { CollegeServiceService } from 'src/app/college/services/collegeService.service';

@Component({
  selector: 'app-coursecompletion-form',
  templateUrl: './coursecompletion-form.component.html',
  styleUrls: ['./coursecompletion-form.component.css']
})
export class CoursecompletionFormComponent implements OnInit, OnDestroy {
  rowId = 0;
  page = 10;
  pageCount: any;
  courseList: any = [];
  specializationData: any = [];
  listOfStudents: any = [];
  course = '';
  specializationName = '';
  pursuingYear = '';
  subscribe: Subject<any> = new Subject<any>();

  constructor(public router: Router, public monConst: ConstantModel,
    public monitorService: CollegeServiceService, public helper: HelperService) { }

  ngOnInit(): void {
    this.getAll();
    this.courses();
  }
  getAll() {
    this.monitorService.getStudentsList(this.rowId, this.page)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.listOfStudents = data;
          this.pageCount = Math.ceil(this.listOfStudents[0].totalCount / this.page);
        } else {
          this.listOfStudents = [];
          this.pageCount = 0;        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }

  search() {
    this.monitorService.filterCollegeList(this.course, this.specializationName, this.rowId, this.page)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.listOfStudents = data;
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
    this.specializationName = '';
    this.course = '';
    this.getAll();
  }
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}