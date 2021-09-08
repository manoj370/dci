import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InboundservicesService } from '../../services/inboundservices.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { urlServices } from 'src/app/griviance/models/url.models';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-secretaryviewreceipt',
  templateUrl: './secretaryviewreceipt.component.html',
  styleUrls: ['./secretaryviewreceipt.component.css']
})
export class SecretaryviewreceiptComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  status: string;
  reassignbutton: boolean;
  assignbutton: boolean;
  receiptId: any;
  receiptData: any;
  evidanceArray: any = [];
  downloadUrl: string;
  userArray: any;
  assignReceiptForm: FormGroup
  stateName: any;
  cityName: any;
  assigngedUserDetails: any=[];

  constructor(public router: Router, public service: InboundservicesService, public fb: FormBuilder, public urls: urlServices, public usrmgtService: UsrmgtService, public aroute: ActivatedRoute, public tostar: ToastrService) {
    this.assignReceiptForm = this.fb.group({
      sectionIncharge: ['', Validators.required],
      comments: ['', Validators.required],
    })

  }
  ngOnInit(): void {

    const id = this.aroute.snapshot.params.id
    if (id != '') {
      this.getReceiptById(id);
      this.receiptId = id;
      this.getHistoryOfReceipt(this.receiptId);

    }


    this.getRoleByRoleID();
  }
  getRoleByRoleID() {
    this.service.getUserListByRole('ARPMSecInCharge').pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result, 'Roles');
      this.userArray=result
    })
  }
  getHistoryOfReceipt(id) {
    this.service.getHistoryByReceiptId(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result[1], "History")
        this.assigngedUserDetails.push(result[1])
    })
  }

 
  getReceiptById(id) {

    this.service.getReceiptData(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result, "result")
      this.receiptData = result
      this.getStateById(result.senderAddress.state)
      this.getCityId(result.senderAddress.city)
      if (result.dakStatus.statusName === 'Assigned') {
        this.reassignbutton = false;
        this.assignbutton = false;
      } else if(result.dakStatus.statusName === 'Returned') {
        this.reassignbutton = true;
        this.assignbutton = false;
      }
      else if(result.dakStatus.statusName === 'Forwarded') {
        this.reassignbutton = false;
        this.assignbutton = true;
      }
      this.evidanceArray.push({ "document": result.receiptDocuments.documentId })
    })
  }
  getCityId(city: any) {
    this.usrmgtService.getCityById(city).pipe(takeUntil(this.subscribe)).subscribe(((result: any) => {
      this.cityName = result.cityName;
      console.log(this.cityName)
    }))
  }
  getStateById(id) {
    this.usrmgtService.getStateById(id).subscribe((result: any) => {
      this.stateName = result.stateName;
      console.log(this.stateName)
    })
  }

  back() {
    this.router.navigate(['/main/internal/inbound/secretary']);
  }

  assignReceipt() {
    this.service.assignToSetionIncharge(this.receiptId, this.assignReceiptForm.get('sectionIncharge').value, this.assignReceiptForm.get('comments').value).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result)
      this.tostar.success('Receipt Assigned Successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['/main/internal/inbound/secretary']);
    })
  }
  reAssignReceipt() {
    this.service.reAssignedToSetionIncharge(this.receiptId, this.assignReceiptForm.get('sectionIncharge').value, this.assignReceiptForm.get('comments').value).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result)
      this.tostar.success('Receipt ReAssigned Successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['/main/internal/inbound/secretary']);
    })
  }
  // Download
  public getDocumentId(id: any) {
    console.log(id, "id")
    this.downloadUrl = this.urls.documentUrl + '?uuid=' + id.documentId
  }
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
