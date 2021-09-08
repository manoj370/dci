import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OutboundService } from '../../services/outbound.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { JSAConstantServices } from '../../models/jsaconst.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { urlServices } from '../../services/outboundServiceUrls';
import { ToastrService } from 'ngx-toastr';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { appConstants } from 'src/app/common-service/const.model';
@Component({
  selector: 'app-correctionView',
  templateUrl: './correctionView.component.html',
  styleUrls: ['./correctionView.component.scss']
})
export class CorrectionViewComponent implements OnInit, OnDestroy {
  dispatchId: number;
  submitted = false;
  sheetDetails: any;
  seekList: any = [];
  downloadUrl: string;
  personList: any = [];
  designationList: any = [];
  statesList: any = [];
  citiesList: any = [];
  updateForm: FormGroup;
  showSeekApproval = false;
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('returnModal') closeReturnBtn: ElementRef<HTMLElement>;
  hidedfadetails: boolean = false;
  seekApprovalForm: FormGroup;
  correctionPersonList: any=[];
  correctionSeekList: any;
  correctionDesignationList: any=[];
  correctiondata: any;
  showeditor: boolean =false;
  returnCorrection: FormGroup;
  roleName: string;
  // hidedfadetails: boolean = true;
  // alladdressdetails: any;
  // ccaddress: any;
  // addressId: any;

  constructor(public fb: FormBuilder, public route: ActivatedRoute, public tostar: ToastrService, public usrMgtService: UsrmgtService,
    public jsaService: OutboundService, public helper: HelperService, public url: urlServices,
   public router: Router,public appConst: appConstants, 
    public jsaConst: JSAConstantServices) { }

  ngOnInit(): void {
    this.getDispatchDetails();
    this.updateForm = this.fb.group({
      dfaSubject: [''],
      dfaContent: [''],
      dfaComments: ['', Validators.required],
      notesheetcontent:[]
    });
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
    this.correctionUserList();
    this.roleName=sessionStorage.getItem('selectedRole-usec');
  }
  get g() { return this.returnCorrection.controls; }
  // getDispatchById
  getDispatchDetails() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.dispatchId = +params.id;
      this.jsaService.getDispatchById(params.id).pipe(takeUntil(this.subscribe)).subscribe((data) => {
        console.log(data);
        this.sheetDetails = data;
        this.updateForm.controls.dfaSubject.patchValue(this.sheetDetails.dfaSubject);
        this.updateForm.controls.dfaContent.patchValue(atob(this.sheetDetails.dfaContents));
        this.updateForm.controls.notesheetcontent.patchValue(atob(this.sheetDetails.noteSheetContents));
        // .replace(/<[^>]*>/g, '')
        if (this.sheetDetails.address !== null && this.sheetDetails.address !== undefined) {
          this.getStates();
        }
        if(this.sheetDetails.isDispatchWithDfa === false){
          this.hidedfadetails = false;
        }else {
          this.hidedfadetails = true;
        }
        this.sheetDetails.noteSheetContents = atob(this.sheetDetails.noteSheetContents);
        this.sheetDetails.dfaContents = atob(this.sheetDetails.dfaContents);
        if (this.sheetDetails.dispatchDocuments) {
          this.sheetDetails.dispatchDocuments.forEach(element => {
            const nameString = element.documentLocation;
            if (nameString !== null) {
              const filename = nameString.split('/').pop();
              element.documentLocation = filename;
            }
          });
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    });
  }

  get f() { return this.updateForm.controls; }

  // Download Files 
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }

  // Get States
  getStates() {
    this.usrMgtService.getAllStates(1).pipe(takeUntil(this.subscribe)).subscribe(res => {
      this.statesList = res;
      this.statesList.forEach(element => {
        if (element.stateId === parseInt(this.sheetDetails.address.state)) {
          this.sheetDetails.address.state = element.stateName;
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
        if (iterator.cityId === parseInt(this.sheetDetails.address.city)) {
          this.sheetDetails.address.city = iterator.cityName;
        }
      }
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  // Reset
  reset() {
    this.updateForm.reset();
    this.seekApprovalForm.reset();
    this.returnCorrection.reset();
  }
  // Update Comments
  updateComment() {
    console.log(this.updateForm.value);
    if (this.updateForm.valid) {
      const obj = {
        dispatchId: this.dispatchId,
        dfaSubject: this.updateForm.value.dfaSubject,
        dfaContents: this.updateForm.value.dfaContent,
        dispatchComments: this.updateForm.value.dfaComments,
        "noteSheetContents":this.updateForm.value.notesheetcontent,
        loggedinUserId: JSON.parse(sessionStorage.getItem('userId-usec'))
      };
      this.jsaService.majorCorrection(obj).subscribe((result: any) => {
        console.log(result);
        this.getDispatchDetails();
        this.tostar.success('Corrected Note Sheet', 'Success', {
          timeOut: 3000
        });
        this.router.navigate(['/main/internal/outbound/se/correctionList']);
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
   
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
        this.closeReturnBtn.nativeElement.click();
        this.reset();
        let role:any=sessionStorage.getItem('selectedRole-usec');
        // if(role!='Section Officer')
        // this.router.navigate(['main/internal/outbound/secInch/correctionList']);
        // else
        // this.router.navigate(['main/internal/outbound/se/correctionList']);
        if((role ==='Section Officer')||(role ==='AcademicSectionOfficer')
        ||(role ==='AESectionofficer')||(role ==='AFSectionOfficer')
        ||(role ==='LegalAssistantSectionOfficer')
        ||(role ==='AFAssistantSectionOfficer')||(role ==='AcademicAssistantSectionOfficer')
        ||(role ==='InspectionSectionOfficer'))
        this.router.navigate(['main/internal/outbound/se/correctionList']);
        else if((role ==='AcademicAsstSecty')
        ||(role ==='AEAssistantSecretary')||(role ==='LegalAsstSecty')||(role ==='ARPMSecInCharge')
        ||(role ==='ARPMAsstSecty'||(role ==='AEIncharge')||(role ==='AcademicIncharge')||(role ==='AFSecInCharge')||(role ==='LegalSecInCharge')))
        this.router.navigate(['main/internal/outbound/secInch/correctionList']);
        
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }

  }
  // editnoteSheet
  edit(){
this.showeditor =true;
  }
  back(){
    this.router.navigate(['/main/internal/outbound/se/correctionList']);
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}

