import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shDashboard',
  templateUrl: './shDashboard.component.html',
  styleUrls: ['./shDashboard.component.scss']
})
export class ShDashboardComponent implements OnInit {
  agendaListData: any = [];
  constructor() { }

  ngOnInit() {
    this.agendaListData = [
      { meetingDate: '20-12-2020', completeMeetingVenue: 'test,test,120-test,newDelhi,522615' },
      { meetingDate: '10-08-2020', completeMeetingVenue: 'test12,test5,120-test,Hyderabad,522615' },
      { meetingDate: '08-10-2020', completeMeetingVenue: 'test20,test01,120-test,USA,522615' },
      { meetingDate: '25-05-2020', completeMeetingVenue: 'test25,test02,120-test,Can,522615' }

    ];
  }

}
