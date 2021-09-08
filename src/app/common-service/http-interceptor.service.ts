import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { encryptionService } from '../common-service/cedService';

@Injectable({
  providedIn: 'root'
})
export class CommonInterceptor implements HttpInterceptor {
  accesToken: string;
  constructor(public router: Router, public ced: encryptionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): import('rxjs').Observable<HttpEvent<any>> {
    this.accesToken = this.ced.decryptingProcess('access-token');
    if (this.accesToken) {
      if (req.url.includes(('/getAllGroupsByPagination')) || (req.url.includes(('/listOfRoles')))
        || (req.url.includes(('/getAllSectionByEntityMaster'))) || (req.url.includes(('/getAllUserTypes')))
        || (req.url.includes(('/searchListOfPrivileges'))) || (req.url.includes(('/searchAllUsersData')))
        || (req.url.includes(('/getAllGroupsByAsc'))) || (req.url.includes(('/updateRoleAuthority')))
        || (req.url.includes(('/getAllDesignationByEntityMaster'))) || (req.url.includes(('/getAllUsers')))
        || (req.url.includes(('/AllPrivilages'))) || (req.url.includes(('/listOfAllPrivilages')))
        || (req.url.includes(('/updateRole'))) || (req.url.includes(('/AllPrivilagesByPage')))
        || (req.url.includes(('/AllPrivilagesByGroup'))) || (req.url.includes(('/listOfRolesByPage'))
          || (req.url.includes(('/searchListOfRoles'))) || (req.url.includes(('/createRole'))))
        || (req.url.includes(('/getAllEntityMaster'))) || (req.url.includes(('/searchManageUsersList')))
        || (req.url.includes(('/updateUser'))) || (req.url.includes(('/getLoggedInUserDetails')))
        || (req.url.includes(('/getRoleByRoleId'))) || (req.url.includes(('/getUserByUserId')))
        || (req.url.includes(('/getAllStates'))) || (req.url.includes(('/disableUser')))
        || (req.url.includes(('/get_all_tax'))) || (req.url.includes(('add_meeting_schedule')))
        || (req.url.includes(('/getReceiptDetailsByReceiptId'))) || (req.url.includes(('/get_permittedSeats_byCollege_Specialization')))
        || (req.url.includes(('/get_all_inspectors'))) || (req.url.includes(('/getAllReceiptsByUserIdAndPagination')))
        || (req.url.includes(('/assignReceiptToSectionIncharge'))) || (req.url.includes(('/get_all_states')))
        || (req.url.includes(('/updateDispatchDetails'))) || (req.url.includes(('/get_all_college_by_state')))
        || (req.url.includes(('/getAllInspectionTypes'))) || (req.url.includes(('/getInspectionCourseByTypeAndSubTypeAndPurpose')))
        || (req.url.includes(('/getInspectionPurposesByTypeAndSubType'))) || (req.url.includes(('/getInspectionSubTypesByType')))
        || (req.url.includes(('/get_college_staff'))) || (req.url.includes(('/getAllDentists')))
        || (req.url.includes(('/findAllCollegesByPagination'))) || (req.url.includes(('/delete_agenda')))
        || (req.url.includes(('/get_college_specialisation'))) || (req.url.includes(('inspector_reassign')))
        || (req.url.includes(('/get_ec_dashboard'))) || (req.url.includes(('get_upcoming_ecmeeting')))
        || (req.url.includes(('/get_agenda_for_complaint'))) || (req.url.includes(('get_view_case_item')))
        || (req.url.includes(('/get_all_meetings_history'))) || (req.url.includes(('view_agenda_by_id')))
        || (req.url.includes(('/get_meeting_venue_list'))) || (req.url.includes(('create_ec_agenda')))
        || (req.url.includes(('/get_agendalist_for_sh_review'))) || (req.url.includes(('/submit_section_head_refinement')))
        || (req.url.includes(('/searchMonitoringCellStudentList'))) || (req.url.includes(('/searchMonitoringCellCollegeList')))
        || (req.url.includes(('/add_meeting_venue_details'))) || (req.url.includes(('finalize_metting_date')))
        || (req.url.includes(('/get_dispatch_for_dashboard'))) || req.url.includes(('updateReceiptWithFileNum'))
        || (req.url.includes(('/get_dipatched_notesheets'))) || req.url.includes(('send_email_to_postal'))
        || (req.url.includes(('/remove_address'))) || req.url.includes(('/assignReceiptToSectionExecutive'))
        || (req.url.includes(('get_agenda_list_by_meeting_menu_id'))) || (req.url.includes(('/getAllReceiptLanguages')))
        || (req.url.includes(('/get_agenda_item_no'))) || (req.url.includes(('get_agenda_list_by_meeting_id')))) {
        req = req.clone({
          headers: req.headers.set('Access-Control-Allow-Origin', '*').set('Authorization', 'Bearer ' +
            this.accesToken)
            .set('Content-Type', 'application/json'),
          responseType: 'json',
        });
      } else if ((req.url.includes(('/updateDispatchUploadOnlyDocumentWithDraftAndEcCirculcations')))) {
        req = req.clone({
          headers: req.headers.set('Accept', 'application/json').set('Access-Control-Allow-Origin', '*')
            .set('Authorization', 'Bearer ' + this.accesToken).set('Content-Type', 'application/json;charset=UTF-8'),
          responseType: 'json',
        });
      } else if ((req.url.includes(('/upload_ticket_details'))) || (req.url.includes(('/raise_complaint'))) ||
        (req.url.includes(('/updateReceipt'))) || (req.url.includes(('/forwardto_sdc'))) ||
        (req.url.includes(('/forwardto_college'))) || (req.url.includes(('/mom_publish_final'))) ||
        (req.url.includes(('/updateDispatchUploadOnlyDocumentWithDraftAndEcCirculcations'))) || req.url.includes(('/send_mom_to_ec')) ||
        ((req.url.includes(('/college_feedback')))) || req.url.includes(('/get_dispatch_by_id')) ||
        (req.url.includes(('/promoteStudent'))) || req.url.includes(('/createReceipt'))) {
        req = req.clone({
          headers: req.headers.set('Accept', 'application/json').set('Access-Control-Allow-Origin', '*')
            .set('Authorization', 'Bearer ' + this.accesToken),
          responseType: 'json',
        });

      } else if (req.url.includes(('/createDispatch')) || req.url.includes(('/createReceipt')) ||
        (req.url.includes(('/updateReceipt'))) || (req.url.includes(('/updateDispatch'))) || (req.url.includes(('/save_dispatch')))||(req.url.includes(('/uploadSignedPdf')))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this.accesToken).set('Accept', 'application/json').set('Access-Control-Allow-Origin', '*'),
          responseType: 'json',
        });
      } else if (req.url.includes(('/createStudentAdmission')) || req.url.includes(('/updateStudentAdmissionByAdmissionID'))
        || req.url.includes(('/SubmittedToCA'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this.accesToken).set('Accept', 'application/json'),
          responseType: 'json',
        });
      } else if (req.url.includes(('/updateAdmissionStatus'))) {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this.accesToken).set('Accept', 'application/json'),
          responseType: 'json',
        });
      }
      else if (req.url.includes(('/getDispatchFinalPdf'))|| req.url.includes('/print_address')|| req.url.includes('/previewDMSFiles')) {
        req = req.clone({
          headers: req.headers.set('Accept', 'application/json')
          .set('Authorization','Bearer ' + this.accesToken).set('Access-Control-Allow-Origin', '*'),
        responseType: 'blob',
        });
      }
      else if ((req.url.includes(('http://okmAdmin')))) {
       req = req.clone({
         headers: req.headers.set('Accept', '*'),
         // responseType: 'json',
         //  headers: req.headers.delete('Authorization', 'Bearer ' + this.accesToken),
         responseType: 'blob',
 
       });
       //  delete req.headers.set({})
       req.headers.delete('Authorization', 'Bearer ' + this.accesToken);
     }
      else {
        req = req.clone({
          headers: req.headers.set('content-type', 'application/json').set('Authorization', 'Bearer ' +
            this.accesToken),
          responseType: 'json',
        });
      }
    } else if ((req.url.includes(('/getOauthAccessToken')))) {
      req = req.clone({
        headers: req.headers.set('Accept', 'application/json').set('Access-Control-Allow-Origin', '*'),
        responseType: 'json',
      });
    }
  
    return next.handle(req);
  }
}



