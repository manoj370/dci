
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { appConstants } from 'src/app/common-service/const.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { InsadminService } from '../../services/insadmin/insadmin.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { InspectionAdminConstants } from '../../models/insadmin/const.model';

@Component({
  selector: 'app-newinsc',
  templateUrl: './newinsc.component.html',
  styleUrls: ['./newinsc.component.css']
})
export class NewinscComponent implements OnInit, OnDestroy {
  JSON: any;
  cityId = '';
  idModal: any;
  typeId: any;
  minDate: any;
  stateId = '';
  errorMsgs: any;
  subTypeId: any;
  purposeId: any;
  courseId: any;
  fromSeats: any;
  selecetdDat: any;
  modalName: string;
  cityList: any = [];
  statesList: any = [];
  collegeList: any = [];
  specilizationId: any;
  submitted = false;
  inspectionTypes: any = [];
  insCoursSubType: any = [];
  insPurposeData: any = [];
  sheduleInspForm: FormGroup;
  inspeCoursePurpoData: any = [];
  inspePurpoCourseData: any = [];
  today = moment().format('YYYY-MM-DD');
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  maxDate = moment(new Date()).add(15, 'days').format('YYYY-MM-DD');
  // tableHeaders = ['College Name', 'Email ID', 'City', 'State', 'Action'];
  constructor(public insadmin: InsadminService, public constValues: appConstants,public insAdmin:InspectionAdminConstants,
    public fb: FormBuilder, public toster: ToastrService, public helper: HelperService) {
    this.JSON = JSON;
  }

  ngOnInit(): void {
    this.getAllStates();
    this.errorMsgs = this.constValues.errorMsgs;
    this.sheduleInspForm = this.fb.group({
      type: ['', Validators.required],
      subtype: ['', Validators.required],
      purpose: ['', Validators.required],
      course: ['', Validators.required],
      specilization: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      fromSeat: [{ value: '', disabled: true }],
      toSeat: ['', Validators.required]
    });
  }
  get f() { return this.sheduleInspForm.controls; } // shedule Form Controls

  // Get All
  getAllStates() {
    this.collegeList = [];
    this.insadmin.shedulingStates().pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.statesList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // cityByState
  getcityBystate(id: any) {
    this.collegeList = [];
    this.insadmin.getCitybyState(id).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.cityList = data;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // getcollegeList
  getCollegeList() {
    this.insadmin.getcollegeList(this.stateId, this.cityId).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.collegeList = data;
      this.cityId = '';
      this.stateId = '';
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // Get Types
  getTypes(id: any, name: any) {
    this.idModal = id;
    this.modalName = name;
    this.insadmin.allInspetypes().pipe(takeUntil(this.subscribe)).subscribe((insTypes: any) => {
      console.log(insTypes);
      this.inspectionTypes = insTypes;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // getSub Types
  getSubTypes(data: any) {
    this.insCoursSubType = [];
    this.insPurposeData = [];
    this.inspeCoursePurpoData = [];
    this.inspePurpoCourseData = [];
    this.sheduleInspForm.controls.subtype.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.purpose.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.course.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.specilization.setValue('', { onlySelf: true });

    console.log(data);
    this.typeId = data;
    this.insadmin.inspeCourseSubtype(this.typeId).subscribe((cousSub: any) => {
      console.log(cousSub);
      this.insCoursSubType = cousSub;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  // getCourse
  getCourse(id: any) {
    console.log(id);
    this.subTypeId = id;
    if ((id === '1') || (id === '12')) {
      this.sheduleInspForm.controls.toSeat.setValue(0);
    }
    this.inspeCoursePurpoData = [];
    this.inspePurpoCourseData = [];
    this.sheduleInspForm.controls.purpose.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.course.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.specilization.setValue('', { onlySelf: true });
    // this.subTypeId = id;

    this.insadmin.inspeCoursetype(this.typeId, this.subTypeId)
      .pipe(takeUntil(this.subscribe))
      .subscribe((purData: any) => {
        console.log(purData);
        this.insPurposeData = purData;
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // getPurposeData
  inspeCoursePurpo(id: any) {
    console.log(id);
    this.inspePurpoCourseData = [];
    this.sheduleInspForm.controls.course.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.specilization.setValue('', { onlySelf: true });
    this.purposeId = id;
    this.insadmin.inspeCoursePurpo(this.typeId, this.subTypeId, this.purposeId)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        this.inspeCoursePurpoData = data;
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // inspePurpoCourse
  inspePurpoCourse(id: any) {
    console.log(id);
    this.courseId = id;
    this.inspePurpoCourseData = [];
    this.sheduleInspForm.controls.specilization.setValue('', { onlySelf: true });
    this.fromSeats = '';
    this.insadmin.inspePurpoCourse(this.typeId, this.subTypeId, this.purposeId, this.courseId)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        this.inspePurpoCourseData = data;
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // getPermittedSeats
  getspecId(id: any) {
    console.log(id);
    this.specilizationId = id;
    this.insadmin.getPermittedSeats(this.idModal, id)
      .pipe(takeUntil(this.subscribe))
      .subscribe((seats: any) => {
        console.log(seats);
        this.fromSeats = seats;
        this.sheduleInspForm.get('fromSeat').patchValue(seats);
      }, error => {
        console.log(error);
        this.fromSeats = 0;
        this.helper.errorMessage(error);
      });
  }
  // Min Date Based on Max Date
  selecetdDate(data: any) {
    console.log(data);
    this.selecetdDat = data;
    this.minDate = moment(data).add(3, 'days').format('YYYY-MM-DD');
  }
  // addInspection
  addInspection() {
    this.submitted = true;

    if (this.sheduleInspForm.valid) {
      const obj = {
        college: {
          collegeId: this.idModal
        },
        fromScheduleDate: moment(this.sheduleInspForm.value.fromDate).format('YYYY-MM-DD'),
        toScheduleDate: moment(this.sheduleInspForm.value.toDate).format('YYYY-MM-DD'),
        noSeatsAppliedForPermission: this.sheduleInspForm.value.toSeat,
        inspectionPerformaMaster: {
          collegeCourse: {
            courseId: this.sheduleInspForm.value.course
          },
          collegeSpecialisation: {
            specialisationId: this.sheduleInspForm.value.specilization
          },
          inspectionPurpose: {
            inspectionPurposeId: this.sheduleInspForm.value.purpose
          },
          inspectionSubType: {
            inspectionSubTypeId: this.sheduleInspForm.value.subtype
          },
          inspectionType: {
            inspectionTypeId: this.sheduleInspForm.value.type
          }
        }
      };
      console.log(obj);
      this.insadmin.saveInspection(obj).pipe(takeUntil(this.subscribe)).subscribe((saveed: any) => {
        console.log(saveed);
        this.cleraValidations();
        this.closeBtn.nativeElement.click();
        this.toster.success('Inspection Scheduled Successfully', 'Success', {
          timeOut: 2000
        });
        this.collegeList = [];
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }
  // Clear Form Validations
  cleraValidations() {
    this.idModal = '';
    this.idModal = '';
    this.selecetdDat = null;
    this.submitted = false;
    this.sheduleInspForm.reset();
    this.sheduleInspForm.controls.purpose.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.specilization.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.subtype.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.type.setValue('', { onlySelf: true });
    this.sheduleInspForm.controls.course.setValue('', { onlySelf: true });
  }

  // Destroy The Subscribe Data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
