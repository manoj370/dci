import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConstantModel } from 'src/app/college/models/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { CollegeServiceService } from 'src/app/college/services/collegeService.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-completionList',
  templateUrl: './completionList.component.html',
  styleUrls: ['./completionList.component.scss']
})
export class CompletionListComponent implements OnInit, OnDestroy {
  rowId = 0;
  page = 10;
  pageCount: any;
  courseList: any = [];
  specializationData: any = [];
  listOfStudents: any = [];
  course = '';
  specializationName = '';
  searchForm: FormGroup;
  pursuingYear = '';
  subscribe: Subject<any> = new Subject<any>();
  collegeName: any;
  admissionDetails: any;
  admissionIdList: any = [];
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  popupStatus: any;

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
    this.monitorService.completedStudents(this.rowId, this.page)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.listOfStudents = data;
          this.listOfStudents.forEach(element => {
            element.isSelected = false;
          });
          this.collegeName = this.listOfStudents[0].college.collegeName;
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
  allNonTrades(event) {
    const checked = event.target.checked;
    console.log(checked);

    this.listOfStudents.forEach(item => {

      item.isSelected = checked;
      if (checked === true) {
        if (item.studentStatus.statusName !== 'Completed') {
          this.admissionIdList.push(item.admissionId);
          const arr = [...new Set(this.admissionIdList)];
          console.log(arr);
          this.admissionIdList = arr;
          console.log(this.admissionIdList);
        }


      } else {
        this.admissionIdList = [];
        console.log(this.admissionIdList);
      }
    });
  }
  selectedList(event: any, id: any) {
    const checked = event.target.checked;
    if (checked === true) {
      this.admissionIdList.push(id);
    } else {
      const index = this.admissionIdList.indexOf(id);
      if (index > -1) {
        this.admissionIdList.splice(index, 1);
      }
    }
    console.log(checked);
    console.log(this.admissionIdList);
  }

  searchData() {
    console.log(this.searchForm.value);
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
        } else {
          this.listOfStudents = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }

  getList(id: any,status:any) {
    this.popupStatus=status;
    this.admissionIdList.push(id);
    this.monitorService.admissionDetails(id)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.admissionDetails = data;
        if (this.admissionDetails.studentCourseProgress !== null) {
          this.admissionDetails.studentCourseProgress.forEach(element => {
            const nameString = element.documentLocation;
            if (nameString !== null) {
              const filename = nameString.split('/').pop();
              element.documentLocation = filename;
            }
          });
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      this.getAll();
    }
  }
  // Prvious bUtton
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.getAll();
    }
  }
  // PassOut
  passOut() {
    if (this.admissionIdList.length > 0) {
      const obj = {
        admissionId: this.admissionIdList,
        statusName: 'Completed'
      };
      this.monitorService.passOut(obj)
        .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
          if (this.closeBtn !== undefined) {
            this.closeBtn.nativeElement.click();
          }
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    }
  }
  courses() {
    this.monitorService.courseList().subscribe((data: any) => {
      console.log(data);
      this.courseList = data;
      this.helper.sortedData(this.courseList,'courseName');
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
      this.helper.sortedData(this.specializationData,'name');

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