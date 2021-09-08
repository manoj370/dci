import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConstantModel } from 'src/app/college/models/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { CollegeServiceService } from 'src/app/college/services/collegeService.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CollegeUrlService } from 'src/app/college/services/collegeUrl.service';
import { cpuUsage } from 'process';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  public showHide = true;
  show1year: boolean = false;
  showpassout: boolean = false;
  show3year: boolean = false
  showIntern = false;
  showTerminateStatus = false;
  showTerminationButton = false;
  showTerminate9Status = false;

  id: any;
  comment = '';
  files: any = [];
  btnName = '';
  admissionDetails: any;
  promotedForm: FormGroup;
  courseProgress: any = [];
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('terminateDismissModal') terminateCloseBtn: ElementRef<HTMLElement>;
  pursingStage: string;
  downloadUrl: string;
  errorMsg = '';
  submitted = false;
  constructor(public router: Router, public monConst: ConstantModel, public url: CollegeUrlService,
    public tostar: ToastrService,
    public activatedRoute: ActivatedRoute,
    public monitorService: CollegeServiceService, public helper: HelperService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getAll();
    this.promotedForm = this.fb.group({
      pursuingYear: [{ value: '', disabled: true }],
      totalMarks: ['', [Validators.required, Validators.maxLength(4),
      Validators.minLength(2), Validators.pattern(/^[1-9]\d*$/)]],
      marksObtained: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(2), Validators.pattern(/^[1-9]\d*$/)]],
      percentage: [{ value: '', disabled: true }]
    });

  }
  get f() { return this.promotedForm.controls; }
  getAll() {
    this.monitorService.admissionDetails(this.id)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.admissionDetails = data;
        console.log(this.admissionDetails.studentAdmission.studentStatus);

        if (this.admissionDetails.studentAdmission.studentStatus.statusName === 'Completed'
          || this.admissionDetails.studentAdmission.studentStatus.statusName === 'Passed-Out') {
          this.showHide = false;
        }
        this.admissionDetails.studentAdmission.studentDocuments.forEach(element => {
          const nameString = element.documentLocation;
          if (nameString !== null) {
            const filename = nameString.split('/').pop();
            console.log(filename);
            element.documentLocation = filename;
          }
        });
        this.courseProgress = this.admissionDetails.studentCourseProgress;
        const dateFrom = new Date(moment(this.admissionDetails.studentAdmission.admissionDate).format('DD-MM-YYYY'));
        const dateTo = new Date(moment().format('DD-MM-YYYY'));
        const months = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
        console.log(months);
        if (months >= 12) {
          if ((months - (months % 12)) / 12 > 9) {
            this.btnName = 'Terminate';
          } else {
            this.btnName = '';
          }
          console.log('years:', (months - (months % 12)) / 12);
        } else {
          this.btnName = '';
          console.log('only months', months);
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // Download
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }

  // Percentage
  percentage() {
    if (this.promotedForm.value.totalMarks !== '') {
      if (this.promotedForm.value.marksObtained <= this.promotedForm.value.totalMarks) {
        const percentage = this.promotedForm.value.marksObtained / this.promotedForm.value.totalMarks;
        console.log(percentage);
        this.errorMsg = ''
        this.promotedForm.get('percentage').patchValue(percentage === Infinity ? 0 : (percentage * 100).toFixed(2));
      } else {
        this.errorMsg = 'Obtained Marks Are les';

      }
    } else {
      this.errorMsg = 'enter Total marks First';
      console.log('enter Total marks First');
    }
  }
  viewPopupData() {
    const courseValue = this.admissionDetails.studentAdmission.collegeCourseOfferedSepcialisation.course.courseName;
    // 2nd Year

    console.log(courseValue);
    switch (courseValue) {
      case 'MDS':
        if (this.courseProgress !== null && this.courseProgress.length !== 0) {
          const lastRow = this.courseProgress[this.courseProgress.length - 1];
          console.log(lastRow);
          if (lastRow.studentPromotedTo === '3rd Year') {
            this.promotedForm.get('pursuingYear').patchValue('Passed-Out');
            this.pursingStage = '3rd Year'; // From
          } else if (lastRow.studentPromotedTo === '2nd Year') {
            this.promotedForm.get('pursuingYear').patchValue('3rd Year'); // TO
            this.pursingStage = '2nd Year'; // From 
          } else {
            this.promotedForm.get('pursuingYear').patchValue('2nd Year'); // TO
            this.pursingStage = '1st Year'; // From
          }
        } else {
          this.promotedForm.get('pursuingYear').patchValue('2nd Year'); // TO
          this.pursingStage = '1st Year'; // From
        }
        break;
      case 'BDS':
        if (this.courseProgress !== null && this.courseProgress.length !== 0) {
          const lastRow = this.courseProgress[this.courseProgress.length - 1];
          console.log(lastRow);
          if (lastRow.studentPromotedTo === 'Internship') {
            this.pursingStage = 'Internship';
            this.promotedForm.get('pursuingYear').patchValue('Passed-Out');
          } else if (lastRow.studentPromotedTo === '4th Year') {
            this.promotedForm.get('pursuingYear').patchValue('Internship');
            this.pursingStage = '4th Year';
          } else if (lastRow.studentPromotedTo === '3rd Year') {
            this.promotedForm.get('pursuingYear').patchValue('4th Year'); // to
            this.pursingStage = '3rd Year'; // from
          } else if (lastRow.studentPromotedTo === '2nd Year') {
            this.promotedForm.get('pursuingYear').patchValue('3rd Year'); // to
            this.pursingStage = '2nd Year'; // from
          } else {
            this.promotedForm.get('pursuingYear').patchValue('3rd Year'); // TO
            this.pursingStage = '2nd Year'; // from
          }
        } else {
          this.promotedForm.get('pursuingYear').patchValue('2nd Year');
          this.pursingStage = '1st Year';
        }
        break;
      case 'PG Diploma in Dental Materials':
        if (this.courseProgress !== null && this.courseProgress.length !== 0) {
          const lastRow = this.courseProgress[this.courseProgress.length - 1];
          console.log(lastRow);
          if (lastRow.studentPromotedTo === '2nd Year') {
            this.pursingStage = '2nd Year';
            this.promotedForm.get('pursuingYear').patchValue('Passed-Out');
          }
        } else {
          this.promotedForm.get('pursuingYear').patchValue('2nd Year');
          this.pursingStage = '1st Year';
        }
        break;
      case 'Diploma':
        if (this.courseProgress !== null && this.courseProgress.length !== 0) {
          const lastRow = this.courseProgress[this.courseProgress.length - 1];
          console.log(lastRow);
          if (lastRow.studentPromotedTo === '2nd Year') {
            this.pursingStage = '2nd Year';
            this.promotedForm.get('pursuingYear').patchValue('Passed-Out');
          }
        } else {
          this.promotedForm.get('pursuingYear').patchValue('2nd Year');
          this.pursingStage = '1st Year';
        }
        break;
      // 
    }
  }

  // Promoted Student
  promoteStudent() {
    console.log(this.promotedForm.value.marksObtained <= this.promotedForm.value.totalMarks);

    console.log(this.promotedForm.value);
    console.log(this.promotedForm.getRawValue());
    this.submitted = true;
    if (this.promotedForm.valid && (this.promotedForm.value.marksObtained <= this.promotedForm.value.totalMarks)) {
      const obj = {
        studentAdmission: {
          admissionId: this.id
        },
        studentPromotedFrom: this.pursingStage,
        studentPromotedTo: this.promotedForm.getRawValue().pursuingYear,
        marksObtained: this.promotedForm.value.marksObtained,
        totalMarks: this.promotedForm.value.totalMarks
      };
      console.log(obj);
      this.monitorService.promotedStudent(obj, this.files)
        .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
          this.closeBtn.nativeElement.click();
          this.getAll();
          this.promotedForm.reset();
          this.tostar.success('Promoted Successfully', 'Success', {
            timeOut: 2000
          });
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    } else if(this.files.length !== 0){
      const obj = {
        studentAdmission: {
          admissionId: this.id
        },
        studentPromotedFrom: this.pursingStage,
        studentPromotedTo: this.promotedForm.getRawValue().pursuingYear,
        marksObtained: this.promotedForm.value.marksObtained,
        totalMarks: this.promotedForm.value.totalMarks
      };
      console.log(obj);
      this.monitorService.promotedStudent(obj, this.files)
        .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
          this.closeBtn.nativeElement.click();
          this.getAll();
          this.promotedForm.reset();
          this.tostar.success('Promoted Successfully', 'Success', {
            timeOut: 2000
          });
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    }
    
    else {
      this.tostar.warning('Percentage Is Not Valid', 'Success', {
        timeOut: 2000
      });
    }
  }

  // Terminate
  terminatedStudent() {
    if (this.comment !== null) {
      this.monitorService.terminatedStudent(this.id, this.admissionDetails.studentAdmission.studentStatus.statusName, this.comment)
        .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
          this.terminateCloseBtn.nativeElement.click();
          this.tostar.error('Terminated Successfully', 'Terminated', {
            timeOut: 2000
          });
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    }
  }

  // File Select
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files;
      console.log(filesAmount);
      this.files.push(filesAmount[0]);
      console.log(this.files);
    }
  }
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}
