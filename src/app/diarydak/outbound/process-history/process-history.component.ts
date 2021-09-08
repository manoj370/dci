import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OutboundService } from '../services/outbound.service';

@Component({
  selector: 'app-process-history',
  templateUrl: './process-history.component.html',
  styleUrls: ['./process-history.component.css']
})
export class ProcessHistoryComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  history: any;
  fileno: any;

  constructor(private outboundsvc: OutboundService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getProcessHistory();
  }
  // getProcessHistory()
  getProcessHistory() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.outboundsvc.history(params.id).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        this.history=res;
        // if(res.dakDispatch !==null){
        //   this.fileno =this.history[0].dakDispatch.dakDispatchFileNos.dakDispatchFileNo
        // }
      
      })
    });
  }
  // back()
  back(){
    let role:any=sessionStorage.getItem('selectedRole-usec');
    if(role ==='ARPMSecExecutive'||role ==='Section Officer'||role ==='InspectionSectionOfficer'
    ||role ==='AcademicExecutive'||role ==='AcademicAssistantSectionOfficer'||role ==='AcademicSectionOfficer'
    ||role ==='AEExecutive'||role ==='AESectionofficer'
    ||role ==='AFExecutive'||role ==='AFSectionOfficer'||role ==='AFAssistantSectionOfficer'
    ||role ==='LegalExecutive'||role ==='LegalAssistantSectionOfficer'
    ||role ==='RTIExecutive')
    this.router.navigate(['main/internal/outbound/se/dashboard']);
    else if(role ==='ARPMSecInCharge'||role ==='ARPMAsstSecty'
    ||role ==='AcademicIncharge'||role ==='AcademicAsstSecty'
    ||role ==='AEIncharge'||role ==='AEAssistantSecretary'
    ||role ==='AFSecInCharge'||role ==='LegalSecInCharge')
    this.router.navigate(['main/internal/outbound/secInch/IncDashboard']);
    else if(role ==='Joint Secretary')
    this.router.navigate(['main/internal/outbound/jointSecretary/dashboard']);
    else if(role ==='Secretary')
    this.router.navigate(['main/internal/outbound/secretary/dashboard']);
  }
}
