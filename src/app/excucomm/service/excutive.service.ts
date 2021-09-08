import { Injectable } from '@angular/core';
import { ExcutiveurlService } from './excutiveurl.service';
import { HttpServiceService } from 'src/app/common-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ExcutiveService {

  constructor(public url: ExcutiveurlService, public http: HttpServiceService) { }
  // Dashboard
  dashboard() {
    return this.http.get(this.url.Dashboard + '?ecuserId=' + JSON.parse(sessionStorage.getItem('userInfo-usec')).userId);

  }
  // Upcoming Meetings
  upcomingMeetings() {
    return this.http.get(this.url.upcomingMeetings);
  }
  // Upcoming Meetings
  sectionList() {
    return this.http.get(this.url.AllSection);
  }
  // Previous Meetings
  previousMeetings(meetingId: any) {
    return this.http.get(this.url.previousMeetings + '?meetingId=' + meetingId);
  }
  // Get Agenda List By Meeting Menu Meetings
  getAgendaListByMeetings(meetingId: any, meetingList: any) {
    return this.http.get(this.url.AllAgendaByMeeting + '?meetingId=' + meetingId + '&meetingListId=' + meetingList);
  }

  getAllAgendaList(meetingId: any, sectionId: any) {
    if (sessionStorage.getItem('selectedRole-usec') === 'Secretary') {
      return this.http.get(this.url.getSectionList + '?meetingId=' + meetingId + '&sectionId=' + sectionId);
    } else {
      return this.http.get(this.url.getSectionList + '?meetingId=' + meetingId + '&userId='
        + JSON.parse(sessionStorage.getItem('userInfo-usec'))['userId'] + '&sectionId=' + sectionId);
    }
  }

  getAgendaListByMeetingId(meetingId: any, meetingListId: any, page: number, rowId: number) {
    return this.http.get(this.url.getAgendaListByMeeting + '?meetingId=' + meetingId + '&meetingListId=' + meetingListId + '&page=' + page + '&rows=' + rowId)
  }

  AllMeetingHistory(date: any) {
    if (sessionStorage.getItem('selectedRole-usec') === 'Executive Committee') {
      return this.http.get(this.url.meetingHistory + '?date=' + date);
    } else {
      return this.http.get(this.url.shDashboard + '?sectionHeadUserId=' +
        JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&date=' + date);
    }
  }

  // Section Head Agenda List
  getAgendaList(meetingId: any, page: number, rowId: number) {
    return this.http.get(this.url.shAgendaList + '?sectionHeadUserId=' +
      JSON.parse(sessionStorage.getItem('userInfo-usec')).userId + '&meetingId=' + meetingId + '&page=' + page + '&rows=' + rowId);
  }

  // Meeting venues List
  getMeetingVenueList(meetingId: any, date: any) {
    if (date !== '') {
      return this.http.get(this.url.venuesMeetingList + '?meetingId=' + meetingId + '&date=' + date);
    } else {
      return this.http.get(this.url.venuesMeetingList + '?meetingId=' + meetingId);
    }
  }

  meetingDetails(meetingId: any) {
    return this.http.get(this.url.meetingDetails + '?meetingId=' + meetingId);
  }
  // View Agenda
  getAgenda(agendaId: any) {
    return this.http.get(this.url.viewAgenda + '?agendaId=' + agendaId);
  }
  // Agenda Item Number
  agendaItemNumber(agendaItem: any, meetingId: any) {
    return this.http.get(this.url.agendaItem + '?agendaItemNumber' + agendaItem + '&meetingId=' + meetingId);
  }
  // Agenda Item List
  basedAgendaList(meetingId: any, meetingListId: any, page: number, rows: number) {
    return this.http.get(this.url.agendaList + '?meetingId=' + meetingId + '&meetingListId=' + meetingListId + '&page=' + page + '&rows=' + rows);
  }
  // Agenda Item List
  meetingVenueList() {
    return this.http.get(this.url.meetingVenueList);
  }
  meetingDates(meetingId: any) {
    return this.http.get(this.url.meetingDates + '?meetingId=' + meetingId);
  }
  getAgendaSectionList() {
    return this.http.get(this.url.agendaSectionList);
  }
  signedDownload(meetingId: any) {
    return this.http.get(this.url.downloadSignedMinutes + '?meetingId=' + meetingId);
  }
  // Inspection Shedulers
  States() {
    return this.http.get(this.url.States);
  }
  getCityState(id: any) {
    return this.http.get(this.url.cityByStates + '?stateName=' + id);
  }
  getAgendaItem(agendaItem: any, meetingId: any) {
    return this.http.get(this.url.agendaItemView + '?agendaItemNumber=' + agendaItem + '&meetingId=' + meetingId);
  }
  getCaseItem(id: any) {
    return this.http.get(this.url.caseItem + '?agendaId=' + id);
  }
  getListReview(date: any) {
    console.log(date);
    if (date !== '') {
      return this.http.get(this.url.getListReview + '?roleName=' + sessionStorage.getItem('selectedRole-usec') + '?date=' + date);
    } else {
      return this.http.get(this.url.getListReview + '?roleName=' + sessionStorage.getItem('selectedRole-usec'));
    }
  }
  agendaContent(agendaKeyword: any, data: any, meetingId: any) {
    return this.http.get(this.url.searchAgendaContent + '?agendaKeyword=' + agendaKeyword + '&inSubject='
      + data.inSubject + '&inMatter=' + data.inMatter + '&inDiscusions=' + data.inDiscusions + '&inDecision='
      + data.inDecision + '&meetingId=' + meetingId);
  }
  // Add New Meeting
  // Post calls
  addMeeting(meetingId: any, data: any) {
    return this.http.post(this.url.addMeeting + '?meetingId=' + meetingId, data);
  }
  addVenueMeeting(data: any) {
    return this.http.post(this.url.addVenueMeeting, data);
  }


  updateMeeting(data: any) {    
      return this.http.post(this.url.updateMeetings, data);    
  }
  
  voteOfThanks(data: any) {
    if (sessionStorage.getItem('selectedRole-usec') === 'Executive Committee') {
      return this.http.post(this.url.updateMeetings, data);
    } else {
      return this.http.post(this.url.voteOfThanksNotes + '?roleName=' + sessionStorage.getItem('selectedRole-usec'), data);
    }
  }
  updateVenue(data: any) {
    return this.http.post(this.url.updateVenueDetails, data);
  }
  confirmAgenda(data: any) {
    return this.http.post(this.url.confirmAgenda, data);
  }
  sendToEC(fileArray: any, obj: any) {
    const formData = new FormData();
    formData.append('ecMailDtoStr', JSON.stringify(obj));
    formData.append('file', fileArray[0]);

    return this.http.post(this.url.sendTOEc, formData);
  }

  finalMomPublish(meetingId: any, fileArray: any) {
    const formData = new FormData();
    formData.append('file', fileArray[0]);
    return this.http.post(this.url.finalMomPublish + '?meetingId=' + meetingId + '&userId=' +
      JSON.parse(sessionStorage.getItem('userInfo-usec')).userId, formData);

  }

  // Update Calls
  // Update Agenda
  saveAgenda(data: any) {
    return this.http.update(this.url.saveAgenda, data);
  }
  differAgenda(data: any) {
    return this.http.update(this.url.differAgenda, data);
  }
  updateAgenda(data: any) {
    return this.http.update(this.url.updateAgenda, data);
  }
  DecideAgenda(data: any) {
    return this.http.update(this.url.decideAgenda, data);
  }
  momPublish(meetingId: any) {
    return this.http.post(this.url.momPublish + '?meetingId=' + meetingId, '');
  }
  sendReview(id: any) {
    return this.http.update(this.url.sendReview + '?meetingId=' + id, '');
  }
  // Send Section Head Review
  sendSHReview(meetingId: any) {
    return this.http.update(this.url.shReview + '?meetingId=' + meetingId + '&userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec'))['userId'], '');
  }
  // Finalize Meetings
  finalizeMeeting(data: any, meetingId: any) {
    if (data === 'finalize') {
      return this.http.update(this.url.finalizeMeeting + '?meetingId=' + meetingId, '');
    } else {
      return this.http.update(this.url.finalizedSupplementary + '?meetingId=' + meetingId, '');
    }
  }
  // Finish Refinement
  finishRefinements(id: any) {
    return this.http.update(this.url.finishRefinements + '?meetingId=' + id + '&userId=' + JSON.parse(sessionStorage.getItem('userInfo-usec'))['userId'], '');
  }
}

