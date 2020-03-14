

import HttpHelper from "../Helpers/HttpHelper.js";

//$.getScript("../Helpers/HttpHelper.js", function () { });
var param;
var num = 2;
      // 0 - Quantity 
        // 1 - Binary
        // 2- Regular
        

$(document).ready(function () {
    
  
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('myVar')) {
         param = searchParams.get('myVar')
    } else {
        console.log("no");
    }
    let url = "/default/" + param ;

    HttpHelper.get(url).then(function (defaultQuestion) {
        
        console.log(defaultQuestion);
        $('#firstInput').val(defaultQuestion.text);        

    })


    $('input[type = radio]').on('click', function () {
        
        $('label').removeClass("btn-danger");
        $('label').addClass("btn-info");

        $(this).parent().removeClass("btn-info");
        $(this).parent().addClass("btn-danger");

        num = $(this).parent('label').index();
      //  typeNumber = $(this).parent('label').index();
        if(num === 0){
            $("#minMax").show();
        }else{
            $("#minMax").hide();
        }
      
    
    });
    $('#createQuest').on('click', function () {
        var Send = true;
        let newQuest = { question: $('#firstInput').val() , typeNumber:num};
        let url = "/default/" + param;
        //alert(param);

        if(num === 0 ){
            let min = $('#min').val();
            let max = $('#max').val();

            if(!min || !max || min<0 || max<0 ){
                 Send = false;
                 $('#ui').show();
            }else{
                newQuest.min = min;
                newQuest.max = max;
            }
        }

         
            if(Send){
                HttpHelper.post(url , newQuest).then(function(respos){
                    
                    window.location.href= "./newDefualt.html";
                }).catch(function (err) {
                    window.location.href= "./newDefualt.html";
                })
            }
    });

});



function setColorOnButton(numOfBtn) {
    switch (numOfBtn) {
        case 0:
            $('#quantity').removeClass("btn-info");
            $('#quantity').addClass("btn-danger");

            break;
    
        case 1:
                $('#binary').removeClass("btn-info");
                $('#binary').addClass("btn-danger");
            break;
            case 2:
                    $('#normal').removeClass("btn-info");
                    $('#normal').addClass("btn-danger");
            break;
    }
}

          //   0 - Quantity 
         //    1 - Binary
        //     2 - Regular 