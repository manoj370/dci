import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { appConstants } from 'src/app/common-service/const.model';

@Component({
  selector: 'app-arplmatterview',
  templateUrl: './arplmatterview.component.html',
  styleUrls: ['./arplmatterview.component.css'],

})
export class ArplmatterviewComponent implements OnInit, OnDestroy, AfterViewInit {
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
  userName: string;

  constructor(public ecservice: ExcutiveService, public fb: FormBuilder, public helper: HelperService, public appConst: appConstants,
    public econst: ECconstantServices, public route: ActivatedRoute, public toaster: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('selectedRole-usec');
    this.route.params.subscribe(params => {
      this.agendaId = +params.id;
      this.ecStatus = params.status;
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
        this.navigatePages();
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
          this.navigatePages();
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }
  navigatePages() {
    const pathName = this.route.snapshot.params.previous;
    console.log(pathName);
    if (this.userName !== 'Executive Committee') {
      switch (pathName) {
        case 'ARPL':
          this.router.navigate(['main/internal/excu/secretary/secARPL']);
          break;
        case 'Confirm':
          this.router.navigate(['main/internal/excu/secretary/secConfirm']);
          break;
        case 'Policy':
          this.router.navigate(['main/internal/excu/secretary/secPolicy']);
          break;
        case 'Academic':
          this.router.navigate(['main/internal/excu/secretary/secAcademic']);
          break;
        case 'Administration':
          this.router.navigate(['main/internal/excu/secretary/secAdminstration']);
          break;
        case 'AOB':
          this.router.navigate(['main/internal/excu/secretary/secAOB']);
          break;
        case 'Account':
          this.router.navigate(['main/internal/excu/secretary/secAFC']);
          break;
        case 'Legal':
          this.router.navigate(['main/internal/excu/secretary/secLegal']);
          break;
        case 'Inspection':
          this.router.navigate(['main/internal/excu/secretary/secInspection']);
          break;
        case 'Supplementary':
          this.router.navigate(['main/internal/excu/secretary/secSupplementary']);
          break;

        default:
          break;
      }
    } else {
      switch (pathName) {
        case 'ARPL':
          this.router.navigate(['main/internal/excu/ec/arplmatter']);
          break;
        case 'Confirm':
          this.router.navigate(['main/internal/excu/ec/confirminutes']);
          break;
        case 'Policy':
          this.router.navigate(['main/internal/excu/ec/policymatter']);
          break;
        case 'Academic':
          this.router.navigate(['main/internal/excu/ec/academicmatter']);
          break;
        case 'Administration':
          this.router.navigate(['main/internal/excu/ec/administrationmatter']);
          break;
        case 'AOB':
          this.router.navigate(['main/internal/excu/ec/anyotherbusiness']);
          break;
        case 'Account':
          this.router.navigate(['main/internal/excu/ec/accfinancematter']);
          break;
        case 'Legal':
          this.router.navigate(['main/internal/excu/ec/legalpublicmatter']);
          break;
        case 'Inspection':
          this.router.navigate(['main/internal/excu/ec/inspectionmatter']);
          break;
        case 'Supplementary':
          this.router.navigate(['main/internal/excu/ec/supplementary']);
          break;
        case 'Search':
          this.router.navigate(['main/internal/excu/ec/Search']);
          break;
        default:
          break;
      }
    }
  }
  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}

