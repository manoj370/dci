import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConstantModel } from 'src/app/college/models/const.model';
import { CollegeServiceService } from 'src/app/college/services/collegeService.service';
import { HelperService } from 'src/app/common-service/helper.service';

@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent implements OnInit, OnDestroy {
  rowId = 0;
  page = 10;
  pageCount: any;
  stateList: any = [];
  collegesList: any = [];
  listOfColleges: any = [];
  courseList: any = [];
  specializationData: any = [];
  course = '';
  specializationName = '';
  pursuingYear = '';
  searchForm: FormGroup;
  stateName = '';
  collegeName = '';
  subscribe: Subject<any> = new Subject<any>();

  constructor(public router: Router, public monConst: ConstantModel, public fb: FormBuilder,
    public monitorService: CollegeServiceService, public helper: HelperService) { }

  ngOnInit(): void {
    // this.getAll();
    this.searchData();
    this.states();
    this.courses();

    this.searchForm = this.fb.group({
      college: [''],
      academicCourse: [''],
      academicSpe: [''],
      academicPursingYear: [''],
      state: ['']
    });
  }
  getAll() {
    this.monitorService.allColleges(this.rowId, this.page)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.listOfColleges = data;
          this.pageCount = Math.ceil(this.listOfColleges[0].totalCount / this.page);
        } else {
          this.listOfColleges = [];
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

  searchData() {
    // console.log(this.searchForm.value);
    const obj = {
      college: this.searchForm !== undefined ? this.searchForm.value.college : '',
      course: this.searchForm !== undefined ? this.searchForm.value.academicCourse : '',
      currentPage: 0,
      pursuingYear: this.searchForm !== undefined ? this.searchForm.value.academicPursingYear : '',
      rowsPerPage: 0,
      sortBy: '',
      sortDirection: 'DESC',
      specialization: this.searchForm !== undefined ? this.searchForm.value.academicSpe : '',
      state: this.searchForm !== undefined ? this.searchForm.value.state : ''

      // acedamicYear: this.searchForm.value.academicYear,
      // collegeSpecialisation: this.searchForm.value.academicSpe,
      // course: this.searchForm.value.academicCourse,
      // entityMasterId: sessionStorage.getItem('entityId-usec'),
      // firstName: this.searchForm.value.studentName,
      // neetRollNum: this.searchForm.value.state,
      // sortDirection: 'DESC',
      // studentStatus: this.searchForm.value.academicPursingYear
    };
    this.monitorService.filterTable(obj, this.rowId, this.page)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.listOfColleges = data;
          this.pageCount = Math.ceil(this.listOfColleges[0].totalCount / this.page);
        } else {
          this.listOfColleges = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  states() {
    this.monitorService.states().subscribe((data: any) => {
      console.log(data);
      this.stateList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  colleges(stateName: any) {
    this.stateName = stateName;
    this.monitorService.collegeList(stateName).subscribe((data: any) => {
      console.log(data);
      this.collegesList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      this.searchData();
    }
  }
  // Prvious bUtton
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.searchData();
    }
  }
  reset() {
    this.collegeName = '';
    this.stateName = '';
    this.getAll();
  }
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
  // route to view
  view() {
    this.router.navigate(['main/internal/college/monitoringExecutive/viewCollegeList']);
  }
}
