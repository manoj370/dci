import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Directive, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { OutboundService } from '../../services/outbound.service';
import { HelperService } from 'src/app/common-service/helper.service';
import { JSAConstantServices } from '../../models/jsaconst.model';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  selector: 'app-correctionList',
  templateUrl: './correctionList.component.html',
  styleUrls: ['./correctionList.component.scss']
})
export class CorrectionListComponent implements OnInit, OnDestroy {
  rowId = 0;
  toDate = '';
  pageId = 10;
  fromDate = '';
  pageCount: any;
  statusName = '';
  searchTxt = '';
  searchForm: FormGroup;
  allDispatchList: any = [];
  allCorrectionList: any = [];
  correctionStatusList: any = [];
  subscribe: Subject<any> = new Subject<any>();
  urlString: string;
  navigationSubscription:any;
  constructor(public ssaService: OutboundService, private router: Router, public helper: HelperService,
    public fb: FormBuilder, public jsaConst: JSAConstantServices) { }

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
        this.allCorrectionList  = this.allCorrectionList;
      } else {
        this.allCorrectionList = [...this.allCorrectionList].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    }

  ngOnInit(): void {
    this.statusList();
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    this.searchForm = this.fb.group({
      toDate: [''],
      status: [''],
      sender: [''],
      fromDate: [''],
    });
    this.getCorrectionList();
    // Added for menu reload
    this.navigationSubscription= this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.statusList();
      this.getCorrectionList();
  });
  // Added for menu reload
  }
  statusList() {
    this.ssaService.getCorrectionStatusList()
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.correctionStatusList = data;
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }

  // 

  // Dashboard Lis
  getCorrectionList() {
    console.log(this.searchForm.value);
    this.searchForm.value.fromDate = this.searchForm.value.fromDate !== null ? this.searchForm.value.fromDate : '';
    this.searchForm.value.toDate = this.searchForm.value.toDate !== null ? this.searchForm.value.toDate : '';
    this.searchForm.value.sender = this.searchForm.value.sender !== null ? this.searchForm.value.sender : '';
    this.searchForm.value.status = this.searchForm.value.status !== null ? this.searchForm.value.status : '';

    const fromDateObj = '&fromDate=' + this.searchForm.value.fromDate;
    const toDateObj = '&toDate=' + this.searchForm.value.toDate;
    const statusObj = '&statusName=' + this.searchForm.value.status;
    const senderObj = '&senderName=' + this.searchForm.value.sender;

    // 4 Values Should Not Empty
    if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.sender !== '' && this.searchForm.value.status !== '') {
      this.urlString = fromDateObj + toDateObj + statusObj + senderObj;
      // 3 Values 
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.status !== '') {
      this.urlString = fromDateObj + toDateObj + statusObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.sender !== '') {
      this.urlString = fromDateObj + toDateObj + senderObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.status !== ''
      && this.searchForm.value.sender !== '') {
      this.urlString = fromDateObj + statusObj + senderObj;
      // 2 Values 
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== '') {
      this.urlString = fromDateObj + toDateObj;
    }else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.status !== '') {
      this.urlString = fromDateObj + statusObj;
    }else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.sender !== '') {
      this.urlString = fromDateObj + senderObj;
    }else if (this.searchForm.value.status !== '' && this.searchForm.value.sender !== '') {
      this.urlString = statusObj + senderObj;
      // 1 Value
    } else if (this.searchForm.value.fromDate !== '') {
      this.urlString = fromDateObj;
    } else if (this.searchForm.value.status !== '') {
      this.urlString = statusObj;
    } else if (this.searchForm.value.sender !== '') {
      this.urlString = senderObj;
    } else {
      this.urlString = null;
    }
    this.ssaService.getCorrectionList(this.urlString, this.rowId, this.pageId)
      .pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        if (data !== null && data.length !== 0) {
          this.allCorrectionList = data;        
       
          this.pageCount = Math.ceil(this.allCorrectionList[0].totalCount / this.pageId);
        } else {
          this.allCorrectionList = [];
          this.pageCount = 0;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }

  resetSearch(){
    this.searchForm.reset();
    this.searchForm.controls.status.setValue('', { onlySelf: true });
    this.getCorrectionList();
  }
  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      this.getCorrectionList()
    }
  }
  // Previous  Button
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.getCorrectionList()
    }
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