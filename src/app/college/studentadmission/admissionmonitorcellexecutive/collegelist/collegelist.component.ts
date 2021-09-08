import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsrmgtService } from 'src/app/usermgt/services/usrmgt.service';
import { StudentAdmissionService } from '../../services/student-admission.service';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-collegelist',
  templateUrl: './collegelist.component.html',
  styleUrls: ['./collegelist.component.css']
})
export class CollegelistComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  countries: any = [];
  statesList: any = [];
  collegesList: any = [];
  public rowId = 10;
  public pageId = 0;
  public PageCounts: any = 1;
  public responsePageCount: any;
  collegelist: any;
  status: string;
  searchForm: FormGroup;
  statename: any;
  constructor(public router:Router,public fb: FormBuilder,public tostar: ToastrService, public usrmgtService: UsrmgtService,public studentService: StudentAdmissionService) { }
  ngOnInit(): void {
    // Get Calls
    this.getAllCountries();
    this.findAllCollegesByPagiantion();
     // Validations
     this.searchForm = this.fb.group({
      'country': [''],
      'state': [''],
      'college': ['']
    });
  }
   // getallCountries
   getAllCountries() {
    this.usrmgtService.getAllCountrie().subscribe(res => {
      console.log(res, "allcountries");
      this.countries = res;
    }, error => {
      console.log(error);
    });
  }
  //Get States
  getStates(value) {
    console.log(value, "value");
    this.usrmgtService.getAllStates(value).subscribe(res => {
      console.log(res, "all states sss");
      this.statesList = res;
    }, error => {
      console.log(error);
    });
  }
//Get States
getCollegesListBasedOnState(value) {
  console.log(value, "value");
  this.statename = value;
  this.studentService.getAllRegisteredCollegesByState(value).subscribe(res => {
    console.log(res, "allcolleges");
    this.collegesList = res;
  }, error => {
    console.log(error);
  });
}
findAllCollegesByPagiantion(){
  this.studentService.findAllCollegesWithPagiantion(this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res:any) => {
    console.log(res, "allcollegeslistwithpagination");
    this.collegelist = res;
    this.responsePageCount = this.collegelist[0].pageCount;
      this.status="collegelist";
  }, error => {
    console.log(error);
  });
}
// route to view
view(data) {
console.log(data.entityMaster.entityMasterId);
this.router.navigate(['main/internal/college/admissionMonitorCellExecutive/viewStudentsList',{ id: data.entityMaster.entityMasterId ,name:data.collegeName}]);
}
 //Previous Button
 previ() {
  if (this.pageId >= 1) {
    --this.pageId;
    console.log(this.pageId);
    if (this.status === "filter") {
      this.studentService.searchCollegesWithFilters(this.statename,this.searchForm.value.college,
        this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
          console.log(res);
          this.collegelist = res;
      },error=>{
        console.log(error);
      })
    } else if(this.status === "collegelist"){
      this.findAllCollegesByPagiantion();
    }
  }
}
//Next Button 
next() {
  if (this.pageId + 1 <= this.responsePageCount - 1) {
    ++this.pageId;
    console.log(this.rowId);
    debugger
    if (this.status === "filter") {
      this.studentService.searchCollegesWithFilters(this.statename,this.searchForm.value.college,
        this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
          console.log(res);
          this.collegelist = res;
      },error=>{
        console.log(error);
      })
    } else if(this.status === "collegelist") {
      this.findAllCollegesByPagiantion();
    }
  }
}
// searchWithCollegeFilters
search(){
  debugger
  if(this.searchForm.value.country !== "" || this.searchForm.value.state !=="" || this.searchForm.value.college !==""){
    this.studentService.searchCollegesWithFilters(this.statename,this.searchForm.value.college,
      this.pageId,this.rowId).pipe(takeUntil(this.subscribe)).subscribe((res :any)=>{
        console.log(res);
        this.collegelist = res;
        this.status ="filter";
    },error=>{
      console.log(error);
    });
  }else{
    console.log('enter any field value');
      this.tostar.warning('Please Enter Atleast One Field To Search', 'Warning', {
        timeOut: 2000
      });
  }
 
}
// reset formcontrols
reset(){
this.searchForm.reset();
this.searchForm.controls.country.setValue('', { onlySelf: true });
this.searchForm.controls.state.setValue('', { onlySelf: true });
this.searchForm.controls.college.setValue('', { onlySelf: true });
this.findAllCollegesByPagiantion();
}
 // Destroy The Subscribe Dta
 ngOnDestroy() {
  this.subscribe.next();
  this.subscribe.complete();
}
}
