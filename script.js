let today = moment().format("dddd, Do MMMM");
let currentDayEl = $("#currentDay");
let scheduleContainer = $(".container");
let currentHour = getCurrentHour();

//Get today's date
function displayDate() {
    currentDayEl.text(today);
}

//Get the hour of the current time 
function getCurrentHour() {
    return moment().format("H")
}

//Create the time and schedule blocks that make up the calendar
function initialiseSchedule() {
    //Iterate through times from 9AM to 5PM
    for (let i=9; i<18; i++) {
        //Create a label in the format iAM/PM
        let time = moment(`${i}`, "h").format("hA");
        //Create a timeBlock for this hour period
        let timeBlock = createTimeBlock(i);
        //Create a bootstrap row to hold the schedule elements
        let row = $("<div>");
        row.attr("class", "row");
        //Add the timeBlock to the schedule area
        scheduleContainer.append(timeBlock);
        //Add the row to the timeBlock
        timeBlock.append(row);
        //Create a div and add the time label to it
        let hour = createHour();
        hour.text(`${time}`);
        //Add the hour to the row
        row.append(hour);
        //Create a text area and assign saved schedule to it if it exists
        let text = createTextArea();
        text.val(getSchedule(time));
        //Add the text area to the row
        row.append(text);
        //Create a save button
        let save = createSaveButton();
        //Add the save button to the row
        row.append(save);
    }
    //Add save functionality to save buttons
    $(".saveBtn").on("click", saveSchedule);
}

//Create a timeBlock
function createTimeBlock(i) {
    //Create an empty div
    let timeBlock = $("<div>");
    //Assign it the pre-existing time-block class
    timeBlock.attr("class", "time-block");
    //Check if hourly label is in past, present or future and assign
    if (i<currentHour) {
        timeBlock.addClass("past");
    } else if (i>currentHour) {
        timeBlock.addClass("future");
    } else {
        timeBlock.addClass("present");
    }
    return timeBlock;
}

//Create an hour area
function createHour() {
    //Create an empty div
    let hour = $("<div>");
    //Make a single bootstrap column and add pre-existing hour class
    hour.attr("class", "col-1 hour");
    return hour;    
}

//Create a textarea
function createTextArea() {
    //Create an empty text area
    let text = $("<textarea>");
    //Make a bootstrap column taking up 10 of the 12 column spaces
    text.attr("class", "col-10");
    return text;    
}

//Create a save button
function createSaveButton() {
    //Create an empty div
    let save = $("<div>");
    //Make a bootstrap column, assign existing saveBtn class and centre content
    save.attr("class", "col-1 saveBtn d-flex justify-content-center align-items-center");
    //Create an icon element
    let icon = $("<i>");
    //Assign classes to generate font-awesome floppy disk icon
    icon.attr("class", "fa-regular fa-floppy-disk");
    //Add icon to the save button
    save.append(icon);
    return save;
}

//Get any saved schedule descriptions from local storage
function getSchedule(key) {
    let description = localStorage.getItem(key);
    //If there is no scheduled event for this time, return an empty string
    if (description === null) {
        return "";
    } else {
        return description;
    }
}

//Save schedule description text to local storage
function saveSchedule(event) {
    let parentEl = event.currentTarget.parentNode;
    let timeSlot = $(parentEl).children(".hour").text();
    let description = $(parentEl).children("textarea").val();
    localStorage.setItem(timeSlot, description);
}

//Update past, present and future classes assigned to blocks of time
function refreshStatus() {
    $('.time-block').each(function(i) {
        currentHour = getCurrentHour();
        if (i+9<currentHour) {
            $(this).attr("class", "time-block past");
        } else if (i+9>currentHour) {
            $(this).attr("class", "time-block future");
        } else {
            $(this).attr("class", "time-block present");
        }
    });
}

displayDate();
initialiseSchedule();
setInterval(refreshStatus, 1000);