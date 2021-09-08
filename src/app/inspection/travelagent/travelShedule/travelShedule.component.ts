
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { travelAgentConstants } from '../../models/travelagent/const.model';
import { TravelagentService } from '../../services/travelagent/travelagent.service';

@Component({
  selector: 'app-travelShedule',
  templateUrl: './travelShedule.component.html',
  styleUrls: ['./travelShedule.component.css']
})
export class TravelSheduleComponent implements OnInit, OnDestroy {
  name: string;
  statusList = [];
  tableHeaders = [];
  pendingData: any = [];
  upcomingData: any = [];
  completedData: any = [];
  bookingStatus = 'Upcoming Bookings';
  subscribe: Subject<any> = new Subject<any>();
  constructor(public router: Router, public travelServer: TravelagentService, public toaster: ToastrService,
    public travelConst: travelAgentConstants) { }

  ngOnInit() {
    this.statusList = this.travelConst.statusList;
    this.tableHeaders = this.travelConst.tableHeaders;

    this.bookingChange(this.bookingStatus); // Default Booking Status and Data
  }

  claim() {
    this.router.navigate(['/main/internal/inspection/tavelagent/shedule/viewshedule/viewclaim']);
  }
  // Booking Data Based on Status
  bookingChange(data: any) {
    console.log(data);
    if (data === 'Pending Bookings') { // Upcoming Bookings
      this.name = 'Pending';
      this.travelServer.getBookingInspections().pipe(takeUntil(this.subscribe)).subscribe((bookingList: any) => {
        console.log('Upcoming Bookings', bookingList);
        if (bookingList.length !== 0) {
          this.upcomingData = bookingList;
        } else {
          this.upcomingData = [];
        }
      }, error => {
        console.log(error);
      });
    } else if (data === 'Upcoming Bookings') { // Pending Bookings
      this.name = 'Upcoming';
      this.travelServer.getAllInspections().pipe(takeUntil(this.subscribe)).subscribe((pending: any) => {
        console.log('Pending Bookings', pending);
        if (pending.length !== 0) {
          this.pendingData = pending;
        } else {
          this.pendingData = [];
        }
      }, error => {
        console.log(error);
      });
    } else { // Completed Bookings
      this.name = 'Completed';
      this.travelServer.getBookingCompleted().pipe(takeUntil(this.subscribe)).subscribe((Completed: any) => {
        console.log('Completed Bookings', Completed);
        if (Completed.length !== 0) {
          this.completedData = Completed;
        } else {
          this.completedData = [];
        }
      }, error => {
        console.log(error);
      });
    }
  }

  // Booking 
  booking(id: any) {
    console.log(id);
    this.travelServer.booking(id).pipe(takeUntil(this.subscribe)).subscribe((booking: any) => {
      console.log('booking', booking);
      console.log('Booked Successfully');
      this.toaster.success('Booked Successfully', 'Success', {
        timeOut: 2000
      });
    }, error => {
      console.log(error);
    });
  }

  // Unsubscribe The Api Calls
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}
