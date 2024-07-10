var url = new URL(window.location.href);
localStorage.setItem("port", url.port);
var privelageData,privelageId;
var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;
document.addEventListener("DOMContentLoaded", function () {
  getPrivelage();
});

function getPrivelage() {

  $.ajax({
    url: `${apiUrl}Privelage/GetPrivelage/`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function (result) {
      console.log(result);
      privelageData = result;
      // generateFields(result);
      //   createUserRoleTable(result);
      createPrivelageRoleTable(result);
    },
    error: function (error) {
      console.log(error);
      alert("Error checking email. Please try again.");
    },
  });
}


function createPrivelageRoleTable(data) {
  if ($.fn.DataTable.isDataTable("#privelage-role-table")) {
    var table = $("#privelage-role-table").DataTable();
    table.clear().draw();
    table.rows.add(data).draw();
  } else {
    $("#privelage-role-table").DataTable({
      data: data,

      columns: [
        { data: "PrivilegeCode", title: "PrivilegeCode",  },

        { data: "Roles", title: "RoleNames"},
        { data: "Description", title: "Description"},
        {
          data: null,
          title: "Actions",
          render: function (data, type, row) {
            return (
              '<i class="fa fa-pencil edit-icon" data-id="' +
              row.PrivilegeId +
              '" style="cursor:pointer;"></i>'
            );
          },
          orderable: false,
          width: "20%" 
        },
      ],
    });
  }

  $("#privelage-role-table").on("click", ".edit-icon", function () {
    var privelageId = $(this).data("id");
    console.log(privelageId);
  
    fetchprivelageDetails(privelageId);
  });


}
function fetchprivelageDetails(pId) {
  // cusId = cId;
  privelageId = pId;
  var privelageDetails = fetchprivelageBypid(pId);
  console.log(privelageDetails, pId);
  // console.log(privelageDetails.Roles);


  $('input[type="checkbox"]').prop('checked', false);

  var roles = privelageDetails.Roles.split(", "); 

  roles.forEach(function (role) {
    console.log(role);

    var checkbox = $("#" + role);

    checkbox.prop("checked", true);
  });

  $("#privelageModal").modal();
}

function fetchprivelageBypid(pid) {
  return privelageData.find(function (customer) {
    return customer.PrivilegeId === pid;
  });
}

function EditRolePrivelage() {
   
    var mStatus = document.getElementById('Manager').checked ? 1:0;
    var aStatus = document.getElementById('Admin').checked ? 1:0;
    var cStatus = document.getElementById('Coordinator').checked ? 1:0;
    var eStatus = document.getElementById('Executive').checked ? 1:0;
    console.log(privelageId);
    var privelage={
        pid:privelageId,
        mr:mStatus,
        er:eStatus,
        cr:cStatus,
        ar:aStatus
    }

    console.log(privelage);
    $.ajax({
        url: `${apiUrl}Privelage/EditRolePrivelage/`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(privelage),
        type: "POST",
        success: function (result) {
          console.log(result);
          alert("succes");
         
          getPrivelage();
        },
        error: function (error) {
          console.log(error);
          alert("Error checking email. Please try again.");
        },
      });



  }

  function addNewPrivelage() {

    $('#addPrivelageModal').modal();
   

  
  }

  function AddNewPrivelage(params) {
    var pCode = document.getElementById('privelageName').value;
    var pDesc= document.getElementById('description').value;
     
    var privelage={
      pCode:pCode,
     pDesc:pDesc,
  }


    $.ajax({
      url: `${apiUrl}Privelage/AddNewPrivelage/`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(privelage),
      type: "POST",
      success: function (result) {
        console.log(result);
        alert("succes");
        location.reload();
      },
      error: function (error) {
        console.log(error);
        alert("Error checking email. Please try again.");
      },
    });
  }