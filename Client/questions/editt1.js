import HttpHelper from "../Helpers/HttpHelper.js";
//$.getScript("../Helpers/HttpHelper.js", function () { });
var param;
var num ;
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
        num = defaultQuestion.questionType;
        console.log(defaultQuestion);
        if(defaultQuestion.isDefault){
           $('h1').html("Edit a default question");
        }else{
            $('h1').html("Edit a personal question");
            
        }
        
        setColorOnButton(num ,defaultQuestion.min , defaultQuestion.max );
        $('#firstInput').val(defaultQuestion.text);        

    })


    $('input[type = radio]').on('click', function () {
        
        $('label').removeClass("btn-danger");
        $('label').addClass("btn-info");

        $(this).parent().removeClass("btn-info");
        $(this).parent().addClass("btn-danger");

     
        
        num = $(this).parent('label').index();
        if(num === 0){
            $("#minMax").show();       
        }else{        
            $("#minMax").hide();
        }
    
    });
    $('#createQuest').on('click', function () {
        let newQuest = { question: $('#firstInput').val() , typeNumber:num}
        let url = "/default/" + param;
        var Send = true;

        if(num === 0 ){
            let min = $('#min').val();
            let max = $('#max').val();

            if(!min || !max || min<0 || max<0 || min >= max){
                if(min >= max){
                    $('#ui div').html("Min cannot be greater then max");
                }
                 Send = false;
                 $('#ui').show();
                
            }else{
                newQuest.min = min;
                newQuest.max = max;
            }
        }
        if(Send){
            HttpHelper.post(url , newQuest).then(function(respos){
                
                window.location.href= "../users";
            }).catch(function (err) {
                window.location.href= "../users";
            })
        }
    });

});



function setColorOnButton(numOfBtn , min , max) {
    switch (numOfBtn) {
        case 0:
            $('#quantity').removeClass("btn-info");
            $('#quantity').addClass("btn-danger");
            $("#minMax").show();
            console.log();
            $('#min').val(min);
            $('#max').val(max);

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