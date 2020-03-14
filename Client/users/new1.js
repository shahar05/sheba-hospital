//$.getScript("../Helpers/HttpHelper.js", function() {});
import HttpHelper from "../Helpers/HttpHelper.js";
$(document).ready(function () {



    $('#createUser').on('click', function () {

        let hourStart =  parseInt( $('#starthour').val());  
        let hourEnd =  parseInt( $('#endHour').val());
        var valid = true;
        let newUser = {
            firstName: $('#firstInput').val(),
            lastName: $('#lastInput').val(),
            phoneNumber: $('#phoneInput').val()
        }
        if(  !hourStart || !hourEnd){
                valid = false;
        }else{
               if( hourEnd >= hourStart && hourEnd <= 23 && hourStart >= 0 ){
                 valid = true;
                 newUser.startHour = hourStart;
                 newUser.endHour = hourEnd;
               }else{
                   valid = false;
               }
        }
      
        if(!newUser.phoneNumber || !newUser.firstName || !newUser.lastName || !valid){
            $('#all').show();
            $('#noDigit').hide();
            $('#ui').hide();
        }else{
            
            if( /^\d+$/.test(newUser.phoneNumber)){
                let url =  "/users";

                    HttpHelper.post(url, newUser).then(function (response) {
                          
                            if (response) {
                                window.location.href = "index.html";
                            } else {
                                $('#ui').show();
                                $('#noDigit').hide();
                                $('#all').hide();
                            }      
                       
                    }).catch(function (err) {
                        console.log("Hoo JAJA");
                    })
                
            }else{
                $('#noDigit').show();
                $('#ui').hide();
                $('#all').hide();
            }
        }

    });

    $('#logoutBtn').on('click', function () {
        localStorage.clear();
        window.location.href =   __dirname +"";
    });
});

