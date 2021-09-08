import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConstantModel } from 'src/app/college/models/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { CollegeServiceService } from 'src/app/college/services/collegeService.service';

@Component({
  selector: 'app-studentDetails',
  templateUrl: './studentDetails.component.html',
  styleUrls: ['./studentDetails.component.scss']
})
export class StudentDetailsComponent implements OnInit , OnDestroy {
  

  id: any;
  listId:any;
  comment = '';
  files: any = [];
  btnName = '';
  admissionDetails: any;
  courseProgress: any = [];
  subscribe: Subject<any> = new Subject<any>();
  pursingStage: string;


  constructor(public router: Router, public monConst: ConstantModel, public activatedRoute: ActivatedRoute,
    public monitorService: CollegeServiceService, public helper: HelperService,) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.listId = this.activatedRoute.snapshot.params.listId;


    this.getAll();
  }
  getAll() {
    this.monitorService.admissionDetails(this.id)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.admissionDetails = data;
        this.courseProgress = this.admissionDetails.studentCourseProgress;       
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }


  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}
