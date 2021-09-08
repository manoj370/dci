import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';


@Injectable({
    providedIn: CommonServiceModule
})
// tslint:disable-next-line: class-name
export class ECconstantServices {
    // Complainant
    downloadTableHeader = ['Meeting Date', 'Meeting Venue',];

    // Agenda List
    agendaTableHeader = ['Item No', 'Section', 'Sub-Section', 'Item Subject', 'Agenda Create Date'];

    // 13 Sidebar Link Name
    meetingVenueHeader = [ 'Meeting Date','Meeting Venue', 'Edit'];
    formErrors = {
        venueName: 'Please Enter Venue Name',
        meetingDate: 'Please Enter Venue Date',
        line1: 'Please Enter Address Line 1',
        line2: 'Please Enter Address Line 2',
        city: 'Please Select City',
        state: 'Please Select State',
        zipCode: 'Please Enter Valid zipCode',
        zipCodeLength: 'Please 5 Digits Of zipCode',
        discussion: 'Please Enter Discussion',
        decision: 'Please Enter Decision'
    };
    // 4,5 Sidebar Link Numbers
    Headers = ['Item No', 'Sub-Section', 'Subject', 'Action'];


}
export const ConstantServiceModel = [
    ECconstantServices
];
