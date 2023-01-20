let today = moment().format("dddd, Do MMMM");
let currentDayEl = $("#currentDay");
let scheduleContainer = $(".container");
let currentHour = getCurrentHour();

function displayDate() {
    currentDayEl.text(today);
}

function getCurrentHour() {
    return moment().format("H")
}

function initialiseSchedule() {
    for (let i=9; i<18; i++) {
        let time = moment(`${i}`, "h").format("hA");
        let timeBlock = $("<div>");
        timeBlock.attr("class", "time-block");
        let row = $("<div>");
        row.attr("class", "row");
        scheduleContainer.append(timeBlock);
        timeBlock.append(row);
        let hour = $("<div>");
        hour.attr("class", "col-1 hour");
        hour.text(`${time}`);
        row.append(hour);
        let text = $("<textarea>");
        text.attr("class", "col-10");
        if (i<currentHour) {
            text.addClass("past");
        } else if (i>currentHour) {
            text.addClass("future");
        } else {
            text.addClass("present");
        }
        row.append(text);
        let save = $("<div>");
        save.attr("class", "col-1 saveBtn");
        row.append(save);
    }
    $(".saveBtn").on("click", saveSchedule);
}

function saveSchedule(event) {
    let parentEl = event.target.parentNode;
    console.log(parentEl);
    let timeSlot = $(parentEl).children(".hour").text();
    let description = $(parentEl).children("textarea").val();
    localStorage.setItem(timeSlot, description);
}

displayDate();
initialiseSchedule();