import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';
import { ServerURLService } from 'src/app/common-service/serverURL.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: CommonServiceModule
})
export class ExcutiveurlService {
  constructor(public serverURL: ServerURLService) {}
  public documentUrl = `${this.serverURL.DocumentServerAddress}DCIDMS/services/rest/document/getFile`; // Document
  public Dashboard = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_ec_dashboard`;
  public upcomingMeetings = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_upcoming_ecmeeting`;
  public previousMeetings = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_previous_ecmeeting`;
  public meetingHistory = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_all_meetings_history`;
  public viewAgenda = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/view_agenda_by_id`;
  public finalizeMeeting = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/finalize_metting_date`;
  public finalizedSupplementary = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/finalize_supplementary_metting_date`;
  public decideAgenda = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/decide_ec_agenda`;
  public getSectionList = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_section_list_for_meeting`;
  public getAgendaListByMeeting = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_agenda_list_by_meeting_id`;
  public updateAgenda = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/update_agenda_by_id`;
  public agendaItem = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_agenda_item_no`;
  public agendaList = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_agenda_list_by_meeting_id`;
  public updateMeetings = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/update_meeting_details`;
  public voteOfThanksNotes = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/update_meeting_vot_by_secretary_president`;
  public agendaItemView = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_agenda_item_no_view`;
  public saveAgenda = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/saveAgenda`;
  public AllAgendaList = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_all_agendas_for_meeting`;
  public AllSection = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_all_sections`;
  public AllAgendaByMeeting = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_agenda_list_by_meeting_menu_id`;
  public updateVenueDetails = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/update_meeting_venue_and_date`;
  public addMeeting = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/add_meeting_schedule`;
  public addVenueMeeting = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/add_meeting_venue_details`;
  public differAgenda = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/differ_agenda`;
  public agendaSectionList = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_agenda_section_list_for_search`;
  public meetingDates = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_all_meetings_history_dates`;
  public meetingVenueList = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_meeting_venue_list`;
  public States = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/getAllStates`;
  public cityByStates = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/get_city_by_state`;
  public confirmAgenda = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/create_confirm_meetings_agenda`;
  public venuesMeetingList = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_next_meeting_venues`;
  public momPublish = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/publish_mom`;
  public caseItem = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_view_case_item`;
  public sendReview = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/send_to_secretary_review`;
  public getListReview = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_meeting_for_review`;
  public searchAgendaContent = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/search_agenda_content`;
  public meetingDetails = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_meeting_details`;
  public shReview = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/send_to_section_head_review`;

  // Section Head
  public shDashboard = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_meeting_for_sh_review`;
  public shAgendaList = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/get_agendalist_for_sh_review`;
  public finishRefinements = `${this.serverURL.apiServerAddress}grievance/api/v1/sectionHead/submit_section_head_refinement`;
  public sendTOEc = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/send_mom_to_ec`;
  public finalMomPublish = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/mom_publish_final`;
  public downloadSignedMinutes = `${this.serverURL.apiServerAddress}executivecommittee/api/v1/exe_com/get_signed_minutes`;

}
export const urlServiceProvider = [
  ExcutiveurlService
];
