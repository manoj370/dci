import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  clarificationForm : FormGroup;
  decisionForm :FormGroup;
  constructor(public router : Router,public fb :FormBuilder) { }
  ngOnInit(): void {
    // Vaalidations
    this.clarificationForm =this.fb.group({
      subject: ['', Validators.compose([Validators.required])],
      clarification: ['', Validators.compose([Validators.required])],
    });
    this.decisionForm =this.fb.group({
      decision: ['', Validators.compose([Validators.required])],
    })
  }
// back button method
back(){
  this.router.navigate(['/main/internal/college/executiveCommittee/dashboard']);
  }
   // For Validations
   get f() { return this.clarificationForm.controls; 
  }
  get df() { return this.decisionForm.controls; 
  }


}
