
//$.getScript("../Helpers/HttpHelper.js", function() {});
import HttpHelper from "../Helpers/HttpHelper.js";

var text = [];

$(function () {

  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('myVar')) {
      var param = searchParams.get('myVar')
  } else {
      console.log("no");
  }

  var url = "/record/" + param ;
  // var myNewChart = new Chart(ctx).Pie(data);

  var myChart = document.getElementById('myChart').getContext('2d');
  
  HttpHelper.get(url).then(function (response) {
 
  
      
    console.log(response);
    

    var label = [];
    var rgb = [];

   
    var score = Math.floor(Math.random() * 250);
    var score1 = Math.floor(Math.random() * 250);
    var score2 = Math.floor(Math.random() * 250 );
    var avg = [];
    for(let i = 0 ; i < response.length ; i ++){
         score = Math.floor(Math.random() * 250);
         score1 = Math.floor(Math.random() * 250);
         score2 = Math.floor(Math.random() * 250 );
        label.push( "Question " + (i + 1));
        rgb.push('rgba('+score+', '+score1+', '+score2+', 0.6)');

        avg.push(response[i].avg);
        text.push(response[i].text);
    }

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    var anonymos ={
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:label,
        datasets:[{
          label:'avrage',
          data:avg,
          //backgroundColor:'green',
          backgroundColor:rgb,
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        events: ['click'],
        onClick: graphClickEvent,
        title:{
          display:true,
          text:'View metrics',
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    };

     
    let massPopChart = new Chart(myChart,   anonymos );

}).catch(function(res){
console.log("somthenig got Wrong!");
    
})


function graphClickEvent(event, array){
    
    //console.log(event);
    //console.log(array);
    
    console.log(array[0]._index);

   alert(text[array[0]._index]);
   
   
}


  });

