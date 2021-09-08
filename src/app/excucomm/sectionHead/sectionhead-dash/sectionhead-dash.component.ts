import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HelperService } from 'src/app/common-service/helper.service';
import { ExcutiveService } from '../../service/excutive.service';

@Component({
  selector: 'app-sectionhead-dash',
  templateUrl: './sectionhead-dash.component.html',
  styleUrls: ['./sectionhead-dash.component.css']
})
export class SectionheadDashComponent implements OnInit {
  meetingList: any = [];
  agendaList: any = [];
  rowId = 0;
  pageId = 10;
  pageCount: any;
  show = true;
  newDateValue = '';
  subscribe: Subject<any> = new Subject<any>();
  meetingId: any;
  ecStatus: any;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;

  constructor(public ecservice: ExcutiveService, public helper: HelperService, public toaster: ToastrService) { }

  ngOnInit(): void {
    this.AllMeetingHistory();
  }
  AllMeetingHistory() {
    this.ecservice.AllMeetingHistory(this.newDateValue).pipe(takeUntil(this.subscribe)).subscribe((Meetings: any) => {
      console.log(Meetings);
      this.show = true;
      this.meetingList = Meetings;
    }, error => {
      this.helper.errorMessage(error);
    });
  }

  getAgendaList(id: any, status: any) {
    this.meetingId = id;
    this.ecStatus = status;
    console.log(this.ecStatus);
    this.ecservice.getAgendaList(id, this.rowId, this.pageId).pipe(takeUntil(this.subscribe)).subscribe((agenda: any) => {
      console.log(agenda);
      this.show = false;
      this.agendaList = agenda;
      this.pageCount = Math.ceil(this.agendaList[0].totalCount / this.pageId);
    }, error => {
      this.helper.errorMessage(error);
    });
  }

  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      console.log(this.rowId);
      this.getAgendaList(this.meetingId, this.ecStatus);
    }
  }
  // Previous bUtton
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      this.getAgendaList(this.meetingId, this.ecStatus);
    }
  }
  finishRefinements() {
    console.log(this.meetingId);
    this.ecservice.finishRefinements(this.meetingId).pipe(takeUntil(this.subscribe)).subscribe((agenda: any) => {
      console.log(agenda);
      this.show = true;
      this.closeBtn.nativeElement.click();
      this.AllMeetingHistory();
      this.toaster.success('Finished Refinements Successfully', 'Success', {
        timeOut: 2000
      });
    }, error => {
      this.helper.errorMessage(error);
    });
  }

}
