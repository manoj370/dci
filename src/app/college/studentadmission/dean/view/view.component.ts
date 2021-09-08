import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StudentAdmissionService } from '../../services/student-admission.service';
import { urlServices } from '../../services/studentAdmissionUrls';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  subscribe: Subject<any> = new Subject<any>();
  admissionid: any;
  studentdetails: any =[];
  docsarray: any = [];
  status: any;
  downloadUrl: string;
  obj: any;
  commentform:FormGroup;
  assigneecomments: string;
  commentbox: boolean;
  coursee: any;
  constructor(public tostar: ToastrService,public fb:FormBuilder,public router:Router,public activatedRoute: ActivatedRoute,public studentService: StudentAdmissionService, public urls: urlServices,) { }

  ngOnInit(): void {
    //Getting Id from dashboard  through url
    this.activatedRoute.params.subscribe((params: Params) => this.admissionid = params.id);
    this.getAdmissionById();
    // if(this.status === 'To_Be_Discharge'){
    //   this.showagreebtn =true;

    // }
    this.commentform=this.fb.group({
      'comment':['']
    })
  }
// back button method
back(){
this.router.navigate(['/main/internal/college/dean/studentsList']);
}
// Get Admission By Id
getAdmissionById() {
this.studentService.getStudentAdmissionByAdmissionID(this.admissionid).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
console.log(res);
this.studentdetails =res;
this.docsarray =this.studentdetails.studentDocuments;
this.status =this.studentdetails.studentStatus.statusName;
this.coursee=res.collegeCourseOfferedSepcialisation.course.courseName;
console.log(this.coursee);
},error=>{
  console.log(error);
});
}
// Download file method
public getDocumentId(data: any) {
  console.log(data.documentId, "id")
  this.downloadUrl = this.urls.documentUrl + '?uuid=' + data.documentId
 
}
checkbox(event){
  console.log(event);
  if(event === 'Yes'){
    this.status ='Agreed_To_Discharge'
    this.assigneecomments="";
    this.commentbox =false;
  }else{
    console.log('No APICALL')
    this.status ='Not_Agreed'
    console.log(this.status);
    this.commentbox =true;
   
  }
}
// updateStatus
updateStatus() {
  this.assigneecomments =this.commentform.value.comment;
  console.log(this.assigneecomments);
  this.studentService.updateStatus(this.admissionid,this.status,this.assigneecomments,this.obj).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
    console.log(res);
    this.tostar.success('Status Updated Successfully', 'Success', {
      timeOut: 2000
    });
    this.getAdmissionById();
  }, error => {
    console.log(error);
    this.tostar.error('Status Not Updated', 'Error', {
      timeOut: 2000
    });
  })
}
 // Destroy The Subscribe Dta
 ngOnDestroy() {
  this.subscribe.next();
  this.subscribe.complete();
}
}

