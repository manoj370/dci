import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';
import { SecHeadService } from '../../services/sectionHead/secHead.service';

@Component({
  selector: 'app-sec-chronical',
  templateUrl: './sec-chronical.component.html',
  styleUrls: ['./sec-chronical.component.css']
})
export class SecChronicalComponent implements OnInit,OnDestroy {
  chronicalData: any;
  complaintDetails: any;
  subscribe: Subject<any> = new Subject<any>();
  // tableHeaders: ['User', 'Start Date', 'Status'];

  constructor(public secservice: SecHeadService, public route: ActivatedRoute,public helper:HelperService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      console.log(id);
      this.secservice.getChronicalHist(id).pipe(takeUntil(this.subscribe)).subscribe((detailsdata: any) => {
        console.log(detailsdata);
        this.complaintDetails = detailsdata[0];
        this.chronicalData = detailsdata;
        console.log(this.chronicalData);
      }, error => {
        this.helper.errorMessage(error);
      });
    });
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
