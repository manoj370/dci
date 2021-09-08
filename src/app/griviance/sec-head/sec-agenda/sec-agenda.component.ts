import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sec-agenda',
  templateUrl: './sec-agenda.component.html',
  styleUrls: ['./sec-agenda.component.css']
})
export class SecAgendaComponent implements OnInit {
  agendaListData: any = [];
  agendaList: any = [];

  show = true;
  constructor() { }

  ngOnInit(): void {
    this.agendaListData = [
      { meetingDate: '23-09-2020', completeMeetingVenue: 'Government Dental College And Hospital, Afzalgunj Rd, near Police Station, Afzal Gunj, Hyderabad, Telangana' },
    ];
  }
  getAgendaList(data: any) {
    console.log(data);
    this.show = false;
    this.agendaList = [
      { itemNumber: '6.1(1)', subsection: 'Grievance', subject: 'Main agenda subject for 21st - 1st-update' },
      { itemNumber: '6.1(2)', subsection: 'Grievance', subject: 'Subject 6.1(2)' },
      { itemNumber: '6.1(3)', subsection: 'Grievance', subject: 'Subject 6.2(1)' },
      { itemNumber: '6.1(4)', subsection: 'Grievance', subject: 'Main Agenda Subject' },
      { itemNumber: '12.6.1(5)', subsection: 'Grievance', subject: 'Subject 6.2(3)' }
    ]
  }
}