import { Component, OnInit, OnChanges, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { appConstants } from 'src/app/common-service/const.model';
import { FormControl } from '@angular/forms';
import { HelperService } from 'src/app/common-service/helper.service';
import { HttpServiceService } from 'src/app/common-service/http-service.service';

@Component({
  selector: 'app-internal-dash',
  templateUrl: './internal-dash.component.html',
  styleUrls: ['./internal-dash.component.css']
})
export class InternalDashComponent implements OnInit {
  dispalyName: any;
  linkValue: string;
  userData: any;
  moduleName: any = [];
  cardData: any = [];
  DMSLink: any;
  ERPLink: any;

  name = new FormControl();
  constructor(public event$: HelperService, public router: Router, public appconst: appConstants, public http: HttpServiceService) { }

  ngOnInit(): void {
    console.log(window.location.hostname.includes('http://103.210.72.123/') || (window.location.hostname.includes('localhost')));
    if ((window.location.hostname === '103.210.72.123') || (window.location.hostname === 'localhost')) {
      this.DMSLink = 'http://103.210.72.123:8080/user-management/api/v1/user/dmsUrl';
      this.ERPLink = 'http://103.210.72.123:8080/user-management/api/v1/user/ERPUrl';

    } else {
      this.DMSLink = 'http://36.255.253.200:8080/user-management/api/v1/user/dmsUrl';
      this.ERPLink = 'http://36.255.253.200:8080/user-management/api/v1/user/ERPUrl';
    }

    // For Change Role
    this.event$.getNotification()
      .subscribe((notifyData) => {
        console.log(notifyData);
        if (notifyData !== null) {
          this.userData = JSON.parse(sessionStorage.getItem('userInfo-usec'));
          console.log(this.userData.rolesList);
          this.dispalyName = sessionStorage.getItem('selectedRole-usec');
          this.moduleName = [];
          this.userData.rolesList.forEach(element => {
            if (element.roleName === this.dispalyName) {
              element.authorities.forEach(privi => {
                this.moduleName.push(privi.applicationModule.moduleName);
              });
            }
          });
          console.log(this.moduleName);
        }
      });

    // Default ROle
    this.userData = JSON.parse(sessionStorage.getItem('userInfo-usec'));
    this.dispalyName = sessionStorage.getItem('selectedRole-usec');
    console.log(this.dispalyName);
    this.userData.rolesList.forEach(element => {
      if (element.roleName === this.dispalyName) {
        element.authorities.forEach(privi => {
          this.moduleName.push(privi.applicationModule.moduleName);
        });
      }
    });
  }

  sendUser(value: any) {
    console.log(value);
    switch (this.dispalyName) {
      // AcademicUncharged ------Academic
      case 'Executive Committee':
        this.router.navigate(['/main/internal/excu/ec/dashboard']);
        break; 
      // AcademicAsstSecty 
      case 'AcademicAsstSecty':
        this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);
        break;
      case 'LegalSecInCharge':
        this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);
        break;
        case 'ISecInCharge':
          this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);
          break;
          case 'RTISecInCharge':
            this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);
            break;
      case 'AcademicIncharge':
        this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);
        break;
      // AcademicSectionOfficer 
      case 'AcademicSectionOfficer':
        this.router.navigate(['/main/internal/outbound/se/dashboard']);
        break;
      case 'AcademicAssistantSectionOfficer':
        this.router.navigate(['/main/internal/outbound/se/dashboard']);
        break;
      //AcademicExecutive 
      case 'AcademicExecutive':
        this.router.navigate(['/main/internal/outbound/se/dashboard']);
        break;
      case 'ACADSecInCharge':
        this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);
        break;
      // InspectionSectionOfficer ---Inspection Section
      case 'InspectionSectionOfficer':
        this.router.navigate(['/main/internal/outbound/se/dashboard']);
        break;
      //RTI Section
      case 'RTIExecutive':
        this.router.navigate(['/main/internal/outbound/se/dashboard']);
        break;

      // Assistant Secretary
      case 'Assistant Secretary':
        this.router.navigate(['/main/internal/outbound/se/dashboard']);
        break;
      // Grievance Module
      case 'ARPMComplainant':
        this.router.navigate(['/main/internal/greviance/complaint/dashboard']);
        break;
      case 'ARPMSecInCharge':
        if (value === 'Grievance') {
          this.router.navigate(['/main/internal/greviance/secHead/dashboard']);
        } else if (value === 'ecAgenda') {
          this.router.navigate(['/main/internal/excu/sectionHead/sectionDashboard']);
        } else if (value === 'DakDairy') {
          this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);  // Dairy Dak Module
          // this.router.navigate(['/main/internal/inbound/sectionincharge/receiptDashboard']);  // Dairy Dak Module
        }

        break;
        case 'ARPMAsstSecty':
          if (value === 'DakDairy') {
            this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);  // Dairy Dak Module
          }
  
          break;
      case 'ARPMSecExecutive':
        if (value === 'Grievance') {
          this.router.navigate(['/main/internal/greviance/secExc/dashboard']);
        } else if (value === 'DakDairy') {
          // this.router.navigate(['/main/internal/outbound/secExc/dashboard']);  // Dairy Dak Module
          this.router.navigate(['/main/internal/outbound/se/dashboard']);
          this.router.navigate(['/main/internal/inbound/sectionexecutive/dashboard']);
        } else if (value === 'DMS') {
          this.http.get('http://103.210.72.123:8080/user-management/api/v1/user/dmsUrl').subscribe((res: any) => {
            console.log(res.dmsUrl);
            window.open(res.dmsUrl, "_blank");
          }, error => {
            console.log(error);
          })
        }else if(value === 'ERP'){
          this.http.get('http://103.210.72.123:8080/user-management/api/v1/user/ERPUrl').subscribe((res: any) => {
            console.log(res.erpUrl);
            window.open(res.erpUrl, "_blank");
          }, error => {
            console.log(error);
          })
        }
        break;
      case 'ARPMSubCommittee':
        this.router.navigate(['/main/internal/greviance/subCom/dashboard']);
        break;
      case 'ARPMExeCommittee':
        this.router.navigate(['/main/internal/greviance/excutive/dashboard']);
        this.event$.sendNotification('griviance');
        break;
      case 'CollegeRep':
        this.router.navigate(['/main/internal/greviance/college/dashboard']);
        break;
      // Dairy Dak Module
      case 'DAK_Section_Executive':
        // this.router.navigate(['/main/internal/outbound/diarydaksechead/dashboard']);
        this.router.navigate(['/main/internal/outbound/se/dashboard']);
        break;
      // case 'DAK_Section_Head':
      //   this.router.navigate(['/main/internal/inbound/diarydakincharge']);
      //   break;

      case 'RDSecInCharge':
        this.router.navigate(['/main/internal/inbound/diarydakincharge/receiptDashboard']);
        break;
      case 'Secretary':
        if (value === 'ecAgenda') {
          this.router.navigate(['/main/internal/excu/secretary/secDashboard']);
        } else {
          this.router.navigate(['/main/internal/inbound/secretary']);
          this.router.navigate(['/main/internal/outbound/secretary/dashboard']);
        }
        break;

      case 'Joint Secretary':
        this.router.navigate(['/main/internal/outbound/jointSecretary/dashboard']);
        break;
      case 'President':
        if (value === 'ecAgenda') {
          this.router.navigate(['/main/internal/excu/secretary/secDashboard']);
        } else {
          this.router.navigate(['/main/internal/outbound/president/dashboard']);
        }
        break;
      case 'Senior Secretariat  Assistant':
        if (value === 'DMS') {
          // this.dms(this.DMSLink);
        } else if (value === 'Grievance') {
          this.router.navigate(['/main/internal/greviance/secExc/dashboard']);
        } else {
          this.router.navigate(['/main/internal/outbound/se/dashboard']);
        }
        break;
      case 'Section Officer':
        this.router.navigate(['/main/internal/outbound/se/dashboard']);
        break;
      case 'Junior Secretariat Assistant':
        this.router.navigate(['/main/internal/outbound/jsa/dash']);
        break;
      // Inspection Module 
      case 'InspectionCell':
        this.router.navigate(['/main/internal/inspection/insCell/dashboard']);
        break;
      case 'TravelAgent':
        this.router.navigate(['/main/internal/inspection/tavelagent/dashboard']);
        break;
      // Student Admission
      case 'College Principal':
        if (value === 'StudentAdmission') {
          this.router.navigate(['/main/internal/college/dean/studentsList']);    // Student Admission Module
        } else if (value === 'proforma') {
          this.router.navigate(['/main/internal/college/proforma']);    // Student Admission Module
        } else {
          this.router.navigate(['/main/internal/college/collegeRep/coursecompletionStudentList']);    // Course Completion Module
        }
        break;
      case 'Student Admission Executive':
        this.router.navigate(['/main/internal/college/admissionMonitorCellExecutive/collegelist']);// Student Admission Module
        break;
      case 'Stu Executive Commitee':
        console.log('test');
        this.router.navigate(['/main/internal/college/executiveCommittee/dashboard']);    // Student Admission Module
        break;
      case 'Monitoring Cell':
        console.log('test');
        this.router.navigate(['/main/internal/college/monitoringExecutive/list']);    // Student Admission Module
        break;
      case 'President':
        this.router.navigate(['/main/internal/college/monitoringExecutive/list']);    // Student Admission Module
        break;
      case 'AFExecutive':
        if (value === 'DakDairy') {
          this.router.navigate(['/main/internal/outbound/se/dashboard']);
        }
        break;
      case 'AFSecInCharge':
        if (value === 'DakDairy') {
          this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);
        }
        break;
      case 'AFSectionOfficer':
        if (value === 'DakDairy') {
          this.router.navigate(['/main/internal/outbound/se/dashboard']);
        }
        break;
      case 'AFAssistantSectionOfficer':
        if (value === 'DakDairy') {
          this.router.navigate(['/main/internal/outbound/se/dashboard']);
        }
        break;
      case 'LegalExecutive':
        if (value === 'DakDairy') {
          this.router.navigate(['/main/internal/outbound/se/dashboard']);
        }
        break;
      case 'AEExecutive':
        this.router.navigate(['/main/internal/outbound/se/dashboard']);
        break;
      case 'AEAssistantSecretary':
        this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);
        break;
      case 'AEIncharge':
        this.router.navigate(['/main/internal/outbound/secInch/IncDashboard']);
        break;
      case 'AESectionofficer':
        if (value === 'DakDairy') {
          this.router.navigate(['/main/internal/outbound/se/dashboard']);
        }
        break;
      case 'LegalAssistantSectionOfficer':
        if (value === 'DakDairy') {
          this.router.navigate(['/main/internal/outbound/se/dashboard']);
        }
        break;
      default:
        break;
    }
  }

  // DMS URL
  dms() {
    this.http.get(this.DMSLink).subscribe((res: any) => {
      console.log(res.dmsUrl);
      window.open(res.dmsUrl, '_blank');
    }, error => {
      console.log(error);
    });
  }
    // DMS URL
    ERP() {
      this.http.get(this.ERPLink).subscribe((res: any) => {
        console.log(res.erpUrl);
        window.open(res.erpUrl, '_blank');
      }, error => {
        console.log(error);
      });
    }

}
