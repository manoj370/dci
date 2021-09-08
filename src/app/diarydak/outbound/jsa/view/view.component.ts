import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { OutboundService } from '../../services/outbound.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { JSAConstantServices } from '../../models/jsaconst.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { urlServices } from '../../services/outboundServiceUrls';
import { ToastrService } from 'ngx-toastr';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  dispatchId: number;
  submitted = false;
  sheetDetails: any;
  seekList: any = [];
  downloadUrl: string;
  personList: any = [];
  designationList: any = [];
  seekApprovalForm: FormGroup;
  statesList: any = [];
  citiesList: any = [];


  @ViewChild('approveDismissModal') approveCloseBtn: ElementRef<HTMLElement>;

  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;

  constructor(public fb: FormBuilder, public route: ActivatedRoute, public tostar: ToastrService,
    public jsaService: OutboundService, public helper: HelperService, public url: urlServices, public usrMgtService: UsrmgtService,
    public jsaConst: JSAConstantServices) { }

  ngOnInit(): void {

    this.getDispatchById();

    this.seekApprovalForm = this.fb.group({
      designation: ['', Validators.required],
      person: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }
  getDispatchById() {
    // getDispatchById
    this.route.params.subscribe(params => {
      console.log(params.id);
      
      this.dispatchId = +params.id;
      this.jsaService.getDispatchById(params.id).pipe(takeUntil(this.subscribe)).subscribe((data) => {
        console.log(data);
        this.sheetDetails = data;
        if (this.sheetDetails.address !== null) {
          this.getStates();
        }
        this.sheetDetails.dakMatterOrComments = this.sheetDetails.dakMatterOrComments;
        if (this.sheetDetails.dispatchDocuments) {
          this.sheetDetails.dispatchDocuments.forEach(element => {
            const nameString = element.documentLocation;
            if (nameString !== null) {
              const filename = nameString.split('/').pop();
              // console.log(filename);
              element.documentLocation = filename;
            }
          });
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    });
  }
  getStates() {
    this.usrMgtService.getAllStates(1).pipe(takeUntil(this.subscribe)).subscribe(res => {
      this.statesList = res;
      this.statesList.forEach(element => {
        if (element.stateId === parseInt(this.sheetDetails.address.state)) {
          this.sheetDetails.address.state = element.stateName;
          this.getCities(element.stateId);
        }
      });
      console.log(res);
    }, error => {
      this.helper.errorMessage(error);
    });
  }
  // getCities
  getCities(value) {
    this.usrMgtService.getAllCities(value).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.citiesList = res;
      for (const iterator of this.citiesList) {
        if (iterator.cityId === parseInt(this.sheetDetails.address.city)) {
          this.sheetDetails.address.city = iterator.cityName;
        }
      }
    }, error => {
      this.helper.errorMessage(error);
    });
  }

  get f() { return this.seekApprovalForm.controls; }
  // Downloded Files 
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  SeekList() {
    this.jsaService.seekApprovalList().pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
      console.log(list);
      this.personList = [];
      // this.seekApprovalForm.controls.person.reset();
      this.seekList = list;
      this.designationList = [];
      list.forEach((item) => {
        Object.keys(item).forEach((key) => {
          this.designationList.push(key);
        });
      });
    }, error => {
      console.log(error);
      this.helper.errorMessage(error);
    });
  }
  selectedDesignation(data: any) {
    console.log(data);
    this.personList = [];
    this.seekApprovalForm.controls.person.setValue('', { onlySelf: true });
    this.seekList.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key === data) {
          this.personList = item[key];
          console.log(this.personList);
        }
      });
    });
  }

  seekApproval() {
    this.submitted = true;
    console.log(this.seekApprovalForm.value);
    if (this.seekApprovalForm.valid) {
      console.log(this.seekApprovalForm.value);
      const obj = {
        assignedToUserId: this.seekApprovalForm.value.person,
        comments: this.seekApprovalForm.value.comment,
        dispatchId: this.dispatchId,
        workFlowName: JSON.parse(sessionStorage.getItem('userInfo-usec')).deg.designationName
      };
      console.log(obj);
      this.jsaService.seekApprovalByUserIDAndComments(obj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.closeBtn.nativeElement.click();
        this.tostar.success('Seek Approval Sent', 'Success', {
          timeOut: 3000
        });
        this.reset();
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    }
  }



  reset() {
    this.submitted = false;
    this.seekApprovalForm.reset();
    this.seekApprovalForm.controls.designation.setValue('', { onlySelf: true });
    this.seekApprovalForm.controls.person.setValue('', { onlySelf: true });
  }
  // Destroy The Subscribe Dta
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
