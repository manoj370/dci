import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InboundservicesService } from '../../services/inboundservices.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-secretary-dashboard',
  templateUrl: './secretary-dashboard.component.html',
  styleUrls: ['./secretary-dashboard.component.css']
})
export class SecretaryDashboardComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  receiptData: any=[];
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
  myProperty: any;
  dataa: any;
  searchdatalist: any;
  receiptCounts: any;
  constructor(public router: Router, public service: InboundservicesService) { }

  ngOnInit(): void {
    this.getAllReceiptList();
    this.getReceiptCounts();
    this.searchValue('');
  }

  //getAllReceiptList
  getAllReceiptList() {
    this.service.getAllReceiptsByUserIdAndStatus(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId,"Forwarded",this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result)
       this.receiptData = result;
       this.responsePageCount = this.receiptData[0].pageCount;
    })
    // this.service.getListOfRecpeits(this.pageId,this.rowId).subscribe(result=>{
    //   console.log(result)
    //   this.receiptData = result;
    //   this.responsePageCount = this.receiptData[0].pageCount;
    // })

  }
  // view(data: any) {
  //   sessionStorage.setItem('tdata', data);
  //   this.router.navigate(['/inbound/secretary/view-receipt']);
  // }
  getFilterValue(event) {
    this.event=event
   
    this.service.getReceiptDetailsByStatus(event,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe(result => {
      this.receiptData = result;
      this.responsePageCount = this.receiptData[0].pageCount;
      console.log(this.responsePageCount,"responsePageCount")
      this.status="filterSearch"

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
if(date.startDate !== null)
{
  this.service.getReceiptListByUsingDate(this.fromDate,this.toDate,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result:any)=>
  {
    this.receiptData = result;
     this.responsePageCount = this.receiptData[0].pageCount;
    this.status="dateSearch"
  })
}
  }
  //getReceiptCounts
  getReceiptCounts() {
    this.service.getReceiptCounts().subscribe((result: any) => {
      console.log(result);
      this.receiptCounts = result;
      console.log(  this.receiptCounts.totalReceipts)
    })
  }
  //Previous Button
 previ() {
  if (this.pageId >= 1) {
    --this.pageId;
    console.log(this.pageId);
    if(this.status === 'dateSearch')
    {
      this.service.getReceiptListByUsingDate(this.fromDate,this.toDate,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result:any)=>
      {
        this.receiptData = result;
       
      })
    }
    else if(this.status === 'filterSearch')
    {
      this.service.getReceiptDetailsByStatus(this.event,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe(result => {
        this.receiptData = result;
        console.log(this.receiptData)
        this.status="filterSearch"
  
        // this.listofReceipts.sort((a, b) => {
        //   return a.receiptId - b.receiptId;
        // });
      })
    }
    else if(this.status === "search")
    {
      this.service.searchReceipt(this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        if (res.length !== 0) {
          this.searchdatalist = res;
          this.receiptData = this.searchdatalist;
          this.status = "search";
        }
      }, error => {
      });
    }
    else{
      this.service.getAllReceiptsByUserIdAndStatus(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId,"Forwarded",this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        console.log(result)
         this.receiptData = result;
        // this.responsePageCount = this.receiptData[0].pageCount;
      })
      // this.service.getListOfRecpeits(this.pageId,this.rowId).subscribe(result=>{
      //   console.log(result)
      //   this.receiptData = result;
      //   this.responsePageCount = this.receiptData[0].pageCount;
      // })
    }
   

   

  }
}
//Next Button 
next() {
  if (this.pageId + 1 <= this.responsePageCount - 1) {
    ++this.pageId;
    console.log(this.rowId);
    if(this.status === 'dateSearch')
    {
      this.service.getListOfRecpeits(this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe(result=>{
        console.log(result)
        this.receiptData = result;
        this.responsePageCount = this.receiptData[0].pageCount;
      })
  
    }
    else if(this.status === 'filterSearch')
    {
      this.service.getReceiptDetailsByStatus(this.event,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe(result => {
        this.receiptData = result;
        console.log(this.receiptData)
  
      })
    }
    else if(this.status === "search")
    {
      this.service.searchReceipt(this.dataa, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        if (res.length !== 0) {
          this.searchdatalist = res;
          this.receiptData = this.searchdatalist;
          this.status = "search";
        }
      }, error => {
      });
    }
    else{
      this.service.getAllReceiptsByUserIdAndStatus(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId,"Forwarded",this.pageId,this.rowId).subscribe((result: any) => {
        console.log(result)
         this.receiptData = result;
        // this.responsePageCount = this.receiptData[0].pageCount;
      })
      // this.service.getListOfRecpeits(this.pageId,this.rowId).subscribe(result=>{
      //   console.log(result)
      //   this.receiptData = result;
      //   this.responsePageCount = this.receiptData[0].pageCount;
      // })

    }
   
  }

}

searchValue(data: any) {
  debugger
  console.log(data)
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
    this.getAllReceiptList() 
  }
}
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
