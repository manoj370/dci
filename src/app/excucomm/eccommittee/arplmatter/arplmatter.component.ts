import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { HelperService } from 'src/app/common-service/helper.service';

@Component({
  selector: 'app-arplmatter',
  templateUrl: './arplmatter.component.html',
  styleUrls: ['./arplmatter.component.css']
})
export class ArplmatterComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageId = 10;
  pageCount: any;
  arplMatterList: any = [];
  tableHeaders = [];
  subscribe: Subject<any> = new Subject<any>();

  constructor(public ecservice: ExcutiveService,public helper: HelperService,
    public econst: ECconstantServices) { }

  ngOnInit(): void {
    this.tableHeaders = this.econst.Headers;
    this.arplMatter();
  }
  arplMatter() {
    const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
    this.ecservice.basedAgendaList(meetingId, 6, this.rowId, this.pageId)
    .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      if (data.length !== 0) {
        this.arplMatterList = data;
        this.pageCount = Math.ceil(this.arplMatterList[0].totalCount / this.pageId);
      } else {
        this.arplMatterList = [];
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
      this.arplMatter();
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.arplMatter();
    }
  }
  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}


