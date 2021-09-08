import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OutboundService } from '../../services/outbound.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { JSAConstantServices } from '../../models/jsaconst.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { urlServices } from '../../services/outboundServiceUrls';
import { ToastrService } from 'ngx-toastr';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  files: any = [];
  dispatchId: any;
  despatchinfo: any;
  docsarray: any = [];
  statuss: any;
  approveForm: FormGroup;
  returnCorrection: FormGroup;
  submitted = false;
  sheetDetails: any;
  seekList: any = [];
  downloadUrl: string;
  personList: any = [];
  correctionSeekList: any = [];
  designationList: any = [];
  correctionPersonList: any = [];
  correctionDesignationList: any = [];
  flag = false;
  statesList: any = [];
  citiesList: any = [];
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('approveDismissModal') approveCloseBtn: ElementRef<HTMLElement>;
  hidedfadetails: boolean = false;
  documentUnsignedUrl: any;
  downloadunsignedpdf: string;
  obj: any;
  fileapproveSigned: any;
  doucumentunsignedId: any;
  approveSignForm:FormGroup;
  roleName: any;
  public loading: boolean;
  finalDocumentId: any;
  finaldownloadUrl: string;
  constructor(public router: Router, public route: ActivatedRoute, public fb: FormBuilder, public helper: HelperService,
    public url: urlServices, public activatedRoute: ActivatedRoute, public outboundsvc: OutboundService,
    public usrMgtService: UsrmgtService,
    public jsaConst: JSAConstantServices, public tostar: ToastrService) { }


  ngOnInit(): void {
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    console.log(this.roleName);
    //Getting Id from dashboard  through url
    this.activatedRoute.params.subscribe((params: Params) => this.dispatchId = params.id);
    this.getDispatchById();
    this.approveForm = this.fb.group({
      comment: ['', Validators.compose([Validators.required])]
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
  }
  get g() { return this.returnCorrection.controls; }
  back() {
    this.router.navigate(['main/internal/outbound/secretary/dashboard']);
  }


  // getDespatchById
  getDispatchById() {
    this.outboundsvc.getDispatchById(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((res:any) => {
      console.log(res);
      this.despatchinfo = res;
      this.finalDocumentId=this.despatchinfo.finalDocumentId;
      this.flag = this.despatchinfo.eccirculationsToggle;
      this.correctionUserList();
      if (this.despatchinfo.address !== null) {
        this.getStates();
      }
      if (this.despatchinfo.isDispatchWithDfa === false) {
        this.hidedfadetails = false;
      } else {
        this.hidedfadetails = true;
      }
      console.log(this.despatchinfo.dispatchDocuments);
      this.despatchinfo.noteSheetContents = atob(this.despatchinfo.noteSheetContents);
      this.despatchinfo.dfaContents = atob(this.despatchinfo.dfaContents);
      this.despatchinfo.dfaHindiContents = atob(this.despatchinfo.dfaHindiContents);
      if (this.despatchinfo.dispatchDocuments) {
        this.despatchinfo.dispatchDocuments.forEach(element => {
          const nameString = element.documentLocation;
          if (nameString !== null) {
            const filename = nameString.split('/').pop();
            // console.log(filename);
            element.documentLocation = filename;
          }
        });
      }
    }, error => {
      console.log(error);
    });
  }
  getStates() {
    this.usrMgtService.getAllStates(1).pipe(takeUntil(this.subscribe)).subscribe(res => {
      this.statesList = res;
      this.statesList.forEach(element => {
        if (element.stateId === parseInt(this.despatchinfo.address.state)) {
          this.despatchinfo.address.state = element.stateName;
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
        if (iterator.cityId === parseInt(this.despatchinfo.address.city)) {
          this.despatchinfo.address.city = iterator.cityName;
        }
      }
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  correctionUserList() {
    this.outboundsvc.getCorrectionUsersList(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
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
      // {
      //   "assignedToUserId": 314,
      //   "comments": "Change Spellings",
      //   "dispatchId": 327,
      //   "whoAssignedUserId": 147,
      //   "workFlowName": "Senior Secretariat Assistant"
      //   }
      console.log(obj);
      this.outboundsvc.sentCorrection(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.submitted = false;
        this.closeBtn.nativeElement.click();
        this.tostar.success('Sent For Correction Successfully', 'Success', {
          timeOut: 2000
        });
        this.reset();
        this.getDispatchById();
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }

  dispatchApprove() {
    if (this.approveForm.valid) {
      this.loading = true;
      const obj = {
        comments: this.approveForm.value.comment,
        dispatchId: this.dispatchId,
        workFlowName: JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName
      };
      this.outboundsvc.dispatchApprove(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.submitted = false;
        this.approveCloseBtn.nativeElement.click();
        this.reset();
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
    this.outboundsvc.ecToggle(this.dispatchId, flagValue).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
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

  reset() {
    this.approveForm.reset();
    this.returnCorrection.reset();
    this.returnCorrection.controls.designation.setValue('', { onlySelf: true });
    this.returnCorrection.controls.person.setValue('', { onlySelf: true });
    this.approveSignForm.reset();
  }
  // SeekList() {
  //   this.outboundsvc.seekApprovalList().pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
  //     console.log(list);
  //     this.personList = [];
  //     // this.returnCorrection.controls.person.reset();
  //     this.seekList = list;
  //     list.forEach((item) => {
  //       Object.keys(item).forEach((key) => {
  //         this.designationList.push(key);
  //       });
  //     });
  //   }, error => {
  //     console.log(error);
  //     this.helper.errorMessage(error);
  //   });
  // }
  // selectedDesignation(data: any) {
  //   console.log(data);
  //   this.personList = [];
  //   this.returnCorrection.controls.person.setValue('', { onlySelf: true });
  //   this.seekList.forEach((item) => {
  //     Object.keys(item).forEach((key) => {
  //       if (key === data) {
  //         this.personList = item[key];
  //         console.log(this.personList);
  //       }
  //     });
  //   });
  // }

  // seekApproval() {
  //   this.submitted = true;
  //   console.log(this.returnCorrection.value);
  //   if (this.returnCorrection.valid) {
  //     console.log(this.returnCorrection.value);
  //     const obj = {
  //       assignedToUserId: this.returnCorrection.value.person,
  //       comments: this.returnCorrection.value.comment,
  //       dispatchId: this.dispatchId,
  //       workFlowName: JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName
  //     };
  //     console.log(obj);
  //     this.outboundsvc.seekApprovalByUserIDAndComments(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
  //       console.log(data);
  //       this.closeBtn.nativeElement.click();
  //       this.reset();
  //     }, error => {
  //       console.log(error);
  //       this.helper.errorMessage(error);
  //     });
  //   }
  // }
  // Downloded Files 
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
   // getUnsigned Pdf
   getUnsignedPdf() {
    this.outboundsvc.getUnsignedPdf(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
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
  // FileFor Approved Signed Pdf
  SelectFile(event) {
    console.log(event.target.files[0]);
    this.fileapproveSigned = event.target.files[0];
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
    this.outboundsvc.uploadSignedPdf(this.dispatchId, this.fileapproveSigned).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result);
      //this.approvePdf = result;
      this.tostar.success('','Letter Uploaded Successfully')
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
    this.outboundsvc.sendMailDispatch(this.dispatchId, this.obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result);
      this.tostar.success('', 'Send Dispatch Successfully');
      this.getDispatchById();
    }, error => {
      console.log(error);
      // this.helper.errorMessage(error);
      this.tostar.error('', 'Please Upload Letter First');
    });
  }
   // previewPdf
   previewPdf(){
    this.outboundsvc.previewPdf(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
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
    // this.outboundsvc.previewFinalLetter(id,this.documentUnsignedUrl).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
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
