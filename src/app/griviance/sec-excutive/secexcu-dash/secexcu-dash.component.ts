
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { constantServices } from '../../models/const.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HelperService } from 'src/app/common-service/helper.service';
import { SecexcuService } from './../../services/sectionExcutive/secexcu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-secexcu-dash',
  templateUrl: './secexcu-dash.component.html',
  styleUrls: ['./secexcu-dash.component.css']
})
export class SecexcuDashComponent implements OnInit, OnDestroy {
  rowId = 0;
  pageid = 10;
  pageCount: any;
  pages: any;
  myProperty = '';
  complaintId: any;
  submitted = false;
  dashboardCount: any;
  allComplaintsList = [];
  tableHeaders = [];
  agendaForm: FormGroup;
  complaintIdvalue: any;
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  @ViewChild('deleteModal') deleteBtn: ElementRef<HTMLElement>;
  agendaId: any;
  agendaDetails: any;

  constructor(public secexcuSer: SecexcuService, public fb: FormBuilder, public toastr: ToastrService,
    public helper: HelperService, public seconst: constantServices) { }

  ngOnInit(): void {
    this.tableHeaders = this.seconst.SEtableHeaders;
    this.serachValue(this.myProperty);
    // agenda Creation Form
    this.agendaForm = this.fb.group({
      agendaDate: [{ value: '', disabled: true }],
      agendaItemNum: [{ value: '', disabled: true }],
      agendaItemSubj: ['', Validators.required],
      agendaMatter: ['', Validators.required]
    });
  }
  get f() { return this.agendaForm.controls; } // Agenda Form Controls

  serachValue(data: any) {
    this.secexcuSer.serchGetData(data, this.rowId, this.pageid).pipe(takeUntil(this.subscribe)).subscribe((searchcomplaintList: any) => {
      console.log(searchcomplaintList);
      if (searchcomplaintList.length !== 0) {
        this.allComplaintsList = searchcomplaintList;
        this.pageCount = Math.ceil(searchcomplaintList[0].totalCount / this.pageid);
        console.log(this.allComplaintsList);
        this.countData();
      } else {
        this.allComplaintsList = [];
        this.pageCount = 0;
      }
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  getId(id: any) {
    this.getAgendaDetails(id.complaint.cgrComplaintId);
    this.complaintIdvalue = id.complaint.cgrComplaintId;

  }
  // get Agenda Details
  getAgendaDetails(id: any) {
    console.log(id);
    this.complaintIdvalue = id;
    this.secexcuSer.getAgendaDetails(id).pipe(takeUntil(this.subscribe)).subscribe((details: any) => {
      console.log(details);
      this.agendaDetails = details;
      this.agendaId = details.agendaId;
      this.agendaForm.controls.agendaDate.patchValue(details.agendaCreatedOn);
      this.agendaForm.controls.agendaItemNum.patchValue(details.agendaCategroyItemRefNumber);
      this.agendaForm.controls.agendaItemSubj.patchValue(details.agendaItemSubject);
      this.agendaForm.controls.agendaMatter.patchValue(details.agendaItemMatter);
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  // Delete Agenda 
  deleteAgenda() {
    this.secexcuSer.deleteAgenda(this.complaintIdvalue).pipe(takeUntil(this.subscribe)).subscribe((del: any) => {
      console.log(del);
      this.deleteBtn.nativeElement.click();
      return this.toastr.error('Deleted Successfully', 'Deleted', {
        timeOut: 2000
      });
    }, error => {
      this.helper.errorMessage(error);
    });
  }

  updateAgenda() {
    const obj = {
      complaintId: this.complaintIdvalue,
      agendaItemSubject: this.agendaForm.value.agendaItemSubj,
      agendaItemMatter: this.agendaForm.value.agendaMatter,
      agendaId: this.agendaId,
    };

    this.secexcuSer.updateAgenda(obj).pipe(takeUntil(this.subscribe)).subscribe((del: any) => {
      console.log(del);
      this.closeBtn.nativeElement.click();
      return this.toastr.success('Updated Agenda Successfully', 'Success', {
        timeOut: 2000
      });
    }, error => {
      this.helper.errorMessage(error);
    });
  }

  // Dashboard Counts List
  countData() {
    this.secexcuSer.sectionDashboard().pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.dashboardCount = data;
    }, error => {
      this.helper.errorMessage(error);
    })
  }

  // Next Button
  next() {
    if (this.rowId + 1 <= this.pageCount - 1) {
      ++this.rowId;
      console.log(this.rowId);
      this.serachValue(this.myProperty);
    }
  }
  // Prvious bUtton
  previ() {
    if (this.rowId >= 1) {
      --this.rowId;
      console.log(this.rowId);
      this.serachValue(this.myProperty);
    }
  }


  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }

}
