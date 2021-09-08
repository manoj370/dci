import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';

@Component({
  selector: 'app-sec-agendaview',
  templateUrl: './sec-agendaview.component.html',
  styleUrls: ['./sec-agendaview.component.css']
})
export class SecAgendaviewComponent implements OnInit {

  constructor(public ecservice: ExcutiveService,public helper: HelperService,
    public econst: ECconstantServices, public route: ActivatedRoute,public router: Router) { }

  ngOnInit(): void {
  }

}
