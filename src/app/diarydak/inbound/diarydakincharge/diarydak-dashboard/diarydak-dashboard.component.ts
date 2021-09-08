import { Component, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { from, Subject } from 'rxjs';
import { InboundservicesService } from '../../services/inboundservices.service';
import { filter, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ReceiptSearch } from '../models/receipt-search.model';


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
  selector: 'app-diarydak-dashboard',
  templateUrl: './diarydak-dashboard.component.html',
  styleUrls: ['./diarydak-dashboard.component.css']
})
export class DiarydakDashboardComponent implements OnInit,OnDestroy {
  subscribe: Subject<any> = new Subject<any>();

  listofReceipts: any = [];
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
  receiptData: any = [];
  myProperty: any;
  dataa: any;
  searchdatalist: any;
  sectionId: number;
  sectionVisible = false;
  allLanguages: any;
  searchForm: FormGroup;
  ReceiptStatuses: any;
  navigationSubscription:any;
  showreturnBtn: boolean =false;
  forwardSecStatus: any;
  constructor(public router: Router, public service: InboundservicesService, private fb: FormBuilder) { }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
    //roleName: string;
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
  ngOnInit(): void {
    this.receiptLists();
    this.searchValue('');
    this.getAllReceipetLanguages();
    this.getAllReceiptStatuses();
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
  this.receiptLists();
    this.searchValue('');
    this.getAllReceipetLanguages();
    this.getAllReceiptStatuses();
});
  }
  // format for date search
  formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(2), // get only two digits
      month = datePart[1], day = datePart[2];

    return day + '-' + month + '-' + datePart[0];
  }


  getDropDownText(id, object) {
    const selObj = _.filter(object, function (o) {
      return (_.includes(id, o.id));
    });
    return selObj;
  }

  resetSearch() {
    //this.searchForm.reset();
    this.searchForm.controls.startDate.setValue('');
    this.searchForm.controls.endDate.setValue('');
    this.searchForm.controls.receiptStatus.setValue('');
    this.searchForm.controls.receiptLanguage.setValue('');
    this.receiptLists();
  }

  fetchResults() {
    // var input = this.searchForm.value as ReceiptSearch;

    // debugger;
    //  input.receiptStatus = this.ReceiptStatuses.filter(i => i.statusId === +this.searchForm.controls.receiptStatus?.value)[0].statusName;
    // input.receiptLanguage = this.allLanguages.filter(i => i.receiptLanguageId === +this.searchForm.controls.receiptLanguage?.value)[0].name;
    // input.startDate = this.formatDate(input.startDate);
    // input.endDate = this.formatDate(input.endDate);
    // debugger;
    // input.userId = JSON.parse(sessionStorage.getItem('userInfo-usec')).userId;

    if (this.searchForm.value.startDate || this.searchForm.value.endDate || this.searchForm.value.receiptStatus
      || this.searchForm.value.receiptLanguage) {
      const obj = {
        endDate: this.searchForm.value.endDate.split("-").reverse().join("-"),
        receiptLanguage: this.searchForm.value.receiptLanguage,
        receiptStatus: this.searchForm.value.receiptStatus,
        startDate: this.searchForm.value.startDate.split("-").reverse().join("-"),
        userId: JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      }
      this.service.dashBoardSearch(this.pageId, this.rowId, obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        debugger;
        this.receiptData = result;
        this.responsePageCount = this.receiptData[0].pageCount;
        this.status = "dateSearch"
      });
    } else {
    }


  }


  viewSubSection(targetSectionId: number) {
    this.sectionId = targetSectionId;
    this.sectionVisible = !this.sectionVisible;
  }

  receiptLists() {
    this.service.getAllReceiptsByUser(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {

      debugger;
      this.receiptData = result;
      this.receiptData.forEach(element => {

        element.dairyReceivedDate = moment(new Date(element.dairyReceivedDate)).format('dd-MM-yyyy')
        element.dairyDate = moment(new Date(element.dairyDate)).format('dd-MM-yyyy')
        console.log(element.forwardSecStatus);
        console.log(element.forwardSecStatus.includes("Returned"));
        this.forwardSecStatus =element.forwardSecStatus;
      });
      this.responsePageCount = this.receiptData[0].pageCount;
    })

  }
  chartMethod(forwardSecStatus:any){
    if(forwardSecStatus.includes("Returned")=== true ||forwardSecStatus.includes("Created")=== true){
      this.showreturnBtn =true;
    }else {
      this.showreturnBtn=false
    }
  }
  view(data: any) {
    sessionStorage.setItem('tdata', data);
    this.router.navigate(['/inbound/diarydakincharge/view&edit-receipt']);
  }


  getAllReceiptStatuses() {

    this.service.getAllReceiptStatuses().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      // console.log(result, 'getAllReceiptStatuses');
      debugger;
      this.ReceiptStatuses = result;
    });
  }

  // getAllReceiptStatuses(event) {
  //   debugger;
  //   this.event = event

  //   this.service.getAllReceiptStatuses().pipe(takeUntil(this.subscribe)).subscribe(result => {
  //     this.receiptData = result;
  //     this.responsePageCount = this.receiptData[0].pageCount;
  //     this.status = "filterSearch"


  //   })
  // }

  getAllReceipetLanguages() {
    this.service.getAllReceipetLanguage().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result, 'getAllReceipetLanguages');
      debugger;
      this.allLanguages = result;
    });
  }

  getFilterValue(event) {
    this.event = event
    debugger;
    this.service.getReceiptDetailsByStatus(event, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe(result => {
      this.receiptData = result;
      this.responsePageCount = this.receiptData[0].pageCount;
      this.status = "filterSearch"

      // this.listofReceipts.sort((a, llllllb) => {
      //   return a.receiptId - lllb.receiptId;
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
  createReceiptPage(data) {


    this.router.navigate(['/main/internal/inbound/diarydakincharge/createReceipt/', { id: data }])


    // this.router.navigate(['/main/internal/inbound/diarydakincharge/createReceipt', { id: data.receiptId }])


  }
  viewReceipt(data) {


    this.router.navigate(['/main/internal/inbound/diarydakincharge/ViewReceipt/', { id: data }])


    // this.router.navigate(['/main/internal/inbound/diarydakincharge/createReceipt', { id: data.receiptId }])


  }



  //Previous Button
  previ() {
    if (this.pageId >= 1) {
      --this.pageId;
      if (this.status === 'dateSearch') {
        this.fetchResults();
      }
      else {
        this.service.getAllReceiptsByUser(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
          this.receiptData = result;
          // this.responsePageCount = this.listofReceipts[0].pageCount;
        })
      }


    }
  }
  //Next Button 
  next() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      if (this.status === 'dateSearch') {
        this.fetchResults();
      }
      else {
        this.service.getAllReceiptsByUser(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
          this.receiptData = result;
        })
      }

    }

  }
  // search
  searchValue(data: any) {
    // debugger
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
      this.receiptLists();
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
