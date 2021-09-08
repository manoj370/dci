import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignupService } from 'src/app/common-service/signup.service';
import { OutboundService } from '../../services/outbound.service';
import { urlServices } from '../../services/outboundServiceUrls';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
@Component({
  selector: 'app-viewdispatch',
  templateUrl: './viewdispatch.component.html',
  styleUrls: ['./viewdispatch.component.css']
})
export class ViewdispatchComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  updatedespatch: boolean;
  printdispatch: boolean;
  printbarcode: boolean;
  dispatchid: any;
  despatchinfo: any;
  docsarray: any = [];
  downloadUrl: string;
  updateForm :FormGroup;
  dispatchtypes: any = [];
  statuss: any;
  constructor(public router :Router,public signin: SignupService,public urls: urlServices, public tostar: ToastrService,
    public activatedRoute: ActivatedRoute,public outboundsvc: OutboundService,public fb:FormBuilder) { }

  ngOnInit(): void {
   this.checkPrivileges();
   this.getDispatchTypes();
   //Getting Id from dashboard  through url
   this.activatedRoute.params.subscribe((params: Params) => this.dispatchid = params.id);
   this.getDispatchById();
  //  Validations
  this.updateForm =this.fb.group({
'despatchType':['',Validators.required],
'date':['',Validators.required],
'despatchid':['',Validators.required],
'comments':['',Validators.required]
  });
 
  }
  // back button method
  back() {
    this.router.navigate(['main/internal/outbound/diarydaksechead/dashboard']);
    }
    // Access to privileges
   checkPrivileges() {
      this.signin.getLoginUserId().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        console.log(result.roles, 'result');
        if (result.roles !== null) {
          result.roles.map(element => {
            console.log(element.authorities);
            element.authorities.map(element => {
              console.log(element.authorityName);
              debugger
              if(element.authorityName === 'Update Despatch ID')
              {
                this.updatedespatch =true;
              } else if(element.authorityName === 'Print Despatch') {
                this.printdispatch = true;
               }
               else if(element.authorityName === 'Print Barcode') {
                this.printbarcode = true;
               }
            });
          });
        }
      });
    }
    // getDespatchById
getDispatchById() {
  this.outboundsvc.getDispatchById(this.dispatchid).pipe(takeUntil(this.subscribe)).subscribe(res=>{
    console.log(res);
    this.despatchinfo = res;
    console.log(this.despatchinfo.dispatchDocuments);
    this.docsarray =this.despatchinfo.dispatchDocuments;
    this.statuss = this.despatchinfo.dakStatus.statusName;
    if(this.despatchinfo.dakStatus.statusName === 'Approved'){
      this.updatedespatch = true;
    }else {
      this.updatedespatch =false;
    }
    if(this.despatchinfo.createdDate!==null)
    {
      var id = this.despatchinfo.createdDate;
      var arr = id.split("-");
      this.despatchinfo.createdDate=arr[2]+'-'+arr[1]+'-'+arr[0]
    }
   if(this.despatchinfo.createdDate!==null)
   {
    var id1 = this.despatchinfo.createdDate;
    var arr = id1.split("-");
    this.despatchinfo.createdDate=arr[2]+'-'+arr[1]+'-'+arr[0]
   }
  if(this.despatchinfo.createdDate!==null)
  {
    var id2= this.despatchinfo.createdDate;
    var arr = id2.split("-");
  this.despatchinfo.createdDate=arr[2]+'-'+arr[1]+'-'+arr[0]
  }
   console.log(this.despatchinfo.dispatchType.dispatchTypeId);
  this.updateForm.patchValue({
    'despatchType' :this.despatchinfo.dispatchType.dispatchTypeId,
     'date':this.despatchinfo.createdDate,
     'despatchid':this.despatchinfo.dispatchUpdateId,
     'comments':this.despatchinfo.comment
  });
  
  },error=>{
    console.log(error);
  });
}
// Download
public getDocumentId(data: any) {
  console.log(data.documentId, "id")
  this.downloadUrl = this.urls.documentUrl + '?uuid=' + data.documentId
  this.tostar.success('Document Downloaded Successfully', 'Success', {
    timeOut: 2000
  });
}
// resetting form method
  reset() {
    this.updateForm.reset();
  }
   // getDispatchTypes
   getDispatchTypes() {
    this.outboundsvc.getDispatchTypes().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.dispatchtypes = res;
    }, error => {
      console.log(error);
    });
  }
   // getting dispatchId
   dispatchId(value) {
    console.log(value);
  }

  // updatedispatchdetails
  updatedispatchdetails() {
let obj ={
    "comment": this.updateForm.value.comments,
    "dispatchId": this.dispatchid ,
    "dispatchType": {
    "dispatchTypeId": this.updateForm.value.despatchType
    },
    "dispatchUpdateDate": this.updateForm.value.date,
    "dispatchUpdateId": this.updateForm.value.despatchid
}
console.log(obj);
    this.outboundsvc.updatedispatchdetails(obj).pipe(takeUntil(this.subscribe)).subscribe(res=>{
      console.log(res);
      this.tostar.success('Dispatch Details Updated Successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['main/internal/outbound/diarydaksechead/dashboard']);
    },error=>{
      console.log(error);
    });
  }
  // validations
  get f() { return this.updateForm.controls; }
    // Destroy The Subscribe Dta
ngOnDestroy() {
  this.subscribe.next();
  this.subscribe.complete();
}
}
