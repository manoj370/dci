import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';
import { CollegeService } from '../../services/college/college.service';
import { constantServices } from '../../models/const.model';

@Component({
  selector: 'app-coll-dash',
  templateUrl: './coll-dash.component.html',
  styleUrls: ['./coll-dash.component.css']
})
export class CollDashComponent implements OnInit, OnDestroy {
  rowId = 0;
  pages: any;
  pageid = 10;
  pageCount: any;
  myProperty = '';
  complaintList: any;
  subscribe: Subject<any> = new Subject<any>();
  tableHeaders = [];
  constructor(public colServ: CollegeService, public toastr: ToastrService,
    public helper: HelperService, public collegeConst: constantServices) { }

  ngOnInit(): void {
    this.tableHeaders = this.collegeConst.collegeTable;
    this.serachValue(this.myProperty);
  }
  // Searcha nd Get All Complaints Call
  serachValue(data: any) {
    this.colServ.searchComplintsList(data, this.rowId, this.pageid)
      .pipe(takeUntil(this.subscribe))
      .subscribe((searchcomplaintList: any) => {
        console.log(searchcomplaintList);
        if (searchcomplaintList.length !== 0) {
          this.complaintList = searchcomplaintList;
          this.pageCount = Math.ceil(searchcomplaintList[0].totalCount / this.pageid);
          console.log(this.complaintList);
        } else {
          this.complaintList = [];
          console.log('No Data Available in Table');
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });

  }

  // Table Next button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      console.log(this.rowId);
      this.serachValue(this.myProperty);
    }
  }

  // Table Prvious Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      this.serachValue(this.myProperty);
    }
  }

  // Unsubscribe The APi cALls Data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
