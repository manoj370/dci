import { Subject } from 'rxjs';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { encryptionService } from 'src/app/common-service/cedService';
import { urlServices } from 'src/app/griviance/models/url.models';


@Component({
  selector: 'app-downloadmeeting',
  templateUrl: './downloadmeeting.component.html',
  styleUrls: ['./downloadmeeting.component.css']
})
export class DownloadmeetingComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageId = 10;
  pageCount: any;
  tableHeaders = [];
  selectedDate: any;
  meetingHistoryData: any;
  userIdValue: any;
  accesToken: any;
  downloadUrl: string;

  subscribe: Subject<any> = new Subject<any>();

  constructor(public ecservice: ExcutiveService, public helper: HelperService, public url: urlServices,
    public ced: encryptionService, public constant: ECconstantServices) { }

  ngOnInit(): void {
    this.tableHeaders = this.constant.downloadTableHeader;
    // this.agendaList('');
    this.userIdValue = JSON.parse(sessionStorage.getItem('userInfo-usec')).userId;
    this.accesToken = this.ced.decryptingProcess('access-token');
    console.log(this.accesToken);
  }

  agendaList(date: any) {
    this.ecservice.AllMeetingHistory(date)
      .pipe(takeUntil(this.subscribe)).subscribe((agendaList: any) => {
        console.log(agendaList);
        if (agendaList.length !== 0) {
          this.meetingHistoryData = agendaList;
          this.meetingHistoryData.forEach(element => {
            if (element.momStatus === 'ECMOMPUBLISHED') {
              // this.downloadSigned(element.meetingId);
              this.ecservice.signedDownload(element.meetingId)
                .pipe(takeUntil(this.subscribe)).subscribe((download: any) => {
                  this.downloadUrl = this.url.documentUrl + '?uuid=' + download.documentId;
                  element['downloadURl'] = this.url.documentUrl + '?uuid=' + download.documentId;
                }, error => {
                  this.helper.errorMessage(error);
                });
            }
            console.log(this.meetingHistoryData);

          });
          this.pageCount = Math.ceil(this.meetingHistoryData[0].totalCount / this.pageId);
        } else {
          this.meetingHistoryData = [];
          this.pageCount = 0;
        }
      }, error => {
        this.helper.errorMessage(error);
      });
  }
  downloadSigned(id: any) {

  }
  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      this.agendaList('');
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.agendaList('');
    }
  }

  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
