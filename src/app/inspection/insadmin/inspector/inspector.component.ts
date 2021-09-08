import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { HelperService } from 'src/app/common-service/helper.service';
import { InsadminService } from '../../services/insadmin/insadmin.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { InspectionAdminConstants } from '../../models/insadmin/const.model';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageid = 10;
  pages: any;
  pageCount: any;
  myProperty = '';
  selecetdValue = '';
  collegeId = '';
  allInspec: any = [];
  allStates: any = [];
  collegStaff: any = [];
  collbyStates: any = [];
  specilizationId = '';
  colSpeclization: any = [];
  showSearchdata = false;
  status = ['Active', 'InActive'];
  @ViewChild('myDiv') myDiv: ElementRef;
  @ViewChild('college') college: ElementRef;
  @ViewChild('speci') speci: ElementRef;
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;

  constructor(public insadmin: InsadminService, public insConst: InspectionAdminConstants,
    public toastr: ToastrService, public helper: HelperService) { }

  ngOnInit() {
    this.getAllInspectors();
    console.log(this.collegeId);
  }
  // All Inspectors List
  getAllInspectors() {
    this.insadmin.getallInsp(this.myProperty, this.rowId, this.pageid)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.allInspec = data;
          this.pageCount = Math.ceil(this.allInspec[0].totalCount / this.pageid);
          console.log(this.pageCount);
        } else {
          this.allInspec = [];
          this.pageCount = 0
            ;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // All Inspectors List By Status
  getAllByStatus() {
    this.insadmin.getInsByStatus(this.selecetdValue, this.rowId, this.pageid)
      .pipe(takeUntil(this.subscribe))
      .subscribe((data: any) => {
        console.log(data);
        if (data.length !== 0) {
          this.allInspec = data;
          this.pageCount = Math.ceil(this.allInspec[0].totalCount / this.pageid);
          console.log(this.allInspec[0].totalCount);
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }

  // Table Next buttons
  next() {
    console.log(this.selecetdValue);
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      console.log(this.rowId);
      if (this.myProperty !== '') {
        this.getAllInspectors();
      } else if (this.selecetdValue !== '') {
        this.getAllByStatus();
      } else {
        this.getAllInspectors();
      }
    }
  }
  // Table previous buttons
  previ() {
    console.log(this.selecetdValue);
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      if ((this.myProperty !== '')) {
        this.getAllInspectors();
      } else if (this.selecetdValue !== '') {
        this.getAllByStatus();
      } else {
        this.getAllInspectors();
      }
    }
  }

  // Get All States
  getStates() {
    this.collegStaff = [];
    this.insadmin.getstates()
      .pipe(takeUntil(this.subscribe))
      .subscribe((states: any) => {
        console.log(states);
        this.allStates = states;
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // get College Names
  getCollegeName(data: any) {
    this.collegStaff = [];
    this.collegeId = '';
    this.showSearchdata = false;
    this.college.nativeElement.selectedIndex = 0;
    this.specilizationId = '';
    this.insadmin.getcollbystate(data)
      .pipe(takeUntil(this.subscribe))
      .subscribe((college: any) => {
        console.log(college);
        this.collbyStates = college;
        this.helper.sortedData(this.collbyStates, 'collegeName');
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }
  // get All specialization List
  getSpecilization(id: any) {
    this.showSearchdata = false;
    this.specilizationId = '';
    this.collegeId = id;
    this.insadmin.getcollspecilization(id)
      .pipe(takeUntil(this.subscribe))
      .subscribe((speci: any) => {
        console.log(speci);
        this.colSpeclization = speci;
        this.helper.sortedData(this.colSpeclization, 'name');
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }


  // List Of College Staff
  getListOfCollegeStaff() {
    console.log(this.collegeId);
    // this.showSearchdata = false;
    if (this.collegeId !== '') {
      this.showSearchdata = true;
      this.insadmin.getColegeStaff(this.collegeId, this.specilizationId)
        .pipe(takeUntil(this.subscribe))
        .subscribe((speci: any) => {
          console.log(speci);
          this.collegStaff = speci;
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
    }
  }
  // Adding Inspector
  adding(id: any) {
    const obj = {
      collegeStaffMaster: {
        staffId: id
      }
    };
    this.insadmin.addingInspector(obj)
      .pipe(takeUntil(this.subscribe))
      .subscribe((addding: any) => {
        console.log(addding);
        this.getAllInspectors();
        this.closeBtn.nativeElement.click();
        this.toastr.success('Inspector Added Successfully', 'Success', {
          timeOut: 2000
        });
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }

  // delete Inspector
  deleteIns(id: any) {
    console.log(id);
    this.insadmin.deletedIsnpector(id)
      .pipe(takeUntil(this.subscribe))
      .subscribe((deleted: any) => {
        console.log(deleted);
        this.getAllInspectors();
        this.toastr.success('Inspector Inactive Successfully', 'Success', {
          timeOut: 2000
        });
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
  }

  // Clear validation Of Select
  cleraValdiadtions() {
    this.showSearchdata = false;
    this.collegeId = '';
    console.log(this.myDiv.nativeElement);
    this.myDiv.nativeElement.selectedIndex = 0;
    this.college.nativeElement.selectedIndex = 0;
    this.specilizationId = '';
  }
  // Destroy The Subscribe Data 
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}