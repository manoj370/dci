import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { StudentAdmissionService } from '../../services/student-admission.service';
import { from, Subject } from 'rxjs';
import { urlServices } from '../../services/studentAdmissionUrls';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
@Component({
  selector: 'app-view-student-details',
  templateUrl: './view-student-details.component.html',
  styleUrls: ['./view-student-details.component.css']
})
export class ViewStudentDetailsComponent implements OnInit {
  @ViewChild('agendaDismiss') agendaBtn: ElementRef<HTMLElement>;
  @ViewChild('confirmOpen') confirmBtn: ElementRef<HTMLElement>;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('confirmDismiss') confirmClose: ElementRef<HTMLElement>;
  subscribe: Subject<any> = new Subject<any>();
  admissionid: any;
  makesAgenda: FormGroup;
  seekCollegeForm: FormGroup;
  studentdetails: any = [];
  docsarray: any = [];
  status: any;
  downloadUrl: string;
  file: any;
  seekCollegeFormFromParty: FormGroup;
  clarificationfile: any;
  clarificationitems: FormGroup
  entitytypes: any = [];
  entitymaster: any = [];
  entitytypeid: any;
  obj: any;
  items: FormArray;
  files: any = [];
  sitems: FormArray;
  fileClarificationParty: any = [];
  changeForm: FormGroup;
  updateForm: FormGroup
  updatefiles: FormArray;
  filesupdate: any = [];
  date: string | number | Date;
  year: number;
  patternNumber: string;
  despatchrefno: any;
  id: string;
  counselauthoritydetails: any;
  filenumber: string;
  showaction: boolean = true;
  coursee: any;
  statuslist: any;
  agendaForm:FormGroup;
  agendaDetails: any;
  agendaDataFormvalue: any;
  submitted = false;
  aobForm: FormGroup;
  radioData = [
    { label: 'Create AOB Agenda', status: true, info: 'For the meeting date this agenda item will fall under AOB, Did u take permission from chair create AOB Agenda?' },
    { label: 'Create Main Agenda for Next Meeting', info: '', status: false }
  ];
  constructor(public tostar: ToastrService, public router: Router, public fb: FormBuilder, public urls: urlServices, public activatedRoute: ActivatedRoute, public studentService: StudentAdmissionService,) { }

  ngOnInit(): void {

    var date = new Date();
    console.log(date);
    this.date =
      date.getFullYear().toString() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate().toString()).slice(-2);
    console.log(this.date);
    this.id = "Clg/Stu/" + this.admissionid;
    // this.id="{{'Clg/Stu/ ' + this.admissionid}}"
    //Getting Id from dashboard  through url
    this.activatedRoute.params.subscribe((params: Params) => this.admissionid = params.id);
    this.getAdmissionById();
    this.getStudentStateDMEMstrById();
    // Validations
    // agenda Creation Form
    this.agendaForm = this.fb.group({
      agendaDate: [{ value: '', disabled: true }],
      agendaItemNum: [{ value: '', disabled: true }],
      agendaItemSubj: ['', Validators.required],
      agendaMatter: ['', Validators.required]
    });
    // aob form
    this.aobForm = this.fb.group({
      value: ['']
    });
    this.aobForm.get('value').setValue(true);
    this.seekCollegeForm = this.fb.group({
      subject: ['', Validators.required],
      matter: ['', Validators.required],
      items: this.fb.array([this.createItem(),

      ])
    });
    this.seekCollegeFormFromParty = this.fb.group({
      selectparty: ['', Validators.required],
      specific: ['', Validators.required],
      subject: ['', Validators.required],
      matter: ['', Validators.required],
      sitems: this.fb.array([this.createItems()])
    });
    this.changeForm = this.fb.group({
      studentstatus: ['', Validators.required],
      matter: ['']
    });
    this.updateForm = this.fb.group({
      updatefiles: this.fb.array([this.createUpdateFile()]),
      matter: ['']
    });

  }

  get f() { return this.makesAgenda.controls; }
  get s() { return this.seekCollegeForm.controls; }
  get sf() { return this.seekCollegeFormFromParty.controls; }
  get cf() { return this.changeForm.controls; }
  // back button method
  back() {
    this.router.navigate(['/main/internal/college/admissionMonitorCellExecutive/collegelist']);
  }
  reset() {
    this.changeForm.reset();
    this.changeForm.controls.studentstatus.setValue('', { onlySelf: true });
  }
  // reset
  resetForm() {
    this.makesAgenda.reset();
    this.seekCollegeForm.reset();
    this.seekCollegeFormFromParty.reset();
    this.seekCollegeFormFromParty.controls.selectparty.setValue('', { onlySelf: true });
    this.seekCollegeFormFromParty.controls.specific.setValue('', { onlySelf: true });
    this.updateForm.reset();
    this.updatefiles.reset();
    this.agendaForm.reset();

  }
  // Get Admission By Id
  getAdmissionById() {
    this.studentService.getStudentAdmissionByAdmissionID(this.admissionid).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.studentdetails = res;
      this.docsarray = this.studentdetails.studentDocuments;
      this.status = this.studentdetails.studentStatus.statusName;
      this.coursee = res.collegeCourseOfferedSepcialisation.course.courseName;
      console.log(this.coursee);
      debugger
      if (this.status === 'Verified' || this.status === 'Completed') {
        this.showaction = false;
      } else {
        this.showaction = true;
      }
    }, error => {
      console.log(error);
    });
  }
  // Download file method
  public getDocumentId(data: any) {
    console.log(data.documentId, "id")
    this.downloadUrl = this.urls.documentUrl + '?uuid=' + data.documentId

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
    this.items = this.seekCollegeForm.get('items') as FormArray;
    console.log(this.items.length);
    if (this.items.length <= 4) {
      this.items.push(this.createItem());
    }
  }

  // Delete New Fileipload Row
  deleteFieldValue(i: any) {
    console.log(this.items);
    console.log(i);
    const incentiveItemsData = this.seekCollegeForm.get('items') as FormArray;
    incentiveItemsData.removeAt(i);

  }
  // seek clarification from a party
  // File Select
  onSelectFiles(event) {
    debugger
    console.log(event, "onSelectFiles")
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files;
      console.log(filesAmount);
      this.fileClarificationParty.push(filesAmount[0]);
      console.log(this.fileClarificationParty, "dfds");
    }
  }
  // Form Array For File Upload
  createItems(): FormGroup {
    return this.fb.group({
      evidenceFile: [this.clarificationfile]
    });
  }

  // Add New Fileipload Row
  addItems(): void {
    this.sitems = this.seekCollegeFormFromParty.get('sitems') as FormArray;
    console.log(this.sitems.length);
    if (this.sitems.length <= 4) {
      this.sitems.push(this.createItems());
    }
  }

  // Delete New Fileipload Row
  deleteFieldValues(i: any) {
    console.log(this.sitems);
    console.log(i);
    const incentiveItemsData = this.seekCollegeFormFromParty.get('sitems') as FormArray;
    incentiveItemsData.removeAt(i);

  }


  // // seek clarification api from college
  createClarification() {
    this.studentService.createClarification(sessionStorage.getItem("userId-usec"), this.admissionid, this.seekCollegeForm.value.subject, this.seekCollegeForm.value.matter,
      this.files).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        console.log(result);
        this.tostar.success('Successfully Clarification sent', 'Success', {
          timeOut: 2000
        });
      }, error => {
        console.log(error);
        this.tostar.error(' Clarification Not sent', 'Error', {
          timeOut: 2000
        });
      })
  }
  // createAgenda
  createAgenda() {
    let agendaobj = {
      "admissionId": this.admissionid,
      "agendaDate": this.makesAgenda.value.date,
      "itemNo": this.makesAgenda.value.itemNumber,
      "itemRefNo": this.makesAgenda.value.itemRefrenceNumber,
      "itemSubject": this.makesAgenda.value.itemSubject,
      "agendaDescription": this.makesAgenda.value.wMatter,
      "agendaItemMaster": 1
    }
    console.log(agendaobj);
    this.studentService.createAgenda(agendaobj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('Successfully created Agenda', 'Success', {
        timeOut: 2000
      });
    }, error => {
      console.log(error);
      this.tostar.error('Agenda Not Created', 'Error', {
        timeOut: 2000
      });
    });
  }
  getList() {
    this.getAllEntityTypes();
  }
  // getAllEntityTypes
  getAllEntityTypes() {
    this.studentService.getAllEntityTypes().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.entitytypes = res;
      // this.entitytypes.map(element => {
      //   console.log(element.entityTypeId);
      //   this.entitytypeid =element.entityTypeId;
      // })
      // this.getAllListOfEntityMastersByTypeId();
    }, error => {
      console.log(error);
    });
  }
  entity(value) {
    console.log(value);
    this.entitytypeid = value;
    this.getAllListOfEntityMastersByTypeId();
  }
  // getAllListOfEntityMastersByTypeId
  getAllListOfEntityMastersByTypeId() {
    this.studentService.getAllListOfEntityMastersByTypeId(this.entitytypeid).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.entitymaster = res;
    }, error => {
      console.log(error);
    });
  }
  // send clarificationto aparty
  sendClarificationtoParty() {
    this.studentService.seekClarificationFromaParty(sessionStorage.getItem("userId-usec"), this.admissionid, this.seekCollegeFormFromParty.value.subject, this.seekCollegeFormFromParty.value.matter,
      this.seekCollegeFormFromParty.value.specific, this.fileClarificationParty).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        console.log(result);
        this.tostar.success('Successfully Clarification sent', 'Success', {
          timeOut: 2000
        });
      }, error => {
        console.log(error);
        this.tostar.error(' Clarification Not sent', 'Success', {
          timeOut: 2000
        });
      })
  }
  sendToCA() {
    this.studentService.sendToCounellingAuthorithy(this.admissionid, this.obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.generatingDispatchRefno();
      // this.createDispatch();
      this.tostar.success('Send to Counselling Authority Successfully', 'Success', {
        timeOut: 2000
      });
      this.getAdmissionById();
    }, error => {
      this.tostar.error(' Not Sent To Counselling Authority', 'Error', {
        timeOut: 2000
      });

      console.log(error);
    });
  }
  // getStudentStateDMEMstrById
  getStudentStateDMEMstrById() {
    this.studentService.getStudentStateDMEMstrById(this.admissionid).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {

      this.counselauthoritydetails = res;
      console.log(this.counselauthoritydetails);
    }, error => {
      console.log(error);
    })
  }
  // generating reference number
  generatingDispatchRefno() {
    var d = new Date();
    var year = d.getFullYear();
    console.log(year);
    this.year = year;
    this.patternNumber = '/' + 'ARPL' + '/' + 'SS' + '/' + this.year;
    this.studentService.generateDispatchRefNo(this.patternNumber).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.despatchrefno = res.dispatchRefNumber;
      console.log(this.despatchrefno);
      this.createDispatch();
    }, error => {
      console.log(error);
    })
  }
  // // create despatch
  createDispatch() {
    console.log(this.despatchrefno);
    // let obj =
    // {
    //   "address": {
    //     "city": "1",
    //     "line1": "gachibowli",
    //     "state": "1",
    //     "zipCode": "500032",
    //     "country": "1"
    //   },
    //   "dakStatus": {
    //     "status": 0,
    //     "statusCode": "FWD",
    //     "statusId": 1,
    //     "statusName": "",
    //     "version": 0
    //   },
    //   "dakMatterOrComments": "This admission submitted for counsel review",
    //   "dispatchRefNumber": this.despatchrefno,
    //   "dispatchSubject": "Submit to counselling Reference Student Admission",
    //   "dispatchUserId": sessionStorage.getItem('userId-usec'),
    //   "dispatchType": {
    //     "dispatchTypeId": "3"
    //   },
    //   "dispatchItemTypes": {

    //     "dispatchItemTypeId": "4"
    //   },
    //   "dispatchDate":this.date,
    //   "entityMaster": {
    //     "entityMasterId": "18"
    //   },
    //   "organizationOrOthers": false,
    //   "othersName": "",
    //   "recipeintEmail": "dmetelangana.gov.in",
    //   "recipeintMobile": "9876543210",
    //   "recipeintName": "DME",
    //   "section": {
    //     "sectionId": "1"
    //   },
    //   "senderDesignation": {
    //     "designationId": "12"
    //   },
    //   "senderFileHeading": "Student Admission",
    //   "senderFileNumber":123,
    //   "senderName": "sandeep",
    //   "senderSection": {
    //     "sectionId": "1"
    //   },
    //   "subSection": {
    //     "subSectionId": "1"
    //   }
    // }
    this.filenumber = this.admissionid + '/' + 'StudentAdmission' + '/' + this.studentdetails.lastName + '/' + this.studentdetails.academicYear
    console.log(this.filenumber);
    let obj =
    {
      "address": {
        "city": this.counselauthoritydetails.address.city,
        "line1": this.counselauthoritydetails.address.line1,
        "state": this.counselauthoritydetails.address.state,
        "zipCode": this.counselauthoritydetails.address.zipCode,
        "country": this.counselauthoritydetails.address.country
      },
      "dakStatus": {
        "status": 0,
        "statusCode": "FWD",
        "statusId": 1,
        "statusName": "",
        "version": 0
      },
      "dakMatterOrComments": "This admission submitted for counsel review",
      "dispatchRefNumber": this.despatchrefno,
      "dispatchSubject": "Submit to counselling Reference Student Admission",
      "dispatchUserId": sessionStorage.getItem('userId-usec'),
      "dispatchType": {
        "dispatchTypeId": "3"
      },
      "dispatchItemTypes": {

        "dispatchItemTypeId": "4"
      },
      "dispatchDate": this.date,
      "entityMaster": {
        "entityMasterId": sessionStorage.getItem('entityId-usec')
      },
      "organizationOrOthers": false,
      "othersName": "",
      "recipeintEmail": this.counselauthoritydetails.emailId,
      "recipeintMobile": this.counselauthoritydetails.phoneNumber,
      "recipeintName": this.counselauthoritydetails.dmeName,
      "section": {
        "sectionId": "1"
      },
      "senderDesignation": {
        "designationId": "12"
      },
      "senderFileHeading": "Student Admission",
      "senderFileNumber": this.admissionid,
      "senderName": sessionStorage.getItem('firstname-usec'),
      "senderSection": {
        "sectionId": "1"
      },
      "subSection": {
        "subSectionId": "1"
      }
    }
    console.log(obj);
    console.log(this.files);
    this.studentService.createdispatch(this.files, obj).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.tostar.success('Despatch Created Successfully', 'Success', {
        timeOut: 2000
      });
    }, error => {
      console.log(error);
    });
  }
  // File Select
  onSelectUpdateFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files;
      console.log(filesAmount);
      this.filesupdate.push(filesAmount[0]);
      console.log(this.filesupdate);
    }
  }
  // For multiple files
  // Form Array For File Upload
  createUpdateFile(): FormGroup {
    return this.fb.group({
      evidenceFile: [this.file]
    });
  }

  // Add New Fileipload Row
  addUpdateFile(): void {
    this.updatefiles = this.updateForm.get('updatefiles') as FormArray;
    // console.log(this.items.length);
    if (this.updatefiles.length <= 4) {
      this.updatefiles.push(this.createUpdateFile());
    }
  }

  // Delete New Fileipload Row
  deleteUpdateFile(i: any) {
    console.log(this.updatefiles);
    console.log(i);
    const incentiveItemsData = this.updateForm.get('updatefiles') as FormArray;
    incentiveItemsData.removeAt(i);

  }
  // status list
  getAllStudentAdmissionChangeStatusList() {
    this.studentService.getAllStudentAdmissionChangeStatusList().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      this.statuslist =res;
      console.log(this.statuslist);
    }, error => {
      console.log(error);
    })
  }
  // updateStatus
  updateStatus() {
    console.log(this.changeForm.value.studentstatus);
    this.studentService.updateStatus(this.admissionid, this.changeForm.value.studentstatus, this.changeForm.value.matter, this.obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('Status Updated Successfully', 'Success', {
        timeOut: 2000
      });
      this.getAdmissionById();
      this.changeForm.reset();
    }, error => {
      console.log(error);
      this.tostar.error('Status Not Updated', 'Error', {
        timeOut: 2000
      });
    })
  }
  // fileupdatestatus
  fileUpdateWithStatus() {
    this.studentService.fileUpdateWithStatus(this.admissionid, this.status, this.updateForm.value.matter, this.filesupdate).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.tostar.success('File Updated Successfully', 'Success', {
        timeOut: 2000
      });
      this.getAdmissionById();
    }, error => {
      console.log(error);
      this.tostar.error('File Not Updated', 'Error', {
        timeOut: 2000
      });
    })
  }
  AgendaItemNumber() {     // Get SDC Section List
    this.studentService.getAgendaItemNumber().pipe(takeUntil(this.subscribe)).subscribe((agenadItem: any) => {
      console.log(agenadItem);
      this.agendaDetails = agenadItem;
      agenadItem.agendaItemNo = agenadItem.agendaItemNo + '(' + agenadItem.agendaItemSeqRefNumber + ')';
      this.agendaForm.get('agendaItemNum').patchValue(agenadItem.agendaItemNo);
      this.agendaForm.get('agendaDate').patchValue(agenadItem.agendaCreatedOn);

    }, error => {
      console.log(error);
      this.tostar.error('Failed', 'Error', {
        timeOut: 2000
      });
    });
  }

  nemodal() {
    if (this.agendaDetails.aobStatus !== null) {
      this.agendaDataFormvalue = this.agendaForm.value;
      this.agendaBtn.nativeElement.click();
      this.confirmBtn.nativeElement.click();
      this.submitted = true;
    } else {
      this.agendaDataFormvalue = this.agendaForm.value;
      this.aobForm.value.value = null;
        this.agendaCreate();
    }

  }
  // Agenda Ceated
  agendaCreate() {
    this.submitted = true;
    console.log(this.agendaForm.value);
    console.log(this.aobForm.value.value);
    console.log(this.agendaDataFormvalue);


    if (this.agendaDataFormvalue.agendaItemSubj !== null) {
      const obj = {
        complaint: {
          cgrComplaintId:26
        },
        agendaItemSubject: this.agendaDataFormvalue.agendaItemSubj,
        agendaItemMatter: this.agendaDataFormvalue.agendaMatter,
        ecPermission: this.aobForm.value.value
      };
      console.log(obj);
      this.studentService.agendaCreate(obj).pipe(takeUntil(this.subscribe)).subscribe((agendaData: any) => {
        console.log(agendaData);
        // this.getCall();
        // this.clearValidations();
        this.closeBtn.nativeElement.click();
        this.confirmClose.nativeElement.click();

        this.tostar.success('Agenda Created successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['main/internal/greviance/secExc/dashboard']);
      }, error => {
        console.log(error);
        this.tostar.error('Failed', 'Error', {
          timeOut: 2000
        });
      });
    }
  }

  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
