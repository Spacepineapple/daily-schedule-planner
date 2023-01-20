let today = moment().format("dddd, Do MMMM");
let currentDayEl = $("#currentDay");
let scheduleContainer = $(".container");

function displayDate() {
    currentDayEl.text(today);
}

displayDate();