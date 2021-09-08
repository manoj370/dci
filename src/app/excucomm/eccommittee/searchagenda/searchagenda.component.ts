import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExcutiveService } from './../../service/excutive.service';
import { ECconstantServices } from './../../service/constant.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchagenda',
  templateUrl: './searchagenda.component.html',
  styleUrls: ['./searchagenda.component.css']
})
export class SearchagendaComponent implements OnInit {
  myForm: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  cities = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  searchForm: FormGroup;
  viewTable = false;
  // viewdate = false;
  meetingDatesList: any = [];
  searchResult: any = [];
  selectedDate = '';
  search = '';
  checkObj = {
    inSubject: false,
    inMatter: false,
    inDiscusions: false,
    inDecision: false,
  };
  list: any[];
  submitted = false;
  subscribe: Subject<any> = new Subject<any>();
  checkedList = [
    { label: 'In The Subjects' },
    { label: 'In The Matters' },
    { label: 'In The Discussions' },
    { label: 'In The Decisions' }
  ];
  constructor(public router: Router, public ecservice: ExcutiveService, public helper: HelperService,
    public toaster: ToastrService, public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchText: ['', Validators.required],
      dateValue: ['', Validators.required],
      optionValue: ['', Validators.required]
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'meetingId',
      textField: 'meetingDate',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      // allowSearchFilter: this.ShowFilter
    };



    if (JSON.parse(sessionStorage.getItem('Meeting')) !== null) {
      const meetingId = JSON.parse(sessionStorage.getItem('Meeting'))['meetingId'];
      console.log(meetingId);
      this.ecservice.meetingDates(meetingId).pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
        console.log(list);
        this.meetingDatesList = list;
      }, error => {
        this.helper.errorMessage(error);
      });
    }
  }

  get f() { return this.searchForm.controls; }
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    this.selectedDate = item.meetingId;
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
    this.selectedDate = items[0].meetingId;

  }

  checkChange(event) {
    console.log(event.target.id);
    console.log(event.target.checked);
    this.checkObj = {
      inSubject: event.target.id === 'In The Subjects' ? event.target.checked : false,
      inMatter: event.target.id === 'In The Matters' ? event.target.checked : false,
      inDiscusions: event.target.id === 'In The Discussions' ? event.target.checked : false,
      inDecision: event.target.id === 'In The Decisions' ? event.target.checked : false,
    };
    console.log(this.checkObj);
  }
  searchData() {
    this.viewTable = true;
    // console.log(this.searchForm.value.searchText, this.checkObj, this.selectedDate)
    this.ecservice.agendaContent(this.searchForm.value.searchText, this.checkObj, this.selectedDate)
      .pipe(takeUntil(this.subscribe)).subscribe((list: any) => {
        console.log(list);
        this.searchResult = list;
      }, error => {
        this.helper.errorMessage(error);
      });
  }

}
