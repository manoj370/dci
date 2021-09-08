import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InboundservicesService } from '../../services/inboundservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlServices } from 'src/app/griviance/models/url.models';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { HelperService } from 'src/app/common-service/helper.service';
import { OutboundService } from 'src/app/diarydak/outbound/services/outbound.service';
@Component({
  selector: 'app-sectionincharge-viewreceipt',
  templateUrl: './sectionincharge-viewreceipt.component.html',
  styleUrls: ['./sectionincharge-viewreceipt.component.css']
})
export class SectioninchargeViewreceiptComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeBtn: ElementRef<HTMLElement>;
  subscribe: Subject<any> = new Subject<any>();
  returnReceiptForm: FormGroup
  status: string;
  submitted = false;
  files: any = [];
  reassignbutton: boolean = false;
  assignbutton: boolean;
  receiptId: any;
  receiptData: any;
  evidanceArray: any = [];
  downloadUrl: string;
  userArray: any;
  assignReceiptForm: FormGroup
  stateName: any;
  cityName: any;
  userArrayForSectionExecuite: any;
  assigngedUserDetails: any = [];
  showReceiptHistory: boolean = true;
  lasteModifiedDate: any;
  designationName: any;
  comments: any;
  userSecExecuteArray: any;
  getUserListByRole: {}[];
  ReceiptDetailsByReceiptId: any;
  showbtns: boolean = true;
  loggedin: any;
  correctionSeekList: any = [];
  correctionDesignationList: any = [];
  personList: any = [];
  correctionPersonList: any = [];
  urgencyList: any = [];
  confidentialityList: any = [];
  firstname: any;
  lastname: any;
  sectionName: any;
  assignReceiptForms: FormGroup;
  obj: any;
  roleName: string;
  sectionNames: any;
  email: string;
  showassign: boolean =false;
  searchForm: FormGroup;
  fileno: any;
  showradio: boolean;
  existingFilesList: any;
  showsearch: boolean;
  refForm: FormGroup;
  currentyear: number;
  nextyear: number;
  refacademicyear: string;
  subSectionList: any=[];
  categoriesList: any=[];
  sectionList: any=[];
  shortname: any;
  subcategoriesList: any=[];
  referenceValues: any=[];
  subcategoryReference: any=[];
  showreference: boolean =false;
  showcollege: boolean=false;
  collegeList: any=[];
  refidvalue: any;
  patternNumber: string;
  academicYearValue: any;
  today: string;
  academicYear: string;
  sectionId: any;
  sectionNamess: any=[];
  resultSet: any=[];
  constructor(public router: Router, public service: InboundservicesService, public fb: FormBuilder, public helper: HelperService,
    public urls: urlServices, public usrmgtService: UsrmgtService, public aroute: ActivatedRoute, public tostar: ToastrService,
    public outboundSer: OutboundService) {
    this.assignReceiptForm = this.fb.group({
      designation: ['', Validators.required],
      sectionExecuite: ['', Validators.required],
      urgency: ['', Validators.required],
      confidentiality: ['', Validators.required],
      completedDate: [''],
      comment: ['', Validators.required],

    })
    this.assignReceiptForms = this.fb.group({
      designation: ['', Validators.required],
      sectionExecuite: ['', Validators.required],
      comment: ['', Validators.required],

    })

    this.returnReceiptForm = this.fb.group({
      // SecretaryName: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    $('#accordion').on('hide.bs.collapse show.bs.collapse', (e) => {
      $(e.target).prev().find('i:last-child').toggleClass(' fa-minus fa-plus');
    });
    const id = this.aroute.snapshot.params.id;
    const receiptid =this.aroute.snapshot.params.receiptid;
    console.log(receiptid);
    if (id !== '') {
      this.getReceiptById(id);
    }
    if(receiptid !==''){
      this.receiptId =receiptid;
      this.getHistoryOfReceipt(this.receiptId);
      
    }
    this.joinCalls();
    // this.getLoginUserId();
    // this.getSectionExecutivesBySection()
    this.correctionUsersList();
    this.sectionName =JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName
    this.sectionId =JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    this.searchForm = this.fb.group({
      fileno: ['']
    });
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();

    this.today = dd + '-' + mm + '-' + yyyy;
    console.log(this.today);
    let d = new Date();
    let n = d.getFullYear();
    this.currentyear = n;
    console.log(this.currentyear + 1);
    this.nextyear = this.currentyear + 1;
    this.refacademicyear =this.currentyear + '-' + this.nextyear.toString().substr(-2);
    this.refForm = this.fb.group({
      refSection: [{ value: JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName, disabled: true }, Validators.required],
      refSubSection: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      reference: [''],
       college: [''],
       refCollegeId:[''],
       refSubjectId: [''],
      refYear: [{ value: this.currentyear, disabled: true }],
      refAcademicYear: ['', [Validators.required]],
      refReferenceNumber: [{ value: '', disabled: true }],
    });
    this.getSections();
    this.getSubSections(this.sectionId);
    this.getAllFwdReceiptById();
  }

  joinCalls() {
    const urgencyCall = this.outboundSer.getAllDispatchesUrgency();
    const confidentialityCall = this.outboundSer.getDispatchConfidentiality();
    // const secBySection = this.service.getSectionExecutivesBySection(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName);

    forkJoin([urgencyCall, confidentialityCall]).pipe(takeUntil(this.subscribe)).subscribe(results => {
      console.log(results);
      this.urgencyList = results[0];
      this.confidentialityList = results[1];
      // this.userArrayForSectionExecuite = results[2];
    }, error => {
      this.helper.errorMessage(error);
    });

  }




  get f() { return this.assignReceiptForm.controls; }
  getReceiptById(id: any) {
    this.service.getReceiptDetailsByReceiptId2(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.receiptData = result;
      console.log(this.receiptData);
      this.status = this.receiptData.dakStatus.statusName;
      this.email =sessionStorage.getItem('email-Id');
     debugger
        if (this.receiptData.receiptWorkflows.assignedToUserId.emailId === this.email) {
          this.showassign = true;
        } else {
          this.showassign = false;
        }
    }, error => {
      this.helper.errorMessage(error);
    });
  }

  // getRoleByRoleID() {
  //   this.service.getUserListByRole('Secretary').pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
  //     this.userArray = result;
  //   }, error => {
  //     this.helper.errorMessage(error);
  //   });
  // }
  getSectionExecutiveUserList(sectionName: string) {
    this.service.getSectionExecutivesBySection(sectionName).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.userArrayForSectionExecuite = result;
    }, error => {
      this.helper.errorMessage(error);
    })
  }
  // getLoginUserId() {
  //   this.service.getLoginUserId().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
  //     console.log(result, 'getLoginUserId');
  //     this.loggedin = result;
  //     this.getSectionExecutiveUserList(this.loggedin.section.sectionName);
  //   }, error => {
  //     this.helper.errorMessage(error);
  //   });
  // }

  // getHistoryOfReceipt(id) {
  //   this.service.getHistoryByReceiptId(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
  //     this.assigngedUserDetails = result;
  //     console.log(this.assigngedUserDetails);
  //     this.firstname =result[0].whoAssignedUserId.firstName;
  //     this.lastname=result[0].whoAssignedUserId.lastName;
  //     for (let i = 2; i < result.length; i++) {
  //       this.assigngedUserDetails.push(result[i]);
  //     }
  //     result.forEach(element => {
  //       this.sectionNames =element.assignedToUserId.section.sectionName
  //       });
  //     this.service.getUserListByRole('ARPMSecExecutive').subscribe((result: any) => {
  //       result.forEach(element => {
  //         this.assigngedUserDetails.forEach(elements => {
  //           if (elements.assignedToUserId.userId === element.userId) {
  //             this.reassignbutton = false;
  //           } else {
  //             this.showReceiptHistory = true;
  //           }
  //         });
  //       });
  //     });

  //   }, error => {
  //     this.helper.errorMessage(error);
  //   });
  // }
  getHistoryOfReceipt(id) {
    this.service.getHistoryByReceiptId(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.assigngedUserDetails = result;
      this.assigngedUserDetails.forEach((element,index) => {
        console.log(element.assignedToUserId.section.sectionId);
        console.log(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId);
        debugger
        if(element.assignedToUserId.section.sectionId ===JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId){
          this.resultSet.push(element);
        }
       
      });
      this.firstname =result[0].whoAssignedUserId.firstName;
      this.lastname=result[0].whoAssignedUserId.lastName;
   
      // for (let i = 2; i < result.length; i++) {
      //   this.assigngedUserDetails.push(result[i]);
      // }
      // this.service.getUserListByRole('ARPMSecExecutive').subscribe((result: any) => {
      //   result.forEach(element => {
      //    this.assigngedUserDetails.forEach(elements => {
      //       if (elements.assignedToUserId.userId === element.userId) {
      //         this.reassignbutton = false;
      //       } else {
      //         this.showReceiptHistory = true;
      //       }
      //     });
      //   });
      // });

    }, error => {
      this.helper.errorMessage(error);
    });
  }

  getCityId(city: any) {
    this.usrmgtService.getCityById(city).pipe(takeUntil(this.subscribe)).subscribe(((result: any) => {
      this.cityName = result.cityName;
    }), error => {
      this.helper.errorMessage(error);
    });
  }
  getStateById(id) {
    this.usrmgtService.getStateById(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.stateName = result.stateName;
    }, error => {
      this.helper.errorMessage(error);
    })
  }

  back() {
    this.router.navigate(['/main/internal/inbound/sectionincharge/receiptDashboard']);
  }

  assignReceipt() {
    // this.service.assignToSetionExicute(this.receiptId, this.assignReceiptForm.get('sectionIncharge').value, this.assignReceiptForm.get('comments').value).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
    // }, error => {
    //   this.helper.errorMessage(error);
    // })
  }
  // Download
  public getDocumentId(id: any) {
    this.downloadUrl = this.urls.documentUrl + '?uuid=' + id.documentId;
  }
  returnReceipt() {
    this.service.returnReceiptToSecretary(this.receiptId, this.returnReceiptForm.get('comments').value).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.router.navigate(['/main/internal/inbound/sectionincharge/receiptDashboard']);
      this.tostar.success('Receipt Return Successfully', 'Success', {
        timeOut: 2000
      });
    }, error => {
      this.helper.errorMessage(error);
    })
  }
  // correctionusersList
  correctionUsersList() {
    this.service.correctionUsersList(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName, sessionStorage.getItem('userId-usec')).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.personList = [];
      this.correctionSeekList = res;
      res.forEach((item) => {
        Object.keys(item).forEach((key) => {
          this.correctionDesignationList.push(key);
        });
      });
    }, error => {
      this.helper.errorMessage(error);
    })
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
  // reset
  reset() {
    this.assignReceiptForm.reset();
    this.assignReceiptForm.controls.designation.setValue('', { onlySelf: true });
    this.assignReceiptForm.controls.sectionExecuite.setValue('', { onlySelf: true });
  }
  resetValidations(){
    this.assignReceiptForm.reset();
    this.assignReceiptForm.controls.designation.setValue('', { onlySelf: true });
    this.assignReceiptForm.controls.sectionExecuite.setValue('', { onlySelf: true });
  }
  validationReset(){
    this.assignReceiptForms.reset();
    this.assignReceiptForms.controls.designation.setValue('', { onlySelf: true });
    this.assignReceiptForms.controls.sectionExecuite.setValue('', { onlySelf: true });
  }
  assignReceiptToSectionExecutive() {
    console.log(this.assignReceiptForm.value);
    this.submitted = true;

    if (this.assignReceiptForm.valid) {
      const obj = {
        comments: this.assignReceiptForm.value.comment,
        dispatchByDate: this.assignReceiptForm.value.completedDate,
        dispatchConfidentialityType: {
          dispatchModeId: this.assignReceiptForm.value.confidentiality
        },
        dispatchUrgency: {
          urgencyId: this.assignReceiptForm.value.urgency
        },
        receiptId: this.receiptId,
        sectionExecutiveId: this.assignReceiptForm.value.sectionExecuite
      }
      this.service.assignToSetionExicute(obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        this.router.navigate(['/main/internal/inbound/sectionincharge/receiptDashboard']);
        this.tostar.success('Receipt Assigned Successfully', 'Success', {
          timeOut: 2000
        });
        this.resetValidations();
      }, error => {
        this.helper.errorMessage(error);
      });
    }
  }
  assignReceiptToAnyDesignation() {
    console.log(this.assignReceiptForms.value);
    this.submitted = true;

    if (this.assignReceiptForms.valid) {
      this.service.assignReceiptToAnyDesignation(this.receiptId,this.assignReceiptForms.value.sectionExecuite,this.assignReceiptForms.value.comment,this.obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        this.router.navigate(['main/internal/inbound/sectionincharge/receiptDashboard']);
        this.tostar.success('Receipt Assigned Successfully', 'Success', {
          timeOut: 2000
        });
        this.resetValidations();
      }, error => {
        this.helper.errorMessage(error);
      });
    }
  }
  search() {
    this.showradio = true;
    this.fileno = this.searchForm.value.fileno;
    this.service.searchWithFileNum(this.fileno).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.existingFilesList = res;
    }, error => {
      console.log(error);
    });
  }
  updateReceipt() 
    {
      this.showsearch =true;
    }
    updateReceiptWithFileNo(data) {
      console.log(data);
      const obj = {
        receiptId: this.receiptId,
        receiptFileNum: {
          dakDispatchFileId: data.dakDispatchFileId,
        }
      };
      console.log(obj);
      this.service.updateReceiptWithFileNo(obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.tostar.success('Success', 'Updated Receipt With File number');
        this.closeBtn.nativeElement.click();
        this.getReceiptById(this.receiptId);
      }, error => {
        console.log(error);
        this.tostar.error('Error', 'Fail to Updated Receipt With File number');
      });
    }
    resetTagFileFunction(){
      this.searchForm.reset();
      this.showsearch =true;
    }
    get receipt() { return this.refForm.controls; }
    // getAllDCISections
  getSections() {
    debugger;
    this.service.getAllDCISections().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {

      console.log(res);
      this.sectionList = res;
      debugger;
      console.log(res[0].sectionName);
      this.shortname = res[7].shortName;
      console.log(this.shortname);
      // this.getSenderName(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId);
      this.helper.sortedData(this.sectionList, 'sectionName');
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
     // getSubSections
  getSubSections(id: any) {
    debugger;
    this.service.getSubSections(id).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      debugger;
      this.subSectionList = res;
      this.helper.sortedData(this.subSectionList, 'name');
    }, error => {
      this.helper.errorMessage(error);
    });
  }
   // subSection
   subSection(value) {
    console.log(value);
    this.refForm.controls.category.setValue('', { onlySelf: true });
    this.refForm.controls.subCategory.setValue('', { onlySelf: true });
    this.refForm.controls.college.setValue('', { onlySelf: true });
   this.refForm.controls.refCollegeId.setValue('', { onlySelf: true });
   this.refForm.controls.reference.setValue('', { onlySelf: true });
   this.refForm.controls.refSubjectId.setValue('', { onlySelf: true });
    this.service.getCategoryBySubsection(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.categoriesList = res;
       this.refno();
    }, error => {
      console.log(error);
    });

  }
  // category
  category(value) {
    this.refForm.controls.subCategory.setValue('', { onlySelf: true });
      this.refForm.controls.college.setValue('', { onlySelf: true });
      this.refForm.controls.refCollegeId.setValue('', { onlySelf: true });
      this.refForm.controls.reference.setValue('', { onlySelf: true });
      this.refForm.controls.refSubjectId.setValue('', { onlySelf: true });
    this.service.getSubCategoryByFileCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.subcategoriesList = res;
       this.refno();
      
    }, error => {
      console.log(error);
    });
  }
   // subcategory
   subcategory(value) {
    debugger
    console.log(value);
    // this.subcategoryValue = value;
   if (value === "1" || value === 1) {
     this.showcollege=true;
     this.showreference =false;
     this.refForm.controls.college.setValidators(Validators.required);
      this.refForm.controls['college'].updateValueAndValidity();
      this.refForm.controls.refCollegeId.setValidators(Validators.required);
      this.refForm.controls['refCollegeId'].updateValueAndValidity();
    this.refForm.controls.refSubjectId.clearValidators();
     this.refForm.controls['refSubjectId'].updateValueAndValidity();
    
      this.service.getAllCollege().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.collegeList = res;
         this.refno();
      }, error => {
        console.log(error);
      });
      this.refForm.controls.refSubjectId.setValue('', { onlySelf: true });
    } else{
      this.showreference=true;
      this.showcollege=false;
       this.refForm.controls.refSubjectId.setValidators(Validators.required);
       this.refForm.controls['refSubjectId'].updateValueAndValidity();
       this.refForm.controls.college.clearValidators();
       this.refForm.controls['college'].updateValueAndValidity();
       this.refForm.controls.refCollegeId.clearValidators();
       this.refForm.controls['refCollegeId'].updateValueAndValidity();
      this.service.getReferenceBySubCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.referenceValues = res;
         this.refno();
      }, error => {
        console.log(error);
      });
      this.service.getSubCategoryReferenceBySubCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
        console.log(res);
        this.subcategoryReference =res;
         this.refno();
      },error=>{
        console.log(error);
      });
      
   this.refForm.controls.refCollegeId.setValue('', { onlySelf: true });
   this.refForm.controls.college.setValue('', { onlySelf: true });
    }
   
  }
  // referenceValue
  referenceValue(value) {
    console.log(value);
    debugger
     this.refidvalue =value;
     this.refForm.get('refCollegeId').setValue(value);
     this.refno();
  }
  referenceIdValue(value){
    // this.refidvalue =value;
    this.refForm.get('refSubjectId').setValue(value);
    const id = this.referenceValues.map(x => {
      if (x.fileSubjectReferenceId === parseInt(this.refForm.value.refSubjectId)) {
        //  return x.shortName;
        this.refidvalue =x.shortName;
      }
    }).join('');
   this.refno();
  }
   // Event For Academic Year
   changeAcademic(value) {
    this.academicYearValue = value;
    debugger;
  }
  refno() {
    const d = new Date();
    const n = d.getFullYear();
    const year = n;
    const sectionIdValue = this.sectionList.map(x => {
      if (x.sectionId === (JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId)) {
        return x.shortName;
      }
    }).join('');
    const suSectionIdValue = this.subSectionList.map(x => {
      if (x.subSectionId === parseInt(this.refForm.value.refSubSection)) {
        return x.shortName;
      }
    }).join('');
    const categoryValue = this.categoriesList.map(x => {
      if (x.fileCategoryId === parseInt(this.refForm.value.category)) {
        return x.shortName;
      }
    }).join('');
    const subCategoryValue = this.subcategoriesList.map(x => {
      if (x.fileSubCategoryId === parseInt(this.refForm.value.subCategory)) {
        return x.shortName;
      }
    }).join('');
    // this.refForm.value.refAcademicYear = this.academicYearValue;
    // this.patternNumber = 'DCI' + '/' + this.shortname + '/' + suSectionIdValue + '/'
    //   + this.refForm.value.refSubject + '/' + this.refForm.value.refSubjectId + '/' +
    //   year + '/' + this.academicYearValue;
    this.patternNumber = 'DCI' + '/' + sectionIdValue  + '/' + suSectionIdValue + '/' + categoryValue + '/' + subCategoryValue + '/' +
      +this.refidvalue + '/' + year + '/' + this.refForm.value.refAcademicYear;
    console.log(this.patternNumber);
    console.log(this.patternNumber);
    this.refForm.get('refReferenceNumber').setValue(this.patternNumber);
  }
  resetCreateRefNo() {
    this.refForm.reset();
    this.refForm.get('refSection').setValue(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName);
    this.refForm.controls.refYear.setValue(this.currentyear, { onlySelf: true });
    this.refForm.controls.refSubSection.setValue('', { onlySelf: true });
    debugger
    this.refForm.controls.refAcademicYear.setValue(this.refacademicyear, { onlySelf: true });
    this.refForm.controls.category.setValue('', { onlySelf: true });
    this.refForm.controls.subCategory.setValue('', { onlySelf: true });
        this.refForm.controls.refCollegeId.setValue('', { onlySelf: true });
        this.refForm.controls.college.setValue('', { onlySelf: true });
       this.refForm.controls.refSubjectId.setValue('', { onlySelf: true });
    // this.refForm.get('year').setValue(this.currentyear);
  }
  updateNewFile() {
    const obj = {
      receiptId: this.receiptId,
      noteSheetLetterDate: this.today,
      receiptFileNum: {
        dakDispatchFileId: 0,
        section: {
          sectionId: JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId
        },
        subSection: {
          subSectionId: this.refForm.value.refSubSection
        },
        dakFileCategory: {

          fileCategoryId: this.refForm.value.category
        },
        dakFileSubCategory: {
          fileSubCategoryId: this.refForm.value.subCategory
        },
        dakFileSubCategoryReference :this.refForm.value.reference ? {
          fileSubCategoryReferenceId : this.refForm.value.reference
          }:null,
        college:this.refForm.value.refCollegeId ? {
          collegeId: this.refForm.value.refCollegeId 
        }:null,
        
        dakFileSubjectReferenceNonCollege: this.refForm.value.refSubjectId ?
          {
            fileSubjectReferenceId: this.refForm.value.refSubjectId
          } : null,
         subjectRef: 1,
         subjectId: 1,
        // college: this.refForm.value.college ? {
        //   collegeId: this.refForm.value.college
        // } : null,
        // dakFileSubjectReferenceNonCollege: this.refForm.value.reference ?
        //   {
        //     fileSubjectReferenceId: this.refForm.value.reference
        //   } : null,
        // subjectRef: this.refForm.value.subjectRef,
        // subjectId: this.refForm.value.subjectId,
        dispatchYear: this.currentyear,
        financialYear: this.refForm.value.refAcademicYear,
        dakDispatchFileNo: this.patternNumber
      }
    };

    console.log(obj);
    this.service.updateReceiptWithFileNo(obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('Success', 'Updated Receipt With File number');
      // this.getReceiptById(this.receiptId);
      this.router.navigate(['main/internal/inbound/sectionincharge/receiptDashboard']);
      this.reset();
    }, error => {
      console.log(error);
      this.tostar.error('Error', 'Fail to Updated Receipt With File number');
    });
  }
  // Navigate to notesheet
  createNoteSheet() {
    console.log(this.refForm.value);
    if(this.receiptData.receiptDocuments.length !==0){
    this.receiptData.receiptDocuments.forEach(element => {
      const nameString = element.documentLocation;
    // this.docid= element.documentId
    //   if (nameString !== null) {
    //     // const filename = nameString.split('/').pop();
    //      console.log(nameString);
    //       this.docpath =nameString
    //   }
    });    
  }
    // this.router.navigate(['main/internal/outbound/se/createNoteSheet/' + JSON.stringify(obj)])
    this.router.navigate(['main/internal/outbound/secInch/createNoteSheet/0'], { queryParams: { 
      //  deg: this.receiptData.designation.designationId,
      cate: this.receiptData.dispatchCategories.categoryId,
      urgency: this.receiptData.dispatchUrgency !==null ?this.receiptData.dispatchUrgency.urgencyId:'',
      confidentiality:this.receiptData.dispatchConfidentialityType!==null? this.receiptData.dispatchConfidentialityType.dispatchModeId:'',
      filenumber: this.receiptData.receiptFileNum.dakDispatchFileNo,
      fileCate: this.receiptData.receiptFileNum.dakFileCategory.fileCategoryId,
      fileSubCate: this.receiptData.receiptFileNum.dakFileSubCategory.fileSubCategoryId,
      college:this.receiptData.receiptFileNum.college !== null ?this.receiptData.receiptFileNum.college.collegeId :'',
      fileSubRefnonCollege: this.receiptData.receiptFileNum.dakFileSubjectReferenceNonCollege !== null ? this.receiptData.receiptFileNum.dakFileSubjectReferenceNonCollege.fileSubjectReferenceId : '',
      reference:this.receiptData.dakFileSubCategoryReference !=null?this.receiptData.dakFileSubCategoryReference.fileSubCategoryReferenceId:'',
      dispatchYear: this.receiptData.receiptFileNum.dispatchYear,
      financialYear: this.receiptData.receiptFileNum.financialYear,
      section: this.receiptData.receiptFileNum.section.sectionId,
      subSection: this.receiptData.receiptFileNum.subSection.subSectionId,
      // docpath :this.docpath,
      // docid:this.docid
    } });

  }
  getAllFwdReceiptById(){
    this.service.getAllFwdReceiptById(this.aroute.snapshot.params.receiptid).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
      console.log(res);
      res.forEach(element => {
        this.sectionNames =element.assignedToUserId.section.sectionName
        this.sectionNamess.push(this.sectionNames);
        });
    },error=>{
      console.log(error);
    })
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
