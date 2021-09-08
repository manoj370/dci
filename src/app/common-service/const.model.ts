import { Injectable } from '@angular/core';
import { CommonServiceModule } from './common-service.module';

@Injectable({
  providedIn: CommonServiceModule
})
export class appConstants {

  // { path: 'secAFC', component: SecAFComponent },
  // { path: 'secAOB', component: SecAOBComponent },
  // { path: 'secARPL', component: SecARPLComponent },
  // { path: 'secLegal', component: SecLegalComponent },
  // { path: 'secPolicy', component: SecPolicyComponent },
  // { path: 'secVote', component: SecVoteofThnksComponent },
  // { path: 'secConfirm', component: SecConfirmMinComponent },
  // { path: 'secDashboard', component: SecDashboardComponent },
  // { path: 'secNoteRecord', component: SecNoteRecordComponent },
  // { path: 'secConduct', component: SecConductMeetingComponent },
  // { path: 'secActionTaken', component: SecActionTakenComponent },
  // { path: 'secSupplementary', component: SecSupplementaryComponent }

  secSidenav = [
    { linkName: 'Note & Record Apologies', router: 'excu/secretary/secNoteRecord' },
    { linkName: 'Confirm Minutes meeting', router: 'excu/secretary/secConfirm' },
    { linkName: 'Action taken on Meeting', router: 'excu/secretary/secActionTaken' },
    { linkName: 'Policy Matters', router: 'excu/secretary/secPolicy' },
    { linkName: 'Academic Matters', router: 'excu/secretary/secAcademic' },
    { linkName: 'ARPL Matters', router: 'excu/secretary/secARPL' },
    { linkName: 'Administration Matters', router: 'excu/secretary/secAdminstration' },
    { linkName: 'A&F Matters', router: 'excu/secretary/secAFC' },
    { linkName: 'Legal/RTI/Public Grievance Matters', router: 'excu/secretary/secLegal' },
    { linkName: 'Inspection/Membership Matters', router: 'excu/secretary/secInspection' },
    { linkName: 'Supplementary Items', router: 'excu/secretary/secSupplementary' },
    { linkName: 'Any Other Business', router: 'excu/secretary/secAOB' },
    { linkName: 'Vote of Thanks', router: 'excu/secretary/secVote' }
  ]

  ecSidenav = [
    { linkName: 'Agenda', router: 'excu/ec/ecagenda' },
    { linkName: 'Print/Download Minutes', router: 'excu/ec/downloadmeeting' },
    { linkName: 'Search Decision', router: 'excu/ec/searchagenda' }
  ];

  ecSubsidenav = [
    { linkName: 'Note & Record Apologies', router: 'excu/ec/noterecordapologies' },
    { linkName: 'Confirm Minutes meeting', router: 'excu/ec/confirminutes' },
    { linkName: 'Action taken on Meeting', router: 'excu/ec/actiontaken' },
    { linkName: 'Policy Matters', router: 'excu/ec/policymatter' },
    { linkName: 'Academic Matters', router: 'excu/ec/academicmatter' },
    { linkName: 'ARPL Matters', router: 'excu/ec/arplmatter' },
    { linkName: 'Administration Matters', router: 'excu/ec/administrationmatter' },
    { linkName: 'A&F Matters', router: 'excu/ec/accfinancematter' },
    { linkName: 'Legal/RTI/Public Grievance Matters', router: 'excu/ec/legalpublicmatter' },
    { linkName: 'Inspection/Membership Matters', router: 'excu/ec/inspectionmatter' },
    { linkName: 'Supplementary Items', router: 'excu/ec/supplementary' },
    { linkName: 'Any Other Business', router: 'excu/ec/anyotherbusiness' },
    { linkName: 'Date & Venue Next Meeting', router: 'excu/ec/maintaindatevenue' },
    { linkName: 'Vote of Thanks', router: 'excu/ec/voteofthanks' }
  ];

  InsCell = [
    { linkName: 'Maintain Inspector', router: 'inspection/insCell/dashboard' },
    { linkName: 'Inspection Scheduling', router: 'inspection/insCell/createIns' },
    { linkName: 'Manage Inspection', router: 'inspection/insCell/manageinspec' },
    { linkName: 'Inspection Report', router: 'inspection/insCell/insreport' },
    { linkName: 'Inspector Fee Report', router: 'inspection/insCell/inspectorfee' },
    { linkName: 'Travel Agent Claim', router: 'inspection/insCell/travelagentclaim' },
    { linkName: 'College Payment Status', router: 'inspection/insCell/collegepayment' }
  ];

  travelAgent = [
    { linkName: 'Dashboard', router: 'inspection/tavelagent/dashboard' },
    { linkName: 'Bookings', router: 'inspection/tavelagent/shedule' },
    { linkName: 'Claims', router: 'inspection/tavelagent/allClaims' }
  ];

  // form Error messages
  errorMsgs = {
    digits: 'Allow only Digits',
    email: 'Proper Email Required',
    lengthValue: 'length is ',
    wrongPwd: 'Old password is Wrong',
    required: 'Field is Required'
  };
  // error Handlings Messages
  errorsHandlings = {
    404: 'Page Not Found', // actually error page
    401: 'Unauthorized Please Login Again',
    417: ' Expectation Failed',
    500: 'Oops!! Something went wrong please try after some time'
  };
  // Tiny Editor Config
  config: any = {
    height: 250,
    theme: 'modern',
    browser_spellcheck: true,
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
    toolbar: 'formatselect | bold italic strikethrough forecolor fontselect fontsizeselect backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat',
    fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
    image_advtab: true,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    templates: [
    { title: 'Test template 1', content: 'Test 1' },
    { title: 'Test template 2', content: 'Test 2' }
    ],
    content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'
    ]
    };
}

export const constServicesProvider = [appConstants];
