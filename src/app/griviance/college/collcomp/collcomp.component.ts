import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { urlServices } from '../../models/url.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { CollegeService } from '../../services/college/college.service';

@Component({
  selector: 'app-collcomp',
  templateUrl: './collcomp.component.html',
  styleUrls: ['./collcomp.component.css']
})
export class CollcompComponent implements OnInit, OnDestroy {
  id: number;
  fileaarray = [];
  commentsArray = [];
  downloadUrl: string;
  reappealStatus: any;
  complaintviewDta: any;
  accpetForm: FormGroup;
  submitted = false;
  subscribe: Subject<any> = new Subject<any>();
  constructor(public route: ActivatedRoute, public router: Router, public toastr: ToastrService,
    public fb: FormBuilder, public colService: CollegeService, public url: urlServices, public helper: HelperService) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.reappealStatus = this.router.getCurrentNavigation().extras.state;
    if (this.reappealStatus === undefined) {
      this.router.navigate(['main/internal/greviance/college/dashboard']);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.colService.getComplDetails(this.id)
        .pipe(takeUntil(this.subscribe))
        .subscribe((complainData: any) => {
          console.log(complainData, 'complaintData');
          this.complaintviewDta = complainData;
          this.complaintviewDta.workflowDocuments.forEach(element => {
            const nameString = element.documentLocation;
            if(nameString !==null){
              const filename = nameString.split('/').pop();
              console.log(filename);
              element.documentLocation = filename;
              }
          });
          this.complaintviewDta.commentSections.forEach(element => {
            if(element.sectionAt === 'EXECUTIVECOMMITTEE'){
              element.comments = atob(element.comments).replace(/<[^>]*>/g, '');
            }
            this.commentsArray.push(element.sectionAt);
          });
          console.log(this.commentsArray);
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
      console.log(this.id);
    });

    // Complaints Form
    this.accpetForm = this.fb.group({
      complaintComments: ['', Validators.required]
    });
  }
  get f() { return this.accpetForm.controls; } // Controls For Form

  // Download
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }

  // Reappeal Complianint
  feedbackComp() {
    this.submitted=true;
    if(this.accpetForm.valid){
    const obj = {
      complaint: {
        cgrComplaintId: this.id
      },
      assigneeComments: this.accpetForm.value.complaintComments
    };
    this.colService.feedbackOnComplint(obj, this.fileaarray).pipe(takeUntil(this.subscribe)).subscribe((reappealdata: any) => {
      console.log(reappealdata);
      this.accpetForm.reset();
      this.toastr.success('Feedback Given successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['main/internal/greviance/college/dashboard']);
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  }
  // Unsubscribe The APi cALls Data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}
