import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appConstants } from 'src/app/common-service/const.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(public router: Router, public appConst: appConstants) { }


  ngOnInit(): void {
  }
  back() {
    this.router.navigate(['main/internal/outbound/president/dashboard']);
  }

}
