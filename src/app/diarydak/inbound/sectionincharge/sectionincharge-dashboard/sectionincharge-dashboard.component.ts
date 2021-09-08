import { forkJoin, Subject } from 'rxjs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';
import { InboundservicesService } from './../../services/inboundservices.service';

@Component({
  selector: 'app-sectionincharge-dashboard',
  templateUrl: './sectionincharge-dashboard.component.html',
  styleUrls: ['./sectionincharge-dashboard.component.css']
})
export class SectioninchargeDashboardComponent implements OnInit, OnDestroy {
  subscribe: Subject<any> = new Subject<any>();
  receiptData: any = [];
  allCategories: any;
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  startDate: any;
  endDate: any;
  fromDate: any;
  toDate: any;
  selected: any
  status: string;
  event: any;
  listOfAllReceipts: any;
  receiptCounts: any;
  myProperty: any;
  dataa: any;
  searchdatalist: any;
  allLanguages: any;
  ReceiptStatuses: any;
  searchForm: any;
  receiptId: any;
  receiptdata: any;
  roleName: string;
  navigationSubscription:any;
  constructor(public router: Router, public inboundService: InboundservicesService, private fb: FormBuilder, public helper: HelperService) { }

  ngOnInit(): void {
    // this.getAllReceiptList();
    this.JoinCalls();
    // this.getReceiptCounts();
    // this.searchValue('');
    // this.getAllReceipetLanguages();
    // this.getAllReceiptStatusIn();


    this.searchForm = this.fb.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      receiptStatus: new FormControl(''),
      receiptLanguage: new FormControl(''),
      userId: new FormControl('')
    });
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    debugger
    if((this.roleName === 'ARPMAsstSecty')||(this.roleName ==='AcademicAsstSecty')
    ||(this.roleName ==='AEAssistantSecretary')||(this.roleName ==='LegalAsstSecty')
    ){
      this.inboundService.getAsgReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).subscribe((res:any)=>{
        this.receiptData = res;
        this.responsePageCount = this.receiptData[0].pageCount;
      });
      this.inboundService.getCountOfReceiptsByStatusSecExecutive().subscribe((res:any)=>{
        this.receiptCounts =res;
      })
    }
  // Added for menu reload
  this.navigationSubscription= this.router.events.pipe(
    filter((event: RouterEvent) => event instanceof NavigationEnd)
  ).subscribe(() => {
    this.JoinCalls();
    if((this.roleName === 'ARPMAsstSecty')||(this.roleName ==='AcademicAsstSecty')
    ||(this.roleName ==='AEAssistantSecretary')||(this.roleName ==='LegalAsstSecty')
    ){
      this.inboundService.getAsgReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).subscribe((res:any)=>{
        this.receiptData = res;
        this.responsePageCount = this.receiptData[0].pageCount;
      });
      this.inboundService.getCountOfReceiptsByStatusSecExecutive().subscribe((res:any)=>{
        this.receiptCounts =res;
      })
    }
  });
  }
  JoinCalls() {
    // const receiptList = this.inboundService.getAsgReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId, "Forwarded");
    const receiptList = this.inboundService.getAllFwdReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId);
    const receiptStatus = this.inboundService.getAllReceiptStatusIn();
    const receiptCounts = this.inboundService.getCountOfReceiptsByStatus();
    const receiptLanguage = this.inboundService.getAllReceipetLanguage();


    forkJoin([receiptList, receiptStatus,receiptCounts,receiptLanguage]).subscribe(results => {
      console.log(results);
      this.receiptData = results[0];
      this.ReceiptStatuses = results[1];
      this.receiptCounts = results[2];
      this.allLanguages = results[3];
      this.responsePageCount = this.receiptData[0].pageCount;
    }, error => {
      this.helper.errorMessage(error);
    });
  }


  resetSearch() {
    //this.searchForm.reset();
    this.searchForm.controls.startDate.setValue('');
    this.searchForm.controls.endDate.setValue('');
    this.searchForm.controls.receiptStatus.setValue('');
    this.searchForm.controls.receiptLanguage.setValue('');
    this.JoinCalls();
    if((this.roleName === 'ARPMAsstSecty')||(this.roleName ==='AcademicAsstSecty')
    ||(this.roleName ==='AEAssistantSecretary')||(this.roleName ==='LegalAsstSecty')
    ){
      this.inboundService.getAsgReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).subscribe((res:any)=>{
        this.receiptData = res;
        this.responsePageCount = this.receiptData[0].pageCount;
      });
      this.inboundService.getCountOfReceiptsByStatusSecExecutive().subscribe((res:any)=>{
        this.receiptCounts =res;
      })
    }
  }

  fetchResults() {
    if((this.roleName === 'ARPMAsstSecty')||(this.roleName ==='AcademicAsstSecty')
    ||(this.roleName ==='AEAssistantSecretary')||(this.roleName ==='LegalAsstSecty')
    ){
      if (this.searchForm.value.startDate || this.searchForm.value.endDate || this.searchForm.value.receiptStatus
        || this.searchForm.value.receiptLanguage) {
        const obj = {
          assignToUserId: JSON.parse(sessionStorage.getItem('userInfo-usec')).userId,
          defaultStatus: "Assigned",
          endDate: this.searchForm.value.endDate.split("-").reverse().join("-"),
          receiptLanguage: this.searchForm.value.receiptLanguage,
          receiptStatus: this.searchForm.value.receiptStatus,
          startDate: this.searchForm.value.startDate.split("-").reverse().join("-"),
        }
        this.inboundService.DashBoardSearchByStatus(this.pageId, this.rowId, obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
          this.receiptData = result;
          
          this.status = "dateSearch"
          this.responsePageCount = this.receiptData[0].pageCount;
  
        });
      }
    }else{
      if (this.searchForm.value.startDate || this.searchForm.value.endDate || this.searchForm.value.receiptStatus
        || this.searchForm.value.receiptLanguage) {
        const obj = {
          assignToUserId: JSON.parse(sessionStorage.getItem('userInfo-usec')).userId,
          defaultStatus: "Forwarded",
          endDate: this.searchForm.value.endDate.split("-").reverse().join("-"),
          receiptLanguage: this.searchForm.value.receiptLanguage,
          receiptStatus: this.searchForm.value.receiptStatus,
          startDate: this.searchForm.value.startDate.split("-").reverse().join("-"),
        }
        this.inboundService.DashBoardSearchByStatus(this.pageId, this.rowId, obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
          this.receiptData = result;
          
          this.status = "dateSearch"
          this.responsePageCount = this.receiptData[0].pageCount;
  
        });
      }
    }
  
  }
 


  // Previous Button
  previ() {
    if((this.roleName === 'ARPMAsstSecty')||(this.roleName ==='AcademicAsstSecty')
    ||(this.roleName ==='AEAssistantSecretary')||(this.roleName ==='LegalAsstSecty')
    ){
      if (this.pageId >= 1) {
        --this.pageId;
        if (this.status === 'dateSearch') {
          this.fetchResults();
        }
        else {
          this.inboundService.getAsgReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).subscribe((res:any)=>{
            this.receiptData = res;
            this.responsePageCount = this.receiptData[0].pageCount;
          });
        }
      }
     
    }else{
      if (this.pageId >= 1) {
        --this.pageId;
        if (this.status === 'dateSearch') {
          this.fetchResults();
        }
        else {
          this.inboundService.getAllFwdReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId)
            .subscribe((result: any) => {
              this.receiptData = result;
            })
        }
      }
    }
    
  }
  // Next Button 
  next() {
    debugger
    if((this.roleName === 'ARPMAsstSecty')||(this.roleName ==='AcademicAsstSecty')
    ||(this.roleName ==='AEAssistantSecretary')||(this.roleName ==='LegalAsstSecty')
    ){
      if (this.pageId + 1 <= this.responsePageCount - 1) {
        ++this.pageId;
        if (this.status === 'dateSearch') {
          this.fetchResults();
        } 
        else {
          this.inboundService.getAsgReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).subscribe((res:any)=>{
            this.receiptData = res;
          })
        }
     
    } }else{
      if (this.pageId + 1 <= this.responsePageCount - 1) {
        ++this.pageId;
        if (this.status === 'dateSearch') {
          this.fetchResults();
        } 
        else {
          this.inboundService.getAllFwdReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId)
            .pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
              this.receiptData = result;
            });
        }
      }
    }
  
  }

  // Unsubscribe The Call
  ngOnDestroy() {
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
   }
    this.subscribe.next();
    this.subscribe.complete();
  }

}
