import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { urlServices } from './../../models/url.models';
import { appConstants } from './../../../common-service/const.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExcComServiceService } from './../../services/excComm/exc-com-service.service';


@Component({
  selector: 'app-excu-agenda',
  templateUrl: './excu-agenda.component.html',
  styleUrls: ['./excu-agenda.component.css']
})
export class ExcuAgendaComponent implements OnInit {
  show: string;
  companintId: any;
  forwardForm: FormGroup;
  decisionForm: FormGroup;
  complaintviewDta: any = null;
  otherSectionList: any;
  userData: any;
  errorMsgs: any;
  previlizesList: any = [];
  downloadUrl: string;
  @ViewChild('openModal') openBtn: ElementRef<HTMLElement>;
  @ViewChild('dismissModal') closeBtn: ElementRef<HTMLElement>;
  reappealStatus: any;
  constructor(public router: Router, public fb: FormBuilder, public toastr: ToastrService, public constValues: appConstants,
              public sexcuService: ExcComServiceService, public route: ActivatedRoute, public url: urlServices) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.reappealStatus = this.router.getCurrentNavigation().extras.state;
    if (this.reappealStatus === undefined) {
      this.router.navigate(['main/internal/greviance/excutive/dashboard']);
    }
  }

  ngOnInit(): void {
    this.errorMsgs = this.constValues.errorMsgs; // From Error Messages
    // Forward Form
    this.forwardForm = this.fb.group({
      forwardName: ['', Validators.required]
    });
    // Decision Form
    this.decisionForm = this.fb.group({
      decision: ['', Validators.required]
    });
    // Roles And Prvilizes
    this.userData = JSON.parse(sessionStorage.getItem('userInfo-usec')).defaultRole;
    this.userData.authorities.forEach(privi => {
      this.previlizesList.push(privi.authorityName);
    });

    // Get AGemda Details
    this.getCalls();
    // GEt Othere SectionList
    this.sexcuService.getOtherSections().subscribe((otherSection: any) => {
      console.log(otherSection);
      this.otherSectionList = otherSection;
    }, error => {
      console.log(error);
    });
  }
  get f() { return this.forwardForm.controls; } // forward Controls
  get g() { return this.decisionForm.controls; } // Decisison Form Controls

  // On LOad Call
  getCalls() {
    // Get AGemda Details
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.sexcuService.getCompliantDetails(id).subscribe((detailsdata: any) => {
        console.log(detailsdata);
        this.complaintviewDta = detailsdata;
        this.complaintviewDta.workflowDocuments.forEach(element => {
          const nameString = element.documentLocation;
          if(nameString !==null){
            const filename = nameString.split('/').pop();
            console.log(filename);
            element.documentLocation = filename;
            }
        });
      }, error => {
        console.log(error);
      });
    });
  }
  // Forward Call
  forwatdToSection() {
    console.log(this.forwardForm.value);
    const obj = {
      assignedToEntityId: this.forwardForm.value.forwardName,
      complaint: {
        cgrComplaintId: this.complaintviewDta.cgrComplaintId
      }
    };
    this.sexcuService.forwardSection(obj).subscribe((forwrdeddata: any) => {
      console.log(forwrdeddata);
      this.toastr.success('Forwarded Successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['main/internal/greviance/excutive/dashboard']);
      this.closeBtn.nativeElement.click();
    }, error => {
      console.log(error);
    });
  }
  // Differ Call
  differDecision() {
    console.log(this.decisionForm.value);
    const obj = {
      complaint: {
        cgrComplaintId: this.complaintviewDta.cgrComplaintId
      },
      assigneeComments: this.decisionForm.value.decision
    };
    console.log(obj);
    this.sexcuService.differAgenda(JSON.stringify(obj)).subscribe((differData: any) => {
      console.log(differData);
      this.toastr.success('Differ Agenda successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['main/internal/greviance/excutive/dashboard']);

    }, error => {
      console.log(error);
      this.toastr.error('Error', 'Error', {
        timeOut: 3000
      });
    });
  }
  // Save Call
  save() {
    console.log(this.decisionForm.value);
    const obj = {
      complaint: {
        cgrComplaintId: this.complaintviewDta.cgrComplaintId
      },

      exeCommitteeDecision: this.decisionForm.value.decision
    };
    this.sexcuService.saveDecision(obj).subscribe((saveData: any) => {
      console.log(saveData);
      this.getCalls();
      this.toastr.success('Saved successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['main/internal/greviance/excutive/dashboard']);

    }, error => {
      console.log(error);
      this.toastr.error('Error', 'Error', {
        timeOut: 3000
      });
    });
  }

  // Final Submit
  finalDecision() {
    console.log(this.decisionForm.value);
    const obj = {
      complaint: {
        cgrComplaintId: this.complaintviewDta.cgrComplaintId
      },
      exeCommitteeDecision: this.decisionForm.value.decision
    };
    this.sexcuService.excutiveDecision(obj).subscribe((data: any) => {
      console.log(data);
      this.getCalls();
      this.toastr.success('Final Decision Submitted successfully', 'Success', {
        timeOut: 2000
      });
      this.router.navigate(['main/internal/greviance/excutive/dashboard']);
    }, error => {
      console.log(error);
      this.toastr.error('Error', 'Error', {
        timeOut: 3000
      });
    });
  }
// Download Evidence Documents
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
  // Reset The Controls
  resetControls() {
    this.forwardForm.controls.forwardName.setValue('', { onlySelf: true });
    this.decisionForm.reset();
  }
}
