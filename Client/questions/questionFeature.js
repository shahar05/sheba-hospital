$.getScript("../Helpers/HttpHelper.js", function () { });



$(document).ready(function () {
    var questionsArr;
    let url = "/default";
    HttpHelper.get(url).then(function (response) {
        putDefaultQuestion(response);
    })

    $('#questionDefaultHolder').on('click', 'a', function () {

        if (confirm("Are you sure you want to delete?")) {
            let num = $(this).parent('li').index();
            let url = "/default/" + questionsArr[num]._id + "?_method=DELETE";
            console.log(questionsArr[num]._id + " num:" + num);

            HttpHelper.post(url, null).then(function (response) {
                window.location.reload();
            })
        }
    });

    $('#createQuest').on('click', function () {
        let newQuest = { question: $('#firstInput').val() , forAll: false }
        let url = "/default";
        console.log("you clicked");

        if (confirm("Do you want to add this question to all existing users of the system?")) {
            newQuest.forAll = true;
            }else{
            newQuest.forAll = false;
            }
            HttpHelper.post(url, newQuest).then(function (response) {
                if (response)
                    window.location.reload();
        })
    });

    $('#logoutBtn').on('click', function () {

        localStorage.clear();
        window.location.href = __dirname + "";
    });

});

function putDefaultQuestion(arrQuestion) {
    questionsArr = arrQuestion;
    let htmlString = '';
    for (let i = 0; i < arrQuestion.length; i++) {
        htmlString += '<li   class="list-group-item text-right">' + arrQuestion[i].text + ' <a href="#" class="deleteDefault btn btn-xs btn-danger pull-left ">  Delete</a> </li>';
    }
    $('#questionDefaultHolder').html(htmlString);
}

function putQuestion(arrQuestion) {
    
}