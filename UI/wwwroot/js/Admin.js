
var url = new URL(window.location.href);
localStorage.setItem("port", url.port);
var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;
var uData;
document.addEventListener("DOMContentLoaded", function () {
  getUsers();

});

function getUsers() {
  var uid = parseInt(localStorage.getItem("userId"));


  $.ajax({
    url: `${apiUrl}User/GetAllUser/`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function (result) {
      console.log(result);
      generateFields(result);
      createUserRoleTable(result);
      uData=result;
    },
    error: function (error) {
      console.log(error);
      alert("Error getting users. Please try again.");
    },
  });
}


function generateFields(data) {
  


  data.forEach(function (item) {

    var select = document.getElementById("user");
    // select.innerHTML = '<option value="">Select a ' + item.RoleName.toLowerCase() + '</option>';
    select.appendChild(new Option(item.Username, item.UserId));


  });
}

function AddRole() {

  var id = document.getElementById("user").value;
  var role = document.getElementById("role").value;
  var managerField = document.getElementById('manager').value;
  var coordinatorField = document.getElementById('coordinator').value;
  if(!managerField) managerField=0;
  else managerField=parseInt(managerField);
  if(!coordinatorField) coordinatorField=0;
  else coordinatorField=parseInt(coordinatorField);

  var user = {
    Id: parseInt(id),
    rId: parseInt(role),
    cId:coordinatorField,
    mId:managerField
  };
  console.log(user);
  $.ajax({
    url: `${apiUrl}Role/AddUserRole/`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(user),
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


function createUserRoleTable(data) {
  if ($.fn.DataTable.isDataTable("#user-role-table")) {
    var table = $("#user-role-table").DataTable();
    table.clear().draw();
    table.rows.add(data).draw();
  }
  else {
    $('#user-role-table').DataTable({
      data: data,
      

      columns: [
        { data: 'Username', title: 'Username', "width": "10%"},
   
        { data: 'RoleNames', title: 'RoleNames', "width": "20%" },
        
       
      ],
    
    });
  }


 
}

function toggleFields() {
  var role = document.getElementById('role').value;
  var managerField = document.getElementById('managerField');
  var coordinatorField = document.getElementById('coordinatorField');
  
  if (role == '2') {  // Manager
      managerField.style.display = 'none';
      coordinatorField.style.display = 'none';
  } else if (role == '3') {  // Coordinator
      managerField.style.display = 'block';
      coordinatorField.style.display = 'none';
      generateManagerField(uData);
  } else if (role == '4') {  // Executive
      managerField.style.display = 'block';
      coordinatorField.style.display = 'block';
      generateManagerField(uData);
     

  } else {
      managerField.style.display = 'none';
      coordinatorField.style.display = 'none';
  }
}


function generateManagerField(data) {
  var selectElement = document.getElementById("manager");
  removeAllOptions(selectElement)
 data.forEach(function(item) {
      if (item.RoleNames === "Manager"  ) {
          var select = document.getElementById("manager");
          // select.innerHTML = '<option value="">Select a ' + item.RoleName.toLowerCase() + '</option>';
          select.appendChild(new Option(item.Username, item.UserId));
      }
      
  });
}

function getUsersById(id) {
  var uid = parseInt(localStorage.getItem("userId"));
   if(id) uid=id;
  console.log(uid);

  $.ajax({
    url: `${apiUrl}User/GetUser/` + uid,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function (result) {
      console.log(result);
    generateCordinatorField(result);
    },
    error: function (error) {
      console.log(error);
      alert("Error checking email. Please try again.");
    },
  });
}


function generateCordinatorField(data) {
   
  var selectElement = document.getElementById("coordinator");
  removeAllOptions(selectElement)
  data.forEach(function(item) {
       if (item.RoleName === "Coordinator"  ) {
           var select = document.getElementById("coordinator");
           // select.innerHTML = '<option value="">Select a ' + item.RoleName.toLowerCase() + '</option>';
           select.appendChild(new Option(item.Username, item.UserId));
       }
       
   });
 }


 function showCoordinatorField() {
  var id= document.getElementById("manager").value;
  getUsersById(id);

 }

 function removeAllOptions(selectElement) {
  while (selectElement.options.length > 1) {
      selectElement.remove(1);
  }
}