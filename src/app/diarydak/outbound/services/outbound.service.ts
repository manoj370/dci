import { Injectable } from '@angular/core';
import { urlServices } from '../services/outboundServiceUrls';
import { HttpServiceService } from 'src/app/common-service/http-service.service';
import { retry } from 'rxjs/operators';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class OutboundService {

  constructor(public http: HttpServiceService, public url: urlServices) { }

  // outbound apis
  // get calls
  // getAllOrganizations
  getAllOrganizations() {
    return this.http.get(this.url.getAllOrganizations);
  }
  // getAllDesignations
  getAllDesignations() {
    return this.http.get(this.url.getAllDesignations);
  }
  // getAllDCISections
  getAllDCISections() {
    return this.http.get(this.url.getAllDCISections);
  }
  // getSubSections
  getSubSections(sectionid) {
    return this.http.get(this.url.getSubSections + '?sectionId=' + sectionid);
  }
  // getDispatchTypes
  getDispatchTypes() {
    return this.http.get(this.url.getDispatchTypes);
  }
  // getDispatchItems
  getDispatchItems() {
    return this.http.get(this.url.getDispatchItem);
  }
  // getAllDispatches
  getAllDispatches(pageid: number, rowid: number) {
    return this.http.get(this.url.getAllDispatches + '?page=' + pageid + '&rows=' + rowid);
  }
  // getDispatchById
  getDispatchById(dispatchId: any) {
    return this.http.get(this.url.getDispatchById + '?dispatchId=' + dispatchId);
  }
  // getAllCounts
  getCounts() {
    return this.http.get(this.url.getCounts);
  }
  // generateDispatchReferenceNumber
  generateDispatchRefNo(patternNumber: any) {
    return this.http.get(this.url.generatedReferenceNo + '?pattern=' + patternNumber);
  }
  // searchDataDashboard
  searchDispatches(searchvalue: any, pageid: number, rowid: number) {
    return this.http.get(this.url.searchData + '?searchInput=' + searchvalue +
      '&page=' + pageid + '&rows=' + rowid);
  }
  // dispatchdetailsbetweendates
  dispatchDetailsBetweenDates(startdate: any, enddate: any, pageid: any, rowid: any) {
    return this.http.get(this.url.dispatchDatesBetweenDates + '?startDate=' + startdate
      + '&endDate=' + enddate + '&page=' + pageid + '&rows=' + rowid);
  }
  // dispatchdetails by status
  dispatchdetailsByStatus(statuscode: any, pageid: any, rowid: any) {
    return this.http.get(this.url.getAllDispatchDetailsByStatus + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&status=' + statuscode
      + '&page=' + pageid + '&rows=' + rowid);

  }

  // sectionexecutive apicalls 
  // dispatchdetailsdashboardwithpagination
  dispatchdetailsWithPagiantion(userid: any, pageid: any, rowid) {
    return this.http.get(this.url.getAllDispatchDetailsByUser + '?userId=' + userid
      + '&page=' + pageid + '&rows=' + rowid);
  }
  // getAllDispatchDetailsUserBetweenDates
  getAllDispatchDetailsUserBetweenDates(startdate: any, enddate: any, pageid: any, rowid: any, userId: any) {
    return this.http.get(this.url.getAllDispatchDetailsUserBetweenDates + '?startDate=' + startdate
      + '&endDate=' + enddate + '&page=' + pageid + '&rows=' + rowid + '&userId=' + userId);
  }
  // searchDispatchDetailsByUser
  searchDispatchDetailsByUser(userid: any, searchvalue: any, pageid: number, rowid: number,) {
    return this.http.get(this.url.searchDispatchDetailsByUser + '?userId=' + userid
      + '&searchInput=' + searchvalue + '&page=' + pageid + '&rows=' + rowid);
  }

  // daksecexecutiveapicalls
  // dispatchdetails by status and between dates
  dispatchdetailsByStatusAndDates(status: any, startdate: any, enddate: any, pageid: any, rowid: any) {
    return this.http.get(this.url.getAllDispatchDetailsByStatusandBetweenDates + '?status=' + status
      + '&startDate=' + startdate + '&endDate=' + enddate + '&page=' + pageid + '&rows=' + rowid);
  }
  // searchDataDashboard
  searchDispatchDetailsByStatus(searchvalue: any, pageid: number, rowid: number) {
    return this.http.get(this.url.searchDispatchDetailsByStatus + '?searchInput=' + searchvalue +
      '&page=' + pageid + '&rows=' + rowid);
  }
  // getAllDispatches
  getAllDispatchDetailsByStatus(pageid: number, rowid: number) {
    return this.http.get(this.url.getAllDispatchDetailsByStatus +
      '&page=' + pageid + '&rows=' + rowid);
  }
  // putcalls
  // update dispatchdetails
  updatedispatchdetails(obj: any) {
    return this.http.update(this.url.updatedespatchdetails, obj);
  }
  removeAddress(addressId: any) {
    return this.http.update(this.url.removeAddress + '?dispatchRecipientId=' + addressId, '')

  }
  // post calls
  // createdispatch
  // newDispatch(fileArray: any, obj: any) {
  //   const formData: FormData = new FormData();
  //   for (let i = 0; i < fileArray.length; i++) {
  //     formData.append('file', fileArray[i]);
  //   }
  //   formData.append('dispatchJson', JSON.stringify(obj));
  //   return this.http.post(this.url.createDispatch, formData);
  // }

  // put calls
  updateDespatch(filearray: any, obj: any) {
    var formdata: FormData = new FormData();
    for (let i = 0; i < filearray.length; i++) {
      formdata.append('file', filearray[i]);
    }
    console.log(formdata);
    formdata.append('dispatchJson', JSON.stringify(obj));
    console.log(formdata);
    return this.http.updateData(this.url.updateDispatch, formdata);
  }
  //  returnDispatchToSE
  returnDispatchToSE(dispatchid: any, userid: any, comments: any) {
    return this.http.update(this.url.returnDispatchToSectionExecutive + '?dispatchId='
      + dispatchid + '&userId=' + userid + '&comments=' + comments, '');
  }
  // approveDispatch
  approveDispatchh(dispatchid: any, loggedinuserid: any) {
    return this.http.update(this.url.approveAndForwardtoDSE + '?dispatchId='
      + dispatchid + '&loggedInUserId=' + loggedinuserid, '');
  }


  // New Post Call
  seekApprovalList() {
    return this.http.post(this.url.SeekApproval + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, '');
  }
  approveDispatch(data: any) {
    return this.http.post(this.url.approveDispatch, data);
  }
  seekApprovalByUserIDAndComments(data: any) {
    return this.http.post(this.url.seekApprovalByUserIDAndComments, data);
  }

  sendCorrection(data: any) {
    return this.http.post(this.url.sendCorrection, data);
  }
  getDispatchVia() {
    return this.http.get(this.url.getDispatchVia);
  }
  usersList(dispatchId: any) {
    return this.http.get(this.url.usersList + '?dispatchId=' + dispatchId);
  }
  getDispatchConfidentiality() {
    return this.http.get(this.url.getDispatchConfidentiality);
  }
  getAllDispatchCategories() {
    return this.http.get(this.url.getAllDispatchCategories);
  }
  getAllDispatchesUrgency() {
    return this.http.get(this.url.getAllDispatchesUrgency);
  }
  getAllReceiptLanguages() {
    return this.http.get(this.url.getAllReceiptLanguages);
  }

  getSSAStatusList() {
    return this.http.get(this.url.SSStatusList);
  }
  getCorrectionStatusList() {
    return this.http.get(this.url.correctionStatusList);
  }
  // Dashboard API
  dashboardList(obj: any, pageid: any, rowid: any) {
    if (obj === null) {
      return this.http.get(this.url.dashBoardURL + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
        + '&page=' + pageid + '&rows=' + rowid);
    } else {
      return this.http.get(this.url.dashBoardURL + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
        + obj + '&page=' + pageid + '&rows=' + rowid);
    }

  }
  otherSecDispatchList(pageid: any, rowid: any) {
    return this.http.get(this.url.dashBoardURL + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&page=' + pageid + '&rows=' + rowid);
  }
  fileDetailsList(fileId: any, fromDate: any, toDate: any, pageid: any, rowid: any) {
    // return this.http.get(this.url.popupFileData + '?dakDispatchFileId=' + fileId +
    //  '&userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
    //   + '&fromDate=' + fromDate + '&toDate=' + toDate + '&page=' + pageid + '&rows=' + rowid);

    return this.http.get(this.url.popupFileData + '?dakDispatchFileId=' + fileId +
      '&userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&page=' + pageid + '&rows=' + rowid);
  }
  fileList(fileId: any,pageid: any, rowid: any) {
    // return this.http.get(this.url.popupFileData + '?dakDispatchFileId=' + fileId +
    //  '&userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
    //   + '&fromDate=' + fromDate + '&toDate=' + toDate + '&page=' + pageid + '&rows=' + rowid);

    return this.http.get(this.url.popupFileData + '?dakDispatchFileId=' + fileId +
      '&userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&page=' + pageid + '&rows=' + rowid);
  }

  // Correction List 
  getCorrectionList(obj: any, pageid: any, rowid: any) {
    if (obj === null) {
      return this.http.get(this.url.getAllCorrectionList + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
        + '&page=' + pageid + '&rows=' + rowid);
    } else {
      return this.http.get(this.url.getAllCorrectionList + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
        + obj + '&page=' + pageid + '&rows=' + rowid);
    }
  }
  statusCorrectionList(statusName: any, pageId: number, rows: number) {
    return this.http.get(this.url.statusCorrectionList +
      '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&statusName=' + statusName
      + '&page=' + pageId + '&rows=' + rows);
  }
  searchCorrectionList(searchInput: any, pageId: number, rows: number) {
    return this.http.get(this.url.searchCorrectionList + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&page=' + pageId + '&rows=' + rows + '&searchInput=' + searchInput);
  }

  datesCorrectionList(fromDate: any, endDate: any, pageId: number, rows: number) {
    return this.http.get(this.url.searchCorrectionList + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&startDate=' + fromDate + '&endDate=' + endDate + '&page=' + pageId + '&rows=' + rows);
  }


  sendToEc(data: any) {
    return this.http.post(this.url.sendToEC, data);
  }

  sentCorrection(data: any) {
    return this.http.post(this.url.correctionRequired, data);
  }
  majorCorrection(data: any) {
    return this.http.post(this.url.majorCorrection, data);
  }
  minorCorrection(data: any) {
    return this.http.post(this.url.minorCorrection, data);
  }
  dispatchApprove(data: any) {
    return this.http.post(this.url.approveDispatch, data);
  }
  getCorrectionUsersList(dispatchId: any) {
    return this.http.get(this.url.getAllCorrectionUsers + '?dispatchId=' + dispatchId + '&userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId)

  }
  circulationDecision(data: any) {
    return this.http.post(this.url.circulationDecision, data);
  }

  updateDocument(dispatchId: any, isDraft: any, eCCirculationsToggle: any, fileArray: any) {
    const formData: FormData = new FormData();
    for (let i = 0; i < fileArray.length; i++) {
      formData.append('file', fileArray[i]);
    }

    return this.http.update(this.url.upDateDocument + '?dispatchId=' + dispatchId + '&loggedInUserId=' +
      JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&assignedToUserId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
      + '&isDraft=' + isDraft + '&eCCirculationsToggle=' + eCCirculationsToggle, formData);
  }

  ecToggle(dispatchId: any, flag: any) {
    return this.http.update(this.url.ecToggle + '?dispatchId=' + dispatchId + '&loggedInUserId=' +
      JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&flag=' + flag, '');
  }
  dashboardStatus() {
    return this.http.get(this.url.dashboardStatus)
  }
  processHistory(dispatchId: any) {
    return this.http.get(this.url.processhistory + '?dispatchId=' + dispatchId);
  }
  getUserName(roleName: any) {
    return this.http.get(this.url.getUserListByRoleName + '?roleName=' + roleName);
  }
  // getAddressCategory
  getAddressCategory() {
    return this.http.get(this.url.getAddressCategory);
  }
  // getUsersByDesignation
  getUsersByDesignation(designationName, sectionname) {
    return this.http.get(this.url.getUsersByDesignation + '?designation=' + designationName + '&section=' + sectionname);
  }
  // getAddressType
  getAddressType() {
    return this.http.get(this.url.getAddressType);
  }
  //  call multiple Api calls Into Single 
  getCalls(data: any,pageid:any,rowid:any) {
    if (data === '1') {
      return this.http.get(this.url.getAllPrincipal +'?page='+pageid+'&rows='+rowid);
    } else if (data === '2') {
      return this.http.get(this.url.getAllDME+'?page='+pageid+'&rows='+rowid);
    } else if (data === '3') {
      return this.http.get(this.url.getAllHealthSecy);
    } else {
      return this.http.get(this.url.getAllAdvocate);
    }
  }

  // getAllMinistry
  getAllMinistry() {
    return this.http.get(this.url.getAllMinistry);
  }


  // filter With state and Name
  searchPrincipalData(stateId: any, principalName: any,pageid:any,rowid:any) {
    if (stateId !== null && principalName !== null) {
      return this.http.get(this.url.getAllPrincipal + '?stateId=' + stateId + '&principalName=' + principalName+'&page='+pageid +'&rows='+rowid);
    } else if (stateId === '' && principalName !== '') {
      return this.http.get(this.url.getAllPrincipal + '?principalName=' + principalName+'&page='+pageid +'&rows='+rowid);
    } else if (stateId !== '' && principalName === '') {
      return this.http.get(this.url.getAllPrincipal + '?stateId=' + stateId+'&page='+pageid +'&rows='+rowid);
    } 
  }
  // SearchWith DME
  searchDMEData(stateId: any, dmeName: any,pageid:any,rowid:any) {
    if (stateId !== null && dmeName !== null) {
      return this.http.get(this.url.getAllDME + '?stateId=' + stateId + '&dmeName=' + dmeName+'&page='+pageid +'&rows='+rowid);
    } else if (stateId === '' && dmeName !== '') {
      return this.http.get(this.url.getAllDME + '?dmeName=' + dmeName+'&page='+pageid +'&rows='+rowid);
    } else if (stateId !== '' && dmeName === '') {
      return this.http.get(this.url.getAllDME + '?stateId=' + stateId+'&page='+pageid +'&rows='+rowid);
    }
  }

  // Health Secretary
  searchHealthSecData(stateId: any, secName: any) {
    if (stateId !== '' && secName !== '') {
      return this.http.get(this.url.getAllHealthSecy + '?stateId=' + stateId + '&secName=' + secName);
    } else if (stateId === '' && secName !== '') {
      return this.http.get(this.url.getAllHealthSecy + '?secName=' + secName);
    } else if (stateId !== '' && secName === '') {
      return this.http.get(this.url.getAllHealthSecy + '?stateId=' + stateId);
    } else {
      return this.http.get(this.url.getAllHealthSecy);
    }
  }
  // Advocate Data
  searchAdvocateSecData(stateId: any, advocateName: any) {
    if (stateId !== '' && advocateName !== '') {
      return this.http.get(this.url.getAllAdvocate + '?stateId=' + stateId + '&advocateName=' + advocateName);
    } else if (stateId === '' && advocateName !== '') {
      return this.http.get(this.url.getAllAdvocate + '?advocateName=' + advocateName);
    } else if (stateId !== '' && advocateName === '') {
      return this.http.get(this.url.getAllAdvocate + '?stateId=' + stateId);
    } else {
      return this.http.get(this.url.getAllAdvocate);
    }
  }


  // getAllBulkCategory
  getAllBulkCategory() {
    return this.http.get(this.url.getAlLBulkCategory);
  }
  // searchWithFileNum
  searchWithFileNum(fileno, pageid, rowid) {
    return this.http.get(this.url.searchWithFileNum + '?fileNum=' + fileno + '&page=' + pageid + '&rows=' + rowid)
  }
  // getOtherSectionReceiptsByUserId
  getOtherSectionReceiptsByUserId(userid: any, pageid: any, rowid: any, sectionid: any) {
    return this.http.get(this.url.getOtherSectionReceiptsByUserId + '?userId=' + userid + '&page=' + pageid + '&rows=' + rowid +
      '&statusName=' + 'Assigned' + '&sectionId=' + 1)
  }

  //uploadSignedPdf
  uploadSignedPdf(dispatchId: any, file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.url.uploadSignedPdf + '?dispatchId=' + dispatchId, formData);
  }
  // getUnsignedPdf
  getUnsignedPdf(dispatchId) {
    return this.http.get(this.url.getUnsignedPdf + '?dispatchId=' + dispatchId);
  }
  //sendMailDispatch
  sendMailDispatch(dispatchId: any, obj: any) {
    return this.http.post(this.url.sendMailDispatch + '?dispatchId=' + dispatchId, obj);
  }
  // getAllSectionHeads
  getAllSectionHeads(sectionName) {
    return this.http.get(this.url.getAllSectionHeads + '?sectionName=' + sectionName);
  }


  // Save Dispatch
  saveDispatch(fileArray: any, obj: any, data: any) {
    const formData: FormData = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < fileArray.length; i++) {
      formData.append('file', fileArray[i]);
    }
    console.log(JSON.stringify(obj));
    formData.append('dispatchJson', JSON.stringify(obj));
    if (data === 'save') {
      return this.http.post(this.url.savedispatch, formData);
    } else {
      return this.http.post(this.url.createDispatch, formData);
    }
  }

  // create Dispatch
  newDispatch(fileArray: any, obj: any) {
    const formData: FormData = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < fileArray.length; i++) {
      formData.append('file', fileArray[i]);
    }
    formData.append('dispatchJson', JSON.stringify(obj));
    return this.http.post(this.url.createDispatch, formData);
  }
  // processHistory
  history(dispatchId: any) {
    return this.http.get(this.url.processHistory + '?dispatchId=' + dispatchId);
  }
  // getDFASubjectSearch
  searchDFASubject(userId, subSearch, pageid, rowid) {
    return this.http.get(this.url.searchDfaSubject + '?userId=' + userId + '&subSearch=' + subSearch + '&page=' + pageid + '&rows=' + rowid)
  }
  // senderDesignationUserList
  senderDesignationUserList(userId){
    return this.http.get(this.url.senderDesignationUserList +'?userId='+userId);
  }
  // Preview pdf
  previewPdf(dispatchId:any){
    return this.http.get(this.url.PreviewPDF +'?dispatchId='+dispatchId);
  }
  // getCategoryBySubsection
  getCategoryBySubsection(subsectionId:any){
    return this.http.get(this.url.get_file_category_from_sub_section +'?subSectionId='+subsectionId);
  }
  // getSubCategoryByFileCategory
  getSubCategoryByFileCategory(filecategoryId:any){
    return this.http.get(this.url.get_file_sub_category_from_file_category +'?fileCategoryId='+filecategoryId)
  }
  // getReferenceBySubCategory
  getReferenceBySubCategory(fileSubCategoryId:any){
    return this.http.get(this.url.get_file_subject_reference_from_file_sub_category +'?fileSubCategoryId='+fileSubCategoryId);
  }
  // getAllCollege
  getAllCollege(){
    return this.http.get(this.url.get_all_college);
  }
  // getSubCategoryReferenceBySubCategory
  getSubCategoryReferenceBySubCategory(fileSubCategoryId:any){
    return this.http.get(this.url.get_file_sub_category_reference_from_file_sub_category +'?fileSubCategoryId='+fileSubCategoryId);
  }
  // delete Document
  deleteDocument(documentId:any){
    return this.http.delete(this.url.delete_document+'?documentId='+documentId);
  }
  // preview Document
  previewDoc(id:any){
    return this.http.get(this.url.documentUrl+'?uuid='+id);
  }
  // previewFinalLetter
  previewFinalLetter(id:any,filepath:any){
    return this.http.get(this.url.previewFinalLetter+'?uuid='+id+'&filePath='+filepath);
  }
  // trackNoteSheet
  trackNoteSheet(userId:any,pageid:any,rowid:any){
    return this.http.get(this.url.trackNoteSheet+'?userId='+userId+'&page='+pageid +'&rows=' +rowid);
  }
  // getotherCategoryusers
  getotherCategoryusers(userName:any,phoneNumber:any,pageid:any,rowid:any){
    return this.http.get(this.url.get_other_category_users+'?userName='+userName+'&phoneNumber='+phoneNumber+'&page='+pageid +'&rows=' +rowid);
  }
  // saveFileNum
  saveFileNum(obj){
    return this.http.post(this.url.saveFileNum,obj)
  }
}


  // getPrinicipalByState(stateid) {
  //   return this.http.get(this.url.getAllPrincipal + '?stateId=' + stateid);
  // }

  // getPrinicipalByName(principalname) {
  //   return this.http.get(this.url.getAllPrincipal + '?principalName=' + principalname);
  // }

  // DME BY STATE AND NAME
  // getDMEByStateAndName(stateid, dmename) {
  //   return this.http.get(this.url.getAllDME + '?stateId=' + stateid + '&dmeName=' + dmename);
  // }

  // dme by state
  // getDMEByState(stateid) {
  //   return this.http.get(this.url.getAllDME + '?stateId=' + stateid);
  // }

  // dme byname
  // getDMEByName(dmename) {
  //   return this.http.get(this.url.getAllDME + '?dmeName=' + dmename);
  // }


  // healthsecbystateAndname
  // getHealthSecByStateAndName(stateid, secname) {
  //   return this.http.get(this.url.getAllHealthSecy + '?stateId=' + stateid + '&secName=' + secname);
  // }

  // getHealthSecByState(stateid) {
  //   return this.http.get(this.url.getAllHealthSecy + '?stateId=' + stateid);
  // }

  // getHealthSecByName(secname) {
  //   return this.http.get(this.url.getAllHealthSecy + '?secName=' + secname);
  // }

  // getAdvocateByStateAndName(stateid, advocateName) {
  //   return this.http.get(this.url.getAllAdvocate + '?stateId=' + stateid + '&advocateName=' + advocateName);
  // }

  // getAdvocateByState(stateid) {
  //   return this.http.get(this.url.getAllAdvocate + '?stateId=' + stateid);
  // }

  // getAdvocateByName(advocateName) {
  //   return this.http.get(this.url.getAllAdvocate + '?advocateName=' + advocateName);
  // }

