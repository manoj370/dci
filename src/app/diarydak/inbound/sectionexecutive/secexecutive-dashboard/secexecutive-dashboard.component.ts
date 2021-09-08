import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { InboundservicesService } from '../../services/inboundservices.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { urlServices } from 'src/app/griviance/models/url.models';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export type SortColumn = keyof any | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
@Component({
  selector: 'app-secexecutive-dashboard',
  templateUrl: './secexecutive-dashboard.component.html',
  styleUrls: ['./secexecutive-dashboard.component.css']
})
export class SecexecutiveDashboardComponent implements OnInit {
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
  subscribe: Subject<any> = new Subject<any>();
  searchForm: FormGroup;
  ReceiptStatuses: any;
  allLanguages: any;
  navigationSubscription:any;
  constructor(public router: Router, public service: InboundservicesService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.getAllReceiptList();
    this.getReceiptCounts();
    this.getAllReceiptStatusIn();
    this.getAllReceipetLanguages();
    this.searchValue('');
    this.searchForm = this.fb.group({
      'startDate': new FormControl(''),
      'endDate': new FormControl(''),
      'receiptStatus': new FormControl(''),
      'receiptLanguage': new FormControl(''),
      'userId': new FormControl('')

    })
    // Added for menu reload
  this.navigationSubscription= this.router.events.pipe(
    filter((event: RouterEvent) => event instanceof NavigationEnd)
  ).subscribe(() => {
    this.getAllReceiptList();
    this.getReceiptCounts();
    this.getAllReceiptStatusIn();
    this.getAllReceipetLanguages();
    this.searchValue('');
  });
  // Added for menu reload
  }
@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
    roleName: string;
    onSort({column, direction}: SortEvent) {
      // resetting other headers
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
  
      // sorting countries
      if (direction === '' || column === '') {
        this.receiptData  = this.receiptData;
      } else {
        this.receiptData = [...this.receiptData].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    }
  //getAllReceiptList
  getAllReceiptList() {
    debugger;
    this.service.getAsgReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result, 'getAllReceiptsByUserIdAndStatus');
      this.receiptData = result;
      // this.service.getAllReceiptsByUserIdAndStatus(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, status, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      //   console.log(this.receiptdata);
      // this.receiptData = result;
     this.responsePageCount = this.receiptData[0].pageCount;
    })
    // this.service.getAllReceiptsByUser(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
    //   debugger;
    //   this.receiptData = result;
    //   debugger;
    //   this.responsePageCount = this.receiptData[0].pageCount;


    // })

  }




  getAllReceiptStatusIn() {

    this.service.getAllReceiptStatusIn().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      // console.log(result, 'getAllReceiptStatuses');
      debugger;
      this.ReceiptStatuses = result;
    });
  }
  getAllReceipetLanguages() {
    this.service.getAllReceipetLanguage().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result, 'getAllReceipetLanguages');
      debugger;
      this.allLanguages = result;
    });
  }
  getFilterValue(event) {
    this.event = event

    this.service.getReceiptDetailsByStatus(event, this.pageId, this.rowId).subscribe(result => {
      this.receiptData = result;
      this.responsePageCount = this.receiptData[0].pageCount;
      this.status = "filterSearch"

      // this.listofReceipts.sort((a, b) => {
      //   return a.receiptId - b.receiptId;
      // });
    })
  }

  public datePicker(date: any) {
    if (date.startDate !== null) {
      this.startDate = date.startDate._d
      this.fromDate = this.startDate.getFullYear().toString() + '-' + ("0" + (this.startDate.getMonth() + 1)).slice(-2) + '-' + ("0" + this.startDate.getDate().toString()).slice(-2)

    }
    if (date.startDate !== null) {
      this.endDate = date.endDate._d
      this.toDate = this.endDate.getFullYear().toString() + '-' + ("0" + (this.endDate.getMonth() + 1)).slice(-2) + '-' + ("0" + this.endDate
        .getDate().toString()).slice(-2)
    }
    if (date.startDate !== null) {
      this.service.getReceiptListByUsingDate(this.fromDate, this.toDate, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        this.receiptData = result;
        this.responsePageCount = this.receiptData[0].pageCount;
        this.status = "dateSearch"
      })

    }
  }
  //getReceiptCounts


  getReceiptCounts() {

    // this.receiptCounts = {
    //   totalReceipts: 3,
    //   ASG: 0,
    //   UPR: 2,
    //   RTN: 0,
    //   DPD: 1,

    // }
    this.service.getCountOfReceiptsByStatusSecExecutive().subscribe((result: any) => {
      this.receiptCounts = result;
    })
  }
  //Previous Button
  previ() {
    if (this.pageId >= 1) {
      --this.pageId;
      if (this.status === 'dateSearch') {
        this.fetchResults();
        // this.service.getReceiptListByUsingDate(this.fromDate, this.toDate, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        //   this.receiptData = result;

        // })
      }
      // else if (this.status === 'filterSearch') {
      //   this.service.getReceiptDetailsByStatus(this.event, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(result => {
      //     this.receiptData = result;
      //     this.status = "filterSearch"

      //     // this.listofReceipts.sort((a, b) => {
      //     //   return a.receiptId - b.receiptId;
      //     // });
      //   })
      // }
      // else if (this.status === "search") {
      //   this.service.searchReceipt(this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      //     if (res.length !== 0) {
      //       this.searchdatalist = res;
      //       this.receiptData = this.searchdatalist;
      //       this.status = "search";
      //     }
      //   }, error => {
      //   });
      // }
      else {
        this.service.getAsgReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
          this.receiptData = result;
          this.responsePageCount = this.receiptData[0].pageCount;
        })
      }


    }
  }
  //Next Button 
  next() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      if (this.status === 'dateSearch') {
        // this.service.getReceiptListByUsingDate(this.fromDate, this.toDate, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        //   this.receiptData = result;

        // })
        this.fetchResults();
      }
      // else if (this.status === 'filterSearch') {
      //   this.service.getReceiptDetailsByStatus(this.event, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(result => {
      //     this.receiptData = result;

      //   })
      // }
      // else if (this.status === "search") {
      //   this.service.searchReceipt(this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      //     if (res.length !== 0) {
      //       this.searchdatalist = res;
      //       this.receiptData = this.searchdatalist;
      //       this.status = "search";
      //     }
      //   }, error => {
      //   });
      // }
      else {
        this.service.getAsgReceiptsByUserId(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
          this.receiptData = result;
          this.responsePageCount = this.receiptData[0].pageCount;
        })
      }
    }

  }
  fetchResults() {
    
    
    if (this.searchForm.value.startDate || this.searchForm.value.endDate || this.searchForm.value.receiptStatus
      || this.searchForm.value.receiptLanguage) {
        const obj = {
          assignToUserId:JSON.parse(sessionStorage.getItem('userInfo-usec')).userId,
          defaultStatus: "Assigned",
          endDate: this.searchForm.value.endDate.split("-").reverse().join("-"),
          receiptLanguage: this.searchForm.value.receiptLanguage,
          receiptStatus: this.searchForm.value.receiptStatus,
          startDate: this.searchForm.value.startDate.split("-").reverse().join("-"),
        }
      this.service.DashBoardSearchByStatus(this.pageId, this.rowId, obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        debugger;
        this.receiptData = result;
        this.responsePageCount = this.receiptData[0].pageCount;
        this.status ="dateSearch"
      });
    } else {
    }


  }
  resetSearch(){
    this.searchForm.controls.startDate.setValue('');
    this.searchForm.controls.endDate.setValue('');
    this.searchForm.controls.receiptStatus.setValue('');
    this.searchForm.controls.receiptLanguage.setValue('');
    this.getAllReceiptList();
  }
  searchValue(data: any) {
    this.dataa = data;
    if (this.dataa !== '') {
      this.service.searchReceipt(this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        if (res.length !== 0) {
          this.searchdatalist = res;
          this.receiptData = this.searchdatalist;
          this.responsePageCount = this.receiptData[0].pageCount;
          this.status = "search";
        }
      }, error => {

      });
    } else {
      this.getAllReceiptList();
    }
  }

  reset() {
    debugger;
    this.searchForm.reset();
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
