import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { constantServices } from '../../models/const.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';
import { SubcomServiceService } from '../../services/subCom/subcom-service.service';


@Component({
  selector: 'app-subcom-dashboard',
  templateUrl: './subcom-dashboard.component.html',
  styleUrls: ['./subcom-dashboard.component.css']
})
export class SubcomDashboardComponent implements OnInit, OnDestroy {
  rowId = 0;
  pages: any;
  pageid = 10;
  pageCount: any;
  allAgendaList = [];
  dashboardCount: any;
  myProperty = '';
  subscribe: Subject<any> = new Subject<any>();
  tableHeaders = [];
  constructor(public subcomAgenda: SubcomServiceService, public toastr: ToastrService, public scConst: constantServices, public helper: HelperService) { }

  ngOnInit(): void {
    this.tableHeaders = this.scConst.sctableheaders;
    this.serachValue(this.myProperty); // Serach with list of Complaints 
  }
  // Serach with list of Complaints 
  serachValue(data: any) {
    this.subcomAgenda.getSerachValue(data, this.rowId, this.pageid)
      .pipe(takeUntil(this.subscribe)).subscribe((searchcomplaintList: any) => {
        console.log(searchcomplaintList);
        if (searchcomplaintList.length !== 0) {
          this.allAgendaList = searchcomplaintList;
          this.pageCount = Math.ceil(searchcomplaintList[0].totalCount / this.pageid);
          console.log(this.allAgendaList);
          this.countData();
        } else {
          this.allAgendaList = [];
          this.pageCount=0;
          console.log('No Data Available in Table');
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // Dashboard Counts List
  countData() {
    this.subcomAgenda.getDashboardCount().pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
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

  // Previous  Button
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
