import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-caseitemview',
  templateUrl: './caseitemview.component.html',
  styleUrls: ['./caseitemview.component.css']
})
export class CaseitemviewComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.agendaId = +params.id;
    //   this.ecStatus = params.status;
    //   console.log(+params.id);
    //   console.log(this.ecStatus);

    // });
  }

}
