import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { urlServices } from '../../models/url.models';
import { ActivatedRoute, Router } from '@angular/router';
import { constantServices } from '../../models/const.model';
import { appConstants } from 'src/app/common-service/const.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { SecHeadService } from './../../services/sectionHead/secHead.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-sechead-complai',
  templateUrl: './sechead-complai.component.html',
  styleUrls: ['./sechead-complai.component.css']
})
export class SecheadComplaiComponent implements OnInit, OnDestroy {
  paramsId: any;
  assignForm: FormGroup;
  complaintviewDta: any;
  asiignRoles: any;
  assignPerson: any = [];
  rolesList: any;
  errorMsgs: any;
  commentSec: any = [];
  downloadUrl: string;
  reappealComments: any;
  statusComp='';
  formErrors: any;
  submitted = false;
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  constructor(public fb: FormBuilder, public toastr: ToastrService, public constValues: appConstants, public helper: HelperService,
    public secservice: SecHeadService, public route: ActivatedRoute, public url: urlServices,
    public router: Router, public scconst: constantServices) { }

  ngOnInit(): void {
    this.formErrors = this.scconst.ShassignPopup;
    this.errorMsgs = this.constValues.errorMsgs; // Form Fields Errors

    this.getCall();

    // Assign Form
    this.assignForm = this.fb.group({
      asiignRole: ['', Validators.required],
      assignPerson: ['', Validators.required],
      assignComment: ['', Validators.required]
    });
  }
  get f() { return this.assignForm.controls; } // Form Controls


  // Get Complaint Details
  getCall() {
    this.route.params.subscribe(params => {
      this.paramsId = +params.id;
      this.statusComp = params.status;
      console.log(this.statusComp);
      console.log(this.paramsId);
      this.secservice.getCompliantDetails(this.paramsId).pipe(takeUntil(this.subscribe)).subscribe((detailsdata: any) => {
        console.log(detailsdata);
        this.complaintviewDta = detailsdata;
        this.complaintviewDta.commentSections.forEach(element => {
          if (element.sectionAt === 'EXECUTIVECOMMITTEE') {
            element.comments = atob(element.comments).replace(/<[^>]*>/g, '');
          }
        });
        if (this.complaintviewDta.workflowDocuments !== null) {
          this.complaintviewDta.workflowDocuments.forEach(element => {
            const nameString = element.documentLocation;
            if (nameString !== null) {
              const filename = nameString.split('/').pop();
              console.log(filename);
              element.documentLocation = filename;
            }
          });
        }
      }, error => {
        this.helper.errorMessage(error);
      });
      this.secservice.getRoles().pipe(takeUntil(this.subscribe)).subscribe((rolesList: any) => {
        console.log(rolesList);
        this.asiignRoles = rolesList;
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    });
  }

  // User List
  selectedRole(value: any) {
    console.log(value);
    this.secservice.getUsersList(value).pipe(takeUntil(this.subscribe)).subscribe((usersList: any) => {
      console.log(usersList);
      this.assignPerson = usersList;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // Assign To ROle
  assign() {
    this.submitted = true;
    console.log(this.assignForm.value);
    if (this.assignForm.valid) {
      const obj = {
        assignedToUserId: this.assignForm.value.assignPerson,
        assignedUserId: this.assignForm.value.asiignRole,
        complaint: {
          cgrComplaintId: this.paramsId
        },
        assigneeComments: this.assignForm.value.assignComment
      };
      this.secservice.assignCompl(obj).pipe(takeUntil(this.subscribe)).subscribe((sendData: any) => {
        console.log(sendData);
        this.closeBtn.nativeElement.click();
        this.resetControls();
        this.getCall();
        this.toastr.success('Complaint Assigned successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['/main/internal/greviance/secHead/dashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
        this.assignForm.reset();
        this.resetControls();
      });
    }
  }

  acceptReappeal(data: any) {
    if (data === 'Accept') {
      const obj = {
        workflowId: this.complaintviewDta.commentSections[0].workflowId,
        justification: true,
        justifyComments: this.reappealComments
      };
      this.secservice.reappeal(obj).pipe(takeUntil(this.subscribe)).subscribe((Data: any) => {
        console.log(Data);
        this.resetControls();
        this.getCall();
        this.toastr.success('Complaint Accepted successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['/main/internal/greviance/secHead/dashboard']);

      }, error => {
        console.log(error);
        this.resetControls();
        this.helper.errorMessage(error);
      });
    } else {
      const obj = {
        workflowId: this.complaintviewDta.commentSections[0].workflowId,
        justification: false,
        justifyComments: this.reappealComments
      };
      this.secservice.reappeal(obj).pipe(takeUntil(this.subscribe)).subscribe((Data: any) => {
        console.log(Data);
        this.resetControls();
        this.getCall();
        this.router.navigate(['/main/internal/greviance/secHead/dashboard']);
        this.toastr.warning('Complaint Rejected successfully', 'Success', {
          timeOut: 2000
        });
      }, error => {
        console.log(error);
        this.resetControls();
        this.helper.errorMessage(error);
      });
    }
  }
  // Download File
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  // Reset Form Controls
  resetControls() {
    this.submitted = false;
    this.closeBtn.nativeElement.click();

    this.assignForm.reset();
    this.assignForm.controls.asiignRole.setValue('', { onlySelf: true });
    this.assignForm.controls.assignPerson.setValue('', { onlySelf: true });
  }

  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
