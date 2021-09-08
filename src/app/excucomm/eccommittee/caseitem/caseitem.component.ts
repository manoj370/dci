import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/common-service/helper.service';
import { ExcutiveService } from '../../service/excutive.service';
import { ExcutiveurlService } from '../../service/excutiveurl.service';

@Component({
  selector: 'app-caseitem',
  templateUrl: './caseitem.component.html',
  styleUrls: ['./caseitem.component.css']
})
export class CaseitemComponent implements OnInit {
  processHistory: any = [];
  complaintDetails: any;
  showComplaint = true;
  agendaData: any;
  downloadUrl: string;
  navigateObj = {
    agendaId: '',
    agendaStatus: ''
  };
  constructor(public router: Router, public route: ActivatedRoute,
    public helper:HelperService,
    public ecServices: ExcutiveService, public url: ExcutiveurlService,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(+params.id);
      console.log(+params.status);
      this.navigateObj = { 
        agendaId: params.id,
        agendaStatus: params.status
      }
      this.ecServices.getCaseItem(params.id).subscribe((result: any) => {
        console.log(result);
        if (result.length !== 0) {
          this.processHistory = result;
          this.complaintDetails = result[0].complaint;
        }
      }, error => {
        console.log(error);
        this.helper.errorMessage(error);
      });
    });
  }
  showDetails() {
    this.showComplaint = !this.showComplaint;
    this.complaintDetails.commentSections.forEach(element => {
      if (element.sectionAt === 'EXECUTIVECOMMITTEE') {
        element.comments = atob(element.comments).replace(/<[^>]*>/g, '');
      }
      // this.agendaData.push(element.sectionAt);
      // console.log(this.agendaData);
    });
    console.log(this.complaintDetails.workflowDocuments);
    if (this.complaintDetails.workflowDocuments) {
      this.complaintDetails.workflowDocuments.forEach(element => {
        const nameString = element.documentLocation;
        if (nameString !== null) {
          const filename = nameString.split('/').pop();
          // console.log(filename);
          element.documentLocation = filename;
        }
      });
    }
  }
  // Downloded Files 
  public download(id: any) {
    this.downloadUrl = this.url.documentUrl + '?uuid=' + id;
  }
}
