//Time
var currentHour = "";
var timeFormat = "";
function timer(){
    stopwatch = setInterval(function(){
        currentHour = moment().format('hA');
        timeFormat = moment().format('dddd, MMMM Do YYYY');
        $("#currentDay").text(timeFormat);
        checkPast();
        checkPresent();
        checkFuture();
    }, 1000);
}
timer();
//Create function to add past class to timeblock if time > timeblock hour
function checkPast(){
    console.log(currentHour);
    var tempHour = currentHour.split(":");
    $(".timeblock").each(function(){
        if($(this).children("div").html() == currentHour){
            $(this).children("textarea").addClass("past");
        }
    });
}
//Create function to add present class to timeblock if time = timeblock hour
function checkPresent(){
    //Looks at every timeblock element
    $(".timeblock").each(function(){
        //Targetting the div child in timeblock to get the hour of the block and compare it to current time hour
        //The format for the hours at this stage is HPM == HPM i.e 5PM == 5PM
        if($(this).children("div").html() == currentHour){
            //If the hours are the same then  present class gets added to textarea child element  to get the textbox color
            $(this).children("textarea").addClass("present");
        }
    });
}
// //Create function to add future class to timeblock if time < timeblock hour
function checkFuture(){
    $(".timeblock").each(function(){
        if($(this).children("div").html() == currentHour){
            $(this).children("textarea").addClass("future");
        }
    });
}