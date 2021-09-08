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
  selector: 'app-secAgendaView',
  templateUrl: './secAgendaView.component.html',
  styleUrls: ['./secAgendaView.component.scss']
})
export class SecAgendaViewComponent implements OnInit, OnDestroy {
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

  get f() { return this.AgendaForm.controls; }
  getList() {
    const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
    this.ecservice.getAgendaListByMeetings(meetingId, parseInt(this.ecStatus)).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.totalAgendaList = data;
      this.totLength = data.length;
      this.rowId = this.totalAgendaList.map((e) => { return e.agendaId; }).indexOf(this.agendaId);
      console.log(this.rowId);
      if (this.rowId === -1) {
        this.toaster.warning('Agenda Not Found', 'Warning', {
          timeOut: 2000
        });
        this.router.navigate(['main/internal/excu/arplmatter']);
      } else {
        this.getDetails(this.agendaId);
      }
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // Get Agenda Details
  getDetails(id: any) {
    this.ecservice.getAgenda(id).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.agendaDetails = data;
      if (this.agendaDetails.agendaItemDecision !== null) {
        this.agendaDetails.agendaItemDecision = (atob(this.agendaDetails.agendaItemDecision)).replace(/<[^>]*>/g, '');
      }
      this.AgendaForm.get('discussion').patchValue(this.agendaDetails.agendaItemDiscussion);
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
        this.router.navigate(['main/internal/excu/arplmatter']);
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
          this.router.navigate(['main/internal/excu/arplmatter']);
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

