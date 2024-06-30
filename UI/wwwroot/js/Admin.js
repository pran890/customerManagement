
var url = new URL(window.location.href);
localStorage.setItem("port", url.port);
var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;
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
    },
    error: function (error) {
      console.log(error);
      alert("Error checking email. Please try again.");
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
  var user = {
    Id: parseInt(id),
    rId: parseInt(role)
  };
  $.ajax({
    url: `${apiUrl}User/AddUserRole/`,
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