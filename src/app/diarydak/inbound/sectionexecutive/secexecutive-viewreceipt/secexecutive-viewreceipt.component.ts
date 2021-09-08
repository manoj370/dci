import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InboundservicesService } from '../../services/inboundservices.service';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { ToastrService } from 'ngx-toastr';
import { urlServices } from 'src/app/griviance/models/url.models';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HelperService } from 'src/app/common-service/helper.service';
import { OutboundService } from 'src/app/diarydak/outbound/services/outbound.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-secexecutive-viewreceipt',
  templateUrl: './secexecutive-viewreceipt.component.html',
  styleUrls: ['./secexecutive-viewreceipt.component.css']
})
export class SecexecutiveViewreceiptComponent implements OnInit {
  @ViewChild('closeModal') closeBtn: ElementRef<HTMLElement>;
  subscribe: Subject<any> = new Subject<any>();
  status: string;
  submitted = false;
  reassignbutton: boolean;
  assignbutton: boolean;
  receiptId: any;
  receiptData: any;
  f: any;
  evidanceArray: any = [];
  downloadUrl: string;
  userArray: any = [];
  disposedReceiptForm: FormGroup;
  refForm: FormGroup;
  stateName: any;
  cityName: any;
  assigngedUserDetails: any = [];
  showDisposedbutton = false;
  statuses: any;
  processbtn = false;
  history: any;
  // existingFilesList: any = [
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "20-09-2020", "type": "Dispatch" },
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "21-09-2020", "type": "Dispatch" },
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "22-09-2020", "type": "Receipt" },
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "20-09-2020", "type": "Receipt" },
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "20-09-2020", "type": "Dispatch" }

  // ];
  showsearch: boolean;
  showradio: boolean;
  sectionList: any;
  subSectionList: any;
  patternNumber: string;
  shortname: string;
  academicYear: any = [
    '2020-21', '2019-20', '2018-19', '2017-16', '2016-15', '2015-14', '2014-13', '2013-12', '2012-11', '2011-10', '2010-09'
  ];
  academicYearValue: any;
  // helper: any;
  currentyear: number;
  refacademicyear: any;
  showtagBtn = false; showbtns = true;
  subcategoriesList: any = [];
  categoriesList: any = [];
  referenceValues: any = [];
  subcategoryValue: any;
  collegeList: any = [];
  
  
  nextyear: number;
  today: string;
  fileno: string;
  existingFilesList: any;
  searchForm: FormGroup;
  refidvalue: any;
  showreference: boolean =false;
  showcollege: boolean=false;
  subcategoryReference: any;
  firstname: any;
  lastname: any;
  docid: any;
  docpath: any;
  sectionName: any;
  assignReceiptForm: FormGroup;
  correctionSeekList: any = [];
  correctionDesignationList: any = [];
  personList: any = [];
  correctionPersonList: any = [];
  urgencyList: any = [];
  confidentialityList: any = [];
  obj: any;
  roleName: string;
  designation: any;
  showassign: boolean =false;
  email: string;
  sectionNames: any=[];
  sectionid: any;
  resultSet: any=[];
  constructor(public router: Router, public service: InboundservicesService,
              public fb: FormBuilder, public urls: urlServices, public usrmgtService: UsrmgtService, public aroute: ActivatedRoute,
              public helper: HelperService, public tostar: ToastrService,public outboundSer: OutboundService) {
    this.disposedReceiptForm = this.fb.group({
      comments: ['', Validators.required],
    });

  }
  ngOnInit(): void {
    console.log(this.academicYear);
    const id = this.aroute.snapshot.params.id;
    // if (id != '') {
    //   debugger;
    //   this.getHistoryOfReceipt(id);
    //   this.getReceiptById(id);
    //   this.receiptId = id;
    // }
    const receiptid =this.aroute.snapshot.params.receiptid;
    console.log(receiptid);
    if (id !== '') {
      this.getReceiptById(id);
    }
    if(receiptid !==''){
      this.receiptId =receiptid;
      this.getHistoryOfReceipt(this.receiptId);
      
    }
    let d = new Date();
    let n = d.getFullYear();
    this.currentyear = n;
    console.log(this.currentyear + 1);
    this.nextyear = this.currentyear + 1;
    // console.log(this.currentyear + '-' + this.nextyear.toString().substr(-2));
    this.refacademicyear =this.currentyear + '-' + this.nextyear.toString().substr(-2);
    console.log(this.refacademicyear);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();

    this.today = dd + '-' + mm + '-' + yyyy;
    console.log(this.today);
    this.searchForm = this.fb.group({
      fileno: ['']
    });
    this.refForm = this.fb.group({
      refSection: [{ value: JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName, disabled: true }, Validators.required],
      refSubSection: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      reference: [''],
       college: [''],
       refCollegeId:[''],
       refSubjectId: [''],
      // refCollegeId:[''],
      // refSubject: ['',[Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)]],
      refYear: [{ value: this.currentyear, disabled: true }],
      refAcademicYear: ['', [Validators.required]],
      refReferenceNumber: [{ value: '', disabled: true }],
    });
    this.getSections();
    this.getSubSections(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId);
    this.academicYear = this.refacademicyear;
    // this.sectionName =JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName
    this.assignReceiptForm = this.fb.group({
      designation: ['', Validators.required],
      sectionExecuite: ['', Validators.required],
      // urgency: ['', Validators.required],
      // confidentiality: ['', Validators.required],
      // completedDate: [''],
      comment: ['', Validators.required],

    });
    this.correctionUsersList();
    this.joinCalls();
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    this.designation = JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName;
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

  get receipt() { return this.refForm.controls; }
  getReceiptById(id: any) {
    this.service.getReceiptDetailsByReceiptId2(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.receiptData = result;
      console.log(this.receiptData);
      if (this.receiptData.receiptFileNum === null) {
        this.showtagBtn = true;
        this.showbtns = false;
      } else {
        this.showtagBtn = false;
        this.showbtns = true;
      }
      if (this.receiptData.dakStatus.statusName === 'Disposed') {
        this.showbtns = false;
      }
      console.log(sessionStorage.getItem('email-Id'));
      this.email =sessionStorage.getItem('email-Id');
     debugger
        if (this.receiptData.receiptWorkflows.assignedToUserId.emailId === this.email) {
          this.showassign = true;
        } else {
          this.showassign = false;
        }
    });
  }
  // getHistoryOfReceipt(id) {
  //   this.showDisposedbutton = false;
  //   this.service.getHistoryByReceiptId(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
  //     for (let i = 1; i < result.length; i++) {
  //       this.assigngedUserDetails.push(result[i])
  //     }
  //   })
  // }

  getHistoryOfReceipt(id) {
    this.showDisposedbutton = false;
    this.service.getHistoryByReceiptId(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result[0].whoAssignedUserId);
      this.history = result;
      this.history.forEach((element,index) => {
        console.log(element.assignedToUserId.section.sectionId);
        console.log(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId);
        this.sectionid =JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId;
        debugger
        
        if(element.assignedToUserId.section.sectionId === this.sectionid){
          this.resultSet.push(element);
        }
      });
      this.firstname =result[0].whoAssignedUserId.firstName;
      this.lastname=result[0].whoAssignedUserId.lastName;
      // for (let i = 1; i < result.length; i++) {
      //   this.assigngedUserDetails.push(result[i])
      // }
     
    });
  }

  // //Search with exsisting File Number
  // existingFilesList() {
  //   debugger;
  //   this.service.searchWithFileNum().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
  //     console.log(result);
  //     this.showsearch = result;
  //     // for (let i = 1; i < result.length; i++) {
  //     //   this.assigngedUserDetails.push(result[i])
  //     // }
  //   })
  // }
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
  // Refno

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
      +this.refidvalue + '/' + this.refForm.value.refAcademicYear + '/' +year;
    console.log(this.patternNumber);
    console.log(this.patternNumber);
    this.refForm.get('refReferenceNumber').setValue(this.patternNumber);
  }
  saveRefno() {
    debugger;
    this.receiptData.receiptRefId = this.refForm.controls.refReferenceNumber.value;

  }
  // Event For Academic Year
  changeAcademic(value) {
    this.academicYearValue = value;
    debugger;
  }
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


  // getSubSections(id: any) {
  //   debugger;
  //   this.service.getSubSections(id).pipe(takeUntil(this.subscribe)).subscribe(res => {
  //     console.log(res);
  //     debugger;
  //     this.subSectionList = res;
  //     this.helper.sortedData(this.subSectionList, 'name');
  //   }, error => {
  //     this.helper.errorMessage(error);
  //   });
  // }
  // academicYearValue(academicYearValue: any) {
  //   throw new Error('Method not implemented.');
  // }
  // existingFile(event) {
  //   if (event.target.checked) {
  //     this.showsearch = true;
  //   } else {
  //     this.showsearch = false;
  //   }
  // }

  // getReceiptById(id) {

  //   this.receiptData = { "createdBy": null, "createdDate": "10-09-2020", "lastModifiedBy": null, "lastModifiedDate": "15-09-2020", "version": 7, "comment": null, "status": null, "response": null, "receiptId": 29, "receiptType": { "createdBy": null, "createdDate": null, "lastModifiedBy": null, "lastModifiedDate": null, "version": 0, "comment": null, "status": 1, "response": null, "receiptTypeId": 1, "name": "Demi Official(DO) letter" }, "dakStatus": { "createdBy": null, "createdDate": null, "lastModifiedBy": null, "lastModifiedDate": null, "version": 0, "comment": null, "status": 1, "response": null, "statusId": 7, "statusCode": "RTN", "statusName": "Returned" }, "categoryCode": { "createdBy": null, "createdDate": null, "lastModifiedBy": null, "lastModifiedDate": null, "version": 0, "comment": null, "status": 1, "response": null, "receiptCategoryId": 2, "name": "General" }, "receiptLanguageId": { "createdBy": null, "createdDate": null, "lastModifiedBy": null, "lastModifiedDate": null, "version": 0, "comment": null, "status": 1, "response": null, "receiptLanguageId": 1, "name": "English" }, "recipientUserId": 207, "receiptRefId": "10920", "receiptDairyYear": null, "receiptDateY": null, "receiptDairyD": null, "dairyReceivedD": null, "receiptDairyDate": "10-09-2020", "senderName": "Ramji", "senderEmail": "test@gmail.com", "senderMobile": 15158418541854, "senderAddress": { "createdBy": null, "createdDate": "10-09-2020", "lastModifiedBy": null, "lastModifiedDate": "10-09-2020", "version": 0, "comment": null, "status": null, "response": null, "addressId": 66291, "line1": "Bengaluru", "line2": null, "city": "3", "state": "2", "country": "1", "landmark": null, "zipCode": "560002", "longitude": null, "latitude": null, "isPrimary": null }, "dairyReceivedDate": "10-09-2020", "receiptSubject": "Testing Sep", "enclosureDetails": null, "receiptDocuments": [{ "createdBy": null, "createdDate": "10-09-2020", "lastModifiedBy": null, "lastModifiedDate": "10-09-2020", "version": 0, "comment": null, "status": null, "response": null, "receiptDocumentId": 26, "documentEnclosureDetails": null, "documentLocation": "/dms:root/Portal Module Documents/dairydak/Inbound/2020/10SEPTEMBER2020/DCI-DD-2020-29/screencapture-36-255-253-200-main-internal-outbound-se-createNoteSheet-2020-09-10-11_53_19.pdf", "documentId": "e9b6d622-bbde-4ce8-a339-5e817d172785" }, { "createdBy": null, "createdDate": "10-09-2020", "lastModifiedBy": null, "lastModifiedDate": "10-09-2020", "version": 0, "comment": null, "status": null, "response": null, "receiptDocumentId": 27, "documentEnclosureDetails": null, "documentLocation": "/dms:root/Portal Module Documents/dairydak/Inbound/2020/10SEPTEMBER2020/DCI-DD-2020-29/ATMAOMRSHEET.pdf", "documentId": "648802a2-bc24-476a-bca7-d737bb550282" }], "pageCount": 0, "totalCount": 0, "receiptToAddress": "Andhra" }
  // }
  // this.service.getReceiptData(id).subscribe((result: any) => {
  //   this.receiptData = result
  //   this.getStateById(result.senderAddress.state)
  //   this.getCityId(result.senderAddress.city)
  //   if (result.dakStatus.statusName === 'Assigned') {
  //     this.showDisposedbutton = false;
  //     this.processbtn = true;

  //   } else if (result.dakStatus.statusName === 'Disposed') {
  //     this.showDisposedbutton = false;
  //     this.statuses = result.dakStatus.statusName;
  //     this.processbtn = false;

  //   }
  //   else if (result.dakStatus.statusName === 'Processing') {
  //     this.showDisposedbutton = true;
  //     this.processbtn = false;
  //     this.statuses = result.dakStatus.statusName;

  //   }
  //   else {
  //     this.showDisposedbutton = false;
  //   }
  //   this.evidanceArray.push({ "document": result.receiptDocuments.documentId })
  // })

  getCityId(city: any) {
    this.usrmgtService.getCityById(city).pipe(takeUntil(this.subscribe)).subscribe(((result: any) => {
      this.cityName = result.cityName;
    }));
  }
  getStateById(id) {
    this.usrmgtService.getStateById(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.stateName = result.stateName;
    });
  }

  back() {
    this.router.navigate(['/main/internal/inbound/sectionexecutive/dashboard']);
  }

  desiposedReceipt() {
    this.service.disposeReceipt(this.receiptId, 'Disposed', this.disposedReceiptForm.get('comments').value).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.tostar.success('Receipt Disposed Successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['/main/internal/inbound/sectionexecutive/dashboard']);
    });
  }
  updateReceipt() {
    {
      this.showsearch = !this.showsearch;
    }

    // this.service.updateReceiptById(this.receiptId, "Processing").pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
    //   this.tostar.success('Receipt Processing Successfully', 'Success', {
    //     timeOut: 2000
    //   });
    //   this.router.navigate(['/main/internal/inbound/sectionexecutive']);
    // })
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
      this.router.navigate(['/main/internal/inbound/sectionexecutive/dashboard']);
      this.reset();
    }, error => {
      console.log(error);
      this.tostar.error('Error', 'Fail to Updated Receipt With File number');
    });
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
      this.router.navigate(['/main/internal/inbound/sectionexecutive/dashboard']);
    }, error => {
      console.log(error);
      this.tostar.error('Error', 'Fail to Updated Receipt With File number');
    });
  }

  reset() {
    this.refForm.reset();
    this.refForm.get('refSection').setValue(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName);
    this.refForm.controls.refYear.setValue(this.currentyear, { onlySelf: true });
    this.refForm.controls.refSubSection.setValue('', { onlySelf: true });
    this.refForm.controls.refAcademicYear.setValue(this.refacademicyear, { onlySelf: true });
    this.refForm.controls.category.setValue('', { onlySelf: true });
    this.refForm.controls.subCategory.setValue('', { onlySelf: true });
        this.refForm.controls.refCollegeId.setValue('', { onlySelf: true });
        this.refForm.controls.college.setValue('', { onlySelf: true });
       this.refForm.controls.refSubjectId.setValue('', { onlySelf: true });
    // this.refForm.get('year').setValue(this.currentyear);
    this.searchForm.reset();
  }

  // Download
  public getDocumentId(id: any) {
    this.downloadUrl = this.urls.documentUrl + '?uuid=' + id.documentId;
  }
  // Navigate to notesheet
  createNoteSheet() {
    this.docid = [];
    console.log(this.refForm.value);
    if(this.receiptData.receiptDocuments.length !==0){
    this.receiptData.receiptDocuments.forEach(element => {
    console.log(element)
    const nameString = element.documentLocation;
    this.docid.push(element.documentId)
    if (nameString !== null) {
    // const filename = nameString.split('/').pop();
    console.log(nameString);
    this.docpath =nameString
    }
    });
    }
    // this.router.navigate(['main/internal/outbound/se/createNoteSheet/' + JSON.stringify(obj)])
    this.router.navigate(['main/internal/outbound/se/createNoteSheet/0'], { queryParams: {
    // deg: this.receiptData.designation.designationId,
    receiptId:this.receiptData.receiptId,
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
    docpath :this.docpath,
    docid: JSON.stringify(this.docid),
    isPrimary :this.receiptData.isPrimary,
    type :'receipt'
    } });
    
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
  assignReceiptToSectionExecutive() {
    console.log(this.assignReceiptForm.value);
    this.submitted = true;

    if (this.assignReceiptForm.valid) {
      this.service.assignReceiptToAnyDesignation(this.receiptId,this.assignReceiptForm.value.sectionExecuite,this.assignReceiptForm.value.comment,this.obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        this.router.navigate(['main/internal/inbound/sectionexecutive/dashboard']);
        this.tostar.success('Receipt Assigned Successfully', 'Success', {
          timeOut: 2000
        });
        this.resetValidations();
      }, error => {
        this.helper.errorMessage(error);
      });
    }
  }
  resetValidations() {
    this.assignReceiptForm.reset();
    this.assignReceiptForm.controls.designation.setValue('', { onlySelf: true });
    this.assignReceiptForm.controls.sectionExecuite.setValue('', { onlySelf: true });
    // this.assignReceiptForm.controls.urgency.setValue('', { onlySelf: true });
    // this.assignReceiptForm.controls.confidentiality.setValue('', { onlySelf: true });
  }
  getAllFwdReceiptById(){
    this.service.getAllFwdReceiptById(this.aroute.snapshot.params.receiptid).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
      console.log(res);
      res.forEach(element => {
        this.sectionName =element.assignedToUserId.section.sectionName
        this.sectionNames.push(this.sectionName);
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
