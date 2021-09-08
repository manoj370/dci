import { Injectable } from '@angular/core';
import { CommonServiceModule } from 'src/app/common-service/common-service.module';
import { ServerURLService } from 'src/app/common-service/serverURL.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: CommonServiceModule
})
export class travelagenturlServices {
    constructor(public serverURL: ServerURLService) {}

    // Travel Agent 
    public travelAgentAllInspection = `${this.serverURL.apiServerAddress}inspection/api/v1/travelAgent/get_all_inspection`;
    public travelAgentupcomingbooking = `${this.serverURL.apiServerAddress}inspection/api/v1/travelAgent/get_inspection_for_booking`;
    public travelAgentcompleted = `${this.serverURL.apiServerAddress}inspection/api/v1/travelAgent/complete_inspection`;
    public travelAgentbooking = `${this.serverURL.apiServerAddress}inspection/api/v1/travelAgent/set_travel_agent`;
    public inspectorDetails = `${this.serverURL.apiServerAddress}inspection/api/v1/travelAgent/get_inspector_details_for_booking`;
    public travelType = `${this.serverURL.apiServerAddress}inspection/api/v1/travelAgent/get_travel_type`;
    public uploadTktDetails = `${this.serverURL.apiServerAddress}inspection/api/v1/travelAgent/upload_ticket_details`;
    public taxList = `${this.serverURL.apiServerAddress}inspection/api/v1/tax_type/get_all_tax`;


}
export const urlServiceProvider = [
    travelagenturlServices
];