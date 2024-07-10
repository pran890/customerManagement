var url = new URL(window.location.href);
localStorage.setItem("port", url.port);
var port = localStorage.getItem("port");
var apiUrl = `http://localhost:${port}/api/`;

function AddUser() {
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#Password").val();
    console.log(name);

    var user = {
        Name: name,
        Email: email,
        Password: password,
        Role:"user"
       
    };

    // var url = `http://localhost:${port}/api/User/AddUser/`;
    $.ajax({
        url: `${apiUrl}User/AddUser/`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(user),
        type: "POST",
        success: function (result) {
            console.log(result);
            if (result) {
                alert("Registration successful");
                window.location = `http://localhost:${port}/Account/Login`;
               
            } else {
                alert("Registration failed: " + result.message);
            }
        },
        error: function (msg) {
            alert("Registration failed: " + msg.responseText);
        },
    });
}

function clearForm() {
    $("#txtName").val("");
    $("#txtEmail").val("");
    $("#txtPassword").val("");
    // $("#txtConfirmPassword").val("");
}

