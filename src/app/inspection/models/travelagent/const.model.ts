import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';

@Injectable({
    providedIn: CommonServiceModule
})
export class travelAgentConstants {
    // Travel Agent Schedule 
    statusList = ['Completed Bookings', 'Pending Bookings', 'Upcoming Bookings'];
    tableHeaders = ['Inspection Id', 'From Date', 'To Date', 'Inspector Count', 'Status', 'Action'];
    // Upload Ticket Details
    cardsList = [{ label: 'OUTWARD', collapsing: 'collapseOne', headingValue: 'headingOne', keyValue: 'OUTWARD' },
    { label: 'RETURN', collapsing: 'collapseTwo', headingValue: 'headingTwo', keyValue: 'RETURN' }];
    formErrors = {
        fromDate: 'Please Enter From Date',
        toDate: 'Please Enter To Date',
        file: 'Please Enter File',
        amount: 'Please Enter Amount',
        charges: 'Please Enter Charges',
        GstType: 'Please Select GST Type',
        Gstamt: 'Please Enter GST Amount',
        journType: 'Please Select Journey Type',
        journeyDate: 'Please Enter Journey Date',
        fromPlace: 'Please Enter From Place',
        toPlace: 'Please Enter To Place'
    };
    viewShedule = [{ label: 'Pickup Point', key: 'pickupPoint' }, { label: 'Drop Point', key: 'dropPoint' },
                    { label: 'Gender', key: 'gender' },{ label: 'Age', key: 'age' } ];
}

export const constServicesProvider = [travelAgentConstants];
