import { Subject } from 'rxjs';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { ToastrService } from 'ngx-toastr';
import { appConstants } from 'src/app/common-service/const.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conductmeeting',
  templateUrl: './conductmeeting.component.html',
  styleUrls: ['./conductmeeting.component.css']
})
export class ConductmeetingComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageId = 10;
  pageCount: any;
  tableHeaders = [];
  selectedDate: any;
  showBtn = false;
  meetingHistoryData: any;
  today = moment().format('YYYY-MM-DD');
  subscribe: Subject<any> = new Subject<any>();
  meetingIdValue: any;
  sendEcForm: FormGroup;
  files: any = [];
  body = '';
  @ViewChild('dismissModal') CloseBtn: ElementRef<HTMLElement>;
  @ViewChild('secDismissModal') secCloseBtn: ElementRef<HTMLElement>;
  @ViewChild('mailDismissModal') mailCloseBtn: ElementRef<HTMLElement>;


  // myDate: Date = new Date('2020-11-12T19:30:00.000+0000');

  constructor(public ecservice: ExcutiveService, public helper: HelperService, public toaster: ToastrService,
    public constant: ECconstantServices, public appConst: appConstants, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.tableHeaders = this.constant.downloadTableHeader;
    // this.agendaList('');
    this.sendEcForm = this.fb.group({
      body: ['']
    });
  }

  agendaList(date: any) {
    console.log(this.selectedDate);

    this.ecservice.AllMeetingHistory(date)
      .pipe(takeUntil(this.subscribe)).subscribe((agendaList: any) => {
        console.log(agendaList);
        if (agendaList.length !== 0) {
          this.meetingHistoryData = agendaList;
          // console.log(this.myDate);
          this.meetingHistoryData.forEach(element => {
            if (new Date(element.meetingDate) <= new Date(this.today)) {
              this.showBtn = true;
            }
          });
          this.pageCount = Math.ceil(this.meetingHistoryData[0].totalCount / this.pageId);
        } else {
          this.meetingHistoryData = [];
          this.pageCount = 0;
        }
      }, error => {
        this.helper.errorMessage(error);
      });
  }
  // Get meeting id
  getMeetingId(id: any) {
    this.meetingIdValue = id;
  }
  // MOM Publish
  momPublish() {
    this.ecservice.momPublish(this.meetingIdValue)
      .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.CloseBtn.nativeElement.click();
        this.toaster.success('MOM Published Successfully', 'Success', {
          timeOut: 2000
        });
        this.agendaList(this.selectedDate);
      }, error => {
        this.helper.errorMessage(error);
      });
  }
  // Set Meeting Details In Session Storage
  setMeetingDate(data: any) {
    sessionStorage.setItem('Meeting', JSON.stringify(data));
    this.toaster.success('Conduct Meeting/Edit MOM Successfully', 'Success', {
      timeOut: 2000
    });
  }
  // SH Review
  sendSHReview(id: any) {
    this.ecservice.sendSHReview(id)
      .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.agendaList(this.selectedDate);
        this.toaster.success('Send To Section Head For Refinement', 'Success', {
          timeOut: 2000
        });
      }, error => {
        this.helper.errorMessage(error);
      });
  }
  // Send For Review
  sendReview() {
    this.ecservice.sendReview(this.meetingIdValue)
      .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.agendaList(this.selectedDate);
        this.secCloseBtn.nativeElement.click();
        this.toaster.success('Send To Secretary For Review', 'Success', {
          timeOut: 2000
        });
      }, error => {
        this.helper.errorMessage(error);
      });
  }
  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      this.agendaList(this.selectedDate);
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.agendaList(this.selectedDate);
    }
  }
  // File upload
  getFileDetails(e) {
    console.log(e.target.files);
    this.files = e.target.files;
  }
  // Send To EC Members
  sendToEC() {
    console.log(this.sendEcForm.value);
    // sendToEC
    if (this.sendEcForm.valid) {
      const obj = {
        meetingId: this.meetingIdValue,
        userId: JSON.parse(sessionStorage.getItem('userInfo-usec'))['userId'],
        body: this.sendEcForm.value.body
      };
      this.ecservice.sendToEC(this.files, obj)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.agendaList(this.selectedDate);
          this.mailCloseBtn.nativeElement.click();
          this.toaster.success('Send MOM To EC Successfully', 'Success', {
            timeOut: 2000
          });
        }, error => {
          this.helper.errorMessage(error);
        });
    }
  }
  finalMomPublish() {
    this.ecservice.finalMomPublish(this.meetingIdValue, this.files)
      .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.agendaList(this.selectedDate);
        this.CloseBtn.nativeElement.click();
        this.toaster.success('Final MOM Publish Success', 'Success', {
          timeOut: 2000
        });
      }, error => {
        this.helper.errorMessage(error);
      });
  }

  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}

