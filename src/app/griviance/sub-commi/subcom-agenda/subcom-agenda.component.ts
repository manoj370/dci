
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { urlServices } from '../../models/url.models';
import { appConstants } from 'src/app/common-service/const.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { SubcomServiceService } from '../../services/subCom/subcom-service.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-subcom-agenda',
  templateUrl: './subcom-agenda.component.html',
  styleUrls: ['./subcom-agenda.component.css']
})
export class SubcomAgendaComponent implements OnInit, OnDestroy {
  complaintviewDta: any;
  recomForm: FormGroup;
  agendaData: any;
  errorMsgs: any;
  downloadUrl: string;
  statusComp: string;
  submitted = false;
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;

  constructor(public router: Router, public fb: FormBuilder, public toastr: ToastrService, public constValues: appConstants,
    public subcomplaint: SubcomServiceService, public route: ActivatedRoute, public url: urlServices,
    public helper: HelperService) {
 
  }

  ngOnInit(): void {
    this.getCall(); // forward form Controls
    this.errorMsgs = this.constValues.errorMsgs; // Form Error Messsges
    this.recomForm = this.fb.group({
      recom: ['', Validators.required]
    });
  }
  get f() { return this.recomForm.controls; } // forward form Controls
  // Get Complainint Details
  getCall() {
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.statusComp= params.status;
      this.subcomplaint.getCompliantDetails(id).pipe(takeUntil(this.subscribe)).subscribe((detailsdata: any) => {
        console.log(detailsdata);
        this.complaintviewDta = detailsdata;
        this.complaintviewDta.workflowDocuments.forEach(element => {
          const nameString = element.documentLocation;
          if (nameString !== null) {
            const filename = nameString.split('/').pop();
            console.log(filename);
            element.documentLocation = filename;
          }
        });
        detailsdata.commentSections.forEach(element => {
          if (element.sectionAt === 'EXECUTIVECOMMITTEE') {
            element.comments = atob(element.comments).replace(/<[^>]*>/g, '');
          }
          if ((element.sectionAt === 'SECTIONEXECUTIVE') || (element.sectionAt === 'SUBCOMMITTEE')) {
            this.agendaData = element.ecAgendaDTO;
            console.log(this.agendaData)
          }
        });
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    });
  }
  // Forward to Excutive Commitee
  forwardExc() {
    this.submitted = true;
    console.log(this.recomForm.value);
    if (this.recomForm.valid) {
      const obj = {
        // assignedUserId: 6,
        complaint: {
          cgrComplaintId: this.complaintviewDta.cgrComplaintId
        },
        // assignedToUserId: 7,
        assigneeComments: this.recomForm.value.recom
      };
      console.log(obj);
      this.subcomplaint.subCommitDecision(obj).pipe(takeUntil(this.subscribe)).subscribe((forwardData: any) => {
        console.log(forwardData);
        this.recomForm.reset();
        this.getCall();
        this.toastr.success('Decision Forwarded successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['main/internal/greviance/subCom/dashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }

  // Download File
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  // Clear Validations
  clearValidation() {
    this.closeBtn.nativeElement.click();
    this.submitted = false;
    this.recomForm.reset();
  }

  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
