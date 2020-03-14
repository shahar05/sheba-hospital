//$.getScript("../Helpers/HttpHelper.js", function() {});
import HttpHelper from "../Helpers/HttpHelper.js";
var testPhoneNumber;
var arrtypes = ["Quantity","Binary","Regular"  ];



$(document).ready(function () {
    
    var questArr;
    var newParam;
    let searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('myVar')) {
        var param = searchParams.get('myVar')

    } else {
        console.log("no");
    }    
    newParam = param;

    HttpHelper.get("/users").then((arrUsers => {
        displayUsers(arrUsers.arrUsers);
        $('#loggedUser').html(arrUsers.username);
            //window.location.href = "../index.html";       
    }))

    
    HttpHelper.get("/users/" + param).then((response => {


        testPhoneNumber = response.phoneNumber;
        questArr = response;
 
        $('#editBtn').attr('href', "./edit.html?myVar=" + response._id);
        $('#newQuestionToUser').attr('href', "../questions/new.html?myVar=" + response._id);
 
        $('#PatientFirstName').html( '<strong>' + response.firstName + ' </strong>');
        $('#PatientLastName').html( '<strong>' + response.lastName+ ' </strong>');
        $('#PatientPhoneNumber').html(  '<strong>' + response.phoneNumber+ ' </strong>');
        $('#PatientStartHour').html( 'Beginning time: <strong>' + response.startHour + '</strong>:00 ');
        $('#PatientEndHour').html('End time: <strong>' + response.endHour + '</strong>:00');
        

        let htmlString = '';
        for (let i = 0; i < response.questions.length; i++) {

            htmlString += '<li      class="text">   <strong class="pull-left"> ' + (i + 1) + ')  <a class="btn btn-primary btn-xs" style="width:60px;"> ' +arrtypes[response.questions[i].questionType]  + '</a>  </strong>        '   + response.questions[i].text +' <span> <a  id="edit" href="#" class=" btn btn-xs btn-warning  ">  Edit</a> <a href="#"  id="delete" class=" btn btn-xs btn-danger  ">  Delete</a>  </span>      </li> <hr/>';
            //htmlString += '<li      class="text-right">   <strong class="pull-left"> ' + (i + 1) + ')  <a class="btn btn-primary btn-xs" style="width:60px;"> ' +arrtypes[response.questions[i].questionType]  + '</a>  </strong>  '   + response.questions[i].text +' <span> <a  id="edit" href="#" class=" btn btn-xs btn-warning  ">  Edit</a> <a href="#"  id="delete" class=" btn btn-xs btn-danger  ">  Delete</a>  </span>      </li> <hr/>';
        }
        $('#questionDiv').html(htmlString);
    


    }))


    $('#btnDetails').on('click', function () {
        window.location.href = "../expermint/charts.html" + "?myVar=" + testPhoneNumber;
    });

    $('#questionDiv').on('click',"#delete", function () {
        
        if(confirm("Are you suer you want to delete this question?")){
        
        let num = { number :  ($(this).parent().parent('li').index() /2)  ,  };
        let url = "/users/" + param + "/questions/?_method=DELETE";
        
        console.log(questArr.questions[num.number]._id);
        console.log(questArr.questions[num.number].text);
       
        num.matchId = questArr.questions[num.number]._id;
        HttpHelper.post(url , num).then(function(response){
            window.location.reload();
        })
    }
    });

    $('#questionDiv').on('click',"#edit", function () {
        



       // alert(($(this).parent().parent().index()  /2 ));
        let j = ($(this).parent().parent().index()  /2 );
        let questParam = questArr.questions[j]._id;

        if(questArr.questions[j].isDefault){
           if(confirm("This is a default question. Are you sure that you want to edit?")){
            window.location.href = "../questions/edit.html?myVar=" + questParam;
           }
        }else{
            window.location.href = "../questions/edit.html?myVar=" + questParam;
        }
        
    });

    $('#deleteBtn').on('click', function () {
        if (confirm('Are you suer you want to delete?')) {
        let url = "/users/" + newParam + "?_method=DELETE";

                HttpHelper.post(url , null).then(function(response){
                            if (response)
                            {
                                window.location.href = "./index.html";     
                                console.log("Jajaja Hoo");
                            }
                }).catch(function(err){
                    console.log("Hoo JAJA");
                })     
        }
    });
    $('#logoutBtn').on('click', function () {
        localStorage.clear();
        window.location.href =   __dirname +"";
    });

});

