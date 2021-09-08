import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { HelperService } from 'src/app/common-service/helper.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-maintaindatevenue',
  templateUrl: './maintaindatevenue.component.html',
  styleUrls: ['./maintaindatevenue.component.css']
})
export class MaintaindatevenueComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageId = 10;
  pageCount: any;
  tableHeaders = [];
  optionValue: any;
  errorMsgs: any;
  meetingVenueList: any;
  addNewVenue: FormGroup;
  cityList: any = [];
  submitted = false;
  meetingVenueHeaders: any;
  statesList: any = [];
  meetingHistoryData: any;
  newMeetingForm: FormGroup;
  today: any;
  meetingId: any;
  buttonName: string;
  popupHeadersName: any;
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('openModal') openBtn: ElementRef<HTMLElement>;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('venueDismissModal') venueCloseBtn: ElementRef<HTMLElement>;

  constructor(public ecservice: ExcutiveService, public fb: FormBuilder, public helper: HelperService,
    public econst: ECconstantServices, public toaster: ToastrService) { }

  ngOnInit(): void {
    // this.today = moment().format('DD-MM-YYYY');
    this.today = moment().add(30, 'days').format('YYYY-MM-DD');

    this.errorMsgs = this.econst.formErrors;
    this.meetingVenueHeaders = this.econst.meetingVenueHeader;
    this.venuesList();
    this.meetingHistory('');
    this.newMeetingForm = this.fb.group({
      venueId: ['', Validators.required],
      meetingDate: ['', Validators.required],

    });
    this.addNewVenue = this.fb.group({
      venueName: ['', Validators.required],
      AddressLine1: ['', Validators.required],
      AddressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['India'],
      zipCode: ['', [Validators.required, Validators.pattern('[0-9]\\d{5}')]]
    });

  }
  get f() { return this.newMeetingForm.controls; }
  get g() { return this.addNewVenue.controls; }

  stateList() {
    this.cityList = [];
    this.ecservice.States().pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.statesList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  meetingHistory(date: any) {
    const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
    this.ecservice.getMeetingVenueList(meetingId, date).pipe(takeUntil(this.subscribe)).subscribe((history: any) => {
      console.log(history);
      if (history.length !== 0) {
        this.meetingHistoryData = history;
        this.pageCount = Math.ceil(history[0].totalCount / this.pageId);
      } else {
        this.meetingHistoryData = [];
        this.pageCount = 0;
      }
    }, error => {
      this.helper.errorMessage(error);
    });
  }

  venuesList() {
    // Get Meeting Venue Data
    this.ecservice.meetingVenueList().pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.meetingVenueList = data;
      this.helper.sortedData(this.meetingVenueList, 'meetingVenueName');
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  cityState(id: any) {
    this.cityList = [];
    this.ecservice.getCityState(id).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.cityList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }
  openModalData(data: any) {
    console.log(data);
    if (data === 'new') {
      this.popupHeadersName = 'Add Date & Venue';
      this.buttonName = 'Submit';
      this.openBtn.nativeElement.click();
    } else {
      this.meetingId = data;
      this.popupHeadersName = 'Edit Date & Venue';
      this.buttonName = 'Update';
      for (const iterator of this.meetingHistoryData) {
        if (data === iterator.meetingId) {
          console.log(iterator.meetingDate);
          this.newMeetingForm.patchValue({
            venueId: iterator.meetingVenue.meetingVenueId,
            meetingDate: '10-20-2020'
          });
        }
      }
      this.openBtn.nativeElement.click();
    }
  }

  addNewMeeting(data: any) {
    this.submitted = true;
    if (this.newMeetingForm.valid) {
      this.newMeetingForm.value.meetingDate = moment(this.newMeetingForm.value.meetingDate).format('DD-MM-YYYY');
      const obj = {
        meetingDate: this.newMeetingForm.value.meetingDate,
        meetingVenue: {
          meetingVenueId: this.newMeetingForm.value.venueId
        }
      };
      if (data === 'Submit') {
        const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
        this.ecservice.addMeeting(meetingId, obj).pipe(takeUntil(this.subscribe)).subscribe((newMeeting: any) => {
          console.log(newMeeting);
          this.clearValidations();
          this.meetingHistory('');
          this.closeBtn.nativeElement.click();
          this.toaster.success('New meeting Added Successfully', 'Success', {
            timeOut: 2000
          });
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
      } else {
        obj['meetingId'] = this.meetingId;
        this.ecservice.updateVenue(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
          this.clearValidations();
          this.meetingHistory('');
          this.closeBtn.nativeElement.click();
          this.toaster.success('Updated Meeting Successfully', 'Success', {
            timeOut: 2000
          });
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
      }
    }
  }
  addNewVenueDetails() {
    this.submitted = true;
    console.log(this.addNewVenue.value);
    this.statesList.forEach(element => {
      if (element.stateId === parseInt(this.addNewVenue.value.state)) {
        this.addNewVenue.value.state = element.stateName;
      }
    });
    this.cityList.forEach(element => {
      if (element.cityId === parseInt(this.addNewVenue.value.city)) {
        this.addNewVenue.value.city = element.cityName;
      }
    });
    if (this.addNewVenue.valid) {
      const obj = {
        meetingVenueName: this.addNewVenue.value.venueName,
        address: {
          line1: this.addNewVenue.value.AddressLine1,
          line2: this.addNewVenue.value.AddressLine2,
          city: this.addNewVenue.value.city,
          state: this.addNewVenue.value.state,
          country: this.addNewVenue.value.country,
          landmark: null,
          zipCode: this.addNewVenue.value.zipCode,
          isPrimary: 'true'
        }
      };
      this.ecservice.addVenueMeeting(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.clearValidations();
        this.venueCloseBtn.nativeElement.click();
        this.venuesList();
        this.toaster.success('New Venue Added Successfully', 'Success', {
          timeOut: 2000
        });
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
      this.meetingHistory('');
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.meetingHistory('');
    }
  }

  clearValidations() {
    this.submitted = false;
    this.newMeetingForm.reset();
    this.addNewVenue.reset();
    this.cityList = [];
    this.addNewVenue.controls.city.setValue('', { onlySelf: true });
    this.addNewVenue.controls.state.setValue('', { onlySelf: true });
    this.newMeetingForm.controls.venueId.setValue('', { onlySelf: true });
  }
  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
