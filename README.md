# Work-Day-Scheduler
By: ```Wesley Tejeda```

Deployed link: [https://wesleytejeda.github.io/Work-Day-Scheduler]

My GitHub : [https://github.com/wesleytejeda/Work-Day-Scheduler]

## General
In this repository I contained files for a website that displays a schedule for the current day. This page contains timeblocks from 9AM-5PM and each timeblock is marked with their appropriate class to display whether the block is in the past, present, or future. The user can write a message in the textbox and when they save and refresh the message will still be there.

## Demo
!["Work schedule in action"](assets/demo.gif)
## My Approach in Detail
*Before I made my ```script.js``` file I decided that my timeblock was going to be the parent div of the timeblock information. This was done so that I could access the children simpler; straight from the parent rather than assigning the timeblock class to the div that contains the time and having to refer back to the parent and then go back to either the save button or the textarea.*

First I created a timer to display our current day, update our time variables, and execute our functions.

Next we move onto assigning past, present, and future classes to our timeblock. I decided to use a more complex method using logic cases in determining the tense instead of using military time. With this approach we take the integer of our time and split it from the AM or PM value and house each part in a separate variable. From those 2 variables we then have a series of if-else statements that compare each timeblock to the current time and assign the proper class.

Then, in order to save the users message I used a for each function for all save buttons. On clicking a save button, the text and timeblock hour for that specific field is pushed into our array as an object with properties of message and timeblock.

Lastly, similar to our save feature, our ```updateMessages()``` function loops through our local storage. We extract the message and the timeblock hour and use it in a for each function for every timeblock. Inside the function we compare every timeblock to our extracted timeblock hour. If the hours match then our message is displayed on that timeblock's textarea tag.

### Friendy Feature
I decided to include a function to clear all text from textboxes. This function also pushes an empty array into our local storage effectively clearing previous messages stored.
```
$("#clear").on("click", function(){
    //Empty messageArray
    messageArray = [];
    //We must pass the string "[]" to simulate an empty array
    localStorage.setItem("messages","[]");
    //To clear every text field we go through each and replace the text with a space
    $("textarea").each(function(){
        $(this).html(" ");
    });
});
```
This was a "nice to have" feature for the user instead of having to manually clear all text boxes. 