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


var customer={
    Name: name,
    Email:email,
    ManagerId: parseInt(manager),
    ExecutiveId: parseInt(executive),
    CoordinatorId: parseInt(coordinator),
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
    },
    error: function (error) {
      console.log(error);
      alert("Error checking email. Please try again.");
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getUsers();
  var form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    // AddCustomer();
  });
});
function showCoordinatorAndExecutive() {
    var managerValue = document.getElementById("Manager").value;
    console.log(managerValue);
    getUsers(parseInt(managerValue),'Coordinator')
    var coordinatorField = document.getElementById("coordinatorField");
    var executiveField = document.getElementById("executiveField");

   
    coordinatorField.style.display = "none";
    executiveField.style.display = "none";

   
        coordinatorField.style.display = "block";
   
     
    
}
function generate() {
    var managerValue = document.getElementById("Coordinator").value;
    console.log(managerValue);
    getUsers(parseInt(managerValue),'Executive')
    var executiveField = document.getElementById("executiveField");
    
        executiveField.style.display = "block";
    
}

function getUsers(id,role) {
  if(!role)role='Manager';
  var uid = parseInt(localStorage.getItem("userId"));


  if(id) uid=id;

  $.ajax({
    url: `${apiUrl}User/GetUser/` + uid,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function (result) {
      console.log(result);
      generateFields(result,role);
    },
    error: function (error) {
      console.log(error);
      alert("Error checking email. Please try again.");
    },
  });
}

function generateFields(data,role) {
   
     console.log(data,role);
 
        var select = document.getElementById(role);
        removeAllOptions(select)
    
   data.forEach(function(item) {
        if (item.RoleName === role ) {
          var select = document.getElementById(item.RoleName);
          select.appendChild(new Option(item. Username, item.UserId));
      }
    });
}
function removeAllOptions(selectElement) {
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }
}