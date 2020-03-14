
import HttpHelper from "../Helpers/HttpHelper.js";

//$.getScript("../Helpers/HttpHelper.js", function () { });
var param ='';

var num = 2;

$(document).ready(function () {
    
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('myVar')) {
        param = searchParams.get('myVar');
    } else {
        console.log("Didnt Found myVar");
    }


    $('#createQuest').on('click', function () {
       var Send = true;
        let newQuest = { text: $('#firstInput').val() ,isDefault:false, questionType:num};
        let url = "/users/" + param + "/questions";
        console.log("you clicked");
         
        if(num === 0 ){ // QuestionType = Kamoti
            let min = $('#min').val();
            let max = $('#max').val();
            min = parseInt(min);
            max = parseInt(max);
            console.log(min + "  " + max);

            if(!min || !max || min<0 || max<0 || min >= max ){

                Send = false;

                if(min >= max) {
                    
                    $('#ui div').html("Max must be greater then Min");
                }else{
                    $('#ui div').html("Min or Max Are not valid");                
                }
                $('#ui').show();              
            }else{
                $('#ui').hide(); 
                Send = true;
                newQuest.min = min;
                newQuest.max = max;           
            }
        }

        
        if(Send){
            HttpHelper.post(url, newQuest).then(function (response) {
                window.location.href = "../users/show.html?myVar=" + param;
            })
        }
        
   
    });

    $('#logoutBtn').on('click', function () {
        localStorage.clear();
        window.location.href = __dirname + "";
    });


    $('input[type = radio]').on('click', function () {
        
        $('label').removeClass("btn-danger");
        $('label').addClass("btn-info");

        $(this).parent().removeClass("btn-info");
        $(this).parent().addClass("btn-danger");

        console.log($(this).parent('label').index());
        // 0 - Quantity 
        // 1 - Binary
        // 2- Regular    
        num = $(this).parent('label').index();
        if(num === 0){
            $("#minMax").show();       
        }else{        
            $("#minMax").hide();
        }


    });

});


// $('#createQuest').on('click', function () {

//     let newQuest = { question: $('#firstInput').val()   }

//     $.ajax({
//         type: "POST",
//         url: "http://localhost:3000/users/" + param+"/questions",
//         data: newQuest,
//         success: function (response) {       
//             window.location.href = "../users/show.html?myVar="+param;
//             console.log(response);
//         }
//     });


// });
