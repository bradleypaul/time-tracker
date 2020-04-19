const availableHours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];


// set day and date information when page loads
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#currentDay").innerText = moment().format('dddd, MMMM Do');
});