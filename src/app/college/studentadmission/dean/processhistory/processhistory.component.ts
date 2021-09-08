import { Component, OnInit } from '@angular/core';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { StudentAdmissionService } from '../../services/student-admission.service';
@Component({
  selector: 'app-processhistory',
  templateUrl: './processhistory.component.html',
  styleUrls: ['./processhistory.component.css']
})
export class ProcesshistoryComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  admissionid: any;
  chronicaldata: any;
  clarificationsdetails: any;
  constructor(public studentService: StudentAdmissionService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => this.admissionid = params.id);
    this.gethistory();
  }

  // Process history
  gethistory() {
    this.studentService.getWorkFlowsByAdmissionId(this.admissionid).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.chronicaldata =res;
      console.log(this.chronicaldata);
      this.clarificationsdetails =res[0];
    }, error => {
      console.log(error);
    })
  }
   // Destroy The Subscribe Dta
   ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
