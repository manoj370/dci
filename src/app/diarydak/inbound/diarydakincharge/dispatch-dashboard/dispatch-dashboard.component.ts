import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/common-service/helper.service';
import { InboundservicesService } from '../../services/inboundservices.service';
import { ReceiptLanguageId } from '../models/dairyDak.model';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';


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
  selector: 'app-dispatch-dashboard',
  templateUrl: './dispatch-dashboard.component.html',
  styleUrls: ['./dispatch-dashboard.component.css']
})
export class DispatchDashboardComponent implements OnInit {
  viaList: any = [];
  languagesList: any = [];
  dashboardData: any = [];

  postalForm: FormGroup;
  searchForm: FormGroup;
  updateForm: FormGroup;
  rowId = 0;
  pageId = 5;
  pageCount: any;
  show = true;
  showtext = false;
  urlString: string;
  // barcode = '';
  // weight = '';
  staticLanguage: any = [];
  language: any;
  userid: any;
  dispatchNo: any;
  today = moment().format('YYYY-MM-DD');
  selecetdDat: any;
  maxDate: string;
  printAddress: FormGroup;
  navigationSubscription:any;
  // maxDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');
  constructor(public router: Router, public inbound: InboundservicesService,
    public tostar: ToastrService, public helper: HelperService, public fb: FormBuilder) { }

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
        this.dashboardData  = this.dashboardData;
      } else {
        this.dashboardData = [...this.dashboardData].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    }
    
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      via: [''],
      language: [''],
      dispatchNo: ['']
    });
    this.postalForm = this.fb.group({
      dispatchNumber: [''],
      language: ['']
    });
    this.updateForm = this.fb.group({
      barCode: ['',Validators.required],
      weight: ['']
    });
    this.printAddress = this.fb.group({
      dispatchNumber:['',Validators.compose([Validators.required,Validators.pattern("^[0-9]*$")])],
      language:['',Validators.compose([Validators.required])]
      })

    this.inbound.getViaList().subscribe((data) => {
      console.log(data);
      this.viaList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });

    this.inbound.getAllReceipetLanguage().subscribe((data: any) => {
      console.log(data);
      this.languagesList = data;
      this.staticLanguage = this.languagesList.filter(i => i.receiptLanguageId < 3);
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
    this.searchData();
     // Added for menu reload
this.navigationSubscription= this.router.events.pipe(
  filter((event: RouterEvent) => event instanceof NavigationEnd)
).subscribe(() => {
  this.inbound.getViaList().subscribe((data) => {
    console.log(data);
    this.viaList = data;
  }, error => {
    console.log(error);
    this.helper.errorMessage(error);
  });

  this.inbound.getAllReceipetLanguage().subscribe((data: any) => {
    console.log(data);
    this.languagesList = data;
    this.staticLanguage = this.languagesList.filter(i => i.receiptLanguageId < 3);
  }, error => {
    console.log(error);
    this.helper.errorMessage(error);
  });
  this.searchData();

});
// Added for menu reload
  }
  // Dashboard Lis
  searchData() {
    console.log(this.searchForm.value);
    this.searchForm.value.fromDate = this.searchForm.value.fromDate !== null ? this.searchForm.value.fromDate : '';
    this.searchForm.value.toDate = this.searchForm.value.toDate !== null ? this.searchForm.value.toDate : '';
    this.searchForm.value.via = this.searchForm.value.via !== null ? this.searchForm.value.via : '';
    this.searchForm.value.language = this.searchForm.value.language !== null ? this.searchForm.value.language : '';
    this.searchForm.value.dispatchNo = this.searchForm.value.dispatchNo !== null ? this.searchForm.value.dispatchNo : '';

    const fromDateObj = '&fromDate=' + this.searchForm.value.fromDate;
    const toDateObj = '&toDate=' + this.searchForm.value.toDate;
    const viaObj = '&postViaId=' + this.searchForm.value.via;
    const languageObj = '&languageId=' + this.searchForm.value.language;
    const dispatchObj = '&dispatchNo=' + this.searchForm.value.dispatchNo;
    // 5 Values Should Not Empty
    if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.language !== '' && this.searchForm.value.via !== ''
      && this.searchForm.value.dispatchNo !== '') {
      this.urlString = fromDateObj + toDateObj + viaObj + languageObj + dispatchObj;
      // 4 Values Not empty
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.language !== '' && this.searchForm.value.via !== '') {
      this.urlString = fromDateObj + toDateObj + viaObj + languageObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.language !== '' && this.searchForm.value.dispatchNo !== '') {
      this.urlString = fromDateObj + toDateObj + viaObj + dispatchObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.via !== '' && this.searchForm.value.dispatchNo !== '') {
      this.urlString = fromDateObj + toDateObj + languageObj + dispatchObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.language !== ''
      && this.searchForm.value.via !== '' && this.searchForm.value.dispatchNo !== '') {
      this.urlString = fromDateObj + viaObj + languageObj + dispatchObj;
      // 3 Values Not empty
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.via !== '') {
      this.urlString = fromDateObj + toDateObj + viaObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.language !== '') {
      this.urlString = fromDateObj + toDateObj + languageObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== ''
      && this.searchForm.value.dispatchNo !== '') {
      this.urlString = fromDateObj + toDateObj + dispatchObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.language !== ''
      && this.searchForm.value.via !== '') {
      this.urlString = fromDateObj + viaObj + languageObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.via !== ''
      && this.searchForm.value.dispatchNo !== '') {
      this.urlString = fromDateObj + viaObj + dispatchObj;
    } else if (this.searchForm.value.language !== '' && this.searchForm.value.via !== ''
      && this.searchForm.value.dispatchNo !== '') {
      this.urlString = languageObj + viaObj + dispatchObj;
      // 2  Values Not empty
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.toDate !== '') {
      this.urlString = fromDateObj + toDateObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.language !== '') {
      this.urlString = fromDateObj + languageObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.via !== '') {
      this.urlString = fromDateObj + viaObj;
    } else if (this.searchForm.value.fromDate !== '' && this.searchForm.value.dispatchNo !== '') {
      this.urlString = fromDateObj + dispatchObj;
    } else if (this.searchForm.value.language !== '' && this.searchForm.value.dispatchNo !== '') {
      this.urlString = languageObj + dispatchObj;
    } else if (this.searchForm.value.language !== '' && this.searchForm.value.via !== '') {
      this.urlString = languageObj + viaObj;
    } else if (this.searchForm.value.via !== '' && this.searchForm.value.dispatchNo !== '') {
      this.urlString = viaObj + dispatchObj;
      // 1 Value Not empty
    } else if (this.searchForm.value.fromDate !== '') {
      this.urlString = fromDateObj;
    } else if (this.searchForm.value.language !== '') {
      this.urlString = languageObj;
    } else if (this.searchForm.value.via !== '') {
      this.urlString = viaObj;
    } else if (this.searchForm.value.dispatchNo !== '') {
      this.urlString = dispatchObj;
    } else {
      this.urlString = null;
    }
    this.inbound.dispatchedNotesheets(this.urlString, this.rowId, this.pageId).subscribe((data: any) => {
      console.log(data);
      if (data !== null && data.length !== 0) {
        this.dashboardData = data;
        this.pageCount = Math.ceil(this.dashboardData[0].totalCount / this.pageId);
      } else {
        this.dashboardData = [];
        this.pageCount = 0;
      }
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      this.searchData();
    }
  }
  // Previous  Button
  prev() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.searchData();

    }
  }
  // ResetForm
  resetData() {
    this.searchForm.reset();
    this.searchForm.controls.via.setValue('', { onlySelf: true });
    this.searchForm.controls.language.setValue('', { onlySelf: true });
    this.searchData();
  }
  // updated Barcode
  updateBarcode(id: any) {
    const obj = {
      dispatchRecipientDetailId: id,
      weight: this.updateForm.value.weight,
      barCode: this.updateForm.value.barCode
    };
    this.inbound.updateBarcode(obj).subscribe((data: any) => {
      console.log(data);
      this.searchData();
      this.updateForm.reset();

    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  //Send Mail to Postal Dept
  sendEmailtoPostal() {
    this.inbound.sendEmailtoPostal(this.postalForm.value.userId, this.postalForm.value.dispatchNumber, 
      this.postalForm.value.language).subscribe(res => {
      console.log(res)
      this.tostar.success('Sent successfully', 'Success', {
        timeOut: 2000
      });
    }, error => {
      console.log(error);
      this.tostar.warning('Mail Already Sent for Given Dispatch number', '', {
        timeOut: 2000
      });
    });

  }
  selecetdDate(data: any) {
    console.log(data);
    this.selecetdDat = data;
    this.maxDate = moment(data).add(1, 'days').format('YYYY-MM-DD');
  }
  printAddresses() {
    // printAddressb 
    this.inbound.printAddress(this.printAddress.value.dispatchNumber,this.printAddress.value.language).subscribe((res: any) => {
      console.log(res)
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      console.log(fileURL)
      window.open(fileURL);

      // this.tostar.success('Sent successfully', 'Success', {
      //   timeOut: 2000
      // });
    }, error => {
      console.log(error);
      this.tostar.warning('Mail Already Sent for Given Dispatch number', '', {
        timeOut: 2000
      });
    });
  }
}


