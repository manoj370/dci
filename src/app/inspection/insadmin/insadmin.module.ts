import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsreportComponent } from './insreport/insreport.component';
import { NewinscComponent } from './newinsc/newinsc.component';
import { ProfomaComponent } from './profoma/profoma.component';
import { InsresponseComponent } from './insresponse/insresponse.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InspectorComponent } from './inspector/inspector.component';
import { TravelagentComponent } from './travelagent/travelagent.component';
import { InspectorviewComponent } from './inspectorview/inspectorview.component';
import { TravelagentviewComponent } from './travelagentview/travelagentview.component';
import { CollegepaymentComponent } from './collegepayment/collegepayment.component';
import { InspectorfeeComponent } from './inspectorfee/inspectorfee.component';
import { InspecdetailsComponent } from './inspecdetails/inspecdetails.component';
import { TravelagentclaimComponent } from './travelagentclaim/travelagentclaim.component';
import { TravelclaimviewComponent } from './travelclaimview/travelclaimview.component';
const insadminRoutes: Routes = [
  { path: 'createIns', component: NewinscComponent },
  { path: 'dashboard', component: InspectorComponent },
  { path: 'manageinspec', component: InsresponseComponent },
  { path: 'dashboard/inspectorView/:id', component: InspectorviewComponent },
  { path: 'manageinspec/inspectionresponse/:id', component: InspecdetailsComponent },
  { path: 'insreport', component: InsreportComponent },

  { path: 'travelagent', component: TravelagentComponent },
  { path: 'tavelagentview', component: TravelagentviewComponent },
  { path: 'profoma', component: ProfomaComponent },
  { path: 'collegepayment', component: CollegepaymentComponent },
  { path: 'inspectorfee', component: InspectorfeeComponent },
  { path: 'travelagentclaim', component: TravelagentclaimComponent },
  { path: 'travelclaimview', component: TravelclaimviewComponent }
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(insadminRoutes),

  ],
  declarations: [InspectorComponent, TravelagentComponent, InspectorviewComponent, 
    TravelagentviewComponent, InspecdetailsComponent, InsreportComponent, NewinscComponent, ProfomaComponent,
    InsresponseComponent, CollegepaymentComponent, InspectorfeeComponent, TravelagentclaimComponent, TravelclaimviewComponent]
})
export class InsadminModule { }
