import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { HelperService } from 'src/app/common-service/helper.service';


@Component({
  selector: 'app-excdashboard',
  templateUrl: './excdashboard.component.html',
  styleUrls: ['./excdashboard.component.css']
})
export class ExcdashboardComponent implements OnInit, OnDestroy {
  dashboardInfo: any;
  show = false;
  subscribe: Subject<any> = new Subject<any>();

  constructor(public ecservice: ExcutiveService, public helper: HelperService) { }

  ngOnInit() {
    const userId = JSON.parse(sessionStorage.getItem('userInfo-usec')).userId;
    console.log(userId)
    // Get Dashboard Data
    this.ecservice.dashboard().pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.dashboardInfo = data;
    }, error => {
      this.helper.errorMessage(error);
    });
    // Get Dashboard Data
    // this.ecservice.upcomingMeetings().pipe(takeUntil(this.subscribe)).subscribe((upcomingMeetings: any) => {
    //   console.log(upcomingMeetings)
    //   // this.dashboardInfo = upcomingMeetings;
    // }, error => {
    //   this.helper.errorMessage(error);
    // });
  }
  showData() {
    this.show = !this.show;
  }
  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
