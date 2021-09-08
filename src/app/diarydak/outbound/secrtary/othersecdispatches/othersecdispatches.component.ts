import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { OutboundService } from '../../services/outbound.service';
@Component({
  selector: 'app-othersecdispatches',
  templateUrl: './othersecdispatches.component.html',
  styleUrls: ['./othersecdispatches.component.css']
})
export class OthersecdispatchesComponent implements OnInit,OnDestroy{

  subscribe: Subject<any> = new Subject<any>();
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  sectionid: any;
  sectionslist: any;
  urlString = '';
  allDispatchList: any;refno: any;
  noteSheetDate: any;
  subject: any;
  status: any;
;
  pageCount: any;
  navigationSubscription:any;
  constructor(private outboundsvc: OutboundService,private router: Router) { }

  ngOnInit(): void {
    this.getAllDispatchesList();
    // Added for menu reload
this.navigationSubscription= this.router.events.pipe(
  filter((event: RouterEvent) => event instanceof NavigationEnd)
).subscribe(() => {
  this.getAllDispatchesList();
});
  }
  getAllDispatchesList() {
    this.outboundsvc.otherSecDispatchList(this.pageId,this.rowId)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data[0]);
        this.allDispatchList=data[0];
        this.refno =this.allDispatchList.referenceFileNo;
        this.noteSheetDate=this.allDispatchList.noteSheetDate;
        this.subject=this.allDispatchList.noteSheetSubject;
        this.status=this.allDispatchList.dakStatus.statusName

        // if (data !== null && data.length !== 0) {
        //   this.allDispatchList = data[0];
        //   this.pageCount = Math.ceil(this.allDispatchList[0].totalCount / this.pageId);
        // } else {
        //   this.allDispatchList = [];
        //   this.pageCount = 0;
        // }
      }, error => {
        console.log(error);
      });
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
   }
    this.subscribe.next();
    this.subscribe.complete();
  }

}
