import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';

@Component({
  selector: 'app-academicmatter',
  templateUrl: './academicmatter.component.html',
  styleUrls: ['./academicmatter.component.css']
})
export class AcademicmatterComponent implements OnInit,OnDestroy {
  rowId = 0;
  pageId = 10;
  pageCount: any;
  academicMatterList: any = [];
  tableHeaders = [];
  subscribe: Subject<any> = new Subject<any>();

  constructor(public ecservice: ExcutiveService, public fb: FormBuilder, public helper: HelperService,
    public econst: ECconstantServices) { }

  ngOnInit(): void {
    this.tableHeaders = this.econst.Headers;
    this.academicMatter();
  }
  academicMatter() {
    const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
    this.ecservice.basedAgendaList(meetingId, 5, this.rowId, this.pageId)
    .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      if (data.length !== 0) {
        this.academicMatterList = data;
        this.pageCount = Math.ceil(this.academicMatterList[0].totalCount / this.pageId);
      } else {
        this.academicMatterList = [];
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
      this.academicMatter();
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.academicMatter();
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
