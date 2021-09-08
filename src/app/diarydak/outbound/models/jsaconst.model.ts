import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';


@Injectable({
    providedIn: CommonServiceModule
})
// tslint:disable-next-line: class-name
export class JSAConstantServices {
    // JSA Dashboard
    table = ['Ref No/File No', 'Dispatches/Receipts', 'Action'];
    dashboardTablee = ['Ref.ID', 'Type', 'Sender Name', 'Date', 'Status', 'Action'];
    dashboardTable = ['Ref.ID', 'Via', 'Sender Name', 'Date', 'Confidentiality', 'Process History', 'Status', 'Action'];
    correctionTable = ['Date','File No','Subject','Sender Name', 'Confidentiality', 'Status', 'Action'];

    // statusList = ['Forwarded', 'Created', 'Assigned', 'Dispatched', 'Approved', 'Returned', 'ReAssigned', 'Disposed',
    //     'Processed', 'Processing', 'ECCirculationReq', 'SeekApproval', 'ApprovedFinalised', 'underCorrection', 'Corrected'];
    ssaStatusList = ['Corrected', 'underCorrection'];
    seekFormErrors = {
        designation: 'Please Enter Designation',
        person: 'Please Enter Person',
        comments: 'Please Enter comments'
    };
    documentRadio = ['Draft', 'Final'];
    formErrors = {
        referenceSection: 'Please Select Section ',
        referenceSubsection: 'Please Select Sub Section',
        referenceSubject: 'Please Enter Subject Reference',
        referenceSubjectId: 'please enter Subject Id',
        refAcademicYear: 'Please Enter Academic Year',
        dispatchDate: 'Please Select Dispatch Date',
        DispatchCategory: 'Please Select  Category',
        DispatchLanguages: 'Please Select  Languages',
        DispatchUrgency: 'Please Select  Urgency',
        DispatchConfidentiality: 'Please Select  Confidentiality',
        senderName: 'Please Enter Sender Name',
        senderDesignation: 'Please Select Sender Designation',
        senderSection: 'Please Select Sender Section',
        DispatchVia: 'Please Select Dispatch Via',
        receiptName: 'Please Enter Recipient Name',
        receiptEmailId: 'Please Enter Recipient Email Id',
        receiptContact: 'Please Enter Receipient Contact Number',
        receiptContactNumber: 'Please Enter 10 Digits Only',
        receipientPattern: 'Contact number should have starts with 9,8,7,6',
        receiptAddressLine1: 'Please Enter Receipient Address Line 1',
        receiptAddressLine2: 'Please Enter Receipient Address Line 2',
        receiptAddressState: 'Please Enter Receipient Address State',
        receiptAddressCity: 'Please Enter Receipient Address City',
        receiptAddressZipCode: 'Please Enter Receipient Address PinCode',
        receiptAddressZipCodeLength: 'Please Enter  6 Digits Only',
        endorsesName: 'Please Enter Endorsee Name',
        endorseEmail: 'Please Enter Email',
        endorseProperEmail: 'Please Enter Proper Email',

        endorseContact: 'Please Enter Contact Number',
        endorseOrg: 'Please Select Organization',
        addressLine1: 'Please Enter Address Line 1',
        addressLine2: 'Please Enter Address Line 2',
        addressState: 'Please Select State',
        addressCity: 'Please Select City',
    };


}
export const ConstantServiceModel = [
    JSAConstantServices
];
