import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { appConstants } from 'src/app/common-service/const.model';
import { ECconstantServices } from 'src/app/excucomm/service/constant.model';
import { ExcutiveService } from 'src/app/excucomm/service/excutive.service';

@Component({
  selector: 'app-sec-agenda-view',
  templateUrl: './sec-agenda-view.component.html',
  styleUrls: ['./sec-agenda-view.component.css']
})
export class SecAgendaViewComponent implements OnInit, OnDestroy, AfterViewInit {
  rowId = 0;
  totLength: any;
  ecStatus: any;
  agendaId: any;
  submitted = false;
  agendaDetails: any;
  totalAgendaList: any = [];
  AgendaForm: FormGroup;
  formError: any;
  subscribe: Subject<any> = new Subject<any>();
  decisionValue = '';

  constructor(public ecservice: ExcutiveService, public fb: FormBuilder, public helper: HelperService,public appConst:appConstants,
    public econst: ECconstantServices, public route: ActivatedRoute, public toaster: ToastrService, public router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.agendaId = +params.id;
      this.ecStatus = params.status;
      console.log(+params.id);
      console.log(this.ecStatus);

    });
    this.formError = this.econst.formErrors;
    this.AgendaForm = this.fb.group({
      discussion: ['', Validators.required],
      decision: [''],
    });
    this.getList();

  }
  ngAfterViewInit() {
    // this.message = this.child.childMessage
  }
  get f() { return this.AgendaForm.controls; }
  getList() {
    const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
    console.log(meetingId);
    if (meetingId) {
      this.ecservice.getAgendaListByMeetings(meetingId, parseInt(this.ecStatus)).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.totalAgendaList = data;
        this.totLength = data.length;
        this.rowId = this.totalAgendaList.map((e) => { return e.agendaId; }).indexOf(this.agendaId);
        console.log(this.rowId);
        if (this.rowId === -1) {
          this.getDetails(this.agendaId);
          // this.router.navigate(['main/internal/excu/ec/arplmatter']);
        } else {
          this.getDetails(this.agendaId);
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    } else {

    }
  }
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

  getData(id: any) {
    this.ecStatus = this.totalAgendaList[id].ecStatus.statusName;
    console.log(this.ecStatus);
    this.getDetails(this.totalAgendaList[id].agendaId);
  }

  next() {
    if (this.rowId !== this.totLength) {
      ++this.rowId;
      console.log(this.rowId);
      this.getData(this.rowId);
    }
  }
  previous() {
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      this.getData(this.rowId);
    }
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
        if (sessionStorage.getItem('selectedRole-usec') === 'Secretary') {
          this.router.navigate(['main/internal/excu/secretary/secARPL']);
        } else {
          this.router.navigate(['main/internal/excu/ec/arplmatter']);
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }

  decideNext() {
    // DecideAgenda
    console.log(this.AgendaForm.value);
    this.submitted = true;
    this.save();
    this.next();

    // if (this.AgendaForm.valid) {
    //   const obj = {
    //     agendaId: this.agendaId,
    //     agendaItemDiscussion: this.AgendaForm.value.discussion,
    //     agendaItemDecision: this.AgendaForm.value.decision !== '' ? (this.AgendaForm.value.decision)
    //       : this.agendaDetails.agendaItemDecision
    //   };
    //   console.log(obj);
    //   this.ecservice.DecideAgenda(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
    //     console.log(data);
    //     this.submitted = false;
    //     this.toaster.success('Agenda Saved Successfully', 'Success', {
    //       timeOut: 2000
    //     });
    //     if (this.rowId === (this.totLength - 1)) {
    //       this.next();
    //     } else {
    //       this.toaster.warning('You Differed Last Agenda', 'Warning', {
    //         timeOut: 2000
    //       });
    //     }
    //   }, error => {
    //     console.log(error);
    //     this.helper.errorMessage(error);
    //   });
    // }
  }

  differ() {
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

      this.ecservice.differAgenda(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.submitted = false;
        this.toaster.success('Agenda Updated Successfully', 'Success', {
          timeOut: 2000
        });
        if (this.totLength !== 0) {
          this.next();
        } else {
          if (sessionStorage.getItem('selectedRole-usec') === 'Secretary') {
            this.router.navigate(['main/internal/excu/secretary/secARPL']);
          } else {
            this.router.navigate(['main/internal/excu/ec/arplmatter']);
          }
        }
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


