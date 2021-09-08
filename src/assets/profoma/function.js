 function render(datajson) {
           medicalAttachment(datajson[0].flds,datajson[0].name);
           hospitalBed(datajson[1].flds);
           areaRequirements(datajson[2].flds);
           medicalStaff(datajson[3].flds);
           nursingStaff(datajson[4].flds);
           healthStaff(datajson[5].flds);
           engineeringStaff(datajson[6].flds);
           otherStaff(datajson[7].flds);
           administrativeStaff(datajson[8].flds);
           clinicalmaterial(datajson[9].flds);
           nonteachingStaff(datajson[10].flds);
           centralLibrary(datajson[11].flds);
           dentalChair(datajson[12].flds);
           majorEqu(datajson[13].flds);
           oralClinic(datajson[14].flds);
           clinicalWetLab(datajson[15].flds);
           preClinicalLab(datajson[16].flds);
           chromeLab(datajson[17].flds);
           ceramicLab(datajson[18].flds);
           conservative(datajson[19].flds);
           areaRequirementsDental(datajson[21].flds);
           equipmentReq(datajson[22].flds);
           constructedArea(datajson[23].flds);
           staffQuaters(datajson[24].flds);
           hostel(datajson[25].flds,datajson[25].name);
           infrastructure(datajson[26].flds);
           laboratoriesDental(datajson[27].flds);
           laboratories(datajson[28].flds);
           academicBlock(datajson[29].name,datajson[29].section,datajson[30].name,datajson[30].section);
           areareqAnatomy(datajson[31].flds,datajson[31].name);
           equpreqAnatomy(datajson[32].flds,datajson[32].name);
           departmentPhy(datajson[34].flds,datajson[33].name);
           equpreqPhy(datajson[35].flds,datajson[35].name,datajson[35].section);
           equpreqClinical(datajson[36].flds,datajson[36].name,datajson[36].section);
           departmentBioChe(datajson[38].flds,datajson[38].name,datajson[38].section,datajson[37].name,datajson[37].section);
           equpreqBioChe(datajson[39].flds,datajson[39].name);
           equpreqPrepatationRoomBioChe(datajson[40].flds,datajson[40].name);
           equpreqInstumentRoomBioChe(datajson[41].flds,datajson[41].name);
           landinfraDetails(datajson[42].flds,datajson[42].name);
           Observations(datajson[43].flds,datajson[43].name);
           inspectorList(datajson[44].flds,datajson[44].name);

 }
 function medicalAttachment(datajson,name) {
     var admindata = "";
admindata += '<p class="pl-3"><span class="font-weight-bold">'+name+'</span></p>';
 admindata += '<hr width="10%" align="left" style="margin-left: 18px; margin-top: -12px;border-top: 3px double #8c8b8b;">';
      admindata += '<div class="row" style="padding-left: 15px; margin-bottom: 15px">';
       

       $.each(datajson, function(i, element) {
        admindata += '<div class="col-md-10">'+element.name+' </div>';
        admindata += '<div class="col-md-2"  style="margin-bottom: 5px">: ';
        admindata += '' + element.allotted + '';
        admindata += '</div>';
        
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
 function areaRequirements(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered" id="example1">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th></th>';
    admindata += '<th>Required</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_areareq").html(admindata);
 }

 function medicalStaff(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered" id="example1">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Required</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_medicalStaff").html(admindata);
 }

 function nursingStaff(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered" id="example1">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Required</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_nursingStaff").html(admindata);
 }

 function healthStaff(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered" id="example1">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Required</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_healthStaff").html(admindata);
 }

 function engineeringStaff(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered" id="example1">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Required</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_engineeringStaff").html(admindata);
 }

 function otherStaff(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered" id="example1">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Required</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_otherStaff").html(admindata);
 }

 function administrativeStaff(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Required</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_administrativeStaff").html(admindata);
 }

 function clinicalmaterial(datajson) {
    $("#durinsp").val(datajson[0].allotted);
    $("#avg_sixmonth").val(datajson[1].allotted);
    $("#denatal_durinsp").val(datajson[2].allotted);
    $("#dental_avg_sixmonth").val(datajson[3].allotted);
 }

 function nonteachingStaff(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th></th>';
    admindata += '<th></th>';
    admindata += '<th>Requirement</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    var z = 1;
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + z + '</td>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
        z++;
    });
    admindata += '</table>';
    $("#show_nonteachingStaff").html(admindata);
 }
  function centralLibrary(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th></th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_central_library").html(admindata);
 }
  function dentalChair(datajson) {
    $("#denatal_chairs").val(datajson[0].allotted);
    $("#dental_chair_unit").val(datajson[1].allotted);
    $("#dental_chair_no").val(datajson[2].allotted);
 }
  function majorEqu(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Name</th>';
    admindata += '<th>Specification</th>';
   
    admindata += '<th colspan="2" style="text-align:center">Quantity</th>';
    admindata += '</tr>';
    admindata += '<tr>';
    admindata += '<th></th>';
    admindata += '<th></th>';
   
    admindata += '<th>Required</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
         $.each(element.additionalFlds, function(k, elements) {
            if (elements.specifications != null){
            var specifications=elements.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<td>' + specifications + '</td>';
    });
         if (element.required != null){
            var required=element.required;
        }
        else{
            var required='';
        }
        admindata += '<td>' + required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
   
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_major_equ").html(admindata);
    
 }
  function oralClinic(datajson) {
    var admindata = "";
    admindata += '<p><b>B. ORAL PATHOLOGY HAEMATOLOGY CLINIC </b></p>';
    admindata += '<table class="table table-bordered" id="example1">';
   
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';

          $.each(element.additionalFlds, function(k, elements) {
            if (elements.specifications != null){
            var specifications=elements.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<td>' + specifications + '</td>';
    });
        
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_major_equ").append(admindata);
    
 }
 function clinicalWetLab(datajson) {
    var admindata = "";
    admindata += '<p><b>C. CLINICAL WET LAB </b></p>';
    admindata += '<table class="table table-bordered" id="example1">';
   
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td style="width:49%">' + element.name + '</td>';
        if(element.additionalFlds!= null){
          $.each(element.additionalFlds, function(k, elements) {
            if (elements.specifications != null ){
            var specifications=elements.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<td style="width:30%">' + specifications + '</td>';
    });
      }else{
        admindata += '<td></td>';
      }

        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_major_equ").append(admindata);
 }
  function preClinicalLab(datajson) {
    var admindata = "";
    admindata += '<p><b>D. PRE CLINICAL LAB</b></p>';
    admindata += '<table class="table table-bordered" id="example1">';
   
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td style="width:49%">' + element.name + '</td>';
         $.each(element.additionalFlds, function(k, elements) {
            if (elements.specifications != null ){
            var specifications=elements.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<td style="width:30%">' + specifications + '</td>';
    });
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_major_equ").append(admindata);
 }
 function chromeLab(datajson) {
    var admindata = "";
    admindata += '<p><b>E. CHROME COBALT / CAST PARTIAL LABORATORY</b></p>';
    admindata += '<table class="table table-bordered" id="example1">';
   
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td style="width:49%">' + element.name + '</td>';
         $.each(element.additionalFlds, function(k, elements) {
            if (elements.specifications != null ){
            var specifications=elements.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<td style="width:30%">' + specifications + '</td>';
    });
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_major_equ").append(admindata);
 }
 function ceramicLab(datajson) {
    var admindata = "";
    admindata += '<p><b>F. CERAMIC LAB </b></p>';
    admindata += '<table class="table table-bordered" id="example1">';
   
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td style="width:49%">' + element.name + '</td>';
         if(element.additionalFlds!= null){
         $.each(element.additionalFlds, function(k, elements) {
            if (elements.specifications != null ){
            var specifications=elements.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<td style="width:30%">' + specifications + '</td>';
    });
          console.log('de')
     }else{

         admindata += '<td></td>';
     }
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_major_equ").append(admindata);
 }

 function conservative(datajson) {
   var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Name</th>';
    admindata += '<th>Specification</th>';
   
    admindata += '<th colspan="2" style="text-align:center">Quantity</th>';
    admindata += '</tr>';
    admindata += '<tr>';
    admindata += '<th></th>';
    admindata += '<th></th>';
   
    admindata += '<th>Required</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
         if (element.additionalFlds != null ){
         $.each(element.additionalFlds, function(k, elements) {
            if (elements.specifications != null ){
            var specifications=elements.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<td>' + specifications + '</td>';
    });
     }else{
      admindata += '<td></td>';  
     }
        admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
   
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_conservative").html(admindata);
 }
function areaRequirementsDental(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
     admindata += '<th>Required Area</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        $.each(element.additionalFlds, function(k, elements) {
            if (elements.specifications != null ){
            var specifications=elements.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<td>' + specifications + '</td>';
    });
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_areareq_dental").html(admindata);
 }
 function constructedArea(datajson) {

    var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Floor</th>';
    admindata += '<th>Area (sq.ft.)</th>';
    admindata += '<th>Clinical Facilities</th>';
    admindata += '<th>Academic Departments</th>';
    admindata += '<th>Admin/Logistics/Support</th>';
    admindata += '<th>Major Facilities</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson.slice(1), function(i, element) {
        
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        if(element.additionalFlds!=null){
         $.each(element.additionalFlds, function(k, elements) {
            if (elements.allotted != null ){
            var allotted=elements.allotted;
        }
        else{
            var allotted='';
        }
        admindata += '<td>' + allotted + '</td>';
    });
        }else{
          admindata += '<td colspan="5"></td>';  
        }
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_constructedarea").html(admindata);
     
 }
function equipmentReq(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Requirement</th>';
    admindata += '<th>Available</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        if (element.specifications != null){
            var specifications=element.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
        admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_equipmentreq").html(admindata);
 }
 function staffQuaters(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Type (no of rooms)</th>';
    admindata += '<th>No.</th>';
    admindata += '<th>Occupancy Rate (verified)</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_staffquaters").html(admindata);
 }


 function hostel(datajson,name) {
     var admindata = "";
admindata += '<p class="pl-3"><span class="font-weight-bold">'+name+'</span></p>';
 admindata += '<hr width="10%" align="left" style="margin-left: 18px; margin-top: -12px;border-top: 3px double #8c8b8b;">';
      admindata += '<div class="row" style="padding-left: 15px; margin-bottom: 15px">';
       var z=0

       $.each(datajson, function(i, element) {

        if(z<=1)  {
        admindata += '<div class="col-md-10">'+element.name+' </div>';
        admindata += '<div class="col-md-2"  style="margin-bottom: 5px">: ';
        admindata += '' + element.allotted + '';
        admindata += '</div>';
        }
        z++;
         
    });
 
        
           
               
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Dwelling</th>';
    admindata += '<th>Single Seater</th>';
    admindata += '<th>Twin Seater</th>';
    admindata += '<th>Triple Seater</th>';
     admindata += '<th>T% of Accommodation against total strength</th>';
     admindata += '<th>No of equipped Common Rooms</th>';
     admindata += '<th>No of messes</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';

    $.each(datajson.slice(2), function(m, elements) {
      
        admindata += '<tr>';
       
        admindata += '<td>' + elements.name + '</td>';
          $.each(elements.additionalFlds, function(t, elementss) {
         admindata += '<td>' + elementss.allotted + '</td>';
          });
        admindata += '</tr>';
   
    });
    admindata += '</table>';
    $("#show_hostel").append(admindata);

           

       

admindata += '</div>';
 $("#show_hostel").html(admindata);

 }



 function infrastructure(datajson) {
    var admindata = "";
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Infrastructure</th>';
    admindata += '<th>Requirement</th>';
    admindata += '<th>Availability</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.required + '</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_infrastructure").html(admindata);
 }
function laboratoriesDental(datajson){
     var admindata = "";
    admindata += '<p><b>Laboratories (Dental Subjects)</b></p>';
    admindata += '<table class="table table-bordered" id="example1">';

    $.each(datajson, function(i, element) {
        
        admindata += '<tr>';
        admindata += '<td style="width:62%">' + element.name + '</td>';
        admindata += '<td style="width:20%">' + element.required + ' sq. ft.</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_infrastructure").append(admindata);
}
function laboratories(datajson){
     var admindata = "";
    admindata += '<p><b>Laboratories</b></p>';
    admindata += '<table class="table table-bordered">';

    $.each(datajson, function(i, element) {
        
        admindata += '<tr>';
        admindata += '<td style="width:62%">' + element.name + '</td>';
        admindata += '<td style="width:20%">' + element.required + ' sq. ft.</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
    $("#show_infrastructure").append(admindata);
}
function academicBlock(datajson,section,subsectionname,subsection) {
  
    var admindata = "";
    admindata += '<p><b>'+section+' . '+datajson+'</b></p>';
     admindata += '<hr width="10%" align="left" style="margin-left: 18px; margin-top: -12px;border-top: 3px double #8c8b8b;">';
        
          admindata += '<p><b>'+subsectionname+'</b></p>';
           $("#show_acadamicblock").append(admindata);
}

function areareqAnatomy(datajson,name) {
  
    var admindata = "";
    admindata += '<p>'+name+'</p>';
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Required Area</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
     
           $("#show_acadamicblock").append(admindata);
}

function equpreqAnatomy(datajson,name){
    var admindata = "";
    admindata += '<p>'+name+'</p>';
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Required Area</th>';
    admindata += '<th>Available </th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
     
           $("#show_equpreq_Anatomy").append(admindata);
}
function departmentPhy(datajson,name){

 var admindata = "";
    admindata += '<p class="font-weight-bold">'+name+'</p>';
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Required Area</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
     
           $("#show_departmentphy").append(admindata);
}

function equpreqPhy(datajson,name,section){
    var admindata = "";
    admindata += '<p>'+name+'</p>';
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Required Area</th>';
    admindata += '<th>Available </th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        if (element.specifications != null ){
            var specifications=element.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
     
           $("#show_equpreqphy").append(admindata);
}
function equpreqClinical(datajson,name,section){
    var admindata = "";
    admindata += '<p>'+name+'</p>';
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Required Area</th>';
    admindata += '<th>Available </th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        if (element.specifications != null ){
            var specifications=element.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
     
           $("#show_equpreqclinical").append(admindata);
}

function departmentBioChe(datajson,name,section,subname,subsection){

 var admindata = "";
    admindata += '<p class="font-weight-bold">'+subname+'</p>';
    admindata += '<hr width="10%" align="left" style="margin-top: -12px;border-top: 3px double #8c8b8b;">'
     admindata += '<p >'+name+'</p>';
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Required Area</th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + element.specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
     
           $("#show_departmentbioche").html(admindata);
}
function equpreqBioChe(datajson,name){
    var admindata = "";
    admindata += '<p>'+name+'</p>';
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Requirement</th>';
    admindata += '<th>Available </th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        if (element.specifications != null ){
            var specifications=element.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
     
           $("#show_departmentbioche").append(admindata);
}
function equpreqPrepatationRoomBioChe(datajson,name){
    var admindata = "";
    admindata += '<p>'+name+'</p>';
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Requirement</th>';
    admindata += '<th>Available </th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        if (element.specifications != null ){
            var specifications=element.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
     
           $("#show_departmentbioche").append(admindata);
}
function equpreqInstumentRoomBioChe(datajson,name){
    var admindata = "";
    admindata += '<p>'+name+'</p>';
    admindata += '<table class="table table-bordered">';
    admindata += '<thead>';
    admindata += '<tr>';
    admindata += '<th>Department</th>';
    admindata += '<th>Specification</th>';
    admindata += '<th>Requirement</th>';
    admindata += '<th>Available </th>';
    admindata += '</tr>';
    admindata += '</thead> <tbody>';
    $.each(datajson, function(i, element) {
        if (element.specifications != null ){
            var specifications=element.specifications;
        }
        else{
            var specifications='';
        }
        admindata += '<tr>';
        admindata += '<td>' + element.name + '</td>';
        admindata += '<td>' + specifications + '</td>';
         admindata += '<td>' + element.required + '</td>';
         admindata += '<td>' + element.allotted + '</td>';
        admindata += '</tr>';
    });
    admindata += '</table>';
     
           $("#show_departmentbioche").append(admindata);
}
 function landinfraDetails(datajson,name) {
     var admindata = "";
admindata += '<p class="pl-3"><span class="font-weight-bold">'+name+'</span></p>';
 admindata += '<hr width="10%" align="left" style="margin-left: 18px; margin-top: -12px;border-top: 3px double #8c8b8b;">';
      admindata += '<div class="row" style="padding-left: 15px; margin-bottom: 15px">';
       

       $.each(datajson, function(i, element) {
        admindata += '<div class="col-md-10">'+element.name+' </div>';
        admindata += '<div class="col-md-2"  style="margin-bottom: 5px">: ';
        admindata += '' + element.allotted + '';
        admindata += '</div>';
        
    });

admindata += '</div>';
 $("#show_landinfraDetails").html(admindata);

 }
  function Observations(datajson,name) {
     var admindata = "";
admindata += '<p class="pl-3"><span class="font-weight-bold">'+name+'</span></p>';
 admindata += '<hr width="10%" align="left" style="margin-left: 18px; margin-top: -12px;border-top: 3px double #8c8b8b;">';
      admindata += '<div class="row" style="padding-left: 15px; margin-bottom: 15px">';
       

       $.each(datajson, function(i, element) {
       
        admindata += '<div class="col-md-12"  style="margin-bottom: 5px; text-align:justify"> ';
        admindata += '' + element.allotted + '';
        admindata += '</div>';
        
    });

admindata += '</div>';
 $("#show_observations").html(admindata);

 }
  function inspectorList(datajson,name) {
     var admindata = "";
admindata += '<p class="pl-3"><span class="font-weight-bold">'+name+'</span></p>';
 admindata += '<hr width="10%" align="left" style="margin-left: 18px; margin-top: -12px;border-top: 3px double #8c8b8b;">';
      admindata += '<div class="row" style="padding-left: 15px; margin-bottom: 15px">';
       

       $.each(datajson, function(i, element) {
        admindata += '<div class="col-md-10">'+element.name+' </div>';
        admindata += '<div class="col-md-2"  style="margin-bottom: 5px">: ';
        admindata += '' + element.allotted + '';
        admindata += '</div>';
        
    });

admindata += '</div>';
 $("#show_checkinspectorlist").html(admindata);

 }