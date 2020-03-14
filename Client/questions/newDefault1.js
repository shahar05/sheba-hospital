//$.getScript("../Helpers/HttpHelper.js", function () { });
import HttpHelper from "../Helpers/HttpHelper.js";
var typeNumber = 2;
var forAllUsers= false;
var body = $("body");


$(document).on({
    ajaxStart: function() { body.addClass("loading");    },
     ajaxStop: function() { body.removeClass("loading"); }    
});

var arrtypes = ["Quantity","Binary","Regular"  ];

$(document).ready(function () {
   // <span  class="btn btn-md pull-left"  >      </span>
    var questionsArr;
    let url = "/default";
    HttpHelper.get(url).then(function (response) {
        questionsArr = response;
        let htmlString = '';
        for (let i = 0; i < response.length; i++) {
            htmlString += '<li class="list-group-item text-right"> <a style="width:60px;" class=" btn btn-xs btn-primary pull-left"> ' + arrtypes[response[i].questionType]  + '</a>'+ response[i].text +'<span > <a  id="edit" href="#" class=" btn btn-xs btn-warning  ">  Edit</a> <a href="#"  id="delete" class=" btn btn-xs btn-danger  ">  Delete</a>  </span> </li>';
        }
        $('#questionHolder').html(htmlString);
    })

    $('#questionHolder').on('click', '#edit', function () {   

          let numOfId = $(this).parent().parent('li').index();

          window.location.href = "./edit.html?myVar="+questionsArr[numOfId]._id;
      });

    $('#questionHolder').on('click', '#delete', function () {
    
        if (confirm("Are you sure you want to delete?")) {
            let num = $(this).parent().parent('li').index();
            let url = "/default/" + questionsArr[num]._id + "?_method=DELETE";
            console.log(questionsArr[num]._id + " num:" + num);

            HttpHelper.post(url, null).then(function (response) {
                window.location.reload();
            })
        }
    });

    $('#createQuest').on('click', function () {
        var Send = true;
        var newQuest = { question: $('#firstInput').val() , forAll: false , typeNumber:typeNumber }
        let url = "/default";
        
        
        if(typeNumber === 0 ){
            let min = parseInt($('#min').val()) ;
            let max =  parseInt($('#max').val()) ;

            if(!min || !max || min<0 || max<0 || min >= max){
                 Send = false;
                 $('#ui').show();
            }else{
                Send = true;
                newQuest.min = min;
                newQuest.max = max;
            }
        }

            
            
            if(Send){
                newQuest.forAll = forAllUsers;
                HttpHelper.post(url, newQuest).then(function (response) {               
                        window.location.href = "newDefualt.html";
            })
            }
      
    });

    $('#logoutBtn').on('click', function () {

        localStorage.clear();
        window.location.href = __dirname + "";
    });

    $('.btn-toggle').on('click', function () {
        forAllUsers = !forAllUsers;
        $(this).find('.btn').toggleClass('btn-info active btn-default');
    });

    $('input[type = radio]').on('click', function () {
        
        $('label').removeClass("btn-danger");
        $('label').addClass("btn-info");

        $(this).parent().removeClass("btn-info");
        $(this).parent().addClass("btn-danger");
         // 0 - Quantity 
        // 1 -  Binary
       // 2 -   Regular 
        typeNumber = $(this).parent('label').index();
        if(typeNumber === 0){
            $("#minMax").show();
        }else{
            $("#minMax").hide();
        }
    });


});



