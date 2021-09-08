import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlatformLocation } from '@angular/common';
import { appConstants } from '../common-service/const.model';
import { SignupService } from '../common-service/signup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { encryptionService } from '../../app/common-service/cedService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsgs: any;
  eyeShow = false;
  captchImage: any;
  getAllRoles: any;
  accessToken: any;
  submitted = false;
  loginFrom: FormGroup;
  showpassword = false;
  public date: any = new Date();
  @ViewChild('myInput') myInputVariable: ElementRef;

  constructor(public router: Router, public fb: FormBuilder, public toastr: ToastrService,
    public constValues: appConstants, public signin: SignupService,
    public location: PlatformLocation, public ced: encryptionService) {
    location.onPopState(() => {
      history.forward();
    });
  }

  ngOnInit(): void {
    this.generateCaptcha();
    sessionStorage.clear();
    this.errorMsgs = this.constValues.errorMsgs;
    // Login Form
    this.loginFrom = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      passsword: ['', Validators.required],
      captch: ['', Validators.required]
    });
  }
  get f() { return this.loginFrom.controls; } // Controls
  // Login
  login() {
    this.submitted = true;
    console.log(this.loginFrom.value);
    if (this.loginFrom.valid) {
      if (this.loginFrom.value.captch === this.captchImage) {
        this.signin.login(this.loginFrom.value.emailId, this.loginFrom.value.passsword, '').subscribe((loginData: any) => {
          console.log(loginData);
          if (loginData.access_token != null) {
            console.log(loginData.access_token, 'login acess');
            this.ced.encryptingProcess('access-token', loginData.access_token);
            this.ced.encryptingProcess('refresh-token', loginData.refresh_token);
            this.getLoginUserId();
          } else if (loginData.error_description === 'Bad credentials') {
            this.generateCaptcha();
            this.toastr.error('Bad credentials', 'Error', {
              timeOut: 3000
            });
          } else {
            this.generateCaptcha();
            sessionStorage.clear();
            this.toastr.error('User account is locked', 'Error', {
              timeOut: 3000
            });
          }
        }, error => {
          this.generateCaptcha();
          sessionStorage.clear();
          this.toastr.error('Enter Valid Details', 'Error', {
            timeOut: 3000
          });
          console.log(error);
          sessionStorage.clear();
        });
      } else {
        this.toastr.error('Enter Valid Captcha Image', 'Error', {
          timeOut: 3000
        });
      }
    } else {
      this.generateCaptcha();
      sessionStorage.clear();
    }
  }
  // Password Eye Icon
  eyeToggel() {
    this.showpassword = !this.showpassword;
    this.eyeShow = !this.eyeShow;
  }
  // Login User Id
  getLoginUserId() {
    this.signin.getLoginUserId().subscribe((result: any) => {
      console.log(result, 'result');
      const obj = {
        defaultRole: result.defaultRole,
        rolesList: result.roles,
        useName: result.firstName + ' ' + result.lastName,
        deg: result.designation,
        section: result.section,
        userId: result.userId,
      };


      sessionStorage.setItem('userInfo-usec', JSON.stringify(obj));
      sessionStorage.setItem('selectedRole-usec', result.defaultRole.roleName);    

      sessionStorage.setItem('firstname-usec', result.firstName);
      sessionStorage.setItem('email-Id', result.emailId);
      if (result.active === true) {
        if (result.roles !== null) {
          this.getAllRoles = result.roles;
          console.log(this.getAllRoles, ' this.getAllRoles');
          if (result.defaultRole.roleName === 'System Admin') {
            this.router.navigate(['/main']);
          } else if (result.defaultRole.roleName === 'Accounting_Finance_General') {
            this.router.navigate(['/main/internal/accfinace/dashboard']);
          }  else if ((result.defaultRole.roleName !== 'System Admin') &&
            (result.defaultRole.roleName !== 'Accounting_Finance_General')) {
            this.router.navigate(['/main/internal/dashboard']);
            sessionStorage.setItem('userId-usec', result.userId);
            sessionStorage.setItem('entityId-usec', result.entityMaster.entityMasterId);
          } else {
            this.toastr.warning('Invalid User', 'Error', {
              timeOut: 3000
            });
            this.generateCaptcha();
            sessionStorage.clear();
          }
        }
      } else {
        this.toastr.warning('User is Inactive', 'Error', {
          timeOut: 3000
        });
        this.generateCaptcha();
        sessionStorage.clear();
      }
    });
  }

  // Captch Image Executive Committee
  generateCaptcha() {
    const alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
      'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
      'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
    let i;
    for (i = 0; i < 4; i++) {
      var a = alpha[Math.floor(Math.random() * alpha.length)];
      var b = alpha[Math.floor(Math.random() * alpha.length)];
      var c = alpha[Math.floor(Math.random() * alpha.length)];
      var d = alpha[Math.floor(Math.random() * alpha.length)];
      var e = alpha[Math.floor(Math.random() * alpha.length)];
    }
    const code = a + '' + b + '' + '' + c + '' + d + '' + e;
    console.log(code);
    this.captchImage = code;
  }
}
