import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';
import { ServerURLService } from 'src/app/common-service/serverURL.service';
@Injectable({
    providedIn: CommonServiceModule
})
export class urlServices {
    constructor(public serverURL: ServerURLService) {
    }
    // Login
    login = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getOauthAccessToken`;
    // erp = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getOauthAccessToken`;

    // User Management Servives
    userList = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getAllUsers`;
    allRoles = `${this.serverURL.apiServerAddress}user-management/api/v1/user/listOfRoles`;
    allGroups = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getAllGroupsByPagination`;
    allPrevilizes = `${this.serverURL.apiServerAddress}user-management/api/v1/user/AllPrivilages`;
    serrchByEmail = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getUserbyEmailId`;


    // Search Calls
    searchByGroup = `${this.serverURL.apiServerAddress}user-management/api/v1/user/searchGroupsByAsc`;
    searchByPrvilize = `${this.serverURL.apiServerAddress}user-management/api/v1/user/searchListOfPrivileges`;
    searchByRole = `${this.serverURL.apiServerAddress}user-management/api/v1/user/searchListOfRoles`;
    searchByData = `${this.serverURL.apiServerAddress}user-management/api/v1/user/searchAllUsersData`;
    // Pagination call
    paginationForGroupData = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getAllGroupsByPagination`;
    // Create Role 
    createRole = `${this.serverURL.apiServerAddress}user-management/api/v1/user/createRole`;
    // update Role
    updateRole = `${this.serverURL.apiServerAddress}user-management/api/v1/role/updateRole`;
    // Create User
    createUser = `${this.serverURL.apiServerAddress}user-management/api/v1/user/createUser`;
    // update User
    updateUser = `${this.serverURL.apiServerAddress}user-management/api/v1/user/updateUser`;
    // updateRoleauthorithy
    updateRoleIdS = `${this.serverURL.apiServerAddress}user-management/api/v1/user/role/updateRoleAuthority`;
    // filterwithrole/usertype
    filterWithRoleorUserType = `${this.serverURL.apiServerAddress}user-management/api/v1/user/searchManageUsersList`;
    //  getUserDetailsById
    getUserDetailById = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getUserByUserId`;

    // getAllCountries
    getAllCountrie = `${this.serverURL.apiServerAddress}user-management/api/v1/master-data/auth/getAllCountrys`;
    // getAllStates
    getAllStates = `${this.serverURL.apiServerAddress}user-management/api/v1/master-data/auth/getAllStates`;
    // getAllCities
    getAllCities = `${this.serverURL.apiServerAddress}user-management/api/v1/master-data/auth/getAllCitys`;
    // getEntityMaster
    getEntityMaster = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getAllEntityMaster`;
    getAllUserTypes = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getAllUserTypes`;
    getAllSectionByEntityMaster = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getAllSectionByEntityMaster`;
    getAllDesignationByEntityMaster = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getAllDesignationByEntityMaster`;
    assignRoleToUser = `${this.serverURL.apiServerAddress}user-management/api/v1/user/assignRoleToUser`;

    // getEntityMaster =`${this.serverURL.apiServerAddress}user-management/api/v1/user/getAllEntityMaster`;

    //getAllPrivillage
    getAllPrivillage = `${this.serverURL.apiServerAddress}user-management/api/v1/user/AllPrivilagesByPage`;
    // Complainant_CG_DCI999@gmail.com

    allGroupsForDropDown = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getAllGroupsByAsc`;
    ListOfAllPriviligesByGroup = `${this.serverURL.apiServerAddress}user-management/api/v1/user/AllPrivilagesByGroup`;
    getAllRoles = `${this.serverURL.apiServerAddress}user-management/api/v1/user/listOfRolesByPage`;
    updateRoleData = `${this.serverURL.apiServerAddress}user-management/api/v1/user/role/updateRole`;
    getLoginUserId = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getLoggedInUserDetails`;
    getRoleDetailsByRoleId = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getRoleByRoleId`;
    getUserDetailByIds = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getUserByUserId`;
    getAllPrivillizeaByRole = `${this.serverURL.apiServerAddress}user-management/api/v1/user/AllPrivilagesByModule`
    inActiveTheUser = `${this.serverURL.apiServerAddress}user-management/api/v1/user/disableUser`;
    getStateById = `${this.serverURL.apiServerAddress}user-management/api/v1/master-data/auth/getStateById`;
    getCityById = `${this.serverURL.apiServerAddress}user-management/api/v1/master-data/auth/getCityById`;
    getSectionById = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getSectionById`;
    resetPassword = `${this.serverURL.apiServerAddress}user-management/api/v1/user/resetPassword`
}
export const urlServiceProvider = [
    urlServices
];
