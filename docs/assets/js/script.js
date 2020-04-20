const availableHours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// page load handler
document.addEventListener("DOMContentLoaded", () => {
    // set date at top using moment
    document.querySelector("#currentDay").innerText = moment().format('dddd, MMMM Do');

    // create timeslot elements as strings then add to DOM
    // JQuery append supports functions that resolve to strings currently
    $('main').append(createTimeslots);

});

function createTimeslots() {
    return availableHours.map(createTimeslot).join('');
}

function createTimeslot(time) {
    // return an html string with time & other attributes interpolated where they need to be.
    return `
    <div class="row time-block">
        <div class="hour col-1">
          ${time}
        </div>
        <input type="text" class="${getTimeClass(time)} col" value="${localStorage.getItem(time) || ''}" data-time="${time}" />
        <div class="save-button col-1" onclick="saveAppointment('${time}')">
            <i class="fa fa-lg fa-floppy-o fa-custom" aria-hidden="true"></i>
        </div>
    </div>`;
}

function getTimeClass(time) {
    // convert time to just the hour part, truncating any am or pm
    let hour = parseInt(time);

    // convert to 24 hour time if past noon
    if (time.includes('pm') && hour !== 12) {
        hour += 12;
    }

    // capital Hs for 24 hour time clock
    // comes back as string so need to make it an int for best
    // comparisons
    let currentHour = parseInt(moment().format('HH'));

    // return class named based on what time it is
    if (hour < currentHour) {
        return 'past';
    } else if (hour === currentHour) {
        return 'present';
    } else if (hour > currentHour) {
        return 'future';
    }
}

function saveAppointment(time) {
    // get input data based on what save button was clicked
    const appointmentData = $(`input[data-time="${time}"]`).val();

    // update localstorage where the key matches my time
    localStorage.setItem(time, appointmentData);
}