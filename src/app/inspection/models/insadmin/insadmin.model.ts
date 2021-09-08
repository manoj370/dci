import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';
import { ServerURLService } from 'src/app/common-service/serverURL.service';


@Injectable({
    providedIn: CommonServiceModule
})
export class insadminUrl {
    constructor(public serverURL: ServerURLService) { }

    // InspectionCell
    // Inspectors In InspectionCell
    public getAllInspectors = `${this.serverURL.apiServerAddress}inspection/api/v1/inspector/getInspectorListSearch`;
    public getInsByStatus = `${this.serverURL.apiServerAddress}inspection/api/v1/inspector/get_inspectors_by_status`;
    public states = `${this.serverURL.apiServerAddress}inspection/api/v1/inspector/get_all_states`;
    public getcollBystate = `${this.serverURL.apiServerAddress}inspection/api/v1/inspector/get_all_college_by_state`;
    public collegeSpecilization = `${this.serverURL.apiServerAddress}inspection/api/v1/inspector/get_college_specialisation`;
    public collegeStaff = `${this.serverURL.apiServerAddress}inspection/api/v1/inspector/get_college_staff`;
    public addingInspector = `${this.serverURL.apiServerAddress}inspection/api/v1/inspector/save_inspector`;
    public getInspectorDetails = `${this.serverURL.apiServerAddress}inspection/api/v1/inspector/get_inspector_by_id`;
    public removeInspector = `${this.serverURL.apiServerAddress}inspection/api/v1/inspector/delete_inspector`;

    // Inspection Shedulers    
    public shedulingStates = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/getAllStates`;
    public cityByStates = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/get_city_by_state`;
    public colegeList = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/get_college_list`;
    public allInspetypes = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/getAllInspectionTypes`;
    public inspeCoursePurpo = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/getInspectionCourseByTypeAndSubTypeAndPurpose`;
    public inspePurpoCourse = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/getInspectionSpecailsationByTypeAndSubTypeAndPurposeAndCourse`;
    public inspeCoursetype = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/getInspectionPurposesByTypeAndSubType`;
    public inspeCourseSubtype = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/getInspectionSubTypesByType`;
    public saveSheduleInspe = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/save_schedule_inspection`;
    public permittedSeats = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/get_permittedSeats_byCollege_Specialization`;

    // manageInspection
    public getallShedule = `${this.serverURL.apiServerAddress}inspection/api/v1/manageInspection/get_all_scheduleinpsections`;
    public getSheduleDetails = `${this.serverURL.apiServerAddress}inspection/api/v1/manageInspection/get_scheduleinpsection_by_id`;
    public cancelInspection = `${this.serverURL.apiServerAddress}inspection/api/v1/manageInspection/cancel_inspection`;
    public searchgetallShedule = `${this.serverURL.apiServerAddress}inspection/api/v1/manageInspection/getInspectionsSearch`;
    public resheduleInspection = `${this.serverURL.apiServerAddress}inspection/api/v1/manageInspection/reschedule_inspection`;
    public reassign = `${this.serverURL.apiServerAddress}inspection/api/v1/manageInspection/inspector_reassign`;

    // Report API
    public reportList = `${this.serverURL.apiServerAddress}inspection/api/v1/scheduleInspection/get_scheduled_inspections_by_from_date_and_to_date_and_college`;






}
export const urlServiceProvider = [
    insadminUrl
];
