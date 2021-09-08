

import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { createUser } from '../Models/createuser';
import { MustMatch } from '../services/mustMatch';
import { privilliges } from '../Models/privilliges';
import { assignRole } from '../Models/assignRoleModel';
import { showPrivilizes } from '../Models/showPrivillages';
import { UsrmgtService } from '../services/usrmgt.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { customizeformValidation } from '../services/customizeFormValidation.service';

@Component({
  selector: 'app-usr-mgt',
  templateUrl: './usr-mgt.component.html',
  styleUrls: ['./usr-mgt.component.css']
})

export class UsrMgtComponent implements OnInit, OnDestroy {
  allUsersList: any;
  allGroups: any;
  allRoles: any;
  allPrevilizes: any;
  searchGroup: any;
  prvilizesList: any;
  searchForm: FormGroup;
  searchinput: any;
  addRoleForm: FormGroup;
  addUserForm: FormGroup;
  groupRowId = 0;
  groupPageid = 10;
  groupPageCount: any;
  privillageRowId = 10;
  privillagePageid = 0;
  privillagePageCount: any;
  entityMaster: any;
  entitySelectedData: any = [];
  allUserTypes: any = [];
  designData: any = [];
  userIdvalue: any;
  seletedRoles: any;
  privillagesAllData: any;
  groupListForDropDown: any;
  getALLRoles: any;
  roleId: any;
  showUpdateButtonForRole = false;
  showUpdateButtonForUser = false;
  sectionId: any;
  entityId: any;
  userTypeId: any;
  designationIdd: any;
  // dropdownSettings: IDropdownSettings;
  roleRowId = 10;
  rolePage = 0;
  rolePageCount: any;
  getRoleData: any;

  disableNextButton = false;
  disablePreviousButton = true;
  public pageid: any = 0;
  public rowid: any = 10;
  responsePageCount: number;
  pageCount = 1;
  roleNames: any;
  names: any = [];
  roleIdss: any = [];
  privilligesArray = [];
  authorityId: any;
  roleIdForBackEnd: any;
  public privillagesObj: privilliges;
  roleNameForBackEnd: any;
  defaultRoleId: any;
  public assignRolesObj: assignRole;
  public groupRow = 10;
  public groupPage = 0;
  public groupPageCounts: any = 1;
  public responseGroupPageCount: any;
  disableGroupNextButton = false;
  disableGroupPreviousButton = true;
  public roleRow = 10;
  public rolePageId = 0;
  public rolePageCounts: any = 1;
  public responseRolePageCount: any;
  disableRoleNextButton = false;
  disableRolePreviousButton = true;
  public priviliageRow = 10;
  public priviliagePageId = 0;
  public priviliagePageCounts: any = 1;
  public responsePriviliagePageCount: any;
  disablePriviliageNextButton = false;
  disablePriviliagePreviousButton = true;
  adult: any;
  // public assignRolesObj: assignRole = new assignRole()
  active: boolean;
  response: any;
  userid: any;
  getroleIdFormBackEnd: any;
  getDefaultRoleFromBackEnd: any;
  addressId: any;
  obj: any;
  searchUserForm: FormGroup;
  pushSaveData: any = [];
  roleDropdownSearch: FormGroup;
  countries: any = [];
  statesList: any = [];
  citiesList: any = [];
  // creating obj
  public createuserobj: createUser = new createUser();
  getAllPrivillagesById: any;
  assignGroupName: any;
  allPrevilizesByRoleId: any;
  arrayDataOfPrivillizes: any = [];
  onlyValuesArray: any = [];
  userId: any;
  stateId: any;
  public showPrivilizesObj: showPrivilizes;
  userEmailId: any;
  userName: any;
  showSaveButtonForDefaultRole: boolean;
  showpassword = false;
  eyeShow = false;
  showConformPassword = false;
  eyeShowForConform = false;
  status: any;
  showSectionDropDown = false;
  UserName: any;
  enabled: boolean;
  searchUserPaginationTrue: boolean;
  stateIds: any;
  totalSeconds: any;
  intervalId: NodeJS.Timeout;
  cityId: any;
  sectionIds: any;
  searchInputForRole: any;
  coinwallet: string[] = ['Group', 'Privileges', 'Roles', 'Roles & Privileges', 'Manage Users'];
  selectedwallet = this.coinwallet[0];
  searchStatusPagination: boolean;
  subscribe: Subject<any> = new Subject<any>();

  constructor(public usrmgtService: UsrmgtService, public fb: FormBuilder, public tostar: ToastrService,
    public validation: customizeformValidation, public route: Router) {
    this.searchForm = this.fb.group({
      searchvalue: ['']
    });
    this.addRoleForm = this.fb.group({
      roleName: ['', Validators.required],
      roleDescription: ['', Validators.required]
    });
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      middleName: ['', Validators.compose([])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      emailId: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z.@0-9]*$/)])],
      userName: [],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      pincode: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      addressline1: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-/]*$/)])],
      addressline2: ['', Validators.compose([Validators.pattern(/^[a-zA-Z[0-9:;,._\s#&()-]*$/)])],
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      organisation: ['', Validators.compose([Validators.required])],
      section: ['',],
      userType: ['',],
      designation: ['',],
      conformPassword: ['', Validators.required],


    }, {
      validator: MustMatch('password', 'conformPassword')
    }),
      this.searchUserForm = this.fb.group({
        organisation: [''],
        section: [''],
        status: [''],

      });
    this.roleDropdownSearch = this.fb.group({
      roleSearchForm: ['']
    });
  }
  ngOnInit() {
    this.GetCalls();
    this.getAllUserTypes();
    this.getEntityMaster();
    this.getAllCountries();
    this.changeAllPrivillagesByRole();
    console.log(this.coinwallet[0], ' this.coinwallet[0]');
    if (sessionStorage.getItem('check-usec') === 'ManageUser') {
      this.selectedwallet = this.coinwallet[4];
    }

  }

  GetCalls() {
    // Get all Users in manage use vbgrrs tab
    this.usrmgtService.getAllUsers(this.pageid, this.rowid).pipe(takeUntil(this.subscribe)).subscribe((secData: any) => {
      console.log(secData, 'sec');
      if (secData.lenth !== 0) {
        this.allUsersList = secData;
        this.responsePageCount = this.allUsersList[0].pageCount;
        this.searchUserPaginationTrue = false;
        this.searchStatusPagination = false;
      } else {
        this.allUsersList = [];
      }
    }, error => {
      console.log(error);
    });
    // Get All Roles In assign Roles Tab
    this.usrmgtService.getRoles().subscribe((rolesData: any) => {
      this.allRoles = rolesData;
    }, error => {
    });

    // Get All Groups For Groups Tab
    this.usrmgtService.getGroups(this.groupPage, this.groupRow).pipe(takeUntil(this.subscribe)).subscribe((grpData: any) => {
      console.log(grpData, 'getAll Gropus');
      this.allGroups = grpData;
      this.responseGroupPageCount = this.allGroups[0].pageCount;
    }, error => {
    });
    // Get All Roles List For Roles Tab
    this.usrmgtService.getAllRoles(this.rolePageId, this.roleRow).pipe(takeUntil(this.subscribe)).subscribe((getAllRoles: any) => {
      this.getALLRoles = getAllRoles;
      this.responseRolePageCount = this.getALLRoles[0].pageCount;
    }, error => {
    });
  }
  // Search For  Group Data
  searchData() {
    const formModel = this.searchForm.value;
    this.searchinput = formModel.searchvalue;
    if (this.searchinput.length >= 1) {
      this.usrmgtService.groupSearch(this.searchinput, 0, 15).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      }, error => {
      });
    } else {
    }
  }
  // Search For Privileges Data
  searchPrivilegesData() {
    const formModel = this.searchForm.value;
    this.searchinput = formModel.searchvalue;
    if (this.searchinput.length >= 1) {
      this.usrmgtService.privilegesSearch(this.searchinput, this.priviliagePageId, this.priviliageRow)
        .pipe(takeUntil(this.subscribe)).subscribe(res => {
          this.privillagesAllData = res;
          if (this.privillagesAllData.length == 0) {
            this.tostar.warning('Not Data Found', 'Error', {
              timeOut: 2000
            });
          }
          this.responsePriviliagePageCount = this.privillagesAllData[0].pageCount;

        }, error => {
        });
    } else {
      this.GetCalls();
    }

  }
  // Search For Roles Data In Roles Tab
  searchRolesData() {
    const formModel = this.searchForm.value;
    this.searchinput = formModel.searchvalue;
    console.log(this.searchinput.toUpperCase(), '.toUpperCase()');
    this.searchInputForRole = this.searchinput.toUpperCase();
    if (this.searchinput.length >= 1) {

      this.usrmgtService.rolesSearch(this.searchInputForRole, this.groupRowId, this.groupPageid)
        .pipe(takeUntil(this.subscribe)).subscribe(res => {
          this.getALLRoles = res;
          if (this.getALLRoles.length === 0) {
            this.responseRolePageCount = 0;
          } else {
            this.responseRolePageCount = this.getALLRoles[0].pageCount;
          }
        }, error => {
        });

    } else {
      this.GetCalls();
    }
  }
  // Search For Users Data In Manage User Tab
  searchUsersData() {
    const formModel = this.searchForm.value;
    this.searchinput = formModel.searchvalue;
    if (this.searchinput.length >= 1) {
      this.usrmgtService.usersSearch(this.searchinput, this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
          console.log(res);
          if (res.length !== 0) {
            this.allUsersList = res;
            if (this.allUsersList.length == 0) {
              this.tostar.warning('Not Data Found', 'Error', {
                timeOut: 2000
              });
            }
            this.responsePageCount = this.allUsersList[0].pageCount;
            this.searchUserPaginationTrue = true;
            this.searchStatusPagination = false;
          } else {
            this.allUsersList = [];
            this.responsePageCount = 0;
          }
          // this.pageid=0;
        }, error => {
        });

    } else {
      this.GetCalls();
    }
  }

  // For Adding Or Creating Role
  createRole() {
    const obj = {
      remarks: this.addRoleForm.get('roleDescription').value,
      roleName: this.addRoleForm.get('roleName').value,

    };
    console.log(obj);
    if (this.addRoleForm.get('roleDescription').value.trim() == 0 || this.addRoleForm.get('roleName').value.trim() == 0) {
      this.addRoleForm.reset();
      this.tostar.warning('Enter Details', 'Warning', {
        timeOut: 2000
      });
    } else {
      this.usrmgtService.createRole(obj).pipe(takeUntil(this.subscribe)).subscribe(res => {
        console.log(res, 'Role Response');
        if (res.response.message == 'Role with Provided Name already exists') {
          this.tostar.warning('Role with Provided Name already exists', 'Warning', {
            timeOut: 2000
          });
        } else {
          this.tostar.success('Role Created Succesfully', 'Success', {
            timeOut: 2000
          });
        }
        this.GetCalls();
        this.addRoleForm.reset();

      }, error => {
        // //console.log(error);
        this.tostar.error('Error', 'Error', {
          timeOut: 3000
        });
      });
    }

  }
  // Get Data For For Both Section Dropdown and Designation Dropdown
  entitySelection(data: any) {
    this.entityId = data;
    if (this.entityId == 10) {
      this.showSectionDropDown = true;
    } else {
      this.showSectionDropDown = false;
    }
    // List Of Data For Section DropDown
    this.usrmgtService.getAllSectionByEntityMaster(data).pipe(takeUntil(this.subscribe)).subscribe((entitySelectedData: any) => {
      console.log(entitySelectedData, 'entitySelectedData');
      this.entitySelectedData = entitySelectedData;
    }, error => {
    });
    // List Of Data For DesignationDropDown DropDown
    this.usrmgtService.getAllDesignationByEntityMaster(data).pipe(takeUntil(this.subscribe)).subscribe((desSelectedData: any) => {
      this.designData = desSelectedData;
    }, error => {
    });
  }
  getEntityMaster() {
    this.usrmgtService.getEntityMaster().pipe(takeUntil(this.subscribe)).subscribe((entityData: any) => {
      // console.log(entityData);
      this.entityMaster = entityData;
      // console.log(this.entityMaster);
    }, error => {
      // console.log(error);
    });
  }

  // Get Data For User DropDown
  getAllUserTypes() {
    this.usrmgtService.getAllUserTypes().pipe(takeUntil(this.subscribe)).subscribe((allUserTypes: any) => {
      this.allUserTypes = allUserTypes;
    }, error => {
    });
  }
  // While Changing The Designation DropDown  Geting The Id
  designationId(value) {
    this.designationIdd = value;
  }
  // While Changing The Section DropDown  Geting The Id
  SectionId(value) {
    this.sectionId = value;
  }
  // While Changing The UseType DropDown  Geting The Id
  userTypeIdd(value) {
    this.userTypeId = value;
    // console.log(this.userTypeId);
  }


  // Next Button Goup Pagnation
  groupTableNextButton() {
    if (this.groupRowId + 1 <= this.groupPageCount - 1) {
      ++this.groupRowId;
      // console.log(this.groupRowId);
      this.usrmgtService.getGroups(this.groupRowId, this.groupPageid).pipe(takeUntil(this.subscribe)).subscribe((grpData: any) => {
        // console.log(grpData);
        this.allGroups = grpData;
      }, error => {
        // console.log(error);
      });
    }
  }
  // previous Button Goup Pagnation
  groupTablePreviousButton() {
    if (this.groupRowId >= 1) {
      --this.groupRowId;
      // console.log(this.groupRowId);
      this.usrmgtService.getGroups(this.groupRowId, this.groupPageid).pipe(takeUntil(this.subscribe)).subscribe((grpData: any) => {
        // console.log(grpData);
        this.allGroups = grpData;

      }, error => {
        // console.log(error);
      });
    }
  }
  // Next Button For User Pagination
  onBtnNext() {
    debugger;
    this.disablePreviousButton = false;
    this.disableNextButton = false;
    this.pageCount++;
    if (this.pageCount === this.responsePageCount) {
      this.disableNextButton = true;
      this.disablePreviousButton = false;
    } else if (this.pageCount >= this.responsePageCount) {
      this.pageCount--;
      this.disableNextButton = true;
      this.disablePreviousButton = true;
      this.pageid = this.pageid - 1;
    } else {
      this.disableNextButton = false;
      this.disablePreviousButton = false;
    }
    this.allUsersList = [];
    this.pageid = this.pageid + 1;
    console.log(this.pageid);
    if (this.searchUserPaginationTrue === true) {
      this.usrmgtService.usersSearch(this.searchinput, this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          // console.log(res);
          this.allUsersList = res;
          if (this.allUsersList.length == 0) {
            this.tostar.warning('Not Data Found', 'Error', {
              timeOut: 2000
            });
          }
          // this.responsePageCount = this.allUsersList[0].pageCount;
          // this.searchUserPaginationTrue = true
        }, error => {
          // console.log(error);
        });
    } else if (this.searchStatusPagination === true) {
      this.usrmgtService.filterWithRoleOrUsertype(this.pageid, this.rowid, this.obj)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          // console.log(res);
          if (res.length == 0) {
            this.tostar.warning('Not Data Found', 'Error', {
              timeOut: 2000
            });
            this.clearFilterSearch();
          }
          this.allUsersList = res;
          this.showSectionDropDown = false;
          this.responsePageCount = this.allUsersList[0].pageCount;
          // this.allRoles="selected"
          this.clearFilterSearch();

        }, error => {
          // console.log(error);
        });
    } else {
      this.usrmgtService.getAllUsers(this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe))
        .subscribe((secData: any) => {
          this.allUsersList = secData;
        }, error => {
        });

    }

  }
  // Previous Button For User Pagination
  onBtnnPrevious() {
    this.disableNextButton = false;
    this.pageCount--;
    if (this.pageCount === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
    this.pageid = this.pageid - 1;
    this.allUsersList = [];
    if (this.searchUserPaginationTrue === true) {
      this.usrmgtService.usersSearch(this.searchinput, this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          this.allUsersList = res;
          if (this.allUsersList.length == 0) {
            this.tostar.warning('Not Data Found', 'Error', {
              timeOut: 2000
            });
          }

        }, error => {
        });
    } else if (this.searchStatusPagination === true) {
      this.usrmgtService.filterWithRoleOrUsertype(this.pageid, this.rowid, this.obj)
        .pipe(takeUntil(this.subscribe))
        .subscribe(res => {
          if (res.length == 0) {
            this.tostar.warning('Not Data Found', 'Error', {
              timeOut: 2000
            });
            this.clearFilterSearch();
          }
          this.allUsersList = res;
          this.showSectionDropDown = false;
          this.responsePageCount = this.allUsersList[0].pageCount;
          this.clearFilterSearch();

        }, error => {
        });
    } else {
      this.usrmgtService.getAllUsers(this.pageid, this.rowid)
        .pipe(takeUntil(this.subscribe))
        .subscribe((secData: any) => {
          this.allUsersList = secData;
        }, error => {
        });

    }
  }



  // Next Button For Privilleges
  privillageTableNextButton() {
    this.disablePriviliagePreviousButton = false;
    this.disablePriviliageNextButton = false;
    this.priviliagePageCounts++;
    if (this.priviliagePageCounts === this.responsePriviliagePageCount) {
      this.disablePriviliageNextButton = true;
      this.disablePriviliagePreviousButton = false;
    } else if (this.pageCount >= this.responsePriviliagePageCount) {
      this.priviliagePageCounts--;
      this.disablePriviliageNextButton = true;
      this.disablePriviliagePreviousButton = true;
      this.priviliagePageId = this.priviliagePageId - 1;
    } else {
      this.disablePriviliageNextButton = false;
      this.disablePriviliagePreviousButton = false;
    }
    this.allUsersList = [];
    this.priviliagePageId = this.priviliagePageId + 1;
    this.usrmgtService.getAllPrivillages(this.priviliagePageId, this.priviliageRow)
      .pipe(takeUntil(this.subscribe))
      .subscribe((allPrivilizeData: any) => {
        this.privillagesAllData = allPrivilizeData;
      }, error => {

      });

  }
  // Previous Button For Privilleges
  privillageTablePreviousButton() {
    this.disablePriviliageNextButton = false;
    this.priviliagePageCounts--;
    if (this.priviliagePageCounts === 1) {
      this.disablePriviliagePreviousButton = true;
    } else {
      this.disablePriviliagePreviousButton = false;
    }
    this.priviliagePageId = this.priviliagePageId - 1;
    this.allUsersList = [];
    this.usrmgtService.getAllPrivillages(this.priviliagePageId, this.priviliageRow)
      .pipe(takeUntil(this.subscribe))
      .subscribe((allPrivilizeData: any) => {
        this.privillagesAllData = allPrivilizeData;
      }, error => {
      });

  }



  // getListOfPrivillagesByGroup
  getListOfPrivillagesByGroup(data) {
    this.usrmgtService.ListOfPrivillagesByGroup(data.target.value, this.priviliagePageId, this.priviliageRow)
      .pipe(takeUntil(this.subscribe))
      .subscribe((privillizesData: any) => {
        this.privillagesAllData = privillizesData;
        this.responsePriviliagePageCount = this.privillagesAllData[0].pageCount;
      }, error => {
      });
  }
  // Update Role Date In Role Tab
  updateRoleData() {
    const obj = {
      remarks: this.addRoleForm.get('roleDescription').value,
      roleName: this.addRoleForm.get('roleName').value,
      roleId: this.roleId,

    };
    this.usrmgtService.updateRoleData(obj).pipe(takeUntil(this.subscribe)).subscribe((privillizesData: any) => {
      this.privillagesAllData = privillizesData;
      this.tostar.success('Role Updated Succesfully', 'Success', {
        timeOut: 2000
      });
      this.GetCalls();
    }, error => {
      this.tostar.error('Error', 'Error', {
        timeOut: 3000
      });
    });
  }
  // Get User Id From User Table In Manage User
  getId(id: any) {
    this.userIdvalue = id;
  }

  // Selected Role Ids From Assign Role In Manage User
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
      this.names.forEach(element => {
        if (element.roleId != this.defaultRoleId) {
          this.showSaveButtonForDefaultRole = false;
        }
      });
    }
  }


  // Submiting Assign Roles For User From Assign Roles
  assignRole() {
    this.assignRolesObj = new assignRole();
    this.roleIdss.forEach(element => {
      this.assignRolesObj.roles.push(
        {
          roleId: element
        }
      );
    });
    this.assignRolesObj.userId = this.userIdvalue;
    this.assignRolesObj.defaultRole.roleId = this.defaultRoleId;
    if (this.assignRolesObj.defaultRole.roleId != null) {
      this.usrmgtService.assiognRole(this.assignRolesObj).pipe(takeUntil(this.subscribe)).subscribe((allUserTypes: any) => {
        this.GetCalls();
        this.names = [];
        this.roleIdss = [];
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
  // Next Button For Roles In Roles Tab
  roleNext() {
    this.disableRolePreviousButton = false;
    this.disableRoleNextButton = false;
    this.rolePageCounts++;
    if (this.rolePageCounts === this.responseRolePageCount) {
      this.disableRoleNextButton = true;
      this.disableRolePreviousButton = false;
    } else if (this.rolePageCounts >= this.responseRolePageCount) {
      this.rolePageCounts--;
      this.disableRoleNextButton = true;
      this.disableRolePreviousButton = true;
      this.rolePageId = this.rolePageId - 1;
    } else {
      this.disableRoleNextButton = false;
      this.disableRolePreviousButton = false;
    }
    this.rolePageId = this.rolePageId + 1;
    this.usrmgtService.getAllRoles(this.rolePageId, this.roleRow)
      .pipe(takeUntil(this.subscribe))
      .subscribe((getAllRoles: any) => {
        this.getALLRoles = getAllRoles;

      }, error => {
      });
  }
  // Previous Button For Roles In Roles Tab
  rolePrevi() {
    this.disableRoleNextButton = false;
    this.rolePageCounts--;
    if (this.rolePageCounts === 1) {
      this.disableRolePreviousButton = true;
    } else {
      this.disableRolePreviousButton = false;
    }
    this.rolePageId = this.rolePageId - 1;
    this.allUsersList = [];
    this.usrmgtService.getAllRoles(this.rolePageId, this.roleRow)
      .pipe(takeUntil(this.subscribe))
      .subscribe((getAllRoles: any) => {
        this.getALLRoles = getAllRoles;
      }, error => {
      });
  }
  // Binding Role  Data For Role Form
  EditRole(data) {
    this.roleId = data.roleId;
    this.showUpdateButtonForRole = true;
    this.addRoleForm.patchValue({
      roleName: data.roleName,
      roleDescription: data.remarks

    });
  }

  // Getting Role Data to Bind Privilliges In Roles And Priviliges Tab
  getRoleDetails(data) {
    this.roleIdForBackEnd = data.target.value;
    this.privilligesArray = [];
    this.usrmgtService.getRoleDetailsById(data.target.value).pipe(takeUntil(this.subscribe)).subscribe((getRoleDetails: any) => {
      this.roleNameForBackEnd = getRoleDetails.roleName;
      this.getRoleData = getRoleDetails.authorities;
      this.arrayDataOfPrivillizes.forEach(element => {
        element.values.forEach(value => {
          value.checked = false;
          this.getRoleData.forEach(element1 => {
            if (value.authorityId == element1.authorityId) {
              value.checked = true;
              console.log(value.authorityId, 'value.authorityId');
              this.privilligesArray.push(value.authorityId.toString());
              console.log(this.privilligesArray, 'value.authorityId');
            }
          });

        });
      });



    }, error => {
    });

  }

  // Submitting Privillages For Particular Role In Roles And Privilliges Tab
  updateRoleAuthorithy() {
    this.privillagesObj = new privilliges();
    this.privilligesArray.forEach(element => {
      this.privillagesObj.authorities.push({
        authorityId: element
      });
    });
    this.privillagesObj.roleId = this.roleIdForBackEnd;
    this.privillagesObj.roleName = this.roleNameForBackEnd;
    console.log(this.privillagesObj);
    if (this.privilligesArray.length >= 1 && this.privillagesObj.roleName !==undefined) {
      this.usrmgtService.updateRoleAuthority(this.privillagesObj).pipe(takeUntil(this.subscribe)).subscribe(result => {
        this.changeAllPrivillagesByRole();
        this.roleDropdownSearch.controls.roleSearchForm.setValue('', { onlySelf: true });
        this.privilligesArray = [];
        this.tostar.success('Privileges Assigned Succesfully', 'Success', {
          timeOut: 2000
        });
      }, error => {
        this.tostar.error('Error', 'Error', {
          timeOut: 3000
        });
      });
    } else {
      this.tostar.warning('Please Fill Required Fields', 'Warning', {
        timeOut: 2000
      });
    }

  }

  // Getting Selected PrivilligesId From Privilliges&Roles Tab
  bindPrivilliagesData(data) {
    if (data.target.checked) {
      console.log(this.privilligesArray, 'defalt array Push');
      this.privilligesArray.push(data.target.value);
      console.log(this.privilligesArray, 'if');
    } else {

      this.privilligesArray.forEach(element => {
        if (element == data.target.value) {
          console.log(this.privilligesArray, 'defalt array pull');
          this.privilligesArray.forEach((item, index) => {
            if (item === data.target.value) { this.privilligesArray.splice(index, 1); }
          });
        }
      });
      console.log(this.privilligesArray, 'else');

    }

  }
  // Selecting  Default Role Id From Assign Roles Popup
  getingRoleId(data) {
    this.defaultRoleId = data.target.value;
    if (this.defaultRoleId != null) {
      this.showSaveButtonForDefaultRole = true;
    }
    console.log(this.defaultRoleId, '  this.defaultRoleId ');
  }

  // checkboxvalue
  checkboxValue(value) {

    if (value === 'true') {
      this.active = true;
    } else {
      this.active = false;
    }
  }
  changeActiveOrInactiveStatus(data) {
    console.log(data, 'data');
    this.status = data;
  }
  // searching User Data By Using DropDowns In Manage User Tab
  filterWithRoleOrUserType() {
    console.log(this.status, 'this.active');
    if (this.entityId != null && this.sectionId != null && this.status != undefined) {
      this.obj = {
        active: this.status,
        entityMasterId: this.entityId,
        sectionId: this.sectionId
      };

    } else if (this.entityId != null && this.sectionId == null && this.status == undefined) {
      debugger;
      this.obj = {
        active: 2,
        entityMasterId: this.entityId,
        sectionId: 0
      };
    } else if (this.entityId != null && this.sectionId != null && this.status === undefined) {
      this.obj = {
        active: 2,
        entityMasterId: this.entityId ? this.entityId : 0,
        sectionId: this.sectionId ? this.sectionId : 0
      };

    } else if (this.status == 0) {
      this.obj = {
        active: this.status,
        entityMasterId: 0,
        sectionId: 0
      };
    } else if (this.status == 1) {
      this.obj = {
        active: this.status,
        entityMasterId: 0,
        sectionId: 0
      };
    }
    this.usrmgtService.filterWithRoleOrUsertype(this.pageid, this.rowid, this.obj)
      .pipe(takeUntil(this.subscribe))
      .subscribe(res => {
        if (res.length == 0) {
          this.tostar.warning('Not Data Found', 'Error', {
            timeOut: 2000
          });

          this.clearFilterSearch();
        }
        this.allUsersList = res;
        this.showSectionDropDown = false;
        this.responsePageCount = this.allUsersList[0].pageCount;
        this.searchStatusPagination = true;
        this.searchUserPaginationTrue = false;
        this.clearFilterSearch();

      }, error => {
      });
  }
  // For Edit User
  getEditDetails(data: any) {

    this.userid = data;
    this.route.navigate(['/main/internal/usrmgt/internalApp/userCreation', { key: this.userid.userId }]);

  }

  // Pervious Pagination For Groupo Tab
  groupBtnnPrevious() {
    this.disableGroupNextButton = false;
    this.groupPageCounts--;
    if (this.groupPageCounts === 1) {
      this.disableGroupPreviousButton = true;
    } else {
      this.disableGroupPreviousButton = false;
    }
    this.groupPage = this.groupPage - 1;

    this.usrmgtService.getGroups(this.groupPage, this.groupRow).pipe(takeUntil(this.subscribe)).subscribe((grpData: any) => {
      this.allGroups = grpData;
    });
  }

  // Next Pagination For Groupo Tab
  groupBtnNext() {
    this.disableGroupPreviousButton = false;
    this.disableGroupNextButton = false;
    this.groupPageCounts++;
    if (this.groupPageCounts === this.responseGroupPageCount) {
      this.disableGroupNextButton = true;
      this.disableGroupPreviousButton = false;
    } else if (this.groupPageCounts >= this.responseGroupPageCount) {
      this.groupPageCounts--;
      this.disableGroupNextButton = true;
      this.disableGroupPreviousButton = true;
      this.groupPage = this.groupPage - 1;
    } else {
      this.disableGroupNextButton = false;
      this.disableGroupPreviousButton = false;
    }
    this.allUsersList = [];
    this.groupPage = this.groupPage + 1;
    this.usrmgtService.getGroups(this.groupPage, this.groupRow).pipe(takeUntil(this.subscribe)).subscribe((grpData: any) => {
      this.allGroups = grpData;
    }, error => {
    });
  }

  // Get User Roles Data To Show In Assign Roles
  getAllAssignRoles(data) {
    this.route;
    this.UserName = data.name;
    this.names = [];
    this.roleIdss = [];
    this.usrmgtService.getUserByUserDetailsId(data.userId).pipe(takeUntil(this.subscribe)).subscribe((res: any) => {
      this.getroleIdFormBackEnd = res.roles;
      this.getDefaultRoleFromBackEnd = res.defaultRole;
      this.defaultRoleId = res.defaultRole.roleId;
      if (this.getDefaultRoleFromBackEnd != null) {
        this.showSaveButtonForDefaultRole = true;
      } else {
        this.showSaveButtonForDefaultRole = false;
      }

      if (this.getroleIdFormBackEnd.length != 0 && this.getDefaultRoleFromBackEnd != null) {
        this.allRoles.forEach(element => {

          this.getroleIdFormBackEnd.forEach(element1 => {
            if (element.roleId == element1.roleId) {
              element.checked = true;
              this.names.push({ rolename: element.roleName, roleId: element.roleId.toString() });
              console.log(this.names, 'names');
              this.roleIdss.push(element.roleId.toString());
            }
            if (element.roleId == this.getDefaultRoleFromBackEnd.roleId) {

              this.names.forEach(element => {
                console.log(this.names, ' this.names');
                element.checked = true;
              });

            }

          });
        });
      }
    });
  }
  // Reset Role Form
  resetForm() {
    this.addRoleForm.reset();
  }
  // Reset UserForm
  resetUserForm() {

    // this.clearValidations();
    this.GetCalls();

  }
  showSubmitButton() {
    this.showUpdateButtonForRole = false;
  }
  // Creating User
  showSubmitButtonForUser() {
    this.route.navigate(['/main/internal/usrmgt/internalApp/userCreation']);
    // this.showUpdateButtonForUser = false;
  }
  // Get RoleDetails
  getRoleDetail(data) {
    this.roleIdForBackEnd = data.target.value;
    this.usrmgtService.getRoleDetailsById(data.target.value).pipe(takeUntil(this.subscribe)).subscribe((getRoleDetails: any) => {
      this.roleNameForBackEnd = getRoleDetails.roleName;
    });
  }
  // Reset User Form
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
  // Reset Search Filter
  clearFilterSearch() {
    this.searchUserForm.reset();
    this.searchUserForm.controls.organisation.setValue('', { onlySelf: true });
    this.searchUserForm.controls.status.setValue('', { onlySelf: true });
    this.searchUserForm.controls.section.setValue('', { onlySelf: true });
    this.active = false;
  }
  // Refersh Page Of Assign Roles
  assignRolesRefresh() {
    this.GetCalls();
    this.names = [];
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
  // getStates
  getStates(value) {
    console.log(value, 'value');
    this.usrmgtService.getAllStates(value).pipe(takeUntil(this.subscribe)).subscribe(res => {
      console.log(res, 'all states sss');
      this.statesList = res;
      this.statesList.sort(function (a, b) {
        return a.stateId - b.stateId;
      });


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
      this.citiesList.sort(function (a, b) {
        return a.cityId - b.cityId;
      });
    }, error => {
      console.log(error);
    });
  }
  // Validation For Accepting Only Numbers
  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // Showing List Of Privilliges Data  For Both privilliges and Roles&Privilliges Tab
  changeAllPrivillagesByRole() {
    this.arrayDataOfPrivillizes = [];
    this.onlyValuesArray = [];
    this.usrmgtService.getAllPrivilligesByRole().pipe(takeUntil(this.subscribe)).subscribe(response => {

      console.log(response, 'responses');
      this.getAllPrivillagesById = response;
      console.log(this.onlyValuesArray, ' this.onlyValuesArray');
      Object.keys(this.getAllPrivillagesById).forEach(key => {
        this.showPrivilizesObj = new showPrivilizes();
        this.assignGroupName = key;
        this.showPrivilizesObj.key = this.assignGroupName;
        this.allPrevilizes = this.getAllPrivillagesById[key];
        this.showPrivilizesObj.values = this.allPrevilizes;
        this.arrayDataOfPrivillizes.push(this.showPrivilizesObj);
      });
      console.log(this.arrayDataOfPrivillizes, 'arrayDataOfPrivillizes');


    });
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
      this.tostar.success('User Inactivated successfully', 'Success', {
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
      this.tostar.success('User activated successfully', 'Success', {
        timeOut: 2000
      });
      this.GetCalls();
    });
  }
  // Getting User Data
  getUserData(data) {
    console.log(data);
    this.userEmailId = data.emailId;
    this.userName = data.name;
    console.log(this.userName, ' this.userName');
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
  changeColorForUserStatus(data) {
    if (data.active == false) {
      return 'red';
    } else {
      return 'green';
    }
  }
  // Managing Dynamic Data Form Tabs In Html
  resetRolesAndPrivilizesPage(data) {
    console.log(data, 'adata');
    if (data != 'Roles & Privileges') {

      console.log(this.selectedwallet === this.coinwallet[5]);
      this.changeAllPrivillagesByRole();
      this.roleDropdownSearch.controls.roleSearchForm.setValue('', { onlySelf: true });
      this.privilligesArray = [];
      sessionStorage.removeItem('check-usec');
    } else {
      sessionStorage.removeItem('check-usec');
    }
  }
  // Unsubscribe The APi cALls Data
  ngOnDestroy() {
    this.subscribe.next();
    this.subscribe.complete();
  }
}
