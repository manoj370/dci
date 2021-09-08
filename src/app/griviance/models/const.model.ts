import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';


@Injectable({
    providedIn: CommonServiceModule
})
// tslint:disable-next-line: class-name
export class constantServices {
    // Complainant
    ComplainantTableHeader = ['Complaint Id', 'Complaint Against', 'Complaint Type', 'Raised Date', 'Status'];
    newComplaint = {
        complaintAgainst: 'Please Enter ComplaintAgainst',
        complaintType: 'Please Enter Complaint Type',
        complaintSub: 'Please Enter Complaint Subject ',
        complaintDes: 'Please Enter Complaint Description'
    };
    // Section Head
    ShtableHeaders = ['Complaint Id', 'Name', 'Complaint Against', 'Type', 'Created Date', 'Status', 'Process History'];
    ShassignPopup = {
        roleRequired: 'Please Enter Role',
        personRequired: 'Please Enter Person Name'
    };

    // Section Executive
    SEtableHeaders = ['Complaint Id', 'Name', 'Complainant Email', 'Type', 'Created Date', 'Complaint Against', 'Status', 'Action'];
    semakeAgenda = {
        itemNumber: 'Please Enter ItemNumber',
        itemsub: 'Please Enter Item Subject',
        ltr: 'Please Enter LTR NUmber',
    };
    // Sub Committees
    sctableheaders = ['Item Subject', 'Agenda Matters', 'Date', 'Status'];
    // College
    collegeTable = ['Complaint Id', 'Complaint Type', 'Raised Date', 'Raised By', 'Status']

}
export const ConstantServiceModel = [
    constantServices
];
