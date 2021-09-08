import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OutboundService } from '../../services/outbound.service';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
@Component({
  selector: 'app-editdispatch',
  templateUrl: './editdispatch.component.html',
  styleUrls: ['./editdispatch.component.css']
})
export class EditdispatchComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  edittForm: FormGroup;
  dcisections: any = [];
  sectionid: any;
  subsections: any = [];
  organizations: any = [];
  designations: any = [];
  dispatchtypes: any = [];
  file: any;
  countries: any = [];
  statesList: any = [];
  citiesList: any = [];
  dispatchid: any;
  despatchinfo: any;
  files: any = [];
  items: FormArray;
  dispatchitems: any = [];
  constructor(public router: Router, public fb: FormBuilder, public tostar: ToastrService,public outboundsvc: OutboundService, public usrmgtService: UsrmgtService,
    public activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    
    this.getAllOrganizations();
    this.getAllDesignations();
    this.getAllDCISections();
    this.getDispatchTypes();
    this.getAllCountries();
    this.getDispatchItems();
    //Getting Id from dashboard  through url
    this.activatedRoute.params.subscribe((params: Params) => this.dispatchid = params.id);
    console.log(this.dispatchid);
    this.getDispatchById();
    // Validations
    this.edittForm = this.fb.group({
      dfno: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z/0-9]*$/)])],
      section: ['', Validators.compose([Validators.required])],
      subsection: ['', Validators.compose([Validators.required])],
      subject: ['', Validators.compose([Validators.required,Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      year: ['', Validators.compose([Validators.required])],
      despatchvia: ['', Validators.compose([Validators.required])],
      despatchitem:['', Validators.compose([Validators.required])],
      sendername: ['', Validators.compose([Validators.required,Validators.pattern(/^[^-\s][a-zA-Z. ]*$/)])],
      fileheading: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      sendingsection: ['', Validators.compose([Validators.required])],
      designation: ['', Validators.compose([Validators.required])],
      fileno: [''],
      recepientname: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      emailId: ['', Validators.compose([Validators.required,  Validators.pattern(/^[^-\s][a-zA-Z.@0-9 ]*$/)])],
      contactno: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      org: ['', Validators.compose([Validators.required])],
      others: [''],
      address: ['', Validators.compose([Validators.required,Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      country: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9 ]*$/)])],
      state: ['', Validators.compose([Validators.required])],
      pincode: ['', Validators.compose([Validators.required,Validators.pattern(/^[^-\s][0-9 ]*$/)])],
      matter: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      evidence: ['']
      //   items: this.fb.array([this.createItem()])

   });
  }
   // back button method
  // back() {
  //   this.router.navigate(['main/internal/outbound/secretary/dashboard']);
  // }
  // getAllDCISections
  getAllDCISections() {
    this.outboundsvc.getAllDCISections().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.dcisections = res;
    }, error => {
      console.log(error);
    });
  } // getAllOrganizations
  getAllOrganizations() {
    this.outboundsvc.getAllOrganizations().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.organizations = res;
    }, error => {
      console.log(error);
    });
  }
  // getAllDesignations
  getAllDesignations() {
    this.outboundsvc.getAllDesignations().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.designations = res;
    }, error => {
      console.log(error);
    });
  }
  // gettingsectionid
  sectionId(value) {
    console.log(value);
    this.sectionid = value;
    this.getSubSectionss(this.sectionId);
  }
  // getting subsectionid
  subsectionId(value) {
    console.log(value);
  }
  // designationId
  designationId(value) {
    console.log(value);
  }
  // newdata
  // getSubSections
  getSubSectionss(value :any) {
    this.outboundsvc.getSubSections(this.sectionid).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.subsections = res;
    }, error => {
      console.log(error);
    });
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
   dispatchItem(value) {
    console.log(value);
  }
  // getDispatchTypes
  getDispatchItems() {
    this.outboundsvc.getDispatchItems().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.dispatchitems = res;
    }, error => {
      console.log(error);
    });
  }
  // getting dispatchId
  dispatchId(value) {
    console.log(value);
  }
  //getting entity value
  entityId(value) {
    console.log(value);
  }
  // File Select
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files;
      console.log(filesAmount);
      this.files.push(filesAmount[0]);
      console.log(this.files);
    }
  }
  // For multiple files
  // Form Array For File Upload
  createItem(): FormGroup {
    return this.fb.group({
      evidenceFile: [this.file]
    });
  }

  // Add New Fileipload Row
  addItem(): void {
    this.items = this.edittForm.get('items') as FormArray;
    console.log(this.items.length);
    if (this.items.length <= 4) {
      this.items.push(this.createItem());
    }
  }

  // Delete New Fileipload Row
  deleteFieldValue(i: any) {
    console.log(this.items);
    console.log(i);
    const incentiveItemsData = this.edittForm.get('items') as FormArray;
    incentiveItemsData.removeAt(i);

  }
// key press event
  keyPress(event: any) {
    const pattern = /^[^-\s][0-9 ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // getallCountries
  getAllCountries() {
    this.usrmgtService.getAllCountrie().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res, "allcountries");
      this.countries = res;
    }, error => {
      console.log(error);
    });
  }
  //Get States
  getStates(value) {
    console.log(value, "value");
    this.usrmgtService.getAllStates(value).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res, "all states sss");
      this.statesList = res;
    }, error => {
      console.log(error);
    });
  }
  // getCities
  getCities(value) {
    console.log(value);
    this.usrmgtService.getAllCities(value).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.citiesList = res;
    }, error => {
    });
  }
  // getDespatchById
  getDispatchById() {
    this.outboundsvc.getDispatchById(this.dispatchid).pipe(takeUntil(this.subscribe)).subscribe(res => {
      
      this.despatchinfo = res;
      console.log(this.despatchinfo.createdDate);
      this.sectionid =this.despatchinfo.section.sectionId;
      console.log(this.sectionid);
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
   
       this.getSubSectionss(this.sectionid);
      this.getStates(this.despatchinfo.address.country);
      this.getCities(this.despatchinfo.address.state);
      this.edittForm.patchValue({
        "dfno": this.despatchinfo.dispatchRefNumber,
        "section": this.despatchinfo.section.sectionId,
        "subsection": this.despatchinfo.subSection.subSectionId,
        "subject": this.despatchinfo.dispatchSubject,
        "year": this.despatchinfo.createdDate,
        "despatchvia": this.despatchinfo.dispatchType.dispatchTypeId,
        "despatchitem":this.despatchinfo.dispatchItemTypes.dispatchItemTypeId,
        "sendername": this.despatchinfo.senderName,
        "fileheading": this.despatchinfo.senderFileHeading,
        "sendingsection": this.despatchinfo.senderSection.sectionId,
        "designation": this.despatchinfo.senderDesignation.designationId,
        "recepientname": this.despatchinfo.recipeintName,
        "fileno": this.despatchinfo.senderFileNumber,
        "emailId": this.despatchinfo.recipeintEmail,
        "contactno": this.despatchinfo.recipeintMobile,
        "org": this.despatchinfo.entityMaster.entityMasterId,
        "others": this.despatchinfo.othersName,
        "address": this.despatchinfo.address.line1,
        "country": this.despatchinfo.address.country,
        "city": this.despatchinfo.address.city,
        "state": this.despatchinfo.address.state,
        "pincode": this.despatchinfo.address.zipCode,
        "matter": this.despatchinfo.dakMatterOrComments,
      });
    }, error => {
      console.log(error);
    });
  }
      // File upload
      getFileDetails(e) {
        console.log(e.target.files);
        if (this.files.length !== 5) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < e.target.files.length; i++) {
            this.files.push(e.target.files[i]);
          }
          console.log(this.files);
        }
      }
      // Remove Files From List OF Files
      removed(id) {
        console.log(this.files);
        this.files.splice(id, 1);
        console.log(this.files);
      }
  // update despatch method
  updateDespatch() {
    console.log(this.edittForm.value.country);

    let obj =
    {
      "dispatchId": this.dispatchid,
      "address": {
        "city": this.edittForm.value.city,
        "line1": this.edittForm.value.address,
        "state": this.edittForm.value.state,
        "zipCode": this.edittForm.value.pincode,
        "country": this.edittForm.value.country
      },
      "dakStatus": {
        "status": 0,
        "statusCode": "FWD",
        "statusId": 1,
        "statusName": "",
        "version": 0
      },
      "dakMatterOrComments": this.edittForm.value.matter,
      "dispatchRefNumber": this.edittForm.value.dfno,
      "dispatchSubject": this.edittForm.value.subject,
      "dispatchUserId": sessionStorage.getItem('userId-usec'),
      "dispatchType": {
        "dispatchTypeId": this.edittForm.value.despatchvia
      },
      "dispatchItemTypes":{

        "dispatchItemTypeId":this.edittForm.value.despatchitem
        },
      "dispatchDate": this.edittForm.value.year,
      "entityMaster": {
        "entityMasterId": this.edittForm.value.organization
      },
      "organizationOrOthers": false,
      "othersName": this.edittForm.value.others,
      "recipeintEmail": this.edittForm.value.emailId,
      "recipeintMobile": this.edittForm.value.contactno,
      "recipeintName": this.edittForm.value.recepientname,
      "section": {
        "sectionId": this.edittForm.value.section
      },
      "senderDesignation": {
        "designationId": this.edittForm.value.designation
      },
      "senderFileHeading": this.edittForm.value.fileheading,
      "senderFileNumber": this.edittForm.value.fileno,
      "senderName": this.edittForm.value.sendername,
      "senderSection": {
        "sectionId": this.edittForm.value.sendingsection
      },
      "subSection": {
        "subSectionId": this.edittForm.value.subsection
      }
    }
    console.log(obj);
    console.log(this.files);
    debugger
    this.outboundsvc.updateDespatch(this.files,obj).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.edittForm.reset();
      this.tostar.success('Dispatch Edited Successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['/main/internal/outbound/secExc/dashboard']);
    }, error => {
      console.log(error);
    });
  }
  //resetting form 
  clear(){
    this.files = [];
    this.edittForm.reset();
    this.edittForm.controls.section.setValue('', { onlySelf: true });
    this.edittForm.controls.subsection.setValue('', { onlySelf: true });
    this.edittForm.controls.despatchvia.setValue('', { onlySelf: true });
    this.edittForm.controls.despatchitem.setValue('', { onlySelf: true });
    this.edittForm.controls.sendingsection.setValue('', { onlySelf: true });
    this.edittForm.controls.designation.setValue('', { onlySelf: true });
    this.edittForm.controls.org.setValue('', { onlySelf: true });
    this.edittForm.controls.country.setValue('', { onlySelf: true });
    this.edittForm.controls.state.setValue('', { onlySelf: true });
    this.edittForm.controls.city.setValue('', { onlySelf: true });
  }

  // For Validations
  get f() { return this.edittForm.controls; }
// Destroy The Subscribe Dta
ngOnDestroy() {
  this.subscribe.next();
  this.subscribe.complete();
}}
