import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travelagentclaim',
  templateUrl: './travelagentclaim.component.html',
  styleUrls: ['./travelagentclaim.component.css']
})
export class TravelagentclaimComponent implements OnInit {
 showMyContainer: boolean = false;
  constructor(public router :Router) { }

  ngOnInit(): void {
  }
   view()
  {
    
    this.router.navigate(['/main/internal/inspection/insCell/travelclaimview']);
  }

}
