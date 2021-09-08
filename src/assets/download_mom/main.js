 function render(datajson) {
     displayMom(datajson);
     

 }

 function displayMom(datajson) {
     var admindata = "";
     var count = 1;
     $.each(datajson, function(i, element) {
        if(element.aegndaSectionId==1 || element.aegndaSectionId==13 || element.aegndaSectionId==14){

admindata += '<div class="col-md-10"><b>' + count + '. ' + element.agendaSectionName + ' </b></div>';
 if (element.agendaItemSubject!='') {
    admindata += '<div class="row ml-3">';
              admindata += '<div class="col-md-11"  style="margin-bottom: 5px"> ';
                 admindata += '' + element.agendaSubject + ' ';
                 admindata += '</div>';
                 admindata += '</div>';
            
         } else {
              admindata += '<div class="col-md-10 mb-4" >No Data </div>';
             }

        }else{
         admindata += '<div class="col-md-10"><b>' + count + '. ' + element.agendaSectionName + ' </b></div>';
         if (jQuery.isEmptyObject(element.ecAgendaList)) {
             admindata += '<div class="col-md-10 mb-4" >No Data </div>';
         } else {
             admindata += '<div class="row ml-3">';
             $.each(element.ecAgendaList, function(i, elements) {
                 admindata += '<div class="col-md-1"  style="margin-bottom: 5px"> ';
                 admindata += '' + elements.agendaCategroyItemRefNumber + ' ';
                 admindata += '</div>';
                 admindata += '<div class="col-md-11"  style="margin-bottom: 5px"> ';
                 admindata += '' + elements.agendaItemSubject + ' ';
                 admindata += '</div>';
                 admindata += '<div class="col-md-12 mb-4"> ';
                 if (jQuery.isEmptyObject((elements.agendaItemDecision))) {
                     admindata += 'No Data ';
                 } else {
                     // var decode=atob(encodedString);
                     admindata += '' + window.atob(elements.agendaItemDecision) + '';
                 }
                 admindata += '</div>';

             });
             admindata += '</div>';
         }
     }
         count++;
     });

     admindata += '</div>';
     $("#show_medicalattachment").html(admindata);

 }

 function hospitalBed(datajson) {
     var admindata = "";
     admindata += '<table class="table table-bordered" id="example1">';
     admindata += '<thead>';
     admindata += '<tr>';
     admindata += '<th>Department</th>';
     admindata += '<th>Required</th>';
     admindata += '<th>Allotted</th>';
     admindata += '<th colspan="2" style="text-align:center">Occupancy</th>';
     admindata += '</tr>';
     admindata += '<tr>';
     admindata += '<th></th>';
     admindata += '<th></th>';
     admindata += '<th></th>';
     admindata += '<th>During last 6 months</th>';
     admindata += '<th>On the day of inspection</th>';
     admindata += '</tr>';
     admindata += '</thead> <tbody>';
     $.each(datajson.slice(1), function(i, element) {
         admindata += '<tr>';
         admindata += '<td>' + element.name + '</td>';
         admindata += '<td>' + element.required + '</td>';
         admindata += '<td>' + element.allotted + '</td>';
         $.each(element.additionalFlds, function(k, elements) {
             admindata += '<td>' + elements.allotted + '</td>';
         });
         admindata += '</tr>';
     });
     admindata += '</table>';
     $("#show_department").html(admindata);
     $("#bedsno").html(datajson[0].allotted);
 }