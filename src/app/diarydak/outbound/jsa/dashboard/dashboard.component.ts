import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OutboundService } from '../../services/outbound.service';
import { HelperService } from 'src/app/common-service/helper.service';
import { JSAConstantServices } from '../../models/jsaconst.model';

@Component({
  selector: 'JSA-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  rowId = 0;
  toDate = '';
  pageId = 10;
  fromDate = '';
  pageCount: any;
  statusName = '';
  searchTxt = '';
  allDispatchList: any = [];
  dashboardStatus: any = [];

  subscribe: Subject<any> = new Subject<any>();
  constructor(public jsaService: OutboundService, public helper: HelperService, public jsaConst: JSAConstantServices) { }

  ngOnInit(): void {
    this.getAllDispatchesList();
    this.jsaService.dashboardStatus().subscribe((data: any) => {
      console.log(data);
      this.dashboardStatus = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // Dashboard Lis
  getAllDispatchesList() {
    this.jsaService.dispatchdetailsWithPagiantion(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId,this.rowId, this.pageId)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.allDispatchList = data;
          this.pageCount = Math.ceil(this.allDispatchList[0].totalCount / this.pageId);
        } else {
          this.allDispatchList = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  statusGetAllDispatchList(stats: any) {
    this.statusName = stats;
    console.log(this.statusName);
    if (this.fromDate === '') {
      this.jsaService.dispatchdetailsByStatus(this.statusName, this.rowId, this.pageId)
        .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
          if (data.length !== 0) {
            this.allDispatchList = data;
            this.pageCount = Math.ceil(this.allDispatchList[0].totalCount / this.pageId);
          } else {
            this.allDispatchList = [];
            this.pageCount = 0;
          }
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    } else {
      this.statusAndDatesList(this.statusName, this.fromDate, this.toDate);
    }
  }
  // selectDateRange
  selectDateRange(data: any) {
    console.log(data.startDate);
    if (data.startDate !== undefined) {
      const startDate = data.startDate._d;
      const endDate = data.endDate._d;
      this.fromDate =
        startDate.getFullYear().toString() +
        '-' +
        ('0' + (startDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + startDate.getDate().toString()).slice(-2);
      this.toDate =
        endDate.getFullYear().toString() +
        '-' +
        ('0' + (endDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + endDate.getDate().toString()).slice(-2);
      console.log(this.fromDate);
      console.log(this.toDate);
      this.rangeGetAllDispatch(this.fromDate, this.toDate);
    } else {
      this.getAllDispatchesList();
    }
  }

  rangeGetAllDispatch(startDate: any, endDate: any) {
    if (this.statusName === '') {
      this.jsaService.dispatchDetailsBetweenDates(startDate, endDate, this.rowId, this.pageId)
        .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
          if (data.length !== 0) {
            this.allDispatchList = data;
            this.pageCount = Math.ceil(this.allDispatchList[0].totalCount / this.pageId);
          } else {
            this.allDispatchList = [];
            this.pageCount = 0;
          }
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    } else {
      this.statusAndDatesList(this.statusName, this.fromDate, this.toDate);
    }
  }

  searchEvent(searchData: any) {
    console.log(searchData);
    this.searchTxt = searchData;
    if (this.searchTxt !== '') {
      this.jsaService.searchDispatches(this.searchTxt, this.rowId, this.pageId)
        .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
          console.log(data);
          if (data !== null && data.length !== 0) {
            this.allDispatchList = data;
            this.pageCount = Math.ceil(this.allDispatchList[0].totalCount / this.pageId);
          } else {
            this.allDispatchList = [];
            this.pageCount = 0;
          }
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    } else {
      this.getAllDispatchesList();
    }
  }
  // dispatchdetailsByStatusAndDates
  statusAndDatesList(status: any, startDate: any, endDate: any) {
    this.jsaService.dispatchdetailsByStatusAndDates(status, startDate, endDate, this.rowId, this.pageId)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.allDispatchList = data;
          this.pageCount = Math.ceil(this.allDispatchList[0].totalCount / this.pageId);
        } else {
          this.allDispatchList = [];
          this.pageCount = 0;
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
      if (this.statusName !== '' && this.fromDate !== '') {
        this.statusAndDatesList(this.statusName, this.fromDate, this.toDate);
      } else if (this.statusName !== '') {
        this.statusGetAllDispatchList(this.statusName);
      } else if (this.fromDate !== '' && this.toDate !== '') {
        this.rangeGetAllDispatch(this.fromDate, this.toDate);
      } else if (this.searchTxt !== '') {
        this.searchEvent(this.searchTxt);
      } else {
        this.getAllDispatchesList();
      }
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      if (this.statusName !== '' && this.fromDate !== '') {
        this.statusAndDatesList(this.statusName, this.fromDate, this.toDate);
      } else if (this.statusName !== '') {
        this.statusGetAllDispatchList(this.statusName);
      } else if (this.fromDate !== '' && this.toDate !== '') {
        this.rangeGetAllDispatch(this.fromDate, this.toDate);
      } else if (this.searchTxt !== '') {
        this.searchEvent(this.searchTxt);
      } else {
        this.getAllDispatchesList();
      }
    }
  }

  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}
