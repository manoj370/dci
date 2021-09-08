import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { InsadminService } from '../../services/insadmin/insadmin.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';
import { InspectionAdminConstants } from '../../models/insadmin/const.model';

@Component({
  selector: 'app-inspectorview',
  templateUrl: './inspectorview.component.html',
  styleUrls: ['./inspectorview.component.css']
})
export class InspectorviewComponent implements OnInit, OnDestroy {
  inspectorDetails: any;
  checkStatus = false;
  subscribe: Subject<any> = new Subject<any>();
  constructor(public insadmin: InsadminService, public route: ActivatedRoute,
    public insAdminCont: InspectionAdminConstants, public helper: HelperService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getInspDetails(+params.id); // Get Details call
    });
  }
  // Get Inspector Details
  getInspDetails(id: any) {
    console.log(id);
    this.insadmin.getInspectorDetails(id).pipe(takeUntil(this.subscribe)).subscribe((details: any) => {
      this.inspectorDetails = details;
      console.log(this.inspectorDetails);
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // Destroy The Subscribe Data  
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
