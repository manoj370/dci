import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutboundService } from '../../services/outbound.service';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
@Component({
  selector: 'secInc-Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  count: any;
  dashboardData: any = [];
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any;
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  searchdatalist: any;
  myProperty: any;
  status: string;
  dataa: any;
  fromdate: string;
  todate: string;
  statusvalue: any;
  totalCount: any;
  constructor(public router: Router, public outboundsvc: OutboundService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCounts();
    this.getAllDispatches();
  }
  // view data method
  view(data) {

    this.router.navigate(['main/internal/outbound/diarydaksechead/viewDispatch', { id: data.dispatchId }]);
  }
  // getAllDispatches
  getAllDispatches() {
    this.outboundsvc.getAllDispatchDetailsByStatus(this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.dashboardData = res;
      this.responsePageCount = this.dashboardData[0].pageCount;
      this.totalCount = this.dashboardData[0].totalCount;
    }, error => {
      console.log(error);
    });
  }
  // getCounts
  getCounts() {
    this.outboundsvc.getCounts().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.count = res;
    }, error => {
      console.log(error);
    })
  }
  //Previous Button
  previ() {
    if (this.pageId >= 1) {
      --this.pageId;
      console.log(this.pageId);
      if (this.status === 'search') {
        this.outboundsvc.searchDispatchDetailsByStatus(this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          this.searchdatalist = res;
          this.dashboardData = this.searchdatalist;
        }, error => {
          console.log(error);
        });
      }
      else if (this.status === "dates") {
        this.outboundsvc.dispatchDetailsBetweenDates(this.fromdate, this.todate, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
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
      else if (this.status === 'dateandstatus') {
        this.outboundsvc.dispatchdetailsByStatusAndDates(this.statusvalue,this.fromdate, this.todate, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          this.dashboardData = res;
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
      console.log(this.pageId);
      if (this.status === "search") {
        this.outboundsvc.searchDispatchDetailsByStatus(this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          this.searchdatalist = res;
          this.dashboardData = this.searchdatalist;
        }, error => {
          console.log(error);
        });
      }
      else if (this.status === "dates") {
        this.outboundsvc.dispatchDetailsBetweenDates(this.fromdate, this.todate, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          this.dashboardData = res;
          this.status = "dates";
        })
        error => {
          console.log(error);
        };
      }
      else if (this.status === "filter") {
        this.outboundsvc.dispatchdetailsByStatus(this.statusvalue, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          this.dashboardData = res;
          this.status = "filter";
        }, error => {
          console.log(error);
        });
      } else if (this.status === 'dateandstatus') {
        this.outboundsvc.dispatchdetailsByStatusAndDates(this.statusvalue,this.fromdate, this.todate, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          this.dashboardData = res;
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
    console.log(data);
    this.dataa = data;
    if (this.dataa !== '') {
      this.outboundsvc.searchDispatchDetailsByStatus(this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
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
  // datepicker method
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
      this.dispatchdetailsByStatusAndDates();
    }
  }
  // dispatchDetailsBetweenDates
  dispatchDetailsBetweenDates() {
    this.outboundsvc.dispatchDetailsBetweenDates(this.fromdate, this.todate, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
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
  //  dispatchdetailsByStatusAndDates
  dispatchdetailsByStatusAndDates() {
    this.outboundsvc.dispatchdetailsByStatusAndDates(this.statusvalue,this.fromdate, this.todate, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.dashboardData = res;
      this.status = "dateandstatus";
    }, error => {
      console.log(error);
    });
  }
    // Destroy The Subscribe Dta
ngOnDestroy() {
  this.subscribe.next();
  this.subscribe.complete();
}
}
