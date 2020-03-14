//import { on } from "cluster";

//$.getScript("../Helpers/HttpHelper.js", function () { });

import HttpHelper from "../Helpers/HttpHelper.js";
$(document).ready(function () {

    var oldPhoneNumber;

    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('myVar')) {
        var param = searchParams.get('myVar')
    } else {
        console.log("no");
    }
    let url = "/users/" + param + "/edit";

    HttpHelper.get(url).then(function (response) {
        oldPhoneNumber = response.phoneNumber;

        $('#firstInput').val(response.firstName);
        $('#lastInput').val(response.lastName);
        $('#phoneInput').val(response.phoneNumber);
        $('#starthour').val(response.startHour);
        $('#endHour').val(response.endHour);
    })

    $('#EditUser').on('click', function () {
        let hourStart =  parseInt( $('#starthour').val());  
        let hourEnd =  parseInt( $('#endHour').val());
        var valid = true;
        let oldUser = {
            firstName: $('#firstInput').val(),
            lastName: $('#lastInput').val(),
            phoneNumber: $('#phoneInput').val(),       
        }

        if(  !hourStart || !hourEnd)
        {
            valid = false;
         }else{
           if( hourEnd >= hourStart && hourEnd <= 23 && hourStart >= 0 ){
             valid = true;
             oldUser.startHour = hourStart;
             oldUser.endHour = hourEnd;
           }else{
               valid = false;
           }
         }

         if(!oldUser.phoneNumber || !oldUser.firstName || !oldUser.lastName || !valid){
            $('#all').show();
            $('#noDigit').hide();
            $('#ui').hide();
        }else{
            
            if( /^\d+$/.test(oldUser.phoneNumber)){

            //    // isTheSameNumber
            //    var a = parseInt(oldPhoneNumber);
            //    var b = parseInt(oldUser.phoneNumber);
            //    if(a === b){
            //        oldUser.isTheSameNumber = true;
            //    }else{
            //     oldUser.isTheSameNumber = false;
            //    }

                let postURL = "/users/" + param + "?_method=PUT";

                    HttpHelper.post(postURL, oldUser).then(function (response) {
                          
                            if (response) {
                                window.location.href = "./show.html?myVar=" + param;
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





//"Client/users/show.html?myVar="+newParam



