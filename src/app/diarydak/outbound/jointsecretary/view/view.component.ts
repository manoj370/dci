import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { urlServices } from '../../services/outboundServiceUrls';
import { OutboundService } from '../../services/outbound.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { JSAConstantServices } from '../../models/jsaconst.model';
import { ToastrService } from 'ngx-toastr';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { appConstants } from 'src/app/common-service/const.model';
import { error } from 'protractor';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  seekList: any;
  dispatchId: any;
  radioValue: any;
  submitted = false;
  files: any = [];
  despatchInfo: any;
  downloadUrl: string;
  personList: any = [];
  approveForm: FormGroup;
  designationList: any = [];
  seekApprovalForm: FormGroup;
  returnCorrection: FormGroup;
  documentForm: FormGroup;
  statesList: any = [];
  citiesList: any = [];
  correctionSeekList: any = [];
  correctionPersonList: any = [];
  correctionDesignationList: any = [];
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('minorDismissModal') minorCloseBtn: ElementRef<HTMLElement>;
  flag = false;
  showSeekApproval = false;
  @ViewChild('approveDismissModal') approveCloseBtn: ElementRef<HTMLElement>;
  @ViewChild('myInput') myInputVariable: ElementRef;
  hidedfadetails: boolean = false;
  approvePdf: any;
  fileapproveSigned: any;
  obj: any;
  doucumentId: any;
  documentUrl: any;
  documentUnsignedUrl :any
  downloadunsignedpdf: string;
  doucumentunsignedId: any;
  approveSignForm:FormGroup;
  designation: any;
  roleName: string;
  public loading: boolean;
  finaldownloadUrl: string;
  finalDocumentId: any;
  constructor(public router: Router, public fb: FormBuilder, public activatedRoute: ActivatedRoute, public tostar: ToastrService,
    public url: urlServices, public outboundServ: OutboundService, public appConst: appConstants, public usrMgtService: UsrmgtService, public helper: HelperService, public jsaConst: JSAConstantServices) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.dispatchId = params.id);
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    console.log(this.roleName);
    this.getDispatchById();
    this.documentForm = this.fb.group({
      type: ['', Validators.required]
    });
    this.approveForm = this.fb.group({
      comment: ['', Validators.compose([Validators.required])]
    });
    this.seekApprovalForm = this.fb.group({
      designation: ['', Validators.compose([Validators.required])],
      person: ['', Validators.compose([Validators.required])],
      comment: ['']
    });
    this.returnCorrection = this.fb.group({
      designation: ['', Validators.required],
      person: ['', Validators.required],
      comment: ['', Validators.required]
    });
    this.getUnsignedPdf();
    this.approveSignForm = this.fb.group({
      file:['',Validators.required]
    })
    this.designation =JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName;
  }
  get f() { return this.seekApprovalForm.controls; }
  get g() { return this.returnCorrection.controls; }

  // File upload
  getFileDetails(e) {
    console.log(e.target.files);
    this.files = e.target.files;
  }
  filSelectedType(data: any) {
    console.log(data);
    console.log(this.files);
    this.reset();
    console.log(this.files);
  }
  dispatchApprove() {
    if (this.approveForm.valid) {
      this.loading = true;
      const obj = {
        comments: this.approveForm.value.comment,
        dispatchId: this.dispatchId,
        workFlowName: JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName
      };
      this.outboundServ.dispatchApprove(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.submitted = false;
        this.approveCloseBtn.nativeElement.click();
        // this.reset();
        this.tostar.success('Approved & Finalized Successfully', 'Success', {
          timeOut: 2000
        });
        this.getUnsignedPdf();
        this.getDispatchById();
      }, error => {
        this.loading = false;
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }

  ecToggle() {
    const flagValue = this.flag === true ? true : false;
    this.outboundServ.ecToggle(this.dispatchId, flagValue).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.tostar.success('Updated EC Circulation Successfully', 'Success', {
        timeOut: 2000
      });
      this.getDispatchById();
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // Downloaded Files
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  back() {
    this.router.navigate(['main/internal/outbound/jointSecretary/dashboard']);
  }

  // getDespatchById
  getDispatchById() {
    this.outboundServ.getDispatchById(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.despatchInfo = res;
      this.finalDocumentId=this.despatchInfo.finalDocumentId;
      console.log(this.finalDocumentId);
      this.flag = this.despatchInfo.eccirculationsToggle;
      this.correctionUserList();
      this.SeekList();  // Seek List
      if (this.despatchInfo.address !== null) {
        this.getStates();
      }
      if ((this.despatchInfo.dakStatus.statusName === 'DraftCreated' || this.despatchInfo.dakStatus.statusName === 'Corrected'
        || this.despatchInfo.dakStatus.statusName === 'underCorrection' || this.despatchInfo.dakStatus.statusName === 'SeekApproval')) {
        this.showSeekApproval = true;
      } else {
        this.showSeekApproval = false;
      }
      if (this.despatchInfo.isDispatchWithDfa === false) {
        this.hidedfadetails = false;
      } else {
        this.hidedfadetails = true;
      }
      console.log(this.despatchInfo.dispatchDocuments);
      // this.documentForm.controls.type.patchValue(this.despatchInfo.isDarft === true ? 'Draft' : 'Final');
      this.despatchInfo.noteSheetContents = atob(this.despatchInfo.noteSheetContents);
      this.despatchInfo.dfaContents = atob(this.despatchInfo.dfaContents);
      this.despatchInfo.dfaHindiContents = atob(this.despatchInfo.dfaHindiContents);
      if (this.despatchInfo.dispatchDocuments) {
        this.despatchInfo.dispatchDocuments.forEach(element => {
          const nameString = element.documentLocation;
          if (nameString !== null) {
            const filename = nameString.split('/').pop();
            element.documentLocation = filename;
          }
        });
      }
      if(this.despatchInfo.workFlowCode === this.designation){
        this.showSeekApproval=true;
      }else{
        this.showSeekApproval=false;
      }
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  getStates() {
    this.usrMgtService.getAllStates(1).pipe(takeUntil(this.subscribe)).subscribe(res => {
      this.statesList = res;
      this.statesList.forEach(element => {
        if (element.stateId === parseInt(this.despatchInfo.address.state)) {
          this.despatchInfo.address.state = element.stateName;
          this.getCities(element.stateId);
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
        if (iterator.cityId === parseInt(this.despatchInfo.address.city)) {
          this.despatchInfo.address.city = iterator.cityName;
        }
      }
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  correctionUserList() {
    this.outboundServ.getCorrectionUsersList(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
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
      console.log(obj);
      this.outboundServ.sentCorrection(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.submitted = false;
        this.minorCloseBtn.nativeElement.click();
        this.tostar.success('Return For Correction', 'Sent Successfully')
        
        this.getDispatchById();
        this.reset();
      }, error => {
        console.log(error);
        this.tostar.success('Return For Correction', 'Failed');
        this.helper.errorMessage(error);
      });
    }

  }

  SeekList() {
    this.outboundServ.seekApprovalList().pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
      console.log(list);
      this.personList = [];
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
          this.helper.sortedData(this.personList, 'firstName');
        }
      });
    });
  }
  // Seek ApprovalForm 
  seekApproval() {
    this.submitted = true;
    console.log(this.seekApprovalForm.value);
    if (this.seekApprovalForm.valid) {
      console.log(this.seekApprovalForm.value);
      const obj = {
        assignedToUserId: this.seekApprovalForm.value.person,
        comments: this.seekApprovalForm.value.comment ? this.seekApprovalForm.value.comment :" ",
        dispatchId: this.dispatchId,
        // workFlowName: JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName
        workFlowName: this.seekApprovalForm.value.designation
      };
      console.log(obj);
      this.outboundServ.seekApprovalByUserIDAndComments(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.closeBtn.nativeElement.click();
        this.tostar.success('', 'Sent For Approval', {
          timeOut: 3000
        });
        // this.reset();
        // this.getDispatchById();
       this.router.navigate(['main/internal/outbound/jointSecretary/dashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
        this.tostar.error('Seek Approval', 'Failed');
      });
    }
  }
  upload() {
    console.log(this.documentForm.value);
    const tye = this.documentForm.value.type === 'Draft' ? true : false;
    this.outboundServ.updateDocument(this.dispatchId, tye, this.flag, this.files).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.reset();
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // FileFor Approved Signed Pdf
  SelectFile(event) {
    console.log(event.target.files[0]);
    this.fileapproveSigned = event.target.files[0];
  }
  // getUnsigned Pdf
  getUnsignedPdf() {
    this.outboundServ.getUnsignedPdf(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.doucumentunsignedId = res.documentId;
      this.documentUnsignedUrl = res.documentLocation;
      console.log(this.doucumentunsignedId);
      console.log(this.documentUnsignedUrl);
      // this.downloadUnsignedPdf(this.doucumentId);
    }, error => {
      console.log(error);
    })
  }
  //Downloaded UnsignedPdf
  public downloadUnsignedPdf(id: any) {
    console.log(this.documentUnsignedUrl);
    console.log(id);
    console.log(this.documentUnsignedUrl + '?uuid=' + id)
    this.downloadunsignedpdf = this.url.documentUrl + '?uuid=' + id;
    this.tostar.success('','Downloaded Successfully');
  }
  // Approve Signed Pdf
  getuploadSignedPdf() {
    this.submitted=true;
    if(this.approveSignForm.valid){
    this.outboundServ.uploadSignedPdf(this.dispatchId, this.fileapproveSigned).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result);
      //this.approvePdf = result;
      this.tostar.success('','Letter Uploaded Successfully');
      this.approveSignForm.reset();
    }, error => {
      console.log(error);
      this.tostar.warning('','Already Approved')
      this.approveSignForm.reset();
      this.helper.errorMessage(error);
    });
  }
  }
  //sendMailDispatch
  sendMailDispatch() {
    this.outboundServ.sendMailDispatch(this.dispatchId, this.obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result);
      this.tostar.success('', 'Send Dispatch Successfully');
      this.getDispatchById();
    }, error => {
      console.log(error);
      // this.helper.errorMessage(error);
      this.tostar.error('', 'Please Upload Letter First');
    });
  }
  reset() {
    this.submitted = false;
    this.approveForm.reset();
    this.seekApprovalForm.reset();
    this.returnCorrection.reset();
    this.files = [];
    this.seekApprovalForm.controls.designation.setValue('', { onlySelf: true });
    this.seekApprovalForm.controls.person.setValue('', { onlySelf: true });
    this.returnCorrection.controls.designation.setValue('', { onlySelf: true });
    this.returnCorrection.controls.person.setValue('', { onlySelf: true });
    // this.myInputVariable.nativeElement.value = '';
    this.approveSignForm.reset();
  }
   // previewPdf
   previewPdf(){
    this.outboundServ.previewPdf(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
      console.log(res);
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    },error=>{
      console.log(error);
    })
  }
  // Preview After send For Dispatch
  public previewFinalLetter(id: any) {
    // console.log(this.documentUnsignedUrl);
    // console.log(id);
    // this.outboundServ.previewFinalLetter(id,this.documentUnsignedUrl).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
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
