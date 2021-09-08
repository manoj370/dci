import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allClaims',
  templateUrl: './allClaims.component.html',
  styleUrls: ['./allClaims.component.css']
})
export class AllClaimsComponent implements OnInit {

  constructor(public router :Router) { }

  ngOnInit() {
  }
 view()
  {
    
    this.router.navigate(['/main/internal/travelagent/viewclaim']);
  }
}
