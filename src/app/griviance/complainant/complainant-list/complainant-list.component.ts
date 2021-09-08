import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { constantServices } from '../../models/const.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';
import { ComplaintService } from '../../services/complaint/complaint.service';

@Component({
  selector: 'app-complainant-list',
  templateUrl: './complainant-list.component.html',
  styleUrls: ['./complainant-list.component.css']
})
export class ComplainantListComponent implements OnInit, OnDestroy {
  complaintList: any;
  rowId = 0;
  pageid = 10;
  pageCount: any;
  myProperty: any;
  tableHeaders = [];
  subscribe: Subject<any> = new Subject<any>();
  constructor(public complSer: ComplaintService, public helper: HelperService, public compConst: constantServices) { }

  ngOnInit(): void {
    this.tableHeaders = this.compConst.ComplainantTableHeader;
    this.serachValue(''); // Get Complaints List
  }
  // Get Complaints List
  serachValue(data: any) {
    console.log(data);
    this.complSer.serachValue(data, this.rowId, this.pageid)
      .pipe(takeUntil(this.subscribe))
      .subscribe((searchcomplaintList: any) => {
        console.log(searchcomplaintList);
        if (searchcomplaintList.length !== 0) {
          this.complaintList = searchcomplaintList;
          this.pageCount = Math.ceil(this.complaintList[0].totalCount / this.pageid);
          console.log(this.pageCount);
        } else {
          this.pageCount = 0;
          this.complaintList = [];
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
      this.serachValue('');
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.serachValue('');
    }
  }

  // Destroy The Subscribe Data 
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}
