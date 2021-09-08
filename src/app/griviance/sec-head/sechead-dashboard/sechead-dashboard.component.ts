import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { constantServices } from '../../models/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { SecHeadService } from './../../services/sectionHead/secHead.service';

@Component({
  selector: 'app-sechead-dashboard',
  templateUrl: './sechead-dashboard.component.html',
  styleUrls: ['./sechead-dashboard.component.css']
})
export class SecheadDashboardComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageid = 10;
  pageCount: any;
  pages: any;
  myProperty = '';
  dashboardCount: any;
  allComplaintsList = [];
  subscribe: Subject<any> = new Subject<any>();
  tableHeaders = [];

  constructor(public router: Router, public secheadSer: SecHeadService, public helper: HelperService, public secConst: constantServices) { }

  ngOnInit(): void {
    this.serachValue(this.myProperty);
    this.tableHeaders = this.secConst.ShtableHeaders;
  }
  // Serach with Complints List
  serachValue(data: any) {
    this.secheadSer.getsearchResult(data, this.rowId, this.pageid)
      .pipe(takeUntil(this.subscribe))
      .subscribe((searchcomplaintList: any) => {
        console.log(searchcomplaintList);
        if (searchcomplaintList.length !== 0) {
          this.allComplaintsList = searchcomplaintList;
          this.pageCount = Math.ceil(searchcomplaintList[0].totalCount / this.pageid);
          console.log(searchcomplaintList[0].totalCount);
          this.countData();
        } else {
          this.allComplaintsList = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }

  // Dashboard Counts List
  countData() {
    this.secheadSer.getDashbaordCount().pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.dashboardCount = data;
    }, error => {
      this.helper.errorMessage(error);
    })
  }
  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      console.log(this.rowId);
      this.serachValue(this.myProperty);
    }
  }
  // Prvious Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      this.serachValue(this.myProperty);
    }
  }



  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
