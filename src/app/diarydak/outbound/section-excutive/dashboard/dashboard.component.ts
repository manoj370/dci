import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutboundService } from '../../services/outbound.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { error } from 'protractor';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
@Component({
  selector: 'secExc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  dashboardData: any = [];
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  searchdatalist: any;
  myProperty: any;
  status: string;
  dataa: any;
  fromdate: string;
  todate: string;
  statusvalue: any;
  userId: string;
  totalCount: any;
  dispatchid: any;
  constructor(public router: Router, public outboundsvc: OutboundService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId-usec');
    this.getAllDispatches();
    this.searchValue('');
  }
  // view dataand navigation
  view(data) {
    console.log(data);
    this.router.navigate(['/main/internal/outbound/secExc/view', { id: data.dispatchId }]);
  }
  // getAllDispatches
  getAllDispatches() {
    this.outboundsvc.dispatchdetailsWithPagiantion(this.userId, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.dashboardData = res;
      this.responsePageCount = this.dashboardData[0].pageCount;
      this.totalCount = this.dashboardData[0].totalCount;

    }, error => {
      console.log(error);
    });
  }
  //Previous Button
  previ() {
    if (this.pageId >= 1) {
      --this.pageId;
      console.log(this.pageId);
      if (this.status === 'search') {
        this.outboundsvc.searchDispatchDetailsByUser(this.userId, this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          this.searchdatalist = res;
          this.dashboardData = this.searchdatalist;
        }, error => {
          console.log(error);
        });
      }
      else if (this.status === "dates") {
        this.outboundsvc.getAllDispatchDetailsUserBetweenDates(this.fromdate, this.todate, this.pageId, this.rowId, this.userId).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          this.dashboardData = res;
          this.status = "dates";
        }, error => {
          console.log(error);
        });
      }
      else if (this.status === "filter") {
        this.outboundsvc.dispatchdetailsByStatus(this.statusvalue, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          this.dashboardData = res;
          this.status = "filter";
        }, error => {
          console.log(error);
        });
      }
      else {
        this.getAllDispatches();
      }
    }
  }
  //Next Button 
  next() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      console.log(this.rowId);
      if (this.status === "search") {
        this.outboundsvc.searchDispatchDetailsByUser(this.userId, this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          this.searchdatalist = res;
          this.dashboardData = this.searchdatalist;
        }, error => {
          console.log(error);
        });
      }
      else if (this.status === "dates") {
        this.outboundsvc.getAllDispatchDetailsUserBetweenDates(this.fromdate, this.todate, this.pageId, this.rowId, this.userId).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          this.dashboardData = res;
          this.status = "dates";
        }, error => {
          console.log(error);
        });
      }
      else if (this.status === "filter") {
        this.outboundsvc.dispatchdetailsByStatus(this.statusvalue, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          this.dashboardData = res;
          this.status = "filter";
        }, error => {
          console.log(error);
        });
      }
      else {
        this.getAllDispatches();
      }
    }

  }
  // search
  searchValue(data: any) {
    debugger
    console.log(data)
    this.dataa = data;
    if (this.dataa !== '') {
      this.outboundsvc.searchDispatchDetailsByUser(this.userId, this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        if (res.length !== 0) {
          this.searchdatalist = res;
          this.dashboardData = this.searchdatalist;
          this.status = "search";
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.getAllDispatches();
    }
  }
  // datepickermethod
  public datePicker(event) {
    if (event.startDate !== undefined) {
      const startDate = event.startDate._d;
      const endDate = event.endDate._d;
      this.fromdate =
        startDate.getFullYear().toString() +
        '-' +
        ('0' + (startDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + startDate.getDate().toString()).slice(-2);
      this.todate =
        endDate.getFullYear().toString() +
        '-' +
        ('0' + (endDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + endDate.getDate().toString()).slice(-2);
      console.log(this.fromdate);
      console.log(this.todate);
      this.dispatchDetailsBetweenDates();
    }
  }
  // dispatchDetailsBetweenDates
  dispatchDetailsBetweenDates() {
    this.outboundsvc.getAllDispatchDetailsUserBetweenDates(this.fromdate, this.todate, this.pageId, this.rowId, this.userId).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.dashboardData = res;
      this.status = "dates";
    }, error => {
      console.log(error);
    });
  }
  // dispatchdetailsByStatus
  dispatchdetailsByStatus(value) {
    this.statusvalue = value;
    this.outboundsvc.dispatchdetailsByStatus(this.statusvalue, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.dashboardData = res;
      this.status = "filter";
    }, error => {
      console.log(error);
    });
  }
  // editbutton method
  edit(data) {
    console.log(data.dispatchId);

    this.router.navigate(['/main/internal/outbound/secExc/editDispatch', { id: data.dispatchId }]);
  }
  // Destroy The Subscribe Dta
 ngOnDestroy() {
  this.subscribe.next();
  this.subscribe.complete();
}
}
