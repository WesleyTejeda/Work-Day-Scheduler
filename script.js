//Time
function timer(){
    stopwatch = setInterval(function(){
        var currentHour = moment().format('h:a');
        var timeFormat = moment().format('dddd, MMMM Do YYYY');
        $("#currentDay").text(timeFormat);
        console.log(time);
    }, 1000);
}
timer();
//Create function to add past class to timeblock if time > timeblock hour
function checkPast(){

}
//Create function to add present class to timeblock if time = timeblock hour
function checkPresent(){

}
//Create function to add future class to timeblock if time < timeblock hour
function checkFuture(){

}