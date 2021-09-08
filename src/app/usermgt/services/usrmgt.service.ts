import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/common-service/http-service.service';
import { urlServices } from '../Models/url.models';

@Injectable({
  providedIn: 'root'
})

export class UsrmgtService {


  constructor(public http: HttpServiceService, public url: urlServices) { }
  // All Get Calls
  // Get All Users 
  getAllUsers(pageId: number, rows: number) {
    return this.http.get(this.url.userList + '?page=' + pageId + '&rows=' + rows);
  }
  // Get All Roles
  getRoles() {
    return this.http.get(this.url.allRoles);
  }
  // Get All Prvilizes
  getPrevilizes() {
    return this.http.get(this.url.allPrevilizes);
  }
  // Get All Groups
  getGroups(pageId, rows) {
    return this.http.get(this.url.allGroups + '?page=' + pageId + '&rows=' + rows);
  }

  // Search Api Calls 
  // group search
  groupSearch(data: any, pageId: number, rows: number) {
    return this.http.get(this.url.searchByGroup + '?searchWord=' + data + '&page=' + pageId + '&rows=' + rows);
  }
  // privileges search
  privilegesSearch(data: any, pageId: number, rows: number) {
    return this.http.get(this.url.searchByPrvilize + '?searchInput=' + data + '&page=' + pageId + '&rows=' + rows);
  }
  // roles search 
  rolesSearch(data: any, pageId: number, rows: number) {
    return this.http.get(this.url.searchByRole + '?searchInput=' + data + '&page=' + pageId + '&rows=' + rows);
  }
  // users search 
  usersSearch(data: any, pageId: number, rows: number) {
    return this.http.get(this.url.searchByData + '?searchInput=' + data + '&page=' + pageId + '&rows=' + rows);
  }
  // pagination for group data
  paginationforGroupData(pageid: number, rowid: number) {
    return this.http.get(this.url.paginationForGroupData + '?page=' + pageid + '&rows=' + rowid);
  }

  getAllSectionByEntityMaster(selectId: number) {
    return this.http.get(this.url.getAllSectionByEntityMaster + '?entityMasterId=' + selectId);
  }

  getAllDesignationByEntityMaster(selectId: number) {
    return this.http.get(this.url.getAllDesignationByEntityMaster + '?entityMasterId=' + selectId);
  }

  getAllUserTypes() {
    return this.http.get(this.url.getAllUserTypes);
  }
  // getEntityMaster
  getEntityMaster() {
    return this.http.get(this.url.getEntityMaster);
  }


  // post calls
  // create Role
  createRole(obj) {
    return this.http.post(this.url.createRole, obj);
  }
  // create User
  createUser(obj) {
    return this.http.post(this.url.createUser, obj);
  }

  // update Calls
  // update Role
  updateRole(obj) {
    return this.http.update(this.url.updateRole, obj);
  }
  // update user
  updateUser(obj) {
    return this.http.update(this.url.updateUser, obj);
  }

  assiognRole(data: any) {
    return this.http.update(this.url.assignRoleToUser, data);
  }
  getAllPrivillages(privillagePageid: number, privillageRowId: number) {
    return this.http.get(this.url.getAllPrivillage + '?page=' + privillagePageid + '&rows=' + privillageRowId)
  }
  getAllGroupsForDropDown() {
    return this.http.get(this.url.allGroupsForDropDown)

  }
  //ListOfPrivillagesByGroup
  ListOfPrivillagesByGroup(groupId, pageId, rowId) {
    return this.http.get(this.url.ListOfAllPriviligesByGroup + '?groupId=' + groupId + '&page=' + pageId + '&rows=' + rowId)
  }
  //getAllRoles
  getAllRoles(groupPageid: any, groupRowId: any) {
    return this.http.get(this.url.getAllRoles + '?page=' + groupPageid + '&rows=' + groupRowId)
  }
  updateRoleData(obj: any) {
    return this.http.update(this.url.updateRoleData, obj)
  }
  getRoleDetailsById(roleId: any) {
    return this.http.get(this.url.getRoleDetailsByRoleId + '?id=' + roleId)
  }
  //   roleIdUpdate(obj:any){
  //   return this.http.update(this.url.updateRoleId,obj);
  // }
  updateRoleAuthority(privillagesObj: any) {
    return this.http.update(this.url.updateRoleIdS, privillagesObj)
  }
  // filterWithRoleorUsertype
  filterWithRoleOrUsertype(pageId: number, rows: number, obj) {
    return this.http.post(this.url.filterWithRoleorUserType + '?page=' + pageId + '&rows=' + rows, obj);
  }
  // getUserByUserId
  getUserByUserId(id) {
    return this.http.get(this.url.getUserDetailById + '?id=' + id);
  }
  //getUserByUserDetailsId

  getUserByUserDetailsId(id) {
    return this.http.get(this.url.getUserDetailByIds + '?id=' + id);
  }
  //  getAllCountries
  getAllCountrie() {
    return this.http.get(this.url.getAllCountrie);
  }
  // getAllStates
  getAllStates(countryId: any) {
    return this.http.get(this.url.getAllStates + '?countryId=' + countryId);
  }
  // getAllCities
  getAllCities(stateId: any) {
    return this.http.get(this.url.getAllCities + '?stateId=' + stateId);
  }
  getAllPrivilligesByRole() {
    return this.http.get(this.url.getAllPrivillizeaByRole);
  }
  // inActiveUser
  inActiveUser(data) {
    return this.http.post(this.url.inActiveTheUser, data);
  }
  getStateById(stateId) {
    return this.http.get(this.url.getStateById + '?stateId=' + stateId)
  }

  getCityById(cityId: any) {
    return this.http.get(this.url.getCityById + '?cityId=' + cityId)
  }
  getSectionById(sectionId: any) {
    return this.http.get(this.url.getSectionById + '?sectionId=' + sectionId)
  }
  restePassword(resetObj) {
    return this.http.update(this.url.resetPassword, resetObj);
  }

}