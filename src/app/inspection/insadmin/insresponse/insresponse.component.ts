
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { appConstants } from 'src/app/common-service/const.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { InsadminService } from './../../services/insadmin/insadmin.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { InspectionAdminConstants } from '../../models/insadmin/const.model';

@Component({
  selector: 'app-insresponse',
  templateUrl: './insresponse.component.html',
  styleUrls: ['./insresponse.component.css']
})
export class InsresponseComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageid = 10;
  stateId = '';
  minDate: any;
  collegeId = '';
  errorMsgs: any;
  resdheuleId: any;
  selecetdDat: any;
  modalName: string;
  pageCount: number;
  cityList: any = [];
  allStates: any = [];
  allShedule: any = [];
  statesList: any = [];
  collegeList: any = [];
  collegStaff: any = [];
  collbyStates: any = [];
  sheduleInspForm: FormGroup;
  today = moment().format('YYYY-MM-DD');
  popuId: any;
  // popupComments: any;
  cancelFrom: FormGroup;  
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('openModal') openBtn: ElementRef<HTMLElement>;
  @ViewChild('cancelModal') cancelbtn: ElementRef<HTMLElement>;

  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('canceldismiss') cancelDismissBtn: ElementRef<HTMLElement>;

  maxDate = moment(new Date()).add(15, 'days').format('YYYY-MM-DD');
  // theaders = ['College Name', 'State', 'Inspection Type', 'Course', 'From Date', 'To Date', 'Action', 'View'];
  popData: any;
  constructor(public router: Router, public constValues: appConstants, public insAdmin: InsadminService,
    public fb: FormBuilder, public toaster: ToastrService, public helper: HelperService,
    public insAdminConst:InspectionAdminConstants) { }

  ngOnInit(): void {
    this.getShedules();
    this.errorMsgs = this.constValues.errorMsgs;
    this.sheduleInspForm = this.fb.group({
      type: [{ value: '', disabled: true }],
      subtype: [{ value: '', disabled: true }],
      purpose: [{ value: '', disabled: true }],
      course: [{ value: '', disabled: true }],
      specilization: [{ value: '', disabled: true }],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      fromSeat: [{ value: '', disabled: true }],
      toSeat: [{ value: '', disabled: true }]
    });
    this.cancelFrom = this.fb.group({
      popupComments: ['', Validators.required]
    });
  }
  get f() { return this.sheduleInspForm.controls; } // shedule form Controls

  getShedules() {
    this.insAdmin.getallShedules(this.rowId, this.pageid)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.getStates();
          this.allShedule = data;        
          this.pageCount = Math.ceil(this.allShedule[0].totalCount / this.pageid);
          console.log(this.pageCount);
        } else {
          this.allShedule = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // Pagination Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      console.log(this.rowId);
      this.getShedules();
    }
  }
  // Pagination Prvious Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      this.getShedules();
    }
  }
  // Get All States
  getStates() {
    this.collegStaff = [];
    this.insAdmin.getstates().pipe(takeUntil(this.subscribe)).subscribe((states: any) => {
      console.log(states);
      this.allStates = states;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // get College Names
  getCollegeName($event: any) {
    this.collegeId = '';
    this.stateId = $event.target.value;
    this.insAdmin.getcollbystate($event.target.value).pipe(takeUntil(this.subscribe)).subscribe((college: any) => {
      console.log(college);
      this.collbyStates = college;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // Search Data searchShedule
  searchShedule() {
    console.log(this.collegeId, 'CollegeId');
    console.log(this.stateId, 'StateId');
    if (this.stateId !== undefined) {
      this.insAdmin.searchShedule(this.stateId, this.collegeId, this.rowId, this.pageid)
        .pipe(takeUntil(this.subscribe))
        .subscribe((data: any) => {
          console.log(data);
          if (data.length !== 0) {
            this.allShedule = data;
            this.pageCount = Math.ceil(this.allShedule[0].totalCount / this.pageid);
            console.log(this.pageCount);
          } else {
            this.allShedule = data;
            this.pageCount = 0;
          }
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    } else {
      this.toaster.warning('Please Select State', 'Warning', {
        timeOut: 2000
      });
    }
  }

  cancelPopup(id: any) {
    this.popuId = id;
    this.cancelbtn.nativeElement.click();
  }


  // Cancel Inspection
  cancelInspection() {
    console.log(this.cancelFrom.value.popupComments);
    this.insAdmin.cancelShedule(this.popuId, this.cancelFrom.value.popupComments)
      .pipe(takeUntil(this.subscribe)).subscribe((cancelData: any) => {
        console.log(cancelData);
        this.popuId = '';
        this.cancelDismissBtn.nativeElement.click();
        this.toaster.success('Inspection Cancelled Successfully', 'Success', {
          timeOut: 2000
        });
        this.cancelFrom.reset();
        this.getShedules();
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // Min Date Based on Max Date
  selecetdDate(data: any) {
    console.log(data);
    this.sheduleInspForm.get('toDate').patchValue('');
    this.selecetdDat = data;
    this.minDate = this.selecetdDat;
    this.selecetdDat = moment(data).add(3, 'days').format('YYYY-MM-DD');
  }
  // Reschedule Data
  resheduleData(id: any) {
    this.resdheuleId = id;
    this.insAdmin.getSheduleDetails(id).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.popData=data;
      this.openBtn.nativeElement.click();
      this.modalName = data.collegeName;
      this.sheduleInspForm.get('type').patchValue(data.inspectionType);
      this.sheduleInspForm.get('subtype').patchValue(data.subType);
      this.sheduleInspForm.get('purpose').patchValue(data.purpose);
      this.sheduleInspForm.get('course').patchValue(data.courseName);
      this.sheduleInspForm.get('specilization').patchValue(data.specialisation);
      this.sheduleInspForm.get('fromSeat').patchValue(data.fromSeat);
      this.sheduleInspForm.get('toSeat').patchValue(data.toSeat);
      this.sheduleInspForm.get('fromDate').patchValue(data.startDate);
      this.sheduleInspForm.get('toDate').patchValue(data.endDate);
      this.selecetdDat = moment(data.startDate).add(3, 'days').format('YYYY-MM-DD');
      this.minDate = data.startDate;
    }, error => {
      console.log(error);
      this.toaster.error('Unable To Open', 'Error', {
        timeOut: 2000
      });
    });
  }
  // Reschedule
  resdhedule() {
    console.log(this.sheduleInspForm.value);
    if (this.sheduleInspForm.valid) {
      const obj = {
        inspectionId: this.resdheuleId,
        fromdate: this.sheduleInspForm.value.fromDate,
        toDate: this.sheduleInspForm.value.toDate
      };
      this.insAdmin.resheduleInspection(obj).pipe(takeUntil(this.subscribe)).subscribe((resheduleDat: any) => {
        console.log(resheduleDat);
        this.resdheuleId = '';
        this.toaster.success('Inspection ReSheduled Successfully', 'Success', {
          timeOut: 2000
        });
        this.getShedules();
        this.closeBtn.nativeElement.click();
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }

  // Destroy The Subscribe Data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
