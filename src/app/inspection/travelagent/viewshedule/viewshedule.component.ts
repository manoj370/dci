import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';// declare var $: any;
import { TravelagentService } from '../../services/travelagent/travelagent.service';
import { travelAgentConstants } from '../../models/travelagent/const.model';

@Component({
  selector: 'app-viewshedule',
  templateUrl: './viewshedule.component.html',
  styleUrls: ['./viewshedule.component.css']
})
export class ViewsheduleComponent implements OnInit, OnDestroy {
  inspectorDetails: any = [];
  subscribe: Subject<any> = new Subject<any>();

  constructor(public travelServer: TravelagentService,public travelConst:travelAgentConstants,
    public helper: HelperService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getInspectorDetails(); // Inspector Details
  }
  // Get Inspector Details
  getInspectorDetails() {
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.travelServer.getInspectordetails(id).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.inspectorDetails = data;
          // for (const iterator of this.inspectorDetails) {
          //   iterator.fromScheduleDate = moment(iterator.fromScheduleDate).format('DD-MM-YYYY');
          //   iterator.toScheduleDate = moment(iterator.toScheduleDate).format('DD-MM-YYYY');
          // }
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    });
  }
  // Unsubscribe The Subscribed data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
