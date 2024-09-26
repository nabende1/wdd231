var currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;


// Get the last modified date/time
var lastModifiedString = document.lastModified;

// Convert the last modified string into a Date object
var lastModified = new Date(lastModifiedString);

// Get the year, month, day, hour, minute, and second from the last modified date/time
var lastModifiedYear = lastModified.getFullYear();
var lastModifiedMonth = lastModified.getMonth() + 1; // Months are zero-based, so we add 1
var lastModifiedDay = lastModified.getDate();
var lastModifiedHour = lastModified.getHours();
var lastModifiedMinute = lastModified.getMinutes();
var lastModifiedSecond = lastModified.getSeconds();

// Format the date/time
var formattedLastModified = lastModifiedYear + '/' + padZero(lastModifiedMonth) + '/' + padZero(lastModifiedDay) + ' ' + padZero(lastModifiedHour) + ':' + padZero(lastModifiedMinute) + ':' + padZero(lastModifiedSecond);

// Insert the formatted date/time into the element with the ID "lastModified"
document.getElementById("lastModified").textContent = formattedLastModified;

// Function to add leading zero if the number is less than 10
function padZero(num) {
    return (num < 10 ? '0' : '') + num;
}