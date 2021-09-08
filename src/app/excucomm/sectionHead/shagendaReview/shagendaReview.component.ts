import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { appConstants } from 'src/app/common-service/const.model';

@Component({
  selector: 'app-shagendaReview',
  templateUrl: './shagendaReview.component.html',
  styleUrls: ['./shagendaReview.component.scss']
})
export class ShagendaReviewComponent implements OnInit, OnDestroy {
  ecStatus: any;
  agendaId: any;
  meetingId: any;
  submitted = false;
  agendaDetails: any;
  AgendaForm: FormGroup;
  formError: any;
  status: any;
  subscribe: Subject<any> = new Subject<any>();
  decisionValue = '';

  constructor(public ecservice: ExcutiveService, public fb: FormBuilder, public helper: HelperService, public appConst: appConstants,
    public econst: ECconstantServices, public route: ActivatedRoute, public toaster: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getDetails(params.id);
      this.agendaId = +params.id;
      // this.ecStatus = params.status;
      this.status = params.ecStatus;
      console.log(+params.id);
      console.log(this.ecStatus);
    });
    this.formError = this.econst.formErrors;
    this.AgendaForm = this.fb.group({
      discussion: ['', Validators.required],
      decision: [''],
    });

  }

  get f() { return this.AgendaForm.controls; }

  // Get Agenda Details
  getDetails(id: any) {
    this.ecservice.getAgenda(id).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.agendaDetails = data;
      this.AgendaForm.get('discussion').patchValue(this.agendaDetails.agendaItemDiscussion);
      this.AgendaForm.get('decision').patchValue(this.agendaDetails.agendaItemDecision !== null ? (atob(this.agendaDetails.agendaItemDecision)).replace(/<[^>]*>/g, '') : '');
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  save() {
    console.log(this.AgendaForm.value);
    this.submitted = true;
    if (this.AgendaForm.valid) {
      const obj = {
        agendaId: this.agendaId,
        agendaItemDiscussion: this.AgendaForm.value.discussion,
        agendaItemDecision: this.AgendaForm.value.decision !== '' ? (this.AgendaForm.value.decision)
          : this.agendaDetails.agendaItemDecision
      };
      console.log(obj);
      this.ecservice.saveAgenda(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.submitted = false;
        this.toaster.success('Agenda Saved Successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['/main/internal/excu/sectionHead/sectionDashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }


  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}

