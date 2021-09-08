import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';


@Injectable({
    providedIn: CommonServiceModule
})
// tslint:disable-next-line: class-name
export class ConstantModel {
    // JSA Dashboard
    academicYear = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Internship', 'Terminated', 'Passed-Out', 'Completed','Verified'];

    dashboardTable = ['College Name', 'State', 'Pursuing Year', 'Course', 'Specialization', 'CurrentApprovedSeatCapacity',
        'Enrolled Academic Year', 'Student Count'];

}
export const ConstantServiceModel = [
    ConstantModel
];
