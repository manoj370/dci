import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';

@Component({
  selector: 'app-actiontaken',
  templateUrl: './actiontaken.component.html',
  styleUrls: ['./actiontaken.component.css']
})
export class ActiontakenComponent implements OnInit, OnDestroy {
  // model: any = {};
  submitted = false;
  commentsForm: FormGroup;
  previousMeetings: any;
  upcomingMeeting: any;
  // comments: any;
  subscribe: Subject<any> = new Subject<any>();

  constructor(public ecservice: ExcutiveService, public helper: HelperService, public fb: FormBuilder, public toaster: ToastrService) { }


  ngOnInit(): void {
    this.commentsForm = this.fb.group({
      comments: ['', Validators.required]
    });
    this.meetingUpdated();
  }
  get f() { return this.commentsForm.controls; }
  meetingUpdated() {
    // Get upcoming Meeting Id Data
    const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
    this.ecservice.meetingDetails(meetingId).pipe(takeUntil(this.subscribe)).subscribe((upcomingMeetings: any) => {
      console.log(upcomingMeetings);
      this.upcomingMeeting = upcomingMeetings;
      this.commentsForm.get('comments').patchValue(upcomingMeetings.noteAndRecordApologies);
    }, error => {
      this.helper.errorMessage(error);
    });
    // Get upcoming Meeting Id Data
    this.ecservice.previousMeetings(meetingId).pipe(takeUntil(this.subscribe)).subscribe((previousMeetings: any) => {
      console.log(previousMeetings);
      this.previousMeetings = previousMeetings;
      this.commentsForm.get('comments').patchValue(previousMeetings.actionTakenDescription);
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  commented() {
    this.submitted = true;
    if (this.commentsForm.valid) {
      const obj = {
        meetingId: this.previousMeetings.meetingId,
        meetingDate: this.previousMeetings.meetingDate,
        noteAndRecordApologies: null,
        actionTakenDescription: this.commentsForm.value.comments,
        voteOfThanksNotes: null
      };
      this.ecservice.updateMeeting(obj).pipe(takeUntil(this.subscribe)).subscribe((updated: any) => {
        console.log(updated);
        this.commentsForm.reset();
        this.submitted = false;
        this.toaster.success('Commented Successfully', 'Success', {
          timeOut: 2000
        });
        this.meetingUpdated();
      }, error => {
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