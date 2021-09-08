import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';


@Component({
  selector: 'app-confirminutes',
  templateUrl: './confirminutes.component.html',
  styleUrls: ['./confirminutes.component.css']
})
export class ConfirminutesComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageId = 10;
  pageCount: any;
  itemNumber = '';
  upcomingMeeting: any;
  previousMeeting: any;
  agendaForm: FormGroup;
  submitted = false;
  viewdiv = false;
  previousMeetingDetails: any;
  confirmMetingDetails: any = [];
  subscribe: Subject<any> = new Subject<any>();

  constructor(public ecservice: ExcutiveService, public helper: HelperService,
    public fb: FormBuilder, public toaster: ToastrService) { }

  ngOnInit(): void {
    const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
    this.ecservice.basedAgendaList(meetingId, 2, this.rowId, this.pageId)
    .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      if (data.length !== 0) {
        this.confirmMetingDetails = data;
        this.pageCount = Math.ceil(this.confirmMetingDetails[0].totalCount / this.pageId);
      } else {
        this.confirmMetingDetails = [];
        this.pageCount = 0;
      }
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });




    this.agendaForm = this.fb.group({
      subject: ['', Validators.required],
      matters: ['', Validators.required],
      discussions: ['', Validators.required],
      decision: ['', Validators.required],
    });
    // console.log(JSON.parse(sessionStorage.getItem('ecMeeting'))['meetingId']);

   
    // Get upcoming Meeting Id Data
    // this.ecservice.upcomingMeetings().pipe(takeUntil(this.subscribe)).subscribe((upcomingMeetings: any) => {
    //   console.log(upcomingMeetings);
    //   this.upcomingMeeting = upcomingMeetings;
    // }, error => {
    //   this.helper.errorMessage(error);
    // });
 
  }
  get f() { return this.agendaForm.controls; }

  viewData() {
    if (this.itemNumber !== '') {
      this.viewdiv = true;
      this.ecservice.getAgendaItem(this.itemNumber, this.previousMeeting.meetingId)
        .pipe(takeUntil(this.subscribe)).subscribe((agendaDetails: any) => {
          console.log(agendaDetails);
          this.agendaForm.get('matters').patchValue(agendaDetails.agendaItemMatter);
          this.agendaForm.get('subject').patchValue(agendaDetails.agendaItemSubject);
          this.agendaForm.get('decision').patchValue(agendaDetails.agendaItemDecision);
          this.agendaForm.get('discussions').patchValue(agendaDetails.agendaItemDiscussion);
          this.previousMeetingDetails = agendaDetails;
        }, error => {
          this.helper.errorMessage(error);
        });
    }
  }
  updateAgenda() {
    this.submitted = true;
    console.log(this.itemNumber);
    this.agendaForm.reset();
    // if (this.itemNumber !== '') {
    //   if (this.agendaForm.valid) {
    //     const obj = {
    //       agendaId: this.previousMeetingDetails.agendaId,
    //       agendaItemDiscussion: this.agendaForm.value.discussions,
    //       agendaItemDecision: this.agendaForm.value.decision,
    //     };
    //     console.log(obj);
    //     this.ecservice.updateAgenda(obj)
    //       .pipe(takeUntil(this.subscribe)).subscribe((updateDetails: any) => {
    //         console.log(updateDetails);
    //         this.agendaForm.reset();
    //         this.agendaForm.get('decision').patchValue('');
    //         this.submitted = false;
    //         this.toaster.success('Agenda Updated Successfully', 'Success', {
    //           timeOut: 2000
    //         });
    //       }, error => {
    //         this.helper.errorMessage(error);
    //       });
    //   }
    // } else {
    //   this.toaster.warning('Please Enter Item Number', 'Warning', {
    //     timeOut: 2000
    //   });
    // }
  }

  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
