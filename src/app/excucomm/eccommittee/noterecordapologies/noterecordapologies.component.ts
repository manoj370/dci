import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-noterecordapologies',
  templateUrl: './noterecordapologies.component.html',
  styleUrls: ['./noterecordapologies.component.css']
})
export class NoterecordapologiesComponent implements OnInit, OnDestroy {
  // model: any = {};
  upcomingMeeting: any;
  // comments: any;
  submitted = false;
  commentsForm: FormGroup;
  subscribe: Subject<any> = new Subject<any>();

  constructor(public ecservice: ExcutiveService, public helper: HelperService, public fb: FormBuilder, public toaster: ToastrService) { }

  ngOnInit(): void {
    this.commentsForm = this.fb.group({
      comments: ['', Validators.required]
    });
    this.getMeetingData();
  }
  getMeetingData() {
    //  Get upcoming Meeting Id Data 
    const meeting = JSON.parse(sessionStorage.getItem('Meeting'))
    this.ecservice.meetingDetails(meeting.meetingId).pipe(takeUntil(this.subscribe)).subscribe((upcomingMeetings: any) => {
      console.log(upcomingMeetings);
      this.upcomingMeeting = upcomingMeetings;
      this.commentsForm.get('comments').patchValue(upcomingMeetings.noteAndRecordApologies);
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  get f() { return this.commentsForm.controls; }

  commented() {
    this.submitted = true;
    if (this.commentsForm.valid) {
      const meeting = JSON.parse(sessionStorage.getItem('Meeting'))
      const obj = {
        meetingId: meeting.meetingId,
        meetingDate: meeting.meetingDate,
        noteAndRecordApologies: this.commentsForm.value.comments,
        actionTakenDescription: null,
        voteOfThanksNotes: null
      };
      this.ecservice.updateMeeting(obj).pipe(takeUntil(this.subscribe)).subscribe((updated: any) => {
        console.log(updated);
        this.submitted = false;
        this.commentsForm.reset();
        this.getMeetingData();
        this.toaster.success('Apology Commented Successfully', 'Success', {
          timeOut: 2000
        });
        // this.getMeetingData();d
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
