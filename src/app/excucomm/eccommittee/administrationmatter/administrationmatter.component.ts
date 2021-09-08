import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { HelperService } from 'src/app/common-service/helper.service';

@Component({
  selector: 'app-administrationmatter',
  templateUrl: './administrationmatter.component.html',
  styleUrls: ['./administrationmatter.component.css']
})
export class AdministrationmatterComponent implements OnInit,OnDestroy {
  rowId = 0;
  pageId = 10;
  pageCount: any;
  adminMatterList: any = [];
  tableHeaders = [];
  subscribe: Subject<any> = new Subject<any>();

  constructor(public ecservice: ExcutiveService,  public helper: HelperService,
    public econst: ECconstantServices) { }

  ngOnInit(): void {
    this.tableHeaders = this.econst.Headers;
    this.adminMatter();
  }
  adminMatter() {
    const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
    this.ecservice.basedAgendaList(meetingId, 7, this.rowId, this.pageId)
    .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      if (data.length !== 0) {
        this.adminMatterList = data;
        this.pageCount = Math.ceil(this.adminMatterList[0].totalCount / this.pageId);
      } else {
        this.adminMatterList = [];
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
      this.adminMatter();
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.adminMatter();
    }
  }
// Unsubscribe The API
ngOnDestroy() {
  this.subscribe.next();
  this.subscribe.complete();
}
}

//  view() {
//   this.router.navigate(['main/internal/excu/arplmatterview']);
// }
// }
