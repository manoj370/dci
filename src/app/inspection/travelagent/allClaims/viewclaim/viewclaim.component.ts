import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-viewclaim',
  templateUrl: './viewclaim.component.html',
  styleUrls: ['./viewclaim.component.css']
})
export class ViewclaimComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  $("#accordion").on("hide.bs.collapse show.bs.collapse", (e) => {
      $(e.target).prev().find("i:last-child").toggleClass("fa-plus fa-minus");
    });
  }

}
