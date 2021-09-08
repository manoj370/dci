import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OutboundService } from '../../services/outbound.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { JSAConstantServices } from '../../models/jsaconst.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { urlServices } from '../../services/outboundServiceUrls';
import { ToastrService } from 'ngx-toastr';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { appConstants } from 'src/app/common-service/const.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  dispatchId: number;
  submitted = false;
  sheetDetails: any;
  seekList: any = [];
  downloadUrl: string;
  personList: any = [];
  designationList: any = [];
  statesList: any = [];
  citiesList: any = [];
  seekApprovalForm: FormGroup;
  showSeekApproval = false;
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('correctModal') correctbtn: ElementRef<HTMLElement>;
  hidedfadetails: boolean = false;
  alladdressdetails: any;
  ccaddress: any;
  addressId: any;
  roleName: any;
  designation: any;
  returnCorrection: FormGroup;
  correctionPersonList: any=[];
  correctionSeekList: any;
  correctionDesignationList: any=[];
  correctiondata: any;
  noteSheetContentsForm:FormGroup;
  shownotesheeteditor: boolean =false;
  dfaForm: FormGroup;
  dfacontentvalue: string;
  showdfa: boolean =false;
  docid: any;
  docpath: any;
  bulkname: any;
  finalDocumentId: any;
  finaldownloadUrl: string;
  constructor(public fb: FormBuilder, public route: ActivatedRoute, public tostar: ToastrService, public usrMgtService: UsrmgtService,
    public jsaService: OutboundService, public helper: HelperService, public url: urlServices, public jsaConst: JSAConstantServices, private router: Router, public appConst: appConstants,) { }

  ngOnInit(): void {
    this.getDispatchDetails();
    this.seekApprovalForm = this.fb.group({
      designation: ['', Validators.required],
      person: ['', Validators.required],
      comment: ['']
    });
    this.returnCorrection = this.fb.group({
      designation: ['', Validators.compose([Validators.required])],
      person: ['', Validators.compose([Validators.required])],
      comment: ['', Validators.compose([Validators.required])]
    });
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    console.log(this.roleName);
    this.designation = JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName;
    this.correctionUserList();
    this.noteSheetContentsForm = this.fb.group({
      notesheetcontents: [''],
      
    })
    this.dfaForm = this.fb.group({
      dfasubject: [''],
      dfacontents: ['']
    })
  }
  getDispatchDetails() {
    // getDispatchById
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.dispatchId = +params.id;
      this.jsaService.getDispatchById(params.id).pipe(takeUntil(this.subscribe)).subscribe((data) => {
        console.log(data);
        this.sheetDetails = data;
        if (this.sheetDetails.address !== null) {
          this.getStates();
        }
        if (this.sheetDetails.dakStatus.statusName === 'SeekApproval') {
          this.showSeekApproval = false;
        }
        // else if(this.sheetDetails.dakStatus.statusName === 'SeekApproval' && this.roleName === 'Section Officer')
        // {
        //   this.showSeekApproval = true;
        // }
        else {
          this.showSeekApproval = true;
        }
        debugger
        if (this.sheetDetails.isDispatchWithDfa === false) {
          this.hidedfadetails = false;
        } else {
          this.hidedfadetails = true;
        }
        // console.log(atob( this.sheetDetails.dfaContents));
        // const htmlData=atob( this.sheetDetails.dfaContents);

        this.sheetDetails.noteSheetContents= atob(this.sheetDetails.noteSheetContents);
        this.sheetDetails.dfaContents= atob( this.sheetDetails.dfaContents);
        this.sheetDetails.dfaHindiContents= atob( this.sheetDetails.dfaHindiContents);
        console.log(this.sheetDetails.noteSheetContents);
        // console.log(this.sheetDetails.dakDispatchRecipientDetails);
      
        // this.sheetDetails.dakDispatchRecipientDetails.map(element => {
        // console.log(element.dakAddressType.name)
        // if(element.dakAddressType.name === 'CCAddress'){
        //   this.sheetDetails.dakDispatchRecipientDetails =this.sheetDetails.dakDispatchRecipientDetails.section.sectionName;
        // }
        // });
        console.log(this.addressId);
        if (this.sheetDetails.dispatchDocuments) {
          this.sheetDetails.dispatchDocuments.forEach(element => {
            const nameString = element.documentLocation;
            this.docid= element.documentId
              if (nameString !== null) {
                // const filename = nameString.split('/').pop();
                 console.log(nameString);
                  this.docpath =nameString
              }
            });
            this.finalDocumentId=this.sheetDetails.finalDocumentId;
        }
        if (this.sheetDetails.workFlowCode === this.designation) {
          this.showSeekApproval = true;
        } else {
          this.showSeekApproval = false;
        }
       this.sheetDetails.dakDispatchRecipientDetails.forEach(element => {
         if(element.isRecipientSingle === false){
          if(element.dakDispatchBulkCategory !==null){
            console.log(element.dakDispatchBulkCategory.name);
            this.bulkname =element.dakDispatchBulkCategory.name;
          }
         }
         
       });
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    });
  }

  get f() { return this.seekApprovalForm.controls; }
  // Downloded Files 
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  SeekList() {
    this.jsaService.seekApprovalList().pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
      console.log(list);
      this.personList = [];
      this.designationList = [];
      // this.seekApprovalForm.controls.person.reset();
      this.seekList = list;
      list.forEach((item) => {
        Object.keys(item).forEach((key) => {
          this.designationList.push(key);
        });
      });
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  selectedDesignation(data: any) {
    console.log(data);
    this.personList = [];
    this.seekApprovalForm.controls.person.setValue('', { onlySelf: true });
    this.seekList.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key === data) {
          this.personList = item[key];
          console.log(this.personList);
        }
      });
    });
  }

  seekApproval() {
    this.submitted = true;
    console.log(this.seekApprovalForm.value);
    if (this.seekApprovalForm.valid) {
      console.log(this.seekApprovalForm.value);
      const obj = {
        assignedToUserId: this.seekApprovalForm.value.person,
        comments: this.seekApprovalForm.value.comment ? this.seekApprovalForm.value.comment : " ",
        dispatchId: this.dispatchId,
        // workFlowName: JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName
        workFlowName: this.seekApprovalForm.value.designation
      };
      console.log(this.seekApprovalForm.value.comment);
      console.log(obj);
      this.jsaService.seekApprovalByUserIDAndComments(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.closeBtn.nativeElement.click();
        this.tostar.success('', 'Sent For Approval', {
          timeOut: 3000
        });
        this.reset();
        this.getDispatchDetails();
        this.router.navigate(['main/internal/outbound/se/dashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }
  // Get States
  getStates() {
    this.usrMgtService.getAllStates(1).pipe(takeUntil(this.subscribe)).subscribe(res => {
      this.statesList = res;
      this.statesList.forEach(element => {
if(this.sheetDetails.address){
        if (element.stateId === parseInt(this.sheetDetails.address.state)) {
          this.sheetDetails.address.state = element.stateName;
          this.getCities(element.stateId);
        }
      }
      });
      console.log(res);
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  // getCities
  getCities(value) {
    this.usrMgtService.getAllCities(value).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.citiesList = res;
      for (const iterator of this.citiesList) {
        if (iterator.cityId === parseInt(this.sheetDetails.address.city)) {
          this.sheetDetails.address.city = iterator.cityName;
        }
      }
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  reset() {
    this.seekApprovalForm.reset();
    this.seekApprovalForm.controls.designation.setValue('', { onlySelf: true });
    this.seekApprovalForm.controls.person.setValue('', { onlySelf: true });
    this.returnCorrection.reset();
    this.returnCorrection.controls.designation.setValue('', { onlySelf: true });
    this.returnCorrection.controls.person.setValue('', { onlySelf: true });
  }
  get g() { return this.returnCorrection.controls; }
  correctionUserList() {
    this.jsaService.getCorrectionUsersList(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
      console.log(list);
      this.personList = [];
      // this.seekApprovalForm.controls.person.reset();
      this.correctionSeekList = list;
      list.forEach((item) => {
        Object.keys(item).forEach((key) => {
          this.correctionDesignationList.push(key);
        });
      });
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  selectedCorrectionDesignation(data: any) {
    console.log(data);
    this.correctionPersonList = [];
    this.seekApprovalForm.controls.person.setValue('', { onlySelf: true });
    this.correctionSeekList.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key === data) {
          this.correctionPersonList = item[key];
          console.log(this.personList);
        }
      });
    });
  }
   // SendCorrection sentCorrection
   sendCorrection() {
    this.submitted = true;
    if (this.returnCorrection.valid) {
      console.log(this.returnCorrection.value);
      const obj = {
        assignedToUserId: this.returnCorrection.value.person,
        comments: this.returnCorrection.value.comment,
        dispatchId: this.dispatchId,
        whoAssignedUserId: sessionStorage.getItem('userId-usec'),
        workFlowName: this.returnCorrection.value.designation,
      };
      // {
      //   "assignedToUserId": 314,
      //   "comments": "Change Spellings",
      //   "dispatchId": 327,
      //   "whoAssignedUserId": 147,
      //   "workFlowName": "Senior Secretariat Assistant"
      //   }
      console.log(obj);
      this.jsaService.sentCorrection(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.correctiondata = data;
        console.log(this.correctiondata.comments);
        this.getDispatchDetails();
        this.tostar.success('Correction Sent Successfully', 'Success', {
          timeOut: 2000
        });
        this.submitted = false;
        this.correctbtn.nativeElement.click();
        this.reset();
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }

  }
  // editnoteSheet
  editnoteSheet(){
    this.shownotesheeteditor =true;
    this.noteSheetContentsForm.patchValue({
      notesheetcontents:this.sheetDetails.noteSheetContents
    })
  }
  // update notesheet
  updateNotesheetContents(){
   const obj={
    "dispatchId": this.dispatchId,
    "noteSheetContents": atob(btoa(this.noteSheetContentsForm.value.notesheetcontents))
   }
   console.log(obj);
  this.jsaService.minorCorrection(obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('Success', 'Updated Successfully')
      this.getDispatchDetails();
      this.shownotesheeteditor = false;
    }, error => {
      console.log(error);
      this.tostar.error('', 'Updated Failed');
    })
  }
  // editdfa
  editdfa() {
    this.showdfa = true;
    this.dfaForm.patchValue({
      dfasubject: this.sheetDetails.dfaSubject,
      dfacontents: this.sheetDetails.dfaContents
    })
  }
  updateDfa() {
    console.log(this.dfaForm.value);
    console.log(btoa(this.dfaForm.value.dfacontents))
    this.dfacontentvalue = btoa(this.dfaForm.value.dfacontents);
    console.log(atob(this.dfacontentvalue));
    const obj = {
      "dispatchId": this.dispatchId,
      "dfaSubject": this.dfaForm.value.dfasubject,
      "dfaContents": atob(this.dfacontentvalue),
      "dispatchComments": null
    }
    console.log(obj);
    this.jsaService.minorCorrection(obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('Success', 'Updated Successfully')
      this.getDispatchDetails();
      this.showdfa = false;
    }, error => {
      console.log(error);
      this.tostar.error('', 'Updated Failed');
    })
  }
  // back
  back(){
    this.router.navigate(['/main/internal/outbound/se/dashboard'])
  }
   // previewPdf
   previewDoc(id:any){
     debugger
    this.jsaService.previewDoc(id).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
      console.log(res);
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    },error=>{
      console.log(error);
    })
  }
   // previewPdf
   previewPdf(){
    this.jsaService.previewPdf(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
      console.log(res);
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    },error=>{
      console.log(error);
    })
  }
  // Preview After send For Dispatch
  public previewFinalLetter(id: any) {
    console.log(id);
    // console.log(this.docpath);
    // this.jsaService.previewFinalLetter(id,this.docpath).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
    //   console.log(res);
    //   const fileURL = URL.createObjectURL(res);
    //   window.open(fileURL, '_blank');
    // },error=>{
    //   console.log(error);
    // })
    this.finaldownloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}

