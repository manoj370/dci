import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';

@Component({
  selector: 'app-voteofthanks',
  templateUrl: './voteofthanks.component.html',
  styleUrls: ['./voteofthanks.component.css']
})
export class VoteofthanksComponent implements OnInit, OnDestroy {
  // model: any = {};
  submitted = false;
  btnDisable = false;
  commentsForm: FormGroup;
  upcomingMeeting: any;
  buttonName: any;
  subscribe: Subject<any> = new Subject<any>();

  constructor(public ecservice: ExcutiveService, public helper: HelperService, public fb: FormBuilder, public toaster: ToastrService) { }

  ngOnInit(): void {
    this.getAll();
    // upcomingMeeting.momStatus === 'SECTRETARYREVIEW' || upcomingMeeting.momStatus === 'SENTTOSECTRETARYREVIEW'
    this.commentsForm = this.fb.group({
      comments: ['', Validators.required]
    });

  }
  get f() { return this.commentsForm.controls; }
  getAll() {
    // Get upcoming Meeting Id Data
    const meeting = JSON.parse(sessionStorage.getItem('Meeting'));
    this.ecservice.meetingDetails(meeting.meetingId).pipe(takeUntil(this.subscribe)).subscribe((upcomingMeetings: any) => {
      console.log(upcomingMeetings);
      this.upcomingMeeting = upcomingMeetings;
      this.commentsForm.get('comments').patchValue(upcomingMeetings.voteOfThanksNotes);
      if ((sessionStorage.getItem('selectedRole-usec') === 'Secretary') && (this.upcomingMeeting.momStatus === 'SENTTOSECTRETARYREVIEW')) {
        this.buttonName = 'Send To President';
        this.btnDisable = true;
      } else if ((sessionStorage.getItem('selectedRole-usec') === 'President')
        && (this.upcomingMeeting.momStatus === 'PRESIDENTAUTHENTICATION')) {
        this.buttonName = 'Authenticate Minutes';
        this.btnDisable = true;

      } else if (sessionStorage.getItem('selectedRole-usec')==='Executive Committee' && this.upcomingMeeting.momStatus === null) {
        this.btnDisable = true;
        this.buttonName = 'Submit';
      }

    }, error => {
      this.helper.errorMessage(error);
    });
  }
  commented() {
    this.submitted = true;
    if (this.commentsForm.valid) {
      const meetingId = JSON.parse(sessionStorage.getItem('Meeting'));
      const obj = {
        meetingId: meetingId.meetingId,
        meetingDate: meetingId.meetingDate,
        voteOfThanksNotes: this.commentsForm.value.comments
      };
      if (sessionStorage.getItem('selectedRole-usec') === 'Executive Committee') {
        obj['noteAndRecordApologies'] = null;
        obj['actionTakenDescription'] = null;
      }

      this.ecservice.voteOfThanks(obj).pipe(takeUntil(this.subscribe)).subscribe((updated: any) => {
        console.log(updated);
        this.submitted = false;
        this.getAll();
        this.btnDisable = false;
        this.toaster.success('Vote Of Thanks Commented Successfully', 'Success', {
          timeOut: 2000
        });
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
