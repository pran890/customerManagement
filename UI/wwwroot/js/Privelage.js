var url = new URL(window.location.href);
localStorage.setItem("port", url.port);
var privelageData,privelageId;
var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;
document.addEventListener("DOMContentLoaded", function () {
  getPrivelage();
});

function getPrivelage() {
  var uid = parseInt(localStorage.getItem("userId"));

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

// function generateFields(data) {
//   data.forEach(function (item) {
//     var select = document.getElementById("privelage");
//     // select.innerHTML = '<option value="">Select a ' + item.RoleName.toLowerCase() + '</option>';
//     select.appendChild(new Option(item.PrivilegeCode, item.PrivilegeId));
//   });
// }

// function AddPrivelage() {
//   var id = document.getElementById("privelage").value;
//   var role = document.getElementById("role").value;
//   var user = {
//     pId: parseInt(id),
//     rId: parseInt(role),
//   };
//   $.ajax({
//     url: `${apiUrl}Privelage/AddRolePrivelage/`,
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     data: JSON.stringify(user),
//     type: "POST",
//     success: function (result) {
//       console.log(result);
//       alert("succes");
//       location.reload();
//     },
//     error: function (error) {
//       console.log(error);
//       alert("Error checking email. Please try again.");
//     },
//   });
// }

function createPrivelageRoleTable(data) {
  if ($.fn.DataTable.isDataTable("#privelage-role-table")) {
    var table = $("#privelage-role-table").DataTable();
    table.clear().draw();
    table.rows.add(data).draw();
  } else {
    $("#privelage-role-table").DataTable({
      data: data,

      columns: [
        { data: "PrivilegeCode", title: "PrivilegeCode", width: "10%" },

        { data: "Roles", title: "RoleNames", width: "10%" },
        { data: "Description", title: "Description", width: "30%" },
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
        },
      ],
    });
  }

  $("#privelage-role-table").on("click", ".edit-icon", function () {
    var privelageId = $(this).data("id");
    console.log(privelageId);
    // localStorage.setItem("cusid", privelageId);
    // generateprivelageFollowUpData();
    fetchprivelageDetails(privelageId);
  });

  // function fetchprivelageDetails(pId) {
  //   // cusId = cId;
  //   privelageId=pId;
  //   var privelageDetails = fetchprivelageBypid(pId);
  //   console.log(privelageDetails, pId);
  //   // console.log(privelageDetails.Roles);
  
  //   var roles = privelageDetails.Roles.split(", "); // Split roles into an arrayz

  //   roles.forEach(function (role) {
  //     console.log(role);

  //     var checkbox = $("#" + role);

  //     checkbox.prop("checked", true);
  //   });

  //   // $('#privelageName').val(privelageDetails.
  //   //   privelageName
  //   // );
  //   // $('#createdDate').val(privelageDetails.createdDate);
  //   // $('#description').val(privelageDetails.description);
  //   // // $('#domain').val(privelageDetails.domain);
  //   // $('#phoneNo').val(privelageDetails.phoneNo);

  //   // Show modal
  //   // jQuery.noConflict();
  //   $("#privelageModal").modal();
  // }
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
          location.reload();
        },
        error: function (error) {
          console.log(error);
          alert("Error checking email. Please try again.");
        },
      });



  }