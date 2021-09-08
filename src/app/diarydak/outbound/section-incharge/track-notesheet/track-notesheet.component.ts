import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HelperService } from 'src/app/common-service/helper.service';
import { OutboundService } from '../../services/outbound.service';

@Component({
  selector: 'app-track-notesheet',
  templateUrl: './track-notesheet.component.html',
  styleUrls: ['./track-notesheet.component.css']
})
export class TrackNotesheetComponent implements OnInit {
  navigationSubscription: any;
  subscribe: Subject<any> = new Subject<any>();
  rowId = 10;
  pageId = 0;
  responsePageCount: any;
  trackNoteSheetList: any;
  constructor(public jsaService: OutboundService,public helper: HelperService,private router :Router) { }

  ngOnInit(): void {
    this.getTrackNotesheetList();
    this.navigationSubscription= this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
   this.getTrackNotesheetList();
  });
  }
  getTrackNotesheetList() {
    this.jsaService.trackNoteSheet(sessionStorage.getItem('userId-usec'),this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.trackNoteSheetList = res;
      this.responsePageCount =this.trackNoteSheetList[0].pageCount;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    })
  }
   //Previous Button
   prev() {
    if (this.pageId >= 1) {
      --this.pageId;
    this.getTrackNotesheetList();;
    }
  }
  //Next Button 
  next() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      this.getTrackNotesheetList();
    }

  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
    this.subscribe.next();
    this.subscribe.complete();
  }

}
