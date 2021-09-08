import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HelperService } from 'src/app/common-service/helper.service';
import { InboundservicesService } from '../../services/inboundservices.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { urlServices } from 'src/app/diarydak/outbound/services/outboundServiceUrls';
@Component({
  selector: 'app-sectionincharge-other-sec-dispatch-viewreceipt',
  templateUrl: './sectionincharge-other-sec-dispatch-viewreceipt.component.html',
  styleUrls: ['./sectionincharge-other-sec-dispatch-viewreceipt.component.css']
})
export class SectioninchargeOtherSecDispatchViewreceiptComponent implements OnInit,OnDestroy {
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('searchModal') searchbtn: ElementRef<HTMLElement>;
  subscribe: Subject<any> = new Subject<any>();
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  sectionid: any;
  sectionslist: any;
  navigationSubscription:any;
  returnCorrection: FormGroup;
  correctionPersonList: any = [];
  correctionDesignationList: any = [];
  correctionSeekList: any = [];
  personList: any = [];
  submitted: boolean =false;
  assigntouserid: any;
  designatioName: any;
  dispatchrecepientid: any;
  dispatchRecipientDetailId: any;
  downloadUrl: string;
  roleName: string;
  searchForm: FormGroup;
  showradio: boolean;
  fileno: any;
  existingFilesList: any;
  ccFileTaggingIds: any;
  ccfiletaggingId: any;
  refForm: FormGroup;
  designation: any;
  showassign: boolean =true;
  subSectionList: any;
  sectionList: any;
  shortname: any;
  categoriesList: any;
  subcategoriesList: any;
  subcategoryReference: any;
  referenceValues: any;
  showreference: boolean =false;
  showcollege: boolean=false;
  collegeList: any;
  refidvalue: any;
  academicYearValue: any;
  currentyear: number;
  nextyear: number;
  refacademicyear: string;
  patternNumber: string;
  dispatchId: any;
  constructor(private inboundsvc: InboundservicesService,public url: urlServices,public router: Router,public helper: HelperService,private fb:FormBuilder,public tostar: ToastrService,) { }

  ngOnInit(): void {
    this.designation = JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName;

    this.sectionid=JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId
    this.roleName=sessionStorage.getItem('selectedRole-usec');
    this.getAnotherSectionDispatches();
     // Added for menu reload
this.navigationSubscription= this.router.events.pipe(
  filter((event: RouterEvent) => event instanceof NavigationEnd)
).subscribe(() => {
  this.getAnotherSectionDispatches();
});
this.returnCorrection = this.fb.group({
  designation: ['', Validators.compose([Validators.required])],
  person: ['', Validators.compose([Validators.required])],
  comment: ['', Validators.compose([Validators.required])]
});
this.searchForm = this.fb.group({
  fileno: ['']
});
let d = new Date();
let n = d.getFullYear();
this.currentyear = n;
console.log(this.currentyear + 1);
this.nextyear = this.currentyear + 1;
this.refacademicyear =this.currentyear + '-' + this.nextyear.toString().substr(-2);
console.log(this.refacademicyear);
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
// this.correctionUserList();
this.getSections();
    this.getSubSections(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId);
    // this.academicYear = this.refacademicyear;
  }
  get g(){
    return this.returnCorrection.controls;
  }
  get receipt() { return this.refForm.controls; }
  getAnotherSectionDispatches() {
    if(this.roleName ==='ARPMSecInCharge'||this.roleName ==='AcademicIncharge'||this.roleName==='AEIncharge'
    ||this.roleName==='AFSecInCharge'||this.roleName==='LegalSecInCharge'){
      this.inboundsvc.otherSectionDispatches(this.sectionid,this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.sectionslist =res;
        this.responsePageCount=this.sectionslist[0].pageCount;
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      })
    }else{
      this.inboundsvc.otherSectionCCFiles(JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.sectionslist =res;
        // this.sectionslist.forEach(element => {
        //   debugger
        //   if (element.workFlowCode === this.designation) {
        //     this.showassign = true;
        //   } else {
        //     this.showassign = false;
        //   }
        // });
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      })
    }
    
  }
  workflowcode(data){
    console.log(data);
    if (data === this.designation) {
      this.showassign = true;
    }else if(data ===null){
      this.showassign = true;
    } else {
      this.showassign = false;
    }
  }
   //Previous Button
   prev() {
    if (this.pageId >= 1) {
      --this.pageId;
    this.getAnotherSectionDispatches();;
    }
  }
  //Next Button 
  next() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      this.getAnotherSectionDispatches();
    }

  }
// View PageCounts
viewPage(id: any) {
  this.router.navigate(['main/internal/outbound/secInch/view/', id]);
}
correctionUserList(data:any) {
 this.correctionDesignationList=[];
  this.inboundsvc.designationListCCFile(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName,sessionStorage.getItem('userId-usec')).pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
    console.log(list);
    this.personList = [];
    // this.seekApprovalForm.controls.person.reset();
    this.correctionSeekList = list;
    list.forEach((item) => {
      console.log(item);
      Object.keys(item).forEach((key) => {
        this.correctionDesignationList.push(key);
      });
      
    });
     this.dispatchRecipientDetailId= data.dispatchRecipientDetailId;
     this.dispatchId=data.dispatchId;
     this.ccFileTaggingId=data.ccFileTaggingId
    console.log(this.dispatchRecipientDetailId)
  }, error => {
    console.log(error);
    this.helper.errorMessage(error);
  });
}
selectedCorrectionDesignation(data: any) {
  console.log(data);
  this.designatioName =data;
  this.correctionPersonList = [];
  this.returnCorrection.controls.person.setValue('', { onlySelf: true });
  this.correctionSeekList.forEach((item) => {
    Object.keys(item).forEach((key) => {
      debugger
      if (key === data) {
        this.correctionPersonList = item[key];
        console.log(this.personList);
       
      }
    });
  });
}
personUserId(value){
  this.assigntouserid =value;
  console.log(value);
}
// reset
reset(){
  this.returnCorrection.reset();
  this.returnCorrection.controls.designation.setValue('', { onlySelf: true });
  this.returnCorrection.controls.person.setValue('', { onlySelf: true });
}
// dispatchRecipientDetailId(id){
//   this.sectionslist.forEach(element => {
//     debugger
//     if(element.dispatchRecipientDetailId ===id ){
//       this.dispatchRecipientDetailId =element.dispatchRecipientDetailId;
//     }
//   });
// }
// assignCCFile
assignCCFile(){
  this.submitted = true;
  if (this.returnCorrection.valid) {
    console.log(this.returnCorrection.value);
    const obj={
      "dispatchRecipientDetailId" :this.dispatchRecipientDetailId,
        "assignedToUserId": this.assigntouserid,
        "comments": this.returnCorrection.value.comment,
        "whoAssignedUserId": sessionStorage.getItem('userId-usec'),
        "workFlowName":this.designatioName,
        "ccFileTaggingId" :this.ccFileTaggingId,
        "dispatchId":this.dispatchId,
    }
    console.log(obj);
    this.inboundsvc.assignCCFile(obj).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
      console.log(res);
      this.tostar.success('Success', 'Assigned Successfully');
      this.closeBtn.nativeElement.click();
     this.router.navigate(['main/internal/inbound/sectionincharge/OtherSecDispatch']);
    },error=>{
    console.log(error);
    this.tostar.error('Error', 'Not Assigned Successfully');
    })
  }
}
 // Downloded Files 
 public download(id: any) {
  this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  console.log(this.downloadUrl);
  // this.inboundsvc.previewDocument(id).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
  //   console.log(res);
  // },error=>{
  //   console.log(error);
  // })
}
search() {
  this.showradio = true;
  this.fileno = this.searchForm.value.fileno;
  this.inboundsvc.searchWithFileNum(this.fileno).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
    console.log(res);
    this.existingFilesList = res;
  }, error => {
    console.log(error);
  });
}
ccFileTaggingId(id){
this.ccFileTaggingIds=id;
console.log(id);
}
// ccFiletaggingToCreateNoteSheet
ccFiletaggingToCreateNoteSheet(id){
  this.ccfiletaggingId=id;
  console.log(this.ccfiletaggingId);
      this.inboundsvc.filetaggingToCreateNoteSheet(this.ccfiletaggingId).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
    console.log(res);
    this.router.navigate(['main/internal/outbound/secInch/createNoteSheet/0'], { queryParams: { 
      // cate: res.dispatchCategories.categoryId,
      // urgency: res.dispatchUrgency !==null ?res.dispatchUrgency.urgencyId:'',
      // confidentiality:res.dispatchConfidentialityType!==null? res.dispatchConfidentialityType.dispatchModeId:'',
      // filenumber: res.receiptFileNum.dakDispatchFileNo,
       fileCates: res.dakDispatchFileNos.dakFileCategory.fileCategoryId,
       fileSubCates: res.dakDispatchFileNos.dakFileSubCategory.fileSubCategoryId,
      colleges:res.dakDispatchFileNos.college !== null ?res.dakDispatchFileNos.college.collegeId :'',
      fileSubRefnonColleges: res.dakDispatchFileNos.dakFileSubjectReferenceNonCollege !== null ? res.dakDispatchFileNos.dakFileSubjectReferenceNonCollege.fileSubjectReferenceId : '',
       references:res.dakDispatchFileNos.dakFileSubCategoryReference !=null?res.dakDispatchFileNos.dakFileSubCategoryReference.fileSubCategoryReferenceId:'',
       dispatchYears: res.dakDispatchFileNos.dispatchYear,
      financialYears: res.dakDispatchFileNos.financialYear,
      sections: res.dakDispatchFileNos.section.sectionId,
      subSections: res.dakDispatchFileNos.subSection.subSectionId,
      // isPrimary :res.isPrimary
      type :'dispatch'
    } });
  },error=>{
    console.log(error);
  })
}
tagFileNumToCCFile(data) {
  console.log(data);
  const obj = {
    "dakDispatchFileId": data.dakDispatchFileId,
      "ccFileTaggingId" : this.ccFileTaggingIds
      }   
  console.log(obj);
  this.inboundsvc.tagFileNumToCCFile(obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
    console.log(res);
    this.tostar.success('Success', 'Updated  With File number');
    this.searchbtn.nativeElement.click();
    this.router.navigate(['main/internal/inbound/sectionincharge/OtherSecDispatch']);
  }, error => {
    console.log(error);
    this.searchbtn.nativeElement.click();
    this.tostar.error('Error', 'Fail to Updated With File number');
    this.router.navigate(['main/internal/inbound/sectionincharge/OtherSecDispatch']);
    this.existingFilesList=[];
  });
}
 // getAllDCISections
 getSections() {
  debugger;
  this.inboundsvc.getAllDCISections().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
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
  this.inboundsvc.getSubSections(id).pipe(takeUntil(this.subscribe)).subscribe(res => {
    console.log(res);
    debugger;
    this.subSectionList = res;
    this.helper.sortedData(this.subSectionList, 'name');
  }, error => {
    this.helper.errorMessage(error);
  });
}
subSection(value) {
  console.log(value);
  this.refForm.controls.category.setValue('', { onlySelf: true });
  this.refForm.controls.subCategory.setValue('', { onlySelf: true });
  this.refForm.controls.college.setValue('', { onlySelf: true });
 this.refForm.controls.refCollegeId.setValue('', { onlySelf: true });
 this.refForm.controls.reference.setValue('', { onlySelf: true });
 this.refForm.controls.refSubjectId.setValue('', { onlySelf: true });
  this.inboundsvc.getCategoryBySubsection(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
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
  this.inboundsvc.getSubCategoryByFileCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
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
  
    this.inboundsvc.getAllCollege().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
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
    this.inboundsvc.getReferenceBySubCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.referenceValues = res;
      this.refno();
    }, error => {
      console.log(error);
    });
    this.inboundsvc.getSubCategoryReferenceBySubCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
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
    
    this.patternNumber = 'DCI' + '/' + sectionIdValue  + '/' + suSectionIdValue + '/' + categoryValue + '/' + subCategoryValue + '/' +
      +this.refidvalue + '/' + this.refForm.value.refAcademicYear + '/' +year;
    console.log(this.patternNumber);
    console.log(this.patternNumber);
    this.refForm.get('refReferenceNumber').setValue(this.patternNumber);
  }
  resetFile() {
    this.refForm.reset();
      this.refForm.get('refSection').setValue(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName);
      this.refForm.controls.refYear.setValue(this.currentyear, { onlySelf: true });
      this.refForm.controls.reference.setValue(this.currentyear, { onlySelf: true });
      this.refForm.controls.refSubSection.setValue('', { onlySelf: true });
      this.refForm.controls.refAcademicYear.setValue(this.refacademicyear, { onlySelf: true });
      this.refForm.controls.category.setValue('', { onlySelf: true });
      this.refForm.controls.subCategory.setValue('', { onlySelf: true });
      this.refForm.controls.refCollegeId.setValue('', { onlySelf: true });
     this.refForm.controls.college.setValue('', { onlySelf: true });
      this.refForm.controls.refSubjectId.setValue('', { onlySelf: true });
      this.searchForm.reset();
  }
  updateNewFile() {
    const obj = 
    {
      "dakDispatchFileId": null,
      "section": {
          "sectionId": JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId
      },
      "subSection": {
          "subSectionId": this.refForm.value.refSubSection
      },
      "dakFileCategory": {
          "fileCategoryId": this.refForm.value.category
      },
      "dakFileSubCategory": {
          "fileSubCategoryId": this.refForm.value.subCategory
      },
      "dakFileSubCategoryReference": this.refForm.value.reference ? {
        fileSubCategoryReferenceId : this.refForm.value.reference
        }:null,
      "college": this.refForm.value.refCollegeId ? {
        collegeId: this.refForm.value.refCollegeId 
      }:null,
      "dakFileSubjectReferenceNonCollege": this.refForm.value.refSubjectId ?
      {
        fileSubjectReferenceId: this.refForm.value.refSubjectId
      } : null,
      "subjectRef": 1,
      "subjectId": 1,
      "dispatchYear": this.currentyear,
      "financialYear": this.refForm.value.refAcademicYear,
      "dakDispatchFileNo": this.patternNumber,
      "ccFileTaggingId" : this.ccFileTaggingIds
}  

    console.log(obj);
    this.inboundsvc.tagFileNumToCCFile(obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('Success', 'Updated  With File number');
      // this.getReceiptById(this.receiptId);
      this.router.navigate(['main/internal/inbound/sectionincharge/OtherSecDispatch']);
      this.reset();
    }, error => {
      console.log(error);
      this.tostar.error('Error', 'Fail to Updated  With File number');
    });
  }
 // Destroy The Subscribe Dta
 ngOnDestroy() {
  if (this.navigationSubscription) {  
    this.navigationSubscription.unsubscribe();
 }
  this.subscribe.next();
  this.subscribe.complete();
}
}
