import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignupService } from 'src/app/common-service/signup.service';
import { OutboundService } from '../../services/outbound.service';
import { urlServices } from '../../services/outboundServiceUrls';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
import { HelperService } from 'src/app/common-service/helper.service';
import { JSAConstantServices } from '../../models/jsaconst.model';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { appConstants } from 'src/app/common-service/const.model';
import { error } from 'protractor';
@Component({
  selector: 'app-viewdispatch',
  templateUrl: './viewdispatch.component.html',
  styleUrls: ['./viewdispatch.component.css']
})
export class ViewdispatchComponent implements OnInit, OnDestroy {
  subscribe: Subject<any> = new Subject<any>();
  dispatchId: any;
  despatchInfo: any;
  docsarray: any = [];
  downloadUrl: string;
  approveForm: FormGroup;
  returnForm: FormGroup;
  userId: any;
  submitted = false;
  // obj: any
  // privilegename: any;
  privilegesList: any = [];
  usersList: any = [];

  // status: any;
  returnbutton: boolean;
  seekApprovalForm: FormGroup;
  sendEcForm: FormGroup;
  returnCorrection: FormGroup;
  ecForm: FormGroup;
  seekList: any = [];
  correctionSeekList: any = [];
  flag = false;
  showEc = true;
  statesList: any = [];
  citiesList: any = [];
  personList: any = [];
  designationList: any = [];
  correctionPersonList: any = [];
  correctionDesignationList: any = [];
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('approveDismissModal') approveCloseBtn: ElementRef<HTMLElement>;
  @ViewChild('seekDismissModal') seekCloseBtn: ElementRef<HTMLElement>;
  @ViewChild('ecCirculationDissmissModal') ecircultionCloseBtn: ElementRef<HTMLElement>;


  @ViewChild('mailDismissModal') mailCloseBtn: ElementRef<HTMLElement>;

  showSeekApproval = false;
  correctiondata: any;
  showdfa: boolean = false;
  hidedfadetails: boolean = false;
  dfaForm: FormGroup;
  dfacontentvalue: string;
  ecValue: string;
  doucumentunsignedId: any;
  documentUnsignedUrl: any;
  downloadunsignedpdf: string;
  fileapproveSigned: any;
  obj: any;
  approveSignForm: FormGroup;
  status: string;
  designation: any;
  roleName: string;
  pdfHtmlData: any;
  noteSheetContentsForm:FormGroup;
  shownotesheeteditor: boolean =false;
  public loading: boolean;
  finaldownloadUrl: string;
  finalDocumentId: any;
  constructor(public router: Router, public signin: SignupService, public url: urlServices, public tostar: ToastrService, public jsaConst: JSAConstantServices,
    public activatedRoute: ActivatedRoute, public outboundsvc: OutboundService, public usrMgtService: UsrmgtService,
    public appConst: appConstants,
    public fb: FormBuilder, public helper: HelperService,) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.dispatchId = params.id);
    // this.UsersList();
    this.ecForm = this.fb.group({
      ecdec: ['', Validators.required],
    });
    this.checkPrivileges();
    this.SeekList();
    this.correctionUserList();

    console.log(this.dispatchId);
    // this.activatedRoute.params.subscribe((params: Params) => this.status = params.status);
    // if (this.status === 'Returned') {
    //   this.returnbutton = true;
    // }
    this.approveForm = this.fb.group({
      comment: ['', Validators.compose([Validators.required])]
    });
    // Validations
    this.returnForm = this.fb.group({
      comments: ['', Validators.required]
    });
    // Send Ec Form
    this.sendEcForm = this.fb.group({
      body: ['', Validators.required]
    });
    this.userId = sessionStorage.getItem('userId-usec');

    // Seek Approval Form
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
    this.dfaForm = this.fb.group({
      dfasubject: [''],
      dfacontents: ['']
    })
    this.noteSheetContentsForm = this.fb.group({
      notesheetcontents: [''],
      
    })
    this.getUnsignedPdf();

    console.log(this.ecForm.get('users'));
    console.log(this.ecForm.value);
    this.approveSignForm = this.fb.group({
      file: ['',Validators.required]
    })
    console.log(JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName);
    this.designation =JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName;
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    console.log(this.roleName);
    this.getDispatchById();
  }
  //  For Validations
  get f() { return this.seekApprovalForm.controls; }
  get g() { return this.returnCorrection.controls; }

  usersForm() {
    return this.fb.group({
      userName: [{ value: '', disabled: true }],
      userConcurrence: ['']
    });
  }

  // getDespatchById
  getDispatchById() {
    this.outboundsvc.getDispatchById(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.despatchInfo = res;
      this.finalDocumentId=this.despatchInfo.finalDocumentId;
      console.log(this.finalDocumentId);
      if (this.despatchInfo.dakDispatchRecipientDetails !== null) {
        this.getStates();
      }
      if ((this.despatchInfo.dakStatus.statusName === 'DraftCreated' || this.despatchInfo.dakStatus.statusName === 'Corrected'
        || this.despatchInfo.dakStatus.statusName === 'underCorrection' || this.despatchInfo.dakStatus.statusName === 'SeekApproval')) {
        this.showSeekApproval = true;
      } else {
        this.showSeekApproval = false;
      }
      this.flag = this.despatchInfo.eccirculationsToggle;
      if (this.despatchInfo.isDispatchWithDfa === false) {
        this.hidedfadetails = false;
      } else {
        this.hidedfadetails = true;
      }
      this.despatchInfo.noteSheetContents = atob(this.despatchInfo.noteSheetContents);
      this.despatchInfo.dfaContents = atob(this.despatchInfo.dfaContents);
      this.despatchInfo.dfaHindiContents = atob(this.despatchInfo.dfaHindiContents);
      console.log(this.despatchInfo.dfaSubject);
      console.log(this.despatchInfo.dfaContents);
      console.log(this.despatchInfo.workFlowCode);
      if (this.despatchInfo.dispatchDocuments) {
        this.despatchInfo.dispatchDocuments.forEach(element => {
          const nameString = element.documentLocation;
          if (nameString !== null) {
            const filename = nameString.split('/').pop();
            // console.log(filename);
            element.documentLocation = filename;
          }
        });
      }
      debugger
      if(this.despatchInfo.workFlowCode === this.designation){
        this.showSeekApproval=true;
      }else{
        this.showSeekApproval=false;
      }
    }, error => {
      console.log(error);
    });
   
  }

  // Get States
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

  UsersList() {
    this.outboundsvc.usersList(this.dispatchId).pipe(takeUntil(this.subscribe)).subscribe((users: any) => {
      console.log(users);
      this.usersList = users;
      const formArray = new FormArray([]);
      for (const x of this.usersList) {
        formArray.push(this.fb.group({
          userName: [{ value: x.firstName + x.lastName + ' ' + x.designation.designationName, disabled: true }],
          userId: x.userId,
          Concurrence: ['']
        }));
      }
      this.ecForm.setControl('users', formArray);
      console.log(this.ecForm.value);
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  sendECCirculation() {
    console.log(this.ecForm.value.users);
    if (this.ecForm.valid) {
      const obj1 = {};
      this.ecForm.value.users.forEach((item) => {
        const key = item['userId'];
        obj1[key] = item['Concurrence'];
      });
      console.log(obj1);

      const obj = {
        dispatchECComments: this.ecForm.value.ecdec,
        dispatchId: this.dispatchId,
        loggedInUserId: JSON.parse(sessionStorage.getItem('userInfo-usec')).userId,
        map: obj1
      }
      console.log(obj);
      this.outboundsvc.circulationDecision(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.submitted = false;
        this.ecircultionCloseBtn.nativeElement.click();
        this.reset();
        this.tostar.success('EC Circulation Captured Successfully', 'Success', {
          timeOut: 2000
        });
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
        debugger
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
      // this.getDispatchById();
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  //  Access to privileges
  checkPrivileges() {
    this.signin.getLoginUserId().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result.roles, 'result');
      if (result.roles !== null) {
        result.roles.map(element => {
          console.log(element.authorities);
          element.authorities.map(element => {
            this.privilegesList.push(element.authorityName);
          });
        });
      }
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
  SeekList() {
    this.outboundsvc.seekApprovalList().pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
      console.log(list);
      this.personList = [];
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
      console.log(obj);
      this.outboundsvc.seekApprovalByUserIDAndComments(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.submitted = false;
        this.seekCloseBtn.nativeElement.click();
        this.tostar.success('', 'Sent For Approval', {
          timeOut: 2000
        });
        this.reset();
        // this.router.navigate(['main/internal/outbound/secInch/dashboard']);
        this.getDispatchById();
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }


  // Downloded Files 
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }

  // approve despatch method
  approveAndForwardToDSE() {
    console.log(this.dispatchId);
    this.outboundsvc.approveDispatchh(this.dispatchId, this.userId)
      .pipe(takeUntil(this.subscribe)).subscribe(res => {
        console.log(res);
        this.tostar.success('Approved Successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['/main/internal/outbound/secInch/dashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);

      });
  }
  // return dispatch method
  returnToSE() {
    console.log(this.dispatchId);
    this.outboundsvc.returnDispatchToSE(this.dispatchId, this.userId, this.returnForm.value.comments)
      .pipe(takeUntil(this.subscribe)).subscribe(res => {
        console.log(res);
        this.tostar.success('Returned Successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['/main/internal/outbound/secInch/dashboard']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);

      });
  }

  sendToEC() {
    if (this.sendEcForm.valid) {
      console.log(this.sendEcForm.value);
      this.ecValue = btoa(this.sendEcForm.value.body)
      const obj = {
        body: this.ecValue,
        dispatchId: this.dispatchId
      };
      console.log(obj);
      this.outboundsvc.sendToEc(obj)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.showEc = true;
          this.mailCloseBtn.nativeElement.click();
          this.getDispatchById();
          this.tostar.success(res['response'].message, 'Success', {
            timeOut: 2000
          });
          this.reset();
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    }
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
      this.outboundsvc.sentCorrection(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.correctiondata = data;
        console.log(this.correctiondata.comments);
        this.getDispatchById();
        this.tostar.success('Correction Sent Successfully', 'Success', {
          timeOut: 2000
        });
        this.submitted = false;
        this.closeBtn.nativeElement.click();
        this.reset();
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }

  }
  // resetting forms method
  reset() {
    this.ecForm.reset();
    this.returnForm.reset();
    this.seekApprovalForm.reset();
    this.returnCorrection.reset();
    this.seekApprovalForm.controls.designation.setValue('', { onlySelf: true });
    this.seekApprovalForm.controls.person.setValue('', { onlySelf: true });
    this.returnCorrection.controls.designation.setValue('', { onlySelf: true });
    this.returnCorrection.controls.person.setValue('', { onlySelf: true });
    this.sendEcForm.reset();
    this.approveSignForm.reset();
  }
  // editdfa
  editdfa() {
    this.showdfa = true;
    this.dfaForm.patchValue({
      dfasubject: this.despatchInfo.dfaSubject,
      dfacontents: this.despatchInfo.dfaContents
    })
  }
  // editnoteSheet
  editnoteSheet(){
    this.shownotesheeteditor =true;
    this.noteSheetContentsForm.patchValue({
      notesheetcontents:this.despatchInfo.noteSheetContents
    })
  }
  // update notesheet
  updateNotesheetContents(){
   const obj={
    "dispatchId": this.dispatchId,
    "noteSheetContents": atob(btoa(this.noteSheetContentsForm.value.notesheetcontents))
   }
   console.log(obj);
  this.outboundsvc.minorCorrection(obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('Success', 'Updated Successfully')
      this.getDispatchById();
      this.shownotesheeteditor = false;
    }, error => {
      console.log(error);
      this.tostar.error('', 'Updated Failed');
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
    this.outboundsvc.minorCorrection(obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('Success', 'Updated Successfully')
      this.getDispatchById();
      this.showdfa = false;
    }, error => {
      console.log(error);
      this.tostar.error('', 'Updated Failed');
    })
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
  //Downloaded UnsignedPdf
  public downloadUnsignedPdf(id: any) {
    console.log(this.documentUnsignedUrl);
    console.log(id);
    console.log(this.documentUnsignedUrl + '?uuid=' + id)
    this.downloadunsignedpdf = this.url.documentUrl + '?uuid=' + id;
    this.tostar.success('', 'Downloaded Successfully');
  }
  // Preview After send For Dispatch
  public previewFinalLetter(id: any) {
     console.log(id);
     console.log(this.url.documentUrl + '?uuid=' + id);
    // this.outboundsvc.previewFinalLetter(id,this.documentUnsignedUrl).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
    //   console.log(res);
    //   const fileURL = URL.createObjectURL(res);
    //   window.open(fileURL, '_blank');
    // },error=>{
    //   console.log(error);
    // })
    this.finaldownloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  // FileFor Approved Signed Pdf
  SelectFile(event) {
    console.log(event.target.files[0]);
    this.fileapproveSigned = event.target.files[0];
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
        this.tostar.warning('', 'Already Uploaded')
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
      // let blob = res;
      // let a = document.createElement('a');
      // a.href = URL.createObjectURL(blob);
      // document.body.appendChild(a);
      // a.click();
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    },error=>{
      console.log(error);
    })
  }
  // back button method
  back() {
    console.log('test');
    this.router.navigate(['/main/internal/outbound/secInch/dashboard']);
    console.log('test');
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
