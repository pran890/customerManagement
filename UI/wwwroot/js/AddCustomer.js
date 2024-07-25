document.addEventListener("DOMContentLoaded", function () {
  getUsers();
  var form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); 
   
  });
});
var url = new URL(window.location.href);
localStorage.setItem("port", url.port);


var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;
function AddCustomer() {
 
  var name = document.getElementById("name").value;
  var manager = document.getElementById("Manager").value;
  var email = document.getElementById("email").value;
  var executive = document.getElementById("Executive").value;
  var coordinator = document.getElementById("Coordinator").value;
  var description = document.getElementById("description").value;
  var phoneno = document.getElementById("phoneno").value;

var customer={
    Name: name,
    Email:email,
    ManagerId: parseInt(manager),
    ExecutiveId: parseInt(executive),
    CoordinatorId: parseInt(coordinator),
    Description:description,
    Phoneno:phoneno
  };
  $.ajax({
    url: `${apiUrl}Customer/AddCustomer/` ,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data:JSON.stringify(customer),
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



function getUsers(id) {
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
      generateFields(result);
    },
    error: function (error) {
      console.log(error);
      alert("Error checking email. Please try again.");
    },
  });
}

function generateFields(data) {
   
    
   data.forEach(function(item) {
       

        var select = document.getElementById(item.RoleName);
        select.appendChild(new Option(item.Username, item.UserId));
    });
}
