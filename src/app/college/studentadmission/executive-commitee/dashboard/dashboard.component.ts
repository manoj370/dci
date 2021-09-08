import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'college-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
 // route to view
 view() {
  this.router.navigate(['main/internal/college/executiveCommittee/view']);
}
}