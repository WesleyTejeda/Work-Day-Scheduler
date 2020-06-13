//Time
var currentHour = "";
var timeFormat = "";
function timer(){
    stopwatch = setInterval(function(){
        currentHour = moment().format('hA');
        timeFormat = moment().format('dddd, MMMM Do YYYY');
        $("#currentDay").text(timeFormat);
        //We always want to update the timeblocks so we call the functions
        checkPast();
        checkPresent();
        checkFuture();
    }, 1000);
}
timer();
//Create function to add past class to timeblock if current time > timeblock hour
function checkPast(){
    $(".timeblock").each(function(){
        var tempDivHour = $(this).children("div").html();
        var tempDivPMorAM = "";
        var tempCurrentPMorAM = "";
        var tempHour= currentHour;
        //Assigning PM or AM values taken from div child's timeblock hour
        /*Sloppy method below will fix with a better method, it's working but not effecient */
        if(tempDivHour.length == 3){
            tempDivPMorAM = tempDivHour[1]+tempDivHour[2];
            tempDivHour = tempDivHour[0];
        }
        else {
            tempDivPMorAM = tempDivHour[2]+tempDivHour[3];
            tempDivHour = tempDivHour[0]+tempDivHour[1];
        }
        if(tempHour.length == 3){
            tempCurrentPMorAM = tempHour[1]+tempHour[2];
            tempHour = tempHour[0];
        }
        else {
            tempCurrentPMorAM = tempHour[2]+tempHour[3];
            tempHour = tempHour[0]+tempHour[1];
        }
        /*From this point tempHour and tempDivHour are 1 or 2 digits
        //and their PMorAM variables contain the PM or AM value------------*/
        //Turning our number strings into integers to compare
        tempDivHour = parseInt(tempDivHour);
        tempHour = parseInt(tempHour);
        //If timeblock hour is less than current hour and they have same type of PM or AM
        /*We have to ignore timeblock 12PM because if current time is 1PM, 
        //then 12PM is technically larger but isn't logical */
        if(tempDivHour < tempHour && tempDivPMorAM == tempCurrentPMorAM && tempDivHour !== 12){
            //If the hours are the same then  present class gets added to textarea child element  to get the textbox color
            $(this).children("textarea").addClass("past");
        }
        /*In the next if statement we account for 12PM timeblock. When current time is 1PM
        //we want 12PM timeblock to be in the past */
        else if( tempDivHour == 12 && tempHour >= 1 && tempCurrentPMorAM == "PM"){
            //If the hours are the same then  present class gets added to textarea child element  to get the textbox color
            $(this).children("textarea").addClass("past");
        }
        if(tempDivPMorAM == "AM" && tempCurrentPMorAM == "PM"){
            //If current time is in PM and Div timeblock is in AM, then timeblock is in past
            $(this).children("textarea").addClass("past");
        }

    });
};
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
//Create function to add future class to timeblock if current time < timeblock hour
function checkFuture(){
    $(".timeblock").each(function(){
        var tempDivHour = $(this).children("div").html();
        var tempDivPMorAM = "";
        var tempCurrentPMorAM = "";
        var tempHour= currentHour;
        /*Sloppy method below will fix with a better method, it's working but not effecient */
        /**Assigning PM or AM values taken from div child's timeblock hour**/
        if(tempDivHour.length == 3){
            tempDivPMorAM = tempDivHour[1]+tempDivHour[2];
            tempDivHour = tempDivHour[0];
        }
        else {
            tempDivPMorAM = tempDivHour[2]+tempDivHour[3];
            tempDivHour = tempDivHour[0]+tempDivHour[1];
        }
        if(tempHour.length == 3){
            tempCurrentPMorAM = tempHour[1]+tempHour[2];
            tempHour = tempHour[0];
        }
        else {
            tempCurrentPMorAM = tempHour[2]+tempHour[3];
            tempHour = tempHour[0]+tempHour[1];
        }
        /*From this point tempHour and tempDivHour are 1 or 2 digits
        //and their PMorAM variables contain the PM or AM value------------*/
        //Turning our number strings into integers to compare
        tempDivHour = parseInt(tempDivHour);
        tempHour = parseInt(tempHour);
        //If timeblock hour is great than current hour and they have same type of PM or AM
        /*We have to ignore timeblock 12PM because if current time is 1PM, then 12PM is larger but isn't logical */
        if(tempDivHour > tempHour && tempDivPMorAM == tempCurrentPMorAM && tempDivHour !== 12){
            $(this).children("textarea").addClass("future");
        }
        else if( tempDivHour == 12 && tempDivHour == "PM" && tempHour < tempDivHour && tempCurrentPMorAM == "AM"){
            $(this).children("textarea").addClass("future");
        }
        if(tempDivPMorAM == "PM" && tempCurrentPMorAM == "AM"){
            //If current time is in AM and Div timeblock is in PM, then timeblock is in future
            $(this).children("textarea").addClass("future");
        }
    });
};