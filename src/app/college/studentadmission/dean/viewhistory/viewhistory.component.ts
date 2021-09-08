import { Component, OnInit } from '@angular/core';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { StudentAdmissionService } from '../../services/student-admission.service';
@Component({
  selector: 'app-viewhistory',
  templateUrl: './viewhistory.component.html',
  styleUrls: ['./viewhistory.component.css']
})
export class ViewhistoryComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  id: any;
  historybyid: any;
  constructor(public studentService: StudentAdmissionService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.id = params.id);
    this.getWorkflowById();
  }
 // Process history
 getWorkflowById() {
  this.studentService.getWorkFlowById(this.id).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
    console.log(res);
    this.historybyid =res;
    console.log(this.historybyid);
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
