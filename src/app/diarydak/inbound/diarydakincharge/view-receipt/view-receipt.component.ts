import { Component, OnInit } from '@angular/core';
import { InboundservicesService } from '../../services/inboundservices.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { urlServices } from '../../services/inboundServiceUrls';
@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent implements OnInit {
  userArray: any = [];
  subscribe: Subject<any> = new Subject<any>();
  receiptId: any;
  receiptData: any;
  downloadUrl: string;
  sectionName: any;
  history: any=[];
  showcomments: boolean =false;
  sectionNames: any=[];
  firstNames: any =[];
  lastNames: any =[];
  comments: any=[];
  names: any=[];
;

  constructor(public service: InboundservicesService, private route: ActivatedRoute,public urls: urlServices,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id
    console.log(id);
    this.receiptId = id;
    this.getReceiptDetailsById();
    // this.sectionName =JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName
    this.getHistoryOfReceipt();
    this.getAllFwdReceiptById();
    this.getHistoryUpToSecHeadAssign();
  }
  getReceiptDetailsById() {
    this.service.getReceiptData(this.receiptId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result);
      this.receiptData =result;
    });

  }
  public getDocumentId(id: any) {
    this.downloadUrl = this.urls.documentUrl + '?uuid=' + id.documentId
  }
  getAllUserList() {
    this.service.getAllUserList().subscribe((result: any) => {
      console.log(result, "users")
      result.forEach(element => {
        element.roles.forEach(element1 => {
          if (element1.roleName === "Secretary") {
            console.log(element, "user");
            this.userArray.push(element)
          }
        });
      });
    })
  }
  getHistoryOfReceipt() {
    this.service.getHistoryByReceiptId(this.receiptId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
     console.log(result);
     this.history =result;
     debugger
     result.forEach(element => {
       debugger
          if(element.dakStatus.statusName ==="Forwarded" || element.dakStatus.statusName =="Assigned"){
      this.showcomments =true;
     }else{
       this.showcomments =false;
     }
    //  this.sectionName =element.assignedToUserId.section.sectionName
    //  this.sectionNames.push(this.sectionName);
     
     });
  console.log(this.sectionNames);
    }, error => {
     console.log(error);
    });
  }
  getAllFwdReceiptById(){
    this.service.getAllFwdReceiptById(this.receiptId).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
      console.log(res);
      res.forEach(element => {
        this.sectionName =element.assignedToUserId.section.sectionName
        this.sectionNames.push(this.sectionName);        
        });
    },error=>{
      console.log(error);
    })
  }
  getHistoryUpToSecHeadAssign(){
    this.service.getHistoryUpToSecHeadAssign(this.receiptId).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
      console.log(res);
      res.forEach(element => {
        this.names.push({ name: element.assignedToUserId.firstName, comments: element.comments });
        console.log(this.names);
        //this.comments.push(element.comments);
      });
    },error=>{
      console.log(error);
    })
  }
}
