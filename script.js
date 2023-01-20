let today = moment().format("dddd, Do MMMM");
let currentDayEl = $("#currentDay");
let scheduleContainer = $(".container");

function displayDate() {
    currentDayEl.text(today);
}

function initialiseSchedule() {
    for (let i=9; i<18; i++) {
        let period = "";
        if (i<12) {
            period = "AM";
        } else {
            period = "PM";
        }
        let timeBlock = $("div");
        timeBlock.attr("class", "time-block");
        let row = $("div");
        row.attr("class", "row");
        scheduleContainer.append(timeBlock);
        timeBlock.append(row);
        let hour = $("div");
        hour.attr("class", "col-1 hour");
        hour.text(`${i}${period}`);
        let text = $("textarea");
        text.attr("class", "col-10");
        let save = $("div");
        save.attr("class", "col-10 saveBtn");
        row.append(hour);
        row.append(text);
        row.append(save);
    }
}

displayDate();
initialiseSchedule();