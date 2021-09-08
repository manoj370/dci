import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SecexcuService } from 'src/app/griviance/services/sectionExcutive/secexcu.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  id: any;
  notification: string;
  agendaDetails: any;
  agendaForm: FormGroup;
  submitted = false;
  aobForm: FormGroup;
  radioData = [
    { label: 'Create AOB Agenda', status: true, info: 'For the meeting date this agenda item will fall under AOB, Did u take permission from chair create AOB Agenda?' },
    { label: 'Create Main Agenda for Next Meeting', info: '', status: false }
  ];
  @ViewChild('confirmOpen') confirmBtn: ElementRef<HTMLElement>;
  @ViewChild('confirmDismiss') confirmClose: ElementRef<HTMLElement>;
  subscribe: Subject<any> = new Subject<any>();
  subscribeValue: any;


  // View Child
  @ViewChild('modal') openModal: ElementRef<HTMLElement>;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  constructor(public helper: HelperService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    public toastr: ToastrService, public agendaService: SecexcuService, private router: Router) { }

  ngOnInit() {
    this.Notification();
    this.agendaForm = this.fb.group({
      agendaDate: [{ value: '', disabled: true }],
      agendaItemNum: [{ value: '', disabled: true }],
      agendaItemSubj: ['', Validators.required],
      agendaMatter: ['', Validators.required]
    });
    this.aobForm = this.fb.group({
      value: ['']
    });
  }
  get f() { return this.agendaForm.controls; }
  Notification() {
    this.helper
      .readDataInNotificationComponent()
      .pipe(takeUntil(this.subscribe))
      .subscribe(notification => {
        // this.notification = notification.notification;
        // console.log(notification);
        this.id = notification.complaintId;
        this.agendaDetails = notification.agendaDetails;
        this.notification = notification.moduleName;
        // console.log(this.notification);
        if (notification.moduleName === 'Grievance') {
          this.agendaForm.get('agendaItemNum').patchValue(notification.agendaDetails.agendaItemNo);
          this.agendaForm.get('agendaDate').patchValue(notification.agendaDetails.agendaCreatedOn);
          this.openModal.nativeElement.click();
        }
      });
  }

  // AOB Popup Details
  aobModal() {
    if (this.agendaDetails.aobStatus !== null) {
      this.openModal.nativeElement.click();
      this.confirmBtn.nativeElement.click();
      this.submitted = true;
    } else {
      this.aobForm.value.value = null;
      this.agendaCreate(this.notification);
    }
  }

  // Agenda Creation
  agendaCreate(notify: any) {
    console.log(notify);
    if (notify === 'Grievance') {
      this.submitted = true;
      if (this.agendaForm.valid) {
        const obj = {
          complaint: {
            cgrComplaintId: this.id
          },
          agendaItemSubject: this.agendaForm.value.agendaItemSubj,
          agendaItemMatter: this.agendaForm.value.agendaMatter,
          ecPermission: this.aobForm.value.value
        };
        // console.log(obj);
        this.agendaService.agendaCreate(obj).pipe(takeUntil(this.subscribe)).subscribe((agendaData: any) => {
          console.log(agendaData);
          this.closeBtn.nativeElement.click();
          this.confirmClose.nativeElement.click();
          this.toastr.success('Agenda Created successfully', 'Success', {
            timeOut: 2000
          });
          this.router.navigate(['main/internal/greviance/secExc/dashboard']);
        }, error => {
          console.log(error);
          this.helper.errorMessage(error);
        });
      }
    }
  }

  
}
