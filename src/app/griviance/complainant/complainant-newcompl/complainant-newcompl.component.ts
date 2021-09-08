import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { constantServices } from '../../models/const.model';
import { appConstants } from 'src/app/common-service/const.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { ComplaintService } from '../../services/complaint/complaint.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-complainant-newcompl',
  templateUrl: './complainant-newcompl.component.html',
  styleUrls: ['./complainant-newcompl.component.css']
})
export class ComplainantNewcomplComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageid = 10;
  statusid: any;
  pageCount: any;
  stateId = '';
  searchValue = '';
  files: any = [];
  selId: any = [];
  errorMsgs: any;
  dentistName = '';
  dentistValue: any;
  submitted = false;
  seletedAgainast: any;
  sectionList: any = [];
  listofState: any = [];
  complaintTypeList: any;
  listofEntity: any = [];
  dentistList: any = [];
  complaintForm: FormGroup;
  requiredErrors: any;
  dentistDataShow = false;
  complaintAgainstList: any = [];
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('openModal') openBtn: ElementRef<HTMLElement>;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  constructor(public fb: FormBuilder, public toastr: ToastrService, public router: Router, public helper: HelperService,
    public complSer: ComplaintService, public constValues: appConstants, public complModel: constantServices) { }

  ngOnInit(): void {
    this.errorMsgs = this.constValues.errorMsgs;
    this.requiredErrors = this.complModel.newComplaint;
    console.log(this.listofState);
    this.getAll();
    this.complaintForm = this.fb.group({
      complaintAgaint: ['', Validators.required],
      complaintType: ['', Validators.required],
      complaintSub: ['', Validators.required],
      complaintDes: ['', Validators.required],
      complaintState: [''],
      complaintDetail: [''],
      dentistValue: [''],
      sectionValue: [''],
      secValById: [''],
      evidence: ['']
    });
  }
  get f() { return this.complaintForm.controls; } // Controls For Form

  // Get Call For Initial Load
  getAll() {
    // getComplaintTypes
    this.complSer.getComplaintTypes().pipe(takeUntil(this.subscribe)).subscribe((complaintType: any) => {
      console.log(complaintType);
      this.complaintTypeList = complaintType;
      this.helper.sortedData(this.complaintTypeList, 'complaintTypeName');

      // this.complaintTypeList.sort((a, b) => {
      //   const x = a.complaintTypeName.toLowerCase();
      //   const y = b.complaintTypeName.toLowerCase();
      //   if (x < y) { return -1; }
      //   if (x > y) { return 1; }
      //   return 0;
      // });
    }, error => {
      console.log(error);
    });

    // getComplaintAgainst
    this.complSer.getComplaintAgainst().pipe(takeUntil(this.subscribe)).subscribe((complaintAgainst: any) => {
      console.log(complaintAgainst);
      this.complaintAgainstList = complaintAgainst;
      this.helper.sortedData(this.complaintAgainstList, 'name');

      // this.complaintAgainstList.sort((a, b) => {
      //   const x = a.name.toLowerCase();
      //   const y = b.name.toLowerCase();
      //   if (x < y) { return -1; }
      //   if (x > y) { return 1; }
      //   return 0;
      // });
    }, error => {
      console.log(error);
    });
  }

  // For Getting The Master Id Based on typename
  selectingAgainst(value: any) {
    console.log(value);
    this.dentistName = '';
    this.listofState = [];
    this.listofEntity = [];
    this.dentistList = [];
    this.sectionList = [];
    this.complaintForm.controls.complaintState.setValue('', { onlySelf: true });
    this.seletedAgainast = value;
    if (value === '3') {
      this.statesList();
    } else if (value === '2') {
      this.statesList();
      this.openBtn.nativeElement.click(); // open Modal Popup
    } else if (value === '1') {
      this.complSer.allSections().pipe(takeUntil(this.subscribe)).subscribe((sectionList: any) => {
        console.log(sectionList);
        this.sectionList = sectionList;
        this.helper.sortedData(this.sectionList, 'sectionName');

        // this.sectionList.sort((a, b) => {
        //   const x = a.sectionName.toLowerCase();
        //   const y = b.sectionName.toLowerCase();
        //   if (x < y) { return -1; }
        //   if (x > y) { return 1; }
        //   return 0;
        // });
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }

  // Statically Shown To Dentist Name
  selectedDentist(data: any, first: any, last: any) {
    const firstName = (first !== null) ? first : '';
    const lastName = (last !== null) ? last : '';
    console.log(firstName + '' + lastName);
    this.dentistName = firstName + '' + lastName;
    this.complaintForm.controls.dentistValue.setValue(data);
    this.closeBtn.nativeElement.click();
  }
  // Dentist List Based On State And Search value
  dentistState() {
    console.log(this.stateId, this.searchValue);
    this.complSer.searchDentistList(this.stateId, this.searchValue, this.rowId, this.pageid)
      .pipe(takeUntil(this.subscribe))
      .subscribe((dentistData: any) => {
        console.log(dentistData);
        if (dentistData.length > 0) {
          this.dentistDataShow = true;
          this.dentistList = dentistData;
          this.pageCount = Math.ceil(dentistData[0].count / this.pageid);
          console.log(dentistData[0].count);
        } else {
          this.pageCount = 0;
          this.dentistDataShow = true;
          this.dentistList = [];
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // Next BUtton
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      console.log(this.rowId);
      this.dentistState();  // Dentist List On Next Button
    }
  }
  // Previous Value
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      this.dentistState(); // Dentist List On Previous Button
    }
  }
  // StatesList
  statesList() {
    this.complSer.coleeageState().pipe(takeUntil(this.subscribe)).subscribe((stateList: any) => {
      console.log(stateList);
      this.listofState = stateList;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // Selecting State for College after Selecting Against
  chnageState(stateValue) {
    this.complaintForm.controls.complaintDetail.setValue('', { onlySelf: true });
    console.log(stateValue);
    this.listofEntity = [];
    this.complSer.colleageByState(stateValue).pipe(takeUntil(this.subscribe)).subscribe((stateList: any) => {
      console.log(stateList);
      this.listofEntity = stateList;
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // selection
  selecSection(id: any) {
    this.complaintForm.controls.secValById.setValue('', { onlySelf: true });
    this.selId = [];
    this.complSer.secById(id).pipe(takeUntil(this.subscribe)).subscribe((selId: any) => {
      console.log(selId);
      this.selId = selId;
      this.helper.sortedData(this.selId, 'firstName');
      // this.selId.sort((a, b) => {
      //   const x = a.firstName.toLowerCase();
      //   const y = b.firstName.toLowerCase();
      //   if (x < y) { return -1; }
      //   if (x > y) { return 1; }
      //   return 0;
      // });
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }

  // Create Complainant
  createComplaint() {
    this.submitted = true;
    console.log(this.complaintForm.value);
    if (this.seletedAgainast === '1') {
      if (this.complaintForm.value.secValById !== '') {
        const obj = {
          complainantDescription: this.complaintForm.value.complaintDes,
          complainantSubject: this.complaintForm.value.complaintSub,
          complaintAgainst:
            { complaintAgainstTypeId: this.complaintForm.value.complaintAgaint },

          complaintAgainstSectionId: {
            sectionId: this.complaintForm.value.sectionValue
          },
          complaintAgainstUserId: {
            userId: this.complaintForm.value.secValById
          },
          complaintMode:
            { complaintModeID: 1 },
          complaintRaisedBy:
            { userId: sessionStorage.getItem('userId-usec') },
          complaintStatus:
            { complaintStatusID: 1 },
          complaintType: { complaintTypeID: this.complaintForm.value.complaintType }
        };
        console.log(obj);
        console.log(this.files);
        this.createCompl(this.files, obj);
      } else {
        this.toastr.error('Please Select User Name', 'Error', {
          timeOut: 3000
        });
        console.log('test');
      }

    } else if (this.seletedAgainast === '2') {
      if (this.complaintForm.value.dentistValue !== '') {
        const obj = {
          complainantDescription: this.complaintForm.value.complaintDes,
          complainantSubject: this.complaintForm.value.complaintSub,
          complaintAgainst:
          {
            complaintAgainstTypeId: 2
          },
          complaintAgainstDentistId: {
            dentistId: this.complaintForm.value.dentistValue
          },
          complaintMode:
            { complaintModeID: 1 },
          complaintRaisedBy:
            { userId: sessionStorage.getItem('userId-usec') },
          complaintStatus:
            { complaintStatusID: 1 },
          complaintType: { complaintTypeID: this.complaintForm.value.complaintType }
        };
        console.log(obj);
        this.createCompl(this.files, obj);
      } else {
        this.toastr.error('Dentist Name Required', 'Error', {
          timeOut: 3000
        });
      }
    } else if (this.seletedAgainast === '3') {
      if (this.complaintForm.value.complaintDetail !== '') {
        const obj = {
          complainantDescription: this.complaintForm.value.complaintDes,
          complainantSubject: this.complaintForm.value.complaintSub,
          complaintAgainst: {
            complaintAgainstTypeId: 3
          },
          complaintAgainstEntityMasterId: {
            entityMasterId: this.complaintForm.value.complaintDetail
          },
          complaintMode:
            { complaintModeID: 1 },
          complaintRaisedBy:
            { userId: sessionStorage.getItem('userId-usec') },
          complaintStatus:
            { complaintStatusID: 1 },
          complaintType: { complaintTypeID: this.complaintForm.value.complaintType }
        };
        console.log(obj);
        this.createCompl(this.files, obj);
      } else {
        this.toastr.error('College Name Required', 'Error', {
          timeOut: 3000
        });
      }
    }
  }

  // Create New Complainant API Call
  createCompl(filesData: any, data: any) {
    this.complSer.raiseCompl(filesData, data).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res);
      this.toastr.success('Complaint Raised Successfully', 'Success', {
        timeOut: 2000
      });
      this.resetControls();
      this.router.navigate(['main/internal/greviance/complaint/dashboard']);
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
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

  // Reset The Controls
  resetControls() {
    this.dentistDataShow = false;
    this.files = [];
    this.submitted = false;
    this.complaintForm.reset();
    this.listofEntity = [];
    this.sectionList = [];
    this.selId = [];
    this.dentistList = [];
    this.listofState = [];
    this.dentistName = '';
    this.complaintForm.controls.complaintAgaint.setValue('');
    this.complaintForm.controls.sectionValue.setValue('', { onlySelf: true });
    this.complaintForm.controls.complaintType.setValue('', { onlySelf: true });
    this.complaintForm.controls.complaintState.setValue('', { onlySelf: true });
    this.complaintForm.controls.complaintDetail.setValue('', { onlySelf: true });
    this.complaintForm.controls.dentistValue.setValue('');
    this.complaintForm.controls.secValById.setValue('', { onlySelf: true });
  }

  // Destroy The Subscribe Data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}


