import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { appConstants } from './const.model';
import { urlServices } from '../griviance/models/url.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public url: urlServices, public toaster: ToastrService, public constValues: appConstants, public router: Router) { }
  public successFailureMessage$ = new BehaviorSubject<any>(false);
  public sendNotificationSubject$ = new BehaviorSubject<any>(false);


  // success or failure message events
  sendNotification(notify: any) {
    this.successFailureMessage$.next(notify);
  }
  getNotification() {
    return this.successFailureMessage$.asObservable();
  }
  // popup open events
  sendDataToNotificationComponent(notifyData: any) {
    this.sendNotificationSubject$.next(notifyData);
  }
  readDataInNotificationComponent(): Observable<any> {
    return this.sendNotificationSubject$.asObservable();
  }
  // Clear Behaviour Subject
  clearBehaviourSubject(event$: any) {
    event$.next(false);
    // this[event$].next(false);
  }
  errorMessage(error: any) {
    if (error.status === 400) {
      return this.toaster.error('Bad Request', 'Error', {
        timeOut: 2000
      });
    }
    if (error.status === 401) {
      this.toaster.error(this.constValues.errorsHandlings[401], 'Error', {
        timeOut: 2000
      });
      this.router.navigate(['/']);
    }
    if (error.status === 404) {
      // this.router.navigate(['/login']);
      if (error.error.errMsg !== null) {
        return this.toaster.error(error.error.errMsg, 'Error', {
          timeOut: 2000
        });
      } else {
        return this.toaster.error(this.constValues.errorsHandlings[404], 'Error', {
          timeOut: 2000
        });
      }
    }
    if (error.status === 500) {
      if (error.error.errMsg !== null) {
        return this.toaster.error(error.error.errMsg, 'Error', {
          timeOut: 2000
        });
      } else {
        return this.toaster.error(this.constValues.errorsHandlings[500], 'Error', {
          timeOut: 2000
        });
      }


    }
    // if (error.status === 417) {
    //   return this.toaster.error(this.constValues.errorsHandlings[417], 'Error', {
    //     timeOut: 2000
    //   });
    // }
    if (error.status === 417) {
      return this.toaster.error(error.message, 'Error', {
        timeOut: 2000
      });
    }

  }
// Sorting
  sortedData(data: any, sortKey: any) {
    data.sort((a, b) => {
      const x = a[sortKey].toLowerCase();
      const y = b[sortKey].toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
  }
}
