declare var $: any;
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { appConstants } from 'src/app/common-service/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { travelAgentConstants } from '../../models/travelagent/const.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TravelagentService } from '../../services/travelagent/travelagent.service';


@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit, OnDestroy {
  typeId = '';
  cardsList = [];
  errorMsgs: any;
  isnpectoId: any;
  files: any = [];
  arr: FormArray;
  taxList: any = [];
  submitted = false;
  maxDateValue: any;
  typesList: any = [];
  uploadForm: FormGroup;
  uploadTktDetails: any = [];
  today = moment().format('YYYY-MM-DD');
  subscribe: Subject<any> = new Subject<any>();
  @ViewChild('myInput') myInputVariable: ElementRef;

  constructor(public route: ActivatedRoute, public travelagent: TravelagentService, public toaster: ToastrService,
    public fb: FormBuilder, public helper: HelperService, public appConst: appConstants,
    public travelConst: travelAgentConstants) { }

  ngOnInit(): void {
    this.cardsList = this.travelConst.cardsList;
    this.travelagent.getTravelTypeList().pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
      console.log(data);
      this.typesList = data;
    }, error => {
      this.helper.errorMessage(error);
    });

    this.travelagent.getTaxList().pipe(takeUntil(this.subscribe)).subscribe((taxList: any) => {
      console.log(taxList);
      this.taxList = taxList;
    }, error => {
      this.helper.errorMessage(error);
    });

    this.errorMsgs = this.travelConst.formErrors;
    this.route.params.subscribe(params => {
      this.isnpectoId = +params.id;
    });
    // Accordion
    $('#accordion').on('hide.bs.collapse show.bs.collapse', e => {
      $(e.target)
        .prev()
        .find('i:last-child')
        .toggleClass('fa-minus fa-plus');
    });

    // Upload Form
    this.uploadForm = this.fb.group({
      hotelFrom: ['', Validators.required],
      hotelTO: ['', Validators.required],
      hotelFile: ['', Validators.required],
      hotelAmount: ['', Validators.required],
      hotelCharges: ['', Validators.required],
      hotelGst: ['', Validators.required],
      hotelGstAmount: ['', Validators.required],
      products: this.fb.array([])
    });

  }
  get f() { return this.uploadForm.controls; } // Controls For Form

  employees(): FormArray {
    return this.uploadForm.get('products') as FormArray;
  }


  productsForm(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      fromDate: ['', Validators.required],
      fromPlace: ['', Validators.required],
      PlaceTO: ['', Validators.required],
      tktFile: ['', Validators.required],
      Amount: ['', Validators.required],
      Charges: ['', Validators.required],
      Gst: ['', Validators.required],
      GstAmount: ['', Validators.required]
    });
  }

  maxDateSelction(event) {
    this.uploadForm.get('hotelTO').patchValue('');
    console.log(event.target.value);
    this.maxDateValue = event.target.value;
  }
  addItem() {
    if (this.typesList.length !== this.uploadForm.value.products.length) {
      this.arr = this.uploadForm.get('products') as FormArray;
      this.arr.push(this.productsForm());
      this.typeId = '';
    }
  }
  // Submit Travel Details
  traveldetails(data: any) {
    this.submitted = true;
    console.log(this.uploadForm.value);
    console.log(this.uploadForm.value.products);
    if (this.uploadForm.valid) {
      const obj0 = {
        fairExcludingTax: this.uploadForm.value.hotelAmount,
        journeyType: data,
        fromDate: this.uploadForm.value.hotelFrom,
        tillDate: this.uploadForm.value.hotelTO,
        taxOnFair: this.uploadForm.value.hotelGst,
        charges: this.uploadForm.value.hotelCharges
      };
      this.uploadForm.value.products.forEach(element => {
        const obj = {
          travelByTypeId: {
            travelByTypeId: element.type
          },
          fromPlace: element.fromPlace,
          toPlace: element.PlaceTO,
          fairExcludingTax: element.Amount,
          journeyType: data,
          fromDate: element.fromDate,
          taxOnFair: element.GstAmount,
          charges: element.Charges,
          taxTypeMaster: {
            taxTypeMstrId: element.Gst
          }
        };
        console.log(obj);
        this.uploadTktDetails.push(obj);
      });
      this.uploadTktDetails.push(obj0);
      console.log(this.uploadTktDetails);

      const mainObj = {
        inspectionAppointedInspectorId: this.isnpectoId,
        inspectionTicketDetailsDTOs: this.uploadTktDetails
      };
      console.log(mainObj);
      this.travelagent.uploadTktDetails(this.files, mainObj).pipe(takeUntil(this.subscribe)).subscribe((data: any) => {
        console.log(data);
        this.clearValidations();
        this.toaster.success('Uploaded Ticket Details Successfully', 'success', {
          timeOut: 2000
        });
      }, error => {
        this.helper.errorMessage(error);
      });
    }
  }

  selectedType(event: any, index: any) {
    this.typeId = event.target.value;
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = '';
    console.log(this.myInputVariable.nativeElement.files);
    // const filename = this.uploadForm.controls.products['controls'][index]['controls'].tktFile.value;
    // if (this.files.length !== 0) {
    //   const found = this.files.some(el => el.value.name === filename.replace(/^.*[\\/]/, ''));
    //   console.log(found);
    //   if (found) {
    //     for (const i in this.files) {
    //       if (this.files[i].value.name === filename.replace(/^.*[\/]/, '')) {
    //         this.files[i].fileId = event.target.value;
    //         break; // Stop this loop, we found it!
    //       }
    //     }
    //   }
    // }

  }
  // File upload
  getFileDetails(e, id: any, index: any) {
    if (index !== null) {
      var typeValue = this.uploadForm.controls.products['controls'][index]['controls'].type.value;
      // }
      // if (this.files.length !== 0) {
      if (typeValue !== '' && this.files.length !== 0) {
        const found = this.files.some(el => el.fileId === typeValue);
        console.log(found);
        if (!found) {
          const obj = {
            fileId: id, value: e.target.files[0]
          };
          this.files.push(obj);
        } else {
          for (const i in this.files) {
            if (this.files[i].fileId === typeValue) {
              this.files[i].value = e.target.files[0];
              break; // Stop this loop, we found it!
            }
          }
        }
        console.log(this.files);
      } else {
        const obj = {
          fileId: id, value: e.target.files[0]
        };
        this.files.push(obj);
      }
    } else {
      const obj = {
        fileId: id, value: e.target.files[0]
      };
      this.files.push(obj);
    }
  }

  // Remove Files
  removed(value: any) {
    console.log(this.files);
    if (this.files.some(file => file.value.name === value)) {
      const pos = this.files.map((e)=> { return e.value.name; }).indexOf(value);
      this.files.splice(pos, 1);
      console.log(pos);
    }
  }

  removeTktRows(index, fileId: any) {
    this.arr.removeAt(index);
    console.log(this.uploadForm.controls.products['controls']);
    console.log(this.files)
    const pos = this.files.map((e)=> { return e.fileId; }).indexOf(fileId);
    if (index !== -1) {
      this.files.splice(pos, 1);
    }
    console.log(this.files);
  }
  clearValidations() {
    this.files = [];
    this.submitted = false;
    this.uploadForm.reset();
    this.uploadForm.controls.products['controls'] = [];
    this.uploadForm.controls.hotelGst.setValue('', { onlySelf: true });
    for (const iterator of this.uploadForm.controls.products['controls']) {
      iterator.controls.type.setValue('', { onlySelf: true });
      iterator.controls.Gst.setValue('', { onlySelf: true });
    }

  }

  // Unsubscribe The Subscribed data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
