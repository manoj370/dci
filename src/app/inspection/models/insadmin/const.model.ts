import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';

@Injectable({
    providedIn: CommonServiceModule
})
export class InspectionAdminConstants {
    inspectorTable = ['Name', 'College Name', 'Specialization', 'Mobile', 'Email', 'Work Exp', 'Status', 'Action'];
    popupTable = ['Name', 'College Name', 'Specialization', 'Mobile', 'Email', 'Work Exp',  'Action'];
    newInsTable = ['College Name', 'Email ID', 'City', 'State', 'Action'];
    manageInspection = ['College Name', 'State', 'Inspection Type', 'Course', 'From Date', 'To Date', 'Action', 'View'];
    inspectionResponseDetails = ['Inspector Name', 'Mobile Number', 'Email Id', 'Inspector Response', 'Reason'];
    detailsArray = [
        { key: 'name', label: 'Name' },
        { key: 'emailId', label: 'Email Id' },
        { key: 'mobile', label: 'Mobile Number' },
        { key: 'collegeName', label: 'College Name' },
        { key: 'workExperience', label: 'Work Experience' },
        { key: 'specialisation', label: 'Specializations' }
      ];
      addressArray = [
        { key: 'line1', label: 'Line 1' },
        { key: 'line2', label: 'Line 2' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'country', label: 'Country' }
      ];

}

export const constServicesProvider = [InspectionAdminConstants];
