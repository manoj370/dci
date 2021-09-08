import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { urlServices } from '../../models/url.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appConstants } from './../../../common-service/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { SecexcuService } from '../../services/sectionExcutive/secexcu.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { constantServices } from '../../models/const.model';

@Component({
  selector: 'app-secexcu-complview',
  templateUrl: './secexcu-complview.component.html',
  styleUrls: ['./secexcu-complview.component.css']
})
export class SecexcuComplviewComponent implements OnInit, OnDestroy {
  paramsId: number;
  userData: any;
  masterId: any;
  errorMsgs: any;
  files: any = [];
  statusComp = '';
  sdcList: any = [];
  agendaData: any = [];
  downloadUrl: string;
  submitted = false;
  makesAgendaError: any;
  complaintviewDta: any;
  forwardsdcForm: FormGroup;
  previlizesList: any = [];
  finalResponseForm: FormGroup;
  forwardcollegeForm: FormGroup;
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('sdcInput') sdcVariable: ElementRef;
  @ViewChild('myInput') myInputVariable: ElementRef;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;

  constructor(public fb: FormBuilder, public toastr: ToastrService, public router: Router, public constValues: appConstants,
    public secexcService: SecexcuService, public route: ActivatedRoute, public url: urlServices, public helper: HelperService, public ecConst: constantServices) {
  }

  ngOnInit(): void {
    this.getCall();
    this.makesAgendaError = this.ecConst.semakeAgenda;
    this.errorMsgs = this.constValues.errorMsgs;
    this.userData = JSON.parse(sessionStorage.getItem('userInfo-usec')).defaultRole;
    this.userData.authorities.forEach(privi => {
      this.previlizesList.push(privi.authorityName);
    });
    // forward Form
    this.forwardsdcForm = this.fb.group({
      sdcDes: ['', Validators.required],
      sdcFile: ['']
    });
    // Final Response Form 
    this.finalResponseForm = this.fb.group({
      commenst: ['', Validators.required]
    });

    // Forwarde College Form
    this.forwardcollegeForm = this.fb.group({
      colleageDes: ['', Validators.required]
    });
  }
  get g() { return this.finalResponseForm.controls; } // Final Response FOrm Controls
  get h() { return this.forwardsdcForm.controls; } // forwarded Form COntrols
  get i() { return this.forwardcollegeForm.controls; } // Froward College Form Controls

  getCall() {
    // get Compliant Details
    this.route.params.subscribe(params => {
      this.paramsId = +params.id;
      this.statusComp = params.status;

      console.log(this.paramsId);
      this.secexcService.getCompliantDetails(this.paramsId).pipe(takeUntil(this.subscribe)).subscribe((detailsdata: any) => {
        console.log(detailsdata);
        this.complaintviewDta = detailsdata;
        this.complaintviewDta.commentSections.forEach(element => {
          if (element.sectionAt === 'EXECUTIVECOMMITTEE') {
            element.comments = atob(element.comments).replace(/<[^>]*>/g, '');
          }
          this.agendaData.push(element.sectionAt);
        });
        if (this.complaintviewDta.workflowDocuments) {
          this.complaintviewDta.workflowDocuments.forEach(element => {
            const nameString = element.documentLocation;
            if (nameString !== null) {
              const filename = nameString.split('/').pop();
              element.documentLocation = filename;
            }
          });
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    });
    // Get SDC Section List
    this.secexcService.getSDCList().pipe(takeUntil(this.subscribe)).subscribe((sdcList: any) => {
      this.sdcList = sdcList;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

// Get Agenda ItemNumber
  AgendaItemNumber() {     // Get SDC Section List
    this.secexcService.getAgendaItemNumber().pipe(takeUntil(this.subscribe)).subscribe((agenadItem: any) => {
      console.log(agenadItem);
      agenadItem.agendaItemNo = agenadItem.agendaItemNo + '(' + agenadItem.agendaItemSeqRefNumber + ')';
      const obj = {
        agendaDetails: agenadItem,
        moduleName: 'Grievance',
        complaintId: this.paramsId
      };
      this.helper.sendDataToNotificationComponent(obj);
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // Forward To SDC
  forwardSDC() {
    this.submitted = true;
    this.masterId = null;
    console.log(this.forwardsdcForm.value);
    if (this.forwardsdcForm.valid) {
      this.complaintviewDta.commentSections.forEach(element => {
        if (element.sdcMasterDTO !== null) {
          this.masterId = element.sdcMasterDTO.entityMaster.entityMasterId;
        }
      });
      const obj = {
        complaint: {
          cgrComplaintId: this.paramsId
        },
        assignedToEntityId: this.masterId,
        assigneeComments: this.forwardsdcForm.value.sdcDes
      };

      this.secexcService.forwardSDC(obj, this.files).pipe(takeUntil(this.subscribe)).subscribe((forwardsdcData: any) => {
        console.log(forwardsdcData);
        this.clearValidations();
        this.toastr.success('Forwarded to SDC successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['main/internal/greviance/secExc/dashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }
  // Forward College 
  forwardColleage() {
    this.masterId = null;
    this.submitted = true;
    console.log(this.forwardcollegeForm.value);
    if (this.forwardcollegeForm.valid) {
      const obj = {
        complaint: {
          cgrComplaintId: this.paramsId
        },
        assigneeComments: this.forwardcollegeForm.value.colleageDes
      };
      console.log(this.files)
      this.secexcService.forwardColleage(obj, this.files).pipe(takeUntil(this.subscribe)).subscribe((forwardcolleageData: any) => {
        console.log(forwardcolleageData);
        this.clearValidations();
        this.closeBtn.nativeElement.click();
        this.toastr.success('Forwared to Colleage successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['main/internal/greviance/secExc/dashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }


  // File Selection
  onSelectFile(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files;
      this.files.push(filesAmount[0]);
    }
  }

  // Remove Files From List OF Files
  removed(id) {
    console.log(this.files);
    this.files.splice(id, 1);
    console.log(this.files);
  }
  // Final Response Call
  finalRes() {
    console.log(this.finalResponseForm.value);
    if (this.finalResponseForm.valid) {
      const obj = {
        assignedUserId: 3,
        complaint: {
          cgrComplaintId: this.paramsId
        },
        assigneeComments: this.finalResponseForm.value.commenst
      };

      this.secexcService.agendaFinalRespinse(obj).pipe(takeUntil(this.subscribe)).subscribe((final: any) => {
        console.log(final);
        this.clearValidations();
        this.getCall();
        this.toastr.success('Final Response Save and Close Successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['main/internal/greviance/secExc/dashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }
  // Downloded Files 
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  // Reset Validations
  clearValidations() {
    this.files = [];
    this.submitted = false;
    // this.closeBtn.nativeElement.click();
    this.myInputVariable.nativeElement.value = '';
    this.sdcVariable.nativeElement.value = '';
    this.finalResponseForm.reset();
    this.forwardcollegeForm.reset();
    this.forwardsdcForm.reset();
  }

  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
