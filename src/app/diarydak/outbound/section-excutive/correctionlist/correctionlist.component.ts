import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OutboundService } from '../../services/outbound.service';
import { HelperService } from 'src/app/common-service/helper.service';
import { JSAConstantServices } from '../../models/jsaconst.model';

@Component({
  selector: 'app-correctionlist',
  templateUrl: './correctionlist.component.html',
  styleUrls: ['./correctionlist.component.css']
})
export class CorrectionlistComponent implements OnInit,OnDestroy {
  rowId = 0;
  toDate = '';
  pageId = 10;
  fromDate = '';
  pageCount: any;
  statusName = '';
  searchTxt = '';
  allCorrectionList: any = [];
  subscribe: Subject<any> = new Subject<any>();
  constructor(public ssaService: OutboundService, public helper: HelperService, public jsaConst: JSAConstantServices) { }

  ngOnInit(): void {
    this.getCorrectionList();
  }
  // Dashboard Lis
  getCorrectionList() {
    this.ssaService.getCorrectionList('',this.rowId, this.pageId)
    .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      if (data.length !== 0) {
        this.allCorrectionList = data;
        this.pageCount = Math.ceil(this.allCorrectionList[0].totalCount / this.pageId);
      } else {
        this.allCorrectionList = [];
        this.pageCount = 0;
      }
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  statsuList(value: string){
    this.ssaService.statusCorrectionList(value,this.rowId, this.pageId)
    .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      if (data.length !== 0) {
        this.allCorrectionList = data;
        this.pageCount = Math.ceil(this.allCorrectionList[0].totalCount / this.pageId);
      } else {
        this.allCorrectionList = [];
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
      this.getCorrectionList()
      }
    }
    // Previous  Button
    previ() {
      if (this.rowId >= 1) {
        --this.rowId;
        this.getCorrectionList()      
      }
    }

    getSearchCorrectionList(data:any){      
      this.ssaService.searchCorrectionList(data,this.rowId, this.pageId)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.allCorrectionList = data;
          this.pageCount = Math.ceil(this.allCorrectionList[0].totalCount / this.pageId);
        } else {
          this.allCorrectionList = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
 
    selectDateRange(data: any) {
      console.log(data);
      if (data.startDate !== undefined) {
        const startDate = data.startDate._d;
        const endDate = data.endDate._d;
        const fromDate =
          startDate.getFullYear().toString() +
          '-' +
          ('0' + (startDate.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + startDate.getDate().toString()).slice(-2);
        const toDate =
          endDate.getFullYear().toString() +
          '-' +
          ('0' + (endDate.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + endDate.getDate().toString()).slice(-2);
        console.log(fromDate);
        console.log(toDate);
        this.rangeGetAllDispatch(fromDate, toDate);
      }
    }
    rangeGetAllDispatch(startDate: any, endDate: any) {
      // datesCorrectionList
      this.ssaService.datesCorrectionList(startDate,endDate,this.rowId, this.pageId)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.allCorrectionList = data;
          this.pageCount = Math.ceil(this.allCorrectionList[0].totalCount / this.pageId);
        } else {
          this.allCorrectionList = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }

  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}