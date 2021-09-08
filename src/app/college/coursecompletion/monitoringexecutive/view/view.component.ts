import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConstantModel } from 'src/app/college/models/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { CollegeServiceService } from 'src/app/college/services/collegeService.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  id: any;
  rowId = 0;
  page = 10;
  pageCount: any;
  course = '';
  specializationName = '';
  pursuingYear = '';
  admissionDetails: any;
  courseList: any = [];
  specializationData: any = [];
  listOfStudents: any = [];
  courseProgress: any = [];
  searchForm: FormGroup;
  subscribe: Subject<any> = new Subject<any>();
  collegeValue: any;
  academicYear: any;
  Year: any;
  courseType: any;
  specialization: any;
  constructor(public router: Router, public monConst: ConstantModel, public activatedRoute: ActivatedRoute,
    public monitorService: CollegeServiceService, public helper: HelperService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.collegeValue = this.activatedRoute.snapshot.params.name;
    this.academicYear = this.activatedRoute.snapshot.params.year;
    this.Year = this.activatedRoute.snapshot.params.Academic;
    this.courseType = this.activatedRoute.snapshot.params.course;
    this.specialization = this.activatedRoute.snapshot.params.specialization;

    // { path: 'viewCollegeList/:id/:name/:year/:Academic/:course/:specialization', component: ViewComponent }


    this.courses();
    this.searchForm = this.fb.group({
      academicYear: [''],
      academicCourse: [''],
      academicSpe: [''],
      // academicPursingYear: [''],
      studentRollNumber: [''],
      studentName: ['']
    });
    this.searchData();

  }
  getAll() {
    this.monitorService.monitorStudentsList(this.id, this.rowId, this.page)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
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
  searchData() {
    console.log(this.searchForm.value);
    this.courseList.forEach(element => {
      if (element.courseId === parseInt(this.searchForm.value.academicCourse)) {
        this.searchForm.value.academicCourse = element.courseName;
      }
    });

    const obj = {
      academicYear: this.Year,
      course: this.courseType,
      currentPage: 0,
      entityMasterId: this.id,
      neetRollNumber: this.searchForm !== undefined ? this.searchForm.value.studentRollNumber : '',
      rowsPerPage: 0,
      sortBy: '',
      sortDirection: 'DESC',
      specialization: this.specialization,
      studentName: this.searchForm !== undefined ? this.searchForm.value.studentName : '',
      studentStatus: this.academicYear
    };
    this.monitorService.studentsTable(obj, this.rowId, this.page)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.listOfStudents = data;
          this.pageCount = Math.ceil(this.listOfStudents[0].totalCount / this.page);
          this.listOfStudents.forEach(element => {
            element.neetPercentile = Number(element.neetPercentile).toFixed(2);
            console.log((Number(element.neetPercentile).toFixed(2)));
          });
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
    this.monitorService.specializationList(course).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.specializationData = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // Download
  download(type: any) {
    console.log(type);
    if (type === 'Excel') {
      this.monitorService.downloadStudentExcel(this.id, this.courseType, this.specialization, this.Year, this.academicYear)
        .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    } else {
      this.monitorService.downloadStudentPDF(this.id, this.courseType, this.specialization, this.Year, this.academicYear)
        .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    }
  }
  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      // this.getAll();
      this.searchData();
    }
  }
  // Prvious bUtton
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      // this.getAll();
      this.searchData();
    }
  }
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }


}
