
declare var $: any;
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { MustMatch } from '../services/mustMatch';
import { createUser } from '../Models/createuser';
import { assignRole } from '../Models/assignRoleModel';
import { ActivatedRoute, Router } from '@angular/router';
import { UsrmgtService } from '../services/usrmgt.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { customizeformValidation } from '../services/customizeFormValidation.service';
import { PasswordStrengthValidator } from '../Models/pwdpolicy';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit, OnDestroy {
  // emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(public usrmgtService: UsrmgtService, public fb: FormBuilder, public route: Router,
    public tostar: ToastrService, public validation: customizeformValidation, public router: ActivatedRoute) {

    this.addUserForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      middleName: [''],
      lastName: [''],
      emailId: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      userName: [],
      password: ['', Validators.compose([Validators.required,
        PasswordStrengthValidator, Validators.minLength(8)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])],
      pincode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{5}')])],
      addressline1: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-/]*$/)])],
      addressline2: ['', Validators.compose([Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-]*$/)])],
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      organisation: ['', Validators.compose([Validators.required])],
      section: [''],
      userType: [''],
      designation: [''],
      conformPassword: ['', Validators.required],

    }, {
      validator: MustMatch('password', 'conformPassword')
    });
    this.ResetPasswordForm = this.fb.group({
      resetPassword: ['', Validators.compose([Validators.required, PasswordStrengthValidator,
      Validators.minLength(8), Validators.maxLength(16)])],
      resetConformPassword: ['', Validators.required],
    }, {
      validator: MustMatch('resetPassword', 'resetConformPassword')
    });

  }
  public assignRolesObj: assignRole;
  addUserForm: FormGroup;
  public createuserobj: createUser = new createUser();
  showSectionDropDown: boolean;
  uerid: any;
  uerId: any;
  showUpdateButtonForUser = false;
  response: any;
  addressId: any;
  citiesList: any;
  designData: any;
  entitySelectedData: any;
  sectionIds: any;
  stateIds: any;
  cityId: any;
  userId: any;
  statesList: any;
  entityId: any;
  countries: any;
  entityMaster: any;
  sectionId: any;
  designationIdd: any;
  showpassword = false;
  eyeShow = false;
  showConformPassword = false;
  eyeShowForConform = false;
  showAssigRole = true;
  UserName: any;
  names: any[];
  roleIdss: any[];
  getroleIdFormBackEnd: any;
  getDefaultRoleFromBackEnd: any;
  showSaveButtonForDefaultRole: boolean;
  allRoles: any = [];
  roleNames: any;
  seletedRoles: any;
  defaultRoleId: any;
  showRole: boolean;
  checkActiveStatus: any;
  showStatusButtons: boolean;
  showStatusTab = true;
  enabled: boolean;
  userEmailId: any;
  userName: any;
  showAssignRolesTab = false;
  showConfirmPasswordButtons: boolean;
  showPasswordTab = true;
  ResetPasswordForm: FormGroup;
  showGraduation = true;
  showUser: boolean;
  subscribe: Subject<any> = new Subject<any>();


  ngOnInit(): void {
    $('#accordion').on('hide.bs.collapse show.bs.collapse', (e) => {
      $(e.target).prev().find('i:last-child').toggleClass('fa-minus  fa-plus ');
    });
    this.GetCalls();
    const id = this.router.snapshot.params.key;
    if (id !== undefined) {
      this.userId = id;
      this.showUpdateButtonForUser = true;
      this.showAssignRolesTab = true;
      this.getUserDetails(this.userId);
      this.getAllAssignRoles(this.userId);
    } else {
      this.showUpdateButtonForUser = false;
      this.showUser = true;
    }
    this.getEntityMaster();
    this.getAllCountries();
  }

  // Get User Data For Get Roles
  GetCalls() {
    this.usrmgtService.getRoles().pipe(takeUntil(this.subscribe)).subscribe((rolesData: any) => {
      console.log(rolesData, 'rolesData');
      this.allRoles = rolesData;
      // this.prvilizesList={
      // }
    }, error => {
      // console.log(error);
    });

  }
  assignRolesRefresh() {
    this.GetCalls();
    this.names = [];
  }
  // Preparing User Object
  preparecreateobj() {
    const formModel = this.addUserForm.value;
    console.log(formModel);
    this.createuserobj.emailId = formModel.emailId;
    this.createuserobj.entityMaster.entityMasterId = formModel.organisation;
    this.createuserobj.firstName = formModel.firstName;
    this.createuserobj.gender = true;
    this.createuserobj.lastName = formModel.lastName;
    this.createuserobj.middleName = formModel.middleName;
    this.createuserobj.emailId = formModel.emailId;
    this.createuserobj.password = formModel.password;
    this.createuserobj.phoneNumber = formModel.phoneNumber;
    this.createuserobj.userAddress.city = formModel.city;
    this.createuserobj.userAddress.country = formModel.country;
    this.createuserobj.userAddress.landmark = '';
    this.createuserobj.userAddress.line1 = formModel.addressline1;
    this.createuserobj.userAddress.line2 = formModel.addressline2;
    this.createuserobj.userAddress.state = formModel.state;
    this.createuserobj.userAddress.zipCode = formModel.pincode;
    if (formModel.section) {
      this.createuserobj.section.sectionId = formModel.section;
    } else {
      this.createuserobj.section.sectionId = 0;
    }
    this.createuserobj.userTypeMaster.userTypeId = 0;
    if (formModel.designation) {
      this.createuserobj.designation.designationId = formModel.designation;
    } else {
      this.createuserobj.designation.designationId = 0;
    }

  }
  // Submiting User
  createUser() {
    this.preparecreateobj();
    console.log(this.createuserobj, 'check,check');
    this.usrmgtService.createUser(this.createuserobj).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.showSectionDropDown = false;
      if (res.response.message === 'User with Provided EmailId or Phone number already exists') {
        this.tostar.warning('EmailId or Phone Number Is Already Exists', 'Warning', {
          timeOut: 2000
        });
      } else {
        this.clearValidations();
        this.route.navigate(['/main/internal/usrmgt/internalApp']);
        sessionStorage.setItem('check-usec', 'ManageUser');
        this.tostar.success('User Created Succesfully', 'Success', {
          timeOut: 2000
        });
      }
    }, error => {
      console.log(error);
      this.tostar.error('Error', 'Error', {
        timeOut: 3000
      });
    });
  }
  // Update User
  updateUser() {
    const formModel = this.addUserForm.value;
    console.log(formModel);
    this.createuserobj.emailId = formModel.emailId;
    this.createuserobj.entityMaster.entityMasterId = formModel.organisation;
    this.createuserobj.firstName = formModel.firstName;
    this.createuserobj.gender = true;
    this.createuserobj.lastName = formModel.lastName;
    this.createuserobj.middleName = formModel.middleName;
    this.createuserobj.emailId = formModel.emailId;
    this.createuserobj.password = formModel.password;
    this.createuserobj.phoneNumber = formModel.phoneNumber;
    this.createuserobj.userAddress.city = formModel.city;
    this.createuserobj.userAddress.country = formModel.country;
    this.createuserobj.userAddress.landmark = '';
    this.createuserobj.userAddress.line1 = formModel.addressline1;
    this.createuserobj.userAddress.line2 = formModel.addressline2;
    this.createuserobj.userAddress.state = formModel.state;
    this.createuserobj.userAddress.zipCode = formModel.pincode;
    this.createuserobj.userId = this.userId;
    this.createuserobj.active = true;
    this.createuserobj.userAddress.addressId = this.addressId;
    if (formModel.section) {
      this.createuserobj.section.sectionId = formModel.section;
    } else {
      this.createuserobj.section.sectionId = 0;
    }
    this.createuserobj.userTypeMaster.userTypeId = 0;
    if (formModel.designation) {
      this.createuserobj.designation.designationId = formModel.designation;
    } else {
      this.createuserobj.designation.designationId = 0;
    }
    this.usrmgtService.updateUser(this.createuserobj).pipe(takeUntil(this.subscribe)).subscribe(res => {
      // this.GetCalls();
      sessionStorage.setItem('check-usec', 'true');
      this.tostar.success('User Updated Succesfully', 'Success', {
        timeOut: 2000
      });
      this.clearValidations();
      this.route.navigate(['/main/internal/usrmgt/internalApp']);
      // sessionStorage.setItem("check-usec", "ManageUser")
    }, error => {
      this.tostar.error('Error', 'Error', {
        timeOut: 3000
      });
    });
  }

  // get User Details by UserId
  getUserDetails(id) {
    this.usrmgtService.getUserByUserId(id).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      console.log(res, 'update Educational Details.active');
      this.response = res;
      this.checkActiveStatus = res.active;
      this.userEmailId = res.emailId;
      this.userName = res.name;
      this.addressId = this.response.addresses[0].addressId;
      this.getStates(this.response.addresses[0].country);
      this.getCities(this.response.addresses[0].state);

      this.addUserForm.patchValue({
        firstName: this.response.firstName,
        middleName: this.response.middleName,
        lastName: this.response.lastName,
        emailId: this.response.emailId,
        userName: [],
        phoneNumber: this.response.phoneNumber,
        pincode: this.response.addresses[0].zipCode,
        addressline1: this.response.addresses[0].line1,
        addressline2: this.response.addresses[0].line2,
        country: this.response.addresses[0].country,
        state: this.response.addresses[0].state,
        city: this.response.addresses[0].city,
        organisation: this.response.entityMaster.entityMasterId
      });

      this.entitySelection(this.response.entityMaster.entityMasterId);
      if (this.response.section != null) {
        this.addUserForm.patchValue({
          section: this.response.section.sectionId,
        });
        this.sectionId = this.response.section.sectionId;
      } else {
        this.addUserForm.patchValue({
          section: '',
        });
      }
      if (this.response.designation != null) {
        this.addUserForm.patchValue({
          designation: this.response.designation.designationId,
        });
        this.designationIdd = this.response.designation.designationId;
      } else {
        this.addUserForm.patchValue({
          designation: '',
        });
      }
    }, error => {
      // console.log(error);
    });
  }
  // Get States
  getStates(value) {
    console.log(value, 'value');
    this.usrmgtService.getAllStates(value).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res, 'all states sss');
      this.statesList = res;
    }, error => {
      console.log(error);
    });
  }
  // getCities
  getCities(value) {
    console.log(value);
    this.usrmgtService.getAllCities(value).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.citiesList = res;
    }, error => {
      console.log(error);
    });
  }
  // Get Data For For Both Section Dropdown and Designation Dropdown
  entitySelection(data: any) {
    this.entityId = data;
    if (this.entityId == 10) {
      this.showSectionDropDown = true;
    } else {
      this.showSectionDropDown = false;
    }
    this.usrmgtService.getAllSectionByEntityMaster(data).pipe(takeUntil(this.subscribe)).subscribe((entitySelectedData: any) => {
      console.log(entitySelectedData, 'entitySelectedData');
      this.entitySelectedData = entitySelectedData;
    }, error => {
    });
    this.usrmgtService.getAllDesignationByEntityMaster(data).pipe(takeUntil(this.subscribe)).subscribe((desSelectedData: any) => {
      this.designData = desSelectedData;
    }, error => {
    });
  }
  // getAllCountries
  getAllCountries() {
    this.usrmgtService.getAllCountrie().pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res);
      this.countries = res;
    }, error => {
      console.log(error);
    });
  }
  getEntityMaster() {
    this.usrmgtService.getEntityMaster().pipe(takeUntil(this.subscribe)).subscribe((entityData: any) => {
      this.entityMaster = entityData;
    }, error => {
    });
  }
  // Reset UserForm
  clearValidations() {
    this.addUserForm.reset();
    this.addUserForm.controls.designation.setValue('', { onlySelf: true });
    // this.addUserForm.controls.userType.setValue('', { onlySelf: true });
    this.addUserForm.controls.organisation.setValue('', { onlySelf: true });
    this.addUserForm.controls.section.setValue('', { onlySelf: true });
    this.addUserForm.controls.country.setValue('', { onlySelf: true });
    this.addUserForm.controls.state.setValue('', { onlySelf: true });
    this.addUserForm.controls.city.setValue('', { onlySelf: true });
  }
  // Going Back To User-Managemennt List
  getBackUserManagment() {
    this.route.navigate(['/main/internal/usrmgt/internalApp']);
    sessionStorage.setItem('check-usec', 'ManageUser');
  }
  /**
* eyeToggel
*/
  public eyeToggel() {
    this.showpassword = !this.showpassword;
    this.eyeShow = !this.eyeShow;
  }
  /**
   * eyeToggelForComform
   */
  public eyeToggelForComformPassword() {
    this.showConformPassword = !this.showConformPassword;
    this.eyeShowForConform = !this.eyeShowForConform;
  }
  // Get DesignationID
  designationId(value) {
    this.designationIdd = value;
  }
  // Get Section Id
  SectionId(value) {
    this.sectionId = value;
  }
  // Check Validation For Only Numeric Value
  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  UserDetails(data) {
    switch (data) {
      case 'User':
        this.showGraduation = false;
        this.showUser = true;
        this.showRole = false;
        this.showAssigRole = true;
        this.showStatusButtons = false;
        this.showStatusTab = true;
        this.showConfirmPasswordButtons = false;
        this.showPasswordTab = true;
        break;
      case 'assignRoles':
        this.showRole = true;
        this.showAssigRole = false;
        this.showGraduation = true;
        this.showUser = false;
        this.showStatusButtons = false;
        this.showStatusTab = true;
        this.showConfirmPasswordButtons = false;
        this.showPasswordTab = true;
        break;
      case 'status':
        this.showStatusButtons = true;
        this.showStatusTab = false;
        this.showRole = false;
        this.showAssigRole = true;
        this.showGraduation = true;
        this.showUser = false;
        this.showConfirmPasswordButtons = false;
        this.showPasswordTab = true;
        break;
      case 'Password':
        this.showStatusButtons = false;
        this.showStatusTab = true;
        this.showRole = false;
        this.showAssigRole = true;
        this.showGraduation = true;
        this.showUser = false;
        this.showConfirmPasswordButtons = true;
        this.showPasswordTab = false;
    }
  }
  // Assign Role
  getAllAssignRoles(data) {
    console.log(data, 'Data');
    this.names = [];
    this.roleIdss = [];
    this.usrmgtService.getRoles().subscribe((rolesData: any) => {
      this.allRoles = rolesData;
      this.usrmgtService.getUserByUserDetailsId(data).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
        this.getroleIdFormBackEnd = res.roles;
        this.getDefaultRoleFromBackEnd = res.defaultRole;
        this.defaultRoleId = res.defaultRole.roleId;
        if (this.getroleIdFormBackEnd.length != 0 && this.getDefaultRoleFromBackEnd != null) {
          this.allRoles.forEach(element => {
            console.log( this.names)
            this.getroleIdFormBackEnd.forEach(element1 => {
              if (element.roleId == element1.roleId) {
                element.checked = true;
                this.names.push({ rolename: element.roleName, roleId: element.roleId.toString() });
                this.roleIdss.push(element.roleId.toString());
              }
              if (element.roleId == this.getDefaultRoleFromBackEnd.roleId) {
                this.names.forEach(element => {
                  element.checked = true;
                });
              }
            });
          });
        }
      });
    }, error => {
    });

  }
  selectedRoles(data: any) {
    this.seletedRoles = data.target.value.toString();
    if (data.target.checked) {
      this.roleIdss.push(this.seletedRoles);
      this.allRoles.forEach(element => {
        if (element.roleId == this.seletedRoles) {
          this.roleNames = element.roleName;
          this.names.push({ rolename: this.roleNames, roleId: element.roleId.toString() });
        }
      });
    } else {
      this.roleIdss.forEach((item, index) => {
        if (item === this.seletedRoles) { this.roleIdss.splice(index, 1); }
      });
      this.names.forEach((item, index) => {
        if (item.roleId === this.seletedRoles) { this.names.splice(index, 1); }

      });
      console.log(this.names);
      this.names.forEach(element => {
        if (element.roleId != this.defaultRoleId) {
          this.showSaveButtonForDefaultRole = false;
        }
      });
    }

  }
  // Getting Role Data By RoleId
  getingRoleId(data) {
    this.defaultRoleId = data.target.value;
    if (this.defaultRoleId != null) {
      this.showSaveButtonForDefaultRole = true;
    }
  }
  // Assign Roles To User
  assignRole() {
    this.assignRolesObj = new assignRole();
    this.roleIdss.forEach(element => {
      this.assignRolesObj.roles.push(
        {
          roleId: element
        }
      );
    });
    this.assignRolesObj.userId = this.userId;
    this.assignRolesObj.defaultRole.roleId = this.defaultRoleId;
    if (this.assignRolesObj.defaultRole.roleId != null) {
      this.usrmgtService.assiognRole(this.assignRolesObj).pipe(takeUntil(this.subscribe)).subscribe((allUserTypes: any) => {
        // this.GetCalls()
        // this.names = []
        // this.roleIdss = []
        this.tostar.success('Role Assigned  Succesfully', 'Success', {
          timeOut: 2000
        });
      }, error => {
        this.tostar.error('Error', 'Error', {
          timeOut: 3000
        });
      });
    } else {
      this.tostar.warning('Select Default Role ', 'Warning', {
        timeOut: 3000
      });
    }


  }
  // Getting Data From Button
  ActiveTheuser() {
    this.enabled = false;
    this.activeTheUser();
  }
  // Getting Data From Button
  inActiveTheuser() {
    this.enabled = true;
    this.inactiveUser();
  }
  // Submiting InActive User Data
  inactiveUser() {
    const obj = {
      username: this.userEmailId,
      enabled: this.enabled,
    };
    this.usrmgtService.inActiveUser(obj).pipe(takeUntil(this.subscribe)).subscribe(response => {
      this.getUserDetails(this.userId);
      this.tostar.error('User Inactivated successfully', 'Inactive', {
        timeOut: 2000
      });
      this.GetCalls();
    });
  }
  // Submiting Active User Data
  activeTheUser() {
    const obj = {
      username: this.userEmailId,
      enabled: this.enabled,
    };
    this.usrmgtService.inActiveUser(obj).pipe(takeUntil(this.subscribe)).subscribe(response => {
      this.getUserDetails(this.userId);
      this.tostar.success('User activated successfully', 'Success', {
        timeOut: 2000
      });
      this.GetCalls();
    });
  }
  // Reset Password
  resetPassword() {
    const resetObj = {
      userId: this.userId,
      newPassword: this.ResetPasswordForm.get('resetPassword').value
    };
    this.usrmgtService.restePassword(resetObj).pipe(takeUntil(this.subscribe)).subscribe((response: any) => {
      this.tostar.success('Password Reset Successfully', 'success', {
        timeOut: 2000
      });
      this.ResetPasswordForm.reset();
    });
  }


  // Unsubscribe The APi cALls Data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
