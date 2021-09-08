import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';
import { ServerURLService } from 'src/app/common-service/serverURL.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: CommonServiceModule
})
export class urlServices {
    constructor(public serverURL: ServerURLService) { }

    documentUrl = `${this.serverURL.DocumentServerAddress}DCIDMS/services/rest/document/getFile`;


    //LoginUSer
    getLoginUserId = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getLoggedInUserDetails`;
    getListOfReceipts = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getListOfReceiptsByPagination`;
    getAllReceiptCategorie = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllReceiptCategories`;
    getAllReceipetLanguage = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllReceiptLanguages`;
    getAllReceiptType = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllReceiptTypes`;
    createReceipt = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/createReceipt`;
    getAllReceiptByCodes = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getListOfReceiptByStatusCodeAndPagination`
    getReceiptData = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getReceiptDetailsByReceiptId`;
    updateReceiptDatas = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/updateReceipt`;
    getAllUsersList = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getListOfAllUsers`;
    // forwwardReceipt = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/releaseReceiptToSecretary`;
    forwwardReceipt = `${this.serverURL.apiServerAddress}dairy-dak/api/v2/receipt/fwdReceiptToSecInCharge    `;
    getAllReceiptsByUserId = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllReceiptsByUserIdAndPagination`;
    assignSectionExecuite = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/assignReceiptToSectionExecutive`;
    getReceiptCounts = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getCountOfReceiptsByStatus`;
    getReceiptBwtnDate = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getReceiptByDatesInBetween`
    getHistoryOfReceiptById = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getReceiptHistoryByReceiptId`;
    assignReceiptTosectionIncharge = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/assignReceiptToSectionIncharge`;
    reassignReceiptTosectionIncharge = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/reAssignReceiptToSectionIncharge`;
    returnToSecretary = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/returnReceiptToSecretary`;
    getUserListByRoleName = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getaAllUsersByRoleName`;
    disposeReceiptBySecExecutive = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/changeReceiptStatus`;
    getAllReceiptsByUserIdAndStatus = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllAssignedReceiptsByUserIdAndStatus`;
    seacrhReceiptBySearchInput = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/searchReceiptDetails`;
    updateReceiptStatusByReceiptId = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/updateReceiptStatusByReceiptId`;
    getAllReceiptVias = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllReceiptVias`;
    getAllReceiptStatuses = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllReceiptStatuses`;
    getAllReceiptStatusIn = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllReceiptStatusIn`;

    getAllAssignedReceiptsByUserId = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllAssignedReceiptsByUserId`;
    getAllSectionHeads = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllSectionHeads`;
    assignReceiptToSectionExecutive = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/assignReceiptToSectionExecutive`;
    getAllAssignedReceiptsByUserIdAndPagination = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllAssignedReceiptsByUserIdAndPagination`;
    getAllFwdReceiptsByUserId = `${this.serverURL.apiServerAddress}dairy-dak/api/v2/receipt/getAllFwdReceiptsByUserId`;
    getAsgReceiptsByUserId =`${this.serverURL.apiServerAddress}dairy-dak/api/v2/receipt/getAsgReceiptsByUserId`;
    getCountOfReceiptsByStatus = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getCountOfReceiptsByStatus`;
    getReceiptDetailsByReceiptId = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getReceiptDetailsByReceiptId`;
    getReceiptDetailsByReceiptId2= `${this.serverURL.apiServerAddress}dairy-dak/api/v2/receipt/getReceiptDetailsByReceiptId`;
    dashBoardSearch = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/dashBoardSearch`;
    DashBoardSearchByStatus = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/DashBoardSearchByStatus`;
    //  SearchWithFileNum
    searchWithFileNum = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/searchWithFileNum`;
    get_address_category = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_address_category`;
    updateReceiptWithFileNum = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/updateReceiptWithFileNum`;
    getOtherSectionReceiptsByUserId = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getOtherSectionReceiptsByUserId`;
    // DakHead Api
    getAllPrincipal = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_prinicipal`;
    getAllDesignations = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getListOfDCIDesignations`;
    getUsersByDesignation = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getUsersByDesignation`;
    getAllDME = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_dme`;
    getAllHealthSecy = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_healthsecretary`;
    getAllMinistry = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_ministry`;
    getAllAdvocate = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_advocate`;
    //inbound notesheet Api's
    getAllDCISections = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getListOfDCISections`;
    getSubSections = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getListOfSubSections`;
    getSectionExecutivesBySection = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getSectionExecutivesBySection`;
    getDispatchVia = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchesVia`;
    dispatchedNotesheets = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_dipatched_notesheets`;
    updatedDispatchBarcode = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/update_dak_dispatch_receipient_details`;
    //SendMAiltoPostalDept
    sendEmailtoPostal = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/send_email_to_postal`;
    // Assign UsersList
    correctionUserList =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/correctionUserList`;

printAddress=`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/print_address`;

 // get_file_category_from_sub_section
 get_file_category_from_sub_section=`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_file_category_from_sub_section`;
 // get_file_sub_category_from_file_category
 get_file_sub_category_from_file_category=`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_file_sub_category_from_file_category`;
 // get_file_subject_reference_from_file_sub_category
 get_file_subject_reference_from_file_sub_category=`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_file_subject_reference_from_file_sub_category`;
 // get_all_college
 get_all_college=`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_college`;
// file sub_category_reference based on category
get_file_sub_category_reference_from_file_sub_category =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_file_sub_category_reference_from_file_sub_category`;
// assignReceiptToAnyDesignation
assignReceiptToAnyDesignation = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/assignReceiptToSO`;
// document Delete
deleteDocument =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/inActiveDocument`;
// get_other_category_users=
get_other_category_users =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_other_category_users`;
// getAllFwdReceiptById
getAllFwdReceiptById=`${this.serverURL.apiServerAddress}dairy-dak/api/v2/receipt/getAllFwdReceiptById`;
// other_section_head_cc //othersection dispatches
other_section_head_cc=`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/other_section_head_cc`;
// other_section_cc_files
other_section_cc_files=`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/other_section_cc_files`;
// getAllCorrectionUsers
getAllCorrectionUsers = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/correctionUserList`;
// assignCCFile
assignCCFile =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/assign_cc_file`;
// tagFileToCCFile
tagFileNumToCCFile =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/tag_file_num_to_cc_file`;
// createNotesheet
filetaggingToCreateNoteSheet =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_cc_file_tagging_to_create_notesheet`;
// sectionWiseCorrectionList
designationListCCFile =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/correctionUserList`;
// getHistoryUpToSecHeadAssign
getHistoryUpToSecHeadAssign=`${this.serverURL.apiServerAddress}dairy-dak/api/v2/receipt/getHistoryUpToSecHeadAssign`;
}


export const urlServiceProvider = [
    urlServices
];
