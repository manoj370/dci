import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutboundService } from '../../services/outbound.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { error, element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
@Component({
  selector: 'app-newdispatch',
  templateUrl: './newdispatch.component.html',
  styleUrls: ['./newdispatch.component.css']
})
export class NewdispatchComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  dcisections: any = [];
  subsections: any = [];
  sectionid: any;
  createDispatchForm: FormGroup;
  sectionshortname: any;
  subSectionid: any;
  subsectionshortname: any;
  sectionshortName: any;
  patternNumber: string;
  date: any;
  year: number;
  drefno: boolean;
  patternres: any;
  despatchrefno: any;
  passobj: { section: any; subsection: any; date: any; despatchrefno: any; };
  today: string;
 
  constructor(public router: Router, public outboundsvc: OutboundService, public fb: FormBuilder,public tostar: ToastrService) { }

  ngOnInit(): void {
    this.getAllDCISections();
    this.today = '2020';
    // validations
    this.createDispatchForm = this.fb.group({
      section: ['', Validators.compose([Validators.required])],
      subsection: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
    });

  }
  // resetting form
  clear() {
    this.createDispatchForm.reset();
    this.createDispatchForm.controls.section.setValue('', { onlySelf: true });
    this.createDispatchForm.controls.subsection.setValue('', { onlySelf: true });
    this.createDispatchForm.controls.date.setValue('', { onlySelf: true });
  }

  // getAllDCISections
  getAllDCISections() {
    this.outboundsvc.getAllDCISections().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.dcisections = res;

    }, error => {
      console.log(error);
    });
  }
  // gettingsectionid
  sectionId(value) {
    console.log(value);
    this.dcisections.map(element => {
      console.log(element);
      if (element.sectionName === value) {
        console.log(element.shortName);
        console.log(element.sectionId)
        this.sectionid = element.sectionId;
        this.sectionshortName = element.shortName;
        this.getSubSectionss();
      }
    });


  }
  // getSubSections
  getSubSectionss() {
    this.outboundsvc.getSubSections(this.sectionid).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.subsections = res;
    }, error => {
      console.log(error);
    });
  }
  // getting subsectionid
  subsectionId(value) {
    console.log(value);
    this.subsections.map(element => {
      console.log(element);
      if (element.name === value) {
        console.log(element.shortName);
        console.log(element.subSectionId)
        this.subsectionshortname = element.shortName;
        this.subSectionid = element.subSectionId;
      }
    });

  }
  // generate DispatchReferenceNumber
  generateDispatchRefNumber() {
    this.outboundsvc.generateDispatchRefNo(this.patternNumber).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.patternres = res;
      this.despatchrefno = this.patternres.dispatchRefNumber;
      console.log(this.despatchrefno);
      this.drefno = true;
    }, error => {
      console.log(error);
    })
  }
  // next button method
next() {
    console.log(this.createDispatchForm.value.date);
    this.date = this.createDispatchForm.value.date
    var Xmas = new Date(this.date);
    var year = Xmas.getFullYear();
    console.log(year);
    this.year = year;
    this.patternNumber = '/' + this.sectionshortName + '/' + this.subsectionshortname + '/' + this.year
    console.log(this.patternNumber);
    this.outboundsvc.generateDispatchRefNo(this.patternNumber).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.patternres = res;
      this.despatchrefno = this.patternres.dispatchRefNumber;
      console.log(this.despatchrefno);
      this.drefno = true;
      console.log(this.createDispatchForm.value)
      this.tostar.success('Despatch Reference Number Generated Successfully', 'Success', {
        timeOut: 2000
      });
      this.passobj = {
        "section": this.createDispatchForm.value.section,
        "subsection": this.createDispatchForm.value.subsection,
        "date": this.createDispatchForm.value.date,
        "despatchrefno": this.despatchrefno
      };
      console.log(this.passobj);
      this.router.navigateByUrl('main/internal/outbound/secExc/createdispatch', { state: this.passobj});


    }, error => {
      
      console.log(error);
    });
   
   }
  //  For Validations
   get f() { return this.createDispatchForm.controls; }
    // Destroy The Subscribe Dta
 ngOnDestroy() {
  this.subscribe.next();
  this.subscribe.complete();
}
}
