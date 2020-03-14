

$(document).ready(function () {

    

    $('#submitBtn').on('click', function () {
        
        var userName = $("#usernameInput").val();
        var userPassword = $("#passwordInput").val();
        if (!userName || !userPassword) {
            $('#userInterface').css('visibility', 'visible');
            // $('#userInterface').html(" <div id='inter' class='alert alert-success' role='alert'> Please enter Username and Password! </div>");
            return;
        }
    
        $.ajax({
            type: "POST",
            url: "http://212.179.205.15/shiba/register",
            data: {
                userName:userName,
                userPassword:userPassword
            },
            success: function (token) {
                
             
                    localStorage.setItem("t", token);
                    window.location.href = "index.html";
                          
            },
                error:function(err){
                    console.log(err);
                    console.log(err.err);
                    
                    $('#userInterface').css('visibility', 'visible');
                }
            
        });
        $('#logoutBtn').on('click', function () {
            localStorage.clear();
            window.location.href =   __dirname +"";
        });
    });
});
