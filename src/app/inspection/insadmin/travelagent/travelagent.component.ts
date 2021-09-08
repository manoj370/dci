import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-travelagent',
  templateUrl: './travelagent.component.html',
  styleUrls: ['./travelagent.component.css']
})
export class TravelagentComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  view() {

    this.router.navigate(['main/internal/inspection/tavelagentview']);
  }
}
