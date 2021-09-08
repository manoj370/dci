import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';
import { ServerURLService } from 'src/app/common-service/serverURL.service';


@Injectable({
    providedIn: CommonServiceModule
})
// tslint:disable-next-line: class-name
export class urlServices {
    constructor(public serverURL: ServerURLService) { }
    // Login
    login = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getOauthAccessToken`;
    
    getLoginUserId = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getLoggedInUserDetails`;
    documentUrl = `${this.serverURL.DocumentServerAddress}DCIDMS/services/rest/document/getFile`;

    // Complaint Servives
    allComplaints = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getAllComByComplainantPagenation`;
    complaintTypes = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getall-complaint-type`;
    complaintAgainst = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getall-complaint-against`;
    raiseComp = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/raise_complaint`;
    viewComp = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/get-complaintById-forComplainant?`;
    colleageState = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getAllStates`;
    colleageByState = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getAllCollegesByState`;
    dentistlist = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getAllDentists`;
    allSections = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getAllSections`;
    sectionById = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getAllUsersBySection`;
    reappeal = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/re_appeal`;
    searchComplintsList = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getAllComByComplainantSearch`;
    searchDentistList = `${this.serverURL.apiServerAddress}grievance/api/v1/complaint/getAllDentistsByState`;


    // Section Head
    getComplainints = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/get_complaints_assigned_to_section_head?`;
    getComplainintDetails = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/get_complaintById_forSectionHead?`;
    assignComp = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/record-sectionHeadAction`;
    getChronical = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/getProcessHistoryList`;
    dashboardCount = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/get_SectionHead_dashboard_info`;
    rolesList = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/get_rolesForSectionExecutive`;
    userBasedOnRoleList = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/get_usersForSecExecByDesignation`;
    serchHeadCompl = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/getComplaintsSecHeadSearch`;
    reAppealAccept = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/appeal_justification`;

    // Section Excutive
    getComplainintsofsecexc = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/getall_complaints_bySecExecUserId?`;
    getComplaint = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/get_complaintById_forSectionExecutive`;
    seDashboardCount = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/get_SecExecutive_dashboard_info`;
    getSDClist = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/getall_sdcList`;
    forwardCollege = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/forwardto_college`;
    forwardSDC = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/forwardto_sdc?`;
    agendaCreation = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/record_section_executive_comment`;
    finalResponse = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/close_Complaint_bySecExec`;
    agendaList = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/get_agenda_item_no`;
    searchSEComplList = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/getComplaintsSecExecSearch`;
    getAgendaItemNumber = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/get_ec_agenda_item_no`;
    agendaDelete = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/delete_agenda`;
    agendaDetails = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/get_agenda_for_complaint`;
    updateAgenda = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionExecutiveAction/update_agenda`;


    // Sub Committee
    SubComDecision = `${this.serverURL.apiServerAddress}grievance/api/v1/sub_committee/record_sc_decision`;
    getAllagenda = `${this.serverURL.apiServerAddress}grievance/api/v1/sub_committee/get_agenda_by_sc?`;
    getComplaintofSC = `${this.serverURL.apiServerAddress}grievance/api/v1/sub_committee/get_complaintById_for_sc?`;
    scDashboard = `${this.serverURL.apiServerAddress}grievance/api/v1/sub_committee/get_SubComm_dashboard_info`;
    searchCompl = `${this.serverURL.apiServerAddress}grievance/api/v1/sub_committee/getAgendaByScSearch`

    // Excutive Commitiee
    getAllagendabyExc = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/get_agenda_by_ec?`;
    getAllOtherSec = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/get_allOtherSections`;
    excCommDahboard = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/get_ExeComm_dashboard_info`;
    getComplaintofExc = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/get_complaintById_for_ec?`;
    excutiveDecision = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/record_exeComDecision`;
    differDecision = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/record_differ_action_byec`;
    saveAgenda = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/saveAgenda`;
    forwardAgenda = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/forward_to_other_section`;
    serachAgenda = `${this.serverURL.apiServerAddress}grievance/api/v1/exe_committee/getAgendaByEcSearch`;

    //  college
    collegeComplList = `${this.serverURL.apiServerAddress}grievance/api/v1/collegeResponse/getAll_complaints_byCollegeUserId`;
    searchCollege = `${this.serverURL.apiServerAddress}grievance/api/v1/collegeResponse/getComplaintsCollegeSearch`;
    getComplintDetails = `${this.serverURL.apiServerAddress}grievance/api/v1/collegeResponse/get_complaintById_forCollege`;
    // feedbackOnComplintDetails = `${this.serverURL.apiServerAddress}grievance/api/v1/collegeResponse/get_complaintById_forCollege`;
    feedbackOncolleage = `${this.serverURL.apiServerAddress}grievance/api/v1/collegeResponse/college_feedback`;
    getAccessTokenByRefreshToken = `${this.serverURL.apiServerAddress}user-management/api/v1/user/getOauthRefreshToken`;


    // checkCurrentPwd
    checkCurPwd =`${this.serverURL.apiServerAddress}user-management/api/v1/user/checkCurPwd`;
    // changePwd
    changePwd =`${this.serverURL.apiServerAddress}user-management/api/v1/user/changePassword`;
}
export const urlServiceProvider = [
    urlServices
];
