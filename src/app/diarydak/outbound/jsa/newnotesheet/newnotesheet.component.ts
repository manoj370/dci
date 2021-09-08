import { forkJoin, Subject } from 'rxjs';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { appConstants } from 'src/app/common-service/const.model';
import { OutboundService } from '../../services/outbound.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { JSAConstantServices } from '../../models/jsaconst.model';
import { urlServices } from '../../services/outboundServiceUrls';
import { InboundservicesService } from 'src/app/diarydak/inbound/services/inboundservices.service';



@Component({
  selector: 'app-newnotesheet',
  templateUrl: './newnotesheet.component.html',
  styleUrls: ['./newnotesheet.component.css']
})
export class NewnotesheetComponent implements OnInit, OnDestroy {
  @ViewChild('openModal') openBtn: ElementRef<HTMLElement>;
  @ViewChild('openOthersModal') openOthersBtn: ElementRef<HTMLElement>;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('closeModal') filebtn: ElementRef<HTMLElement>;
  @ViewChild('openFileModal') openFileBtn: ElementRef<HTMLElement>;
  @ViewChild('selectFileModal') selectbtn: ElementRef<HTMLElement>;
  viaList: any = [];
  orgList: any = [];
  submitted = false;
  statesList: any = [];
  citiesList: any = [];
  citiesResponse = [];
  citiesEndorResponse = [];
  sectionList: any = [];
  filterSectionList: any = [];
  urgencyList: any = [];
  selectedOrgList: any = [];
  checkedType: any;
  files: any = [];
  patternNumber: any;
  categoryList: any = [];
  ccAddressArr: any = [];
  languagesList: any = [];
  noteSheetForm: FormGroup;
  subSectionList: any = [];
  designationList: any = [];
  checkedFileType: any;
  endorseAddressArr: any = [];
  toAddressArr: any = [];
  today = moment().format('YYYY-MM-DD');
  confidentialityList: any = [];
  radioButtonList = ['Single', 'Bulk'];
  fileButtonList = ['Draft'];
  subscribe: Subject<any> = new Subject<any>();
  ccRadioButtonList = ['Internal'];
  academicYearValue: any;
  i: any = 0;
  rowId = 10;
  pageId = 0;
  showdropdown: boolean;
  showothers: boolean;
  addressHideRequired = '';
  endorseHideRequired = '';
  showEditor: any;
  addressvalue: any = 0;
  academicYear: any = [
    '2021-22','2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16', '2014-15', '2013-14', '2012-13', '2011-12', '2010-11', '2009-10'
    // '2021-20', '2020-19','2019-18', '2018-17', '2017-16', '2016-15', '2015-14', '2014-13', '2013-12', '2012-11', '2011-10', '2010-09'
  ];
  dispatchViaList: any = ['By Hand', 'By Courier', 'By SpeedPost'];
  showsearch: boolean;
  public form: FormGroup;
  radioButtonType: any;
  showsinglefields: boolean;
  showbulkfields: boolean;
  shortname: any;
  existingFilesList: any = [];

  showradio: boolean;
  showbtn: boolean = true;
  showccbtn: boolean = true;
  // showtoaddbtn: boolean = true;
  dispatchId: any;
  userid: any;
  sheetDetails: any;
  dentistDataShow: boolean;
  categoryvalue: any;
  currentyear: number;
  nextyear: number;
  refAcademicYear: string;
  designation: any;
  roleName: string;
  addresscategory: any;
  designationName: any;
  dfacheckbox: boolean;
  addresstype: any;
  type: any;
  addressTypeId: any;
  categoryname: any;
  // principalList: any;
  dmeList: any;
  healthsecList: any = [];
  advocateList: any;
  searchForm: FormGroup;
  useridd: any;
  addressid: any;
  bulkList: any;
  categoryaddress: any;
  endorseuseridd: any;
  endorseaddressid: any;
  popupindex: any;
  sectionName: any;
  searchFileForm: FormGroup;
  fileno: any;
  obj: any;
  pageCount: any;
  responsePageCount: any;
  showEnglishEditor: boolean = false;
  showHindiEditor: boolean = false;
  language: any;
  // loggedInSectionName: any;
  designationId: any;
  receiptTypes = ['Single', 'Bulk'];
  selectedOrg: any;
  newState: any;
  dispatchFileID: any = '';
  putupNoteSheetDesiginationId: any;
  showviapaper: boolean;
  paperData: any;
  dispatchViaId: number;
  // dispatchviaValue: any;
  defaultViaValue: string;
  emailvia: any;
  // showendorseviapaper: boolean;
  endorseemailvia: any;
  dispatchendorseViaId: number;
  dispatchendorseviaValue: any;
  paperendorseData: any;
  notesheetData: any;
  designationsList: any = [];
  correctionPersonList: any[];
  endorsesPaper = false;
  designationname: string[];
  showcollegelist: boolean = false;
  categoriesList: any = [];
  subcategoriesList: any = [];
  referenceValues: any = [];
  collegeList: any = [];
  subcategoryValue: any;
  receiptFileData: any;
  showreference: boolean = false;
  showcollege: boolean = false;
  refidvalue: any;
  subcategoryReference: any = [];
  downloadUrl: string;
  showdocs: boolean = false;
  selectedHealthList: any = [];
  selectedAdvocateList: any = [];
  showerrormsg: boolean = false;
  showendorsemsg: boolean = false;
  public PageCounts: any = 1;
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  responseDmePageCount: any;
  showreceiptdocs: boolean = false;
  searchOthersForm: FormGroup;
  otherList: any;
  responseOthersPageCount: any;
  showdfa: boolean = true;
  fileEntity: any = {
    entityMaster: {},
    sectionId: 10,
    sectionName: "File",
    shortName: "F"
  }
  sectionId: number;
  refForm: FormGroup;
  refacademicyear: any;
  sectionReferenc: string;
  indexNumber: number;
  dakDispatchFileId: any;
  showfilecollege: boolean =false;
  showfilereference: boolean =false;
  refidvalues: any;
  academicYearValues: any;
  categoriesListt: any;
  subcategoriesListt: any;
  collegeListt: any;
  referenceValuess: any;
  subcategoryReferences: any;
  dispatchFiledata: any;
  docList: any=[];
  constructor(public router: Router, public outboundsvc: OutboundService, public inboundsvc: InboundservicesService, public tostar: ToastrService,
    public fb: FormBuilder, public usrmgtService: UsrmgtService, public activatedRoute: ActivatedRoute,
    public appConst: appConstants, public helper: HelperService, public jasConst: JSAConstantServices,
    private _form: FormBuilder, public url: urlServices,) { }

  ngOnInit() {
    let d = new Date();
    let n = d.getFullYear();
    this.refacademicyear = n + '-' + (n + 1).toString().substr(-2);
    this.roleName = sessionStorage.getItem('selectedRole-usec');
    this.receiptFileData = this.activatedRoute.queryParams['_value'];
    this.dispatchFiledata = this.activatedRoute.queryParams['_value'];
    console.log(this.receiptFileData);
    console.log( this.dispatchFiledata);
    this.getSubSections(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId);
    this.sectionId = JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId

    this.activatedRoute.params.subscribe((params: Params) => this.dispatchId = params.id);
    // this.activatedRoute.params.subscribe((params: Params) =>  console.log(JSON.parse(params.data)));
    console.log(this.activatedRoute.queryParams['_value']);
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log(+params._value);
        // this.page = +params['data'] || 0;
      });


    // if (this.dispatchId !== '0') {
    //   this.JoinCalls();
    //   this.getSavedNoteSheetDetails(this.dispatchId);
    // } else {
    this.JoinCalls();
    // }
    // Validations

    this.refForm = this.fb.group({
      filerefSection: [{ value: JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName, disabled: true }, Validators.required],
      filerefSubSection: ['', Validators.required],
       filecategory: ['', Validators.required],
       filesubCategory: ['', Validators.required],
       filereference: [''],
       filecollege: [''],
      filerefCollegeId: [''],
      filerefSubjectId: [''],
      filerefYear: [{ value: n, disabled: true }],
       filerefAcademicYear: [new Date().getFullYear() + '-' + (new Date().getFullYear() + 1).toString().substr(-2), [Validators.required]],
       filerefReferenceNumber: [{ value: '', disabled: true }],
    });

    this.noteSheetForm = this.fb.group({
      checkoruncheck: [''],
      refSection: [{ value: JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName, disabled: true }],
      refSubSection: ['', Validators.required],
      // refSubject: ['', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)]],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      college: [''],
      refCollegeId: [''],
      reference: [''],
      refSubjectId: [''],
      refYear: [{ value: new Date().getFullYear(), disabled: true }],
      refAcademicYear: [new Date().getFullYear() + '-' + (new Date().getFullYear() + 1).toString().substr(-2)],
      // refDispatchDate: [''],
      refReferenceNumber: [{ value: '', disabled: true }],
      cateDispatchCate: ['', Validators.required],
      cateDispatchLanguage: ['', Validators.required],
      cateDispatchUrgency: ['', Validators.required],
      cateDispatchConfidential: [''],
      senderDesignation: ['', Validators.required],
      // senderName: ['', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)]],
      senderName: [{ value: '', disabled: true }],
      endorseAddress: this.fb.array([]),
      ccAddress: this.fb.array([]),
      comments: ['', Validators.required],
      attachdfa: [false],
      dfaSubject: [''],
      dfaHindiSubject: [''],
      dfacomments: [''],
      dfahindiComments: [''],
      file: ['']
    });

    this.initializeForm();
    // this.changeReceiptType('Single', this.i);
    // this.academicYearValue = this.refAcademicYear;

    this.activatedRoute.params.subscribe((params: Params) => this.userid = params.userId);
    this.searchForm = this.fb.group({
      state: [''],
      searchValue: ['']
    });
    this.searchFileForm = this.fb.group({
      fileno: ['']
    });
    // others category
    this.searchOthersForm = this.fb.group({
      name: [''],
      phoneno: ['']
    })
  }

  get receipt() { return this.refForm.controls; }

  get f() { return this.noteSheetForm.controls; }
  // Fork Join Call Parallel Api Calls Into Single APi call
  JoinCalls() {
    const viaCall = this.outboundsvc.getDispatchVia();
    const stateCall = this.usrmgtService.getAllStates(1);
    const categoriesCall = this.outboundsvc.getAllDispatchCategories();
    const sectionsCall = this.outboundsvc.getAllDCISections();
    const languageCall = this.outboundsvc.getAllReceiptLanguages();
    const urgencyCall = this.outboundsvc.getAllDispatchesUrgency();
    const organizationCall = this.outboundsvc.getAllOrganizations();
    const confidentialityCall = this.outboundsvc.getDispatchConfidentiality();
    const addressCategory = this.outboundsvc.getAddressCategory();

    // const allSectionHeadCall = this.outboundsvc.getAllSectionHeads(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName);
    const allSectionHeadCall = this.outboundsvc.senderDesignationUserList(JSON.parse(sessionStorage.getItem('userId-usec')))
    forkJoin([viaCall, categoriesCall, sectionsCall, languageCall, urgencyCall,
      confidentialityCall, organizationCall, allSectionHeadCall, stateCall, addressCategory]).subscribe(results => {
        console.log(results);
        this.viaList = results[0];
        this.categoryList = results[1];
        this.sectionList = results[2];
        this.filterSectionList = this.sectionList.filter(item => item.sectionId !== this.sectionId)
        this.filterSectionList.push(this.fileEntity);
        this.languagesList = results[3];
        this.urgencyList = results[4];
        this.confidentialityList = results[5];
        this.orgList = results[6];
        this.statesList = results[8];
        this.designationList = results[7];
        this.addresscategory = results[9];
        debugger
        if (this.dispatchId !== '0') {
          this.getSavedNoteSheetDetails(this.dispatchId);
        } 
        else if (this.receiptFileData.filenumber !== undefined && this.receiptFileData.type ==='receipt') {
          this.outboundsvc.getCategoryBySubsection(this.receiptFileData.subSection).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.categoriesList = res;
            this.sectionReference();
          }, error => {
            console.log(error);
          });
          this.outboundsvc.getSubCategoryByFileCategory(this.receiptFileData.fileCate).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.subcategoriesList = res;
          }, error => {
            console.log(error);
          });
          // this.receiptFileData.reference
          this.outboundsvc.getSubCategoryReferenceBySubCategory(this.receiptFileData.reference).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.subcategoryReference = res;
            this.sectionReference();
          }, error => {
            console.log(error);
          });
          this.sectionList.forEach(element => {
            if (parseInt(this.receiptFileData.section) === element.sectionId) {
              this.noteSheetForm.patchValue({
                refSection: element.sectionName,
              })
            }
          });
          // if (this.receiptFileData.docpath) {
          //   this.showreceiptdocs = true;
          // } else {
          //   this.showreceiptdocs = false;
          // }
          if (this.receiptFileData && this.receiptFileData.docid) {
            this.docList = JSON.parse(this.receiptFileData.docid);
            this.showreceiptdocs = true;
            // this.receiptFileData['reference'] = this.receiptFileData.ref
            }else {
              this.showreceiptdocs = false;
            }
          debugger
          console.log(this.receiptFileData.isPrimary);
          if (this.receiptFileData.isPrimary === "1") {
            this.showdfa = true;
          } else {
            this.showdfa = false;
          }
          this.noteSheetForm.patchValue({
            // refSection: this.receiptFileData.section,
            refSubSection: this.receiptFileData.subSection !== null ? this.receiptFileData.subSection : '',
            category: this.receiptFileData.fileCate,
            subCategory: this.receiptFileData.fileSubCate,
            refAcademicYear: this.receiptFileData.financialYear,
            refReferenceNumber: this.receiptFileData.filenumber,
            cateDispatchCate: this.receiptFileData.cate,
            cateDispatchUrgency: this.receiptFileData.urgency,
            cateDispatchConfidential: this.receiptFileData.confidentiality,
            reference: this.receiptFileData.reference
          });
          debugger
          if (this.receiptFileData.fileSubCate === "1" || this.receiptFileData.fileSubCate === 1) {
            this.showcollege = true;
            this.showreference = false;
            this.outboundsvc.getAllCollege().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              console.log(res);
              this.collegeList = res;
              this.refidvalue = this.receiptFileData.college
              this.sectionReference();
              this.noteSheetForm.patchValue({
                college: this.receiptFileData.college,
                refCollegeId: this.receiptFileData.college,
              });

              // this.referenceValue(this.receiptFileData.college)
            }, error => {
              console.log(error);
            });
          } else {
            this.showreference = true;
            this.showcollege = false;
            this.outboundsvc.getReferenceBySubCategory(this.receiptFileData.fileSubCate).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              console.log(res);
              this.referenceValues = res;
              this.referenceIdValue(this.receiptFileData.fileSubRefnonCollege)
              const id = this.referenceValues.map(x => {
                if (x.fileSubjectReferenceId === parseInt(this.noteSheetForm.value.refSubjectId)) {
                  //  return x.shortName;
                  this.refidvalue = x.shortName;
                }
              }).join('');
              // this.refidvalue=this.receiptFileData.fileSubRefnonCollege
              this.sectionReference();
              this.noteSheetForm.patchValue({
                reference: this.receiptFileData.reference,
                refSubjectId: this.receiptFileData.fileSubRefnonCollege,
              });
              this.outboundsvc.getSubCategoryReferenceBySubCategory(this.receiptFileData.fileSubCate).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
                console.log(res);
                this.subcategoryReference = res;
                this.sectionReference();
              }, error => {
                console.log(error);
              });
              // this.referenceValue(this.receiptFileData.fileSubRefnonCollege)
            }, error => {
              console.log(error);
            });
          }
            this.noteSheetForm.controls.cateDispatchCate.disable();
            this.noteSheetForm.controls.cateDispatchUrgency.disable();
            this.noteSheetForm.controls.cateDispatchConfidential.disable();
         
        }
        else if(this.dispatchFiledata && this.dispatchFiledata.type ==='dispatch'){
            this.outboundsvc.getCategoryBySubsection(this.dispatchFiledata.subSections).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              console.log(res);
              this.categoriesList = res;
              this.sectionReference();
            }, error => {
              console.log(error);
            });
            this.outboundsvc.getSubCategoryByFileCategory(this.dispatchFiledata.fileCates).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              console.log(res);
              this.subcategoriesList = res;
            }, error => {
              console.log(error);
            });
            // this.receiptFileData.reference
            this.outboundsvc.getSubCategoryReferenceBySubCategory(this.dispatchFiledata.references).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              console.log(res);
              this.subcategoryReference = res;
              this.sectionReference();
            }, error => {
              console.log(error);
            });
            this.sectionList.forEach(element => {
              if (parseInt(this.dispatchFiledata.sections) === element.sectionId) {
                this.noteSheetForm.patchValue({
                  refSection: element.sectionName,
                })
              }
            });
            debugger
            this.noteSheetForm.patchValue({
              //  refSection: this.dispatchFiledata.section,
              refSubSection: this.dispatchFiledata.subSections !== null ? this.dispatchFiledata.subSections : '',
              category: this.dispatchFiledata.fileCates,
              subCategory: this.dispatchFiledata.fileSubCates,
              refAcademicYear: this.dispatchFiledata.financialYears,
              refReferenceNumber: this.dispatchFiledata.filenumbers,
              reference: this.dispatchFiledata.references ===""?"":this.dispatchFiledata.references
            });
            debugger
            if (this.dispatchFiledata.fileSubCates === "1" || this.dispatchFiledata.fileSubCates === 1) {
              this.showcollege = true;
              this.showreference = false;
              this.outboundsvc.getAllCollege().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
                console.log(res);
                this.collegeList = res;
                this.refidvalue = this.dispatchFiledata.colleges
                this.sectionReference();
                this.noteSheetForm.patchValue({
                  college: this.dispatchFiledata.colleges,
                  refCollegeId: this.dispatchFiledata.colleges,
                });
  
                // this.referenceValue(this.receiptFileData.college)
              }, error => {
                console.log(error);
              });
            } else {
              this.showreference = true;
              this.showcollege = false;
              this.outboundsvc.getReferenceBySubCategory(this.dispatchFiledata.fileSubCates).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
                console.log(res);
                this.referenceValues = res;
                this.referenceIdValue(this.dispatchFiledata.fileSubRefnonColleges)
                const id = this.referenceValues.map(x => {
                  if (x.fileSubjectReferenceId === parseInt(this.noteSheetForm.value.refSubjectId)) {
                    //  return x.shortName;
                    this.refidvalue = x.shortName;
                  }
                }).join('');
                // this.refidvalue=this.receiptFileData.fileSubRefnonCollege
                this.sectionReference();
                this.noteSheetForm.patchValue({
                  reference: this.dispatchFiledata.referenceValues,
                  refSubjectId: this.dispatchFiledata.fileSubRefnonColleges,
                });
                this.outboundsvc.getSubCategoryReferenceBySubCategory(this.dispatchFiledata.fileSubCates).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
                  console.log(res);
                  this.subcategoryReference = res;
                  this.sectionReference();
                }, error => {
                  console.log(error);
                });
                // this.referenceValue(this.receiptFileData.fileSubRefnonCollege)
              }, error => {
                console.log(error);
              });
            }
          }
        
    
        this.helper.sortedData(this.orgList, 'name');
        this.helper.sortedData(this.viaList, 'name');
        this.helper.sortedData(this.urgencyList, 'name');
        this.helper.sortedData(this.categoryList, 'name');
        this.helper.sortedData(this.languagesList, 'name');
        this.helper.sortedData(this.sectionList, 'sectionName');
        this.helper.sortedData(this.confidentialityList, 'name');

        console.log(this.addresscategory);
        // this.designationList.forEach(item => {
        //   Object.keys(item).forEach(key => {
        //     this.designationsList.push(key)
        //     this.noteSheetForm.get('senderDesignation').setValue(item[key][0].designation.designationName);
        //     this.noteSheetForm.get('senderName').setValue(item[key][0].firstName + ' ' + item[key][0].lastName);
        //     this.putupNoteSheetDesiginationId = item[key][0].designation.designationId
        // this.designationList = results[7];
        console.log(this.designationList);

        this.designationList.forEach(item => {
          Object.keys(item).forEach(key => {
            this.designationsList.push(key)
            this.designationname = Object.keys(item);
            if (this.designationname[0] !== 'Joint Secretary' && this.designationname[0] !== 'Secretary') {
              console.log(this.designationname[0]);
              if (this.dispatchId === '0') {
                this.noteSheetForm.get('senderDesignation').setValue(this.designationname[0]);
                this.noteSheetForm.get('senderName').setValue(item[key][0].firstName + ' ' + item[key][0].lastName);
              }
              this.putupNoteSheetDesiginationId = item[key][0].designation.designationId;
              console.log(this.putupNoteSheetDesiginationId);
            }
            //   console.log(item[key]);
            // this.noteSheetForm.get('senderDesignation').setValue(item[key][0].designation.designationName);
            // this.noteSheetForm.get('senderName').setValue(item[key][0].firstName + ' ' + item[key][0].lastName);
            // this.putupNoteSheetDesiginationId = item[key][0].designation.designationId;
          })
        });
        console.log(this.putupNoteSheetDesiginationId);
        // this.putupNoteSheetDesiginationId = results[7][0].designation.designationId;
        // this.noteSheetForm.get('senderDesignation').setValue(results[7][0].designation.designationName);
        // this.noteSheetForm.get('senderName').setValue(results[7][0].firstName + ' ' + results[7][0].lastName);
        // this.noteSheetForm.get('senderDesignation').setValue('1');
        // this.noteSheetForm.get('senderName').setValue('Mukesh Kumar');
      }, error => {
        this.helper.errorMessage(error);
      });
  }
  // getSubSections
  getSubSections(id: any) {
    this.outboundsvc.getSubSections(id).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.subSectionList = res;
      this.helper.sortedData(this.subSectionList, 'name');
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  getSection(id: any, index: any) {
    if (id == 10) {
      this.indexNumber = index;
      this.openFileBtn.nativeElement.click();
    }
  }
  // getCities
  getCities(value, addrType: string, groupName) {

    this.usrmgtService.getAllCities(value).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.citiesList = res;

      if (addrType === 'R') {
        this.citiesResponse[groupName] = res;
      } else {
        console.log("testendose");
        this.citiesEndorResponse[groupName] = res;
      }

    }, error => {
      this.helper.errorMessage(error);
    });
  }
  // Event for Email validation based on via
  dispatchVia(data, type: any) {
    console.log(data);
    if (type === 'toAddress') {
      this.addressHideRequired = data;
    } else {
      this.endorseHideRequired = data;
    }
  }


  // Endorses FormArray 
  endorseAddress(): FormArray {
    return this.noteSheetForm.get('endorseAddress') as FormArray;
  }
  // CC Address Form Array
  ccAddress(): FormArray {
    return this.noteSheetForm.get('ccAddress') as FormArray;
  }
  // Forms
  ccForm(): FormGroup {
    return this.fb.group({
      ccInternalSection: '',
      isSectionReference: false,
      sectionRef: ''
    });
  }
  endorseeForm(): FormGroup {
    return this.fb.group({
      endorseevia: [''],
      endorseeviaType1: [true],
      endorseeviaType2: [''],
      endorseeviaType3: ['By SpeedPost'],
      // endorseeviaType4: [''],
      // endorseeviaType5: [''],
      endorseeName: [''],
      endorseeEmail: [''],
      endorseeContact: [''],
      endorseeOrg: [''],
      endorseeAddressLine1: [''],
      endorseeAddressLine2: [''],
      endorseeState: [''],
      endorseeCity: [''],
      endorseeZipCode: [''],
      endorseeRemark: [''],
      endorseuserid: [''],
      endorseaddressid: ['']
    });
  }
  initializeForm() {
    this.form = this._form.group({
      itemRows: this._form.array([]),
    });
  }
  //   get someChecked()
  // {
  //    return allFunctions?allFunctions.some(x=>x.IsSelected):false
  // }
  itemRows() {
    debugger
    return this._form.group({
      radioOption: ['Single'],
      addressOrganization: [''],
      selectedCategory: [{ value: '', disabled: true }],
      addressReceiptName: [''],
      addressvia: [''],
      addressviaType1: [true],
      addressviaType2: [''],
      addressviaType3: ['By SpeedPost'],
      // addressviaType4: [''],
      // addressviaType5: [''],
      addressReceiptEmailId: [''],
      addressContactNumber: [''],
      addressLine1: [''],
      addressLine2: [''],
      addressState: [''],
      addressCity: [''],
      addressZipCode: [''],
      receiptBulkOption: [''],
      Toaddressuserids: [''],
      Toaddressids: ['']
    });
  }
  // Generating the reference Number
  sectionReference() {
    const d = new Date();
    const n = d.getFullYear();
    const year = n;
    const sectionIdValue = this.sectionList.map(x => {
      if (x.sectionId === (JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId)) {
        return x.shortName;
      }
    }).join('');
    const suSectionIdValue = this.subSectionList.map(x => {
      if (x.subSectionId === parseInt(this.noteSheetForm.value.refSubSection)) {
        return x.shortName;
      }
    }).join('');
    const categoryValue = this.categoriesList.map(x => {
      if (x.fileCategoryId === parseInt(this.noteSheetForm.value.category)) {
        return x.shortName;
      }
    }).join('');
    const subCategoryValue = this.subcategoriesList.map(x => {
      if (x.fileSubCategoryId === parseInt(this.noteSheetForm.value.subCategory)) {
        return x.shortName;
      }
    }).join('');

    // this.patternNumber = 'DCI' + '/' + sectionIdValue + '/' + suSectionIdValue + '/'
    //   + this.noteSheetForm.value.refSubject + '/' + this.noteSheetForm.value.refSubjectId + '/' +
    //   year + '/' + this.noteSheetForm.value.refAcademicYear;
    debugger
    // this.patternNumber = 'DCI' + '/' + sectionIdValue + '/' + suSectionIdValue + '/' + categoryValue + '/' + subCategoryValue + '/' +
    //   +this.refidvalue + '/' +this.noteSheetForm.value.refAcademicYear  + '/' + year;
    this.patternNumber = `DCI/${sectionIdValue}/${suSectionIdValue}/${categoryValue}/${subCategoryValue}/${this.refidvalue}/${this.noteSheetForm.value.refAcademicYear}/${year}`;
    console.log(this.patternNumber);
    this.noteSheetForm.get('refReferenceNumber').setValue(this.patternNumber);
  }
  // subSection
  subSection(value) {
    console.log(value);
    this.noteSheetForm.controls.category.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.subCategory.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.college.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.refCollegeId.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.reference.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.refSubjectId.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.refReferenceNumber.setValue('', { onlySelf: true });
    this.outboundsvc.getCategoryBySubsection(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.categoriesList = res;
      this.sectionReference();
    }, error => {
      console.log(error);
    });

  }
  // subSection
  subSections(value) {
    this.refForm.controls.filecategory.setValue('', { onlySelf: true });
    this.refForm.controls.filesubCategory.setValue('', { onlySelf: true });
    this.refForm.controls.filecollege.setValue('', { onlySelf: true });
    this.refForm.controls.filerefCollegeId.setValue('', { onlySelf: true });
    this.refForm.controls.filereference.setValue('', { onlySelf: true });
    this.refForm.controls.filerefSubjectId.setValue('', { onlySelf: true });
    this.refForm.controls.filerefReferenceNumber.setValue('', { onlySelf: true });
    this.outboundsvc.getCategoryBySubsection(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.categoriesListt = res;
      this.refno();
    }, error => {
      console.log(error);
    });

  }
  // category
  category(value) {
    this.noteSheetForm.controls.subCategory.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.college.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.refCollegeId.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.reference.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.refSubjectId.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.refReferenceNumber.setValue('', { onlySelf: true });
    this.outboundsvc.getSubCategoryByFileCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.subcategoriesList = res;
      this.sectionReference();
      // if (this.dispatchId !== '0' && this.dispatchId !== 0) {

      // } else {
      //   this.noteSheetForm.controls.subCategory.setValue('', { onlySelf: true });
      //   this.noteSheetForm.controls.college.setValue('', { onlySelf: true });
      //  this.noteSheetForm.controls.refCollegeId.setValue('', { onlySelf: true });
      //  this.noteSheetForm.controls.reference.setValue('', { onlySelf: true });
      //  this.noteSheetForm.controls.refSubjectId.setValue('', { onlySelf: true });

      // }

    }, error => {
      console.log(error);
    });
  }
  categorys(value) {
    debugger
    this.refForm.controls.filesubCategory.setValue('', { onlySelf: true });
    this.refForm.controls.filecollege.setValue('', { onlySelf: true });
    this.refForm.controls.filerefCollegeId.setValue('', { onlySelf: true });
    this.refForm.controls.filereference.setValue('', { onlySelf: true });
    this.refForm.controls.filerefSubjectId.setValue('', { onlySelf: true });
    this.refForm.controls.filerefReferenceNumber.setValue('', { onlySelf: true });
    this.outboundsvc.getSubCategoryByFileCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.subcategoriesListt = res;
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
      this.showcollege = true;
      this.showreference = false;
      this.noteSheetForm.controls.college.setValidators(Validators.required);
      this.noteSheetForm.controls['college'].updateValueAndValidity();
      this.noteSheetForm.controls.refCollegeId.setValidators(Validators.required);
      this.noteSheetForm.controls['refCollegeId'].updateValueAndValidity();
      this.noteSheetForm.controls.refSubjectId.clearValidators();
      this.noteSheetForm.controls['refSubjectId'].updateValueAndValidity();
      this.outboundsvc.getAllCollege().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.collegeList = res;
        this.sectionReference();
      }, error => {
        console.log(error);
      });
      this.noteSheetForm.controls.refSubjectId.setValue('', { onlySelf: true });
    } else {
      this.showreference = true;
      this.showcollege = false;
      this.noteSheetForm.controls.refSubjectId.setValidators(Validators.required);
      this.noteSheetForm.controls['refSubjectId'].updateValueAndValidity();
      this.noteSheetForm.controls.college.clearValidators();
      this.noteSheetForm.controls['college'].updateValueAndValidity();
      this.noteSheetForm.controls.refCollegeId.clearValidators();
      this.noteSheetForm.controls['refCollegeId'].updateValueAndValidity();
      this.outboundsvc.getReferenceBySubCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.referenceValues = res;
        this.sectionReference();
      }, error => {
        console.log(error);
      });
      this.outboundsvc.getSubCategoryReferenceBySubCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.subcategoryReference = res;
        this.sectionReference();
      }, error => {
        console.log(error);
      });
      this.noteSheetForm.controls.refCollegeId.setValue('', { onlySelf: true });
      this.noteSheetForm.controls.college.setValue('', { onlySelf: true });
    }

  }
  subcategorys(value) {
    debugger
    console.log(value);
    // this.subcategoryValue = value;
    if (value === "1" || value === 1) {
      this.showfilecollege = true;
      this.showfilereference = false;
      this.refForm.controls.filecollege.setValidators(Validators.required);
      this.refForm.controls['filecollege'].updateValueAndValidity();
      this.refForm.controls.filerefCollegeId.setValidators(Validators.required);
      this.refForm.controls['filerefCollegeId'].updateValueAndValidity();
      this.refForm.controls.filerefSubjectId.clearValidators();
      this.refForm.controls['filerefSubjectId'].updateValueAndValidity();
      this.outboundsvc.getAllCollege().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.collegeListt = res;
        this.refno();
      }, error => {
        console.log(error);
      });
       this.refForm.controls.filerefSubjectId.setValue('', { onlySelf: true });
    } else {
      this.showfilecollege = false;
      this.showfilereference = true;
      this.refForm.controls.filerefSubjectId.setValidators(Validators.required);
      this.refForm.controls['filerefSubjectId'].updateValueAndValidity();
      this.refForm.controls.filecollege.clearValidators();
      this.refForm.controls['filecollege'].updateValueAndValidity();
      this.refForm.controls.filerefCollegeId.clearValidators();
      this.refForm.controls['filerefCollegeId'].updateValueAndValidity();
      this.outboundsvc.getReferenceBySubCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.referenceValuess = res;
        this.refno();
      }, error => {
        console.log(error);
      });
      this.outboundsvc.getSubCategoryReferenceBySubCategory(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.subcategoryReferences = res;
        this.refno();
      }, error => {
        console.log(error);
      });
      this.refForm.controls.filerefCollegeId.setValue('', { onlySelf: true });
      this.refForm.controls.filecollege.setValue('', { onlySelf: true });
    }

  }
  // referenceValue
  referenceValue(value) {
    console.log(value);
    debugger
    this.refidvalue = value;
    this.noteSheetForm.get('refCollegeId').setValue(value);
    this.sectionReference();
  }
  referenceIdValue(value) {
    // this.refidvalue =value;
    this.noteSheetForm.get('refSubjectId').setValue(value);
    console.log(this.referenceValues);
    const id = this.referenceValues.map(x => {
      if (x.fileSubjectReferenceId === parseInt(this.noteSheetForm.value.refSubjectId)) {
        //  return x.shortName;
        this.refidvalue = x.shortName;
      }
    }).join('');
    this.sectionReference();
  }
  referenceIdValues(value){
    // this.refidvalue =value;
    this.refForm.get('filerefSubjectId').setValue(value);
    const id = this.referenceValuess.map(x => {
      if (x.fileSubjectReferenceId === parseInt(this.refForm.value.filerefSubjectId)) {
        //  return x.shortName;
        this.refidvalues =x.shortName;
      }
    }).join('');
   this.refno();
  }

  // Saved NoteSheet
  getSavedNoteSheetDetails(id: any) {
    this.outboundsvc.getDispatchById(id).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data.dispatchDocuments);
      this.showdocs = true;
      this.notesheetData = data;
      // this.getSubSections(data.dakDispatchFileNos.section.sectionId);
      this.subSection(data.dakDispatchFileNos.subSection.subSectionId);
      this.category(data.dakDispatchFileNos.dakFileCategory.fileCategoryId);
      // this.subcategory(data.dakDispatchFileNos.dakFileSubCategory.fileSubCategoryId)
      this.dispatchFileID = data.dakDispatchFileNos.dakDispatchFileId;
      debugger
      this.noteSheetForm.patchValue({
        refSubSection: data.dakDispatchFileNos.subSection.subSectionId !== null ? data.dakDispatchFileNos.subSection.subSectionId : '',
        category: data.dakDispatchFileNos.dakFileCategory.fileCategoryId,
        subCategory: data.dakDispatchFileNos.dakFileSubCategory.fileSubCategoryId, refSubject: data.dakDispatchFileNos.subjectRef !== null ? data.dakDispatchFileNos.subjectRef : '',
        // refSubjectId: data.dakDispatchFileNos.subjectId !== null ? data.dakDispatchFileNos.subjectId : '',
        refAcademicYear: data.dakDispatchFileNos.financialYear !== null ? data.dakDispatchFileNos.financialYear : '',
        refDispatchDate: moment(data.dispatchByDate).format('YYYY-MM-DD'),
        refReferenceNumber: data.dakDispatchFileNos.dakDispatchFileNo !== null ? data.dakDispatchFileNos.dakDispatchFileNo : '',
        cateDispatchCate: data.dispatchCategories.categoryId !== null ? data.dispatchCategories.categoryId : '',
        cateDispatchLanguage: data.receiptLanguageId.receiptLanguageId !== null ? data.receiptLanguageId.receiptLanguageId : '',
        cateDispatchUrgency: data.dispatchUrgency.urgencyId !== null ? data.dispatchUrgency.urgencyId : '',
        cateDispatchConfidential: data.dispatchConfidentialityType !== null ? data.dispatchConfidentialityType.dispatchModeId : '',
        senderDesignation: data.senderDesignation.designationName !== null ? data.senderDesignation.designationName : '',
        senderName: data.senderName,
        attachdfa: data.isDispatchWithDfa,
        dfaSubject: data.dfaSubject !== null ? data.dfaSubject : '',
        dfaHindiSubject: data.dfaHindiSubject !== null ? data.dfaHindiSubject : '',
        dfahindiComments: data.dfaHindiContents !== null ? atob(data.dfaHindiContents) : '',
        dfacomments: data.dfaContents !== null ? atob(data.dfaContents) : '',
        comments: data.noteSheetContents !== null ? atob(data.noteSheetContents) : ''
      });
      // if (data.isDispatchWithDfa === true) {
      debugger
      if (data.dakDispatchFileNos.dakFileSubCategory.fileSubCategoryId === 1) {
        this.subcategory(data.dakDispatchFileNos.dakFileSubCategory.fileSubCategoryId);
        this.referenceValue(data.dakDispatchFileNos.college.collegeId);
        // this.refidvalue=data.dakDispatchFileNos.college.collegeId
        this.noteSheetForm.patchValue({
          college: data.dakDispatchFileNos.college !== null ? data.dakDispatchFileNos.college.collegeId : '',
          refCollegeId: data.dakDispatchFileNos.college !== null ? data.dakDispatchFileNos.college.collegeId : ''
        })
      } else {
        this.subcategory(data.dakDispatchFileNos.dakFileSubCategory.fileSubCategoryId);
        // this.referenceIdValue(data.dakDispatchFileNos.dakFileSubjectReferenceNonCollege.fileSubjectReferenceId);
        this.refidvalue = data.dakDispatchFileNos.dakFileSubjectReferenceNonCollege.shortName
        this.noteSheetForm.patchValue({
          reference: data.dakDispatchFileNos.dakFileSubCategoryReference !== null ? data.dakDispatchFileNos.dakFileSubCategoryReference.fileSubCategoryReferenceId : '',
          refSubjectId: data.dakDispatchFileNos.dakFileSubjectReferenceNonCollege !== null ? data.dakDispatchFileNos.dakFileSubjectReferenceNonCollege.fileSubjectReferenceId : '',
        });
      }
      this.getAllBulkCategory();
      this.editorByLanguage(data.receiptLanguageId.receiptLanguageId);
      this.showEditor = data.isDispatchWithDfa;
      let toAddress = [];
      let endorseAddress = [];
      data.dakDispatchRecipientDetails.forEach(element => {
        if (element.dakAddressType.name === "ToAddress") {
          toAddress.push(element);
        } else if (element.dakAddressType.name === "EndorseeAddress") {
          endorseAddress.push(element);
        }
        if (element.address !== null) {

          toAddress.forEach((resp, index) => {
            this.statesList.forEach(ele => {
              if (ele.stateName === resp.address.state) {
                resp.address.state = ele.stateId;
                this.savedAddress(resp, index);
              }
            });
          });

          endorseAddress.forEach((res, index) => {
            this.statesList.forEach(ele => {
              if (ele.stateName === res.address.state) {
                res.address.state = ele.stateId;
                this.savedAddress(res, index);
              }
            });
          });
        }
        // this.savedToAddress(element);
      });
      // }
      if (data.dakDispatchRecipientDetails.length > 0) {
        data.dakDispatchRecipientDetails.forEach(element => {
          this.showEditor = data.isDispatchWithDfa;
          if (element.address !== null) {
            this.statesList.forEach((ele,index) => {
              if (ele.stateName === element.address.state) {
                element.address.state = ele.stateId;
                this.savedAddress(element, index);
              }
            });
          } else {
            this.savedToAddress(element);
          }

        });
      }
      console.log(data.dakDispatchBulkCategory);
      debugger
      if(data.dakDispatchBulkCategory.length>0){
      data.dakDispatchBulkCategory.forEach((element,index) => {
        this.showEditor = data.isDispatchWithDfa;
        debugger
        this.bulkaddress(element,index);
      });
      }
      if (this.notesheetData.dispatchDocuments !== undefined) {
        this.notesheetData.dispatchDocuments.forEach(element => {
          const nameString = element.documentLocation;
          if (nameString !== null) {
            const filename = nameString.split('/').pop();
            // console.log(filename);
            element.documentLocation = filename;
          }
        });
      }
      // this.savedToAddress(this.toAddressArr);
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // endoressValue(data: any) {
  //   console.log(data);
  // }
  bulkaddress(data:any,index:any){
    console.log(data);
    const formGroups = this.itemRows();
    const control = <FormArray>this.form.controls['itemRows'];
        control.push(formGroups);
        this.changeReceiptType('Bulk',0);
        formGroups.patchValue({
          radioOption: 'Bulk' ,
          addressviaType1: data.dispatchVia.dispatchViaId === 1 ? true : false,
          addressviaType2: (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 4
            || data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 2 ||
            data.dispatchVia.dispatchViaId === 6 || data.dispatchVia.dispatchViaId === 7) ? true : false,

          // addressviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand' : false,
          addressviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand'
            : (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 7) ? 'By Courier'
              : (data.dispatchVia.dispatchViaId === 4 || data.dispatchVia.dispatchViaId === 2) ? 'By SpeedPost' : false,
              addressvia: data.dispatchVia.dispatchViaId,
          receiptBulkOption: data.dakDispatchCategoryId
        });
        console.log(formGroups.value);
  }
  savedToAddress(data: any) {
    console.log(data);
    if (data.dakAddressType.name === 'ToAddress') {
      const formGroups = this.itemRows();
      if (data.isRecipientSingle === true) {
        // this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        //   this.citiesList = res;
        //   this.citiesList.forEach(ele => {
        //     if (ele.cityName === data.address.city) {
        //       data.address.city = ele.cityId;
        //       formGroups.patchValue({
        //         addressCity: data.address.city !== null ? data.address.city : '',
        //       });
        //     }
        //   });
        // }, error => {
        //   console.log(error);
        // });
         this.getCities(data.address.state,'R',this.i)
        formGroups.patchValue({
          addressOrganization: data.dakAddressCategories.addressCategoryId,
          addressviaType1: data.dispatchVia.dispatchViaId === 1 ? true : false,
          addressviaType2: (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 4
            || data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 2 ||
            data.dispatchVia.dispatchViaId === 6 || data.dispatchVia.dispatchViaId === 7) ? true : false,

          // addressviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand' : false,
          addressviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand'
            : (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 7) ? 'By Courier'
              : (data.dispatchVia.dispatchViaId === 4 || data.dispatchVia.dispatchViaId === 2) ? 'By SpeedPost' : false,
          // (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 7) ? 'By Courier' : false,
          // addressviaType5: (data.dispatchVia.dispatchViaId === 4 || data.dispatchVia.dispatchViaId === 2) ? 'By SpeedPost' : false,
          addressvia: data.dispatchVia.dispatchViaId,
          selectedCategory: data.dakAddressCategories.addressCategoryId !== null ? data.dakAddressCategories.addressCategoryId : '',
          addressReceiptEmailId: data.recipientEmailId !== null ? data.recipientEmailId : '',
          addressContactNumber: data.recipientContactNumber !== null ? data.recipientContactNumber : '',
          addressReceiptName: data.recipientName !== null ? data.recipientName : '',
          addressLine1: data.address.line1 !== null ? data.address.line1 : '',
          addressLine2: data.address.line2 !== null ? data.address.line2 : '',
          addressState: data.address.state !== null ? data.address.state : '',
         addressCity: data.address.city !== null ? data.address.city : '',
          addressZipCode: data.address.zipCode !== null ? data.address.zipCode : '',
          radioOption: data.isRecipientSingle === true ? 'Single' : 'Bulk',
          // Toaddressuserids: data.entityMaster.entityMasterId,
          Toaddressuserids: data.userMaster !== null ? data.userMaster.userId : null,
          Toaddressids: data.address.addressId
        });
        console.log(formGroups);
        const control = <FormArray>this.form.controls['itemRows'];
        control.push(formGroups);
        console.log(control);
      }
       else {
         console.log("true");
        const control = <FormArray>this.form.controls['itemRows'];
        control.push(formGroups);
        this.changeReceiptType(data.isRecipientSingle === true ? 'Single' : 'Bulk', 0);
        formGroups.patchValue({
          radioOption: data.isRecipientSingle === true ? 'Single' : 'Bulk',
          addressvia: data.dispatchVia.dispatchViaId,
          receiptBulkOption: data.dakAddressCategories !== null ? data.dakAddressCategories.addressCategoryId : ''
        });
      }
    } else if (data.dakAddressType.name === 'EndorseeAddress') {
      const formGroups = this.endorseeForm();
      // this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      //   this.citiesList = res;
      //   this.citiesList.forEach(ele => {
      //     if (ele.cityName === data.address.city) {
      //       data.address.city = ele.cityId;
      //       formGroups.patchValue({
      //         endorseeCity: data.address.city !== null ? data.address.city : '',
      //       });
      //     }
      //   });
      // }, error => {
      //   console.log(error);
      // });
      this.getCities(data.address.state,'E',this.i)
      formGroups.patchValue({
        endorseevia: data.dispatchVia.dispatchViaId,
        endorseeviaType1: data.dispatchVia.dispatchViaId === 1 ? true : false,
        endorseeviaType2: (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 4
          || data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 2 ||
          data.dispatchVia.dispatchViaId === 6 || data.dispatchVia.dispatchViaId === 7) ? true : false,
        endorseeviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand'
          : (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 7) ? 'By Courier'
            : (data.dispatchVia.dispatchViaId === 4 || data.dispatchVia.dispatchViaId === 2) ? 'By SpeedPost' : false,
        // endorseeviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand' : false,
        // endorseeviaType4: (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 7) ? 'By Courier' : false,
        // endorseeviaType5: (data.dispatchVia.dispatchViaId === 4 || data.dispatchVia.dispatchViaId === 2) ? 'By SpeedPost' : false,
        endorseeName: data.recipientName,
        endorseeEmail: data.recipientEmailId,
        endorseeContact: data.recipientContactNumber,
        endorseeOrg: data.dakAddressCategories.addressCategoryId,
        endorseeAddressLine1: data.address.line1,
        endorseeAddressLine2: data.address.line2,
        endorseeState: data.address.state,
        endorseeCity: data.address.city,
        endorseeZipCode: data.address.zipCode,
        endorseeRemark: data.remarks,
        endorseuserid: data.userMaster.userId,
        endorseaddressid: data.address.addressId
      });
      this.endorseAddressArr = this.endorseAddress();
      this.endorseAddressArr.push(formGroups);
    } else {
      this.getAddressType();
      const formGroups = this.ccForm();
      console.log("testcctype",data.ccType)
      formGroups.patchValue({
        isSectionReference:(data.ccType!='FILE')?false:true,
        ccInternalSection: data.section && data.section.sectionId,
        sectionRef:data.dakDispatchFileNos && data.dakDispatchFileNos.dakDispatchFileNo
      });
      this.ccAddressArr = this.ccAddress();
      this.ccAddressArr.push(formGroups);
   
    }

    // });


  }
  savedAddress(data: any, index: any) {
    console.log(data);
    debugger
    if (data.dakAddressType.name === 'ToAddress') {
      const formGroups = this.itemRows();
      if (data.isRecipientSingle === true) {
        // this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        //   this.citiesList = res;
        //   this.citiesList.forEach(ele => {
        //     if (ele.cityName === data.address.city) {
        //       data.address.city = ele.cityId;
        //       formGroups.patchValue({
        //         addressCity: data.address.city !== null ? data.address.city : '',
        //       });
        //     }
        //   });
        // }, error => {
        //   console.log(error);
        // });
        this.getCities(data.address.state, 'R', index)
        formGroups.patchValue({
          addressOrganization: data.dakAddressCategories.addressCategoryId,
          addressviaType1: data.dispatchVia.dispatchViaId === 1 ? true : false,
          addressviaType2: (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 4
            || data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 2 ||
            data.dispatchVia.dispatchViaId === 6 || data.dispatchVia.dispatchViaId === 7) ? true : false,

          // addressviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand' : false,
          addressviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand'
            : (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 7) ? 'By Courier'
              : (data.dispatchVia.dispatchViaId === 4 || data.dispatchVia.dispatchViaId === 2) ? 'By SpeedPost' : false,
          // (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 7) ? 'By Courier' : false,
          // addressviaType5: (data.dispatchVia.dispatchViaId === 4 || data.dispatchVia.dispatchViaId === 2) ? 'By SpeedPost' : false,
          addressvia: data.dispatchVia.dispatchViaId,
          selectedCategory: data.dakAddressCategories.addressCategoryId !== null ? data.dakAddressCategories.addressCategoryId : '',
          addressReceiptEmailId: data.recipientEmailId !== null ? data.recipientEmailId : '',
          addressContactNumber: data.recipientContactNumber !== null ? data.recipientContactNumber : '',
          addressReceiptName: data.recipientName !== null ? data.recipientName : '',
          addressLine1: data.address.line1 !== null ? data.address.line1 : '',
          addressLine2: data.address.line2 !== null ? data.address.line2 : '',
          addressState: data.address.state !== null ? data.address.state : '',
         addressCity: data.address.city !== null ? data.address.city : '',
          addressZipCode: data.address.zipCode !== null ? data.address.zipCode : '',
          radioOption: data.isRecipientSingle === true ? 'Single' : 'Bulk',
          // Toaddressuserids: data.entityMaster.entityMasterId,
          Toaddressuserids: data.userMaster !== null ? data.userMaster.userId : null,
          Toaddressids: data.address.addressId
        });
        console.log(formGroups);
        const control = <FormArray>this.form.controls['itemRows'];
        control.push(formGroups);
        console.log(control);
      } 
      else {
        console.log("trueEEE");
        const control = <FormArray>this.form.controls['itemRows'];
        control.push(formGroups);
        this.changeReceiptType(data.isRecipientSingle === true ? 'Single' : 'Bulk', 0);
        formGroups.patchValue({
          radioOption: data.isRecipientSingle === true ? 'Single' : 'Bulk',
          addressvia: data.dispatchVia.dispatchViaId,
          receiptBulkOption: data.dakAddressCategories !== null ? data.dakAddressCategories.addressCategoryId : ''
        });
      }
    } else if (data.dakAddressType.name === 'EndorseeAddress') {
      const formGroups = this.endorseeForm();
      // this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      //   this.citiesList = res;
      //   this.citiesList.forEach(ele => {
      //     if (ele.cityName === data.address.city) {
      //       data.address.city = ele.cityId;
      //       formGroups.patchValue({
      //         endorseeCity: data.address.city !== null ? data.address.city : '',
      //       });
      //     }
      //   });
      // }, error => {
      //   console.log(error);
      // });
      this.getCities(data.address.state,'E',index)
      formGroups.patchValue({
        endorseevia: data.dispatchVia.dispatchViaId,
        endorseeviaType1: data.dispatchVia.dispatchViaId === 1 ? true : false,
        endorseeviaType2: (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 4
          || data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 2 ||
          data.dispatchVia.dispatchViaId === 6 || data.dispatchVia.dispatchViaId === 7) ? true : false,
        endorseeviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand'
          : (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 7) ? 'By Courier'
            : (data.dispatchVia.dispatchViaId === 4 || data.dispatchVia.dispatchViaId === 2) ? 'By SpeedPost' : false,
        // endorseeviaType3: (data.dispatchVia.dispatchViaId === 5 || data.dispatchVia.dispatchViaId === 6) ? 'By Hand' : false,
        // endorseeviaType4: (data.dispatchVia.dispatchViaId === 3 || data.dispatchVia.dispatchViaId === 7) ? 'By Courier' : false,
        // endorseeviaType5: (data.dispatchVia.dispatchViaId === 4 || data.dispatchVia.dispatchViaId === 2) ? 'By SpeedPost' : false,
        endorseeName: data.recipientName,
        endorseeEmail: data.recipientEmailId,
        endorseeContact: data.recipientContactNumber,
        endorseeOrg: data.dakAddressCategories.addressCategoryId,
        endorseeAddressLine1: data.address.line1,
        endorseeAddressLine2: data.address.line2,
        endorseeState: data.address.state,
        endorseeCity: data.address.city,
        endorseeZipCode: data.address.zipCode,
        endorseeRemark: data.remarks,
        endorseuserid: data.userMaster.userId,
        endorseaddressid: data.address.addressId
      });
      this.endorseAddressArr = this.endorseAddress();
      this.endorseAddressArr.push(formGroups);
    } else {
      debugger;
     this.getAddressType();
      const formGroups = this.ccForm();
      console.log("testcctype",data.ccType)
      formGroups.patchValue({
        isSectionReference:(data.ccType!='FILE')?false:true,
        ccInternalSection: data.section && data.section.sectionId,
        sectionRef:data.dakDispatchFileNos && data.dakDispatchFileNos.dakDispatchFileNo
      });
      this.ccAddressArr = this.ccAddress();
      this.ccAddressArr.push(formGroups);
    }

    // });


  }

  // Endorsee Address
  addEndorseAddress(address: any, i) {
    console.log(this.endorseAddressArr.controls);
    this.endorseAddressArr = this.noteSheetForm.get('endorseAddress') as FormArray;
    this.endorseAddressArr.push(this.endorseeForm());
    this.type = address;
    this.getAddressType();
    const x = this.noteSheetForm.get('endorseAddress')['controls'];
    x[i].controls.endorseevia.setValidators(Validators.required);
    x[i].controls.endorseeOrg.setValidators(Validators.required);
    x[i].controls.endorseeName.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z., ]*$/)]));
    x[i].controls.endorseeEmail.setValidators(Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]));
    x[i].controls.endorseeAddressLine1.setValidators(Validators.required);
    x[i].controls.endorseeState.setValidators(Validators.required);
    x[i].controls.endorseeCity.setValidators(Validators.required);
    x[i].controls.endorseeZipCode.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9 ]*$/)]));
  }

  // CC Address
  addccAddress(address: any) {
    // console.log(address);
    this.ccAddressArr = this.noteSheetForm.get('ccAddress') as FormArray;
    this.ccAddressArr.push(this.ccForm());
    console.log(this.ccAddressArr.controls.length);
    if (this.ccAddressArr.controls.length === 1) {
      this.showccbtn = false;
    }
    this.type = address;
    this.getAddressType();
  }

  // Removing Mutliple Addresses Using FormArray
  removeRow(index: any, address: any) {
    console.log(index)
    console.log(this.endorseAddressArr)
    debugger
    if (address === 'CC') {
      if (this.dispatchId !== '0' && this.ccAddressArr.controls[index].controls.ccInternalSection.value) {
        this.notesheetData.dakDispatchRecipientDetails.forEach(element => {
          if (element.address == null) {
            if (element.section.sectionId === this.ccAddressArr.controls[index].controls.ccInternalSection.value) {
              this.removeAddress(element.dispatchRecipientDetailId);
              this.ccAddressArr.removeAt(index);
            }
          }
        });
      } else {
        this.ccAddressArr.removeAt(index);
      }
      if (this.ccAddressArr.controls.length === 0) {
        this.showccbtn = true;
      }
    } else {
      console.log(this.endorseAddressArr)
      // this.endorseAddressArr.removeAt(index);
      console.log(this.endorseAddressArr.controls[index].controls.endorseaddressid.value);
      if (this.dispatchId !== '0' && this.endorseAddressArr.controls[index].controls.endorseaddressid.value !== '') {
        this.notesheetData.dakDispatchRecipientDetails.forEach(ele => {
          console.log(ele);
          if (ele.address !== null) {
            if (ele.address.addressId === this.endorseAddressArr.controls[index].controls.endorseaddressid.value) {
              this.removeAddress(ele.dispatchRecipientDetailId);
              this.endorseAddressArr.removeAt(index);
            }
          }
        });
      } else {
        this.endorseAddressArr.removeAt(index);
      }
      if (this.endorseAddressArr.controls.length == 0) {
        this.showbtn = true;
      }
    }
  }
  // Remove to address Rows
  removeRows(j) {
    if (this.dispatchId !== '0' && this.form.value.itemRows[j].Toaddressids !== '') {
      this.notesheetData.dakDispatchRecipientDetails.forEach(element => {
        if (element.address !== null) {
          if (element.address.addressId === this.form.value.itemRows[j].Toaddressids) {
            this.removeAddress(element.dispatchRecipientDetailId);
            const control = <FormArray>this.form.controls['itemRows'];
            control.removeAt(j);
          }
        }
      });
    } else {
      const control = <FormArray>this.form.controls['itemRows'];
      control.removeAt(j);
    }

  }
  //Remove Address from
  removeAddress(id: any) {
    console.log(id);
    this.outboundsvc.removeAddress(id).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log(error);
      this.tostar.error('', 'No Data Available');
    });
  }

  // Check Validation For Only Numeric Value
  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  clear() {
    this.submitted = false;
    this.noteSheetForm.reset();
    this.noteSheetForm.controls.refSection
      .setValue(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName, { onlySelf: true });
    this.noteSheetForm.controls.refYear.setValue(this.currentyear, { onlySelf: true });
    this.noteSheetForm.controls.refSubSection.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.refAcademicYear.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.cateDispatchCate.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.cateDispatchLanguage.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.cateDispatchUrgency.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.cateDispatchConfidential.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.category.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.subCategory.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.college.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.refCollegeId.setValue('', { onlySelf: true });
    this.noteSheetForm.controls.refSubjectId.setValue('', { onlySelf: true });
    // this.getAllDesignations();
    console.log(this.noteSheetForm.get('ccAddress')['controls']);
    this.noteSheetForm.get('ccAddress')['controls'].ccInternalSection.setValue('', { onlySelf: true });
    this.submitted = false;
  }

  reset() {
    this.noteSheetForm.controls.checkoruncheck.setValue('', { onlySelf: true });
    this.searchForm.reset();
    this.searchForm.controls.state.setValue('', { onlySelf: true });
    this.pageId = 0;
    this.rowId = 10;
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
    if(this.files.length ===0)
    this.noteSheetForm.controls.file.setValue('',{onlySelf:true});
  }

  // Event for OrganisationCategory
  orgCategory(data, address: any, i, item) {
    console.log(data)
    this.selectedOrg = '';
    item.controls.addressOrganization.setValue('', { onlySelf: true });
    this.selectedOrg = data;
    this.popupindex = i;
    this.categoryaddress = address;
    this.categoryvalue = data;
    this.addresscategory.forEach(element => {
      console.log(element.addressCategoryId)
      if (element.addressCategoryId === parseInt(this.categoryvalue)) {
        this.categoryname = element.name;
        console.log(this.categoryname);
      }
    });
    // item.controls.addressOrganization.setValue(data);
    if (data === '4') {
      this.getAllMinistry(i);
    }
    else if (data === '6') {
      this.openOthersBtn.nativeElement.click();
      //  this.getOtherCategoryUsers(i);
    } else {
      this.openBtn.nativeElement.click();
      this.getDetailsOfOrg(data);
    }
  }

  endorseOrgCateg(data, address: any, i) {
    console.log(data);
    console.log(i);
    this.popupindex = i;
    this.categoryaddress = address;
    this.categoryvalue = data;
    this.addresscategory.forEach(element => {
      if (element.addressCategoryId === parseInt(this.categoryvalue)) {
        this.categoryname = element.name;
        console.log(this.categoryname);
      }
    });
    if (data === '4') {
      this.getAllMinistry(i);
    }
    else if (data === '6') {
      this.openOthersBtn.nativeElement.click();
      //  this.getOtherCategoryUsers(i);
    }
    else {
      this.openBtn.nativeElement.click();
      this.getDetailsOfOrg(data);
    }
  }
  getDetailsOfOrg(data: any) {
    this.outboundsvc.getCalls(data, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.selectedOrgList = res;
      console.log(this.selectedOrgList)
      this.responsePageCount = this.selectedOrgList[0].pageCount;
    }, error => {
      console.log(error);
      this.tostar.error('', 'No Data Available');
    });
  }

  // Event for DFA
  dfa(event, address: any, i) {
    console.log(event);
    this.showEditor = event;
    if (this.showEditor === true) {
      this.addRow('ToAddress', 0);
      this.type = address;
      console.log(this.type);
      this.getAddressType();
      this.getAllBulkCategory();
      this.dfacheckbox = true;
      if (this.language === '1') {
        this.noteSheetForm.controls.dfaSubject.setValidators(Validators.required);
        this.noteSheetForm.controls['dfaSubject'].updateValueAndValidity();
        this.noteSheetForm.controls.dfacomments.setValidators(Validators.required);
        this.noteSheetForm.controls['dfacomments'].updateValueAndValidity();
      } else if (this.language === '2') {
        this.noteSheetForm.controls.dfaHindiSubject.setValidators(Validators.required);
        this.noteSheetForm.controls['dfaHindiSubject'].updateValueAndValidity();
        this.noteSheetForm.controls.dfahindiComments.setValidators(Validators.required);
        this.noteSheetForm.controls['dfahindiComments'].updateValueAndValidity();
      }
      console.log(i);
    } else {
      this.dfacheckbox = false;
      this.noteSheetForm.controls.dfaSubject.clearValidators();
      this.noteSheetForm.controls['dfaSubject'].updateValueAndValidity();
      this.noteSheetForm.controls.dfacomments.clearValidators();
      this.noteSheetForm.controls['dfacomments'].updateValueAndValidity();
      this.noteSheetForm.controls.dfaHindiSubject.clearValidators();
      this.noteSheetForm.controls['dfaHindiSubject'].updateValueAndValidity();
      this.noteSheetForm.controls.dfahindiComments.clearValidators();
      this.noteSheetForm.controls['dfahindiComments'].updateValueAndValidity();
      const control = <FormArray>this.form.controls['itemRows'];
      control.removeAt(0);
      // this.noteSheetForm.controls[i].clearValidators();
    }
    // this.getAddressCategory();
    // this.defaultViaValue="Email";
    // debugger
    // if(this.defaultViaValue ==="Email"){
    //   this.dispatchViaId = 1;
    //   console.log(this.dispatchViaId);
    // }

  }
  // Event For Existing File
  existingFile(event) {
    if (event.target.checked) {
      this.showsearch = true;
    } else {
      this.showsearch = false;
    }
  }


  public addRow(address: any, i) {






    const control = <FormArray>this.form.controls['itemRows'];
    console.log(control);
    // control.push(this.itemRows());
    this.toAddressArr = this.form.get('itemRows') as FormArray;
    console.log(this.toAddressArr);
    this.toAddressArr.push(this.itemRows());
    console.log(this.toAddressArr.controls.length);
    console.log(i);
    let x = this.form.get('itemRows')['controls'];
    x[i].controls.addressvia.setValidators(Validators.required);
    x[i].controls.selectedCategory.setValidators(Validators.required);
    x[i].controls.addressReceiptName.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z,. ]*$/)]));
    x[i].controls.addressReceiptEmailId.setValidators(Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]));
    x[i].controls.addressLine1.setValidators(Validators.required);
    x[i].controls.addressState.setValidators(Validators.required);
    x[i].controls.addressCity.setValidators(Validators.required);
    x[i].controls.addressZipCode.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9 ]*$/)]));
    this.type = address;
    this.getAddressType();
    // this.getAllBulkCategory();
  }



  changeReceiptType(data, i) {
    console.log(data);
    debugger
    if (data === 'Single') {
      console.log('Bulk Form' + i + 'Validation Removed');
      // this.getAddressCategory();
      let x = this.form.get('itemRows')['controls'];
      x[i].controls.addressvia.setValidators(Validators.required);
      x[i].controls.selectedCategory.setValidators(Validators.required);
      x[i].controls.addressReceiptName.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)]));
      x[i].controls.addressReceiptEmailId.setValidators(Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]));
      x[i].controls.addressLine1.setValidators(Validators.required);
      x[i].controls.addressState.setValidators(Validators.required);
      x[i].controls.addressCity.setValidators(Validators.required);
      x[i].controls.addressZipCode.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9 ]*$/)]));
      // bulk remove validators
      x[i].controls.receiptBulkOption.clearValidators();
      x[i].controls.receiptBulkOption.updateValueAndValidity();
    } else {
      // this.getAllBulkCategory();
      const x = this.form.get('itemRows')['controls'];
      console.log('Single Validation Removed');
      x[i].controls.addressvia.setValidators(Validators.required);
      x[i].controls.receiptBulkOption.setValidators(Validators.required);
      x[i].controls.selectedCategory.clearValidators();
      x[i].controls.selectedCategory.updateValueAndValidity();
      x[i].controls.addressReceiptName.clearValidators();
      x[i].controls.addressReceiptName.updateValueAndValidity();
      x[i].controls.addressReceiptEmailId.clearValidators();
      x[i].controls.addressReceiptEmailId.updateValueAndValidity();
      x[i].controls.addressLine1.clearValidators();
      x[i].controls.addressLine1.updateValueAndValidity();
      x[i].controls.addressState.clearValidators();
      x[i].controls.addressState.updateValueAndValidity();
      x[i].controls.addressCity.clearValidators();
      x[i].controls.addressCity.updateValueAndValidity();
      x[i].controls.addressZipCode.clearValidators();
      x[i].controls.addressZipCode.updateValueAndValidity();
    }
    
  }
  // For Existing File
  search() {
    this.showradio = true;
  }
  SearchWithStateandValue() {
    // this.dentistDataShow = true;
    console.log(this.searchForm.value);
    // if (this.searchForm.value.state !== '' && this.searchForm.value.searchValue) {
    if (this.categoryname === 'Principal') {
      this.outboundsvc.searchPrincipalData(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.selectedOrgList = res;
          this.responsePageCount = this.selectedOrgList[0].pageCount;
        }, error => {
          console.log(error);
        });
    } else if (this.categoryname === 'DME') {
      this.outboundsvc.searchDMEData(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.selectedOrgList = res;
          this.responsePageCount = this.selectedOrgList[0].pageCount;
        }, error => {
          console.log(error);
        });
    } else if (this.categoryname === 'Health Secretary') {
      this.outboundsvc.searchHealthSecData(this.searchForm.value.state, this.searchForm.value.searchValue)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.selectedHealthList = res;
        }, error => {
          console.log(error);
        })
    } else if (this.categoryname === 'Advocate') {
      this.outboundsvc.searchAdvocateSecData(this.searchForm.value.state, this.searchForm.value.searchValue)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.selectedAdvocateList = res;
        }, error => {
          console.log(error);
        })
    } else {
      console.log('enter any field value');
      this.tostar.warning('Please Enter  Fields To Search', 'Warning', {
        timeOut: 2000
      });
    }
  }
  //Previous Button
  categoryPaginationPrevi() {
    if (this.pageId >= 1) {
      --this.pageId;
      if (this.categoryname === 'Principal') {
        this.outboundsvc.searchPrincipalData(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.selectedOrgList = res;
            this.responsePageCount = this.selectedOrgList[0].pageCount;
          }, error => {
            console.log(error);
          });
      } else if (this.categoryname === 'DME') {
        this.outboundsvc.searchDMEData(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.selectedOrgList = res;
            this.responsePageCount = this.selectedOrgList[0].pageCount;
          }, error => {
            console.log(error);
          });
      }
    }
  }
  //Next Button 
  categoryPaginationNext() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      if (this.categoryname === 'Principal') {
        this.outboundsvc.searchPrincipalData(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.selectedOrgList = res;
            this.responsePageCount = this.selectedOrgList[0].pageCount
          }, error => {
            console.log(error);
          });
      } else if (this.categoryname === 'DME') {
        this.outboundsvc.searchDMEData(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.selectedOrgList = res;
            this.responsePageCount = this.selectedOrgList[0].pageCount;
          }, error => {
            console.log(error);
          });
      }

    }

  }

  // getAddressCategory
  // getAddressCategory() {
  //   this.outboundsvc.getAddressCategory().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
  //     this.addresscategory = res;
  //     console.log(this.addresscategory);
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  // getAddressType
  getAddressType() {
    this.outboundsvc.getAddressType().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      this.addresstype = res;
      console.log(this.addresstype);
      // console.log(this.type);
      this.addresstype.map(element => {
        console.log(element.name);
        if (element.name === this.type) {
          console.log(element.addressTypeId);
          this.addressTypeId = element.addressTypeId;
        }
      });
    }, error => {
      console.log(error);
    });
  }
  // getAllMinistry
  getAllMinistry(i) {
    if (this.categoryaddress === 'EndorseAddress') {
      this.outboundsvc.getAllMinistry().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.Binddata(res, i);
      }, error => {
        console.log(error);
      })
    } else if (this.categoryaddress === 'ToAddress') {
      this.outboundsvc.getAllMinistry().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res.address);
        const ministryData = res;
        this.useridd = res.userId;
        this.addressid = res.address.addressId;
        console.log(this.useridd);
        console.log(this.addressid);

        this.statesList.forEach(element => {
          if (element.stateName === ministryData.address.state) {
            ministryData.address.state = element.stateId;
            this.usrmgtService.getAllCities(res.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              this.citiesList = res;
              this.citiesList.forEach(element => {
                if (element.cityName.toLowerCase() === ministryData.address.city.toLowerCase()) {
                  ministryData.address.city = element.cityId;
                  this.BindToaddressdata(ministryData, i);
                }
              });
            }, error => {
              console.log(error);
            });
          }
        });
      }, error => {
        console.log(error);
        this.tostar.error('', 'No Data Available');
      });
    }

  }
  // getAllAdvocate


  getPrincipalDetails(data, i) {
    console.log(data);
    if (this.categoryaddress === 'ToAddress') {
      this.useridd = data.userId;
      this.addressid = data.address.addressId;
      this.closeBtn.nativeElement.click();
      this.statesList.forEach(element => {
        if (element.stateName === data.address.state) {
          data.address.state = element.stateId;
          this.BindToaddressdata(data, i);
          // this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          //   this.citiesList = res;
          //   this.citiesList.forEach(element => {
          //     if (element.cityName.toLowerCase() === data.address.city.toLowerCase()) {
          //       data.address.city = element.cityId;
          //       this.BindToaddressdata(data, i);
          //     }
          //   });
          // }, error => {
          //   console.log(error);
          // });
        }
      });
      console.log(this.useridd);
      console.log(this.addressid)
    } else {
      this.endorseuseridd = data.userId;
      this.endorseaddressid = data.address.addressId;
      this.Binddata(data, i);
      this.closeBtn.nativeElement.click();
      console.log(this.endorseuseridd);
      console.log(this.endorseaddressid)
    }

  }

  getDMEDetails(data, i) {
    console.log(data);
    if (this.categoryaddress === 'ToAddress') {
      this.useridd = data.userId;
      this.addressid = data.address.addressId;
      this.statesList.forEach(element => {
        if (element.stateName === data.address.state) {
          data.address.state = element.stateId;
          this.BindToaddressdata(data, i);
          // this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          //   this.citiesList = res;
          //   this.citiesList.forEach(element => {
          //     if (element.cityName.toLowerCase() === data.address.city.toLowerCase()) {
          //       data.address.city = element.cityId;
          //       this.BindToaddressdata(data, i);
          //     }
          //   });
          // }, error => {
          //   console.log(error);
          // });
        }
      });
      this.closeBtn.nativeElement.click();
      console.log(this.useridd);
      console.log(this.addressid)
    }
    else {
      this.endorseuseridd = data.userId;
      this.endorseaddressid = data.address.addressId;
      this.Binddata(data, i)
      this.closeBtn.nativeElement.click();
      console.log(this.endorseuseridd);
      console.log(this.endorseaddressid)
    }

  }
  getHelathSecDetails(data, i) {
    console.log(data);
    if (this.categoryaddress === 'ToAddress') {
      this.useridd = data.userId;
      this.addressid = data.address.addressId;
      this.statesList.forEach(element => {
        if (element.stateName === data.address.state) {
          data.address.state = element.stateId;
          this.BindToaddressdata(data, i);
          // this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          //   this.citiesList = res;
          //   this.citiesList.forEach(element => {
          //     if (element.cityName.toLowerCase() === data.address.city.toLowerCase()) {
          //       data.address.city = element.cityId;
          //       this.BindToaddressdata(data, i);
          //     }
          //   });
          // }, error => {
          //   console.log(error);
          // });
        }
      });
      this.closeBtn.nativeElement.click();
      console.log(this.useridd);
      console.log(this.addressid)
    } else {
      this.endorseuseridd = data.userId;
      this.endorseaddressid = data.address.addressId;
      this.Binddata(data, i)
      this.closeBtn.nativeElement.click();
      console.log(this.endorseuseridd);
      console.log(this.endorseaddressid)
    }

  }
  getAdvocateDetails(data, i) {
    console.log(data);
    if (this.categoryaddress === 'ToAddress') {
      this.useridd = data.userId;
      this.addressid = data.address.addressId;
      this.statesList.forEach(element => {
        if (element.stateName === data.address.state) {
          data.address.state = element.stateId;
          this.BindToaddressdata(data, i);
          // this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          //   this.citiesList = res;
          //   this.citiesList.forEach(element => {
          //     if (element.cityName.toLowerCase() === data.address.city.toLowerCase()) {
          //       data.address.city = element.cityId;
          //       this.BindToaddressdata(data, i);
          //     }
          //   });
          // }, error => {
          //   console.log(error);
          // });
        }
      });
      this.closeBtn.nativeElement.click();
      console.log(this.useridd);
      console.log(this.addressid)
    } else {
      this.endorseuseridd = data.userId;
      this.endorseaddressid = data.address.addressId;
      this.Binddata(data, i);
      this.closeBtn.nativeElement.click();
      console.log(this.endorseuseridd);
      console.log(this.endorseaddressid)
    }

  }
  // Binding Endorsee Adresss
  Binddata(data, i) {
    debugger
    console.log(data);
    console.log(i);
    console.log(this.endorseAddress())
    let x = (this.noteSheetForm.controls['endorseAddress']['controls']);
    console.log(x);
    this.statesList.forEach(element => {
      if (element.stateName === data.address.state) {
        data.address.state = element.stateId;
        // this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        //  this.citiesList = res;
        //  this.citiesList.forEach(element => {
        //  if (element.cityName === data.address.city) {
        //    data.address.city = element.cityId;
        //     x[i].controls.endorseeCity.patchValue(data.address.city);
        //    }
        //   });
        //   }, error => {
        //      console.log(error);
        //    });
      }
    });
    x[i].controls.endorseuserid.patchValue(data.userId);
    x[i].controls.endorseaddressid.patchValue(data.address.addressId);
    x[i].controls.endorseeName.patchValue(data.firstName + '' + data.lastName);
    x[i].controls.endorseeEmail.patchValue(data.emailId);
    x[i].controls.endorseeContact.patchValue(data.phoneNumber);
    x[i].controls.endorseeAddressLine1.patchValue(data.address.line1);
    x[i].controls.endorseeAddressLine2.patchValue(data.address.line2);
    x[i].controls.endorseeState.patchValue(data.address.state);
    x[i].controls.endorseeCity.patchValue(data.address.city);
    x[i].controls.endorseeZipCode.patchValue(data.address.zipCode);
    this.getCities(data.address.state, "E", i);
    // this.getCities(data.address.state, "E", i);
  }
  // Binding To Address
  BindToaddressdata(data, i) {
    console.log(data);
    console.log(i);
    const x = (this.form.controls['itemRows']['controls']);
    console.log(x);
    console.log(data.address.city);
    debugger
    if (data.address.city !== null) {
      x[i].controls.selectedCategory.patchValue(this.selectedOrg);
      x[i].controls.Toaddressuserids.patchValue(data.userId);
      x[i].controls.Toaddressids.patchValue(data.address.addressId);
      x[i].controls.addressReceiptName.patchValue(data.firstName + '' + data.lastName);
      x[i].controls.addressReceiptEmailId.patchValue(data.emailId);
      x[i].controls.addressContactNumber.patchValue(data.phoneNumber);
      x[i].controls.addressLine1.patchValue(data.address.line1);
      x[i].controls.addressLine2.patchValue(data.address.line2);
      x[i].controls.addressState.patchValue(data.address.state);
      x[i].controls.addressCity.patchValue(data.address.city);
      x[i].controls.addressZipCode.patchValue(data.address.zipCode);
    }
    console.log(x[i].get("addressState").value);
    this.getCities(x[i].get("addressState").value, "R", i);
  }
  // getAllBulkCategory
  getAllBulkCategory() {
    this.outboundsvc.getAllBulkCategory().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.bulkList = res;
    }, error => {
      console.log(error);
    })
  }
  searchFileNo() {
    this.showradio = true;
    this.fileno = this.searchFileForm.value.fileno;
    this.outboundsvc.searchWithFileNum(this.fileno, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.existingFilesList = res;
      this.responsePageCount = this.existingFilesList[0].pageCount;
    }, error => {
      console.log(error);
    });
  }

  selectFile(data) {
    console.log(data)
    this.filebtn.nativeElement.click();
    this.noteSheetForm.patchValue({
      refSubSection: data.subSection.subSectionId,
      refSubject: data.subjectRef,
      refSubjectId: data.subjectId,
      refYear: data.dispatchYear,
      refAcademicYear: data.financialYear,
      refReferenceNumber: data.dakDispatchFileNo,
    })
    this.searchFileForm.reset();
    this.existingFilesList = [];
  }
  selectFilee(data) {
    console.log(data)
    this.selectbtn.nativeElement.click();
    this.dakDispatchFileId =data.dakDispatchFileId;
    this.searchFileForm.reset();
    this.existingFilesList = [];
    this.ccAddressArr.controls[this.indexNumber]['controls']['isSectionReference'].patchValue(true);
    this.ccAddressArr.controls[this.indexNumber]['controls']['sectionRef'].patchValue(data.dakDispatchFileNo);
    console.log(this.dakDispatchFileId);
  }
  // Previous Button
  previ() {
    if (this.pageId >= 1) {
      --this.pageId;
      console.log(this.pageId);
      this.outboundsvc.searchWithFileNum(this.fileno, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.existingFilesList = res;
        this.pageCount = this.existingFilesList[0].pageCount;
      }, error => {
        console.log(error);
      })
    }
  }
  // Next Button 
  next() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      console.log(this.rowId);
      this.outboundsvc.searchWithFileNum(this.fileno, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.existingFilesList = res;
        this.responsePageCount = this.existingFilesList[0].pageCount;
      }, error => {
        console.log(error);
      })
    }

  }
  // editorByLanguage
  editorByLanguage(value) {
    console.log(value);
    this.language = value;
    if (value === '1' || value === 1) {
      this.showEnglishEditor = true;
      this.showHindiEditor = false;
    } else if (value === '2' || value === 2) {
      this.showHindiEditor = true;
      this.showEnglishEditor = false;
    } else if (value === '3' || value === 3) {
      this.showHindiEditor = true;
      this.showEnglishEditor = true;
    }
  }

  selectedCorrectionDesignation(data: any) {
    console.log(data);
    // this.correctionPersonList = [];
    this.designationList.forEach((item) => {
      Object.keys(item).forEach((key) => {
        console.log('key', key);
        console.log('value', item[key]);
        debugger
        if (key === data) {
          this.putupNoteSheetDesiginationId = item[key][0].designation.designationId;
          console.log(this.putupNoteSheetDesiginationId);
          this.noteSheetForm.get('senderName').setValue(item[key][0].firstName + ' ' + item[key][0].lastName);
        }
      });
    });
  }
  // Downloded Files 
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  // checkbox
  toAddresscheckbox(event) {
    debugger
    console.log(event);
    if (event.target.checked === true) {
      this.showerrormsg = false;
    }
  }
  toEndorseecheckbox(event) {
    debugger
    console.log(event);
    if (event.target.checked === true) {
      this.showendorsemsg = false;
    }
  }
  // deleteDocument
  deleteDocument(id) {
    this.outboundsvc.deleteDocument(id).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('File Deleted', 'Successfully');
      this.getSavedNoteSheetDetails(this.dispatchId);
    }, error => {
      console.log(error);
      this.tostar.error('File Deletion', 'Failed');
    })
  }
  SearchWithNameAndPhone() {
    if (this.searchOthersForm.value.name && this.searchOthersForm.value.phoneno) {
      this.outboundsvc.getotherCategoryusers(this.searchOthersForm.value.name, this.searchOthersForm.value.phoneno, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.otherList = res;
        this.responseOthersPageCount = this.otherList[0].pageCount;
      }, error => {
        console.log(error);
      })
    } else {
      this.tostar.warning('Please Enter All Fields');
    }
  }
  othersPaginationPrevi() {
    if (this.pageId >= 1) {
      --this.pageId;
      if (this.searchOthersForm.value.name && this.searchOthersForm.value.phoneno) {
        this.outboundsvc.getotherCategoryusers(this.searchOthersForm.value.name, this.searchOthersForm.value.phoneno, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.otherList = res;
          this.responseOthersPageCount = this.otherList[0].pageCount;
        }, error => {
          console.log(error);
        })
      }
    }
  }
  othersPaginationNext() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      if (this.searchOthersForm.value.name && this.searchOthersForm.value.phoneno) {
        this.outboundsvc.getotherCategoryusers(this.searchOthersForm.value.name, this.searchOthersForm.value.phoneno, this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.otherList = res;
          this.responseOthersPageCount = this.otherList[0].pageCount;
        }, error => {
          console.log(error);
        })
      }
    }
  }
  getOthersDetails(data, i) {
    console.log(data);
    if (this.categoryaddress === 'ToAddress') {
      this.useridd = data.userId;
      this.addressid = data.address.addressId;

      this.statesList.forEach(element => {
        if (element.stateName === data.address.state) {
          data.address.state = element.stateId;
          this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            this.citiesList = res;
            this.citiesList.forEach(element => {
              if (element.cityName.toLowerCase() === data.address.city.toLowerCase()) {
                data.address.city = element.cityId;
                this.BindToaddressdata(data, i);
              }
            });
          }, error => {
            console.log(error);
          });
        }
      });
      this.openOthersBtn.nativeElement.click();
      this.searchOthersForm.reset();

      this.outboundsvc.getotherCategoryusers('', '', this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.otherList = res;
        this.responseOthersPageCount = this.otherList[0].pageCount;
      }, error => {
        console.log(error);
      })

      console.log(this.useridd);
      console.log(this.addressid)
    } else {
      this.endorseuseridd = data.userId;
      this.endorseaddressid = data.address.addressId;
      this.Binddata(data, i);
      this.openOthersBtn.nativeElement.click();
      this.searchOthersForm.reset();
      this.outboundsvc.getotherCategoryusers('', '', this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res);
        this.otherList = res;
        this.responseOthersPageCount = this.otherList[0].pageCount;
      }, error => {
        console.log(error);
      })
      console.log(this.endorseuseridd);
      console.log(this.endorseaddressid)
    }

  }
  resetSearchOthersForm(i) {
    this.searchOthersForm.reset();
    this.outboundsvc.getotherCategoryusers('', '', this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.otherList = res;
      if(res.length>0)
      this.responseOthersPageCount = this.otherList[0].pageCount;
    }, error => {
      console.log(error);
    })
    debugger
    const x = (this.form.controls['itemRows']['controls']);
      console.log(x);
      x[i].controls.selectedCategory.patchValue(this.selectedOrg);
  }
  // getotherCategoryusers
  // getOtherCategoryUsers(i){
  //   if (this.categoryaddress === 'ToAddress') {
  //   this.outboundsvc.getotherCategoryusers(this.searchOthersForm.value.name,this.searchOthersForm.value.phoneno,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
  //     console.log(res);
  //     this.Binddata(res,i);
  //   },error=>{
  //     console.log(error);
  //   })
  // }
  // }
  // Notesheet Save And Create
  noteSheetSubmit(data: any) {
    console.log(data);
    this.sectionReference();
    const allArray = [];
    const ccarray = [];
    this.submitted = true;
    if (this.noteSheetForm.valid) {
      console.log(this.noteSheetForm.value);
      console.log(this.form.value);

      for (const iterator of this.form.getRawValue().itemRows) {
        console.log(iterator)
        this.radioButtonType = iterator.radioOption;
        debugger
        if (iterator.addressviaType1 == false && iterator.addressviaType2 == false) {
          this.showerrormsg = true;
        }
        else if (iterator.addressviaType1 === true && (iterator.addressviaType2 === true && iterator.addressviaType3 === 'By Hand')) {
          iterator.addressvia = 6; // Email+paper+By Hand
        } else if (iterator.addressviaType1 === true && (iterator.addressviaType2 === true && iterator.addressviaType3 === 'By Courier')) {
          iterator.addressvia = 7; // Email+paper+By Courier
        } else if (iterator.addressviaType1 === true && (iterator.addressviaType2 === true && iterator.addressviaType3 === 'By SpeedPost')) {
          iterator.addressvia = 2; // Email+paper+By SpeedPost
        } else if (iterator.addressviaType2 === true && iterator.addressviaType3 === 'By Hand') {
          iterator.addressvia = 5; // paper+By Hand
        } else if (iterator.addressviaType2 === true && iterator.addressviaType3 === 'By Courier') {
          iterator.addressvia = 3; // Email+paper+By Courier
        } else if (iterator.addressviaType2 === true && iterator.addressviaType3 === 'By SpeedPost') {
          iterator.addressvia = 4; // Email+paper+By SpeedPost
        } else if (iterator.addressviaType1 === true) {
          iterator.addressvia = 1;
        }
        if (iterator.radioOption === 'Single') {
          let stateName: string;
          this.statesList.forEach(ele => {
            let iteratorState: number = Number(iterator.addressState);
            if (ele.stateId === iteratorState) {
              stateName = ele.stateName
            }
          });
          const addobj = {
            dakAddressType: {
              addressTypeId: 1
            },
            recipientName: iterator.addressReceiptName,
            recipientEmailId: iterator.addressReceiptEmailId,
            recipientContactNumber: iterator.addressContactNumber ? iterator.addressContactNumber : null,
            dakAddressCategories: {
              addressCategoryId: iterator.selectedCategory
            },
            // userMaster: {
            //   userId: iterator.Toaddressuserids
            // },
            userMaster: iterator.Toaddressuserids?{
              userId: iterator.Toaddressuserids
            }:null,
            // iterator.toaddressdesig
            // designation: {
            //   designationId: 4
            // },
            dispatchVia: {
              dispatchViaId: iterator.addressvia
              // dispatchViaId: this.dispatchViaId
            },
            address: iterator.selectedCategory === "6" ? {
              addressId: null,
              city: iterator.addressCity,
              country: "India",
              landmark: null,
              line1: iterator.addressLine1,
              line2: iterator.addressLine2 ? iterator.addressLine2 : null,
              state: stateName,
              zipCode: iterator.addressZipCode
            } : { addressId: iterator.Toaddressids },
            isRecipientSingle: true
          }
          debugger
          // if(){
          //     let temp = 
             
          //     addobj['address']=temp;
          //   }if(iterator.selectedCategory === "1" ||iterator.selectedCategory === "2"||iterator.selectedCategory === "3"||iterator.selectedCategory === "4"||iterator.selectedCategory === "5"){
          //     var temp1 = 
          //         {
          //            addressId: iterator.Toaddressids?iterator.Toaddressids:null
                             
          //         }
          //     addobj['address']=temp1;
          //   }
          console.log(addobj);
          allArray.push(addobj);
        }
         else {
          const addobj = {
            dakAddressType: {
              addressTypeId: 1
            },
            dispatchVia: {
              dispatchViaId: iterator.addressvia
              // dispatchViaId: this.dispatchViaId
            },
            dakAddressCategories: {
              addressCategoryId: iterator.receiptBulkOption
            },
            isRecipientSingle: false
          }
          allArray.push(addobj);
        }
      }
      for (const iterator of this.noteSheetForm.value.endorseAddress) {
        let endorseStateName: string;
        this.statesList.forEach(ele => {
          let iteratorState: number = Number(iterator.endorseeState);
          if (ele.stateId === iteratorState) {
            endorseStateName = ele.stateName
          }
        });
        if (iterator.endorseeviaType1 == false && iterator.endorseeviaType2 == false) {
          this.showendorsemsg = true;
        }
        if (iterator.endorseeviaType1 === true && (iterator.endorseeviaType2 === true && iterator.endorseeviaType3 === 'By Hand')) {
          iterator.endorseevia = 6; // Email+paper+By Hand
        } else if (iterator.endorseeviaType1 === true && (iterator.endorseeviaType2 === true && iterator.endorseeviaType3 === 'By Courier')) {
          iterator.endorseevia = 7; // Email+paper+By Courier
        } else if (iterator.endorseeviaType1 === true && (iterator.endorseeviaType2 === true && iterator.endorseeviaType3 === 'By SpeedPost')) {
          iterator.endorseevia = 2; // Email+paper+By SpeedPost
        } else if (iterator.endorseeviaType2 === true && iterator.endorseeviaType3 === 'By Hand') {
          iterator.endorseevia = 5; // paper+By Hand
        } else if (iterator.endorseeviaType2 === true && iterator.endorseeviaType3 === 'By Courier') {
          iterator.endorseevia = 3; // Email+paper+By Courier
        } else if (iterator.endorseeviaType2 === true && iterator.endorseeviaType3 === 'By SpeedPost') {
          iterator.endorseevia = 4; // Email+paper+By SpeedPost
        } else if (iterator.endorseeviaType1 === true) {
          iterator.endorseevia = 1;
        }
        const endorObj =
        {
          dakAddressType: {
            addressTypeId: 2
          },
          recipientName: iterator.endorseeName,
          recipientEmailId: iterator.endorseeEmail,
          recipientContactNumber: iterator.endorseeContact ? iterator.endorseeContact : null,
          dakAddressCategories: {
            addressCategoryId: iterator.endorseeOrg
          },
          // userMaster: {
          //   userId: iterator.endorseuserid
          // },
          userMaster: iterator.endorseuserid?{
            userId: iterator.endorseuserid
          }:null,
          // iterator.endordesignation
          // designation: {
          //   designationId: 4
          // },
          dispatchVia: {
            dispatchViaId: iterator.endorseevia
            // dispatchViaId: this.dispatchendorseViaId
          },
          address: iterator.endorseeOrg === "6" ? {
            addressId: null,
            city: iterator.endorseeCity,
            country: "India",
            landmark: null,
            line1: iterator.endorseeAddressLine1,
            line2: iterator.endorseeAddressLine2 ? iterator.endorseeAddressLine2 : null,
            state: endorseStateName,
            zipCode: iterator.endorseeZipCode
          } : { addressId: iterator.endorseaddressid },
        };
       
        allArray.push(endorObj);
        console.log(allArray);
      }
      for (const iterator of this.noteSheetForm.value.ccAddress) {
        console.log(iterator.ccInternalSection);
        debugger
        if (iterator.ccInternalSection && !iterator.isSectionReference) {
          const ccObj = {
            dakAddressType: {
              addressTypeId: 3
            },
            section: {
              sectionId: iterator.ccInternalSection
            },
            ccType: "SECTION"
          }
          ccarray.push(ccObj);
        } if(iterator.ccInternalSection && iterator.isSectionReference) {
          const obj = {
            dakAddressType: {
              addressTypeId: 3
            },
            dakDispatchFileNos: {
              dakDispatchFileId: this.dakDispatchFileId
            },
            ccType: "FILE"
          }
          ccarray.push(obj)
        }
        console.log(ccarray);
      }
      // this.noteSheetForm.value.cateDispatchCate
      // this.noteSheetForm.value.cateDispatchUrgency
      const obj = {
        dispatchCategories: {
          categoryId: this.noteSheetForm.getRawValue().cateDispatchCate
        },
        receiptId: this.receiptFileData.receiptId ? this.receiptFileData.receiptId : null,
        receiptLanguageId: {
          receiptLanguageId: this.noteSheetForm.value.cateDispatchLanguage
        },
        dispatchUrgency: {
          urgencyId: this.noteSheetForm.getRawValue().cateDispatchUrgency
        },
        dispatchConfidentialityType: this.noteSheetForm.getRawValue().cateDispatchConfidential ? {
          dispatchModeId: this.noteSheetForm.getRawValue().cateDispatchConfidential
        } : null,
        senderDesignation: {
          designationId: this.putupNoteSheetDesiginationId
        },
        // this.noteSheetForm.value.senderName,
        senderName: this.noteSheetForm.getRawValue().senderName,
        dispatchByDate: '',
        noteSheetContents: this.noteSheetForm.value.comments,
        isDispatchWithDfa: this.noteSheetForm.value.attachdfa,
        dispatchUserId: sessionStorage.getItem('userId-usec'),
        // dakDispatchRecipientDetails: ccarray,
        dakDispatchFileNos: {
          dakDispatchFileId: this.dakDispatchFileId,
          section: {
            sectionId: JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId
          },
          subSection: {
            subSectionId: this.noteSheetForm.value.refSubSection
          },
          dakFileCategory: {

            fileCategoryId: this.noteSheetForm.value.category
          },
          dakFileSubCategory: {
            fileSubCategoryId: this.noteSheetForm.value.subCategory
          },
          dakFileSubCategoryReference: this.noteSheetForm.value.reference ? {
            fileSubCategoryReferenceId: this.noteSheetForm.value.reference
          } : null,
          // college:this.noteSheetForm.value.college ? {
          //   collegeId: this.noteSheetForm.value.college 
          // }:null,

          // dakFileSubjectReferenceNonCollege: this.noteSheetForm.value.reference ?
          //   {
          //     fileSubjectReferenceId: this.noteSheetForm.value.reference
          //   } : null,
          college: this.noteSheetForm.value.refCollegeId ? {
            collegeId: this.noteSheetForm.value.refCollegeId
          } : null,

          dakFileSubjectReferenceNonCollege: this.noteSheetForm.value.refSubjectId ?
            {
              fileSubjectReferenceId: this.noteSheetForm.value.refSubjectId
            } : null,
          subjectRef: 1,
          subjectId: 1,
          dispatchYear: this.noteSheetForm.getRawValue().refYear,
          financialYear: this.noteSheetForm.value.refAcademicYear,
          dakDispatchFileNo: this.patternNumber
        },
      }
      console.log(obj);
      if (this.noteSheetForm.value.cateDispatchConfidential === null) {
        obj.dispatchConfidentialityType = null;
      }
      if (this.noteSheetForm.value.attachdfa === true) {
        obj['dakDispatchRecipientDetails'] = [...allArray, ...ccarray]
      } else {
        obj['dakDispatchRecipientDetails'] = ccarray;
      }
      if (this.noteSheetForm.value.cateDispatchLanguage === '1' || this.noteSheetForm.value.cateDispatchLanguage === 1) {
        obj['dfaSubject'] = this.noteSheetForm.value.dfaSubject;
        obj['dfaContents'] = this.noteSheetForm.value.dfacomments;
      } else if (this.noteSheetForm.value.cateDispatchLanguage === '2' || this.noteSheetForm.value.cateDispatchLanguage === 2) {
        obj['dfaHindiSubject'] = this.noteSheetForm.value.dfaHindiSubject;
        obj['dfaHindiContents'] = this.noteSheetForm.value.dfahindiComments;
      }
      console.log(obj);
      if (this.dispatchId !== '0' && this.dispatchId !== 0) {
        obj['dispatchId'] = this.dispatchId;
        // obj.dakDispatchFileNos.dakDispatchFileId = this.dispatchFileID;
        this.outboundsvc.updateDespatch(this.files, obj).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          this.tostar.success('Success', 'Note Sheet Updated', {
            timeOut: 3000
          });
          if ((this.roleName === 'AcademicAsstSecty') || (this.roleName === 'AEAssistantSecretary')
            || (this.roleName === 'LegalAsstSecty') || (this.roleName === 'ARPMAsstSecty')) {
            this.router.navigate(['main/internal/outbound/secInch/IncDashboard']);
          } else {
            this.router.navigate(['/main/internal/outbound/se/dashboard']);
          }
        }, error => {
          this.helper.errorMessage(error);
          this.tostar.error('Error', 'Something Went Wrong,Please try again', {
            timeOut: 3000
          });
        });
      }
      else {
        this.outboundsvc.saveDispatch(this.files, obj, data).pipe(takeUntil(this.subscribe)).subscribe(res => {
          console.log(res);
          if (data === 'Save') {
            this.tostar.success('Success', 'Note Sheet Saved', {
              timeOut: 3000
            });
          } else {
            this.tostar.success('Success', 'Note Sheet Created', {
              timeOut: 3000
            });
          }
          debugger
          if ((this.roleName === 'AcademicAsstSecty') || (this.roleName === 'AEAssistantSecretary')
            || (this.roleName === 'LegalAsstSecty') || (this.roleName === 'ARPMAsstSecty')) {
            this.router.navigate(['main/internal/outbound/secInch/IncDashboard']);
          } else {
            this.router.navigate(['/main/internal/outbound/se/dashboard']);
          }
        }, error => {
          this.helper.errorMessage(error);
          this.tostar.error('Error', 'Something Went Wrong,Please try again', {
            timeOut: 3000
          });
        });
      }
    }
  }
  fileReferenceValue(value) {
    console.log(value);
    this.refidvalues = value;
    this.refForm.get('filerefCollegeId').setValue(value);
    this.refno();
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
      if (x.subSectionId === parseInt(this.refForm.value.filerefSubSection)) {
        return x.shortName;
      }
    }).join('');
    const categoryValue = this.categoriesListt.map(x => {
      if (x.fileCategoryId === parseInt(this.refForm.value.filecategory)) {
        return x.shortName;
      }
    }).join('');
    const subCategoryValue = this.subcategoriesListt.map(x => {
      if (x.fileSubCategoryId === parseInt(this.refForm.value.filesubCategory)) {
        return x.shortName;
      }
    }).join('');
    this.patternNumber = `DCI/${sectionIdValue}/${suSectionIdValue}/${categoryValue}/${subCategoryValue}/${this.refidvalues}/${this.refForm.value.filerefAcademicYear}/${year}`;
    console.log(this.patternNumber);
     this.refForm.get('filerefReferenceNumber').setValue(this.patternNumber);
    // this.filesectionReference = this.patternNumber;
  }

  changeAcademic(value) {
    this.academicYearValue = value;
  }
  changeAcademics(value) {
    this.academicYearValues = value;
    debugger;
  }
  // resetFileData(){
  //   this.refForm.reset();
  //   this.refForm.get('refSection').setValue(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName);
  //   this.refForm.controls.refYear.setValue(this.currentyear, { onlySelf: true });
  //   this.refForm.controls.refSubSection.setValue('', { onlySelf: true });
  //   this.refForm.controls.refAcademicYear.setValue(this.refacademicyear, { onlySelf: true });
  //   this.refForm.controls.category.setValue('', { onlySelf: true });
  //   this.refForm.controls.subCategory.setValue('', { onlySelf: true });
  //       this.refForm.controls.refCollegeId.setValue('', { onlySelf: true });
  //       this.refForm.controls.college.setValue('', { onlySelf: true });
  //      this.refForm.controls.refSubjectId.setValue('', { onlySelf: true });
  //   // this.refForm.get('year').setValue(this.currentyear);
  //   this.searchForm.reset();
  // }
  tagCcFile() {
    const obj = {
        dakDispatchFileId: null,
        section: {
          sectionId: JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionId
        },
        subSection: {
          subSectionId: this.refForm.value.filerefSubSection
        },
        dakFileCategory: {

          fileCategoryId: this.refForm.value.filecategory
        },
        dakFileSubCategory: {
          fileSubCategoryId: this.refForm.value.filesubCategory
        },
        dakFileSubCategoryReference :this.refForm.value.filereference ? {
          fileSubCategoryReferenceId : this.refForm.value.filereference
          }:null,
        college:this.refForm.value.filerefCollegeId ? {
          collegeId: this.refForm.value.filerefCollegeId 
        }:null,
        
        dakFileSubjectReferenceNonCollege: this.refForm.value.filerefSubjectId ?
          {
            fileSubjectReferenceId: this.refForm.value.filerefSubjectId
          } : null,
         subjectRef: 1,
         subjectId: 1,
        dispatchYear: this.currentyear,
        financialYear: this.refForm.value.filerefAcademicYear,
        dakDispatchFileNo: this.patternNumber,
        createdBy : sessionStorage.getItem('userId-usec')
    };
    this.outboundsvc.saveFileNum(obj).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
      console.log(res);
      this.selectbtn.nativeElement.click();
      this.tostar.success('Success', 'Created New File number');
      this.dakDispatchFileId =res.dakDispatchFileId;
      this.fileReset();
    },error=>{
      console.log(error);
      this.tostar.error('Failed', 'New File number');
      this.fileReset();
    })
    this.ccAddressArr.controls[this.indexNumber]['controls']['isSectionReference'].patchValue(true);
    this.ccAddressArr.controls[this.indexNumber]['controls']['sectionRef'].patchValue(this.patternNumber);
  }
  fileReset() {
    this.refForm.reset();
    this.refForm.get('filerefSection').setValue(JSON.parse(sessionStorage.getItem('userInfo-usec')).section.sectionName);
    this.refForm.controls.filerefYear.setValue(this.currentyear, { onlySelf: true });
    this.refForm.controls.filerefSubSection.setValue('', { onlySelf: true });
    this.refForm.controls.filerefAcademicYear.setValue(this.refacademicyear, { onlySelf: true });
    this.refForm.controls.filecategory.setValue('', { onlySelf: true });
    this.refForm.controls.filesubCategory.setValue('', { onlySelf: true });
    this.refForm.controls.filerefCollegeId.setValue('', { onlySelf: true });
    this.refForm.controls.filecollege.setValue('', { onlySelf: true });
    this.refForm.controls.filerefSubjectId.setValue('', { onlySelf: true });
    this.refForm.controls.filereference.setValue('', { onlySelf: true });
    // this.refForm.get('year').setValue(this.currentyear);
    this.searchForm.reset();
  }

  // Destroy The API Calls After Subscription
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
