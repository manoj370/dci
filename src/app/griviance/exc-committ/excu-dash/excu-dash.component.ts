import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ExcComServiceService } from '../../services/excComm/exc-com-service.service';

@Component({
  selector: 'app-excu-dash',
  templateUrl: './excu-dash.component.html',
  styleUrls: ['./excu-dash.component.css']
})
export class ExcuDashComponent implements OnInit {
  allAgendaList = [];
  rowId = 0;
  pages: any;
  pageid = 10;
  pageCount: any;
  dashboardCount: any;
  myProperty: any;

  constructor(public router: Router, public excuCommAgenda: ExcComServiceService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.serachValue('');
  }
  serachValue(data: any) {
    if (data !== '') {
      this.excuCommAgenda.getSerachValue(data, this.rowId, this.pageid).subscribe((searchcomplaintList: any) => {
        console.log(searchcomplaintList);
        if (searchcomplaintList.length !== 0) {
          this.allAgendaList = searchcomplaintList;
          console.log(this.allAgendaList);
        } else {
          this.allAgendaList = [];
          this.toastr.warning('No Data to Display', 'Success', {
            timeOut: 2000
          });
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.excuCommAgenda.getAll(this.rowId, this.pageid).subscribe((excuData: any) => {
        console.log(excuData);
        this.allAgendaList = excuData;
        this.pageCount = Math.ceil(excuData[0].totalCount / this.pageid);
      }, error => {
        console.log(error);
      });

      this.excuCommAgenda.getDashboardCounts().subscribe((dashCount: any) => {
        console.log(dashCount);
        this.dashboardCount = dashCount;
      }, error => {
        console.log(error);
      });
    }
  }


  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      console.log(this.rowId);
      this.excuCommAgenda.getAll(this.rowId, this.pageid).subscribe((excuData: any) => {
        console.log(excuData);
        this.allAgendaList = excuData;
      }, error => {
        console.log(error);
      });
    }
  }

  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      this.excuCommAgenda.getAll(this.rowId, this.pageid).subscribe((excuData: any) => {
        console.log(excuData);
        this.allAgendaList = excuData;
      }, error => {
        console.log(error);
      });
    }
  }
}
