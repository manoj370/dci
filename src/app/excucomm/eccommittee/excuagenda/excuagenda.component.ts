import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { element } from 'protractor';
import { encryptionService } from 'src/app/common-service/cedService';
import { appConstants } from 'src/app/common-service/const.model';


@Component({
  selector: 'app-excuagenda',
  templateUrl: './excuagenda.component.html',
  styleUrls: ['./excuagenda.component.css']
})
export class ExcuagendaComponent implements OnInit, OnDestroy {
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
  viewmeetingDate: any;
  userIdValue: any;
  accesToken: string;
  downloadInfo: any;

  constructor(public ecservice: ExcutiveService,public ced: encryptionService, public helper: HelperService, public toaster: ToastrService,
    public econst: ECconstantServices, public fb: FormBuilder,public appConst:appConstants) { }

  ngOnInit(): void {
    this.tableHeaders = this.econst.agendaTableHeader;
    this.userIdValue =JSON.parse(sessionStorage.getItem('userInfo-usec')).userId;
    this.accesToken = this.ced.decryptingProcess('access-token');
    console.log(this.accesToken);
    // this.UpcomingMeeting();
    this.agendaForm = this.fb.group({
      meetingSubject: ['', Validators.required],
      meetingMatter: ['', Validators.required],
      meetingDiscussion: [''],
      meetingDecision: ['']
    });
  }
  get f() { return this.agendaForm.controls; }
  UpcomingMeeting() {
    // Get Section List Data meetingDates 
    this.ecservice.getAgendaSectionList().pipe(takeUntil(this.subscribe)).subscribe((sectionList: any) => {
      console.log(sectionList);
      this.sectionList = sectionList;
      this.helper.sortedData(this.sectionList, 'agendaSectionName');
    }, error => {
      this.helper.errorMessage(error);
    });
  }

  agendaList() {
    this.sectionId = '';
    this.ecservice.AllMeetingHistory(this.newDateValue)
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
  getAgendaList(data: any) {
    console.log(data);
    if (data.meetingId) {
      this.downloadInfo=data;
      this.viewmeetingDate = data.meetingDate;
      console.log(this.sectionId);
      // const d = new Date(data.meetingDate);
      // data.meetingDate = d.setDate(d.getDate() - 1);
      console.log(data.meetingDate);
      this.meetingId = data.meetingId;
      const index = this.agendaListData.map((e) => { return e.meetingId; }).indexOf(data.meetingId);
      this.meetingData = this.agendaListData[index];
    } else {
      this.meetingId = data;
    }
    this.ecservice.meetingDates(this.meetingId).pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
      console.log(list);
      this.meetingDatesList = list;
      // list.forEach(element => {
      //   const d = new Date(element.meetingDate);
      //   element.meetingDate = d.setDate(d.getDate() - 1);
      // });
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
          this.agendaForm.get('meetingDecision').patchValue(atob(agendaDetails.agendaItemDecision));
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
        agendaId: this.agendaDetails !== undefined ? (this.agendaDetails.agendaId) : null,
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
    this.newDateValue ='';
  }

  // Unsubscribe The API
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }


}
