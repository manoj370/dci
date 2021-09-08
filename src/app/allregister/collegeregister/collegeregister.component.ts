import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collegeregister',
  templateUrl: './collegeregister.component.html',
  styleUrls: ['./collegeregister.component.css']
})

export class CollegeregisterComponent implements OnInit {

  constructor(public router: Router) { }
  show = false;
  ngOnInit() {
  }
  onClick() {
    this.show = true;
  }

}
