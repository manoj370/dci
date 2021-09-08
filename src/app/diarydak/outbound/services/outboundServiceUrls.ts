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

    //  outbound apis
    getAllOrganizations = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getListOrganizations`;
    getAllDesignations = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getListOfDCIDesignations`;
    getAllDCISections = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getListOfDCISections`;
    getSubSections = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getListOfSubSections`;
    getDispatchTypes = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getListDispatchTypes`;
    getDispatchById = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_dispatch_by_id`;
    getCounts = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getCountOfDispatchesByStatus`;
    createDispatch = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/createDispatch`;
    updateDispatch = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/updateDispatch`;
    generatedReferenceNo = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/genarateDispatchNum`;
    getAllDispatches = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchDetails`;
    getDispatchItem = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getDispatchItems`;
    searchData = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/searchDispatchDetails`;
    dispatchDatesBetweenDates = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchDetailsBetweenDates`;
    approveAndForwardtoDSE = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/approveDispatch`;
    returnDispatchToSectionExecutive = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/returnDispatchToSE`;
    getAllDispatchDetailsByUser = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchDetailsByUser`;
    getAllDispatchDetailsUserBetweenDates = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchDetailsUserBetweenDates`;
    searchDispatchDetailsByUser = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/searchDispatchDetailsByUser`;
    getAllDispatchDetailsByStatusandBetweenDates = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchDetailsByStatusAndBetweenDates`;
    searchDispatchDetailsByStatus = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/searchDispatchDetailsByStatus`;
    getAllDispatchDetailsByStatus = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchDetailsByStatusAndUserId`;
    updatedespatchdetails = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/updateDispatchDetails`;

    // JSA APICALL 
    SeekApproval = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/seekAproverUserList`;
    approveDispatch = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/approveDispatch`;
    getDispatchVia = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchesVia`;
    getDispatchConfidentiality = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchesConfidentiality`;
    getAllDispatchCategories = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchCategories`;
    getAllDispatchesUrgency = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/getAllDispatchesUrgency`;
    getAllReceiptLanguages = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getAllReceiptLanguages`;
    seekApprovalByUserIDAndComments = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/seekApprovalByUserIDAndComments`;
    getAddressCategory = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_address_category`;
    getUsersByDesignation = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getUsersByDesignationAndSection`;
    getAddressType = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_address_type`;
    getAllPrincipal = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_prinicipal`;
    getAllDME = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_dme`;
    getAllHealthSecy = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_healthsecretary`;
    getAllMinistry = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_ministry`;
    getAllAdvocate = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_advocate`;
    getAlLBulkCategory = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_bulk_category`;
    savedispatch = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/save_dispatch`;
    // SSA aPI calls
    dashBoardURL = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_dispatch_for_dashboard`;
    popupFileData = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/file_number_details`;
    SSStatusList = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_dak_status_for_dashboard`;
    getAllCorrectionList = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/getAllDispatchWorkFlowsByUserId`;
    statusCorrectionList = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/getAllDispatchWorkFlowsByStatusAndUserId`;
    sendToEC = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/sendMailToEc`;
    sendCorrection = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/updateCorrectionResponse`;
    searchCorrectionList = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/searchCorrectionList`;
    datesCorrectionList = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/getAllDispatchWorkFlowsByDispatchIdAndBetweenDates`;
    getAllCorrectionUsers = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/correctionUserList`;
    correctionRequired = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/returnForCorrectionWithComments`;
    usersList = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_ec_user_details`;
    ecToggle = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/ec_criculation_toggle`;
    dispatchApprove = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/approveDispatch`;
    circulationDecision = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/capture_ec_circulation_decision`;
    upDateDocument = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/updateDispatchUploadOnlyDocumentWithDraftAndEcCirculcations`;

    processhistory = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/getAllDispatchWorkFlowsByDispatchId`;
    dashboardStatus = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/findAllDakStatus`;
    getUserListByRoleName = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getaAllUsersByRoleName`;
    searchWithFileNum = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/search_with_file_num`;

    // Correction StatusList
    majorCorrection = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/major_correction_of_dispatch`;
    minorCorrection = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/minor_correction_of_dispatch`;


    correctionStatusList = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/get_correction_status_list`;
    getOtherSectionReceiptsByUserId = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getOtherSectionReceiptsByUserId`;

    //uploadSignedPdf
    uploadSignedPdf = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/uploadSignedPdf`;
    //GetUnsignedPdf
    getUnsignedPdf =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/getUnsignedPdf`;
    //sendMailDispatch
    sendMailDispatch = `${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/sendMailDispatch`;
    // getAllSectionHeads
    // dairy-dak/api/v1/receipt/getAllSectionHeads
    getAllSectionHeads= `${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/getSectionHead`;
    // processHistory
    processHistory =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/getProcessHistoryList`;
    // DFA Subject Search
    searchDfaSubject =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_dispatch_subject_search`;
    removeAddress =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/remove_address`;
    // senderDesignationUserList
    senderDesignationUserList =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/receipt/senderDesignationUserList`;
    // Preview PDF
    PreviewPDF =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/getDispatchFinalPdf`;
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
    // deleting document 
    delete_document =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/delete_document`;
    // previewFinalLetter
    previewFinalLetter =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatchWorkFlow/previewDMSFiles`;
    // trackNoteSheet
    trackNoteSheet =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_all_note_sheets`;
    // get_other_category_users=
    get_other_category_users =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/get_other_category_users`;
    // saveFileNum
    saveFileNum =`${this.serverURL.apiServerAddress}dairy-dak/api/v1/dispatch/save_file_num`;
}

export const urlServiceProvider = [
    urlServices
];
//