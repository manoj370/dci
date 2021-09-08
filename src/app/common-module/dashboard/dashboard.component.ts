import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'usermgt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    if (JSON.parse(sessionStorage.getItem('userInfo-usec')).defaultRole.roleName !== 'System Admin') {
      this.router.navigate(['/']);
    }
    console.log(JSON.parse(sessionStorage.getItem('userInfo-usec')).defaultRole.roleName);
  }
  logout() {
    sessionStorage.clear();
  }


}
