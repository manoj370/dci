import { Subject } from 'rxjs';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';
import { InsadminService } from '../../services/insadmin/insadmin.service';
import { InspectionAdminConstants } from '../../models/insadmin/const.model';

@Component({
  selector: 'app-inspecdetails',
  templateUrl: './inspecdetails.component.html',
  styleUrls: ['./inspecdetails.component.css']
})
export class InspecdetailsComponent implements OnInit, OnDestroy {
  reason: any;
  paramsId: any;
  sheduleDetails: any;
  today = moment().format('YYYY-MM-DD');

  subscribe: Subject<any> = new Subject<any>();
  detailsArray = [
    { key: 'inspectionType', label: 'Type' },
    { key: 'subType', label: 'SubType' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'courseName', label: 'Course' },
    { key: 'specialisation', label: 'Specilization' },
    { key: 'startDate', label: 'From Date' },
    { key: 'endDate', label: 'To Date' },
    { key: 'acceptedInspectorCount', label: 'Accepted Inspector' }
  ];
  constructor(public route: ActivatedRoute, public insAdmin: InsadminService,public insAdminConst:InspectionAdminConstants,
    public toastr: ToastrService, public helper: HelperService) { }

  ngOnInit(): void {
    this.getSheduleDetails(); // Sheduling Details
  }
  getSheduleDetails() {
    this.route.params.subscribe(params => {
      this.paramsId = +params.id;
      console.log(this.paramsId);
      this.insAdmin.getSheduleDetails(this.paramsId)
        .pipe(takeUntil(this.subscribe))
        .subscribe((data: any) => {
          data.startDate = moment(data.startDate).format('DD-MM-YYYY');
          data.endDate = moment(data.endDate).format('DD-MM-YYYY');
          console.log(data);
          this.sheduleDetails = data;
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    });
  }
  // reason Date 
  getReason(data: any) {
    this.reason = data;
  }
  // Reassign 
  reassign(inspectionId: any, inspectorId: any) {
    this.insAdmin.reassign(inspectionId, inspectorId)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        this.getSheduleDetails();
        this.toastr.success('Inspector Added Successfully', 'Success', {
          timeOut: 2000
        });
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // Destroy The Subscribe Data  reassign
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
