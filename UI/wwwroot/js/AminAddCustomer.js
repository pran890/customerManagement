var url = new URL(window.location.href);
localStorage.setItem("port", url.port);
var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;
function AddCustomer() {
  var name = document.getElementById("name").value;
  var manager = document.getElementById("manager").value;
  var email = document.getElementById("email").value;
  var executive = document.getElementById("executive").value;
  var coordinator = document.getElementById("coordinator").value;


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
    var managerValue = document.getElementById("manager").value;
    console.log(managerValue);
    getUsers(parseInt(managerValue),1)
    var coordinatorField = document.getElementById("coordinatorField");
    var executiveField = document.getElementById("executiveField");

   
    coordinatorField.style.display = "none";
    executiveField.style.display = "none";

   
        coordinatorField.style.display = "block";
   
     
    
}
function generate() {
    var managerValue = document.getElementById("coordinator").value;
    console.log(managerValue);
    getUsers(parseInt(managerValue),3)
    var executiveField = document.getElementById("executiveField");
    
        executiveField.style.display = "block";
    
}

function getUsers(id,p) {
  var uid = parseInt(localStorage.getItem("userId"));

  console.log(p);
  if(id) uid=id;

  $.ajax({
    url: `${apiUrl}User/GetUser/` + uid,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "GET",
    success: function (result) {
      console.log(result);
      generateFields(result,p);
    },
    error: function (error) {
      console.log(error);
      alert("Error checking email. Please try again.");
    },
  });
}

function generateFields(data,p) {
   
     console.log(data,p);
     console.log(p);
     if(!p){
        var select = document.getElementById("manager");
        removeAllOptions(select)
     }else if(p==1){
        var select = document.getElementById("coordinator");
        removeAllOptions(select)
     }else if(p==3){
        var select = document.getElementById("executive");
        removeAllOptions(select)
     }
   data.forEach(function(item) {
        if (item.RoleName === "Manager" && (!p)) {
            console.log("lk");
            var select = document.getElementById("manager");
            select.appendChild(new Option(item. Username, item.UserId));
        }
        else  if (item.RoleName === "Coordinator" && p==1) {
            var select = document.getElementById("coordinator");
            select.appendChild(new Option(item. Username, item.UserId));
        }
        else  if (item.RoleName === "Executive" && p>2) {
            var select = document.getElementById("executive");
            select.appendChild(new Option(item. Username, item.UserId));
        }
    });
}
function removeAllOptions(selectElement) {
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }
}