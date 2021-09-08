import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InboundservicesService } from '../../services/inboundservices.service';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { urlServices } from '../../services/inboundServiceUrls';
import { HelperService } from 'src/app/common-service/helper.service';

import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CategoryCode, CreatedairyDakInput, DakAddressCategories, EntityMaster, ReceiptLanguageId, ReceiptType, ReceiptVia, SenderAddress, UserMaster } from '../models/dairyDak.model';
import { UpdatedairyDakInput, UpdateSenderAddress } from '../models/dairyDakupdate.model';
import { Designation } from 'src/app/usermgt/Models/createuser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
import { element } from 'protractor';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { OutboundService } from 'src/app/diarydak/outbound/services/outbound.service';



@Component({
  selector: 'app-create-reciept',
  templateUrl: './create-reciept.component.html',
  styleUrls: ['./create-reciept.component.css']
})
export class CreateRecieptComponent implements OnInit {
  @ViewChild('openModal') openBtn: ElementRef<HTMLElement>;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('openOthersModal') openOthersBtn: ElementRef<HTMLElement>;
  receiptForm: FormGroup;
  searchForm: FormGroup;
  statesList: any = [];
  designationList: any = [];
  categoryname: any;
  principalList: any;
  useridd: any;
  addressid: any;
  hide: boolean;
  item: any = [];
  submitted = false;
  receiptObject: any;
  allCategories: any;
  allLanguages: any;
  allVias: any = [];
  allReceiptTypes: any;
  fileData: any;
  showButton = false;
  forwardReceiptForm: FormGroup;
  countries: any = [];

  citiesList: any = [];
  evidanceArray = [];
  receiptList: any;
  downloadUrl: string;
  documentArray: any;
  userId: any;
  user: any;
  addressId: any;
  receiptId: any;
  userArray: any;
  documents: number;
  files: any = [];
  items: FormArray;
  documentsArray: any;
  receiptObjects: any;
  status: string;
  dairyDate: any;
  receiptDate: void;
  dairyYear: string;
  diaryReceivedDate: string;
  dairyYearSetUp: string;
  dairyDateSetUp: string;
  dairyReceivedDateSetUp: string;
  showAssignButton: boolean;
  showAssignReceiptButton: boolean = false;
  showEvidance: boolean;
  showUploadDocuments: boolean = true;
  // today: any;
  subscribe: Subject<any> = new Subject<any>();
  sectionName: any = [];
  selectedusers: any;
  userIdss: any = [];
  name: any;
  patternNumber: any;
  academicYearValue: any;
  sectionList: any;
  subSectionList: any;
  showdropdown: boolean;
  showothers: boolean;
  showState: boolean = false;

  dentistDataShow: boolean;
  dentistlist: any = [
    {
      id: '1', name: 'harika', address: 'Hyderabad'
    },
    {
      id: '2', name: 'monu', address: 'Hyderabad'
    }, {
      id: '3', name: 'krithik', address: 'Hyderabad'
    }
  ]
  showSearch: boolean;
  categoriesData: any;
  categoryvalue: any;
  addresscategory: any;
  designation: any;
  designationName: any;
  showradio: boolean;
  dmeList: any;
  healthsecList: any;
  advocateList: any;
  designationid: any;
  senderAddressId: any;
  senderName: any;
  ministryList: any = [];
  categoryId: any;
  diraydate: any;
  dirayrecieveddate: any;
  hidebtn: boolean = false;
  loggedin: any;
  show: boolean;
  showDetail: boolean;
  isSubmitted: boolean = false;
  today = moment().format('YYYY-MM-DD');
  history: any = [];
  receiptdetails: any;
  showcomments: boolean = false;
  showerrormsg: boolean = false;
  showCategory: boolean = false;
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any
  disableNextButton: boolean = false;
  disablePreviousButton: boolean = true;
  responseDmePageCount: any;
  primaryKeys: any =[];
  primaryKeyvalue: any;
  userdata: any=[];
  searchOthersForm: FormGroup;
  otherList: any;
  responseOthersPageCount: any;
  object: any;


  // UserNameList = [
  //   { role: 'ARPLSecInCharge', name: 'Act regulations and policy matters section' },
  //   { role: 'AFSecInCharge', name: 'accounts and finance section' },
  //   { role: 'AESecInCharge', name: 'administration and establishment section' },
  //   { role: 'ISecInCharge', name: 'Inspection section' },
  //   { role: 'LSecInCharge', name: 'legal section' },
  //   { role: 'RDSecInCharge', name: 'receipt and dispatch section' },
  //   { role: 'RTISecInCharge', name: 'RTI section' },
  //   { role: 'ASecInCharge', name: 'academic section' }
  // ];

  // existingFilesList: any = [
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "20-09-2020", "type": "Dispatch" },
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "21-09-2020", "type": "Dispatch" },
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "22-09-2020", "type": "Receipt" },
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "20-09-2020", "type": "Receipt" },
  //   { "filename": "DCI/ARPL/STD/fds/1/2020/2020-21", "date": "20-09-2020", "type": "Dispatch" }

  // ];
  // Exsisting File


  // public form: FormGroup;
  // radioButtonType: any;
  // showsinglefields: boolean;
  // showbulkfields: boolean;


  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  constructor(public fb: FormBuilder, public service: InboundservicesService, public helper: HelperService,
    public aroute: ActivatedRoute, public usrmgtService: UsrmgtService, public router: Router, public urls: urlServices,
    public tostar: ToastrService, public outboundsvc: OutboundService) { }
  public loading: boolean;
  ngOnInit(): void {
    this.getStates();

    const id = this.aroute.snapshot.params.id;
    // this.today = new Date().toISOString().split('T')[0];
    this.receiptForm = this.fb.group({
      addressOrganization: [''],
      // addressReceiptName: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      // senderDesignation: ['', Validators.compose([Validators.required])],
      addressReceiptEmailId: ['', Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])],
      dairyDate: [{ value: this.today, disabled: true }],
      // recipitType: ['', Validators.required],
      recipitCategory: ['', Validators.required],
      recipitLanguage: ['', Validators.required],
      recipitVia: ['', Validators.required],
      addressContactNumber: ['', Validators.required],
      dateRecieved: ['', Validators.required],
      refId: ['', Validators.required],
      senderName: ['', Validators.required],
      subject: ['', Validators.required],
      enclosureDetails: [''],
      line1: ['', Validators.required],
      line2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],

      // zipCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(7)]],
      country: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
      file: ['', Validators.required],
      selectedCategory: [{ value: '', disabled: true }],
    });
    this.forwardReceiptForm = this.fb.group({
      comments: [''],
    });
    this.searchForm = this.fb.group({
      state: [''],
      searchValue: ['']
    })
    // others category
    this.searchOthersForm =this.fb.group({
      name :[''],
      phoneno:['']
    })
    this.getAllReceipetLanguages();
    this.categoryCall();
    this.getAllReceiptTypes();
    this.getAllSectionHeads()
    this.getAllCountries();
    this.getAllReceiptVias();
    this.getAddressCategory();
    this.getAllDesignations();
    this.getLoginUserId();

    if (id) {
      this.showButton = true;
      this.getReceiptDetails(id);

      this.receiptId = id;
      this.showAssignReceiptButton = true;
      this.getHistoryOfReceipt();
    }

  }
  get f() { return this.receiptForm.controls; }
  // Get States
  getStates() {
    this.usrmgtService.getAllStates(1).pipe(takeUntil(this.subscribe)).subscribe(res => {
      this.statesList = res;
      console.log(res);
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  // getCities
  getCities(value: any) {
    console.log(value);
    this.usrmgtService.getAllCities(value).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      this.citiesList = res;
      // this.citiesList.forEach(element => { 
      //   if (element.elementName == cityName.)

      // });

      console.log(this.citiesList);
    }, error => {
      console.log(error);
    });
  }
  reset() {
    this.searchForm.reset();
    this.searchForm.controls.state.setValue('', { onlySelf: true });
    this.pageId =0;
    this.rowId=10;
    }
  getAddressCategory() {
    this.service.get_address_category().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.addresscategory = result;
    });
  }

  getAllReceiptVias() {
    this.service.getAllReceiptVias().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.allVias = result;
    });
  }
  getAllSectionHeads() {
    this.service.getAllSectionHeads().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.userArray = result;
      console.log(result)
      result.forEach(element => {
       this.userdata.push({
         "user":element,
         "isprimary" :0
       })
      });
    });
  }
  categoryCall() {
    this.outboundsvc.getAllDispatchCategories().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result)
      this.allCategories = result;
    });
  }


  getLoginUserId() {
    this.service.getLoginUserId().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result, 'getLoginUserId');
      this.loggedin = result;
    });
  }
  // getAllDesignations
  getAllDesignations() {
    this.service.getAllDesignations().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.designationList = res;
      this.designation = res[1].designationId;
      console.log(this.designation);
      this.helper.sortedData(this.designationList, 'designationName');
      this.getSenderName(this.designation)
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  // Get Sender Names
  getSenderName(designationId: any) {
    console.log(designationId);
    this.designationList.map(ele => {
      if (ele.designationId === designationId) {
        console.log(ele.designationName);
        this.designationName = ele.designationName;
      }
    });
    this.service.getUsersByDesignation(this.designationName).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  search() {
    this.showradio = true;
  }


  // SearchWithStateandValue() {
  //   this.dentistDataShow = true;  not
  //   console.log(this.searchForm.value);
  //   if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
  //     if (this.categoryname === 'Principal') {
  //       this.service.getPrinicipalByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue)
  //         .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
  //           console.log(res);
  //           this.principalList = res;
  //         }, error => {
  //           console.log(error);
  //         });


  //     } else if (this.categoryname === 'DME') {
  //       this.service.getDMEByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue)
  //         .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
  //           console.log(res);
  //           this.dmeList = res;
  //         }, error => {
  //           console.log(error);
  //         })
  //     } else if (this.categoryname === 'Health Secretary') {
  //       this.service.getHealthSecByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue)
  //         .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
  //           console.log(res);
  //           this.healthsecList = res;
  //         }, error => {
  //           console.log(error);
  //         });
  //     } else if (this.categoryname === 'Advocate') {
  //       this.service.getAdvocateByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue)
  //         .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
  //           console.log(res);
  //           this.advocateList = res;
  //         }, error => {
  //           console.log(error);
  //         });
  //     }
  //   } else {
  //     console.log('enter any field value');
  //     this.tostar.warning('Please Enter  Fields To Search', 'Warning', {
  //       timeOut: 2000
  //     });
  //   }





  SearchWithStateandValue() {

    console.log(this.searchForm.value);
    //Principal
    // if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
    //   if (this.categoryname === 'Principal') {
    //     this.service.getPrinicipalByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue)
    //       .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
    //         console.log(res);
    //         this.principalList = res;
    //       }, error => {
    //         console.log(error);
    //       });
    //   }

    // }
    debugger
    if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
      if (this.categoryname === 'Principal') {
        this.service.getPrinicipalByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.principalList = res;
            this.responsePageCount = this.principalList[0].pageCount;
          }, error => {
            console.log(error);
          });
      }
    } else if (this.searchForm.value.state) {
      this.service.getPrinicipalByState(this.searchForm.value.state, this.pageId, this.rowId)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.principalList = res;
          this.responsePageCount = this.principalList[0].pageCount;
        }, error => {
          console.log(error);
        });
    } else if (this.searchForm.value.searchValue) {
      this.service.getPrinicipalByName(this.searchForm.value.searchValue, this.pageId, this.rowId)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.principalList = res;
          this.responsePageCount = this.principalList[0].pageCount;
        }, error => {
          console.log(error);
        });
    }


    //DME
    // if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
    //   if (this.categoryname === 'DME') {
    //     this.service.getDMEByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue)
    //       .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
    //         console.log(res);
    //         this.dmeList = res;
    //       }, error => {
    //         console.log(error);
    //       });
    //   }

    // }
    if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
      if (this.categoryname === 'DME') {
        this.service.getDMEByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.dmeList = res;
            this.responseDmePageCount = this.dmeList[0].pageCount;
          }, error => {
            console.log(error);
          });
      }
    } else if (this.searchForm.value.state) {
      this.service.getDMEByState(this.searchForm.value.state, this.pageId, this.rowId)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.dmeList = res;
          this.responseDmePageCount = this.dmeList[0].pageCount;
        }, error => {
          console.log(error);
        });
    } else if (this.searchForm.value.searchValue) {
      this.service.getDMEByName(this.searchForm.value.searchValue, this.pageId, this.rowId)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.dmeList = res;
          this.responseDmePageCount = this.dmeList[0].pageCount;
        }, error => {
          console.log(error);
        });
    }


    //Health Secretary
    if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
      if (this.categoryname === 'Health Secretary') {
        this.service.getHealthSecByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.healthsecList = res;
          }, error => {
            console.log(error);
          });
      }
    } else if (this.searchForm.value.state) {
      this.service.getHealthSecByState(this.searchForm.value.state)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.healthsecList = res;
        }, error => {
          console.log(error);
        });
    }
    else if (this.searchForm.value.searchValue) {
      this.service.getHealthSecByName(this.searchForm.value.searchValue)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.healthsecList = res;
        }, error => {
          console.log(error);
        });
    }

    //Advocate
    if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
      if (this.categoryname === 'Advocate') {
        this.service.getAdvocateByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.advocateList = res;
          }, error => {
            console.log(error);
          });
      }
    } else if (this.searchForm.value.state) {
      this.service.getAdvocateByState(this.searchForm.value.state)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.advocateList = res;
        }, error => {
          console.log(error);
        });
    }
    else if (this.searchForm.value.searchValue) {
      this.service.getAdvocateByName(this.searchForm.value.searchValue)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.advocateList = res;
        }, error => {
          console.log(error);
        });
    }
  }





  //  Categories List 
  orgCategory(data) {
    console.log(data);
    this.categoryvalue = data;
    this.showCategory = true;
    this.receiptForm.controls.addressOrganization.setValue('', { onlySelf: true });
    this.addresscategory.forEach(element => {
      if (element.addressCategoryId === parseInt(this.categoryvalue)) {
        this.categoryname = element.name;
        this.categoryId = element.addressCategoryId;
        console.log(this.categoryname);
        console.log(this.categoryId);
      }
      this.receiptForm.patchValue({
        selectedCategory: this.categoryname
      })
    });
    if (data === '1') {
      this.openBtn.nativeElement.click();
      this.getAllPrincipal();
    } else if (data === '2') {
      this.openBtn.nativeElement.click();
      this.getAllDME();
    } else if (data === '3') {
      this.openBtn.nativeElement.click();
      this.getAllHealthSec();
    } else if (data === '5') {
      this.openBtn.nativeElement.click();
      this.getAllAdvocate();
    } 
    else if(data === '6'){
      this.openOthersBtn.nativeElement.click();
    }
    else {
      console.log(data);
      this.getAllMinistry();
    }
  }
  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }
  // getAllPrincipalList
  getAllPrincipal() {
    this.service.getAllPrincipal(this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.principalList = res;
      console.log(this.principalList);
      this.responsePageCount = this.principalList[0].pageCount;
    }, error => {
      console.log(error);

    })
  }
  //Previous Button
  previ() {
    if (this.pageId >= 1) {
      --this.pageId;
      if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
        if (this.categoryname === 'Principal') {
          this.service.getPrinicipalByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
            .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              console.log(res);
              this.principalList = res;
              this.responsePageCount = this.principalList[0].pageCount;
            }, error => {
              console.log(error);
            });
        }
      } else if (this.searchForm.value.state) {
        this.service.getPrinicipalByState(this.searchForm.value.state, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.principalList = res;
            this.responsePageCount = this.principalList[0].pageCount;
          }, error => {
            console.log(error);
          });
      } else if (this.searchForm.value.searchValue) {
        this.service.getPrinicipalByName(this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.principalList = res;
            this.responsePageCount = this.principalList[0].pageCount;
          }, error => {
            console.log(error);
          });
      } else {
        this.service.getAllPrincipal(this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.principalList = res;
          console.log(this.principalList);
          this.responsePageCount = this.principalList[0].pageCount;
        }, error => {
          console.log(error);
        })
      }
    }
  }
  //Next Button 
  next() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
        if (this.categoryname === 'Principal') {
          this.service.getPrinicipalByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
            .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              console.log(res);
              this.principalList = res;
              this.responsePageCount = this.principalList[0].pageCount;
            }, error => {
              console.log(error);
            });
        }
      } else if (this.searchForm.value.state) {
        this.service.getPrinicipalByState(this.searchForm.value.state, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.principalList = res;
            this.responsePageCount = this.principalList[0].pageCount;
          }, error => {
            console.log(error);
          });
      } else if (this.searchForm.value.searchValue) {
        this.service.getPrinicipalByName(this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.principalList = res;
            this.responsePageCount = this.principalList[0].pageCount;
          }, error => {
            console.log(error);
          });
      } else {
        this.service.getAllPrincipal(this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.principalList = res;
          console.log(this.principalList);
          this.responsePageCount = this.principalList[0].pageCount;
        }, error => {
          console.log(error);
        })
      }

    }

  }
  //Previous Button
  previDme() {
    if (this.pageId >= 1) {
      --this.pageId;
      if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
        if (this.categoryname === 'DME') {
          this.service.getDMEByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
            .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              console.log(res);
              this.dmeList = res;
              this.responseDmePageCount = this.dmeList[0].pageCount;
            }, error => {
              console.log(error);
            });
        }
      } else if (this.searchForm.value.state) {
        this.service.getDMEByState(this.searchForm.value.state, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.dmeList = res;
            this.responseDmePageCount = this.dmeList[0].pageCount;
          }, error => {
            console.log(error);
          });
      } else if (this.searchForm.value.searchValue) {
        this.service.getDMEByName(this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.dmeList = res;
            this.responseDmePageCount = this.dmeList[0].pageCount;
          }, error => {
            console.log(error);
          });
      } else {
        this.service.getAllDME(this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.dmeList = res;
          this.responseDmePageCount = this.dmeList[0].pageCount;
          console.log(this.dmeList);
        }, error => {
          console.log(error);
        });
      }
    }
  }
  //Next Button 
  nextDme() {
    if (this.pageId + 1 <= this.responsePageCount - 1) {
      ++this.pageId;
      if (this.searchForm.value.state != '' && this.searchForm.value.searchValue) {
        if (this.categoryname === 'DME') {
          this.service.getDMEByStateAndName(this.searchForm.value.state, this.searchForm.value.searchValue, this.pageId, this.rowId)
            .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
              console.log(res);
              this.dmeList = res;
              this.responseDmePageCount = this.dmeList[0].pageCount;
            }, error => {
              console.log(error);
            });
        }
      } else if (this.searchForm.value.state) {
        this.service.getDMEByState(this.searchForm.value.state, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.dmeList = res;
            this.responseDmePageCount = this.dmeList[0].pageCount;
          }, error => {
            console.log(error);
          });
      } else if (this.searchForm.value.searchValue) {
        this.service.getDMEByName(this.searchForm.value.searchValue, this.pageId, this.rowId)
          .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            console.log(res);
            this.dmeList = res;
            this.responseDmePageCount = this.dmeList[0].pageCount;
          }, error => {
            console.log(error);
          });
      } else {
        this.service.getAllDME(this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          this.dmeList = res;
          this.responseDmePageCount = this.dmeList[0].pageCount;
          console.log(this.dmeList);
        }, error => {
          console.log(error);
        });
      }

    }

  }
  // getAllDMEList
  getAllDME() {
    this.service.getAllDME(this.pageId, this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.dmeList = res;
      this.responseDmePageCount = this.dmeList[0].pageCount;
      console.log(this.dmeList);
    }, error => {
      console.log(error);
    });
  }
  // getAllMinistry
  getAllMinistry() {
    this.service.getAllMinistry().pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      this.getCities(data.address.state);
      console.log(this.statesList);
      debugger
      this.countries.forEach(element => {
        if (element.countryName === data.address.country) {
          data.address.country = element.countryId;
        }
      });
      this.statesList.forEach(element => {
        if (element.stateName === data.address.state) {
          data.address.state = element.stateId;
        }
      });
      this.getCities(data.address.state);
      this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        this.citiesList = res;
      }, error => {
        console.log(error);
      });
      console.log(this.citiesList);
      this.citiesList.forEach(element => {
        if (element.cityName === data.address.city) {
          data.address.city = element.cityId;
        }
      });
      this.receiptForm.patchValue({
        // senderDesignation: data.designation !== null ? data.designation.designationId : '',
        addressReceiptEmailId: data.emailId,
        addressContactNumber: data.phoneNumber,
        line1: data.address.line1,
        line2: data.address.line2,
        country: data.address.country,
        state: data.address.state,
        city: data.address.city,
        zipCode: data.address.zipCode
      });
      console.log(data);
      this.useridd = data.userId;
      this.addressid = data.address.addressId;
    });
  }
  // getAllHealthSec
  getAllHealthSec() {
    console.log('test');
    this.service.getAllHealthSec().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.healthsecList = res;
      console.log(this.healthsecList);

    }, error => {
      console.log(error);
    })
  }

  // getAllAdvocate
  getAllAdvocate() {
    this.service.getAllAdvocate().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.advocateList = res;
    }, error => {
      console.log(error);
    })
  }
  // Principal Details
  getPrincipalDetails(data) {
    console.log(data.address.state);
    console.log(data.address.city);
    this.senderAddressId = data.address.addressId;
    this.senderName = data.senderName;
    console.log(this.statesList);
    this.statesList.forEach(element => {
      if (element.stateName === data.address.state) {
        data.address.state = element.stateId;
        debugger;
      }
    });

    this.getCities(data.address.state);
    this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      this.citiesList = res;
    }, error => {
      console.log(error);
    });
    console.log(this.citiesList);
    this.citiesList.forEach(element => {
      if (element.cityName === data.address.city) {
        data.address.city = element.cityId;

      }
      debugger;
    });
    this.receiptForm.patchValue({
      // senderDesignation: data.designation !== null ? data.designation.designationId : '',
      addressReceiptEmailId: data.emailId,
      addressContactNumber: data.phoneNumber,
      line1: data.address.line1,
      line2: data.address.line2,
      country: 1,
      state: data.address.state,
      city: data.address.city,
      zipCode: data.address.zipCode
    })
    this.useridd = data.userId;
    this.addressid = data.address.addressId;
    this.closeBtn.nativeElement.click();
  }
  // DME Details
  getDMEDetails(data) {
    console.log(data);
    this.statesList.forEach(element => {
      if (element.stateName === data.address.state) {
        data.address.state = element.stateId;
      }
    });
    this.getCities(data.address.state);
    this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      this.citiesList = res;
    }, error => {
      console.log(error);
    });
    console.log(this.citiesList);
    this.citiesList.forEach(element => {
      if (element.cityName === data.address.city) {
        data.address.city = element.cityId;
      }
    });
    this.receiptForm.patchValue({
      // senderDesignation: data.designation !== null ? data.designation.designationId : '',
      addressReceiptEmailId: data.emailId,
      addressContactNumber: data.phoneNumber,
      line1: data.address.line1,
      line2: data.address.line2,
      country: 1,
      state: data.address.state,
      city: data.address.city,
      zipCode: data.address.zipCode
    })
    console.log(data);
    this.useridd = data.userId;
    this.addressid = data.address.addressId;
    this.closeBtn.nativeElement.click();
    console.log(this.useridd);
    console.log(this.addressid)
  }
  // Health Details
  getHealthSecDetails(data) {
    console.log(data.address.state);
    this.getCities(data.address.state);
    this.receiptForm.patchValue({
      // senderDesignation: data.designation !== null ? data.designation.designationId : '',
      addressReceiptEmailId: data.emailId,
      addressContactNumber: data.phoneNumber,
      line1: data.address.line1,
      line2: data.address.line2,
      country: 1,
      state: data.address.state,
      city: data.address.city,
      zipCode: data.address.zipCode
    });
    console.log(data);
    this.useridd = data.userId;
    this.addressid = data.address.addressId;
    this.closeBtn.nativeElement.click();
    console.log(this.useridd);
    console.log(this.addressid)
  }
  // get Advocate Details
  getAdvocateDetails(data) {
    this.getCities(data.address.state);
    this.receiptForm.patchValue({
      // senderDesignation: data.designation !== null ? data.designation.designationId : '',
      addressReceiptEmailId: data.emailId,
      addressContactNumber: data.phoneNumber,
      line1: data.address.line1,
      line2: data.address.line2,
      country: 1,
      state: data.address.state,
      city: data.address.city,
      zipCode: data.address.zipCode
    });
    console.log(data);
    this.useridd = data.userId;
    this.addressid = data.address.addressId;
    this.closeBtn.nativeElement.click();
    console.log(this.useridd);
    console.log(this.addressid)
  }
  // countries
  getAllCountries() {
    this.usrmgtService.getAllCountrie().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res, 'allcountries');
      this.countries = res;
    }, error => {
    });
  }
  // Receipt Details
  getReceiptDetails(id) {
    this.service.getReceiptData(id).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result);
      this.receiptdetails = result;
      console.log(this.statesList);
      debugger;

      this.statesList.forEach(ele => {
        if (ele.stateName === result.senderAddress.state) {
          result.senderAddress.state = ele.stateId;
          console.log(ele.stateId);
          this.usrmgtService.getAllCities(ele.stateId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
            this.citiesList = res;
            console.log(this.citiesList);
            this.citiesList.forEach(element => {
              if (element.cityName === result.senderAddress.city) {
                this.receiptForm.controls.city.setValue(element.cityId);
              }
            });
          }, error => {
            console.log(error);
          });
        }
      });
      this.usrmgtService.getAllCities(result.senderAddress.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        this.citiesList = res;
        this.citiesList.forEach(ele => {
          if (ele.cityName === result.senderAddress.city) {
            result.senderAddress.city = ele.cityId;
            this.receiptForm.get('city').setValue(ele.cityId);
          }
        });
      });

      if (result.dakStatus.statusName === 'Created' || result.dakStatus.statusName === 'Returned'||result.dakStatus.statusName === 'File Tagged') {
        this.showAssignReceiptButton = true;
        this.showEvidance = true;
        this.showUploadDocuments = true;
        this.showDetail = true;
      } else {
        this.showAssignReceiptButton = false;
        this.showEvidance = true;
        this.showUploadDocuments = false;
        this.showDetail = false;
      }
      this.documentsArray = result.receiptDocuments;
      this.addressId = result.senderAddress.addressId;
      if (result.receiptDairyDate !== null && result.receiptDairyDate !== undefined) {
        const id1 = result.receiptDairyDate;
        const arr = id1.split('-');
        this.dairyDate = arr[0] + '-' + arr[1] + '-' + arr[2];
      }
      if (result.dairyReceivedDate !== null && result.dairyReceivedDate !== undefined) {
        const id2 = result.dairyReceivedDate;
        const arr = id2.split('-');
        this.diaryReceivedDate = arr[0] + '-' + arr[1] + '-' + arr[2];
      }
      if(result.userMaster !==null){
        this.useridd = result.userMaster.userId;
      }
      
      this.addressid = result.senderAddress.addressId;
      // this.categoryId = result.dakAddressCategories.addressCategoryId;
      const myDate = result.receiptDairyDate;
      const chunks = myDate.split('-');
      const formattedDate = chunks[2] + '-' + chunks[1] + '-' + chunks[0];
      const receivedDate = result.dairyReceivedDate;
      const receiveChunks = receivedDate.split('-');
      console.log(this.citiesList);
      // console.log(result.senderAddress.state);
      // this.usrmgtService.getAllCities(result.senderAddress.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      //   this.tempList = res;
      //   console.log(this.tempList);
      // }, error => {
      //   console.log(error);
      // });
      // console.log(this.tempList);
      // this.tempList.forEach(element => {
      //   if (element.cityName === result.senderAddress.city) {
      //     console.log(element.cityName);
      //   }
      // });
      console.log(this.citiesList);
      this.showCategory = true;
      debugger
      this.addresscategory.forEach(element => {
        if (element.addressCategoryId === parseInt(result.dakAddressCategories.addressCategoryId)) {
          this.categoryname = element.name;
          this.categoryId = element.addressCategoryId;
          console.log(this.categoryname);
          console.log(this.categoryId);
        }
      });
      this.receiptForm.patchValue({
        dairyDate: formattedDate,
        // recipitType: result.receiptType.receiptTypeId,
        recipitCategory: result.dispatchCategories.categoryId,
        recipitLanguage: result.receiptLanguageId.receiptLanguageId,
        dateRecieved: receiveChunks[2] + '-' + receiveChunks[1] + '-' + receiveChunks[0],
        recipitVia: result.receiptVia.receiptViaId,
        // addressReceiptName: result.receiptToAddress,
        senderName: result.senderName,
        subject: result.receiptSubject,
        // addressOrganization: result.dakAddressCategories.addressCategoryId,
        // senderDesignation: result.designation.designationId,
        addressReceiptEmailId: result.toEmail,
        addressContactNumber: result.contactNumber,
        line1: result.senderAddress.line1,
        line2: result.senderAddress.line2,
        country: 1,
        state: result.senderAddress.state,
         city: result.senderAddress.city,
        zipCode: result.senderAddress.zipCode,
        selectedCategory: this.categoryname,
      });
    });
    debugger;
  }

  // getAllReceiptCategories() {
  //   this.service.getAllReceiptCategorie().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
  //     this.allCategories = result;
  //   }, error => {
  //     console.log(error);
  //   });

  // }
  getAllReceipetLanguages() {
    this.service.getAllReceipetLanguage().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.allLanguages = result;
    }, error => {
      console.log(error);
    });
  }
  getAllReceiptTypes() {
    this.service.getAllReceiptType().pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.allReceiptTypes = result;
    }, error => {
      console.log(error);
    });
  }
  // Reference number
  getRefId() {
    const receiptName = this.allReceiptTypes.map(x => {
      if (x.sectionId === parseInt(this.receiptForm.value.recipitType)) {
        return x.shortName;
      }
    }).join('');
    const categoryName = this.allCategories.map(x => {
      if (x.subSectionId === parseInt(this.receiptForm.value.recipitCategory)) {
        return x.shortName;
      }
    }).join('');

    let refId: string;
    refId = 'DCI' + '/' + this.receiptForm.get('dairyDate').value?.split('-')[0] + '/' + receiptName + '/'
      + categoryName + '/' + this.receiptForm.get('recipitLanguage').value + '/' +
      (this.receiptForm.get('dateRecieved').value?.split('-')[0]);
    this.receiptForm.get('refId').setValue(refId);
  }

  // Receipt Object
  prepareRecipitObject() {
    const id2 = this.receiptForm.get('dairyDate').value;
    var arr = id2.split('-');
    this.dairyDateSetUp = arr[0] + '-' + arr[1] + '-' + arr[2];
    const id3 = this.receiptForm.get('dateRecieved').value;
    var arr = id3.split('-');
    this.dairyReceivedDateSetUp = arr[0] + '-' + arr[1] + '-' + arr[2];
    this.receiptObject =
    {
      receiptToAddress: this.receiptForm.value.addressto,
      recipientUserId: JSON.parse(sessionStorage.getItem('userInfo-usec')).userId,

      categoryCode: {
        receiptCategoryId: this.receiptForm.get('recipitCategory').value,
      },
      // receiptType: {
      //   receiptTypeId: this.receiptForm.get('recipitType').value,
      // },
      dakStatus: {
        statusId: 1,
        statusCode: 'FWD'
      },
      receiptSubject: this.receiptForm.get('subject').value,
      receiptDairyDate: this.dairyDateSetUp,
      receiptDairyYear: this.dairyYearSetUp,
      receiptLanguageId: {
        receiptLanguageId: this.receiptForm.get('recipitLanguage').value,
      },
      dairyReceivedDate: this.dairyReceivedDateSetUp,

      //  Reference Id
      createSheet() {
        this.refId();
        console.log(this.receiptForm.valid);
        console.log(this.receiptForm.value);
      },
      senderEmail: 'test@gmail.com',
      senderMobile: 15158418541854,
    };


  }

  // File Select
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files;
      this.files.push(filesAmount[0]);
    }
    this.receiptForm.controls.file.clearValidators();
    this.receiptForm.controls['file'].updateValueAndValidity();
  }

  // Create Receipt Details
  createRecipit(event: any) {

    this.isSubmitted = true;

    console.log(this.receiptForm.value)
    if (this.receiptForm.valid) {
      event.target.disabled = true;
      this.loading = true;
      this.submitted = false;
      console.log(this.receiptForm.get('dairyDate').value);
      this.diraydate = this.receiptForm.get('dairyDate').value.split('-').reverse().join('-');
      console.log(this.diraydate)
      this.dirayrecieveddate = this.receiptForm.get('dateRecieved').value.split('-').reverse().join('-');
      console.log(this.dirayrecieveddate)
      const obj = {
        receiptDairyDate: this.diraydate,
        // "receiptType": {
        //   "receiptTypeId": 1
        // },
        //   "dispatchCategories": {
        //     "categoryId": 0
        // }
        dispatchCategories: {
          categoryId: this.receiptForm.get('recipitCategory').value
        },
        receiptLanguageId: {
          receiptLanguageId: this.receiptForm.get('recipitLanguage').value
        },
        dairyReceivedDate: this.dirayrecieveddate,
        receiptVia: {
          receiptViaId: this.receiptForm.get('recipitVia').value
        },
        senderName: this.receiptForm.get('senderName').value,
        // senderAddress: {
        //   addressId: this.addressid?this.addressid:0
        // },
        // receiptToAddress: this.receiptForm.get('addressReceiptName').value,
        receiptToAddress: 'hyderabad',
        receiptSubject: this.receiptForm.get('subject').value,
        enclosureDetails: this.receiptForm.get('enclosureDetails').value,
        recipientUserId: JSON.parse(sessionStorage.getItem('userId-usec')),
        toEmail: this.receiptForm.get('addressReceiptEmailId').value,
        contactNumber: this.receiptForm.get('addressContactNumber').value,
        dakAddressCategories: {
          addressCategoryId: this.categoryId
        },
        // designation: {
        //   designationId: 4
        // },
        entityMaster: {
          entityMasterId: JSON.parse(sessionStorage.getItem('entityId-usec'))
        },
        userMaster: {
          userId: this.useridd?this.useridd:0
        }
      }
      let otherobj={
        addressId:0,
        city:this.receiptForm.value.city,
        country:this.receiptForm.value.country,
        landmark:"",
        line1:this.receiptForm.value.line1,
        line2:this.receiptForm.value.line2,
        state:this.receiptForm.value.state,
        zipCode:this.receiptForm.value.zipCode
      }
      let categobj={
        addressId: this.addressid
      }
      if(this.categoryvalue === '6'){
        obj['senderAddress']=otherobj;
      }else{
        obj['senderAddress']=categobj;
      }
      console.log(obj);
      this.service.submitReceiptDetails(this.files, obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        this.tostar.success('Receipt Created Successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['/main/internal/inbound/diarydakincharge/receiptDashboard']);
      });
      (error: any) => {
        this.submitted = false;
        this.loading = false;
      }

    }

  }
  updateReceiptData() {
    console.log(this.receiptForm.get('dairyDate').value);

    this.loading = true;
    this.diraydate = this.receiptForm.get('dairyDate').value.split('-').reverse().join('-');
    console.log(this.diraydate)
    this.dirayrecieveddate = this.receiptForm.get('dateRecieved').value.split('-').reverse().join('-');
    console.log(this.dirayrecieveddate)
    const obj = {
      receiptId: this.receiptId,
      receiptDairyDate: this.diraydate,
      // "receiptType": {
      //   "receiptTypeId": this.receiptForm.get('recipitType').value
      // },
      dispatchCategories: {
        categoryId: this.receiptForm.get('recipitCategory').value
      },
      // categoryCode: {
      //   receiptCategoryId: this.receiptForm.get('recipitCategory').value
      // },
      receiptLanguageId: {
        receiptLanguageId: this.receiptForm.get('recipitLanguage').value
      },
      dairyReceivedDate: this.dirayrecieveddate,
      receiptVia: {
        receiptViaId: this.receiptForm.get('recipitVia').value
      },
      senderName: this.receiptForm.get('senderName').value,
      // senderAddress: {
      //   addressId:  this.addressid?this.addressid:0
      // },
      // receiptToAddress: this.receiptForm.get('addressReceiptName').value,
      receiptToAddress: 'hyderabad',
      receiptSubject: this.receiptForm.get('subject').value,
      enclosureDetails: this.receiptForm.get('enclosureDetails').value,
      recipientUserId: JSON.parse(sessionStorage.getItem('userId-usec')),
      toEmail: this.receiptForm.get('addressReceiptEmailId').value,
      contactNumber: this.receiptForm.get('addressContactNumber').value,
      dakAddressCategories: {
        addressCategoryId: this.categoryId
      },
      // designation: {
      //   designationId: this.receiptForm.get('senderDesignation').value
      // },
      entityMaster: {
        entityMasterId: JSON.parse(sessionStorage.getItem('entityId-usec'))
      },
      userMaster: {
        userId: this.useridd ?this.useridd :0
      }
    }
    let otherobj={
      addressId:this.addressid,
      city:this.receiptForm.value.city,
      country:this.receiptForm.value.country,
      landmark:"",
      line1:this.receiptForm.value.line1,
      line2:this.receiptForm.value.line2,
      state:this.receiptForm.value.state,
      zipCode:this.receiptForm.value.zipCode
    }
    let categobj={
      addressId: this.addressid
    }
    if(this.categoryvalue === '6'){
      obj['senderAddress']=otherobj;
    }else{
      obj['senderAddress']=categobj;
    }
    this.service.updateReceipt(this.files, obj).subscribe(result => {
      this.tostar.success('Receipt updated sucessfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['/main/internal/inbound/diarydakincharge/receiptDashboard']);
    });
    (error: any) => {
      this.loading = false;
    }
  }

  selectedUsers(data: any) {
    this.selectedusers = data.target.value;
    if (data.target.checked) {
      this.userIdss.push(this.selectedusers);
      console.log(this.userIdss);
    } else {
      this.userIdss.forEach((item, index) => {
        if (item === this.selectedusers) {
          this.userIdss.splice(index, 1);
          console.log(this.userIdss);
        }
      });
    }
    if (this.userIdss.length > 0) {
      this.showerrormsg = false;
    } else {
      this.showerrormsg = true;
    }
  }
  // radioButtonevent
  radioButton(data:any){
    console.log(data);
    console.log(this.userIdss);
    let pusheditems: { [id: string]: any; } = {};    // dictionary with key of string, and values of type any
   
   this.userIdss.forEach((key) => {
     console.log(key)
     debugger
     if(key === data){
      pusheditems[key] = 1; 
        }else{
          pusheditems[key] = 0; 
        }
    });
    console.log(pusheditems);
    this.object=pusheditems;
   
}
  
  // Forward Receipt 
  forwardReceipt() {
    console.log(this.userIdss);
    console.log(this.userIdss.length);
    if (this.userIdss.length > 0) {
      this.showerrormsg = false;
      const obj = {
        comments: this.forwardReceiptForm.get('comments').value,
        receiptId: this.receiptId,
        // userIds: this.userIdss,
        // isPrimary: this.primaryKeys
        "userPrimaryMap":this.object
    }
      console.log(obj);
      console.log(this.userIdss);
      console.log(this.primaryKeys);
      this.service.forwardReceiptToMultiplesectionheads(obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        this.router.navigate(['/main/internal/inbound/diarydakincharge/receiptDashboard']);
        this.tostar.success('Receipt Forwarded Successfully', 'Success', {
          timeOut: 2000
        });
      });
    } else {
      this.showerrormsg = true;
    }

  }
  // cancel form
  cancel() {
    this.forwardReceiptForm.reset();
    this.selectedusers = [];
  }

  // Download
  public getDocumentId(id: any) {
    this.downloadUrl = this.urls.documentUrl + '?uuid=' + id.documentId;
    // this.tostar.success('Document Downloaded Successfully', 'Success', {
    //   timeOut: 2000
    // });
  }

  back() {
    this.router.navigate(['/main/internal/inbound/diarydakincharge/receiptDashboard']);
  }

  // Form Array For File Upload
  createItem(): FormGroup {
    return this.fb.group({
      evidenceFile: [this.files]
    });
  }

  // Add New Fileupload Row
  addItem(): void {
    this.items = this.receiptForm.get('items') as FormArray;
    // this.items.length);
    if (this.items.length <= 4) {
      this.items.push(this.createItem());
    }
  }

  // Delete New Fileipload Row
  deleteFieldValue(i: any) {
    const incentiveItemsData = this.receiptForm.get('items') as FormArray;
    incentiveItemsData.removeAt(i);
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  clearData(clearExisting: boolean = false) {
    this.receiptForm.reset();
    this.isSubmitted = false;
    if (clearExisting) {
      // this.receiptForm.controls.recipitType.setValue('', { onlySelf: true });
      this.receiptForm.controls.recipitCategory.setValue('', { onlySelf: true });
      this.receiptForm.controls.recipitLanguage.setValue('', { onlySelf: true });
      this.receiptForm.controls.recipitVia.setValue('', { onlySelf: true });
      this.receiptForm.controls.addressOrganization.setValue('', { onlySelf: true });
      // this.receiptForm.controls.senderDesignation.setValue('', { onlySelf: true });
      this.receiptForm.controls.country.setValue('', { onlySelf: true });
      this.receiptForm.controls.state.setValue('', { onlySelf: true });
      this.receiptForm.controls.city.setValue('', { onlySelf: true });
      this.receiptForm.controls.file.setValue('', { onlySelf: true });
    }
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

  // dentist
  dentistSearch() {
    this.dentistDataShow = true;
  }
  getHistoryOfReceipt() {
    this.service.getHistoryByReceiptId(this.receiptId).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      console.log(result);
      this.history = result;
      debugger
      result.forEach(element => {
        debugger
        if (element.dakStatus.statusName === 'Returned') {
          this.showcomments = true;
        } else {
          this.showcomments = false;
        }
      });

    }, error => {
      this.helper.errorMessage(error);
    });
  }
  // deleteDocument
deleteDocument(id){
  debugger
  this.service.deleteDocument(id).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
    console.log(res);
    this.tostar.success('File Deleted','Successfully');
    this.getReceiptDetails(this.receiptId);
  },error=>{
    console.log(error);
    this.tostar.error('File Deletion','Failed');
  })
}
SearchWithNameAndPhone(){
  if(this.searchOthersForm.value.name && this.searchOthersForm.value.phoneno){
    this.outboundsvc.getotherCategoryusers(this.searchOthersForm.value.name,this.searchOthersForm.value.phoneno,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
      console.log(res);
      this.otherList =res;
      this.responseOthersPageCount=this.otherList[0].pageCount;
        },error=>{
      console.log(error);
    })
  }else{
    this.tostar.warning('Please Enter All Fields');
  }
}
othersPaginationPrevi(){
  if (this.pageId >= 1) {
    --this.pageId;
    if(this.searchOthersForm.value.name && this.searchOthersForm.value.phoneno){
      this.outboundsvc.getotherCategoryusers(this.searchOthersForm.value.name,this.searchOthersForm.value.phoneno,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
        console.log(res);
        this.otherList =res;
        this.responseOthersPageCount=this.otherList[0].pageCount;
          },error=>{
        console.log(error);
      })
  }
}
}
othersPaginationNext(){
  if (this.pageId + 1 <= this.responsePageCount - 1) {
    ++this.pageId;
    if(this.searchOthersForm.value.name && this.searchOthersForm.value.phoneno){
      this.outboundsvc.getotherCategoryusers(this.searchOthersForm.value.name,this.searchOthersForm.value.phoneno,this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
        console.log(res);
        this.otherList =res;
        this.responseOthersPageCount=this.otherList[0].pageCount;
          },error=>{
        console.log(error);
      })
  }
  }
}
 // Principal Details
 getOthersDetails(data) {
  console.log(data.address.state);
  console.log(data.address.city);
  this.senderAddressId = data.address.addressId;
  this.senderName = data.senderName;
  console.log(this.statesList);
  this.statesList.forEach(element => {
    if (element.stateName === data.address.state) {
      data.address.state = element.stateId;
      debugger;
    }
  });

  this.getCities(data.address.state);
  this.usrmgtService.getAllCities(data.address.state).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
    this.citiesList = res;
  }, error => {
    console.log(error);
  });
  console.log(this.citiesList);
  this.citiesList.forEach(element => {
    if (element.cityName === data.address.city) {
      data.address.city = element.cityId;

    }
    debugger;
  });
  this.receiptForm.patchValue({
    // senderDesignation: data.designation !== null ? data.designation.designationId : '',
    addressReceiptEmailId: data.emailId,
    addressContactNumber: data.phoneNumber,
    line1: data.address.line1,
    line2: data.address.line2,
    country: 1,
    state: data.address.state,
    city: data.address.city,
    zipCode: data.address.zipCode
  })
  this.useridd = data.userId;
  this.addressid = data.address.addressId;
  this.openOthersBtn.nativeElement.click();
  this.searchOthersForm.reset();
  this.outboundsvc.getotherCategoryusers('','',this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
    console.log(res);
    this.otherList =res;
    this.responseOthersPageCount=this.otherList[0].pageCount;
      },error=>{
    console.log(error);
  })
}
resetSearchOthersForm(){
  this.searchOthersForm.reset();
  this.outboundsvc.getotherCategoryusers('','',this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
    console.log(res);
    this.otherList =res;
    this.responseOthersPageCount=this.otherList[0].pageCount;
      },error=>{
    console.log(error);
  })
}
}
