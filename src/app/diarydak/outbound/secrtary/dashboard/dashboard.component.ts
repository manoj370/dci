import { Subject } from 'rxjs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OutboundService } from '../../services/outbound.service';
import { JSAConstantServices } from '../../models/jsaconst.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'Sec-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  rowId = 0;
  toDate = '';
  pageId = 10;
  fromDate = '';
  urlString = '';
  pageCount: any;
  statusName = '';
  searchTxt = '';
  fileDetails: any;
  languagesList: any = [];
  allDispatchList: any = [];
  statusList: any = [];
  popupFileList: any = [];
  searchForm: FormGroup;
  popupFromDate = '';
  popupTODate = '';
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('confirmModal') openBtn: ElementRef<HTMLElement>;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  fileid: number;
  today: string;
  roleName: string;
  maxDate: string;
  navigationSubscription:any;
  popupPageId=10;
  popupRowId=0;
  responsePageCount: number;
  dispatchfield: any;
  constructor(private router: Router, public jsaService: OutboundService, public helper: HelperService,
    public jsaConst: JSAConstantServices, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    this.searchForm = this.fb.group({
      toDate: [''],
      status: [''],
      language: [''],
      fromDate: [''],
      filename: [''],
      dfasubject: ['']
    });
    this.getAllDispatchesList();
    this.getLoadingData();
// Added for menu reload
this.navigationSubscription= this.router.events.pipe(
  filter((event: RouterEvent) => event instanceof NavigationEnd)
).subscribe(() => {
  this.getAllDispatchesList();
    this.getLoadingData();
});
  }

  getLoadingData() {
    // Languages
    this.jsaService.getAllReceiptLanguages().subscribe((data: any) => {
      console.log(data);
      this.languagesList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
    // Status
    this.jsaService.getSSAStatusList().subscribe((data: any) => {
      console.log(data);
      this.statusList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // Dashboard Lis
  getAllDispatchesList() {
    console.log(this.searchForm.value);
    debugger
    if (this.searchForm.value.dfasubject === '' ||this.searchForm.value.dfasubject ===null) {
    this.searchForm.value.fromDate = this.searchForm.value.fromDate !== null ? this.searchForm.value.fromDate : '';
    this.searchForm.value.toDate = this.searchForm.value.toDate !== null ? this.searchForm.value.toDate : '';
    this.searchForm.value.language = this.searchForm.value.language !== null ? this.searchForm.value.language : '';
    this.searchForm.value.status = this.searchForm.value.status !== null ? this.searchForm.value.status : '';
    this.searchForm.value.filename = this.searchForm.value.filename !== null ? this.searchForm.value.filename : '';

    const fromDateObj = '&fromDate=' + this.searchForm.value.fromDate;
    const toDateObj = '&toDate=' + this.searchForm.value.toDate;
    const languageObj = '&languageId=' + this.searchForm.value.language;
    const statusObj = '&statusId=' + this.searchForm.value.status;
    const fileNameObj = '&fileReferenceNo=' + this.searchForm.value.filename;

    // 5 Values Should Not Empty
    if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.language !== '' && this.searchForm.value.status !== ''
      && this.searchForm.value.filename !== '') {
      this.urlString = fromDateObj + toDateObj + languageObj + statusObj + fileNameObj;
      // 4 Values Not empty
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.language !== '' && this.searchForm.value.status !== '') {
      this.urlString = fromDateObj + toDateObj + languageObj + statusObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.language !== '' && this.searchForm.value.filename !== '') {
      this.urlString = fromDateObj + toDateObj + languageObj + fileNameObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.status !== '' && this.searchForm.value.filename !== '') {
      this.urlString = fromDateObj + toDateObj + statusObj + fileNameObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.language !== ''
      && this.searchForm.value.status !== '' && this.searchForm.value.filename !== '') {
      this.urlString = fromDateObj + languageObj + statusObj + fileNameObj;
      // 3 Values Not empty
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.language !== '') {
      this.urlString = fromDateObj + toDateObj + languageObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.status !== '') {
      this.urlString = fromDateObj + toDateObj + statusObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.filename !== '') {
      this.urlString = fromDateObj + toDateObj + fileNameObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.language !== ''
      && this.searchForm.value.status !== '') {
      this.urlString = fromDateObj + languageObj + statusObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.filename !== ''
      && this.searchForm.value.status !== '') {
      this.urlString = fromDateObj + statusObj + fileNameObj;
    } else if (this.searchForm.value.language !== '' && this.searchForm.value.filename !== ''
      && this.searchForm.value.status !== '') {
      this.urlString = languageObj + statusObj + fileNameObj;
      // 2  Values Not empty
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== '') {
      this.urlString = fromDateObj + toDateObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.language !== '') {
      this.urlString = fromDateObj + languageObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.status !== '') {
      this.urlString = fromDateObj + statusObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.filename !== '') {
      this.urlString = fromDateObj + fileNameObj;
    } else if (this.searchForm.value.language !== '' && this.searchForm.value.filename !== '') {
      this.urlString = languageObj + fileNameObj;
    } else if (this.searchForm.value.language !== '' && this.searchForm.value.status !== '') {
      this.urlString = languageObj + statusObj;
    } else if (this.searchForm.value.filename !== '' && this.searchForm.value.status !== '') {
      this.urlString = statusObj + fileNameObj;
      // 1 Value Not empty
    } else if (this.searchForm.value.fromDate !== '') {
      this.urlString = fromDateObj;
    } else if (this.searchForm.value.language !== '') {
      this.urlString = languageObj;
    } else if (this.searchForm.value.status !== '') {
      this.urlString = statusObj;
    } else if (this.searchForm.value.filename !== '') {
      this.urlString = fileNameObj;
    } else {
      this.urlString = null;
    }



    this.jsaService.dashboardList(this.urlString, this.rowId, this.pageId)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data !== null && data.length !== 0) {
          this.allDispatchList = data;
       
          this.pageCount = Math.ceil(this.allDispatchList[0].totalCount / this.pageId);
        } else {
          this.allDispatchList = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
    else {
      this.jsaService.searchDFASubject(sessionStorage.getItem('userId-usec'), this.searchForm.value.dfasubject, this.rowId, this.pageId).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data !== null && data.length !== 0) {
          this.allDispatchList = data;

          this.pageCount = Math.ceil(this.allDispatchList[0].totalCount / this.pageId);
        } else {
          this.allDispatchList = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
      })
    }
  }

  selecetdDate(data: any) {
    console.log(data);
    this.maxDate = moment(data).add(1, 'days').format('YYYY-MM-DD');
  }

  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      this.getAllDispatchesList();
    }
  }
  // Previous  Button
  prev() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.getAllDispatchesList();

    }
  }
  // ResetForm
  resetValidator() {
    this.searchForm.reset();
    this.searchForm.controls.status.setValue('', { onlySelf: true });
    this.searchForm.controls.language.setValue('', { onlySelf: true });
    this.getAllDispatchesList();
  }

  viewFileDetails(data: any, popupFromDate: any, popupTODate: any) {
    console.log(data);
    this.dispatchfield =data.dakDispatchFileNos.dakDispatchFileId;
    console.log(this.dispatchfield);
    this.fileDetails = data;
    this.openBtn.nativeElement.click();
    this.jsaService.fileDetailsList(data.dakDispatchFileNos.dakDispatchFileId, popupFromDate, popupTODate, this.rowId, this.pageId)
      .subscribe((data: any) => {
        this.popupFileList = data;
        console.log(data);
        this.responsePageCount =this.popupFileList[0].pageCount;
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }

  popupViewFileDetails(data: any, popupFromDate: any, popupTODate: any){
    this.jsaService.fileDetailsList(data.dakDispatchFileNos.dakDispatchFileId, popupFromDate, popupTODate, this.rowId, this.pageId)
    .subscribe((data: any) => {
      this.popupFileList = data;
      console.log(this.popupFileList);

    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

// previewPdfBefore Dispatch
previewPdf(id:any){
  this.jsaService.previewPdf(id).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
    console.log(res);
    const fileURL = URL.createObjectURL(res);
    window.open(fileURL, '_blank');
  },error=>{
    console.log(error);
  })
}
 // View PageCounts
 viewPage(id: any) {
  console.log(id);
  this.closeBtn.nativeElement.click();
  this.router.navigate(['main/internal/outbound/secretary/sheetView/', id]);
}
 // NextDispatches Button
 nextDispatches(item) {
  console.log(item);

 if (this.popupRowId + 1 <= this.responsePageCount - 1) {
   ++this.popupRowId;
    this.jsaService.fileList(item,this.popupRowId, this.popupPageId)
   .subscribe((data: any) => {
     this.popupFileList = data;
     console.log(data);
     this.responsePageCount =this.popupFileList[0].pageCount

   }, error => {
     console.log(error);
     this.helper.errorMessage(error);
   });
 }
}
// Previous Dispatches  Button
prevDispatches(item) {
 if (this.popupRowId >= 1) {
   --this.popupRowId;
   this.jsaService.fileList(item,this.popupRowId, this.popupPageId)
   .subscribe((data: any) => {
     this.popupFileList = data;
     console.log(data);
     this.responsePageCount =this.popupFileList[0].pageCount

   }, error => {
     console.log(error);
     this.helper.errorMessage(error);
   });
 }
}
resetPopup(){
 this.popupPageId = 10;
 this.popupRowId = 0;
}
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
   }
    this.subscribe.next();
    this.subscribe.complete();
  }
 
  
}
