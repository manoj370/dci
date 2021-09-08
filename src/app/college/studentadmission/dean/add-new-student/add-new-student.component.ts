import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { StudentAdmissionService } from '../../services/student-admission.service';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.css']
})
export class AddNewStudentComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  addStudentForm: FormGroup;
  show: boolean;
  categoriesList: any = [];
  countries: any = [];
  statesList: any = [];
  citiesList: any = [];
  admissionQuotaList: any = [];
  items: FormArray;
  files: any = [];
  file: any;
  courseList: any = [];
  specializations: any = [];
  courseid: any;
  specializationid: any;
  admissionid: any;
  studentdetails: any;
  clarificationForm: FormGroup;
  admissionId: any;
  currentAddressId: any;
  permanentAddressId: any;
  accademicDetailsId: any;
  showUpdateButton: boolean = false;
  item: FormArray;
  fileClarification: any = [];
  tenthPlusStatus: any;
  showdetails: boolean
  showneetdetails: boolean;
  mdsdetails: boolean;
  diplomadetails: boolean;
  universitydropdown: boolean;
  currentyear: number;
  nextyearr: number;
  date: string;
  showErrorForPcb: boolean;
  showErrorobcForPcb: boolean;
  showNeetPercentile: boolean;
  showNeetobcPercentile: boolean;
  showErrorForEnglish: boolean;
  counsellingauthoritiesList: any;
  collegeslist: any;
  universitiesList: any;
  sdcsList: any;
  neetStudentDetails: any;
  neetForm: FormGroup;
  savebtn: boolean;
  workflowid: any;
  subject: any;
  matter: any;
  today = moment().format('YYYY-MM-DD');
  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public studentService: StudentAdmissionService, public usrmgtService: UsrmgtService, public tostar: ToastrService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.admissionid = params.id);
    this.activatedRoute.params.subscribe((params: Params) => this.workflowid = params.workflowid);
    this.activatedRoute.params.subscribe((params: Params) => this.subject = params.subject);
    this.activatedRoute.params.subscribe((params: Params) => this.matter = params.matter);

    debugger
    if (this.admissionid != null) {
      this.showUpdateButton = true
      this.getAdmissionById();
    } if (this.workflowid != null && this.admissionid != null) {
      this.showUpdateButton = true;
      this.getAdmissionById();
    }
    // Get Calls
    this.getCategoryList();
    this.getAllCountries();
    this.getAdmissionQuotaList();
    this.getAllCourses();
    this.findAllCouncellingAuthorities();
    this.findAllColleges();
    this.findAllUniversities();
    this.findAllSDCs();

    // Validations
    this.addStudentForm = this.fb.group({
      // Personal Info
      course: ['', Validators.compose([Validators.required])],
      Specialisation: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      middleName: ['', Validators.compose([Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      fathersName: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required, Validators.pattern(/^([\w.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)])],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])],
      alternatemobileNumber: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      handicapStatus: ['', Validators.compose([Validators.required])],
      nationality: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z ]*$/)])],
      aadhar: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(12), Validators.pattern(/^[^-\s][0-9% ]*$/)])],
      category: ['', Validators.compose([Validators.required])],
      // Address Info
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      line1: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9%a-zA-Z.@,/#$%&^() ]*$/)])],
      line2: ['', Validators.compose([Validators.pattern(/^[^-\s][0-9%a-zA-Z.@,/#$%&^() ]*$/)])],
      pincode: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9 ]*$/)])],
      // same as permenant checkbox
      countryy: [''],
      statee: [''],
      cityy: [''],
      cline1: [''],
      cline2: [''],
      pincodee: [''],
      // Personal Info
      councellingauthorithy: ['', Validators.compose([Validators.required])],
      studentallotmentno: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(12)])],
      allotmentdate: ['', Validators.compose([Validators.required])],
      admissionQuota: ['', Validators.compose([Validators.required])],
      admissiondate: ['', Validators.compose([Validators.required])],
      // neet details
      neetrollNo: [''],
      academicYear: [''],
      neetScore: [''],
      neetPercentile: [''],
      // bds status
      tenthstatus: [''],
      english: [''],
      pcbaverage: [''],
      // mds satus
      bdsstatus: [''],
      // mds pursuing
      college: [''],
      university: [''],
      passingYear: [''],
      // mds passing
      bdspercent: [''],
      sdc: [''],
      regno: [''],

      items: this.fb.array([this.createItem(),])

    });
    this.clarificationForm = this.fb.group({
      clarification: ['', Validators.compose([Validators.required])],
      item: this.fb.array([this.createItems(),])
    });
    this.neetForm = this.fb.group({
      neetrollNo: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(/^[^-\s][0-9% ]*$/)])],
      academicYear: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9- ]*$/)])],
    });
    this.addStudentForm.patchValue({
      'academicYear': this.date
    })
  }
  // back
  back() {
    this.router.navigate(['main/internal/college/dean/studentsList'])
  }
  // For multiple files
  // Form Array For File Upload
  createItems(): FormGroup {
    return this.fb.group({
      evidenceFile: [this.file]
    });
  }
  // Add New Fileipload Row
  addItems(): void {
    this.item = this.clarificationForm.get('item') as FormArray;
    console.log(this.item.length);
    if (this.item.length <= 4) {
      this.item.push(this.createItems());
    }
  }

  // Delete New Fileipload Row
  deleteFieldValues(i: any) {
    console.log(this.items);
    console.log(i);
    const incentiveItemsData = this.clarificationForm.get('item') as FormArray;
    incentiveItemsData.removeAt(i);
  }

  // For Validations
  get f() { return this.addStudentForm.controls; }
  // Reset Form
  resetForm() {
    this.addStudentForm.reset();
    this.neetForm.reset();;
    this.addStudentForm.controls.gender.setValue('', { onlySelf: true });
    this.addStudentForm.controls.handicapStatus.setValue('', { onlySelf: true });
    this.addStudentForm.controls.country.setValue('', { onlySelf: true });
    this.addStudentForm.controls.state.setValue('', { onlySelf: true });
    this.addStudentForm.controls.city.setValue('', { onlySelf: true });
    this.addStudentForm.controls.countryy.setValue('', { onlySelf: true });
    this.addStudentForm.controls.statee.setValue('', { onlySelf: true });
    this.addStudentForm.controls.cityy.setValue('', { onlySelf: true });
    this.addStudentForm.controls.category.setValue('', { onlySelf: true });
    this.addStudentForm.controls.admissionQuota.setValue('', { onlySelf: true });
    this.addStudentForm.controls.course.setValue('', { onlySelf: true });
    this.addStudentForm.controls.Specialisation.setValue('', { onlySelf: true });
    this.addStudentForm.controls.councellingauthorithy.setValue('', { onlySelf: true });
    this.addStudentForm.controls.english.setValue('', { onlySelf: true });
    this.addStudentForm.controls.tenthstatus.setValue('', { onlySelf: true });
    this.addStudentForm.controls.bdsstatus.setValue('', { onlySelf: true });
    this.addStudentForm.controls.college.setValue('', { onlySelf: true });
    this.addStudentForm.controls.university.setValue('', { onlySelf: true });
    this.addStudentForm.controls.sdc.setValue('', { onlySelf: true });
    // this.addStudentForm.controls.science.setValue('', { onlySelf: true });
  }
  // keypressevent
  keyPress(event: any) {
    const pattern = /^[^-\s][0-9 ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // checkbox event
  checkbox(event) {
    console.log(event.target.checked);
    debugger
    if (event.target.checked === true) {
      this.addStudentForm.controls.countryy.setValidators(Validators.required);
      this.addStudentForm.controls['countryy'].updateValueAndValidity();
      this.addStudentForm.controls.statee.setValidators(Validators.required);
      this.addStudentForm.controls['statee'].updateValueAndValidity();
      this.addStudentForm.controls.cityy.setValidators(Validators.required);
      this.addStudentForm.controls['cityy'].updateValueAndValidity();
      this.addStudentForm.controls.cline1.setValidators(Validators.required);
      this.addStudentForm.controls['cline1'].updateValueAndValidity();
      this.addStudentForm.controls.pincodee.setValidators(Validators.required);
      this.addStudentForm.controls['pincodee'].updateValueAndValidity();
      this.show = true;
      console.log(true);
      this.addStudentForm.patchValue({
        'countryy': this.addStudentForm.value.country,
        'statee': this.addStudentForm.value.state,
        'cityy': this.addStudentForm.value.city,
        'cline1': this.addStudentForm.value.line1,
        'cline2': this.addStudentForm.value.line2,
        'pincodee': this.addStudentForm.value.pincode
      })
    } else {
      this.show = false;
    }
  }
  // getCategoryList
  getCategoryList() {
    this.studentService.getStudentCategoryList().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.categoriesList = res;
    }, error => {
      console.log(error);
    });
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
  // getAdmissionQuota
  getAdmissionQuotaList() {
    this.studentService.getAllStudentAdmissionQuota().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.admissionQuotaList = res;
    }, error => {
      console.log(error);
    });
  }
  // getAllCourses
  getAllCourses() {
    this.studentService.getAllCourses().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res, "course");
      this.courseList = res;
    }, error => {
      console.log(error)
    });
  }
  // getAllCouncelling Authorities
  findAllCouncellingAuthorities() {
    this.studentService.findAllCouncellingAuthorities().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.counsellingauthoritiesList = res;
    }, error => {
      console.log(error);
    });
  }
  // getAllColleges
  findAllColleges() {
    this.studentService.findAllColleges().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.collegeslist = res;
    }, error => {
      console.log(error);
    });
  }
  // getAllUniversities
  findAllUniversities() {
    this.studentService.findAllUniversities().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.universitiesList = res;
    }, error => {
      console.log(error);
    });
  }
  // getAllSDCs
  findAllSDCs() {
    this.studentService.findAllSdcs().pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.sdcsList = res;
    }, error => {
      console.log(error);
    });
  }
  // getNeetInformation
  getNeetDetails() {
    debugger
    if (this.neetForm.value.neetrollNo && this.neetForm.value.academicYear) {
      this.studentService.getAllNeetDetails(this.neetForm.value.neetrollNo, this.neetForm.value.academicYear).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        console.log(res.acedamicYear);
        this.neetStudentDetails = res;

        this.addStudentForm.patchValue({
          'firstName': this.neetStudentDetails[0].candidateName,
          'fathersName': this.neetStudentDetails[0].fatherName,
          'dob': this.neetStudentDetails[0].dateOfBirth,
          'gender': this.neetStudentDetails[0].gender,
          'nationality': this.neetStudentDetails[0].nationality,
          'neetScore': this.neetStudentDetails[0].neetScore,
          'neetPercentile': this.neetStudentDetails[0].neetPercentile,
        })
      }, error => {
        console.log(error);
      });
    } else {
      this.tostar.warning('Please Enter Both Fields To Search', 'Warning')
    }

  }
  // getting course id
  courseId(value) {
    this.courseid = value;
    console.log(this.courseid);
    if (this.courseid === '1') {
      this.showdetails = true;
      this.showneetdetails = true;
      this.mdsdetails = false;
      this.diplomadetails = false;
      this.addStudentForm.controls.neetScore.setValidators(Validators.compose([Validators.required, Validators.required, Validators.pattern(/^[^-\s][0-9% ]*$/)]));
      this.addStudentForm.controls["neetScore"].updateValueAndValidity();
      this.addStudentForm.controls.neetPercentile.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9%. ]*$/)]));
      this.addStudentForm.controls["neetPercentile"].updateValueAndValidity();
      this.addStudentForm.controls.english.setValidators(Validators.required);
      this.addStudentForm.controls["english"].updateValueAndValidity();
      this.addStudentForm.controls.pcbaverage.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9% ]*$/)]));
      this.addStudentForm.controls["pcbaverage"].updateValueAndValidity();
      this.addStudentForm.controls.tenthstatus.setValidators(Validators.required);
      this.addStudentForm.controls["tenthstatus"].updateValueAndValidity();
    } else if (this.courseid === '2') {
      this.showdetails = false;
      this.showneetdetails = true;
      this.mdsdetails = true;
      this.diplomadetails = false;
      this.addStudentForm.controls.bdsstatus.setValidators(Validators.required);
      this.addStudentForm.controls["bdsstatus"].updateValueAndValidity();
      this.addStudentForm.controls.college.setValidators(Validators.required);
      this.addStudentForm.controls["college"].updateValueAndValidity();
      this.addStudentForm.controls.university.setValidators(Validators.required);
      this.addStudentForm.controls["university"].updateValueAndValidity();
      this.addStudentForm.controls.passingYear.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9- ]*$/)]));
      this.addStudentForm.controls["passingYear"].updateValueAndValidity();
    } else if (this.courseid === '5') {
      this.showneetdetails = true;
      this.showdetails = false;
      this.mdsdetails = true;
      this.diplomadetails = false;
      this.addStudentForm.controls.bdsstatus.setValidators(Validators.required);
      this.addStudentForm.controls["bdsstatus"].updateValueAndValidity();
      this.addStudentForm.controls.college.setValidators(Validators.required);
      this.addStudentForm.controls["college"].updateValueAndValidity();
      this.addStudentForm.controls.university.setValidators(Validators.required);
      this.addStudentForm.controls["university"].updateValueAndValidity();
      this.addStudentForm.controls.passingYear.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9- ]*$/)]));
      this.addStudentForm.controls["passingYear"].updateValueAndValidity();
    }
    else if (this.courseid === '6') {
      this.showdetails = false;
      this.showneetdetails = false;
      this.mdsdetails = false;
      this.diplomadetails = false;
      this.universitydropdown = false;
    }
    this.getSpecializations();
    console.log(this.addStudentForm.value.Specialisation);
  }
  // selecting against
  selectingAgainst(value) {
    debugger
    if (value === '2') {
      this.universitydropdown = false;
      this.mdsdetails = true;
    } else {
      this.universitydropdown = true;
      this.mdsdetails = true;
      this.addStudentForm.controls.bdspercent.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9% ]*$/)]));
      this.addStudentForm.controls["bdspercent"].updateValueAndValidity();
      this.addStudentForm.controls.sdc.setValidators(Validators.required);
      this.addStudentForm.controls["sdc"].updateValueAndValidity();
      this.addStudentForm.controls.regno.setValidators(Validators.compose([Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern(/^[^-\s][0-9% ]*$/)]));
      this.addStudentForm.controls["regno"].updateValueAndValidity();
    }
  }
  // getting specializationid
  specializationId(value) {

    this.specializationid = value;
    console.log(this.specializationid);
  }
  // getSpecializationByCourseId
  getSpecializations() {
    this.studentService.getSpecializations(this.courseid).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res, "specilozation");
      this.specializations = res;
    }, error => {
      console.log(error);
    });
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
  //clarificationFile
  // File Select
  onSelectFiles(event) {
    debugger
    console.log(event, "onSelectFiles")
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files;
      console.log(filesAmount);
      this.fileClarification.push(filesAmount[0]);
      console.log(this.fileClarification, "dfds");
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
    this.items = this.addStudentForm.get('items') as FormArray;
    console.log(this.items.length);
    if (this.items.length <= 4) {
      this.items.push(this.createItem());
    }
  }

  // Delete New Fileipload Row
  deleteFieldValue(i: any) {
    console.log(this.items);
    console.log(i);
    const incentiveItemsData = this.addStudentForm.get('items') as FormArray;
    incentiveItemsData.removeAt(i);

  }

  // submit studentForm
  // submit() {
  //   console.log(this.addStudentForm.value.Specialisation);
  //   let obj = {
  //     "aadharNumber": this.addStudentForm.value.aadhar ? this.addStudentForm.value.aadhar : "null",
  //     "academicYear": this.neetForm.value.academicYear,
  //     "admissionDate": this.addStudentForm.value.admissiondate,
  //     "allotmentNumber": this.addStudentForm.value.studentallotmentno ? this.addStudentForm.value.studentallotmentno : "null",
  //     "alternativePhoneNumber": this.addStudentForm.value.alternatemobileNumber ? this.addStudentForm.value.alternatemobileNumber : "null",
  //     "bdsCollege": {
  //       "collegeId": this.addStudentForm.value.college ? this.addStudentForm.value.college : 0
  //     },
  //     "bdsPercantage": this.addStudentForm.value.bdspercent ? this.addStudentForm.value.bdspercent : 0,
  //     "bdsRegistrationNumber": this.addStudentForm.value.regno ? this.addStudentForm.value.regno : 0,
  //     "bdsStatus": this.addStudentForm.value.bdsstatus,
  //     "bdsYearOfPass": this.addStudentForm.value.passingYear,
  //     "boardName": "",
  //     "courseId": this.addStudentForm.value.course,
  //     "currentAddress": {
  //       "city": this.addStudentForm.value.cityy,
  //       "country": this.addStudentForm.value.countryy,
  //       "landmark": "",
  //       "line1": this.addStudentForm.value.cline1,
  //       "line2": this.addStudentForm.value.cline2 ? this.addStudentForm.value.cline2 : "null",
  //       "state": this.addStudentForm.value.statee,
  //       "zipCode": this.addStudentForm.value.pincodee
  //     },
  //     "permanentAddress": {
  //       "city": this.addStudentForm.value.city,
  //       "country": this.addStudentForm.value.country,
  //       "landmark": "null",
  //       "line1": this.addStudentForm.value.line1,
  //       "line2": this.addStudentForm.value.line2 ? this.addStudentForm.value.line2 : "null",
  //       "state": this.addStudentForm.value.state,
  //       "zipCode": this.addStudentForm.value.pincode
  //     },
  //     "dateOfBirth": this.addStudentForm.value.dob,
  //     "emailId": this.addStudentForm.value.email,
  //     "entityMasterId": sessionStorage.getItem('entityId-usec'),
  //     "fatherName": this.addStudentForm.value.fathersName,
  //     "firstName": this.addStudentForm.value.firstName,
  //     "gender": this.addStudentForm.value.gender,
  //     "handicapStatus": this.addStudentForm.value.handicapStatus,
  //     "lastName": this.addStudentForm.value.lastName,
  //     "marksBiologyPercantage": "null",
  //     "marksChemistryPercantage": "null",
  //     "marksPhysicsPercantage": "null",
  //     "middleName": this.addStudentForm.value.middleName ? this.addStudentForm.value.middleName : "null",
  //     "nationality": this.addStudentForm.value.nationality,
  //     "neetPercantage": this.addStudentForm.value.neetPercentile,
  //     "neetScore": this.addStudentForm.value.neetScore,
  //     "phoneNumber": this.addStudentForm.value.mobileNumber,
  //     "plusTwoEnglish": this.addStudentForm.value.english,
  //     "plusTwoPcbAverage": this.addStudentForm.value.pcbaverage,
  //     "plusTwoScience": this.addStudentForm.value.science,
  //     "sdcMaster": {
  //       "sdcMasterId": this.addStudentForm.value.sdc ? this.addStudentForm.value.sdc : 0
  //     },
  //     "specalizationId": this.addStudentForm.value.Specialisation ? this.addStudentForm.value.Specialisation : 0,
  //     "studentAdmissionQuota": {
  //       "admissionQuotaId": this.addStudentForm.value.admissionQuota ? this.addStudentForm.value.admissionQuota : 0
  //     },
  //     "studentAdmissionStatusCode": {
  //       "statusId": 1
  //     },
  //     "studentAllotmentDate": this.addStudentForm.value.allotmentdate,
  //     "studentCategory": {
  //       "categoryId": this.addStudentForm.value.category ? this.addStudentForm.value.category : 0
  //     },
  //     "studentNeetResultBDSDetails": {
  //       "neetRollNO": this.neetForm.value.neetrollNo ? this.neetForm.value.neetrollNo : "null"
  //     },

  //     "studentStateDMEMstr": {
  //       "stateId": this.addStudentForm.value.councellingauthorithy ? this.addStudentForm.value.councellingauthorithy : 0
  //     },
  //     "tenPlusTwoStatus": this.addStudentForm.value.tenthstatus
  //   }

  //   console.log(obj);
  //   this.studentService.createStudentAdmission(this.files, obj).pipe(takeUntil(this.subscribe)).subscribe(res => {
  //     this.tostar.success('Student Admission Form Created Successfully', 'Success', {
  //       timeOut: 2000
  //     });
  //     this.router.navigate(['/main/internal/college/dean/studentsList'])
  //     this.addStudentForm.reset();
  //   }, error => {
  //     this.tostar.error('Student Admission Form Not Created', 'Error', {
  //       timeOut: 2000
  //     });
  //     this
  //     console.log(error);
  //   });
  // }

  // New code 
  submit() {
    if (this.addStudentForm.valid && this.neetForm.valid) {
      console.log("apicall");
      // creating object and apicalling
      let obj = {
        "aadharNumber": this.addStudentForm.value.aadhar ? this.addStudentForm.value.aadhar : "null",
        "academicYear": this.neetForm.value.academicYear,
        "admissionDate": this.addStudentForm.value.admissiondate,
        "allotmentNumber": this.addStudentForm.value.studentallotmentno ? this.addStudentForm.value.studentallotmentno : "null",
        "alternativePhoneNumber": this.addStudentForm.value.alternatemobileNumber ? this.addStudentForm.value.alternatemobileNumber : "null",
        "bdsCollege": {
          "collegeId": this.addStudentForm.value.college ? this.addStudentForm.value.college : 0
        },
        "bdsPercantage": this.addStudentForm.value.bdspercent ? this.addStudentForm.value.bdspercent : 0,
        "bdsRegistrationNumber": this.addStudentForm.value.regno ? this.addStudentForm.value.regno : 0,
        "bdsStatus": this.addStudentForm.value.bdsstatus,
        "bdsYearOfPass": this.addStudentForm.value.passingYear,
        "boardName": "",
        "courseId": this.addStudentForm.value.course,
        "currentAddress": {
          "city": this.addStudentForm.value.cityy,
          "country": this.addStudentForm.value.countryy,
          "landmark": "",
          "line1": this.addStudentForm.value.cline1,
          "line2": this.addStudentForm.value.cline2 ? this.addStudentForm.value.cline2 : "null",
          "state": this.addStudentForm.value.statee,
          "zipCode": this.addStudentForm.value.pincodee
        },
        "permanentAddress": {
          "city": this.addStudentForm.value.city,
          "country": this.addStudentForm.value.country,
          "landmark": "null",
          "line1": this.addStudentForm.value.line1,
          "line2": this.addStudentForm.value.line2 ? this.addStudentForm.value.line2 : "null",
          "state": this.addStudentForm.value.state,
          "zipCode": this.addStudentForm.value.pincode
        },
        "dateOfBirth": this.addStudentForm.value.dob,
        "emailId": this.addStudentForm.value.email,
        "entityMasterId": sessionStorage.getItem('entityId-usec'),
        "fatherName": this.addStudentForm.value.fathersName,
        "firstName": this.addStudentForm.value.firstName,
        "gender": this.addStudentForm.value.gender,
        "handicapStatus": this.addStudentForm.value.handicapStatus,
        "lastName": this.addStudentForm.value.lastName,
        "marksBiologyPercantage": "null",
        "marksChemistryPercantage": "null",
        "marksPhysicsPercantage": "null",
        "middleName": this.addStudentForm.value.middleName ? this.addStudentForm.value.middleName : "null",
        "nationality": this.addStudentForm.value.nationality,
        "neetPercantage": this.addStudentForm.value.neetPercentile,
        "neetScore": this.addStudentForm.value.neetScore,
        "phoneNumber": this.addStudentForm.value.mobileNumber,
        "plusTwoEnglish": this.addStudentForm.value.english,
        "plusTwoPcbAverage": this.addStudentForm.value.pcbaverage,
        "plusTwoScience": this.addStudentForm.value.science,
        "sdcMaster": {
          "sdcMasterId": this.addStudentForm.value.sdc ? this.addStudentForm.value.sdc : 0
        },
        "specalizationId": this.addStudentForm.value.Specialisation ? this.addStudentForm.value.Specialisation : 0,
        "studentAdmissionQuota": {
          "admissionQuotaId": this.addStudentForm.value.admissionQuota ? this.addStudentForm.value.admissionQuota : 0
        },
        "studentAdmissionStatusCode": {
          "statusId": 1
        },
        "studentAllotmentDate": this.addStudentForm.value.allotmentdate,
        "studentCategory": {
          "categoryId": this.addStudentForm.value.category ? this.addStudentForm.value.category : 0
        },
        "studentNeetResultBDSDetails": {
          "neetRollNO": this.neetForm.value.neetrollNo ? this.neetForm.value.neetrollNo : "null"
        },

        "studentStateDMEMstr": {
          "stateId": this.addStudentForm.value.councellingauthorithy ? this.addStudentForm.value.councellingauthorithy : 0
        },
        "tenPlusTwoStatus": this.addStudentForm.value.tenthstatus
      }

      console.log(obj);
      this.studentService.createStudentAdmission(this.files, obj).pipe(takeUntil(this.subscribe)).subscribe(res => {
        this.tostar.success('Student Admission Form Created Successfully', 'Success', {
          timeOut: 2000
        });
        this.router.navigate(['/main/internal/college/dean/studentsList'])
        this.addStudentForm.reset();
      }, error => {
        this.tostar.error('Student Admission Form Not Created', 'Error', {
          timeOut: 2000
        });
        this
        console.log(error);
      });
      // For All text boxes
      this.addStudentForm.reset();
      // For all dropdowns
      this.addStudentForm.controls.gender.setValue('', { onlySelf: true });
      this.addStudentForm.controls.handicapStatus.setValue('', { onlySelf: true });
      this.addStudentForm.controls.country.setValue('', { onlySelf: true });
      this.addStudentForm.controls.state.setValue('', { onlySelf: true });
      this.addStudentForm.controls.city.setValue('', { onlySelf: true });
      this.addStudentForm.controls.countryy.setValue('', { onlySelf: true });
      this.addStudentForm.controls.statee.setValue('', { onlySelf: true });
      this.addStudentForm.controls.cityy.setValue('', { onlySelf: true });
      this.addStudentForm.controls.category.setValue('', { onlySelf: true });
      this.addStudentForm.controls.admissionQuota.setValue('', { onlySelf: true });
      this.addStudentForm.controls.course.setValue('', { onlySelf: true });
      this.addStudentForm.controls.Specialisation.setValue('', { onlySelf: true });
      this.addStudentForm.controls.councellingauthorithy.setValue('', { onlySelf: true });
      this.addStudentForm.controls.english.setValue('', { onlySelf: true });
      this.addStudentForm.controls.tenthstatus.setValue('', { onlySelf: true });
      this.addStudentForm.controls.bdsstatus.setValue('', { onlySelf: true });
      this.addStudentForm.controls.college.setValue('', { onlySelf: true });
      this.addStudentForm.controls.university.setValue('', { onlySelf: true });
      this.addStudentForm.controls.sdc.setValue('', { onlySelf: true });
      // For neet details
      this.neetForm.reset();
    } else {
      this.tostar.warning('Please Enter All Fields', 'Warning');
    }
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

  // Get Admission By Id
  getAdmissionById() {
    this.studentService.getStudentAdmissionByAdmissionID(this.admissionid).subscribe((res: any) => {
      console.log(res, "res");
      this.studentdetails = res;
      this.admissionId = res.admissionId
      this.currentAddressId = res.currentAddress.addressId
      this.permanentAddressId = res.permanentAddress.addressId;
      // this.courseid = res.collegeCourseOfferedSepcialisation.collegeSpecialisation.collegeCourse.courseId,
      this.courseid = res.collegeCourseOfferedSepcialisation.course.courseId,
      console.log(this.courseid);
        this.coursevalues(this.courseid);
      debugger
      if (this.courseid === 2 || this.courseid === 5) {
        this.neetForm.patchValue({
          academicYear: res.academicYear,
          neetrollNo: res.studentNeetResultBDSDetails.neetRollNO,

        })
        debugger
        if (res.sdcMaster !== null) {
          this.selectingAgainst(res.bdsStatus);
          this.addStudentForm.patchValue({
            neetScore: res.neetScore,
            neetPercentile: res.neetPercantage,
            bdsstatus: res.bdsStatus,
            college: res.bdsCollege.collegeId,
            university: res.college.collegeId,
            passingYear: res.bdsYearOfPass,
            bdspercent: res.bdsPercantage,
            sdc: res.sdcMaster.sdcMasterId,
            regno: res.bdsRegistrationNumber,
          });
        } else {
          this.addStudentForm.patchValue({
            neetScore: res.neetScore,
            neetPercentile: res.neetPercantage,
            bdsstatus: res.bdsStatus,
            college: res.bdsCollege.collegeId,
            university: res.college.collegeId,
            passingYear: res.bdsYearOfPass,
          });
        }

      } else if (this.courseid === 1) {
        this.neetForm.patchValue({
          academicYear: res.academicYear,
          neetrollNo: res.studentNeetResultBDSDetails.neetRollNO,

        })
        this.addStudentForm.patchValue({
          neetScore: res.neetScore,
          neetPercentile: res.neetPercantage,
          english: res.plusTwoEnglish,
          pcbaverage: res.plusTwoPcbAverage,
          tenthstatus: res.tenPlusTwoStatus,
        });


      }
      this.getSpecializations();
      this.getStates(res.permanentAddress.country);
      this.getCities(res.permanentAddress.state);
      //  this.selectingAgainst(res.bdsStatus);
      console.log(res.aadharNumber);
      debugger

      console.log()
      this.addStudentForm.patchValue({
        course: this.courseid,
        Specialisation: res.collegeCourseOfferedSepcialisation.collegeSpecialisation.specialisationId,
        firstName: res.firstName,
        lastName: res.lastName,
        middleName: res.middleName,
        fathersName: res.fatherName,
        gender: res.gender,
        dob: res.dateOfBirth,
        email: res.emailId,
        mobileNumber: res.phoneNumber,
        alternatemobileNumber: res.alternativePhoneNumber !== "null" ? res.alternativePhoneNumber : '',
        handicapStatus: res.handicapStatus,
        nationality: res.nationality,
        aadhar: res.aadharNumber !== "null" ? res.aadharNumber : '',
        category: res.studentCategory.categoryId,
        line1: res.permanentAddress.line1,
        line2: res.permanentAddress.line2,
        country: res.permanentAddress.country,
        state: res.permanentAddress.state,
        city: res.permanentAddress.city,
        pincode: res.permanentAddress.zipCode,
        cline1: res.currentAddress.line1,
        cline2: res.currentAddress.line2,
        countryy: res.currentAddress.country,
        statee: res.currentAddress.state,
        cityy: res.currentAddress.city,
        pincodee: res.currentAddress.zipCode,
        councellingauthorithy: res.studentStateDMEMstr.stateId,
        studentallotmentno: res.allotmentNumber !== "null" ? res.allotmentNumber : '',
        allotmentdate: res.studentAllotmentDate,
        admissionQuota: res.studentAdmissionQuota.admissionQuotaId,
        admissiondate: res.admissionDate,
      })

    }, error => {
      console.log(error);
    });
  }
  coursevalues(value) {
    this.courseid = value;
    console.log(this.courseid);
    debugger
    if (this.courseid === 1) {
      this.showdetails = true;
      this.showneetdetails = true;
      this.mdsdetails = false;
      this.diplomadetails = false;
      this.addStudentForm.controls.neetScore.setValidators(Validators.compose([Validators.required, Validators.required, Validators.pattern(/^[^-\s][0-9% ]*$/)]));
      this.addStudentForm.controls["neetScore"].updateValueAndValidity();
      this.addStudentForm.controls.neetPercentile.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9%. ]*$/)]));
      this.addStudentForm.controls["neetPercentile"].updateValueAndValidity();
      this.addStudentForm.controls.english.setValidators(Validators.required);
      this.addStudentForm.controls["english"].updateValueAndValidity();
      this.addStudentForm.controls.pcbaverage.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9% ]*$/)]));
      this.addStudentForm.controls["pcbaverage"].updateValueAndValidity();
      this.addStudentForm.controls.tenthstatus.setValidators(Validators.required);
      this.addStudentForm.controls["tenthstatus"].updateValueAndValidity();

    } else if (this.courseid === 2) {
      this.showdetails = false;
      this.showneetdetails = true;
      this.mdsdetails = true;
      this.diplomadetails = false;
      this.addStudentForm.controls.bdsstatus.setValidators(Validators.required);
      this.addStudentForm.controls["bdsstatus"].updateValueAndValidity();
      this.addStudentForm.controls.college.setValidators(Validators.required);
      this.addStudentForm.controls["college"].updateValueAndValidity();
      this.addStudentForm.controls.university.setValidators(Validators.required);
      this.addStudentForm.controls["university"].updateValueAndValidity();
      this.addStudentForm.controls.passingYear.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9- ]*$/)]));
      this.addStudentForm.controls["passingYear"].updateValueAndValidity();
    } else if (this.courseid === 5) {
      this.showneetdetails = true;
      this.showdetails = false;
      this.mdsdetails = true;
      this.diplomadetails = false;
      this.addStudentForm.controls.bdsstatus.setValidators(Validators.required);
      this.addStudentForm.controls["bdsstatus"].updateValueAndValidity();
      this.addStudentForm.controls.college.setValidators(Validators.required);
      this.addStudentForm.controls["college"].updateValueAndValidity();
      this.addStudentForm.controls.university.setValidators(Validators.required);
      this.addStudentForm.controls["university"].updateValueAndValidity();
      this.addStudentForm.controls.passingYear.setValidators(Validators.compose([Validators.required, Validators.pattern(/^[^-\s][0-9- ]*$/)]));
      this.addStudentForm.controls["passingYear"].updateValueAndValidity();
    }
    else if (this.courseid === 6) {
      this.showdetails = false;
      this.showneetdetails = false;
      this.mdsdetails = false;
      this.diplomadetails = false;
    }
  }

  /**
   * updateStudentAdmissionForm
   */
  public updateStudentAdmissionForm() {
    if(this.addStudentForm.valid && this.neetForm.valid){
      console.log('apicall');
      let obj =
    {
      "admissionId": this.admissionId,
      "middleName": this.addStudentForm.value.middleName ? this.addStudentForm.value.middleName : "null",
      "lastName": this.addStudentForm.value.lastName,
      "firstName": this.addStudentForm.value.firstName,
      "fatherName": this.addStudentForm.value.fathersName,
      "gender": this.addStudentForm.value.gender,
      "dateOfBirth": this.addStudentForm.value.dob,
      "phoneNumber": this.addStudentForm.value.mobileNumber,
      "emailId": this.addStudentForm.value.email,
      "alternativePhoneNumber": this.addStudentForm.value.alternatemobileNumber ? this.addStudentForm.value.alternatemobileNumber : "null",
      "handicapStatus": this.addStudentForm.value.handicapStatus,
      "nationality": this.addStudentForm.value.nationality,
      "aadharNumber": this.addStudentForm.value.aadhar ? this.addStudentForm.value.aadhar : "null",
      "plusTwoEnglish": this.addStudentForm.value.english,
      "plusTwoScience": this.addStudentForm.value.science,
      "plusTwoPcbAverage": this.addStudentForm.value.pcbaverage,
      "permanentAddress": {
        "addressId": this.permanentAddressId,
        "line1": this.addStudentForm.value.line1,
        "line2": this.addStudentForm.value.line2 ? this.addStudentForm.value.line2 : "null",
        "city": this.addStudentForm.value.city,
        "state": this.addStudentForm.value.state,
        "country": this.addStudentForm.value.country,
        "landmark": " ",
        "zipCode": this.addStudentForm.value.pincode
      },
      "currentAddress": {
        "addressId": this.currentAddressId,
        "line1": this.addStudentForm.value.cline1,
        "line2": this.addStudentForm.value.cline2 ? this.addStudentForm.value.cline2 : "null",
        "city": this.addStudentForm.value.cityy,
        "state": this.addStudentForm.value.statee,
        "country": this.addStudentForm.value.countryy,
        "landmark": "",
        "zipCode": this.addStudentForm.value.pincodee
      },
      "neetPercantage": this.addStudentForm.value.neetPercentile,
      "neetScore": this.addStudentForm.value.neetScore,
      "admissionDate": this.addStudentForm.value.admissiondate,
      "academicYear": this.neetForm.value.academicYear,
      "studentAdmissionQuota": {
        "admissionQuotaId": this.addStudentForm.value.admissionQuota ? this.addStudentForm.value.admissionQuota : 0
      },
      "allotmentNumber": this.addStudentForm.value.studentallotmentno ? this.addStudentForm.value.studentallotmentno : "null",
      "bdsRegistrationNumber": this.addStudentForm.value.regno ? this.addStudentForm.value.regno : 0,
      "studentAllotmentDate": this.addStudentForm.value.allotmentdate,
      "studentAdmissionStatusCode": {
        "statusId": 1
      },
      "bdsCollege": {
        "collegeId": this.addStudentForm.value.college ? this.addStudentForm.value.college : 0
      },
      "studentStateDMEMstr": {
        "stateId": this.addStudentForm.value.councellingauthorithy ? this.addStudentForm.value.councellingauthorithy : 0
      },
      "tenPlusTwoStatus": this.addStudentForm.value.tenthstatus,
      "boardName": "",
      "marksPhysicsPercantage": "",
      "marksChemistryPercantage": "",
      "marksBiologyPercantage": "",
      "studentCategory": {
        "categoryId": this.addStudentForm.value.category ? this.addStudentForm.value.category : 0
      },
      "bdsStatus": this.addStudentForm.value.bdsstatus,
      "bdsYearOfPass": this.addStudentForm.value.passingYear,
      "bdsPercantage": this.addStudentForm.value.bdspercent ? this.addStudentForm.value.bdspercent : 0,
      "courseId": this.addStudentForm.value.course,
      "specalizationId": this.addStudentForm.value.Specialisation ? this.addStudentForm.value.Specialisation : 0,
      "sdcMaster": {
        "sdcMasterId": this.addStudentForm.value.sdc ? this.addStudentForm.value.sdc : 0
      }
    }
    this.studentService.updateStudentAddmissionForm(this.files, obj).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
      this.tostar.success('Student Admission Form Updated Successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['/main/internal/college/dean/studentsList'])
    }, error => {
      console.log(error);
    });
    }else{
      this.tostar.warning('Please Enter All Fields','Warning');
    }
    
  }
  // For Validations
  get s() { return this.clarificationForm.controls; }
  // createResponse
  createResponse() {
    this.studentService.createResponse(this.workflowid, sessionStorage.getItem("userId-usec"), this.admissionId, this.clarificationForm.value.clarification,
      this.fileClarification).pipe(takeUntil(this.subscribe)).subscribe((result: any) => {
        console.log(result);
        this.tostar.success('Clarification Response sent Successfully', 'Success', {
          timeOut: 2000
        });
      }, error => {
        console.log(error);
        this.tostar.error('Clarification Response Not Sent', 'Error', {
          timeOut: 2000
        });
      })
  }
  category(value) {
    console.log(value);
  }
  // Category+course +2 pcb (average validation)
  pcbValidation(data) {
    console.log(data, "datadata")
    debugger
    if (this.addStudentForm.value.category === "2" && this.addStudentForm.value.course === "1") {
      if (data < 50) {
        this.showErrorForPcb = true
      }
      else {
        this.showErrorForPcb = false
      }
    } else if ((this.addStudentForm.value.category === "5" || this.addStudentForm.value.category === '3' || this.addStudentForm.value.category === '4')
      && this.addStudentForm.value.course === "1") {
      if (data < 40) {
        this.showErrorobcForPcb = true
      }
      else {
        this.showErrorobcForPcb = false
      }
    }
  }
  // Category +course+ NEET Validation
  neetPercentileValidation(data) {
    if (this.addStudentForm.value.category === "2" && (this.addStudentForm.value.course === "1" || this.addStudentForm.value.course === "2" || this.addStudentForm.value.course === "4")) {
      if (data < 50) {
        this.showNeetPercentile = true
      }
      else {
        this.showNeetPercentile = false
      }
    } else if ((this.addStudentForm.value.category === "5" || this.addStudentForm.value.category === '3' || this.addStudentForm.value.category === '4')
      && (this.addStudentForm.value.course === "1" || this.addStudentForm.value.course === "2" || this.addStudentForm.value.course === "4")) {
      if (data < 40) {
        this.showNeetobcPercentile = true
      }
      else {
        this.showNeetobcPercentile = false
      }
    }
  }
  // course + subject validato=ion
  // subjectValidationForEnglish
  subjectValidation(data) {
    console.log(data);
    if (this.addStudentForm.value.english === "2" && this.addStudentForm.value.course === "1") {
      if (data === '2') {
        this.showErrorForEnglish = true
      }
      else {
        this.showErrorForEnglish = false
      }
    }
  }

  reset() {
    this.clarificationForm.reset();
  }
}
