import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';
import { InsadminService } from './../../services/insadmin/insadmin.service';

@Component({
  selector: 'app-insreport',
  templateUrl: './insreport.component.html',
  styleUrls: ['./insreport.component.css']
})
export class InsreportComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageid = 10;
  collegeId = '';
  fromdate = '';
  todate = '';
  minDate: any;
  pageCount: number;
  allStates: any = [];
  collegStaff: any = [];
  collbyStates: any = [];
  reporstList: any = [];
  subscribe: Subject<any> = new Subject<any>();
  tableheaders = ['Inspection Id', 'College Name', 'Inspector Name', 'Held On', 'Download'];
  staticData = 100;
  constructor(public insAdmin: InsadminService, public toaster: ToastrService, public helper: HelperService) { }

  ngOnInit(): void {
    this.getStates();
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
    this.insAdmin.getcollbystate($event.target.value).pipe(takeUntil(this.subscribe)).subscribe((college: any) => {
      console.log(college);
      this.collbyStates = college;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // From Date Selected
  seleceteddate(event: any) {
    this.todate = '';
    console.log(event.target.value);
    this.fromdate = event.target.value;
  }

  getReports() {
    if ((this.fromdate !== '') && (this.todate !== '') && (this.collegeId !== '')) {
      this.insAdmin.getReportsList(this.fromdate, this.todate, this.collegeId, this.rowId, this.pageid)
        .pipe(takeUntil(this.subscribe))
        .subscribe((data: any) => {
          console.log(data);
          if (data.length !== 0) {
            this.getStates();
            this.reporstList = data;            
            this.pageCount = Math.ceil(this.reporstList[0].totalCount / this.pageid);
            console.log(this.pageCount);
          } else {
            this.toaster.error('No Data Avilable To Show', 'Error', {
              timeOut: 2000
            });
          }
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    } else {
      this.toaster.error('Required Fields', 'Error', {
        timeOut: 2000
      });
    }
  }
  // Pagination Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      console.log(this.rowId);
      this.getReports();
    }
  }
  // Pagination Prvious Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      this.getReports();
    }
  }

  // Destroy The Subscribe Data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
