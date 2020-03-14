
//$.getScript("../Helpers/HttpHelper.js", function() {});

import HttpHelper from "../Helpers/HttpHelper.js";

$(document).ready(function () {

    HttpHelper.get("/users").then((arrUsers => {
        displayUsers(arrUsers.arrUsers);
        $('#loggedUser').html(arrUsers.username);
            //window.location.href = "../index.html";       
    }))

    $('#searchNumber').on('click', function () {
        let phone = {phoneNumber: $('#inputOfNumber').val() };

        if (/^\d+$/.test(phone.phoneNumber)) {
            $('#noDigit').hide();
            let url ="/find";
            HttpHelper.post(url , phone).then(function(arrUsers){
                displayUsers(arrUsers);
            });
        } else {

            $('#noDigit').show();
        }
      
    });

    $('#logoutBtn').on('click', function () {
       
       localStorage.clear();
       window.location.href =   __dirname +"";
    });
    
});

function displayUsers(arrUsers) {
    if (arrUsers) {
        let htmlList = '';
        var arr = arrUsers;
        for (let i = 0; i < arrUsers.length; i++) {
            const element = arrUsers[i];
            htmlList += " <div  class='col-md-3 col-sm-6 '> <div class='thumbnail'> <div '><h4> " + element.firstName + "</h4><h4> " + element.lastName + "</h4><h4> " + element.phoneNumber + "</h4> <a class='btn btn-lg btn-primary'  href='./show.html?myVar=" + element._id + "'>Details </a> </div></div></div>";
        }
        $('#userDiv').html(htmlList);
     
    }
}




















// class HttpHelper {
//     static get(url) {
//         return new Promise((resolve, reject) => {
//             $.ajax({
//                 type: "GET",
//                 url: url,
//                 beforeSend: function (xhr) { xhr.setRequestHeader('token', localStorage.getItem('t')); },
//                 success: function (respose) {
//                     resolve(respose)
//                 },
//                 error: (err) => {
//                     HttpHelper(err);
//                     reject(err);
//                 }

//             });
//         })
//     }

//     static errorHandle(err){
//         if (err.status === 401) {
//             window.location.href = './';
//         }  
//     }

// }





            //$('userDiv').append(htmlList);

            // $('.more').on('click', function () {
            //     // var loc = this.id;
            //     let i =  parseInt(this.id) ;

            //     $.ajax({
            //         type: "GET",
            //         url: "http://localhost:3000/users/"+arr[i]._id,
            //         success: function (response) {
            //             window.location.href = "./users/show.html";
            //         }
            //     });

            // });