declare var $: any;

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, DoCheck, OnInit } from '@angular/core';
import { appConstants } from 'src/app/common-service/const.model';
import { HelperService } from 'src/app/common-service/helper.service';
import { SignupService } from 'src/app/common-service/signup.service';
import { encryptionService } from '../../../app/common-service/cedService';
import { PasswordStrengthValidator } from '../../../app/usermgt/Models/pwdpolicy';
import { MustMatch } from 'src/app/usermgt/services/mustMatch';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, DoCheck {
  dispalyName: string;
  userName: string;
  previlizesList: any = [];
  selectedRole: any;
  userData: any;
  owner: string;
  totalSeconds: any = 0;
  intervalId: any;
  roleList: any;
  refreshToken: any;
  urlInfo: any;
  ecSidenav = [];
  ecSubsidenav = [];
  InsCell = [];
  travelAgent = [];
  showBread = false;
  changePasswordForm: FormGroup;
  eyeShowForConform = false;
  showConformPassword = false;
  showOldPassword = false;
  eyeShowForOld = false;
  showNewPassword = false;
  eyeShowForNew = false;
  constructor(public fb: FormBuilder, public router: Router, public signin: SignupService,
    public helper: HelperService, public ced: encryptionService, public appConst: appConstants, private toastrSvc: ToastrService) { }

  ngOnInit(): void {
    this.startTime();
    this.helper.sendDataToNotificationComponent(false);
    this.ecSidenav = this.appConst.ecSidenav;
    this.ecSubsidenav = this.appConst.ecSubsidenav;
    this.InsCell = this.appConst.InsCell;
    this.travelAgent = this.appConst.travelAgent;
    if ((!this.router.url.includes('/excu/ec/caseitem'))) {
      this.showBread = true;
    }
    this.owner = JSON.parse(sessionStorage.getItem('userInfo-usec')).useName;
    this.userData = JSON.parse(sessionStorage.getItem('userInfo-usec')).defaultRole;
    this.roleList = JSON.parse(sessionStorage.getItem('userInfo-usec')).rolesList;
    // this.dispalyName = this.userData.roleName;
    if (this.roleList.length !== 0) {
      this.roleList.forEach(element => {
        if (element.roleName === this.userData.roleName) {
          this.selectedRole = element.roleName;
          sessionStorage.setItem('selectedRole-usec', this.selectedRole);
          element.authorities.forEach(privi => {
            this.previlizesList.push(privi.authorityName);
          });
        }
      });
    }


    $('.sidebar-dropdown > a').click(() => {
      $('.sidebar-submenu').slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass('active')
      ) {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .parent()
          .removeClass('active');
      } else {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .next('.sidebar-submenu')
          .slideDown(200);
        $(this)
          .parent()
          .addClass('active');
      }
    });
    const x = window.matchMedia('(max-width: 762px)');
    this.myFunction(x);
    // tslint:disable-next-line: deprecation
    x.addListener(this.myFunction);
    this.changePasswordForm = this.fb.group({
      oldPwd: ['', Validators.compose([Validators.required])],
      newPwd: ['', Validators.compose([Validators.required, PasswordStrengthValidator, Validators.minLength(8)])],
      confirmNewPwd: ['', Validators.compose([Validators.required])]
    }, {
      validator: MustMatch('newPwd', 'confirmNewPwd')
    });
  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.dispalyName = sessionStorage.getItem('selectedRole-usec');

  }
  myFunction(x) {
    if (x.matches) { // If media query matches
      $('.page-wrapper').removeClass('toggled');
      $('#show-sidebar').click(() => {
        $('.page-wrapper').addClass('toggled');
      });

      $('#close-sidebar').click(() => {
        $('.page-wrapper').removeClass('toggled');
      });

    } else {
      $('.page-wrapper').addClass('toggled');
      $('#show-sidebar').click(() => {
        $('.page-wrapper').addClass('toggled');
      });

      $('#close-sidebar').click(() => {
        $('.page-wrapper').removeClass('toggled');
      });
    }
  }


  updateSeconds() {
    ++this.totalSeconds;
    this.stopTime();
  }

  startTime() {
    this.updateSeconds();
    this.intervalId = setInterval(() => {
      this.updateSeconds();
    }, 1000);
  }

  stopTime() {
    if (this.totalSeconds === 1100) {
      if (sessionStorage.getItem('userValue') !== null) {
        clearInterval(this.intervalId);
        this.refreshToken = this.ced.decryptingProcess('refresh-token');
        this.signin.getAccessTokenByRefreshToken(this.refreshToken).subscribe((res: any) => {
          this.ced.encryptingProcess('access-token', res.access_token);
          this.ced.encryptingProcess('refresh-token', res.refresh_token);
        });
      }
    }
  }
  // ROle Change
  roleSelected() {
    this.roleList.forEach(element => {
      if (element.roleName === this.selectedRole) {
        this.dispalyName = this.selectedRole;
        this.selectedRole = element.roleName;
        sessionStorage.setItem('selectedRole-usec', this.dispalyName);
        this.helper.sendNotification(this.dispalyName);
        this.router.navigate(['/main/internal/dashboard']);
        element.authorities.forEach(privi => {
          console.log(privi);
          // this.privilizeName = privi.authorityName;
          this.previlizesList.push(privi.authorityName);
        });
      }
    });
  }
  // reset
  reset() {
    this.changePasswordForm.reset();
  }
  // updatePassword
  updatePassword() {
    this.signin.checkCurrentpwd(this.changePasswordForm.value.oldPwd).subscribe((res: any) => {
      console.log(res.matches);
      if (res.matches === false) {
        this.toastrSvc.error('', 'Please Check Old Password');
        this.changePasswordForm.reset();
      } else {
        const obj = {
          "currentPassword": this.changePasswordForm.value.oldPwd,
          "newPassword": this.changePasswordForm.value.newPwd
        }
        console.log(obj);
        this.signin.changePassword(obj).subscribe((res: any) => {
          console.log(res);
          this.toastrSvc.success('', 'Password Changed Successfully');
        })
      }
    })
  }
  public eyeToggelForOldPassword() {
    this.showOldPassword = !this.showOldPassword;
    this.eyeShowForOld = !this.eyeShowForOld;
  }
  public eyeToggelForNewPassword() {
    this.showNewPassword = !this.showNewPassword;
    this.eyeShowForNew = !this.eyeShowForNew;
  }
  public eyeToggelForComformPassword() {
    this.showConformPassword = !this.showConformPassword;
    this.eyeShowForConform = !this.eyeShowForConform;
  }
  // Logout
  logout() {
    sessionStorage.clear();
    sessionStorage.clear();
    localStorage.clear();
  }

}
