var url = new URL(window.location.href);
localStorage.setItem("port", url.port);

var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;

function validateUser() {
    var email = $("#txtEmail").val().trim();
    var password = $("#txtPassword").val().trim();

    if (email =="" || password == "") {
        alert("Please enter email and password.");
        return;
    }

    var login = {
        Email: email,
        Password: password
    };

    $.ajax({
        url: `${apiUrl}Landing/Login/`,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(login),
        dataType: "json",
        type: "POST",
        success: function (result) {
            if(result){
                console.log(result);
                localStorage.setItem("userId",result);
                alert("Login successful");
                window.location.replace("http://localhost:5025/DashBoard/ViewCustomers");

            }
            else{
                alert("Invalid credentials");
            }
        },
        error: function (error) {
            console.log(error);
            alert("Login failed. Please check your credentials.");
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('loginForm');

    form.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            validateUser();
        }
    });
});


function clearForm() {
    $("#txtId, #txtName, #txtPassword, #txtEmail, #txtState, #txtCity, #txtZipCode").val("");
}


function checkEmail() {
    var email = $("#txtEmail").val().trim();

    if (email === "") {
        alert("Please enter an email.");
        return;
    }

    $.ajax({
        url: `${apiUrl}User/ValidateUser/` + email,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "GET",
        success: function (result) {
            console.log(result);
            if (result.id !== 0) {
                alert("Duplicate Email. Please use a different email.");
                $("#txtEmail").val("");
            }
        },
        error: function (error) {
            console.log(error);
            alert("Error checking email. Please try again.");
        }
    });
}
