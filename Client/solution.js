// patientPhoneNumber: String,
// questionId:String,
// patientId:String,
// timestemp: Number,
// questionType: Number,
// answer: String


        // 0 - Quantity 
        // 1 -  Binary
       // 2 -   Regular 

       var score = Math.floor(Math.random() * 6);
       var score1 = Math.floor(Math.random() * 6);
       var score2 = Math.floor(Math.random() * 6);
       var score3 = Math.floor(Math.random() * 2);

var objectJson = {

    arr :        
    [
        {
            questionId:"5d9c6cd81b245500987f0413",
            answer:score,
            questionType:0
        },
        {
            questionId:"5d9c6d1c1b245500987f0416",
            answer:score3,
            questionType:2
        },
        {
            questionId:"5d9c6d291b245500987f0417",
            answer:score1,
            questionType:2
        },
        {
            questionId:"5d9c87179e16b61b50962ea5",
            answer:score2,
            questionType:1
        }
      
    ]
}



$(function () {
    
    alert("1");


    $('#submitBtn').on('click', function () {
        let phoneNumber = "0508881919";
        let url = "/patient/" + phoneNumber;
        HttpHelper.post(url , objectJson ).then(function(response){
                alert("success   " + response);
        }).catch(function(res){

        })

    });

 
    


});


// var objSend = {
//     phoneNumber: "0508889436",
//     questions : [ 
//         {
//             questionId:"5d66df9bddabd932a4e9acd7",
//             questionType:2,
//             answer: "3"
//         },
//         {
//             questionId:"5d66dfa4ddabd932a4e9acd8",
//             questionType:2,
//             answer: "3"
//         }

//     ]

// }