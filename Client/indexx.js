//$.getScript("./Helpers/HttpHelper.js", function () {});
import HttpHelper from "./Helpers/HttpHelper.js";


$(() => {

    if (localStorage.getItem("t") !== null) {
        window.location.href = "./users/index.html"; 
      }
        $('#logoutBtn').on('click', function () {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/logout",
                success: function (response) {
                    window.location.href="../";
                }
            });
        });

    $('#submitBtn').on('click', function () {
        var username = $("#usernameInput").val();
        var password = $("#passwordInput").val();
        if (!username || !password) {
            $('#userInterface').css('visibility', 'visible');      
            return;
        }
        let url = "/login";
        let data = {
            username: username,
            password: password
        };

        HttpHelper.post(url , data).then(function(token){
            
            localStorage.setItem("t", token);
            window.location.href = "./users/index.html";
        }).catch(function(err){ 
            $('#userInterface').css('visibility', 'visible');
        })
    });
});



 //$('#userInterface').html(" <div id='inter' class='alert alert-success' role='alert'> Please enter Username and Password! </div>");
// $.ajax({
//     type: "POST",
//     url: "http://localhost:3000/login",
//     data: {
//         username: username,
//         password: password
//     },
//     success: (response) => {
//         localStorage.setItem("t", response);
//         window.location.href = "./users/index.html";
//     },
//     error: (err) => { 
//         $('#userInterface').css('visibility', 'visible');
//     }
// });