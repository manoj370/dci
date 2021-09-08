import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accDash',
  templateUrl: './accDash.component.html',
  styleUrls: ['./accDash.component.css']
})
export class AccDashComponent implements OnInit {
 showMyContainer: boolean = false;
  constructor(public router :Router) { }

  ngOnInit() {
  }
 view()
  {
    
    this.router.navigate(['/main/internal/accfinace/travelclaimdetail']);
  }
}
