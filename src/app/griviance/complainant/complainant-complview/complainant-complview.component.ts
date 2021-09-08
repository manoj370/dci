import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { urlServices } from '../../models/url.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { ComplaintService } from '../../services/complaint/complaint.service';

@Component({
  selector: 'app-complainant-complview',
  templateUrl: './complainant-complview.component.html',
  styleUrls: ['./complainant-complview.component.css']
})
export class ComplainantComplviewComponent implements OnInit, OnDestroy {
  id: number;
  downloadUrl: any;
  complaintviewDta: any;
  accpetForm: FormGroup;
  subscribe: Subject<any> = new Subject<any>();

  constructor(public route: ActivatedRoute, public toastr: ToastrService, public router: Router, public helper: HelperService,
    public fb: FormBuilder, public compService: ComplaintService, public url: urlServices) { }

  ngOnInit(): void {
    this.getComplDetails(); // Get Complaint Details
    this.accpetForm = this.fb.group({
      complaintComments: ['', Validators.required]
    });
  }

  // Download
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  // Get Complaint Details
  getComplDetails() {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.compService.viewComplaint(this.id)
        .pipe(takeUntil(this.subscribe))
        .subscribe((complainData: any) => {
          this.complaintviewDta = complainData;
          console.log(this.complaintviewDta.workflowDocuments);
          if(this.complaintviewDta.commentSections !== null){
          this.complaintviewDta.commentSections.forEach(element => {
            if (element.sectionAt === 'EXECUTIVECOMMITTEE') {
              element.comments = atob(element.comments).replace(/<[^>]*>/g, '');
            }
          });
        }
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
          // console.log(this.complaintviewDta.workflowDocuments);
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
      // console.log(this.id);
    });
  }
  // Reappeal Complianint
  reappealComp() {
    const obj = {
      complaintid: this.id,
      comments: this.accpetForm.value.complaintComments
    };
    this.compService.reappeal(obj).pipe(takeUntil(this.subscribe)).subscribe((reappealdata: any) => {
      console.log(reappealdata);
      this.accpetForm.reset();
      this.getComplDetails();
      this.router.navigate(['/main/internal/greviance/complaint/dashboard']);
      this.toastr.success('Appeal Successfully', 'Success', {
        timeOut: 2000
      });
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}
