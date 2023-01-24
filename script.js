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

function initialiseSchedule() {
    //Iterate through times from 9AM to 5PM
    for (let i=9; i<18; i++) {
        let time = moment(`${i}`, "h").format("hA");
        let timeBlock = createTimeBlock(i);
        let row = $("<div>");
        row.attr("class", "row");
        scheduleContainer.append(timeBlock);
        timeBlock.append(row);
        let hour = createHour();
        hour.text(`${time}`);
        row.append(hour);
        let text = createTextArea();
        text.val(getSchedule(time));
        row.append(text);
        let save = createSaveButton();
        row.append(save);
    }
    $(".saveBtn").on("click", saveSchedule);
}

function createTimeBlock(i) {
    let timeBlock = $("<div>");
    timeBlock.attr("class", "time-block");
    if (i<currentHour) {
        timeBlock.addClass("past");
    } else if (i>currentHour) {
        timeBlock.addClass("future");
    } else {
        timeBlock.addClass("present");
    }
    return timeBlock;
}

function createHour() {
    let hour = $("<div>");
    hour.attr("class", "col-1 hour");
    return hour;    
}

function createTextArea() {
    let text = $("<textarea>");
    text.attr("class", "col-10");
    return text;    
}

function createSaveButton() {
    let save = $("<div>");
    save.attr("class", "col-1 saveBtn d-flex justify-content-center align-items-center");
    let icon = $("<i>");
    icon.attr("class", "fa-regular fa-floppy-disk");
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