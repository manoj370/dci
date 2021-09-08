import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OutboundService } from '../../services/outbound.service';
import { HelperService } from 'src/app/common-service/helper.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  canonicalData: any = [];
  chronologicalData: any;
  subscribe: Subject<any> = new Subject<any>();

  constructor(public route: ActivatedRoute, public jsaService: OutboundService, public helper: HelperService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.jsaService.processHistory(params.id)
        .pipe(takeUntil(this.subscribe))
        .subscribe((data: any) => {
          if (data.length !== 0) {
            this.canonicalData = data;
            this.chronologicalData = data[0];
            console.log(this.chronologicalData);
            console.log(data);
          } else {
            this.canonicalData = [];
          }
        }, error => {
          console.log(error);
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