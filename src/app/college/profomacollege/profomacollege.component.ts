import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profomacollege',
  templateUrl: './profomacollege.component.html',
  styleUrls: ['./profomacollege.component.css']
})
export class ProfomacollegeComponent implements OnInit {
  rowId = 0;
  newData: any;
  totLength: any;
  dummyJson =
    {
      inspectionId: 113,
      sections: [
        {
          section: '2',
          name: ' MEDICAL COLLEGE ATTACHMENT ',
          remarks: null,
          flds: [
            {
              name: 'a. Medical College duly recognized by Medical Council of India.',
              type: 'YES_NO',
              hasRequired: false,
              required: null,
              fieldName: null,
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: 'YES',
              additionalFlds: null
            },
            {
              name: 'b. Distance from Dental college to Medical college by road (km)',
              type: 'INT',
              hasRequired: false,
              required: null,
              fieldName: '',
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: '5',
              additionalFlds: null
            },
            {
              name: 'Please clarify as to whether you have physically verified /taking the reading of Taxi/Car Meter ',
              type: 'YES_NO',
              hasRequired: false,
              required: null,
              fieldName: null,
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: 'YES',
              additionalFlds: null
            },
            {
              name: 'c. Whether MOU is signed by competent Authorities between Medical and Dental College for teaching purpose',
              type: 'YES_NO',
              hasRequired: false,
              required: null,
              fieldName: null,
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: 'YES',
              additionalFlds: null
            },
            {
              name: 'd. Validity Period of MOU (yrs) ',
              type: 'INT',
              hasRequired: false,
              required: null,
              fieldName: '',
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: '5',
              additionalFlds: null
            },
            {
              name: 'e. Whether the above mentioned Medical College is attached to any other Dental College other than the proposed dental college ',
              type: 'YES_NO',
              hasRequired: false,
              required: null,
              fieldName: null,
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: 'YES',
              additionalFlds: null
            },
            {
              name: 'f. GOI Notification No. & Dated',
              type: 'TEXT',
              hasRequired: false,
              required: null,
              fieldName: '',
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: '5 & 12/07/2020',
              additionalFlds: null
            }
          ]
        },
        {
          section: '3',
          name: 'Hospital',
          remarks: null,
          flds: [
            {
              name: 'Whether the permission of the attached 100 bedded hospital is issued by the competent authority?',
              type: 'YES_NO',
              hasRequired: false,
              required: null,
              fieldName: null,
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: 'YES',
              additionalFlds: null
            },
            {
              name: 'Distance of the hospital from the Dental College By Road (please clarify as to whether you have physically verified/taking the reading of Taxi/Car Meter)',
              type: 'TEXT',
              hasRequired: false,
              required: null,
              fieldName: '',
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: '5',
              additionalFlds: null
            },
            {
              name: 'Number of Beds in Hospital',
              type: 'INT',
              hasRequired: false,
              required: null,
              fieldName: '',
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: 100,
              additionalFlds: null
            },
            {
              name: 'General Ward – Medical including allied specialties',
              type: 'INT',
              hasRequired: true,
              required: '30',
              fieldName: 'Alloted',
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: '5',
              additionalFlds: [
                {
                  name: 'Occupancy for last 6 months',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null,
                  collegeInput: '5',
                  additionalFlds: null
                },
                {
                  name: 'Occupancy for present day',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null,
                  collegeInput: '5',
                  additionalFlds: null
                }
              ]
            },
            {
              name: 'General Ward –Surgical including allied specialities',
              type: 'INT',
              hasRequired: true,
              required: '30',
              fieldName: 'Alloted',
              readOnly: false,
              readOnlyValue: null,
              specifications: null,
              collegeInput: '5',
              additionalFlds: [
                {
                  name: 'Occupancy for last 6 months',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null,
                  collegeInput: '5',
                  additionalFlds: null
                },
                {
                  name: 'Occupancy for present day',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null,
                  collegeInput: '5',

                  additionalFlds: null
                }
              ]
            },
            {
              name: 'public Ward (A/C & Non A/C)',
              type: 'INT',
              hasRequired: true,
              required: '9',
              fieldName: 'Alloted',
              readOnly: false,
              readOnlyValue: null,
              specifications: null, collegeInput: '5',
              additionalFlds: [
                {
                  name: 'Occupancy for last 6 months',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                },
                {
                  name: 'Occupancy for present day',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                }
              ]
            },
            {
              name: 'Maternity Ward',
              type: 'INT',
              hasRequired: true,
              required: '15',
              fieldName: 'Alloted',
              readOnly: false,
              readOnlyValue: null,
              specifications: null, collegeInput: '5',
              additionalFlds: [
                {
                  name: 'Occupancy for last 6 months',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                },
                {
                  name: 'Occupancy for present day',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                }
              ]
            },
            {
              name: 'Paediatric Ward',
              type: 'INT',
              hasRequired: true,
              required: '6',
              fieldName: 'Alloted',
              readOnly: false,
              readOnlyValue: null,
              specifications: null, collegeInput: '5',
              additionalFlds: [
                {
                  name: 'Occupancy for last 6 months',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                },
                {
                  name: 'Occupancy for present day',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                }
              ]
            },
            {
              name: 'Intensive Care Services (4% of bed strength)',
              type: 'INT',
              hasRequired: true,
              required: '4',
              fieldName: 'Alloted',
              readOnly: false,
              readOnlyValue: null,
              specifications: null, collegeInput: '5',
              additionalFlds: [
                {
                  name: 'Occupancy for last 6 months',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                },
                {
                  name: 'Occupancy for present day',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                }
              ]
            },
            {
              name: 'Critical Care Services (6% of bad strength)',
              type: 'INT',
              hasRequired: true,
              required: '6',
              fieldName: 'Alloted',
              readOnly: false,
              readOnlyValue: null,
              specifications: null, collegeInput: '5',
              additionalFlds: [
                {
                  name: 'Occupancy for last 6 months',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                },
                {
                  name: 'Occupancy for present day',
                  type: 'INT',
                  hasRequired: false,
                  required: null,
                  fieldName: 'Alloted',
                  readOnly: false,
                  readOnlyValue: null,
                  specifications: null, collegeInput: '5',
                  additionalFlds: null
                }
              ]
            }
          ]
        },

      ]
    };
  constructor() { }

  ngOnInit() {
    console.log(this.dummyJson);
    this.getData(0);
  }
  getData(id: any) {
    console.log(this.dummyJson.sections.length);
    this.totLength = this.dummyJson.sections.length;
    this.newData = this.dummyJson.sections[id];
    console.log(this.newData);
  }
  next() {
    if (this.rowId !== this.totLength) {
      ++this.rowId;
      this.getData(this.rowId);
    }
  }
  previous() {
    if (this.rowId >= 1) {
      --this.rowId;
      this.getData(this.rowId);
    }
  }
}
