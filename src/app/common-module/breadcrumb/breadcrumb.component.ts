import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, DoCheck {
  userData: any;
  displayName: any;
  showSEDairyDak = false;
  constructor(public router: Router) { }

  ngOnInit() { }

  ngDoCheck() {
    // this.userData = JSON.parse(sessionStorage.getItem('selectedRole-usec')).defaultRole;
    this.displayName = sessionStorage.getItem('selectedRole-usec');
    // console.log(this.displayName)
  }

}
