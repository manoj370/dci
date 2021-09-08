import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { appConstants } from 'src/app/common-service/const.model';

@Component({
  selector: 'app-secDashboard',
  templateUrl: './secDashboard.component.html',
  styleUrls: ['./secDashboard.component.scss']
})
export class SecDashboardComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageId = 10;
  pageCount: any;
  dateValue = '';
  newDateValue = '';
  sectionId = '';
  agendaId: any;
  sectionList: any;
  selectedDate = '';
  tableHeaders = [];
  meetingDatesList: any = [];
  agendaListData: any = [];
  agendaListValue: any = [];
  subList: any = [];
  meetingId: any;
  upcomingMeeting: any;
  viewToggle = false;
  showTable = false;
  itemNumber = '';
  submitted = false;
  agendaForm: FormGroup;
  meetingData: any;
  agendaDetails: any;
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;

  constructor(public ecservice: ExcutiveService, public helper: HelperService, public toaster: ToastrService,
    public econst: ECconstantServices, public fb: FormBuilder, public appConst: appConstants) { }

  ngOnInit(): void {
    this.agendaList();
    this.tableHeaders = this.econst.agendaTableHeader;
    // this.UpcomingMeeting();
    this.agendaForm = this.fb.group({
      meetingSubject: ['', Validators.required],
      meetingMatter: ['', Validators.required],
      meetingDiscussion: ['', Validators.required],
      meetingDecision: ['', Validators.required]
    });
  }
  get f() { return this.agendaForm.controls; }
  UpcomingMeeting() {
    // Get Section List Data meetingDates 
    this.ecservice.getAgendaSectionList().pipe(takeUntil(this.subscribe)).subscribe((sectionList: any) => {
      console.log(sectionList);
      this.sectionList = sectionList;
    }, error => {
      this.helper.errorMessage(error);
    });
  }

  agendaList() {
    this.sectionId = '';
    this.ecservice.getListReview(this.newDateValue)
      .pipe(takeUntil(this.subscribe)).subscribe((agendaList: any) => {
        console.log(agendaList);
        if (agendaList.length !== 0) {
          this.showTable = false;
          this.agendaListData = agendaList;
          this.pageCount = Math.ceil(this.agendaListData[0].totalCount / this.pageId);
        } else {
          this.agendaListData = [];
          this.pageCount = 0;
        }
      }, error => {
        this.helper.errorMessage(error);
      });
  }
  view(data) {
    console.log(data);
    this.itemNumber = data;
    this.viewToggle = !this.viewToggle;
    this.agendaListValue.forEach(element => {
      if (data === element.aegndaSectionId) {
        this.subList = element.ecAgendaList;
      }
    });
    console.log(this.subList);
  }
  getAgendaList(id: any) {
    if (typeof (id) === 'object') {
      sessionStorage.setItem('Meeting', JSON.stringify(id));
      this.toaster.success('Conduct Meeting/Edit MOM Successfully', 'Success', {
        timeOut: 2000
      });
      id = id.meetingId;
    };
    this.meetingId = id;
    const index = this.agendaListData.map((e) => { return e.meetingId; }).indexOf(id);
    this.meetingData = this.agendaListData[index];
    this.ecservice.meetingDates(this.meetingId).pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
      console.log(list);
      this.meetingDatesList = list;
    }, error => {
      this.helper.errorMessage(error);
    });

    this.ecservice.getAllAgendaList(this.meetingId, this.sectionId)
      .pipe(takeUntil(this.subscribe)).subscribe((agendaList: any) => {
        console.log(agendaList);
        this.UpcomingMeeting();
        if (agendaList.length !== 0) {
          this.showTable = true;
          this.agendaListValue = agendaList;
        } else {
          this.agendaListValue = [];
        }
      }, error => {
        this.helper.errorMessage(error);
      });
  }
  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      this.agendaList();
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.agendaList();
    }
  }
  // Finalize Meeting
  finalize(data: any) {
    // if (data === 'finalize') {
    this.ecservice.finalizeMeeting(data, this.meetingId)
      .pipe(takeUntil(this.subscribe)).subscribe((finalization: any) => {
        console.log(finalization);
        this.agendaList();
        this.toaster.success('Finalized Successfully', 'Success', {
          timeOut: 2000
        });
      }, error => {
        this.helper.errorMessage(error);
      });
    // }
  }
  viewData() {
    if (this.itemNumber !== '') {
      this.ecservice.getAgendaItem(this.itemNumber, this.selectedDate)
        .pipe(takeUntil(this.subscribe)).subscribe((agendaDetails: any) => {
          console.log(agendaDetails);
          this.agendaDetails = agendaDetails;
          this.agendaForm.get('meetingMatter').patchValue(agendaDetails.agendaItemMatter);
          this.agendaForm.get('meetingSubject').patchValue(agendaDetails.agendaItemSubject);
          this.agendaForm.get('meetingDecision').patchValue(agendaDetails.agendaItemDecision);
          this.agendaForm.get('meetingDiscussion').patchValue(agendaDetails.agendaItemDiscussion);
        }, error => {
          this.itemNumber = null;
          this.helper.errorMessage(error);
        });
    }
  }
  createAgenda() {

    this.submitted = true;
    if (this.agendaForm.valid) {
      console.log(this.agendaForm.valid);
      const obj = {
        agendaId: this.itemNumber !== null ? (this.agendaDetails.agendaId) : null,
        agendaItemSubject: this.agendaForm.value.meetingSubject,
        agendaItemMatter: this.agendaForm.value.meetingMatter,
        agendaItemDiscussion: this.agendaForm.value.meetingDiscussion,
        agendaItemDecision: this.agendaForm.value.meetingDecision,
        user: {
          userId: JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
        }
      };
      console.log(obj);
      this.ecservice.confirmAgenda(obj)
        .pipe(takeUntil(this.subscribe)).subscribe((finalization: any) => {
          console.log(finalization);
          this.clearValidations();
          this.closeBtn.nativeElement.click();
          this.agendaListValue = [];
          this.toaster.success('Agenda Created', 'Success', {
            timeOut: 2000
          });
        }, error => {
          this.helper.errorMessage(error);
        });
    }
  }
  clearValidations() {
    this.agendaForm.reset();
    this.itemNumber = '';
    this.selectedDate = '';
  }

  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }


}
