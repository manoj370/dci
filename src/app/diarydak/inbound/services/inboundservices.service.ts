import { Injectable } from '@angular/core';
import { urlServices } from '../../inbound/services/inboundServiceUrls'
import { HttpServiceService } from 'src/app/common-service/http-service.service';
import { CommentStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class InboundservicesService {
  constructor(public http: HttpServiceService, public url: urlServices) { }

  getViaList() {
    return this.http.get(this.url.getDispatchVia);
  }
  getLoginUserId() {
    return this.http.get(this.url.getLoginUserId);
  }
  getListOfRecpeits(pageId, rows) {
    return this.http.get(this.url.getListOfReceipts + '?page=' + pageId + '&rows=' + rows)
  }
  getAllReceiptCategorie() {
    return this.http.get(this.url.getAllReceiptCategorie)
  }
  getAllReceipetLanguage() {
    return this.http.get(this.url.getAllReceipetLanguage)
  }

  getAllReceiptType() {
    return this.http.get(this.url.getAllReceiptType)
  }
  submitReceiptDetails(file, obj: any) {

    var formdata: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append('files', file[i]);

    }
    formdata.append('receiptJson', JSON.stringify(obj));
    debugger
    // console.log(formdata);
    return this.http.post(this.url.createReceipt, formdata);


  }
  getReceiptDetailsByStatus(id, pageId, rows) {
    debugger
    return this.http.get(this.url.getAllReceiptByCodes + "?statusCode=" + id + '&page=' + pageId + '&rows=' + rows)
  }
  getReceiptData(id: any) {
    return this.http.get(this.url.getReceiptData + "?receiptId=" + id)
  }
  updateReceipt(file, obj: any) {
    debugger
    console.log(obj)
    var formdata: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append('files', file[i]);
    }
    formdata.append('receiptJson', JSON.stringify(obj));
    console.log(formdata)
    return this.http.updateData(this.url.updateReceiptDatas, formdata)
  }
  forwardReceiptToSeceraty(id, sId, C) {
    return this.http.update(this.url.forwwardReceipt + '?receiptId=' + id + '&secretaryId=' + sId + '&comments=' + C, '')
  }
  // Receipt forward to multiple sectionheads
  forwardReceiptToMultiplesectionheads(obj) {
    return this.http.updateData(this.url.forwwardReceipt, obj);
  }
  getAllUserList() {
    return this.http.get(this.url.getAllUsersList)
  }
  //getAllReceipt by user Id
  getAllReceiptsByUser(userId, pageId, rows) {
    return this.http.get(this.url.getAllReceiptsByUserId + '?userId=' + userId + '&page=' + pageId + '&rows=' + rows)
  }
  //assignToSetionExicute
  assignToSetionExicute(data: any) {
    return this.http.update(this.url.assignSectionExecuite, data);
  }
  //assignToAnyDesignation
  assignReceiptToAnyDesignation(receiptId:any,id:any,comments:any,data: any) {
    return this.http.update(this.url.assignReceiptToAnyDesignation+'?receiptId='+receiptId+'&sectionExecutiveId='+id+'&comments='+comments, data);
  }
  //getReceiptCounts
  getReceiptCounts() {
    return this.http.get(this.url.getReceiptCounts + '?userId=' + sessionStorage.getItem('userId-usec') + '&statusName=' + 'Forwarded');

  }
  getReceiptCountss() {
    return this.http.get(this.url.getReceiptCounts + '?userId=' + sessionStorage.getItem('userId-usec') + '&statusName=' + 'Assigned');
  }

  //getReceiptListByUsingDate
  getReceiptListByUsingDate(start, end, page, row) {
    debugger
    return this.http.get(this.url.getReceiptBwtnDate + '?startDate=' + start + '&endDate=' + end + '&page=' + page + '&rows=' + row);
  }
  //getHistoryByReceiptId
  getHistoryByReceiptId(receiptId) {
    return this.http.get(this.url.getHistoryOfReceiptById + '?receiptId=' + receiptId + '&statusName=' + 'Assigned');
  }
  //assignToSetionIncharge
  assignToSetionIncharge(receiptId, sectionIncharge, comments) {
    return this.http.update(this.url.assignReceiptTosectionIncharge + '?receiptId=' + receiptId + '&sectionIncharge=' + sectionIncharge + '&comments=' + comments, '')
  }
  //reAssignedToSetionIncharge
  reAssignedToSetionIncharge(receiptId, sectionIncharge, comments) {
    return this.http.update(this.url.reassignReceiptTosectionIncharge + '?receiptId=' + receiptId + '&sectionIncharge=' + sectionIncharge + '&comments=' + comments, '')
  }
  //returnReceiptToSecretary
  returnReceiptToSecretary(id, C) {
    return this.http.update(this.url.returnToSecretary + '?receiptId=' + id + '&comments=' + C, '')
  }
  //getUserListByRole
  getUserListByRole(roleName) {
    return this.http.get(this.url.getUserListByRoleName + '?roleName=' + roleName);
  }
  //disposeReceipt
  disposeReceipt(receiptId: any, status: string, value: any) {
    return this.http.update(this.url.disposeReceiptBySecExecutive + '?receiptId=' + receiptId + '&statusName=' + status + '&comments=' + value, '')
  }
  // updateReceipt
  updateReceiptById(receiptId: any, status: string) {
    return this.http.update(this.url.updateReceiptStatusByReceiptId + '?receiptId=' + receiptId + '&statusName=' + status, '')
  }
  //getAllReceipt by user Id
  getAllReceiptsByUserIdAndStatus(userId, status, pageId, rows) {
    return this.http.get(this.url.getAllReceiptsByUserIdAndStatus + '?userId=' + userId + '&statusName=' + status + '&page=' + pageId + '&rows=' + rows)
  }
  // searchReceipt
  searchReceipt(dataa: any, pageId: number, rowId: number) {
    return this.http.get(this.url.seacrhReceiptBySearchInput + '?searchInput=' + dataa + '&page=' + pageId + '&rows=' + rowId)
  }
  // ReceiptVias
  getAllReceiptVias() {
    return this.http.get(this.url.getAllReceiptVias)
  }
  // ReceiptStatuses
  getAllReceiptStatuses() {
    return this.http.get(this.url.getAllReceiptStatuses)
  }
  // ReceiptStatusesInCharge&Executive
  getAllReceiptStatusIn() {
    return this.http.get(this.url.getAllReceiptStatusIn + '?status=' + 'Forwarded' + '&status=' + 'Returned' + '&status=' + 'File Tagged' + '&status=' + 'Assigned')
  }
  // ReceiptsByUserId
  getAllReceiptsByUserId(userId, page, rowNumber, input) {
    debugger;
    return this.http.post(this.url.getAllReceiptsByUserId + '?userId=' + userId + '&page=' + page + '&rows=' + rowNumber, input)
  }
  // AssignedReceiptsByUserId
  getAllAssignedReceiptsByUserId(userid: any, status, pageid: any, rowid) {
    return this.http.get(this.url.getAllAssignedReceiptsByUserId + '?userId=' + userid
      + '&page=' + pageid + '&rows=' + rowid);
  }
  // SectionHeads
  getAllSectionHeads() {
    return this.http.get(this.url.getAllSectionHeads)
  }
  // assignReceiptToSectionExecutive
  assignReceiptToSectionExecutive(receiptId: number, sectionExecutiveId: number, comments: string) {
    return this.http.get(this.url.assignReceiptToSectionExecutive + '?receiptId=' + receiptId + '&sectionExecutiveId=' + sectionExecutiveId + '&comments=' + comments)
  }
  // AssignedReceiptsByUserIdAndPagination
  getAllAssignedReceiptsByUserIdAndPagination(userid: number, pageid: number, rowid: number, statusName: string) {
    return this.http.get(this.url.getAllAssignedReceiptsByUserIdAndPagination + '?userId=' + userid + '&page=' + pageid + '&rows=' + rowid + '&statusName=' + statusName)
  }
  // CountOfReceiptsByStatus
  getCountOfReceiptsByStatus() {
    return this.http.get(this.url.getReceiptCounts + '?userId=' + sessionStorage.getItem('userId-usec') + '&statusName=' + 'Forwarded');

  }
  getCountOfReceiptsByStatusSecExecutive() {
    return this.http.get(this.url.getReceiptCounts + '?userId=' + sessionStorage.getItem('userId-usec') + '&statusName=' + 'Assigned');

  }
  //SecInchargeViewReceipt
  getReceiptDetailsByReceiptId2(receiptId: number) {
    return this.http.get(this.url.getReceiptDetailsByReceiptId2 + '?receiptId=' + receiptId)
  }
  // rdviewReceipt
  getReceiptDetailsByReceiptId(receiptId: number) {
    return this.http.get(this.url.getReceiptDetailsByReceiptId + '?receiptId=' + receiptId)
  }

  //Address Category
  get_address_category() {
    return this.http.get(this.url.get_address_category)
  }
  dashBoardSearch(page, rowNumber, input) {
    debugger;
    var formdata: FormData = new FormData();
    // for (let i = 0; i < file.length; i++) {
    //   formdata.append('files', file[i]);
    // }
    formdata.append('receiptJson', JSON.stringify(input));
    return this.http.post(this.url.dashBoardSearch + '?page=' + page + '&rows=' + rowNumber, input)
  }
  DashBoardSearchByStatus(page, rowNumber, input) {
    return this.http.post(this.url.DashBoardSearchByStatus + '?page=' + page + '&rows=' + rowNumber, input)
  }
  // getAllDCISections
  getAllDCISections() {
    return this.http.get(this.url.getAllDCISections);
  }
  // getSubSections
  getSubSections(sectionid) {
    return this.http.get(this.url.getSubSections + '?sectionId=' + sectionid);
  }

  // Categories List Api's
  // getAllDesignations
  getAllDesignations() {
    return this.http.get(this.url.getAllDesignations);
  }
  // getUsersByDesignation
  getUsersByDesignation(designationName) {
    return this.http.get(this.url.getUsersByDesignation + '?designation=' + designationName);
  }

  //filterwithstateandname
  getPrinicipalByStateAndName(stateid, principalname,pageid:any,rowid:any) {

    return this.http.get(this.url.getAllPrincipal + '?stateId=' + stateid + '&principalName=' + principalname +'&page='+pageid +'&rows='+rowid);
  }
  getPrinicipalByState(stateid,pageid:any,rowid:any) {

    return this.http.get(this.url.getAllPrincipal + '?stateId=' + stateid+'&page='+pageid +'&rows='+rowid);
  }
  getPrinicipalByName(principalname,pageid:any,rowid:any) {

    return this.http.get(this.url.getAllPrincipal + '?principalName=' + principalname+'&page='+pageid +'&rows='+rowid);
  }
  getDMEByStateAndName(stateid, dmename,pageid:any,rowid:any) {

    return this.http.get(this.url.getAllDME + '?stateId=' + stateid + '&dmeName=' + dmename +'&page='+pageid +'&rows='+rowid);
  }
  getDMEByState(stateid,pageid:any,rowid:any) {

    return this.http.get(this.url.getAllDME + '?stateId=' + stateid+'&page='+pageid +'&rows='+rowid);
  }
  getDMEByName(dmename,pageid:any,rowid:any) {

    return this.http.get(this.url.getAllDME + '?dmeName=' + dmename +'&page='+pageid +'&rows='+rowid);
  }
  getHealthSecByStateAndName(stateid, secname) {

    return this.http.get(this.url.getAllHealthSecy + '?stateId=' + stateid + '&secName=' + secname);
  }
  getHealthSecByState(stateid) {

    return this.http.get(this.url.getAllHealthSecy + '?stateId=' + stateid);
  }
  getHealthSecByName(secname) {

    return this.http.get(this.url.getAllHealthSecy + '?secName=' + secname);
  }
  getAdvocateByStateAndName(stateid, advocateName) {

    return this.http.get(this.url.getAllAdvocate + '?stateId=' + stateid + '&advocateName=' + advocateName);
  }
  getAdvocateByState(stateid) {

    return this.http.get(this.url.getAllAdvocate + '?stateId=' + stateid);
  }
  getAdvocateByName(advocateName) {

    return this.http.get(this.url.getAllAdvocate + '?advocateName=' + advocateName);
  }
  // getAllprincipal
  getAllPrincipal(pageid:any,rowid:any) {
    return this.http.get(this.url.getAllPrincipal+'?page='+pageid+'&rows='+rowid);
  }
  // getAllDME
  getAllDME(pageid:any,rowid:any) {
    return this.http.get(this.url.getAllDME+'?page='+pageid+'&rows='+rowid);
  }
  //getAllHealthSec
  getAllHealthSec() {
    return this.http.get(this.url.getAllHealthSecy);
  }
  // getAllMinistry
  getAllMinistry() {
    return this.http.get(this.url.getAllMinistry);
  }
  // getAllMinistry
  getAllAdvocate() {
    return this.http.get(this.url.getAllAdvocate);
  }

  // searchWithFileNum
  searchWithFileNum(fileno) {
    return this.http.get(this.url.searchWithFileNum + '?fileNum=' + fileno)
  }
  // updateReceiptWithFileNo
  updateReceiptWithFileNo(obj: any) {
    return this.http.update(this.url.updateReceiptWithFileNum, obj);
  }
  // getOtherSectionReceiptsByUserId
  getOtherSectionReceiptsByUserId(userid: any, pageid: any, rowid: any, sectionid: any) {
    return this.http.get(this.url.getOtherSectionReceiptsByUserId + '?userId=' + userid + '&page=' + pageid + '&rows=' + rowid +
      '&statusName=' + 'Assigned' + '&sectionId=' + 1)
  }

  //SectionExecutivesBySection
  getSectionExecutivesBySection(sectionName: string) {
    return this.http.get(this.url.getSectionExecutivesBySection + '?sectionName=' + sectionName);
  }


  // dispatchedNotesheets(obj: any, page: any, rows: any) {
  //   return this.http.get(this.url.dispatchedNotesheets + '?userId=' + sessionStorage.getItem('userId-usec') +
  //     '&fromDate=' + obj.fromDate + '&toDate=' + obj.toDate + '&postViaId=' + obj.postViaId + '&languageId=' + obj.language 
  //     + '&dispatchNo=' + obj.dispatchNo + '&page=' + page + '&rows=' + rows);

  // }
  // Dashboard API
  dispatchedNotesheets(obj: any, pageid: any, rowid: any) {
    if (obj === null) {
      return this.http.get(this.url.dispatchedNotesheets + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
        + '&page=' + pageid + '&rows=' + rowid);
    } else {
      return this.http.get(this.url.dispatchedNotesheets + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId
        + obj + '&page=' + pageid + '&rows=' + rowid);
    }
  }

  updateBarcode(data: any) {
    return this.http.post(this.url.updatedDispatchBarcode, data);
  }


  //EmailToPostalDept
  sendEmailtoPostal(userid: any, dispatchNo: any, languageId: any) {
    return this.http.post(this.url.sendEmailtoPostal + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&dispatchNo=' + dispatchNo + '&languageId=' + languageId, '');
  }
  // correctionUsersList
  correctionUsersList(section: any, userId: any) {
    return this.http.get(this.url.correctionUserList + '?section=' + section + '&userId=' + userId);
  }
  // http://103.210.72.123:8080/dairy-dak/api/v1/dispatch/get_dipatched_notesheets?userId=120&fromDate=1236&toDate=120&postViaId=1
  // &languageId=1&dispatchNo=1&page=1&rows=1


  printAddress(dispatchNo: any, languageId: any) {
    return this.http.get(this.url.printAddress + '?userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&dispatchNo=' + dispatchNo + '&languageId=' + languageId);

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
// deletedocument
deleteDocument(documentId:any){
  return this.http.delete(this.url.deleteDocument +'?documentId='+documentId);
}
// getAllFwdReceiptsByUserId
getAllFwdReceiptsByUserId(userid:any,pageid:any,rowid:any){
  return this.http.get(this.url.getAllFwdReceiptsByUserId + '?userId=' + userid + '&page=' + pageid + '&rows=' + rowid)
}
getAsgReceiptsByUserId(userid: number, pageid: number, rowid: number) {
  return this.http.get(this.url.getAsgReceiptsByUserId + '?userId=' + userid + '&page=' + pageid + '&rows=' + rowid)
}

// getotherCategoryusers
getotherCategoryusers(userName:any,phoneNumber:any,pageid:any,rowid:any){
  return this.http.get(this.url.get_other_category_users+'?userName='+userName+'&phoneNumber='+phoneNumber+'&page='+pageid +'&rows=' +rowid);
}
// getAllFwdReceiptById
getAllFwdReceiptById(receiptid){
  return this.http.get(this.url.getAllFwdReceiptById+'?receiptId='+receiptid);
}
// OtherSectionsdispatches
otherSectionDispatches(sectionid:any,pageid:any,rowid:any){
  return this.http.get(this.url.other_section_head_cc+'?sectionId='+sectionid+ '&page=' + pageid + '&rows=' + rowid);
}
// OtherSectionsdispatches
otherSectionCCFiles(userid:any,pageid:any,rowid:any){
  return this.http.get(this.url.other_section_cc_files+'?userId='+userid+ '&page=' + pageid + '&rows=' + rowid);
}
// getCorrectionUsersList
getCorrectionUsersList(dispatchId: any) {
  return this.http.get(this.url.getAllCorrectionUsers + '?dispatchId=' + dispatchId + '&userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId)

}
// designationListCCFile
designationListCCFile(sectionname:any,userId:any){
  return this.http.get(this.url.designationListCCFile+'?section='+sectionname+'&userId='+userId)
}
// assignCCFile
assignCCFile(obj:any){
  return this.http.post(this.url.assignCCFile,obj);
}
// tagFileNumToCCFile
tagFileNumToCCFile(obj:any){
  return this.http.post(this.url.tagFileNumToCCFile,obj);
}
// filetaggingToCreateNoteSheet
filetaggingToCreateNoteSheet(ccFileTaggingId:any){
  return this.http.get(this.url.filetaggingToCreateNoteSheet+'?ccFileTaggingId='+ccFileTaggingId);
}
// preview document
previewDocument(uuid:any){
  return this.http.get(this.url.documentUrl+'?uuid='+uuid)
}
// getHistoryUpToSecHeadAssign
getHistoryUpToSecHeadAssign(receiptId:any){
  return this.http.get(this.url.getHistoryUpToSecHeadAssign+'?receiptId='+receiptId);
}
}
