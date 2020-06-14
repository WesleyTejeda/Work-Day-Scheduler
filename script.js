//Time
var currentHour = "";
var timeFormat = "";
var mockTime = 1;
//Create an array to push objects to local storage w/ an index
var messageArray = JSON.parse(localStorage.getItem("messages")) || [];
//Timer to constantly update our time as well as call our function periodically
function timer(){
    stopwatch = setInterval(function(){
        currentHour = moment().format('hA');
        timeFormat = moment().format('dddd, MMMM Do YYYY');
        $("#currentDay").text(timeFormat);
        //We always want to update the timeblocks so we call the functions inside of our timer
        checkPast();
        checkPresent();
        checkFuture();
        updateMessages();
        mockTime++;
    }, 1000);
}
timer();
//Create function to add past class to timeblock if current time > timeblock hour
function checkPast(){
    $(".timeblock").each(function(){
        //tempDivHour takes the value of timeblock
        var tempDivHour = $(this).children("div").html();
        var tempDivPMorAM = "";
        var tempCurrentPMorAM = "";
        var tempHour= currentHour;
        /*Sloppy method below will fix with a better method, it's working but not effecient */
        /**Assigning PM or AM values taken from div child's timeblock hour.
        ///When timeblock's string is 3 characters long i.e 9AM,5PM,...--*/
        if(tempDivHour.length == 3){
            tempDivPMorAM = tempDivHour[1]+tempDivHour[2];
            tempDivHour = tempDivHour[0];
        }
        //If timeblocks string is not 3, then it must be 4
        else {
            tempDivPMorAM = tempDivHour[2]+tempDivHour[3];
            tempDivHour = tempDivHour[0]+tempDivHour[1];
        }
        //When current time's string is 3 characters long i.e 9AM,5PM,...
        if(tempHour.length == 3){
            tempCurrentPMorAM = tempHour[1]+tempHour[2];
            tempHour = tempHour[0];
        }
        //If current time's string is not 3, then it must be 4
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
            $(this).children("textarea").attr("class","col-8 col-lg-8 col-md-8 col-sm-8 textarea past");
        }
        /*In the next if statement we account for 12PM timeblock. When current time is 1PM
        //we want 12PM timeblock to be in the past */
        else if( tempDivHour == 12 && tempHour >= 1 && tempCurrentPMorAM == "PM"){
            //If the hours are the same then  present class gets added to textarea child element  to get the textbox color
            $(this).children("textarea").attr("class","col-8 col-lg-8 col-md-8 col-sm-8 textarea past");
        }
        //When its 1AM and we want 12AM timeblock to be in the past so we need this statement
        else if(tempDivHour == 12 && tempHour >= 1 && tempDivPMorAM == "AM" && tempCurrentPMorAM == "AM" ){
            $(this).children("textarea").attr("class","col-8 col-lg-8 col-md-8 col-sm-8 textarea past");
        }
        //If current time is in PM and Div timeblock is in AM, then AM timeblocks are in past
        if(tempDivPMorAM == "AM" && tempCurrentPMorAM == "PM"){
            $(this).children("textarea").attr("class","col-8 col-lg-8 col-md-8 col-sm-8 textarea past");
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
            $(this).children("textarea").attr("class","col-8 col-lg-8 col-md-8 col-sm-8 textarea present");
        }
    });
}
//Create function to add future class to timeblock if current time < timeblock hour
function checkFuture(){
    $(".timeblock").each(function(){
        //tempDivHour takes the value of timeblock
        var tempDivHour = $(this).children("div").html();
        var tempDivPMorAM = "";
        var tempCurrentPMorAM = "";
        var tempHour= currentHour;
        /*Sloppy method below will fix with a better method, it's working but not effecient */
        /**Assigning PM or AM values taken from div child's timeblock hour.
        ///When timeblock's string is 3 characters long i.e 9AM,5PM,...--*/
        if(tempDivHour.length == 3){
            tempDivPMorAM = tempDivHour[1]+tempDivHour[2];
            tempDivHour = tempDivHour[0];
        }
        //If timeblocks string is not 3, then it must be 4
        else {
            tempDivPMorAM = tempDivHour[2]+tempDivHour[3];
            tempDivHour = tempDivHour[0]+tempDivHour[1];
        }
        //When current time's string is 3 characters long i.e 9AM,5PM,...
        if(tempHour.length == 3){
            tempCurrentPMorAM = tempHour[1]+tempHour[2];
            tempHour = tempHour[0];
        }
        //If current time's string is not 3, then it must be 4
        else {
            tempCurrentPMorAM = tempHour[2]+tempHour[3];
            tempHour = tempHour[0]+tempHour[1];
        }
        /*From this point tempHour and tempDivHour are 1 or 2 digits
        //and their PMorAM variables contain the PM or AM value------------*/
        //Turning our number strings into integers to compare
        tempDivHour = parseInt(tempDivHour);
        tempHour = parseInt(tempHour);
        //If timeblock hour is greater than current hour and they have same type of PM or AM
        /*We have to ignore timeblock 12PM because if current time is 1PM, then 12PM is larger but isn't logical */
        if(tempDivHour > tempHour && tempDivPMorAM == tempCurrentPMorAM  && tempDivHour !== 12){
            $(this).children("textarea").attr("class","col-8 col-lg-8 col-md-8 col-sm-8 textarea future");
        }
        //We need to account for 12pm timeblock when the current time is 1pm and later
        else if( tempDivHour == 12 && tempDivHour == "PM" && tempHour < tempDivHour && tempCurrentPMorAM == "AM"){
            $(this).children("textarea").attr("class","col-8 col-lg-8 col-md-8 col-sm-8 textarea future");
        }
        /*This takes into account when the time is 12pm or 12am 
        //At 12pm, none of the 1pm =< timeblocks will show future class
        //At 12am, none of the 1am =< timeblocks will show future class so we must account for that*/
        else if( tempDivHour >=1 && tempHour == 12 && tempCurrentPMorAM == tempDivPMorAM && tempDivHour !== tempHour){
            $(this).children("textarea").attr("class","col-8 col-lg-8 col-md-8 col-sm-8 textarea future");
        }
        else 
            //When current time is in AM it's assumed that timeblocks in PM will be in the future
            if(tempDivPMorAM == "PM" && tempCurrentPMorAM == "AM"){
            $(this).children("textarea").attr("class","col-8 col-lg-8 col-md-8 col-sm-8 textarea future");
        }
    });
};
//When user clicks the save button, we save their message
//Add an on click for every button clicked
$(".saveBtn").on("click",function(){
    // console.log("clicking!");
    //Variable takes in value of the textarea field
    var textAreaField = $(this).parent().children("textarea").val();
    var currentTimeBlock = $(this).parent().children("div").html();
    //We send a message text and a current timeblock of the button clicked
    messageArray.push({message: textAreaField, timeblock: currentTimeBlock});
    //We send the messageArray that holds our object to localstorage. to retrieve periodically
    localStorage.setItem("messages", JSON.stringify(messageArray));
});
//Loop through message array to post timeblock messages that are saved; This is called by our timer every second
function updateMessages(){
    for(var i=0; i < messageArray.length; i++){
        //Place our property values into an easily accesible variable
        var message = messageArray[i].message;
        var timeblock = messageArray[i].timeblock;
        //Test each timeblock to see if we can find the timeblock that our object was created from
        $(".timeblock").each(function(){
            //Since the timeblock is the parent of the actual div that houses our value this is how we call it
            //and compare it to our timeblock that was in our object
            if($(this).children("div").text() === timeblock){
                
                console.log("matching");
                $(this).children("textarea").attr("placeholder", message);
            }
        });
    }
};
//Clear messages in our local storage
$("#clear").on("click", function(){
    //Empty messageArray
    messageArray = [];
    //We must pass the string "[]" to simulate an empty array
    localStorage.setItem("messages","[]");
    console.log("Cleared!")
});
